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
export default {};
</script>
