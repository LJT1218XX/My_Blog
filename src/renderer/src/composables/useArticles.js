import { reactive, computed } from 'vue';
import { articles as rawArticles } from '../data/articles.js';

const state = reactive({
  all: rawArticles,
});

export function useArticles() {
  const getById = (id) => state.all.find(a => a.id === Number(id));

  const archiveGroups = computed(() => {
    const groups = {};
    state.all.forEach(a => {
      const key = a.date.substring(0, 7);
      if (!groups[key]) groups[key] = [];
      groups[key].push(a);
    });
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  });

  const tagsWithCount = computed(() => {
    const map = {};
    state.all.forEach(a => {
      a.tags.forEach(t => { map[t] = (map[t] || 0) + 1; });
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  });

  return { articles: state.all, getById, archiveGroups, tagsWithCount };
}
