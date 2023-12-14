import { contextBridge } from 'electron'
import process from 'process'
import { electronAPI, versionsAPI } from '../../expose-api/expose-api.mjs'

function exposeAPI(): void {
    if(process.contextIsolated) {
        try {
            contextBridge.exposeInMainWorld('electron', electronAPI);

            contextBridge.exposeInMainWorld('versions', versionsAPI);

            console.log('foo');
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