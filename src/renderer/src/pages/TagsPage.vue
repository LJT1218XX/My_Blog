<template>
  <div class="tags-page">
    <h1 class="page-title">标签</h1>
    <div class="tags-grid">
      <router-link v-for="[tag, count] in filteredTags" :key="tag" :to="'/?tag=' + tag" class="tag-card">
        <span class="tag-name">{{ tag }}</span>
        <span class="tag-count">{{ count }} 篇</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useArticles } from '../composables/useArticles.js';

const route = useRoute();
const { tagsWithCount } = useArticles();
const filteredTags = computed(() => {
  const filter = route.query.tag;
  if (!filter) return tagsWithCount.value;
  return tagsWithCount.value.filter(([tag]) => tag === filter || tag.includes(filter));
});
</script>

<style scoped>
.tags-page { max-width: 800px; margin: 0 auto; padding: calc(52px + 80px) 24px 80px; }
.page-title { font-family: 'SF Pro Display', -apple-system, 'PingFang SC', sans-serif; font-size: clamp(32px, 4vw, 44px); font-weight: 700; letter-spacing: -0.03em; margin-bottom: 48px; background: linear-gradient(135deg, #1d1d1f 0%, #0071e3 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.tags-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
.tag-card { background: #fff; border-radius: 18px; padding: 24px; text-align: center; text-decoration: none; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: all 0.3s; }
.tag-card:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(0,113,227,0.15); }
.tag-card:hover .tag-name { color: #0071e3; }
.tag-name { display: block; font-size: 18px; font-weight: 600; color: #1d1d1f; margin-bottom: 6px; transition: color 0.3s; }
.tag-count { font-size: 13px; color: #86868b; }
@media (max-width: 767px) { .tags-page { padding-top: calc(48px + 60px); padding-left: 20px; padding-right: 20px; } .tags-grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; } }
</style>
