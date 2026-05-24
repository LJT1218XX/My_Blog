<template>
  <div>
    <HeroSection />
    <div class="main-container">
      <main>
        <ArticleList />
      </main>
      <Sidebar />
    </div>
  </div>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue';
import ArticleList from '../components/ArticleList.vue';
import Sidebar from '../components/Sidebar.vue';
</script>

<style scoped>
.main-container { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 0 24px 80px; display: grid; grid-template-columns: 1fr 300px; gap: 40px; align-items: start; }
@media (max-width: 1024px) { .main-container { grid-template-columns: 1fr 260px; gap: 28px; } }
@media (max-width: 767px) { .main-container { grid-template-columns: 1fr; gap: 32px; padding: 0 20px 60px; } }
</style>
