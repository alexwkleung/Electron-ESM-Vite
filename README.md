# Electron ESM Vite

Sample project using Vite with Electron. Not 100% tested.

# Setup

Clone repository

```bash
git clone <SSH/HTTPS URL>
```

Change directory

```bash
cd <...>/Electron-ESM-Vite
```

Install npm dependencies

```bash
npm install
```

Run dev server

```bash
npm run dev
```

It will do the following steps:

1. Compile TypeScript files (TSC) and other production files (Vite) into `out`.
2. Launch Vite dev server. Vite will serve the `out` directory. Loaded files will be based on production version and not development.
3. Spawn Electron process in root directory and load Vite dev server URL in the browser window.
4. Renderer is **contextIsolated** and **unsanboxed** in order to execute **ESM** preload scripts. As the renderer is contextIsolated and unsandboxed, all preload scripts **must** have the `.mjs` extension.

Package app for distribution

```bash
# package for macOS platform (universal)
npm run package:mac

# package for Windows platform
npm run package:windows

# package for Linux platform
npm run package:linux
```

The packaged app can be found in `dist`.

# To-Do

1. HMR support