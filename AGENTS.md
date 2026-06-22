# AGENTS.md

## Cursor Cloud specific instructions

### What this app is
A single-page, mobile-first marketing site (in Portuguese) for **WR Soluções Digitais** — a clone of `https://resolve-digital-hub.lovable.app`. All CTAs deep-link to WhatsApp (`wa.me/5531980252882`). There is no backend; it is a static front-end.

### Stack
Vite 7 + React 19 + TypeScript 5 + Tailwind CSS **v4**. Package manager is **npm** (`package-lock.json`). Node 22 is used here (`.replit` pins Replit's `nodejs-20` module, but v22 works fine).

### Layout
- `index.html` (Vite entry, at repo root) → `/client/src/main.tsx`.
- App code lives in `client/src/` (`App.tsx`, `components/`, `data.ts`, `index.css`). Path alias `@/*` → `client/src/*` (see `vite.config.ts` + `tsconfig.json`).
- Service/shortcut content and the WhatsApp phone/email constants are centralized in `client/src/data.ts`.

### Running / building / checking (see `package.json` scripts)
- Dev server: `npm run dev` (Vite on `0.0.0.0:5000`; port 5000 matches `.replit`'s mapping → externalPort 80).
- Type-check: `npx tsc --noEmit`.
- Production build: `npm run build` (`tsc && vite build`); preview with `npm run preview`.
- No lint config or automated test runner is configured.

### Deploy (static, no Node — e.g. cPanel/HostGator)
`npm run build` outputs a fully static site to `dist/` (HTML/CSS/JS) — no server runtime needed. Build `base` is set to `./` (relative) in `vite.config.ts` so it works from `public_html` root or any subfolder. `public/.htaccess` (gzip, cache, optional HTTPS redirect, SPA fallback) and `public/favicon.svg` are copied into `dist/` automatically. Upload the contents of `dist/` into the hosting folder.

### Gotchas (non-obvious)
- Tailwind is **v4**: theme tokens (oklch colors, fonts, animations) are defined in CSS via `@theme` in `client/src/index.css` — there is no JS color config there. The legacy `tailwind.config.ts` is from the original scaffold and is essentially unused by v4's CSS-first setup.
- PostCSS must use the **`@tailwindcss/postcss`** plugin (v4), already wired in `postcss.config.js`. The plain `tailwindcss` plugin key does not work under v4.
