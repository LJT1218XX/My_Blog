import { onMounted, onUnmounted } from 'vue';

export function useScrollReveal() {
  let observer = null;

  function observe() {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Immediately reveal elements already in view
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40) {
        el.classList.add('visible');
      }
    });
  }

  onMounted(() => {
    observe();
  });

  onUnmounted(() => {
    if (observer) observer.disconnect();
  });

  return { refresh: observe };
}
