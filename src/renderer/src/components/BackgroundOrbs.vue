<template>
  <div class="bg-orbs" aria-hidden="true">
    <div class="bg-orb"></div>
    <div class="bg-orb"></div>
    <div class="bg-orb"></div>
    <div class="bg-orb"></div>
  </div>
</template>

<style scoped>
.bg-orbs { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.bg-orb { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.3; }
.bg-orb:nth-child(1) { width: 500px; height: 500px; background: radial-gradient(circle, #0071e3 0%, transparent 70%); top: -10%; left: -5%; animation: orbFloat1 18s ease-in-out infinite alternate; }
.bg-orb:nth-child(2) { width: 400px; height: 400px; background: radial-gradient(circle, #a855f7 0%, transparent 70%); bottom: 20%; right: -8%; animation: orbFloat2 22s ease-in-out infinite alternate; }
.bg-orb:nth-child(3) { width: 350px; height: 350px; background: radial-gradient(circle, #f59e0b 0%, transparent 70%); top: 60%; left: 40%; animation: orbFloat3 20s ease-in-out infinite alternate; }
.bg-orb:nth-child(4) { width: 300px; height: 300px; background: radial-gradient(circle, #06b6d4 0%, transparent 70%); top: 30%; left: 50%; animation: orbFloat4 16s ease-in-out infinite alternate; }
@media (max-width: 767px) { .bg-orb:nth-child(3), .bg-orb:nth-child(4) { display: none; } .bg-orb:nth-child(1), .bg-orb:nth-child(2) { opacity: 0.15; } }
</style>
