'user strict';

const { app, BrowserWindow } = require('electron');

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 800,
        useContentSize: true,
        width: 1200,
        // frame: false,
        resizable: false,
        skipTaskbar: false,
        transparent: false,
        title:"Music Player",
        // autoHideMenuBar:true,
        // x:0,
        // y:0
    });
    mainWindow.loadFile('app/index.html');
})