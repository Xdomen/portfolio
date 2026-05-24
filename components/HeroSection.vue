<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const nameChars = ref<(HTMLElement | null)[]>([])
const heroRef   = ref<HTMLElement | null>(null)

const NAME = 'Domen Brezar'

// Resolves to /portfolio/cv.pdf on GitHub Pages, or /cv.pdf on a root-deployed domain.
// Drop your PDF at public/cv.pdf — Nuxt copies it to the output root automatically.
const runtimeConfig = useRuntimeConfig()
const cvHref = computed(() => `${runtimeConfig.app.baseURL}cv.pdf`)

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/xDomen',
    display: 'github.com/xDomen',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.925.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/domen.brezar',
    display: 'linkedin.com/in/domen.brezar',
    icon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
  },
  {
    label: 'Email',
    href: 'mailto:info@blackops.si',
    display: 'info@pcfix.net',
    icon: `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
  },
]

const tags = [
  'FIX 4.2 / 4.4',
  'Market Data',
  'Co-Location',
  'UDP Multicast',
  'C++',
  'Go',
  'Execution Systems',
]

onMounted(async () => {
  const { gsap } = await import('gsap')

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  // Name chars stagger
  tl.from(nameChars.value.filter(Boolean), {
    opacity: 0,
    y: 16,
    duration: 0.35,
    stagger: 0.03,
  })

  // Role line
  tl.from('#hero-role', { opacity: 0, y: 10, duration: 0.4 }, '-=0.1')

  // Bio
  tl.from('#hero-bio', { opacity: 0, y: 8, duration: 0.4 }, '-=0.15')

  // Tags
  tl.from('.hero-tag', { opacity: 0, y: 6, duration: 0.3, stagger: 0.07 }, '-=0.1')

  // Links only — CV button is revealed via CSS animation (cv-btn-reveal class)
  tl.from('.hero-link', { opacity: 0, y: 6, duration: 0.3, stagger: 0.08 }, '-=0.1')

  // Divider line
  tl.from('#hero-divider', { scaleX: 0, duration: 0.6, transformOrigin: 'left' }, 0.1)
})
</script>

<template>
  <section
    ref="heroRef"
    class="relative z-10 min-h-[85vh] flex flex-col justify-center px-6 lg:px-12 xl:px-20 py-20"
  >
    <div class="max-w-4xl">
      <!-- Name -->
      <h1 class="font-display font-light tracking-[0.12em] mb-4 leading-none select-none"
          style="font-size: clamp(2.5rem, 7vw, 5rem);">
        <span
          v-for="(char, i) in NAME"
          :key="i"
          :ref="el => { nameChars[i] = el as HTMLElement }"
          class="inline-block"
          :class="char === ' ' ? 'w-[0.4em]' : ''"
          aria-hidden="true"
        >{{ char === ' ' ? '' : char }}</span>
        <span class="sr-only">{{ NAME }}</span>
        <span class="cursor-blink text-accent ml-1 font-mono font-light">_</span>
      </h1>

      <!-- Role -->
      <div id="hero-role" class="flex items-center gap-2 mb-6">
        <span class="font-mono text-accent text-sm">&#62;</span>
        <span class="font-mono text-sm text-dim tracking-wide">Senior Quality Engineer</span>
      </div>

      <!-- Divider -->
      <div id="hero-divider" class="h-px bg-edge mb-8" />

      <!-- Bio -->
      <p
        id="hero-bio"
        class="font-sans text-dim text-sm leading-relaxed max-w-xl mb-8"
      >
        Building high-performance trading infrastructure across co-located execution environments
        and direct market access pipelines. Protocol-level expertise in FIX connectivity,
        market data processing, and real-time systems at sub-millisecond latency.
      </p>

      <!-- Specialization tags -->
      <div class="flex flex-wrap gap-2 mb-10">
        <span
          v-for="tag in tags"
          :key="tag"
          class="hero-tag skill-chip border border-edge text-muted font-mono text-[10px] tracking-wider px-2.5 py-1 uppercase cursor-default"
        >{{ tag }}</span>
      </div>

      <!-- Social links -->
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-8 mb-8">
        <a
          v-for="link in links"
          :key="link.label"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="hero-link group flex items-center gap-2.5 font-mono text-xs text-muted hover:text-primary transition-colors duration-150"
          :aria-label="link.label"
        >
          <span
            class="text-accent shrink-0 flex items-center transition-colors duration-150"
            v-html="link.icon"
          />
          <span class="text-edge-lit">·</span>
          <span class="group-hover:text-accent transition-colors duration-150">{{ link.display }}</span>
        </a>
      </div>

      <!-- CV download button — CSS-animated reveal, no GSAP dependency -->
      <a
        id="hero-cv-btn"
        :href="cvHref"
        download="Domen_Brezar_CV.pdf"
        class="cv-btn-reveal inline-flex items-center gap-2.5 border border-accent/50 px-5 py-2.5 font-mono text-[10px] tracking-[0.18em] text-accent uppercase transition-all duration-150 hover:border-accent hover:bg-accent/5 whitespace-nowrap self-start"
      >
        <svg width="10" height="11" viewBox="0 0 10 11" fill="none" class="shrink-0" aria-hidden="true">
          <path d="M5 1v7M2 6l3 3 3-3" stroke="currentColor" stroke-width="1.3" stroke-linecap="square"/>
        </svg>
        Download CV
      </a>
    </div>
  </section>
</template>
