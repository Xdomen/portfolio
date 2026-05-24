<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(async () => {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // Reveal panel grid on scroll
  gsap.from('.panel-scroll-reveal', {
    opacity: 0,
    y: 28,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.panel-scroll-reveal',
      start: 'top 85%',
      once: true,
    },
  })

  // Stagger panel columns
  gsap.from('.panel-col-reveal', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: '.panel-col-reveal',
      start: 'top 85%',
      once: true,
    },
  })

  // Skills section
  gsap.from('.skills-reveal', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.skills-reveal',
      start: 'top 88%',
      once: true,
    },
  })

  gsap.from('.skills-col', {
    opacity: 0,
    y: 14,
    duration: 0.5,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.skills-col',
      start: 'top 88%',
      once: true,
    },
  })
})

useSeoMeta({
  title: 'Domen Brezar — Senior Quality Engineer',
  description: 'Low-latency trading infrastructure engineer. FIX Protocol, market data systems, direct market access.',
})
</script>

<template>
  <div class="relative">
    <GridBackground />

    <!-- Hero -->
    <HeroSection />

    <!-- Panel grid -->
    <div class="panel-scroll-reveal">
      <PanelGrid />
    </div>

    <!-- Skills -->
    <div class="skills-reveal">
      <SkillsGrid />
    </div>

    <!-- Footer -->
    <footer class="relative z-10 border-t border-edge px-6 lg:px-12 xl:px-20 py-6 flex items-center justify-between">
      <span class="font-mono text-[10px] text-muted tracking-wider">DOMEN BREZAR · {{ new Date().getFullYear() }}</span>
      <span class="font-mono text-[10px] text-muted tracking-wider">Senior Quality Engineer</span>
    </footer>
  </div>
</template>
