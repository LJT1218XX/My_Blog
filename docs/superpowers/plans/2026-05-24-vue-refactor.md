# Vue 3 重构 · 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 将 1428 行单文件 HTML 博客拆分为 Vue 3 SFC 组件树，保留全部动效和 Electron 桌面壳。

**Architecture:** Vue 3 + Vite + Vue Router 4 SPA，Composition API composables 管理状态，全局 CSS 变量集中注入，Electron 主进程通过环境变量判断 dev/prod 加载方式。

**Tech Stack:** Vue 3.5, Vite 6, Vue Router 4, marked, Electron 33

---

### Task 1: 安装 Vue 生态依赖

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 安装依赖**

```bash
cd /home/ljt1218/文档/Codes/VSCode/web && npm install vue vue-router marked && npm install --save-dev @vitejs/plugin-vue vite
```

- [ ] **Step 2: 验证安装**

```bash
node -e "require('vue'); console.log('vue ok')" && node -e "require('vue-router'); console.log('router ok')" && node -e "require('marked'); console.log('marked ok')"
```

---

### Task 2: 创建 Vite 配置和渲染入口

**Files:**
- Create: `src/renderer/vite.config.js`
- Create: `src/renderer/index.html` (Vite 入口)
- Create: `src/renderer/src/` directory

- [ ] **Step 1: 创建目录结构**

```bash
mkdir -p src/renderer/src/{components,pages,composables,data,router}
```

- [ ] **Step 2: 写入 vite.config.js**

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';

export default defineConfig({
  plugins: [vue()],
  root: path.resolve(__dirname),
  base: './',
  build: {
    outDir: path.resolve(__dirname, '..', '..', 'dist', 'renderer'),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
```

- [ ] **Step 3: 写入 index.html（Vite 入口）**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>拾光集 · 个人博客</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

---

### Task 3: 创建全局样式

**Files:**
- Create: `src/renderer/src/style.css`

- [ ] **Step 1: 写入全局样式（CSS 变量 + reset + keyframes）**

从现有 `src/renderer/index.html` 中提取 `:root`、reset、`@keyframes` 部分，写入 `src/renderer/src/style.css`。

内容包含：
- `:root` 中所有 CSS 自定义属性（颜色、圆角、阴影、过渡、间距、字体）
- `*, *::before, *::after` reset
- `html` / `body` 基础样式
- `a` / `img` / `ul` reset
- `@keyframes fadeInUp`, `@keyframes heroEntrance`, `@keyframes ringPulse`, `@keyframes textShimmer`, `@keyframes coverShimmer`, `@keyframes orbFloat1-4`

完整 CSS 从现有 index.html 第 1-121 行和第 220-263 行（keyframes 部分）提取。

---

### Task 4: 创建文章数据和 Composables

**Files:**
- Create: `src/renderer/src/data/articles.js`
- Create: `src/renderer/src/composables/useArticles.js`
- Create: `src/renderer/src/composables/useWindowControls.js`

- [ ] **Step 1: 写入 data/articles.js**

```js
export const articles = [
  {
    id: 1,
    date: '2026-05-20',
    readTime: '8 min',
    title: 'Rust 异步编程：从 Pin 到 Future 的完整旅程',
    summary: '深入理解 Rust 异步模型的核心机制，包括 Pin、Future trait 以及 async/await 的编译器展开过程。',
    content: `## 什么是 Pin？

Pin 是 Rust 异步编程中最令人困惑的概念之一...（此处为 Markdown 正文）

## Future trait

Future 是 Rust 异步抽象的的核心...`,
    tags: ['Rust', '异步编程'],
    cover: true
  },
  {
    id: 2,
    date: '2026-05-15',
    readTime: '6 min',
    title: 'SwiftUI 布局机制深度解析',
    summary: '探索 SwiftUI 的布局协议——ViewThatFits、Layout 协议以及 GeometryReader 的正确使用方式。',
    content: `## SwiftUI 布局三步骤...`,
    tags: ['SwiftUI', 'iOS'],
    cover: false
  },
  {
    id: 3,
    date: '2026-05-10',
    readTime: '5 min',
    title: '使用 Podman 替代 Docker 的完整指南',
    summary: 'Podman 作为无守护进程的容器引擎，在安全性和易用性上都有独特优势。',
    content: `## 为什么选择 Podman...`,
    tags: ['Docker', 'Linux', 'DevOps'],
    cover: true
  },
  {
    id: 4,
    date: '2026-05-05',
    readTime: '10 min',
    title: 'Neovim 插件开发入门与实践',
    summary: '从零开始构建一个 Neovim Lua 插件，涵盖插件结构、LSP 集成等。',
    content: `## 插件结构...`,
    tags: ['Neovim', 'Lua'],
    cover: false
  },
  {
    id: 5,
    date: '2026-04-28',
    readTime: '7 min',
    title: '数据库索引优化：从 B-Tree 到实际应用',
    summary: '当查询变慢时，如何正确地分析和添加索引？',
    content: `## B-Tree 基础...`,
    tags: ['数据库', '性能优化'],
    cover: true
  },
  {
    id: 6,
    date: '2026-04-20',
    readTime: '4 min',
    title: '我的终端配置之旅：Ghostty + Starship',
    summary: '分享在 Fedora Linux 上配置 Ghostty 终端和 Starship 提示符的过程。',
    content: `## 为什么选择 Ghostty...`,
    tags: ['Linux', '工具'],
    cover: false
  },
  {
    id: 7,
    date: '2026-04-12',
    readTime: '9 min',
    title: 'Python 3.14 新特性一览',
    summary: 'Python 3.14 带来了多项性能改进和语法增强。',
    content: `## 性能改进...`,
    tags: ['Python'],
    cover: false
  },
  {
    id: 8,
    date: '2026-04-05',
    readTime: '6 min',
    title: 'CSS 容器查询实战指南',
    summary: '容器查询给响应式设计带来了全新思路。',
    content: `## @container 基础...`,
    tags: ['前端', 'CSS'],
    cover: true
  },
  {
    id: 9,
    date: '2026-03-28',
    readTime: '7 min',
    title: '开源项目维护者的自我修养',
    summary: '维护开源项目不仅仅是写代码。',
    content: `## 社区建设...`,
    tags: ['开源'],
    cover: false
  }
];

export const popularArticles = [
  { title: 'Rust 异步编程：从 Pin 到 Future', views: '2.3k' },
  { title: 'SwiftUI 布局机制深度解析', views: '1.8k' },
  { title: '使用 Podman 替代 Docker 的完整指南', views: '1.5k' },
  { title: 'Neovim 插件开发入门与实践', views: '1.2k' },
];

export const allTags = [
  'Rust', 'SwiftUI', 'Linux', '前端', 'Python', 'Neovim',
  'Docker', '数据库', '性能优化', '开源', '异步编程', 'iOS',
  'DevOps', 'Lua', 'CSS', '工具'
];
```

- [ ] **Step 2: 写入 composables/useArticles.js**

```js
import { reactive, computed } from 'vue';
import { articles as rawArticles } from '../data/articles.js';

const state = reactive({
  all: rawArticles,
});

export function useArticles() {
  const getById = (id) => state.all.find(a => a.id === Number(id));

  const archiveGroups = computed(() => {
    const groups = {};
    state.all.forEach(a => {
      const key = a.date.substring(0, 7); // '2026-05'
      if (!groups[key]) groups[key] = [];
      groups[key].push(a);
    });
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  });

  const tagsWithCount = computed(() => {
    const map = {};
    state.all.forEach(a => {
      a.tags.forEach(t => {
        map[t] = (map[t] || 0) + 1;
      });
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  });

  return { articles: state.all, getById, archiveGroups, tagsWithCount };
}
```

- [ ] **Step 3: 写入 composables/useWindowControls.js**

```js
import { ref, onMounted } from 'vue';

export function useWindowControls() {
  const isElectron = ref(false);

  onMounted(() => {
    isElectron.value = !!(window.electronAPI);
    if (isElectron.value) {
      window.electronAPI.onMaximized((maximized) => {
        isMaximized.value = maximized;
      });
    }
  });

  const isMaximized = ref(false);

  function close() { window.electronAPI?.close(); }
  function minimize() { window.electronAPI?.minimize(); }
  function toggleMaximize() { window.electronAPI?.toggleMaximize(); }

  return { isElectron, isMaximized, close, minimize, toggleMaximize };
}
```

---

### Task 5: 创建 Router 和 Vue 入口

**Files:**
- Create: `src/renderer/src/router/index.js`
- Create: `src/renderer/src/main.js`

- [ ] **Step 1: 写入 router/index.js**

```js
import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ArticleDetail from '../pages/ArticleDetail.vue';
import ArchivePage from '../pages/ArchivePage.vue';
import TagsPage from '../pages/TagsPage.vue';
import AboutPage from '../pages/AboutPage.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/article/:id', name: 'article', component: ArticleDetail },
  { path: '/archive', name: 'archive', component: ArchivePage },
  { path: '/tags', name: 'tags', component: TagsPage },
  { path: '/about', name: 'about', component: AboutPage },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});
```

- [ ] **Step 2: 写入 main.js（Vue 入口）**

```js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './style.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
```

---

### Task 6: 创建 App.vue + 全局组件

**Files:**
- Create: `src/renderer/src/App.vue`
- Create: `src/renderer/src/components/BackgroundOrbs.vue`
- Create: `src/renderer/src/components/CursorGlow.vue`

- [ ] **Step 1: 写入 App.vue**

```vue
<template>
  <BackgroundOrbs />
  <CursorGlow />
  <NavBar />
  <MobileNav />
  <router-view />
  <FooterSection />
  <BackToTop />
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import MobileNav from './components/MobileNav.vue';
import FooterSection from './components/FooterSection.vue';
import BackToTop from './components/BackToTop.vue';
import BackgroundOrbs from './components/BackgroundOrbs.vue';
import CursorGlow from './components/CursorGlow.vue';
</script>
```

- [ ] **Step 2: 写入 BackgroundOrbs.vue**（4 个光晕球体，纯展示无逻辑）

```vue
<template>
  <div class="bg-orbs" aria-hidden="true">
    <div class="bg-orb"></div>
    <div class="bg-orb"></div>
    <div class="bg-orb"></div>
    <div class="bg-orb"></div>
  </div>
</template>

<style scoped>
/* 从 index.html 复制 .bg-orbs 和 .bg-orb 样式（含 keyframes orbFloat1-4） */
.bg-orbs { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.bg-orb { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.3; animation-timing-function: ease-in-out; animation-iteration-count: infinite; animation-direction: alternate; }
.bg-orb:nth-child(1) { width: 500px; height: 500px; background: radial-gradient(circle, #0071e3 0%, transparent 70%); top: -10%; left: -5%; animation: orbFloat1 18s infinite alternate ease-in-out; }
.bg-orb:nth-child(2) { width: 400px; height: 400px; background: radial-gradient(circle, #a855f7 0%, transparent 70%); bottom: 20%; right: -8%; animation: orbFloat2 22s infinite alternate ease-in-out; }
.bg-orb:nth-child(3) { width: 350px; height: 350px; background: radial-gradient(circle, #f59e0b 0%, transparent 70%); top: 60%; left: 40%; animation: orbFloat3 20s infinite alternate ease-in-out; }
.bg-orb:nth-child(4) { width: 300px; height: 300px; background: radial-gradient(circle, #06b6d4 0%, transparent 70%); top: 30%; left: 50%; animation: orbFloat4 16s infinite alternate ease-in-out; }
@keyframes orbFloat1 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(80px,60px) scale(1.2); } }
@keyframes orbFloat2 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-60px,-40px) scale(1.15); } }
@keyframes orbFloat3 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(40px,-80px) scale(1.1); } }
@keyframes orbFloat4 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-50px,30px) scale(1.25); } }
@media (max-width: 767px) { .bg-orb:nth-child(3), .bg-orb:nth-child(4) { display: none; } .bg-orb:nth-child(1), .bg-orb:nth-child(2) { opacity: 0.15; } }
@media (prefers-reduced-motion: reduce) { .bg-orb { animation: none; } }
</style>
```

- [ ] **Step 3: 写入 CursorGlow.vue**（光标跟随光晕）

```vue
<template>
  <div class="cursor-glow" ref="glowEl" aria-hidden="true"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const glowEl = ref(null);
let targetX = -1000, targetY = -1000;
let currentX = -1000, currentY = -1000;
let rafId = null;

function onMove(e) { targetX = e.clientX; targetY = e.clientY; }
function animate() {
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;
  if (glowEl.value) {
    glowEl.value.style.left = currentX + 'px';
    glowEl.value.style.top = currentY + 'px';
  }
  rafId = requestAnimationFrame(animate);
}
function onLeave() { if (glowEl.value) glowEl.value.style.opacity = '0'; }
function onEnter() { if (glowEl.value) glowEl.value.style.opacity = '1'; }

onMounted(() => {
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseleave', onLeave);
  document.addEventListener('mouseenter', onEnter);
  rafId = requestAnimationFrame(animate);
});
onUnmounted(() => {
  document.removeEventListener('mousemove', onMove);
  document.removeEventListener('mouseleave', onLeave);
  document.removeEventListener('mouseenter', onEnter);
  cancelAnimationFrame(rafId);
});
</script>

<style scoped>
.cursor-glow { position: fixed; pointer-events: none; z-index: 9999; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(0,113,227,0.06) 0%, transparent 60%); transform: translate(-50%, -50%); transition: opacity 0.3s; will-change: left, top; }
</style>
```

---

### Task 7: 创建 NavBar + MobileNav

**Files:**
- Create: `src/renderer/src/components/NavBar.vue`
- Create: `src/renderer/src/components/MobileNav.vue`

- [ ] **Step 1: 写入 NavBar.vue**

```vue
<template>
  <nav class="nav" :class="{ scrolled }" id="navbar">
    <div class="nav-inner">
      <div v-if="isElectron" class="nav-traffic-lights">
        <button class="traffic-light close" @click="close" title="关闭"></button>
        <button class="traffic-light minimize" @click="minimize" title="最小化"></button>
        <button class="traffic-light" :class="isMaximized ? 'minimize' : 'maximize'" @click="toggleMaximize" title="全屏"></button>
      </div>
      <router-link to="/" class="nav-logo">拾光集</router-link>
      <div class="nav-links">
        <router-link to="/">首页</router-link>
        <router-link to="/archive">归档</router-link>
        <router-link to="/tags">标签</router-link>
        <router-link to="/about">关于</router-link>
      </div>
      <button class="nav-hamburger" :class="{ active: menuOpen }" @click="$emit('toggleMenu')" aria-label="菜单">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useWindowControls } from '../composables/useWindowControls.js';

defineEmits(['toggleMenu']);
defineProps({ menuOpen: Boolean });

const { isElectron, isMaximized, close, minimize, toggleMaximize } = useWindowControls();
const scrolled = ref(false);
let ticking = false;

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => { scrolled.value = window.scrollY > 10; ticking = false; });
    ticking = true;
  }
}

onMounted(() => window.addEventListener('scroll', onScroll));
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<style scoped>
/* 完整复制 index.html 中 .nav, .nav-inner, .nav-logo, .nav-links, .nav-hamburger, .nav-traffic-lights, .traffic-light 样式，并添加 -webkit-app-region */
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; height: 52px; background: rgba(255,255,255,0.72); backdrop-filter: saturate(180%) blur(20px); -webkit-backdrop-filter: saturate(180%) blur(20px); border-bottom: 1px solid transparent; transition: background 0.3s, border-color 0.3s, box-shadow 0.3s; }
.nav.scrolled { background: rgba(255,255,255,0.9); border-bottom-color: #e8e8ed; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
.nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 100%; display: flex; align-items: center; justify-content: space-between; -webkit-app-region: drag; }
.nav-logo { font-family: 'SF Pro Display', -apple-system, 'PingFang SC', sans-serif; font-size: 20px; font-weight: 700; background: linear-gradient(135deg, #1d1d1f 0%, #0071e3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-decoration: none; }
.nav-links { display: flex; gap: 32px; }
.nav-links a { font-size: 14px; font-weight: 500; color: #86868b; text-decoration: none; transition: color 0.15s; -webkit-app-region: no-drag; position: relative; }
.nav-links a.router-link-active { color: #1d1d1f; }
.nav-links a.router-link-active::after { width: 100%; }
.nav-links a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px; background: linear-gradient(90deg, #0071e3, #a855f7); border-radius: 2px; transition: width 0.3s; }
.nav-hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px; z-index: 1001; -webkit-app-region: no-drag; }
.nav-hamburger span { display: block; width: 20px; height: 2px; background: #1d1d1f; border-radius: 2px; transition: transform 0.4s, opacity 0.15s; }
.nav-hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav-hamburger.active span:nth-child(2) { opacity: 0; }
.nav-hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
.nav-traffic-lights { display: flex; gap: 8px; align-items: center; -webkit-app-region: no-drag; flex-shrink: 0; }
.traffic-light { width: 12px; height: 12px; border-radius: 50%; cursor: pointer; transition: filter 0.15s, transform 0.15s; border: none; padding: 0; }
.traffic-light:hover { filter: brightness(0.85); transform: scale(1.1); }
.traffic-light.close { background: #ff5f57; }
.traffic-light.minimize { background: #febc2e; }
.traffic-light.maximize { background: #28c840; }
@media (max-width: 767px) { .nav-links { display: none; } .nav-hamburger { display: flex; } .nav-traffic-lights { display: none; } }
</style>
```

- [ ] **Step 2: 写入 MobileNav.vue**（移动端菜单覆盖层）

```vue
<template>
  <Teleport to="body">
    <div class="mobile-nav" :class="{ active: modelValue }" @click="$emit('update:modelValue', false)">
      <router-link to="/" @click.stop="$emit('update:modelValue', false)">首页</router-link>
      <router-link to="/archive" @click.stop="$emit('update:modelValue', false)">归档</router-link>
      <router-link to="/tags" @click.stop="$emit('update:modelValue', false)">标签</router-link>
      <router-link to="/about" @click.stop="$emit('update:modelValue', false)">关于</router-link>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({ modelValue: Boolean });
defineEmits(['update:modelValue']);
</script>

<style scoped>
.mobile-nav { display: none; position: fixed; inset: 0; z-index: 999; background: rgba(255,255,255,0.97); backdrop-filter: blur(40px); flex-direction: column; align-items: center; justify-content: center; gap: 40px; opacity: 0; pointer-events: none; transition: opacity 0.4s cubic-bezier(0.175,0.885,0.32,1.275); }
.mobile-nav.active { opacity: 1; pointer-events: auto; display: flex; }
.mobile-nav a { font-family: 'SF Pro Display', -apple-system, sans-serif; font-size: 28px; font-weight: 600; color: #1d1d1f; text-decoration: none; transition: color 0.15s, transform 0.3s; }
.mobile-nav a:hover { color: #0071e3; transform: scale(1.05); }
</style>
```

---

### Task 8: 创建 HeroSection + FooterSection + BackToTop

**Files:**
- Create: `src/renderer/src/components/HeroSection.vue`
- Create: `src/renderer/src/components/FooterSection.vue`
- Create: `src/renderer/src/components/BackToTop.vue`

- [ ] **Step 1: 写入 HeroSection.vue**（头像脉冲环 + 渐变动画名 + 计数动画 + 社交图标）

完整复制 index.html 中 hero 区 HTML 结构和 CSS 样式。关键 JS：IntersectionObserver 触发数字计数动画（easeOut cubic）。关键 CSS：avatar-ring 动画、hero-name 渐变动画、hero-social 悬停渐变。

- [ ] **Step 2: 写入 FooterSection.vue**（纯展示）

页脚组件：友情链接/RSS/隐私政策/关于本站 + 版权信息。

- [ ] **Step 3: 写入 BackToTop.vue**（scroll 监听 + 淡入淡出）

回到顶部按钮：`window.scrollY > 500` 时 visible，点击 `scrollTo({ top: 0, behavior: 'smooth' })`，悬停渐变环。

---

由于计划篇幅限制，Task 9-12 中的完整组件代码（ArticleCard 3D tilt、ArticleList、Sidebar、各 Page）和 Task 13（Electron main.js 更新）将包含完整的 `<template>` + `<script setup>` + `<style scoped>`，从现有 index.html 中逐块提取对应 CSS/JS 逻辑。

### Task 9: 创建 ArticleCard + ArticleList + Sidebar

- ArticleCard.vue：3D tilt（mousemove 实时 rotateX/rotateY）、glare 跟随鼠标、光泽扫过、封面流动渐变
- ArticleList.vue：v-for 渲染 ArticleCard，接收 articles prop，emit 点击事件
- Sidebar.vue：关于我 + 热门文章（左移效果）+ 标签云（渐变放大）

### Task 10: 创建 5 个 Page 组件

- HomePage.vue：组合 HeroSection + ArticleList + Sidebar
- ArticleDetail.vue：marked 渲染文章内容 + 返回按钮 + 目录
- ArchivePage.vue：年/月分组时间线
- TagsPage.vue：标签云 + 文章计数，支持 ?tag= 筛选
- AboutPage.vue：详细关于页

### Task 11: 更新 App.vue 集成 MobileNav 状态

App.vue 中通过 `ref` 管理 `menuOpen`，传递给 NavBar 和 MobileNav。

### Task 12: 更新 Electron main.js 适配 Vite

修改 `src/main.js`，在开发模式下通过 `VITE_DEV_SERVER_URL` 环境变量加载 Vite 开发服务器。

### Task 13: 清理 + 验证 + 提交推送

删除旧的 `src/renderer/index.html`（已被 Vite 入口替代），运行 `npm start` 验证，提交并推送。
