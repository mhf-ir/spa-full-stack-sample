<template>
  <div>
    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      class="ma-3"
    >
      {{ locale.nativeName }}</nuxt-link
    >
  </div>
</template>

<script>
const rtlLanguages = ['ar', 'dv', 'fa', 'he', 'ps', 'ur', 'yi'];

export default {
  name: 'LangSwitcher',

  data() {
    return {
      defaultL: this.$i18n.locale,
    };
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales;
    },
  },
  methods: {
    checkDirection(locale) {
      this.$store.commit('SET_USER_LANG', locale);
      if (rtlLanguages.includes(locale)) {
        this.$vuetify.rtl = true;
      } else {
        this.$vuetify.rtl = false;
      }
    },
  },
};
</script>

<style>
.inline-b {
  display: inline-block;
}
.fn-t {
  font-size: 1.1em;
}
</style>
