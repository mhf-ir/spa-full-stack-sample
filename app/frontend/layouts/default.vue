<template>
  <v-app>
    <v-main>
      <v-container>
        {{ $vuetify.rtl }}
        <hr />
        <v-alert>
          hey:
          <pre>{{ $store.getters.getLanguage }}</pre>
        </v-alert>
        <nuxt />
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>
<script>
const rtlLanguages = ['ar', 'dv', 'fa', 'he', 'ps', 'ur', 'yi'];
export default {
  head() {
    const i18nSeo = this.$nuxtI18nSeo();
    return {
      htmlAttrs: {
        dir: rtlLanguages.includes(this.$i18n.locale) ? 'rtl' : 'ltr',
        lang: this.$i18n.locale,
        ...i18nSeo.htmlAttrs,
      },
    };
  },
};
</script>
