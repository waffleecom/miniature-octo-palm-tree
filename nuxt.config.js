export default {
  target: 'static',
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Ghost eShop',
    title: 'Loading...',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/theme.client.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Loading
  loading: '~/components/Loading.vue',

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    // PWA
    '@nuxtjs/pwa',
  ],

  // i18n Module
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en-US.js',
      },
      {
        code: 'fr',
        file: 'fr-FR.js',
      },
      {
        code: 'es',
        file: 'es-ES.js',
      },
      {
        code: 'jp',
        file: 'ja-JP.js',
      },
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'en',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false, // Default to light theme
      themes: {
        dark: {
          primary: '#ff7d00',
          secondary: '#ff9d33',
          accent: '#ffa64d',
          error: '#ff5252',
          warning: '#ffc107',
          info: '#2196f3',
          success: '#4caf50',
          background: '#121212',
          surface: '#1e1e1e',
        },
        light: {
          primary: '#ff7d00',
          secondary: '#ff9d33',
          accent: '#ffa64d',
          error: '#f44336',
          warning: '#ff9800',
          info: '#2196f3',
          success: '#4caf50',
          background: '#ffffff',
          surface: '#ffffff',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // PWA Configuration: https://go.nuxtjs.dev/config-pwa
  pwa: {
    manifest: {
      name: 'Ghost eShop',
      lang: 'en',
      useWebmanifestExtension: false,
      start_url: '/',
      theme_color: '#ff8400',
      display: 'standalone',
    },
    meta: {
      name: 'Ghost eShop',
      theme_color: '#ff8400',
      ogTitle: 'Ghost eShop',
      ogSiteName: 'Ghost eShop',
      ogImage: 'https://ghosteshop.com/icon.png',
      ogDescription: 'An alternative eShop for 3ds',
      mobileApp: true,
      mobileAppIOS: true,
      appleStatusBarStyle: 'default',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },
}
