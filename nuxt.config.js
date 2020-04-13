export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    titleTemplate: `%s - ${process.env.npm_package_name}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: 'rgb(10,166,121)' },
  /*
   ** Global CSS
   */
  css: [
    { src: 'ant-design-vue/dist/antd.less', lang: 'less' },
    { src: '~/assets/main.css', lang: 'css' }
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/antd-ui'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/auth'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.API_URL || 'http://127.0.0.1:3333'
  },

  /**
   * Auth Endpoint
   */
  auth: {
    localStorage: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'data.token'
          },
          logout: {
            url: '/logout',
            method: 'post',
            propertyName: 'data.refresh_token'
          },
          user: {
            url: '/profile',
            method: 'get',
            propertyName: 'data'
          }
        }
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extractCSS: {
      allChunks: true
    },
    loaders: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': 'rgb(10,166,121)',
          'border-radius-base': '3px'
        }
      }
    },
    extend(config, ctx) {}
  },
  env: {
    API_URL: process.env.API_URL || 'http://127.0.0.1:3333'
  }
}
