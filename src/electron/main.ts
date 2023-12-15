import { app, BrowserWindow } from 'electron' 
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

//prevent multiple electron instances from running
if(!app.requestSingleInstanceLock()) {
    app.quit();
    process.exit(0);
}

function createWindow(): void {
    const _dirname: string = dirname(fileURLToPath(import.meta.url));

    const window: BrowserWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            //see support matrix: https://www.electronjs.org/docs/latest/tutorial/esm
            preload: join(_dirname, 'preload', 'preload.mjs') || join(_dirname, 'electron', 'preload', 'preload.mjs'), //preload must be mjs with contextIsolated and unsandboxed renderer
            contextIsolation: true,
            sandbox: false, //cannot use ESM in sandboxed renderer
        }
    })

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
initWindow();