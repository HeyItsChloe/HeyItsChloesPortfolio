# Chloe Aribo — Portfolio

React + TypeScript + Tailwind conversion of the original static HTML site, with the
copy rewritten to reflect real projects (BusyBuddy, OrderMate) instead of the template's
placeholder bio/clients.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

## Deploy (GitHub Pages)

This repo ships a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds
and deploys `dist/` to GitHub Pages on every push to `main`.

One-time setup on GitHub: **Settings → Pages → Source → GitHub Actions**.

The site will be served at `https://<owner>.github.io/HeyItsChloesPortfolio/`. The Vite
`base` path in `vite.config.ts` is already set to match — update it if the repo is renamed.

## Assets still needed

- **Avatar**: the nav currently shows a "CA" initials placeholder (`src/components/Nav.tsx`)
  instead of a real photo — no `profile.png` file was available to include. Drop a real
  photo into `public/profile.png` and swap the placeholder `<div>` for an `<img>`.
- **Card poster images**: the four Featured Work cards use CSS gradients as the pre-hover
  thumbnail instead of real poster stills (`src/data/projects.ts` → `poster` field). Real
  video files (`hero.mp4`, `travel.mp4`, `adventure.mp4`, `architecture.mp4`, `tech.mp4`)
  are already wired up and play on hover.
- **Case studies / blogs**: "Case Study — Product Launch" and "Case Study — Platform
  Redesign" are placeholder copy pending real write-ups, as are the "Recently Added" mini
  cards (Blogs, Templates, etc.) — swap in real content in `src/data/projects.ts` whenever
  it's ready.
