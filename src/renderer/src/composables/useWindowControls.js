import { ref, onMounted } from 'vue';

export function useWindowControls() {
  const isElectron = ref(false);
  const isMaximized = ref(false);

  onMounted(() => {
    isElectron.value = !!(window.electronAPI);
    if (isElectron.value) {
      window.electronAPI.onMaximized((maximized) => {
        isMaximized.value = maximized;
      });
    }
  });

  function close() { window.electronAPI?.close(); }
  function minimize() { window.electronAPI?.minimize(); }
  function toggleMaximize() { window.electronAPI?.toggleMaximize(); }

  return { isElectron, isMaximized, close, minimize, toggleMaximize };
}
