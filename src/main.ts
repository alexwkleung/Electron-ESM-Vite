import { app, BrowserWindow } from 'electron' 
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

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
            preload: join(_dirname, './preload.js'),
            contextIsolation: true
        }
    })

    window.loadURL('http://localhost:5173');
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