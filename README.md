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

1. Compile TypeScript files (TSC) and other production files (Vite). Both TSC and Vite must compile to different directories, `build` and `dist` respectively.
2. Launch Vite dev server.
3. Spawn Electron process in root directory and load dev server URL in the browser window.
4. Renderer is **contextIsolated** and **unsanboxed** in order to execute **ESM** preload scripts. As the renderer is contextIsolated and unsandboxed, all preload scripts **must** have the `.mjs` extension.
