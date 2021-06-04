export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt_QR_reader',
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
    { src: '~/plugins/qr-reader.js', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  generate: {
    routes: [
      '/qr-reader',
      '/succes-page'
    ]
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    ['nuxt-twa-module', {
      /* module options */
      defaultUrl: 'http://localhost:3000',
      hostName: 'your-url.com',
      applicationId: 'com.example.qr-app',
      launcherName: 'My Awesome QR scanner app',
      versionCode: 1,
      versionName: '1.0',
      statusBarColor: 'blue',

      sha256Fingerprints: ["14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5"]
    }],

    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    'bootstrap-vue/nuxt',
    'nuxt-socket-io'
  ],

  target: 'static',

  pwa: {
    manifest: {
      name: 'My Awesome QR scanner app',
      lang: 'en-US',
      useWebmanifestExtension: false,
      start_url: "http://localhost:3000/",
      theme_color: "blue",
    }
  },

  io: {
    sockets: [{
      name: 'home',
      url: 'https://crystal-spicy-attack.glitch.me'
    }]
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
