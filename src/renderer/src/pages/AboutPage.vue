<template>
  <div class="about-page">
    <h1 class="page-title">关于我</h1>
    <div class="about-card">
      <div class="about-avatar">
        <svg width="80" height="80" viewBox="0 0 96 96" fill="none"><circle cx="48" cy="36" r="16" fill="#c8c8cd"/><ellipse cx="48" cy="88" rx="36" ry="26" fill="#c8c8cd"/></svg>
      </div>
      <h2>拾光者</h2>
      <p class="about-role">全栈工程师 · 开源爱好者 · 设计探索者</p>
      <p class="about-bio">
        热爱编程与优美设计。目前专注于 Rust 后端开发和 SwiftUI 应用构建。<br>
        技术栈涵盖 Rust、Swift、Python、TypeScript、Vue、React 等。<br>
        使用 Neovim + Ghostty + Fedora 作为日常工作环境。<br>
        偶尔在博客上记录技术思考与生活碎片，希望能帮助到志同道合的人。
      </p>
      <div class="about-social">
        <a href="#" class="social-link">GitHub</a>
        <a href="#" class="social-link">Twitter / X</a>
        <a href="#" class="social-link">Email</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page { max-width: 640px; margin: 0 auto; padding: calc(52px + 80px) 24px 80px; }
.page-title { font-family: 'SF Pro Display', -apple-system, 'PingFang SC', sans-serif; font-size: clamp(32px, 4vw, 44px); font-weight: 700; letter-spacing: -0.03em; margin-bottom: 40px; background: linear-gradient(135deg, #1d1d1f 0%, #0071e3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.about-card { background: #fff; border-radius: 24px; padding: 48px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
.about-avatar { width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 24px; background: linear-gradient(135deg, #e8e8ed 0%, #d0d0d5 100%); overflow: hidden; box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
.about-card h2 { font-family: 'SF Pro Display', -apple-system, sans-serif; font-size: 28px; font-weight: 700; color: #1d1d1f; margin-bottom: 8px; }
.about-role { font-size: 15px; color: #0071e3; font-weight: 500; margin-bottom: 24px; }
.about-bio { font-size: 16px; color: #86868b; line-height: 1.8; margin-bottom: 32px; }
.about-social { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
.social-link { padding: 10px 24px; font-size: 14px; font-weight: 500; color: #0071e3; background: #e8f4fd; border-radius: 9999px; text-decoration: none; transition: all 0.15s; }
.social-link:hover { background: #0071e3; color: #fff; transform: scale(1.05); }
@media (max-width: 767px) { .about-page { padding-top: calc(48px + 60px); padding-left: 20px; padding-right: 20px; } .about-card { padding: 32px 24px; } }
</style>
