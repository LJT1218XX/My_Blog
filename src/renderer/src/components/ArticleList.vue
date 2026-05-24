<template>
  <div class="article-list">
    <h2 class="section-heading reveal">最新文章</h2>
    <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
    <button v-if="!allLoaded" class="load-more reveal" @click="loadMore">加载更多</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ArticleCard from './ArticleCard.vue';
import { useArticles } from '../composables/useArticles.js';

const { articles: allArticles } = useArticles();
const showCount = ref(6);
const allLoaded = ref(false);
const articles = ref(allArticles.slice(0, 6));

function loadMore() {
  showCount.value = allArticles.length;
  articles.value = allArticles.slice(0, showCount.value);
  allLoaded.value = true;
}
</script>

<style scoped>
.article-list { display: flex; flex-direction: column; gap: 24px; }
.section-heading { font-family: 'SF Pro Display', -apple-system, 'PingFang SC', sans-serif; font-size: 28px; font-weight: 600; letter-spacing: -0.02em; color: #1d1d1f; margin-bottom: 0; }
.load-more { display: block; margin: 12px auto 0; padding: 14px 36px; font-size: 14px; font-weight: 500; color: #fff; background: linear-gradient(135deg, #0071e3 0%, #a855f7 100%); background-size: 200% auto; border: none; border-radius: 9999px; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 16px rgba(0,113,227,0.25); }
.load-more:hover { background-position: right center; box-shadow: 0 8px 28px rgba(0,113,227,0.35); transform: translateY(-2px); }
.load-more:active { transform: scale(0.97); }
</style>
