const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 预加载脚本，用于在渲染进程中安全地暴露 Node.js API
      preload: path.join(__dirname, 'renderer.js')
    }
  });

  // 加载应用的 index.html
  mainWindow.loadFile('index.html');

  // 打开开发者工具（用于调试）
  // mainWindow.webContents.openDevTools();
}

// Electron 完成初始化后，创建浏览器窗口
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    // 在 macOS 上，当点击 dock 图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 当所有窗口都关闭时退出应用，除了 macOS。
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});