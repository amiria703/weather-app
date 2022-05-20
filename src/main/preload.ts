import {contextBridge, ipcRenderer} from 'electron'
const Store = require("secure-electron-store").default
const fs = require("fs")

const store = new Store()

contextBridge.exposeInMainWorld('api', {
    store: store.preloadBindings(ipcRenderer, fs)
})
