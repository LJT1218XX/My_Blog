<template>
  <div class="cursor-glow" ref="glowEl" aria-hidden="true"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
const glowEl = ref(null);
let targetX = -1000, targetY = -1000, currentX = -1000, currentY = -1000, rafId = null;
function onMove(e) { targetX = e.clientX; targetY = e.clientY; }
function animate() {
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;
  if (glowEl.value) { glowEl.value.style.left = currentX + 'px'; glowEl.value.style.top = currentY + 'px'; }
  rafId = requestAnimationFrame(animate);
}
onMounted(() => {
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseleave', () => { if (glowEl.value) glowEl.value.style.opacity = '0'; });
  document.addEventListener('mouseenter', () => { if (glowEl.value) glowEl.value.style.opacity = '1'; });
  rafId = requestAnimationFrame(animate);
});
onUnmounted(() => {
  document.removeEventListener('mousemove', onMove);
  cancelAnimationFrame(rafId);
});
</script>

<style scoped>
.cursor-glow { position: fixed; pointer-events: none; z-index: 9999; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(0,113,227,0.06) 0%, transparent 60%); transform: translate(-50%, -50%); transition: opacity 0.3s; will-change: left, top; }
</style>
