# 拾光集 · 个人博客桌面应用

> Apple 设计语言的个人博客，Vue 3 + Vite 构建，Electron 封装为桌面应用，5 个路由页面，保留全部华丽动效。

## 功能特性

### 5 个页面

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | Hero + 文章卡片列表 + 侧边栏 |
| `/article/:id` | 文章详情 | Markdown 渲染全文阅读 |
| `/archive` | 归档 | 按年月分组的文章时间线 |
| `/tags` | 标签 | 标签卡片墙，支持筛选 |
| `/about` | 关于 | 博主介绍 + 社交链接 |

### 桌面体验

- **无边框毛玻璃窗口** — macOS `vibrancy: under-window`，窗口背景与系统主题融合
- **红绿灯控件** — macOS 风格关闭/最小化/全屏按钮，全屏状态按钮联动变色
- **窗口拖拽** — 导航栏区域可拖拽移动窗口，交互元素自动排除

### 动效系统

| 效果 | 描述 |
|------|------|
| 背景光晕 | 4 个 500px 渐变色球体（蓝/紫/琥珀/青），120px blur，独立漂浮动画 |
| 光标光晕 | 500px 径向渐变跟随鼠标缓动（系数 0.08） |
| 头像脉冲 | 3 层蓝色光环以 3s 间隔向外扩散 |
| 名字渐变 | 深灰→蓝→紫 `background-position` 4s 周期流动 |
| 卡片 3D 倾斜 | `perspective(1000px)` + 鼠标实时 `rotateX/rotateY` ±8° + 动态光晕 |
| 光泽扫过 | 悬停时半透明白光 0.6s 从左到右扫过卡片 |
| 封面流动 | 蓝紫渐变背景 4s 动画 |
| 计数动画 | IntersectionObserver 触发 easeOut 数字滚动（文章/阅读/粉丝） |
| 滚动揭示 | 元素进入视口时 blur→清晰 + 上移淡入 |
| 社交图标 | 悬停渐变填充 + 上浮 + 阴影 |
| 加载更多 | 蓝紫渐变按钮 + 扫光效果 + 悬停位移 |

### 响应式

| 断点 | 布局 | 导航 | 侧边栏 |
|------|------|------|--------|
| ≥1024px | 两列 1fr + 300px | 完整链接 | sticky 右侧 |
| 768–1024px | 两列 1fr + 260px | 完整链接 | 右侧 |
| <768px | 单列堆叠 | 汉堡菜单 | 移至底部 |

## 技术栈

| 层 | 技术 |
|----|------|
| 前端框架 | Vue 3.5 (Composition API + `<script setup>`) |
| 构建工具 | Vite 8 |
| 路由 | Vue Router 4 (Hash 模式) |
| Markdown | marked |
| 桌面框架 | Electron 33 + Electron Forge |
| 设计系统 | Apple Design Language (SF Pro 字体栈、8px 栅格) |
| 打包 | @electron-forge/maker-zip |

## 项目结构

```
My_Blog/
├── package.json
├── forge.config.js               # Electron Forge 打包配置
├── vite.config.js                # Vite 配置（src/renderer/ 下）
├── dev.md                        # Apple 风格需求文档
├── .gitignore
├── docs/superpowers/
│   ├── specs/                    # 设计规格文档 ×3
│   └── plans/                    # 实现计划文档 ×3
└── src/
    ├── main.js                   # Electron 主进程（Vite dev/prod 双模式）
    ├── preload.js                # contextBridge 窗口控制 API
    └── renderer/
        ├── index.html            # Vite 入口 HTML
        └── src/
            ├── main.js           # Vue 入口
            ├── App.vue           # 根组件
            ├── style.css         # CSS 变量 + reset + keyframes
            ├── router/index.js   # 5 条路由
            ├── data/articles.js  # 文章原始数据
            ├── composables/      # useArticles / useWindowControls / useScrollReveal
            ├── components/       # 10 个 SFC 组件
            │   ├── NavBar.vue          # 毛玻璃导航 + 红绿灯
            │   ├── MobileNav.vue       # 汉堡菜单覆盖层
            │   ├── HeroSection.vue     # 头像 + 计数 + 社交
            │   ├── ArticleCard.vue     # 3D tilt 卡片
            │   ├── ArticleList.vue     # 卡片列表 + 加载更多
            │   ├── Sidebar.vue         # 关于我 + 热门 + 标签云
            │   ├── FooterSection.vue   # 页脚
            │   ├── BackToTop.vue       # 回到顶部
            │   ├── BackgroundOrbs.vue  # 背景光晕
            │   └── CursorGlow.vue      # 光标跟随
            └── pages/            # 5 个路由页面
                ├── HomePage.vue
                ├── ArticleDetail.vue
                ├── ArchivePage.vue
                ├── TagsPage.vue
                └── AboutPage.vue
```

## 快速开始

### 环境要求

- Node.js ≥ 18
- npm ≥ 9
- macOS / Linux（Windows 需自行适配 `titleBarStyle`）

### 安装

```bash
git clone git@github.com:LJT1218XX/My_Blog.git
cd My_Blog
npm install
```

> **国内镜像：** Electron 二进制下载缓慢时：
> ```bash
> export ELECTRON_MIRROR="https://npmmirror.com/mirrors/electron/"
> npm install
> ```

### 开发

```bash
npm run dev    # Vite HMR 热更新 + Electron 窗口同步启动
```

Vite 开发服务器运行在 `localhost:5173`，Electron 自动加载该地址并打开 DevTools。

### 生产

```bash
npm run build  # 仅构建 Vue 前端 → dist/renderer/
npm start      # 构建 + 启动 Electron 加载生产文件
npm run make   # 生成分发的安装包 → out/
```

## 设计规范

### 色彩

| 用途 | 色值 |
|------|------|
| 页面背景 | `#f5f5f7` |
| 卡片/容器 | `#ffffff` |
| 主文字 | `#1d1d1f` |
| 次级文字 | `#86868b` |
| 强调色 | `#0071e3` |
| 分割线 | `#e8e8ed` |

### 字体

SF Pro Display / SF Pro Text 优先，中文回退 PingFang SC。等宽 SF Mono / Menlo。

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

- `prefers-reduced-motion: reduce` 时禁用所有动效
- 交互元素均设 `aria-label`
- 语义化 HTML + Vue `<Teleport>` 正确使用

## License

MIT
