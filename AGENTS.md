# AGENTS.md

## Cursor Cloud specific instructions

### Project state (important)
This repository is a **scaffold only**. It currently contains build/tooling config but **no application source code**:
- Missing dirs/files referenced by `tsconfig.json`: `client/src`, `shared`, `server`, and there is no `index.html` or `vite.config.ts`.
- `package.json` defines **no `dev`/`build`/`start` scripts** (only a placeholder `test` that always fails).

So there is nothing meaningful to "run" yet. Once source code (an `index.html` entry + `client/src`) is added, the toolchain below works.

### Stack
Vite 7 + React 19 + TypeScript 5 + Tailwind CSS v4. Package manager is **npm** (`package-lock.json`). Node 22 is used here (`.replit` pins Replit's `nodejs-20` module, but v22 works fine).

### Running / building / checking
- Dev server (no script defined, run the binary directly): `npx vite --host 0.0.0.0 --port 5000`
  - Port 5000 matches `.replit`'s port mapping (`localPort = 5000` → externalPort 80).
  - With no `index.html` present, the server boots but `/` returns 404 — expected until app source exists.
- Type-check: `npx tsc --noEmit` (passes trivially while there are no source files).
- No lint config or test runner is configured in the repo.

### Gotchas
- `postcss.config.js` is ESM but `package.json` has no `"type": "module"`, so Vite logs a `MODULE_TYPELESS_PACKAGE_JSON` reparse warning. Harmless.
- Tailwind v4 normally uses the `@tailwindcss/postcss` PostCSS plugin; this repo's `postcss.config.js` still uses the `tailwindcss` plugin key. Left as-is (existing config).
