export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt_onboarding_prototype',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/socket.client.js' }
  ],

  axios: {
    proxy: true
  },
  proxy: {
    '/api/': { target: 'http://localhost:3001', pathRewrite: { '^/api/': '' }, changeOrigin: true }
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt',
    '@nuxt/http'
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },

  pwa: {
    workbox: {
      cachingExtensions: '@/plugins/workbox-sync.js',
      enabled: true,
      offlineAssets: ['/wifi.png', '/no-wifi.png']
    },
    manifest: {
      name: 'My Awesome Todo App',
      lang: 'en-US',
      useWebmanifestExtension: false,
      start_url: "http://localhost:3000/",
      theme_color: "blue",
    }
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/login',
            method: 'post',
            propertyName: 'accessToken'
          },
          logout: false,
          user: { url: '/api/user', method: 'get' }
        }
      }
    }
  },
}
