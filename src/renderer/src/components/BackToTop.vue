<template>
  <button class="back-to-top" :class="{ visible }" @click="scrollTop" aria-label="回到顶部">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
  </button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const visible = ref(false);
function onScroll() { visible.value = window.scrollY > 500; }
function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<style scoped>
.back-to-top { position: fixed; bottom: 32px; right: 32px; z-index: 100; width: 48px; height: 48px; border-radius: 9999px; background: #fff; border: 2px solid #e8e8ed; box-shadow: 0 4px 16px rgba(0,0,0,0.06); cursor: pointer; display: flex; align-items: center; justify-content: center; color: #86868b; opacity: 0; pointer-events: none; transform: translateY(16px); transition: all 0.3s; overflow: hidden; }
.back-to-top::before { content: ''; position: absolute; inset: -2px; border-radius: 9999px; background: linear-gradient(135deg, #0071e3, #a855f7); opacity: 0; transition: opacity 0.3s; z-index: -1; }
.back-to-top.visible { opacity: 1; pointer-events: auto; transform: translateY(0); }
.back-to-top:hover { color: #fff; border-color: transparent; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,113,227,0.25); }
.back-to-top:hover::before { opacity: 1; }
.back-to-top svg { width: 20px; height: 20px; position: relative; z-index: 1; }
@media (max-width: 767px) { .back-to-top { bottom: 24px; right: 20px; } }
</style>
