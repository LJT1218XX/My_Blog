# 拾光集 · 个人博客桌面应用

> Apple 设计语言的个人博客，使用 Electron 封装为桌面应用，支持无边框毛玻璃窗口与流畅动效。

## 功能特性

### 桌面体验
- **无边框毛玻璃窗口** — macOS 原生 `vibrancy` 效果，窗口背景与系统主题融合
- **红绿灯控件** — 自定义 macOS 风格关闭/最小化/全屏按钮，全屏状态按钮联动变色
- **窗口拖拽** — 导航栏区域可拖拽移动窗口，按钮/链接区域自动排除

### 博客界面
- **Hero 区** — 头像脉冲光环 + 渐变动画名字 + 数据计数动画 + 社交图标悬停渐变
- **文章卡片** — 3D 倾斜跟随鼠标 + 动态光晕 + 光泽扫过动效 + 封面流动渐变
- **侧边栏** — 顶部彩色渐变条 + 热门文章左边框动画 + 标签云悬停渐变放大
- **背景光晕** — 4 个 500px 渐变色球体独立漂浮动画（蓝/紫/琥珀/青）
- **光标光晕** — 500px 径向渐变跟随鼠标缓动

### 动效系统
| 效果 | 描述 |
|------|------|
| 页面加载 | Hero 区模糊淡入上移 + 卡片依次交错出现 |
| 卡片悬停 | 3D 透视倾斜 ±8° + 阴影加深 + 标题渐变 + 光泽扫过 |
| 导航栏 | 滚动时毛玻璃透明度 0.72 → 0.9 + 底部细线 |
| 头像 | 3 层蓝色光环脉冲扩散 + 悬停放大 |
| 名字 | 深灰→蓝→紫渐变色 4s 周期流动 |
| 封面图 | 蓝紫渐变背景 4s 流动动画 |
| 标签/按钮 | 悬停渐变填充 + 放大 + 阴影 |

### 响应式
| 断点 | 布局 | 导航 | 侧边栏 |
|------|------|------|--------|
| ≥1024px | 两列 1fr + 300px | 完整链接 | sticky 右侧 |
| 768–1024px | 两列 1fr + 260px | 完整链接 | 右侧 |
| <768px | 单列堆叠 | 汉堡菜单 + 全屏覆盖 | 移至底部 |

## 技术栈

| 层 | 技术 |
|----|------|
| 桌面框架 | Electron 33 + Electron Forge |
| 前端 | HTML5 + CSS3 + 原生 JavaScript（零依赖） |
| 设计系统 | Apple Design Language（SF Pro 字体栈、8px 栅格、毛玻璃） |
| 打包 | @electron-forge/maker-zip |
| 版本管理 | Git + GitHub |

## 项目结构

```
My_Blog/
├── package.json              # npm 配置 + Forge 脚本
├── forge.config.js           # Electron Forge 打包配置
├── dev.md                    # Apple 风格需求文档
├── README.md
├── .gitignore
├── docs/superpowers/
│   ├── specs/                # 设计规格文档
│   └── plans/                # 实现计划文档
└── src/
    ├── main.js               # Electron 主进程
    ├── preload.js            # 预加载脚本（contextBridge）
    └── renderer/
        └── index.html        # 博客页面（HTML + CSS + JS）
```

## 快速开始

### 环境要求

- Node.js ≥ 18
- npm ≥ 9
- macOS / Linux（Windows 需自行适配窗口样式）

### 安装运行

```bash
# 克隆仓库
git clone git@github.com:LJT1218XX/My_Blog.git
cd My_Blog

# 安装依赖（国内建议配置镜像）
npm install

# 启动桌面应用
npm start
```

> **国内镜像加速：** 如果 Electron 二进制下载缓慢，设置环境变量：
> ```bash
> export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
> npm install
> ```

### 打包

```bash
npm run make    # 生成平台安装包到 out/ 目录
```

## 开发命令

| 命令 | 说明 |
|------|------|
| `npm start` | 启动 Electron 开发模式 |
| `npm run package` | 打包应用（不生成安装包） |
| `npm run make` | 生成可分发的安装包 |

## 设计规范摘要

### 色彩体系

| 用途 | 色值 |
|------|------|
| 页面背景 | `#f5f5f7` |
| 卡片/容器 | `#ffffff` |
| 主文字 | `#1d1d1f` |
| 次级文字 | `#86868b` |
| 强调色 | `#0071e3` |
| 分割线 | `#e8e8ed` |

### 字体

优先 SF Pro Display / SF Pro Text，中文回退 PingFang SC。等宽使用 SF Mono / Menlo。

### 圆角与阴影

| 层级 | 圆角 | 阴影 |
|------|------|------|
| 微小 | 8px | `0 1px 3px rgba(0,0,0,0.04)` |
| 小 | 12px | `0 4px 12px rgba(0,0,0,0.05)` |
| 中 | 18px | `0 12px 32px rgba(0,0,0,0.08)` |
| 大 | 24px | `0 20px 48px rgba(0,0,0,0.1)` |
| 全圆 | 9999px | — |

### 间距（8px 栅格）

8 / 12 / 16 / 24 / 32 / 48 / 64px

## 无障碍

- 所有动效在 `prefers-reduced-motion: reduce` 下自动禁用
- 交互元素均设有 `aria-label`
- 语义化 HTML 结构

## License

MIT
