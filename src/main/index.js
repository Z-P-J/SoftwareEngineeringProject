'use strict'

import { app, BrowserWindow, Menu, dialog, ipcMain, Tray } from 'electron'
import * as fs from 'fs'
import path from 'path'
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const STORE_PATH = app.getPath('userData') // 获取electron应用的用户目录
console.log('userData path: ', STORE_PATH)

const fsExtra = require('fs-extra')
if (!fsExtra.pathExistsSync(STORE_PATH)) { // 如果不存在路径
  fsExtra.mkdirpSync(STORE_PATH) // 就创建
}
const adapter = new FileSync(path.join(STORE_PATH, '/music-player-db.json')) // 初始化lowdb读写的json文件名以及存储路径
const db = low(adapter)

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
console.log('NODE_ENV=' + process.env.NODE_ENV)
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9081`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  const options = {
    height: 800,
    width: 1200,
    show: true,
    center: true,
    fullscreenable: false,
    resizable: false,
    title: 'music-player',
    // vibrancy: 'ultra-dark',
    // backgroundColor: '#ffffff', // 背景色
    transparent: true,
    frame: false,
    hasShadow: false,
    webPreferences: {
      backgroundThrottling: false,
      webSecurity: false
    }
  }
  if (process.platform === 'darwin') { // 针对mac平台做出不同的配置
  }
  if (process.platform === 'linux') { // 针对linux平台做出不同的配置
    options.transparent = true
    options.titleBarStyle = 'hidden'
    Menu.setApplicationMenu(null)
  }
  if (process.platform === 'win32') { // 针对windows平台做出不同的配置
    options.frame = false // 创建一个frameless窗口
    options.transparent = true
    options.titleBarStyle = 'hidden'
    Menu.setApplicationMenu(null)
  }

  mainWindow = new BrowserWindow(options)
  // const menu = Menu.buildFromTemplate(template)
  // Menu.setApplicationMenu(menu)

  if (process.platform === 'win32') {
    let tray = null
    // 创建系统通知区菜单
    tray = new Tray(`${__static}/icon.ico`)

    mainWindow.on('show', () => {
      tray.setHighlightMode('always')
    })

    mainWindow.on('hide', () => {
      tray.setHighlightMode('never')
    })

    const contextMenu = Menu.buildFromTemplate([
      {label: '退出', click: () => { mainWindow.destroy() }} // 我们需要在这里有一个真正的退出（这里直接强制退出）
    ])

    tray.setToolTip('music-player')
    tray.setContextMenu(contextMenu)
    tray.on('click', () => { // 我们这里模拟桌面程序点击通知区图标实现打开关闭应用的功能
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
      mainWindow.isVisible() ? mainWindow.setSkipTaskbar(false) : mainWindow.setSkipTaskbar(true)
    })
  }

  mainWindow.loadURL(winURL)

  mainWindow.on('close', (event) => {
    mainWindow.webContents.send('main-process-messages', 'close')
    if (process.platform === 'win32') {
      mainWindow.hide()
      mainWindow.setSkipTaskbar(true)
      event.preventDefault()
    }
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.request_remote = require('request')
app.got_remote = require('got')
app.fs = fs
app.dialog = dialog

db.defaults({setting: { saveDir: '', redotAbout: true, remoteSearch: true }, playlist: []})
  .write()

ipcMain.on('DataOP', (event, arg) => {
  console.log(arg)
  if (arg['method'] === 'set') {
    db.set('setting', arg['setting']).write()
    db.set('playlist', arg['audios']).write()
    event.returnValue = 'success'
  }
  if (arg['method'] === 'get') {
    let setting = db.get('setting').value()
    let playlist = db.get('playlist').value()
    event.returnValue = {setting: setting, playlist: playlist}
  }
})

ipcMain.on('close',e=>{
  mainWindow.close()
})
ipcMain.on('minimize',e=>{
  mainWindow.minimize()
})
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
