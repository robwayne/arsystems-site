# arsystems-site

Website for A&R Systems, served at [arsystems.dev](https://arsystems.dev).

Cloudflare Pages deploys every push to `main` and serves the files at the repo root as-is. There is no build step on Cloudflare.

The React app source is in `frontend/`. The root `index.html`, `assets/`, and `icons/` are the production build of that app. After changing the app, rebuild and copy the build to the repo root before pushing:

```bash
cd frontend
npm ci
npm run build
cd ..
cp -R frontend/dist/. .
```

`_redirects` rewrites every route to `index.html`, so pages such as `/products` and `/about` still load on refresh.
