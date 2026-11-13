#!/usr/bin/env bash
set -euo pipefail

base_dir=${1:?Missing site directory}
node_bin=${2:?Missing Node.js binary}
app_url=${3:?Missing application URL}
app_name=${4:?Missing PM2 application name}
release_id=${5:?Missing release identifier}
archive_sha=${6:?Missing archive checksum or rollback}
keep_releases=${7:-5}
port=${8:-3001}

[[ "$release_id" =~ ^[0-9]{14}-[a-f0-9]{12}-[0-9]+-[0-9]+$ ]]
[[ "$archive_sha" == rollback || "$archive_sha" =~ ^[a-f0-9]{64}$ ]]
[[ "$app_name" =~ ^[a-zA-Z0-9][a-zA-Z0-9_-]*$ ]]
[[ "$app_url" =~ ^https://[a-zA-Z0-9.-]+(:[0-9]+)?$ ]]
[[ "$keep_releases" =~ ^[0-9]{1,2}$ ]] && (( 10#$keep_releases >= 2 ))
[[ "$port" =~ ^[0-9]{4,5}$ ]] && (( 10#$port >= 1024 && 10#$port <= 65535 ))
base_dir=$(realpath -e -- "$base_dir")
[[ "$base_dir" == "/home/$(id -un)/htdocs/"* && "$(stat -c %U "$base_dir")" == "$(id -un)" ]]
for directory in releases shared shared/incoming; do
  [[ -d "$base_dir/$directory" && ! -L "$base_dir/$directory" ]]
done
[[ -x "$node_bin" ]]
node_dir=$(dirname "$node_bin")
export PATH="$node_dir:/usr/local/bin:/usr/bin:/bin"
[[ "$(node -p 'process.versions.node.split(".")[0]')" == 22 ]]
command -v pm2 >/dev/null

exec 9>"$base_dir/shared/deploy.lock"
flock -w 60 9

release_dir="$base_dir/releases/$release_id"
archive="$base_dir/shared/incoming/$release_id.tar.gz"
next_link="$base_dir/current.$release_id"
local_url="http://127.0.0.1:$port"
previous=''
activated=0

switch_release() {
  ln -s "$1" "$next_link" && mv -Tf -- "$next_link" "$base_dir/current"
}

restart_app() {
  if pm2 describe "$app_name" >/dev/null 2>&1; then
    pm2 delete "$app_name" || return
  fi
  BLUMU_RELEASE_DIR="$1" BLUMU_PM2_APP_NAME="$app_name" BLUMU_PORT="$port" \
    pm2 start "$1/deploy/cloudpanel/ecosystem.config.cjs" --only "$app_name"
}

check_health() {
  node "$1/deploy/cloudpanel/check-health.mjs" "$2" "$(cat "$1/REVISION")" "$(basename "$1")"
}

finish() {
  status=$?
  trap - EXIT HUP INT TERM
  set +e
  if (( status != 0 && activated == 1 )); then
    rm -f -- "$next_link"
    if [[ -n "$previous" ]]; then
      printf 'Deployment failed; restoring %s.\n' "$previous" >&2
      if switch_release "$previous" && restart_app "$previous" && check_health "$previous" "$local_url" && pm2 save; then
        printf 'Previous release restored.\n' >&2
      else
        printf 'Automatic rollback failed. Check PM2 and the current link.\n' >&2
      fi
    else
      printf 'First deployment failed. Removing the failed process.\n' >&2
      pm2 delete "$app_name"
      rm -f -- "$base_dir/current"
      pm2 save --force
    fi
  fi
  rm -f -- "$next_link"
  if [[ "$archive_sha" != rollback ]]; then
    rm -f -- "$archive" "$base_dir/shared/incoming/$release_id.sh"
  fi
  exit "$status"
}
trap finish EXIT
trap 'exit 129' HUP
trap 'exit 130' INT
trap 'exit 143' TERM

if [[ -L "$base_dir/current" ]]; then
  previous=$(readlink -f -- "$base_dir/current")
  [[ -d "$previous" && "$(dirname "$previous")" == "$base_dir/releases" ]]
  [[ -f "$previous/REVISION" && -f "$previous/deploy/cloudpanel/ecosystem.config.cjs" ]]
else
  [[ ! -e "$base_dir/current" ]]
  if pm2 describe "$app_name" >/dev/null 2>&1; then
    printf 'An unmanaged PM2 process already uses %s.\n' "$app_name" >&2
    exit 1
  fi
fi
[[ "$release_dir" != "$previous" ]]

if [[ "$archive_sha" == rollback ]]; then
  [[ -d "$release_dir" && ! -L "$release_dir" ]]
else
  printf '%s  %s\n' "$archive_sha" "$archive" | sha256sum -c -
  mkdir "$release_dir"
  tar -xzf "$archive" -C "$release_dir" --no-same-owner
fi
[[ -f "$release_dir/server.js" && -f "$release_dir/.next/BUILD_ID" ]]
[[ "$(cat "$release_dir/REVISION")" =~ ^[a-f0-9]{40}$ ]]
node - "$release_dir/build-meta.json" "$app_url" <<'JS'
const fs = require('node:fs');
const assert = require('node:assert/strict');
const build = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
assert.equal(build.site, process.argv[3], 'Rebuild with the correct NEXT_PUBLIC_SITE_URL');
assert.equal(build.noindex, true);
assert.equal(build.platform, process.platform);
assert.equal(build.arch, process.arch);
assert.equal(build.nodeMajor, process.versions.node.split('.')[0]);
JS

activated=1
switch_release "$release_dir"
restart_app "$release_dir"
check_health "$release_dir" "$local_url"
check_health "$release_dir" "$app_url"
pm2 jlist | node -e '
  let raw="";
  process.stdin.on("data", chunk => raw += chunk);
  process.stdin.on("end", () => {
    const app = JSON.parse(raw).find(p => p.name === process.argv[1]);
    if (!app || app.pm2_env.status !== "online" || app.pm2_env.pm_cwd !== process.argv[2]) process.exit(1);
  });' "$app_name" "$release_dir"
pm2 save
printf '%s\n' "$previous" > "$base_dir/shared/previous_release"
activated=0
printf 'Release %s is active.\n' "$release_id"

if ! node - "$base_dir/releases" "$release_dir" "$previous" "$keep_releases" <<'JS'
const fs = require('node:fs');
const path = require('node:path');
const [root, active, previous, keepCount] = process.argv.slice(2);
const releases = fs.readdirSync(root, { withFileTypes: true })
  .filter(p => p.isDirectory() && /^\d{14}-[a-f0-9]{12}-\d+-\d+$/.test(p.name))
  .map(p => path.join(root, p.name))
  .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
const keep = new Set([active, previous, ...releases.slice(0, Number(keepCount))]);
for (const release of releases) {
  if (!keep.has(release) && path.dirname(fs.realpathSync(release)) === root) {
    fs.rmSync(release, { recursive: true });
  }
}
JS
then
  printf 'Release deployed, but old release cleanup failed.\n' >&2
fi
