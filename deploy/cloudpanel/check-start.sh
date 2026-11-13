#!/usr/bin/env bash
set -euo pipefail

archive=${1:?Usage: check-start.sh /absolute/path/release.tar.gz}
work_dir=$(mktemp -d)
server_pid=''
finish() {
  status=$?
  trap - EXIT
  if [[ -n "$server_pid" ]]; then
    kill "$server_pid" 2>/dev/null || true
    wait "$server_pid" 2>/dev/null || true
  fi
  if (( status != 0 )); then cat "$work_dir/server.log" >&2; fi
  rm -rf -- "$work_dir"
  exit "$status"
}
trap finish EXIT
tar -xzf "$archive" -C "$work_dir"
NODE_ENV=production HOSTNAME=127.0.0.1 PORT=3101 BLUMU_REVISION="$GITHUB_SHA" BLUMU_RELEASE_ID=ci \
  node "$work_dir/server.js" >"$work_dir/server.log" 2>&1 &
server_pid=$!
node "$work_dir/deploy/cloudpanel/check-health.mjs" http://127.0.0.1:3101 "$GITHUB_SHA" ci
