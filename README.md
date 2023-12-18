# Electron ESM Vite

Example project using Vite with Electron. Not 100% tested.

# Setup

Fork repository (optional)

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

Run unit tests

```bash
npm run test
```

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

# Development server, HMR support, Production files

When you run `npm run dev`, it will do the following steps:

1. Compile TypeScript files (TSC) and other production files (Vite) into `out`. The main entry point for Electron needs to be compiled to `.js`.
2. Launch Vite dev server. Vite will serve the root directory during development. Loaded files will be based on the non-compiled/bundled version (i.e., `.ts`)
3. Spawn Electron process in root directory and load Vite dev server URL in the browser window.
4. Renderer is **contextIsolated** and **unsanboxed** in order to execute **ESM** preload scripts. As the renderer is contextIsolated and unsandboxed, all preload scripts **must** have the `.mjs` extension.
5. When `index.html`, main, preload, and renderer files detect a change, it will rebuild the production files, kill the current Electron process, and re-spawn a new Electron process. **Chokidar** is a *dependency* for the HMR implementation, so don't remove it.
6. Updating CSS during development will be handled by Vite HMR.

Note: `hmr_pid.txt` is an output file for the current Electron PID, which is used in HMR.

# To-Do

1. Framework support

# License

[MIT License.](https://github.com/alexwkleung/Electron-ESM-Vite/blob/main/LICENSE)