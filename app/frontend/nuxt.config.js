import { i18n, localeProjectInfo } from './i18n/config';
import manifest from './manifest/config.json';

const headLinks = [
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  {
    rel: 'manifest',
    hid: 'manifest',
    href: `/manifest-${localeProjectInfo.lang}.json`,
  },
];

Object.keys(manifest.icons).forEach((name) => {
  const size = manifest.icons[name];
  headLinks.push({
    rel: 'shortcut icon',
    sizes: `${size}x${size}`,
    href: `/_icons/${name}.png`,
  });
});

export default {
  ssr: false,

  router: {
    mode: 'hash',
    middleware: ['direction'],
  },

  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  publicRuntimeConfig: {
    dir: localeProjectInfo.dir,
    lang: localeProjectInfo.lang,
    axios: {
      browserBaseURL: process.env.ASM_BUILD_FRONT_BASE_URL
        ? process.env.ASM_BUILD_FRONT_BASE_URL
        : '/api',
    },
  },

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: `%s - ${localeProjectInfo.projectName}`,
    title: localeProjectInfo.loading,
    // htmlAttrs: {
    //   dir: localeProjectInfo.dir,
    //   lang: localeProjectInfo.lang,
    // },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui',
      },
      {
        hid: 'description',
        name: 'description',
        content: localeProjectInfo.projectDescription,
      },
      {
        hid: 'robots',
        name: 'robots',
        content: 'noindex,nofollow',
      },
    ],
    link: headLinks,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@aasaam/noto-font/dist/font-face.css', '~/assets/styles/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: '~/plugins/vuex-persist.js' }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // loading: '~/components/loading.vue',
  loading: {
    // color: 'blue',
    color: process.env.ASM_BUILD_NUXT_LOADING_COLOR
      ? process.env.ASM_BUILD_NUXT_LOADING_COLOR
      : '#00bcd4',
    failedColor: process.env.ASM_BUILD_NUXT_LOADING_FAILED_COLOR
      ? process.env.ASM_BUILD_NUXT_LOADING_FAILED_COLOR
      : '#ff9800',
    height: '8px',
    // rtl: localeProjectInfo.dir === 'rtl',
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios', ['nuxt-i18n', i18n]],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: './plugins/vuetify.js',
    defaultAssets: false,
    treeShake: true,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    babel: {
      presets: ({ isServer }) => {
        return [
          [
            '@nuxt/babel-preset-app',
            {
              buildTarget: isServer ? 'server' : 'client', // for auto import polyfill
              targets: isServer ? { node: 'current' } : {},
              configPath: __dirname, // if cwd is same as dir of .browserslistrc, no need to specify
            },
          ],
        ];
      },
    },
  },
};
