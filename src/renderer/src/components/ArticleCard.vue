<template>
  <article class="article-card reveal" ref="cardEl" @mousemove="onTilt" @mouseleave="resetTilt" @click="$router.push('/article/' + article.id)">
    <div class="card-glare" ref="glareEl"></div>
    <div v-if="article.cover" class="article-cover" aria-hidden="true"><span class="article-cover-text">Featured Image</span></div>
    <div class="article-body">
      <div class="article-meta">
        <span class="article-date"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>{{ article.date }}</span>
        <span class="article-read-time"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>{{ article.readTime }}</span>
      </div>
      <h3 class="article-title">{{ article.title }}</h3>
      <p class="article-summary">{{ article.summary }}</p>
      <div class="article-tags">
        <span v-for="tag in article.tags" :key="tag" class="article-tag" @click.stop="$router.push('/tags?tag=' + tag)">{{ tag }}</span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({ article: Object });
const cardEl = ref(null);
const glareEl = ref(null);

function onTilt(e) {
  const card = cardEl.value;
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left, y = e.clientY - rect.top;
  const cx = rect.width / 2, cy = rect.height / 2;
  const rx = ((y - cy) / cy) * -8, ry = ((x - cx) / cx) * 8;
  card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
  if (glareEl.value) {
    glareEl.value.style.background = `radial-gradient(circle at ${(x/rect.width)*100}% ${(y/rect.height)*100}%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)`;
    glareEl.value.style.opacity = '1';
  }
}
function resetTilt() {
  if (cardEl.value) cardEl.value.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  if (glareEl.value) { glareEl.value.style.opacity = '0'; glareEl.value.style.background = 'radial-gradient(circle at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)'; }
}
</script>

<style scoped>
.article-card { position: relative; background: #fff; border-radius: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); overflow: hidden; cursor: pointer; transform-style: preserve-3d; transform: perspective(1000px) rotateX(0deg) rotateY(0deg); transition: box-shadow 0.4s ease, transform 0.1s ease-out; }
.article-card:hover { box-shadow: 0 24px 48px rgba(0,0,0,0.1); z-index: 10; }
.article-card:hover .article-title { background: linear-gradient(90deg, #0071e3, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.article-card::after { content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%; background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%); z-index: 4; pointer-events: none; transition: left 0.6s ease; }
.article-card:hover::after { left: 120%; }
.card-glare { position: absolute; inset: 0; pointer-events: none; z-index: 5; opacity: 0; transition: opacity 0.3s; border-radius: 18px; background: radial-gradient(circle at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%); }
.article-cover { width: 100%; aspect-ratio: 16/9; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
.article-cover::before { content: ''; position: absolute; inset: 0; background: linear-gradient(45deg, rgba(0,113,227,0.3), rgba(168,85,247,0.3), rgba(0,113,227,0.3)); background-size: 200% 200%; animation: coverShimmer 4s ease-in-out infinite; opacity: 0.6; }
.article-cover-text { position: relative; z-index: 1; color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; }
.article-body { padding: 24px; position: relative; z-index: 2; background: #fff; }
.article-meta { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; font-size: 13px; color: #86868b; }
.article-date, .article-read-time { display: flex; align-items: center; gap: 4px; }
.article-date svg, .article-read-time svg { width: 14px; height: 14px; opacity: 0.6; }
.article-title { font-family: 'SF Pro Display', -apple-system, 'PingFang SC', sans-serif; font-size: 20px; font-weight: 600; letter-spacing: -0.02em; line-height: 1.3; color: #1d1d1f; transition: all 0.3s; margin-bottom: 8px; }
.article-summary { font-size: 15px; color: #86868b; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 16px; }
.article-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.article-tag { display: inline-block; padding: 4px 12px; font-size: 12px; font-weight: 500; color: #0071e3; background: #e8f4fd; border-radius: 9999px; transition: all 0.15s; cursor: pointer; }
.article-tag:hover { background: #0071e3; color: #fff; transform: scale(1.05); }
@media (max-width: 767px) { .article-body { padding: 20px; } .article-title { font-size: 18px; } }
</style>
