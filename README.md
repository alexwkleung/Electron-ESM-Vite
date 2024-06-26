# Electron ESM Vite

Vite + Electron + ESM project template. 

Quickly get started using Vite and ESM in Electron without heavy boilerplate.

# Features 

Out of the box:

1. [ESM support in Electron](https://www.electronjs.org/docs/latest/tutorial/esm#summary-esm-support-matrix) (as of v28.0.0).
2. HMR (Hot-Module Replacement).
3. Vanilla TypeScript with ESLint.
4. Vitest for unit testing.

# Notice on usage

1. As of now the example project should suffice for scaffolding a new project.
2. Migrating an existing project to use this as a base is possible for most cases.

[Submit a issue](https://github.com/alexwkleung/Electron-ESM-Vite/issues) if you have problems with the setup or migration process.

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
2. Launch Vite dev server. Vite will serve the root directory during development. Loaded files will be based on the non-compiled/bundled version (i.e., `.ts`).
3. Spawn Electron process in root directory and load Vite dev server URL in the browser window.
4. Run `cli.js` to activate HMR.
5. Renderer is **contextIsolated** and **unsanboxed** in order to execute **ESM** preload scripts. As the renderer is contextIsolated and unsandboxed, all preload scripts **must** have the `.mjs` extension.
6. When `index.html`, main, preload, and renderer files detect a change, it will rebuild the production files, kill the current Electron process, and re-spawn a new Electron process. **Chokidar** is a *dependency* for the HMR implementation, so don't remove it.

# Note 

1. `.hmr_pid.txt` is an output file for the current Electron PID, which is used in HMR.

2. If you are using a framework, you might need to update the glob pattern array in `chokidarPaths` and `chokidarPathsIgnore` within `cli.js`. 

3. Vite's HMR is disabled in favour of Electron-ESM-Vite's custom one using Chokidar (`cli.js`/`hmr()`).

4. It is recommended to follow the same folder structure to avoid any path issues.

# License

[MIT License.](https://github.com/alexwkleung/Electron-ESM-Vite/blob/main/LICENSE)