#!/usr/bin/env bash
set -euo pipefail

archive=${1:?Usage: package.sh /absolute/path/release.tar.gz}
[[ "$archive" == /* ]]
[[ "${GITHUB_SHA:-}" =~ ^[a-f0-9]{40}$ ]]
[[ -f .next/standalone/server.js && -d .next/static && -d public ]]
[[ "${BLUMU_NOINDEX:-}" == true ]]
for name in NEXT_PUBLIC_API_URL NEXT_PUBLIC_SITE_URL; do
  [[ "${!name:-}" =~ ^https://[a-zA-Z0-9.-]+(:[0-9]+)?$ ]]
done

work_dir=$(mktemp -d)
trap 'rm -rf -- "$work_dir"' EXIT
cp -a .next/standalone/. "$work_dir/"
cp -a .next/static "$work_dir/.next/static"
cp -a public "$work_dir/public"
mkdir -p "$work_dir/deploy/cloudpanel"
cp deploy/cloudpanel/{release.sh,ecosystem.config.cjs,check-health.mjs} "$work_dir/deploy/cloudpanel/"
printf '%s\n' "$GITHUB_SHA" > "$work_dir/REVISION"
node - "$work_dir/build-meta.json" <<'JS'
const fs = require('node:fs');
fs.writeFileSync(process.argv[2], JSON.stringify({
  api: process.env.NEXT_PUBLIC_API_URL,
  site: process.env.NEXT_PUBLIC_SITE_URL,
  noindex: process.env.BLUMU_NOINDEX === 'true',
  platform: process.platform,
  arch: process.arch,
  nodeMajor: process.versions.node.split('.')[0],
}) + '\n');
JS
if [[ -n "$(find "$work_dir" -name '.env*' -print -quit)" ]]; then
  printf 'Refusing to package .env files. Build without local environment files.\n' >&2
  exit 1
fi
tar -czf "$archive" -C "$work_dir" .
