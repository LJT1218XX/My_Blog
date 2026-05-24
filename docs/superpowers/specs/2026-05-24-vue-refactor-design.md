# Vue 3 重构 · 设计规格

> 日期：2026-05-24 · 状态：已确认

## 1. 概述

将现有 1428 行单文件 HTML 博客页面重构为 Vue 3 + Vite + Vue Router 架构，拆分为独立 SFC 组件，保留所有动效，保留 Electron 桌面壳。

## 2. 技术选型

| 项 | 选型 |
|----|------|
| 框架 | Vue 3.5+ Composition API (`<script setup>`) |
| 构建 | Vite 6 |
| 路由 | Vue Router 4 |
| 状态 | Composables（reactive + computed），无需 Pinia |
| 样式 | `<style scoped>` + CSS 自定义属性，样式集中注入 |

## 3. 路由

| 路径 | 页面 | 描述 |
|------|------|------|
| `/` | HomePage | Hero + 文章列表 + 侧边栏 |
| `/article/:id` | ArticleDetail | 文章全文 Markdown 渲染 |
| `/archive` | ArchivePage | 按年月分组的文章时间线 |
| `/tags` | TagsPage | 标签云 + 文章计数 |
| `/about` | AboutPage | 博主介绍 + 社交链接 |

## 4. 组件树

```
App.vue
├── BackgroundOrbs.vue
├── CursorGlow.vue
├── NavBar.vue
├── MobileNav.vue
├── <router-view>
│   ├── HomePage.vue → HeroSection + ArticleList + Sidebar
│   ├── ArticleDetail.vue
│   ├── ArchivePage.vue
│   ├── TagsPage.vue
│   └── AboutPage.vue
├── FooterSection.vue
└── BackToTop.vue
```

## 5. Composables

- **useArticles()** — 文章数据 reactive 管理，加载更多，按 ID 获取，按日期分组归档
- **useWindowControls()** — 检测 Electron 环境，暴露 close/minimize/toggleMaximize

## 6. 数据流

- 原始文章数据定义在 `data/articles.js`，每条含 id/title/summary/content/tags/date/readTime/cover
- `useArticles()` 将数据包装为 reactive 状态，暴露 computed 分组/筛选
- 文章卡片点击 → `router.push('/article/' + id)`
- 标签点击 → `router.push('/tags?tag=Rust')`

## 7. Electron 适配

- 开发：`main.js` 读取环境变量 `VITE_DEV_SERVER_URL`，`loadURL()` 指向 Vite 热更新服务器
- 生产：窗口直接 `loadFile('dist/renderer/index.html')`
- 红绿灯按钮通过 composable 统一接管 window.electronAPI

## 8. 动效保留

所有 CSS 动画（keyframes、transition）直接迁移到各组件 `<style scoped>`。JS 驱动动效（3D tilt、光标光晕、数字计数、滚动揭示）在 `onMounted` 中初始化，`onUnmounted` 中清理。

## 9. 文件结构

```
src/renderer/
├── index.html
├── vite.config.js
└── src/
    ├── main.js
    ├── App.vue
    ├── style.css              # 全局 CSS 变量 + reset + keyframes
    ├── router/index.js
    ├── composables/
    │   ├── useArticles.js
    │   └── useWindowControls.js
    ├── data/articles.js
    ├── pages/
    │   ├── HomePage.vue
    │   ├── ArticleDetail.vue
    │   ├── ArchivePage.vue
    │   ├── TagsPage.vue
    │   └── AboutPage.vue
    └── components/
        ├── NavBar.vue
        ├── MobileNav.vue
        ├── HeroSection.vue
        ├── ArticleCard.vue
        ├── ArticleList.vue
        ├── Sidebar.vue
        ├── FooterSection.vue
        ├── BackToTop.vue
        ├── BackgroundOrbs.vue
        └── CursorGlow.vue
```

## 10. 依赖增量

```
vue, vue-router, @vitejs/plugin-vue, marked (Markdown 渲染)
```
