import { createRouter, createWebHashHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ArticleDetail from '../pages/ArticleDetail.vue';
import ArchivePage from '../pages/ArchivePage.vue';
import TagsPage from '../pages/TagsPage.vue';
import AboutPage from '../pages/AboutPage.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/article/:id', name: 'article', component: ArticleDetail },
  { path: '/archive', name: 'archive', component: ArchivePage },
  { path: '/tags', name: 'tags', component: TagsPage },
  { path: '/about', name: 'about', component: AboutPage },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() { return { top: 0 }; },
});
