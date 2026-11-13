# Blumu web

The website uses Next.js 16 and React 19.
The backend is in the separate `blumuOrg/blumu` repository.

## Local development

Use the Node.js version in `.nvmrc`.
Copy `.env.example` to `.env.local`.

```bash
npm ci
npm run dev -- --port 3001
```

The API uses port `3000` and the website uses port `3001`.

Run `npm run lint` to check the code.
Run `npm run build` to check types and build the website.

## Development deployment

Follow [the CloudPanel deployment guide](deploy/cloudpanel/README.md).

- Server: `intika-d2` (`173.212.214.75`, from the backend deployment settings).
- Website: `https://blumu-web-dev.itcollar.com`.
- API: `https://blumu-dev.itcollar.com`.
- Branch: `development`.
- Workflow: `.github/workflows/deploy-development.yml`.

A push to `development` checks, builds, tests and deploys the website.
A pull request into `development` runs the checks without deployment.
Complete the server and GitHub setup before the first push.

The workflow builds a standalone Node.js application.
The server starts `server.js` with PM2.
The release archive includes the public files and the generated static files.
The API and website use separate ports and site users.

Set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL` before the build.
Set `BLUMU_NOINDEX=true` before each development build.
For a production build, leave `BLUMU_NOINDEX` unset or set it to `false`.
