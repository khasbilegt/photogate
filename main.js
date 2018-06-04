const electron = require('electron')
// Module to control application life.
const app = electron.app
// Inter-Process Communication (IPC)
const ipcMain = electron.ipcMain
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const debug = /--debug/.test(process.argv[2])

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let splashWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false,
    backgroundColor: '#fff',
    width: 800, 
    height: 600,
    minHeight: 620,
    minWidth: 770
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Launch fullscreen with DevTools open, usage: npm run debug
  if (debug) {
    mainWindow.webContents.openDevTools()
    mainWindow.maximize()
    require('devtron').install()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function createSplashWindow () {
  splashWindow = new BrowserWindow({
    width: 320,
    height: 240,
    frame: false,
    resizable: false,
    backgroundColor: '#ccc',
    alwaysOnTop: true,
    show: false,
  })

  splashWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'splash.html'),
    protocol: 'file',
    slashes: true
  }))

  splashWindow.on('closed', () => {
    splashWindow = null
  })

  splashWindow.once('ready-to-show', () => {
    splashWindow.show()
    createWindow()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createSplashWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('get-version', event => {
  console.log('app-version: ', app.getVersion())
  event.sender.send('set-version', app.getVersion())
})

ipcMain.on('app-init', event => {
  if (splashWindow) {
    setTimeout(() => {
      splashWindow.close()
    }, 2000)
  }

  mainWindow.show()
})