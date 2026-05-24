<template>
  <div class="article-detail" v-if="article">
    <div class="article-header">
      <button class="back-btn" @click="$router.push('/')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5m7-7l-7 7 7 7"/></svg>
        返回
      </button>
      <div v-if="article.cover" class="detail-cover"><span class="article-cover-text">Featured Image</span></div>
      <div class="detail-meta">
        <span>{{ article.date }}</span>
        <span>·</span>
        <span>{{ article.readTime }}</span>
      </div>
      <h1 class="detail-title">{{ article.title }}</h1>
      <div class="detail-tags">
        <span v-for="tag in article.tags" :key="tag" class="article-tag">{{ tag }}</span>
      </div>
    </div>
    <div class="article-content" v-html="renderedContent"></div>
  </div>
  <div v-else class="not-found">
    <h2>文章未找到</h2>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useArticles } from '../composables/useArticles.js';
import { marked } from 'marked';

const route = useRoute();
const { getById } = useArticles();
const article = computed(() => getById(route.params.id));
const renderedContent = computed(() => article.value ? marked(article.value.content) : '');
</script>

<style scoped>
.article-detail { max-width: 800px; margin: 0 auto; padding: calc(52px + 60px) 24px 80px; }
.article-header { margin-bottom: 40px; }
.back-btn { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 500; color: #86868b; background: none; border: none; cursor: pointer; padding: 8px 0; margin-bottom: 24px; transition: color 0.15s; }
.back-btn:hover { color: #0071e3; }
.back-btn svg { width: 16px; height: 16px; }
.detail-cover { width: 100%; aspect-ratio: 16/9; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); display: flex; align-items: center; justify-content: center; border-radius: 18px; margin-bottom: 24px; position: relative; overflow: hidden; }
.detail-cover::before { content: ''; position: absolute; inset: 0; background: linear-gradient(45deg, rgba(0,113,227,0.3), rgba(168,85,247,0.3)); background-size: 200% 200%; animation: coverShimmer 4s ease-in-out infinite; opacity: 0.6; }
.article-cover-text { position: relative; z-index: 1; color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; }
.detail-meta { font-size: 14px; color: #86868b; margin-bottom: 16px; display: flex; gap: 8px; }
.detail-title { font-family: 'SF Pro Display', -apple-system, 'PingFang SC', sans-serif; font-size: clamp(28px, 4vw, 40px); font-weight: 700; letter-spacing: -0.02em; line-height: 1.2; color: #1d1d1f; margin-bottom: 16px; }
.detail-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.article-tag { padding: 4px 12px; font-size: 12px; font-weight: 500; color: #0071e3; background: #e8f4fd; border-radius: 9999px; }
.article-content { font-size: 17px; line-height: 1.8; color: #1d1d1f; }
.article-content :deep(h2) { font-family: 'SF Pro Display', -apple-system, sans-serif; font-size: 24px; font-weight: 600; margin: 40px 0 16px; }
.article-content :deep(p) { margin-bottom: 16px; }
.article-content :deep(code) { font-family: 'SF Mono', Menlo, monospace; font-size: 14px; background: #f5f5f7; padding: 2px 6px; border-radius: 4px; }
.not-found { text-align: center; padding: calc(52px + 120px) 24px; }
.not-found h2 { font-size: 24px; color: #86868b; margin-bottom: 16px; }
.not-found a { color: #0071e3; }
@media (max-width: 767px) { .article-detail { padding-top: calc(48px + 40px); padding-left: 20px; padding-right: 20px; } }
</style>
