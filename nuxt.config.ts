// Set app.baseURL to '/portfolio/' for username.github.io/portfolio deploys.
// Change to '/' if using a custom domain or a username.github.io user-page repo.
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          // Stable font filenames so <link rel="preload"> URLs survive rebuilds
          assetFileNames: (info) => {
            if (info.name?.match(/\.(woff2?|ttf|otf|eot)$/)) return 'fonts/[name][extname]'
            return '_nuxt/[name]-[hash][extname]'
          },
        },
      },
    },
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
      htmlAttrs: { lang: 'en' },
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
        { property: 'og:url', content: 'https://xdomen.github.io/portfolio/' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://xdomen.github.io/portfolio/' },
      ],
    },
  },

  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  compatibilityDate: '2024-11-01',
})
