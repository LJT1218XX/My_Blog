const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('node:path');

let mainWindow = null;

const isMac = process.platform === 'darwin';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    ...(isMac && {
      titleBarStyle: 'hidden',
      vibrancy: 'under-window',
      visualEffectState: 'active',
    }),
    title: '拾光集',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

const menuTemplate = [
  {
    label: '拾光集',
    submenu: [
      { label: '关于拾光集', role: 'about' },
      { type: 'separator' },
      { label: '退出', accelerator: 'CmdOrCtrl+Q', role: 'quit' },
    ],
  },
  {
    label: '窗口',
    submenu: [
      { label: '最小化', role: 'minimize' },
      { label: '缩放', role: 'zoom' },
      { type: 'separator' },
      { label: '关闭窗口', role: 'close' },
    ],
  },
];

ipcMain.on('window:close', () => mainWindow?.close());
ipcMain.on('window:minimize', () => mainWindow?.minimize());
ipcMain.on('window:toggleMaximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

app.whenReady().then(() => {
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
