# arsystems-site

Website for A&R Systems, served at [arsystems.dev](https://arsystems.dev).

This repo is connected to Cloudflare Pages: every push to `main` deploys automatically to arsystems.dev. There is no build step; the files at the repo root are served as-is.

- `index.html` – home page
- `coming-soon/index.html` – placeholder for pages that aren't built yet
- `404.html` – same as the coming soon page, shown for any unknown path
- `styles.css`, `favicon.svg` – shared assets

To preview locally: `python3 -m http.server 8000` and open http://localhost:8000.
