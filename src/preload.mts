import { contextBridge } from 'electron'
import process from 'process'
import { electronAPI, versionsAPI } from './expose-api.mjs'

const versions = {
    node: (): string => process.versions.node,
    chrome: (): string => process.versions.chrome,
    electron: (): string => process.versions.electron,
}

async function exposeAPI(): Promise<void> {
    if(process.contextIsolated) {
        try {
            contextBridge.exposeInMainWorld('electron', electronAPI);

            contextBridge.exposeInMainWorld('versions', versionsAPI);
        } catch(e) {
            console.error(e);
        }
    } else {
        //eslint-disable-next-line
        //@ts-ignore
        window.electron = electronAPI;

        //eslint-disable-next-line
        //@ts-ignore
        window.versions = versions;
    }
}
exposeAPI();