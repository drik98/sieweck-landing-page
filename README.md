# Sieweck.de Landing Page

This repository contains a Nuxt-based static landing page for `sieweck.de`. The page acts as a simple hub that links to subdomains (e.g. personal sites) and is intended to be built as a static site.

The site is deployed via Netlify to `https://sieweck.netlify.app/`, and DNS records are configured so that `sieweck.de` points to that Netlify deployment.
This is why the Nuxt config uses the Nitro preset `netlify-static`.

## Development

Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
```

The site will be available at `http://localhost:3000`.

## Build

Generate the static site:

```bash
pnpm generate
```

Preview the production build locally:

```bash
pnpm preview
```
