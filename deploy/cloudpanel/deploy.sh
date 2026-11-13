#!/usr/bin/env bash
set -euo pipefail

archive=${1:?Usage: deploy.sh /absolute/path/release.tar.gz}
[[ -f "$archive" ]]
for name in SSH_HOST SSH_PORT SSH_USER BASE_DIR NODE_BIN APP_URL PM2_APP_NAME APP_PORT KEEP_RELEASES SSH_PRIVATE_KEY SSH_KNOWN_HOSTS GITHUB_SHA GITHUB_RUN_ID GITHUB_RUN_ATTEMPT; do
  [[ -n "${!name:-}" ]] || { printf 'Missing deployment setting: %s\n' "$name" >&2; exit 1; }
done
[[ "$SSH_HOST" =~ ^[a-zA-Z0-9][a-zA-Z0-9.-]*$ ]]
[[ "$SSH_USER" =~ ^[a-z_][a-z0-9_-]*$ ]]
[[ "$SSH_PORT" =~ ^[0-9]{1,5}$ ]] && (( 10#$SSH_PORT >= 1 && 10#$SSH_PORT <= 65535 ))
[[ "$APP_PORT" =~ ^[0-9]{4,5}$ ]] && (( 10#$APP_PORT >= 1024 && 10#$APP_PORT <= 65535 ))
[[ "$BASE_DIR" =~ ^/home/[a-zA-Z0-9_-]+/htdocs/[a-zA-Z0-9.-]+$ ]]
[[ "$NODE_BIN" =~ ^/home/[a-zA-Z0-9_./-]+/bin/node$ ]]
[[ "$APP_URL" =~ ^https://[a-zA-Z0-9.-]+(:[0-9]+)?$ ]]
[[ "$PM2_APP_NAME" =~ ^[a-zA-Z0-9][a-zA-Z0-9_-]*$ ]]
[[ "$KEEP_RELEASES" =~ ^[0-9]{1,2}$ ]] && (( 10#$KEEP_RELEASES >= 2 ))
[[ "$GITHUB_SHA" =~ ^[a-f0-9]{40}$ ]]
[[ "$GITHUB_RUN_ID" =~ ^[0-9]+$ && "$GITHUB_RUN_ATTEMPT" =~ ^[0-9]+$ ]]

work_dir=$(mktemp -d)
trap 'rm -rf -- "$work_dir"' EXIT
umask 077
printf '%s\n' "$SSH_PRIVATE_KEY" | tr -d '\r' > "$work_dir/key"
printf '%s\n' "$SSH_KNOWN_HOSTS" | tr -d '\r' > "$work_dir/known_hosts"
ssh-keygen -y -f "$work_dir/key" >/dev/null
unset SSH_PRIVATE_KEY SSH_KNOWN_HOSTS
cat > "$work_dir/ssh_config" <<EOF
Host blumu-web-deploy
  HostName $SSH_HOST
  Port $SSH_PORT
  User $SSH_USER
  IdentityFile $work_dir/key
  IdentitiesOnly yes
  BatchMode yes
  StrictHostKeyChecking yes
  UserKnownHostsFile $work_dir/known_hosts
  ConnectTimeout 15
  ServerAliveInterval 15
  ServerAliveCountMax 4
EOF

release_id="$(date -u +%Y%m%d%H%M%S)-${GITHUB_SHA:0:12}-${GITHUB_RUN_ID}-${GITHUB_RUN_ATTEMPT}"
archive_sha=$(sha256sum "$archive" | cut -d ' ' -f 1)
ssh -F "$work_dir/ssh_config" blumu-web-deploy bash -s -- "$BASE_DIR" <<'REMOTE'
set -euo pipefail
base_dir=$1
[[ -d "$base_dir/releases" && -d "$base_dir/shared/incoming" ]]
[[ "$(stat -c %U "$base_dir")" == "$(id -un)" ]]
REMOTE
scp -F "$work_dir/ssh_config" "$archive" "blumu-web-deploy:$BASE_DIR/shared/incoming/$release_id.tar.gz"
scp -F "$work_dir/ssh_config" deploy/cloudpanel/release.sh "blumu-web-deploy:$BASE_DIR/shared/incoming/$release_id.sh"
ssh -F "$work_dir/ssh_config" blumu-web-deploy \
  bash "$BASE_DIR/shared/incoming/$release_id.sh" \
  "$BASE_DIR" "$NODE_BIN" "$APP_URL" "$PM2_APP_NAME" "$release_id" "$archive_sha" "$KEEP_RELEASES" "$APP_PORT"

if [[ -n "${GITHUB_STEP_SUMMARY:-}" ]]; then
  printf 'Deployed %s to %s\n\nRelease: %s\n' "$GITHUB_SHA" "$APP_URL" "$release_id" >> "$GITHUB_STEP_SUMMARY"
fi
