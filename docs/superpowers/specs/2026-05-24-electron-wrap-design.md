# Electron 桌面应用封装 · 设计规格

> 日期：2026-05-24 · 状态：已确认

## 1. 概述

将现有 Apple 风格博客页面（index.html）封装为 Electron 桌面应用，使用 Electron Forge 工具链，配置无边框毛玻璃窗口 + macOS 红绿灯控件，并用 Git 进行版本管理。

## 2. 项目结构

```
web/
├── package.json
├── forge.config.js
├── src/
│   ├── main.js           # 主进程
│   ├── preload.js        # 预加载脚本
│   └── renderer/
│       └── index.html    # 博客页面
├── .gitignore
└── dev.md
```

## 3. 主进程（main.js）

- BrowserWindow: `titleBarStyle: 'hidden'`, `vibrancy: 'under-window'`（macOS 毛玻璃）
- 窗口尺寸 1200x800, minWidth: 800, minHeight: 600
- 极简原生菜单（About + 窗口操作）
- IPC 处理: close / minimize / toggleMaximize

## 4. 预加载（preload.js）

- contextBridge 暴露 `window.electronAPI`:
  - `close()` / `minimize()` / `toggleMaximize()`

## 5. 渲染进程（renderer/index.html）

- 现有博客页面完整保留
- 导航栏: `-webkit-app-region: drag`（可拖拽窗口）
- 红绿灯三件套: CSS 模拟 macOS 红黄绿按钮，`no-drag` 区域
- 按钮绑定 `electronAPI` 方法

## 6. Forge 配置

- maker: @electron-forge/maker-zip
- 无 publish 配置（本地使用）

## 7. Git

- `git init` → `.gitignore`（node_modules, out, .DS_Store）→ 初始 commit

## 8. 依赖

- electron: ^33.x
- @electron-forge/cli, @electron-forge/maker-zip
