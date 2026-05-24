<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-links">
        <a href="#">友情链接</a><a href="#">RSS 订阅</a><a href="#">隐私政策</a><a href="#">关于本站</a>
      </div>
      <div class="footer-divider"></div>
      <p class="footer-copy">&copy; 2026 拾光集 · Powered by curiosity.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer { position: relative; z-index: 1; background: linear-gradient(180deg, #f0f0f2 0%, #e8e8ed 100%); border-top: 1px solid #e8e8ed; padding: 48px 24px 32px; }
.footer-inner { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 20px; }
.footer-links { display: flex; gap: 28px; flex-wrap: wrap; justify-content: center; }
.footer-links a { font-size: 13px; color: #86868b; text-decoration: none; transition: color 0.15s; }
.footer-links a:hover { color: #0071e3; }
.footer-divider { width: 40px; height: 1px; background: #e8e8ed; }
.footer-copy { font-size: 12px; color: #86868b; }
</style>
