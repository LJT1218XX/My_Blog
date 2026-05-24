<template>
  <nav class="nav" :class="{ scrolled }">
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

defineProps({ menuOpen: Boolean });
defineEmits(['toggleMenu']);
const { isElectron, isMaximized, close, minimize, toggleMaximize } = useWindowControls();
const scrolled = ref(false);
let ticking = false;
function onScroll() { if (!ticking) { requestAnimationFrame(() => { scrolled.value = window.scrollY > 10; ticking = false; }); ticking = true; } }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<style scoped>
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; height: 52px; background: rgba(255,255,255,0.72); backdrop-filter: saturate(180%) blur(20px); -webkit-backdrop-filter: saturate(180%) blur(20px); border-bottom: 1px solid transparent; transition: background 0.3s, border-color 0.3s, box-shadow 0.3s; }
.nav.scrolled { background: rgba(255,255,255,0.9); border-bottom-color: #e8e8ed; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
.nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 100%; display: flex; align-items: center; gap: 12px; -webkit-app-region: drag; }
.nav-logo { font-family: 'SF Pro Display', -apple-system, 'PingFang SC', sans-serif; font-size: 20px; font-weight: 700; background: linear-gradient(135deg, #1d1d1f 0%, #0071e3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-decoration: none; flex-shrink: 0; }
.nav-links { display: flex; gap: 32px; margin-left: auto; }
.nav-links a { font-size: 14px; font-weight: 500; color: #86868b; text-decoration: none; transition: color 0.15s; -webkit-app-region: no-drag; position: relative; }
.nav-links a:hover { color: #1d1d1f; }
.nav-links a.router-link-exact-active { color: #1d1d1f; }
.nav-links a.router-link-exact-active::after { width: 100%; }
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
@media (max-width: 767px) { .nav { height: 48px; } .nav-links { display: none; } .nav-hamburger { display: flex; } .nav-traffic-lights { display: none; } }
</style>
