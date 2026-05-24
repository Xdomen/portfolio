// Set app.baseURL to '/portfolio/' for username.github.io/portfolio deploys.
// Change to '/' if using a custom domain or a username.github.io user-page repo.
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  // Disable directory-name prefixing so components/panels/FIXPanel.vue
  // stays <FIXPanel>, not <PanelsFIXPanel>
  components: {
    dirs: [{ path: '~/components', pathPrefix: false }],
  },
  devtools: { enabled: false },
  ssr: true,

  app: {
    baseURL: '/portfolio/',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Domen Brezar — Senior Quality Engineer',
      meta: [
        {
          name: 'description',
          content:
            'Low-latency trading infrastructure engineer specializing in FIX Protocol, market data systems, and direct market access.',
        },
        { name: 'theme-color', content: '#080A0C' },
        { property: 'og:title', content: 'Domen Brezar — Senior Quality Engineer' },
        { property: 'og:type', content: 'website' },
        { property: 'og:description', content: 'Low-latency trading infrastructure, FIX Protocol, market connectivity.' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  compatibilityDate: '2024-11-01',
})
