/* eslint-disable @typescript-eslint/no-require-imports -- PM2 loads a CommonJS configuration. */
const fs = require("node:fs");
const path = require("node:path");

const release = process.env.BLUMU_RELEASE_DIR;
if (!release) throw new Error("BLUMU_RELEASE_DIR is required");

module.exports = {
  apps: [{
    name: process.env.BLUMU_PM2_APP_NAME || "blumu-dev-web",
    cwd: release,
    script: "server.js",
    interpreter: process.execPath,
    exec_mode: "fork",
    instances: 1,
    autorestart: true,
    exp_backoff_restart_delay: 1000,
    kill_timeout: 10000,
    time: true,
    env: {
      NODE_ENV: "production",
      HOSTNAME: "127.0.0.1",
      PORT: process.env.BLUMU_PORT || "3001",
      BLUMU_REVISION: fs.readFileSync(path.join(release, "REVISION"), "utf8").trim(),
      BLUMU_RELEASE_ID: path.basename(release),
    },
  }],
};
