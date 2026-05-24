# Electron 桌面应用封装 · 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将现有 Apple 风格博客页面封装为 Electron Forge 桌面应用，无边框毛玻璃窗口 + macOS 红绿灯控件 + Git 版本管理。

**Architecture:** Electron Forge 脚手架，主进程创建无边框 BrowserWindow（titleBarStyle: hidden + vibrancy），preload 通过 contextBridge 暴露窗口控制 API，现有 index.html 作为渲染进程并添加红绿灯按钮和拖拽区域。

**Tech Stack:** Electron 33.x, @electron-forge/cli, @electron-forge/maker-zip

---

### Task 1: 初始化 npm 项目并安装 Electron Forge

**Files:**
- Create: `package.json`

- [ ] **Step 1: 创建 package.json**

```bash
cd /home/ljt1218/文档/Codes/VSCode/web && npm init -y
```

- [ ] **Step 2: 安装 Electron 和 Forge CLI**

```bash
cd /home/ljt1218/文档/Codes/VSCode/web && npm install --save-dev electron @electron-forge/cli @electron-forge/maker-zip
```

- [ ] **Step 3: 写入 package.json 完整内容**

```json
{
  "name": "shiguangji",
  "productName": "拾光集",
  "version": "1.0.0",
  "description": "Apple 风格个人博客桌面应用",
  "main": "src/main.js",
  "scripts": {
    "start": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "devDependencies": {
    "@electron-forge/cli": "^7.6.0",
    "@electron-forge/maker-zip": "^7.6.0",
    "electron": "^33.3.1"
  }
}
```

- [ ] **Step 4: 验证依赖安装**

```bash
cd /home/ljt1218/文档/Codes/VSCode/web && npx electron --version
```

Expected: 输出版本号（如 v33.x.x）

---

### Task 2: 创建 Forge 配置文件

**Files:**
- Create: `forge.config.js`

- [ ] **Step 1: 写入 forge.config.js**

```js
const { MakerZIP } = require('@electron-forge/maker-zip');

module.exports = {
  packagerConfig: {
    asar: true,
    name: '拾光集',
    appBundleId: 'com.shiguangji.blog',
    osxSign: {},
  },
  makers: [
    new MakerZIP({}, ['darwin', 'linux']),
  ],
};
```

---

### Task 3: 创建 Electron 主进程

**Files:**
- Create: `src/main.js`

- [ ] **Step 1: 创建 src 目录**

```bash
mkdir -p /home/ljt1218/文档/Codes/VSCode/web/src
```

- [ ] **Step 2: 写入 src/main.js**

```js
const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('node:path');

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    titleBarStyle: 'hidden',
    vibrancy: 'under-window',
    visualEffectState: 'active',
    title: '拾光集',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

// 极简原生菜单
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
      { label: '关闭窗口', role: 'hide' },
    ],
  },
];

// IPC: 窗口控制
ipcMain.on('window:close', () => mainWindow?.close());
ipcMain.on('window:minimize', () => mainWindow?.minimize());
ipcMain.on('window:toggleMaximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});

// 向渲染进程推送窗口状态变化
mainWindow?.on('maximize', () => mainWindow?.webContents.send('window:maximized', true));
mainWindow?.on('unmaximize', () => mainWindow?.webContents.send('window:maximized', false));

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
```

---

### Task 4: 创建 Preload 脚本

**Files:**
- Create: `src/preload.js`

- [ ] **Step 1: 写入 src/preload.js**

```js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  close: () => ipcRenderer.send('window:close'),
  minimize: () => ipcRenderer.send('window:minimize'),
  toggleMaximize: () => ipcRenderer.send('window:toggleMaximize'),
  onMaximized: (callback) => {
    ipcRenderer.on('window:maximized', (_event, isMaximized) => callback(isMaximized));
  },
});
```

---

### Task 5: 迁移现有博客页面到渲染进程目录

**Files:**
- Move: `index.html` → `src/renderer/index.html`

- [ ] **Step 1: 创建 renderer 目录并移动文件**

```bash
mkdir -p /home/ljt1218/文档/Codes/VSCode/web/src/renderer && mv /home/ljt1218/文档/Codes/VSCode/web/index.html /home/ljt1218/文档/Codes/VSCode/web/src/renderer/index.html
```

---

### Task 6: 为博客页面添加红绿灯按钮和窗口拖拽

**Files:**
- Modify: `src/renderer/index.html`

此任务分两步：在 CSS 中添加红绿灯按钮样式和拖拽区域，在 HTML 导航栏中添加按钮元素。

- [ ] **Step 1: 在 `<style>` 标签内的导航栏样式后，插入红绿灯 CSS**

在 `.nav-logo:hover { opacity: 0.7; }` 之后添加：

```css
/* Traffic light window controls */
.nav-traffic-lights {
  display: flex;
  gap: 8px;
  align-items: center;
  -webkit-app-region: no-drag;
  flex-shrink: 0;
}

.traffic-light {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: filter 0.15s, transform 0.15s;
  border: none;
  padding: 0;
}

.traffic-light:hover { filter: brightness(0.85); transform: scale(1.1); }

.traffic-light.close  { background: #ff5f57; }
.traffic-light.minimize { background: #febc2e; }
.traffic-light.maximize { background: #28c840; }
```

- [ ] **Step 2: 在导航栏 `.nav-inner` 中添加红绿灯按钮**

将导航栏 HTML 修改为（在 `.nav-logo` 之前插入 `nav-traffic-lights` div）：

```html
<nav class="nav" id="navbar">
  <div class="nav-inner">
    <div class="nav-traffic-lights">
      <button class="traffic-light close" id="btnClose" title="关闭"></button>
      <button class="traffic-light minimize" id="btnMinimize" title="最小化"></button>
      <button class="traffic-light maximize" id="btnMaximize" title="全屏"></button>
    </div>
    <a href="#" class="nav-logo">拾光集</a>
    <div class="nav-links">
      <a href="#home">首页</a>
      <a href="#articles">文章</a>
      <a href="#about">关于</a>
      <a href="#tags">标签</a>
    </div>
    <button class="nav-hamburger" id="hamburger" aria-label="菜单">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
```

- [ ] **Step 3: 在 `.nav-inner` CSS 中添加 drag region**

找到 `.nav-inner` 样式，添加 `-webkit-app-region: drag;`：

```css
.nav-inner {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -webkit-app-region: drag;
}
```

同时确保 `.nav-links a` 和 `.nav-hamburger` 有 `-webkit-app-region: no-drag;`：

```css
.nav-links a {
  -webkit-app-region: no-drag;
  /* ... 其余不变 */
}

.nav-hamburger {
  -webkit-app-region: no-drag;
  /* ... 其余不变 */
}
```

---

### Task 7: 添加红绿灯按钮的 JavaScript 交互

**Files:**
- Modify: `src/renderer/index.html`（`<script>` 标签内）

- [ ] **Step 1: 在 JS 自执行函数开头（`'use strict';` 之后）添加 Electron API 桥接**

```js
/* ---------- Electron window controls ---------- */
var isElectron = !!(window.electronAPI);

if (isElectron) {
  document.getElementById('btnClose').addEventListener('click', function () {
    window.electronAPI.close();
  });
  document.getElementById('btnMinimize').addEventListener('click', function () {
    window.electronAPI.minimize();
  });
  document.getElementById('btnMaximize').addEventListener('click', function () {
    window.electronAPI.toggleMaximize();
  });

  window.electronAPI.onMaximized(function (isMaximized) {
    var btn = document.getElementById('btnMaximize');
    if (btn) {
      btn.style.background = isMaximized ? '#febc2e' : '#28c840';
    }
  });
}
```

- [ ] **Step 2: 移动端隐藏红绿灯**

在响应式 CSS 的 `@media (max-width: 767px)` 中添加：

```css
.nav-traffic-lights { display: none; }
```

---

### Task 8: Git 初始化

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: 创建 .gitignore**

```bash
cd /home/ljt1218/文档/Codes/VSCode/web && cat > .gitignore << 'GITEOF'
node_modules/
out/
.DS_Store
*.log
dist/
GITEOF
```

- [ ] **Step 2: Git 初始化并首次提交**

```bash
cd /home/ljt1218/文档/Codes/VSCode/web && git init && git add -A && git commit -m "feat: Electron 桌面应用初始化 — Apple 风格博客 + 无边框毛玻璃窗口 + 红绿灯控件"
```

---

### Task 9: 启动验证

- [ ] **Step 1: 启动 Electron 应用**

```bash
cd /home/ljt1218/文档/Codes/VSCode/web && npm start
```

Expected: 应用窗口打开，显示博客页面，导航栏可拖拽，红绿灯按钮可操作（关闭/最小化/最大化），毛玻璃效果生效。

- [ ] **Step 2: 验证 git 状态干净**

```bash
cd /home/ljt1218/文档/Codes/VSCode/web && git status
```

Expected: `nothing to commit, working tree clean`
