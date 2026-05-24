<template>
  <div class="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
    <!-- Grid pattern -->
    <div class="absolute inset-0 grid-bg opacity-100" />
    <!-- Scanline sweep -->
    <div class="scanline absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
    <!-- Subtle vignette -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, #080A0C 100%)"
    />
  </div>
</template>
