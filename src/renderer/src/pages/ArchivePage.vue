<template>
  <div class="archive-page">
    <h1 class="page-title">文章归档</h1>
    <div v-for="[month, items] in archiveGroups" :key="month" class="archive-group">
      <h2 class="archive-month">{{ formatMonth(month) }}</h2>
      <div class="archive-items">
        <router-link v-for="article in items" :key="article.id" :to="'/article/' + article.id" class="archive-item">
          <span class="archive-date">{{ article.date }}</span>
          <span class="archive-title">{{ article.title }}</span>
          <span class="archive-tags">
            <span v-for="tag in article.tags" :key="tag" class="mini-tag">{{ tag }}</span>
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useArticles } from '../composables/useArticles.js';
const { archiveGroups } = useArticles();
function formatMonth(key) {
  const [y, m] = key.split('-');
  return y + ' 年 ' + parseInt(m) + ' 月';
}
</script>

<style scoped>
.archive-page { max-width: 800px; margin: 0 auto; padding: calc(52px + 80px) 24px 80px; }
.page-title { font-family: 'SF Pro Display', -apple-system, 'PingFang SC', sans-serif; font-size: clamp(32px, 4vw, 44px); font-weight: 700; letter-spacing: -0.03em; margin-bottom: 48px; background: linear-gradient(135deg, #1d1d1f 0%, #0071e3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.archive-group { margin-bottom: 40px; }
.archive-month { font-family: 'SF Pro Display', -apple-system, sans-serif; font-size: 20px; font-weight: 600; color: #1d1d1f; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid #e8e8ed; }
.archive-items { display: flex; flex-direction: column; gap: 4px; }
.archive-item { display: flex; align-items: center; gap: 20px; padding: 12px 16px; border-radius: 12px; text-decoration: none; transition: background 0.15s; flex-wrap: wrap; }
.archive-item:hover { background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
.archive-date { font-size: 13px; color: #86868b; font-family: 'SF Mono', Menlo, monospace; white-space: nowrap; }
.archive-title { font-size: 16px; color: #1d1d1f; font-weight: 500; flex: 1; }
.archive-item:hover .archive-title { color: #0071e3; }
.archive-tags { display: flex; gap: 6px; }
.mini-tag { padding: 2px 8px; font-size: 11px; color: #0071e3; background: #e8f4fd; border-radius: 9999px; }
@media (max-width: 767px) { .archive-page { padding-top: calc(48px + 60px); padding-left: 20px; padding-right: 20px; } .archive-item { flex-direction: column; align-items: flex-start; gap: 4px; padding: 12px 0; } }
</style>
