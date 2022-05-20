import {app, BrowserWindow, ipcMain} from 'electron'
import {join} from 'path'
const Store = require("secure-electron-store").default
const fs = require("fs")

let store

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 500,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      additionalArguments: [`storePath:${app.getPath("userData")}`],
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  store = new Store({
    path: app.getPath("userData")
  })

  store.mainBindings(ipcMain, mainWindow, fs)

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2]
    mainWindow.loadURL(`http://localhost:${rendererPort}`)
  }
  else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });
});

app.on('window-all-closed', function () {
  store.clearMainBindings(ipcMain)
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('message', (event, message) => {
  console.log(message)
})
