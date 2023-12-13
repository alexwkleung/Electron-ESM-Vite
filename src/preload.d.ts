import { ElectronAPI } from './expose-api-types'
import { Versions } from './expose-api-types'

declare global {
    interface Window {
        electron: ElectronAPI;
        versions: Versions
    }
}