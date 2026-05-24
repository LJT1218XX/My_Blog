<template>
  <aside class="sidebar">
    <div class="sidebar-card reveal">
      <h3>关于我</h3>
      <p>全栈工程师，热爱开源与设计。目前专注于 Rust 后端开发和 SwiftUI 应用构建。偶尔写博客，记录技术与生活。</p>
    </div>
    <div class="sidebar-card reveal">
      <h3>热门文章</h3>
      <div class="sidebar-popular">
        <a v-for="(item, i) in popularArticles" :key="i" href="#">{{ item.title }}<span class="popular-meta">{{ item.views }} 阅读</span></a>
      </div>
    </div>
    <div class="sidebar-card reveal">
      <h3>标签云</h3>
      <div class="tag-cloud">
        <span v-for="tag in allTags" :key="tag" class="tag" @click="$router.push('/tags?tag=' + tag)">{{ tag }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { popularArticles, allTags } from '../data/articles.js';
</script>

<style scoped>
.sidebar { position: sticky; top: calc(52px + 32px); display: flex; flex-direction: column; gap: 24px; }
.sidebar-card { position: relative; background: #fff; border-radius: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); padding: 24px; overflow: hidden; transition: box-shadow 0.3s, transform 0.3s; }
.sidebar-card:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.08); transform: translateY(-2px); }
.sidebar-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #0071e3, #a855f7, #f59e0b); opacity: 0; transition: opacity 0.3s; }
.sidebar-card:hover::before { opacity: 1; }
.sidebar-card h3 { font-family: 'SF Pro Display', -apple-system, sans-serif; font-size: 16px; font-weight: 600; color: #1d1d1f; margin-bottom: 16px; }
.sidebar-about p { font-size: 14px; color: #86868b; line-height: 1.6; }
.sidebar-popular { display: flex; flex-direction: column; gap: 14px; }
.sidebar-popular a { font-size: 14px; color: #1d1d1f; text-decoration: none; line-height: 1.4; transition: color 0.15s, padding-left 0.15s; display: block; border-left: 2px solid transparent; padding-left: 12px; }
.sidebar-popular a:hover { color: #0071e3; border-left-color: #0071e3; padding-left: 16px; }
.popular-meta { font-size: 12px; color: #86868b; display: block; margin-top: 2px; }
.tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; }
.tag-cloud .tag { padding: 5px 14px; font-size: 12px; font-weight: 500; color: #86868b; background: #f5f5f7; border-radius: 9999px; transition: all 0.15s; cursor: pointer; border: 1px solid transparent; }
.tag-cloud .tag:hover { color: #fff; background: linear-gradient(135deg, #0071e3, #6366f1); border-color: transparent; transform: scale(1.08); box-shadow: 0 4px 12px rgba(0,113,227,0.25); }
@media (max-width: 767px) { .sidebar { position: static; } }
</style>
