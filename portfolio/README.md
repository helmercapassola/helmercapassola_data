# Helmer Capassola — Data Portfolio

A React portfolio showcasing selected work in data engineering, analytics, and
business intelligence.

## Requirements

- Node.js and npm

## Run locally

From the `portfolio` directory, install dependencies and start the development
server:

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Cloudflare Pages

Configure the Cloudflare Pages project with:

- **Root directory:** `portfolio`
- **Build command:** `npm run build`
- **Build output directory:** `build`

The app uses relative asset paths, so the production build works at the domain
root, including `https://helmercapassola.pages.dev/`. It uses in-page anchor
navigation rather than a client-side router, so no additional SPA rewrite rules
are required.

## Other commands

```bash
npm test -- --watchAll=false
npm run build
```

`npm test` runs the test suite. `npm run build` creates an optimized production
build in the `build` directory.
