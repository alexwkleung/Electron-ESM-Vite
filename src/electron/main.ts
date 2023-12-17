import { app, BrowserWindow, ipcMain, dialog } from 'electron' 
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import chokidar from 'chokidar'
import process from 'node:process'
import { exec } from 'child_process'

const chokidarPaths: string[] = [
    'src/electron/main.ts', 
    'src/electron/renderer/renderer.ts', 
    'src/electron/renderer/*.ts',
    'src/electron/renderer/**/*.ts',
    'src/electron/preload/preload.mts', 
    'src/electron/preload/preload.d.ts', 
    'index.html', 
    'src/electron/expose-api/*.d.ts',
    'src/electron/expose-api/**/*.d.ts',
    'src/electron/expose-api/*.mts',
    'src/electron/expose-api/**/*.mts'
];

const chokidarDev = (): void => {
    chokidar.watch(chokidarPaths).on('all', (event: 'change', path: string) => {
        if(event === 'change' && path !== null && path !== undefined) {
            console.log("File changed: " + path);
    
            try {
                exec('npm run build');
                
                setTimeout(() => {
                    process.kill(process.pid);

                    exec('npm run electron');
                }, 2500)
            } catch(e) {
                throw console.error(e);
            }    
        }
    })
}

let window: BrowserWindow = {} as BrowserWindow;

function ipcHandlers(): void {
    ipcMain.handle('alert', (_: Electron.IpcMainInvokeEvent, message: string) => {
        dialog.showMessageBox(window, {
            message: message
        });
    })
}

function singleInstance(): void {
    //prevent multiple electron instances from running
    if(!app.requestSingleInstanceLock()) {
        app.quit();
        process.exit(0);
    }
}

function createWindow(): void {
    const _dirname: string = dirname(fileURLToPath(import.meta.url));

    window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            //see support matrix: https://www.electronjs.org/docs/latest/tutorial/esm
            preload: join(_dirname, 'preload', 'preload.mjs') || join(_dirname, 'electron', 'preload', 'preload.mjs'), //preload must be mjs with contextIsolated and unsandboxed renderer
            contextIsolation: true,
            sandbox: false, //cannot use ESM in sandboxed renderer
        }
    })

    window.webContents.reloadIgnoringCache();

    if(!app.isPackaged) {        
        //load vite dev server url
        window.loadURL('http://localhost:5173');

        //open dev tools
        window.webContents.openDevTools();

        //run chokidar watch for HMR in dev
        chokidarDev();
    } else {
        //in packaged app, load index.html
        window.loadFile(join(_dirname, 'index.html'))
    }
}

function initWindow(): void {
    app.whenReady().then(() => {
        createWindow();

        app.on('activate', () => {
            if(BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        })

        app.on('window-all-closed', () => {
            if(process.platform !== 'darwin') {
                app.quit();
                process.exit(0);
            }
        })
    })
}

function buildMainWindow(): void {
    //ipc handlers
    ipcHandlers();

    //single instance
    singleInstance();

    //initialize window
    initWindow();
}
buildMainWindow();