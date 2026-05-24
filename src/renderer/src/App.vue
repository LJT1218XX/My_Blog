<template>
  <BackgroundOrbs />
  <CursorGlow />
  <NavBar :menuOpen="menuOpen" @toggleMenu="menuOpen = !menuOpen" />
  <MobileNav v-model="menuOpen" />
  <router-view />
  <FooterSection />
  <BackToTop />
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from './components/NavBar.vue';
import MobileNav from './components/MobileNav.vue';
import FooterSection from './components/FooterSection.vue';
import BackToTop from './components/BackToTop.vue';
import BackgroundOrbs from './components/BackgroundOrbs.vue';
import CursorGlow from './components/CursorGlow.vue';
import { useScrollReveal } from './composables/useScrollReveal.js';

const menuOpen = ref(false);
const router = useRouter();
const { refresh } = useScrollReveal();

watch(() => router.currentRoute.value, () => {
  setTimeout(refresh, 100);
});
</script>
