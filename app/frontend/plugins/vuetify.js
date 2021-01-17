import '@mdi/font/css/materialdesignicons.css';

// vuetify.options.js
export default function ({ app, store }) {
  return {
    icons: {
      iconfont: 'mdi',
    },
    rtl: app.$config.dir === 'rtl',
    theme: {
      dark: false,
    },
  };
}
