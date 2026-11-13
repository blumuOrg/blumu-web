# Deploy Blumu web to intika-d2

This guide prepares a new CloudPanel site for `blumuOrg/blumu-web`.
The workflow deploys the `development` branch.
The backend uses the separate `develop` branch in `blumuOrg/blumu`.

| Part | Value |
| --- | --- |
| Server | `intika-d2`, `173.212.214.75` |
| Website | `https://blumu-web-dev.itcollar.com` |
| API | `https://blumu-dev.itcollar.com` |
| New CloudPanel site user | `itcollar-blumu-web-dev` |
| Site directory | `/home/itcollar-blumu-web-dev/htdocs/blumu-web-dev.itcollar.com` |
| Node.js | `22.23.4`, as specified in `.nvmrc` |
| PM2 process | `blumu-dev-web` |
| Local address | `127.0.0.1:3001` |

The server address comes from the existing backend deployment settings.
The site, user and port above are the proposed web configuration.
Check the available port before setup.

## 1. Create the CloudPanel site

1. Add the DNS A record `blumu-web-dev.itcollar.com` with value `173.212.214.75`.
2. In CloudPanel, create a **Node.js Site** with the domain above.
3. Set the site user to `itcollar-blumu-web-dev`.
4. Select Node.js 22.
5. Check port `3001` with `ss -ltn 'sport = :3001'` on the server.
6. If the port is free, set **App Port** to `3001`.
7. Create a Let's Encrypt certificate for the new domain.
8. Enable the redirect from HTTP to HTTPS.

Keep the default proxy rules for the Node.js site.
The Node.js process serves `/`, `/_next/`, `/health` and the public files.
Do not add a static-file location that reads assets from the empty site directory.
Disable proxy caching for `/health`.

If port `3001` is occupied, select a free port above `1023`.
Use that port in CloudPanel and `DEV_APP_PORT`.
Keep the API on its existing port `3000`.

## 2. Prepare the site user

Connect as the new site user:

```bash
ssh itcollar-blumu-web-dev@173.212.214.75
```

Run these commands in that SSH session:

```bash
nvm install 22.23.4
nvm alias default 22.23.4
nvm use 22.23.4
npm install --global pm2@6

cd /home/itcollar-blumu-web-dev/htdocs/blumu-web-dev.itcollar.com
mkdir -p releases shared/incoming
chmod 700 shared shared/incoming
node --version
command -v node
command -v pm2
command -v flock
uname -m
```

Use the printed Node.js path for `DEV_NODE_BIN`.
The expected architecture is `x86_64`.
The workflow builds Linux x64 releases on Ubuntu 22.04.
Use Ubuntu 22.04 or newer, or compatible Debian, on the server.
Windows builds cannot run on this Linux server.

If `nvm` is unavailable, reconnect after selecting Node.js 22 in CloudPanel.
If `flock` is unavailable, install the `util-linux` system package as an administrator.

Run `pm2 startup systemd` as the site user.
Run the command it prints as an administrator.
After the first deployment, check `systemctl status pm2-itcollar-blumu-web-dev` as an administrator.
The deployment runs `pm2 save` after each successful release.

The web application does not need a server `.env` file.
Its public URLs are part of the build.
The PM2 configuration sets its runtime port and release identity.

## 3. Create a deployment key

Generate a separate Ed25519 key on your computer.
Use an empty passphrase for this Actions key.
Do not reuse the backend key.

Example in PowerShell:

```powershell
ssh-keygen -t ed25519 -f "$env:USERPROFILE\.ssh\blumu_web_dev_actions" -C "blumu-web development deploy"
```

In CloudPanel, add the `.pub` file contents to the new site's SSH keys.
Alternatively, add the public key to `~/.ssh/authorized_keys` of `itcollar-blumu-web-dev`.
Use permissions `700` for `.ssh` and `600` for `authorized_keys`.

Get the server's Ed25519 public key through an administrator session:

```bash
cat /etc/ssh/ssh_host_ed25519_key.pub
ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub
```

Use the full public key to make this known-hosts entry:

```text
173.212.214.75 ssh-ed25519 <SERVER_PUBLIC_KEY_BASE64>
```

Use `[173.212.214.75]:PORT` instead of the address if SSH uses a non-default port.
A fingerprint alone is not a known-hosts entry.
The workflow refuses unknown or changed server keys.

## 4. Configure GitHub

Open **Settings → Environments** in `blumuOrg/blumu-web`.
Create the `development` environment.
Permit deployments only from the `development` branch.

### Repository variables

Set these under **Settings → Secrets and variables → Actions → Variables**.
They must be repository variables because the build runs before the deployment environment is available.
The workflow uses the listed values as defaults if these variables are absent.

| Variable | Value |
| --- | --- |
| `DEV_API_URL` | `https://blumu-dev.itcollar.com` |
| `DEV_APP_URL` | `https://blumu-web-dev.itcollar.com` |

Do not override these two variables inside the environment.
If either URL changes, run a new build and deployment.
A PM2 restart cannot change the URLs inside the built application.

### Environment variables

Set these in **Environments → development → Environment variables**:

| Variable | Value |
| --- | --- |
| `DEV_SSH_HOST` | `173.212.214.75` |
| `DEV_SSH_USER` | `itcollar-blumu-web-dev` |
| `DEV_BASE_DIR` | `/home/itcollar-blumu-web-dev/htdocs/blumu-web-dev.itcollar.com` |
| `DEV_NODE_BIN` | `/home/itcollar-blumu-web-dev/.nvm/versions/node/v22.23.4/bin/node` |
| `DEV_SSH_PORT` | `22` (default) |
| `DEV_APP_PORT` | `3001` (default) |
| `DEV_PM2_APP_NAME` | `blumu-dev-web` (default) |
| `DEV_KEEP_RELEASES` | `5` (default, minimum `2`) |

### Environment secrets

| Secret | Value |
| --- | --- |
| `DEV_SSH_PRIVATE_KEY` | The full private key, including its BEGIN and END lines. |
| `DEV_SSH_KNOWN_HOSTS` | The verified known-hosts entry from step 3. |

Do not put private keys in variables, commits or workflow files.
The server does not need GitHub credentials.
Actions sends the tested archive over SSH.

## 5. Configure the API

Edit the backend's shared environment file as its site user:

```text
/home/itcollar-blumu-dev/htdocs/blumu-dev.itcollar.com/shared/.env
```

Append `https://blumu-web-dev.itcollar.com` to the existing comma-separated `CORS_ORIGINS` value.
Keep the existing origins.
Set this value for checkout and payment return links:

```dotenv
WEB_PUBLIC_URL=https://blumu-web-dev.itcollar.com
```

Restart the API as `itcollar-blumu-dev`:

```bash
export PATH="/home/itcollar-blumu-dev/.nvm/versions/node/v22.23.4/bin:$PATH"
pm2 restart blumu-dev-api --update-env
```

Test the browser origin:

```bash
curl --fail --include --request OPTIONS \
  --header 'Origin: https://blumu-web-dev.itcollar.com' \
  --header 'Access-Control-Request-Method: GET' \
  --header 'Access-Control-Request-Headers: content-type' \
  https://blumu-dev.itcollar.com/config
```

The response must allow the exact web origin.
Web deployment does not enable Stripe or email delivery.
Those services still require their backend settings.

## 6. Run the first deployment

1. Commit these changes to `blumu-web`.
2. Push or merge them into `development` after steps 1–5.
3. Open **Actions → Deploy development web**.
4. Wait for **Check and build web** and **Deploy web to intika-d2** to pass.
5. Open `https://blumu-web-dev.itcollar.com`.
6. Check `/health` for the expected commit SHA and release ID.

A push to `development` starts deployment automatically.
A pull request into `development` checks the code without SSH access.
The workflow does not deploy from `main`.

To repeat a deployment, use **Re-run all jobs** on its Actions run.
For manual dispatch, select `development` under **Run workflow**.
GitHub shows that button only after the workflow also exists on the repository's default branch.
The first push to `development` works without that button.

## Release behavior

The workflow installs dependencies with `npm ci` and checks ESLint.
Next.js checks TypeScript during the build.
Actions packs the standalone server, dependencies, static files and public files.
It starts the packed release and checks these responses:

- `/health`, including the exact commit SHA and release ID.
- `/` and one JavaScript asset that it references.
- `/privacy` and `/checkout` without a token.
- One optimized image through `/_next/image`.
- `/robots.txt` and the `X-Robots-Tag` header.

The server checks the archive checksum and takes a deployment lock.
It extracts the archive into `releases/<release-id>`.
It checks the build URL, platform, architecture and Node.js major version.
It changes `current` and starts the new PM2 process.
It repeats the checks through localhost and public HTTPS.

If activation or a check fails, the script restores the previous release.
If the first deployment fails, the script removes the failed process and `current` link.
A failed release remains available for inspection.
Successful deployments keep the newest five releases, plus the active and previous releases if needed.
The process restart can cause a short interruption.

Development builds send `X-Robots-Tag: noindex, nofollow` and disallow crawling in `robots.txt`.
This setting does not restrict access to the website.

## Logs and manual rollback

Connect as `itcollar-blumu-web-dev` and run:

```bash
export PATH="/home/itcollar-blumu-web-dev/.nvm/versions/node/v22.23.4/bin:$PATH"
cd /home/itcollar-blumu-web-dev/htdocs/blumu-web-dev.itcollar.com
pm2 status
pm2 logs blumu-dev-web --lines 50
cat current/REVISION
cat current/build-meta.json
cat shared/previous_release
```

To restore the previous release, run:

```bash
base=/home/itcollar-blumu-web-dev/htdocs/blumu-web-dev.itcollar.com
previous=$(cat "$base/shared/previous_release")
test -n "$previous" && test -d "$previous" && \
  bash "$base/current/deploy/cloudpanel/release.sh" \
    "$base" "$(command -v node)" https://blumu-web-dev.itcollar.com \
    blumu-dev-web "$(basename "$previous")" rollback 5 3001
```

This command uses the same lock, checks and failure recovery as a deployment.
Use the configured port if it differs from `3001`.
The first release has no previous release.

## References

- [Next.js standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output).
- [Next.js build and runtime variables](https://nextjs.org/docs/app/guides/environment-variables).
- [CloudPanel application port](https://www.cloudpanel.io/docs/v2/frontend-area/settings/).
- [CloudPanel PM2 deployment](https://www.cloudpanel.io/docs/v2/nodejs/deployment/pm2/).
- [GitHub manual workflow runs](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow).
