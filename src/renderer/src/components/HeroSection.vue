<template>
  <section class="hero">
    <div class="hero-inner">
      <div class="avatar-wrapper">
        <div class="avatar-ring"></div>
        <div class="avatar-ring"></div>
        <div class="avatar-ring"></div>
        <div class="hero-avatar" aria-label="头像">
          <svg width="96" height="96" viewBox="0 0 96 96" fill="none"><circle cx="48" cy="36" r="16" fill="#c8c8cd"/><ellipse cx="48" cy="88" rx="36" ry="26" fill="#c8c8cd"/></svg>
        </div>
      </div>
      <h1 class="hero-name">拾光者</h1>
      <p class="hero-bio">全栈开发者，喜欢 Swift、Rust 与优美的设计。<br>在这里记录技术思考与生活碎片。</p>
      <div class="hero-stats">
        <div class="hero-stat">
          <div class="hero-stat-number" ref="countEl" data-count="127">0</div>
          <div class="hero-stat-label">文章</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-number" ref="countEl" data-count="3.2">0</div>
          <div class="hero-stat-label">万阅读</div>
        </div>
        <div class="hero-stat">
          <div class="hero-stat-number" ref="countEl" data-count="486">0</div>
          <div class="hero-stat-label">粉丝</div>
        </div>
      </div>
      <div class="hero-social">
        <a href="#" aria-label="GitHub"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></a>
        <a href="#" aria-label="Twitter / X"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l6.5 7.5L4 20h2l5.5-7 4.5 7h6l-7-8.5L20 4h-2l-5 6.5L9 4H4z"/></svg></a>
        <a href="#" aria-label="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg></a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';

function animateCount(el, target, suffix) {
  const duration = 2000;
  let startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = (target % 1 !== 0 ? current.toFixed(1) : Math.floor(current)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = el.getAttribute('data-count');
        const target = parseFloat(raw);
        const suffix = raw.includes('万') ? '万' : '';
        animateCount(el, target, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.hero-stat-number[data-count]').forEach(el => observer.observe(el));
});
</script>

<style scoped>
.hero { position: relative; padding: calc(52px + 100px) 24px 80px; text-align: center; max-width: 700px; margin: 0 auto; z-index: 1; }
.hero-inner { animation: heroEntrance 0.8s cubic-bezier(0.16,1,0.3,1) both; }
.avatar-wrapper { position: relative; width: 104px; height: 104px; margin: 0 auto 28px; }
.hero-avatar { position: relative; z-index: 2; width: 96px; height: 96px; border-radius: 9999px; margin: 4px; box-shadow: 0 12px 40px rgba(0,0,0,0.1); transition: transform 0.3s, box-shadow 0.3s; background: linear-gradient(135deg, #e8e8ed 0%, #d0d0d5 100%); overflow: hidden; }
.hero-avatar:hover { transform: scale(1.05); box-shadow: 0 20px 60px rgba(0,113,227,0.2); }
.avatar-ring { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%; border: 1.5px solid rgba(0,113,227,0.2); animation: ringPulse 3s ease-out infinite; }
.avatar-ring:nth-child(2) { animation-delay: 0s; }
.avatar-ring:nth-child(3) { animation-delay: 1s; }
.avatar-ring:nth-child(4) { animation-delay: 2s; }
.hero-name { font-family: 'SF Pro Display', -apple-system, 'PingFang SC', sans-serif; font-size: clamp(40px, 5.5vw, 56px); font-weight: 700; letter-spacing: -0.03em; line-height: 1.1; background: linear-gradient(135deg, #1d1d1f 0%, #0071e3 50%, #a855f7 100%); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: textShimmer 4s ease-in-out infinite alternate; margin-bottom: 16px; }
.hero-bio { font-size: clamp(16px, 2vw, 19px); color: #86868b; line-height: 1.6; margin-bottom: 32px; max-width: 480px; margin-left: auto; margin-right: auto; }
.hero-stats { display: flex; justify-content: center; gap: 48px; margin-bottom: 32px; }
.hero-stat { text-align: center; }
.hero-stat-number { font-family: 'SF Pro Display', -apple-system, sans-serif; font-size: 28px; font-weight: 700; letter-spacing: -0.02em; color: #1d1d1f; }
.hero-stat-label { font-size: 12px; color: #86868b; letter-spacing: 0.04em; text-transform: uppercase; margin-top: 2px; }
.hero-social { display: flex; justify-content: center; gap: 16px; }
.hero-social a { display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 9999px; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.04); color: #86868b; transition: all 0.3s; position: relative; overflow: hidden; }
.hero-social a::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, #0071e3, #a855f7); opacity: 0; transition: opacity 0.3s; border-radius: 9999px; }
.hero-social a:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,113,227,0.2); color: #fff; }
.hero-social a:hover::before { opacity: 1; }
.hero-social a svg { width: 18px; height: 18px; position: relative; z-index: 1; }
@media (max-width: 1024px) { .hero { padding-top: calc(52px + 70px); } .hero-stats { gap: 36px; } }
@media (max-width: 767px) { .hero { padding: calc(48px + 48px) 20px 48px; } .hero-stats { gap: 28px; } .hero-stat-number { font-size: 22px; } }
</style>
