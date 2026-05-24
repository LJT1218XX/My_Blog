<template>
  <Teleport to="body">
    <div class="mobile-nav" :class="{ active: modelValue }" @click="$emit('update:modelValue', false)">
      <router-link to="/" @click.stop="close">首页</router-link>
      <router-link to="/archive" @click.stop="close">归档</router-link>
      <router-link to="/tags" @click.stop="close">标签</router-link>
      <router-link to="/about" @click.stop="close">关于</router-link>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({ modelValue: Boolean });
const emit = defineEmits(['update:modelValue']);
function close() { emit('update:modelValue', false); }
</script>

<style scoped>
.mobile-nav { position: fixed; inset: 0; z-index: 999; background: rgba(255,255,255,0.97); backdrop-filter: blur(40px); -webkit-backdrop-filter: blur(40px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 40px; opacity: 0; pointer-events: none; transition: opacity 0.4s cubic-bezier(0.175,0.885,0.32,1.275); }
.mobile-nav.active { opacity: 1; pointer-events: auto; }
.mobile-nav a { font-family: 'SF Pro Display', -apple-system, sans-serif; font-size: 28px; font-weight: 600; color: #1d1d1f; text-decoration: none; transition: color 0.15s, transform 0.3s; }
.mobile-nav a:hover { color: #0071e3; transform: scale(1.05); }
</style>
