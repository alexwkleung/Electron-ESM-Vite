//parts taken from: https://github.com/alex8088/electron-toolkit/blob/master/packages/preload/src/types.ts

import type { IpcRendererEvent } from 'electron'
import type { NodeJS } from 'node'

export interface IpcRenderer {
    on(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): () => void
    once(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void): void
    send(channel: string, ...args: any[]): void
    invoke(channel: string, ...args: any[]): Promise<any>
}

export interface Process {
    readonly platform: string
    readonly versions: { [key: string]: string | undefined }
    readonly env: { [key: string]: string | undefined }
}

export interface ElectronAPI {
    ipcRenderer: IpcRenderer
    process: Process
}

//add versions interface
export interface Versions {
    node: () => NodeJS.Process.Versions.node
    chrome: () => NodeJS.Process.Versions.chrome,
    electron: () => NodeJS.Process.Versions.electron,
}