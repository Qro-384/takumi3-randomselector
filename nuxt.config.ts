// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['@/components/styles/glassmorphism.css'],
  app: {
    head: {
      title: 'TAKUMI³ RandomSelector', // あなたのアプリのタイトル
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href:
          'https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Roboto+Mono&display=swap'
        },
        { rel: 'stylesheet', href:
          "https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
        },
      ]
    }
  }
})
