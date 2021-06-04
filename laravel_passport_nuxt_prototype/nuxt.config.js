export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'laravel_passport_nuxt_prototype',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // runtime config
  publicRuntimeConfig: {
    apiURL: process.env.API_URL,
  },
  privateRuntimeConfig: {
    apiId: process.env.PASSPORT_CLIENT_ID,
    apiSecret: process.env.PASSPORT_CLIENT_SECRET,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true
  },

  proxy: {
    '/api/': process.env.API_URL
  },

  auth: {
    redirect: {
      home: '/',
    },
    strategies: {
      'laravelPassportPasswordGrant': {
        name: 'laravelPassportPassword',
        provider: 'laravel/passport',
        url: process.env.API_URL,
        endpoints: {
          logout: '/v1/logout',
          user: '/v1/user',
          token: '/v1/oauth/token'
        },
        clientId: process.env.PASSPORT_CLIENT_ID,
        clientSecret:  process.env.PASSPORT_CLIENT_SECRET,
        grantType: 'password'
      },
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
