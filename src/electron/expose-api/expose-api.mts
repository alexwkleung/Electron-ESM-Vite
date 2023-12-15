//parts taken from: https://github.com/alex8088/electron-toolkit/blob/master/packages/preload/src/index.ts

import { ipcRenderer } from 'electron'
import { ElectronAPI, Versions } from './expose-api.mjs'

export type { ElectronAPI, Versions } from './expose-api-types'

export const electronAPI: ElectronAPI = {
    ipcRenderer: {
        send(channel, ...args) {
            ipcRenderer.send(channel, ...args)
          },
          invoke(channel, ...args) {
            return ipcRenderer.invoke(channel, ...args)
          },
          on(channel, listener) {
            ipcRenderer.on(channel, listener)
            return () => {
              ipcRenderer.removeListener(channel, listener)
            }
          },
          once(channel, listener) {
            ipcRenderer.once(channel, listener)
          }
    },
    process: {
        get platform() {
            return process.platform
        },
        get versions() {
            return process.versions
        },
        get env() {
            return { ...process.env }
      }
    }
}

//add versions api
export const versionsAPI: Versions = {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
}