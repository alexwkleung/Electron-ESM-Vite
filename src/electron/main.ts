import { app, BrowserWindow, ipcMain, dialog } from 'electron' 
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import process from 'node:process'
import * as fs from 'fs'

let window: BrowserWindow = {} as BrowserWindow;

//DON'T REMOVE IF YOU WANT HMR IN DEV
function hmr(): void {
    //write Electron PID to .dev_hmr.env
    fs.writeFile('hmr_pid.txt', String(process.pid), (err) => {
        if(err) {
            throw console.error(err);
        }
    })
}

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
    //hmr dev
    hmr();

    //ipc handlers
    ipcHandlers();

    //single instance
    singleInstance();

    //initialize window
    initWindow();
}
buildMainWindow();