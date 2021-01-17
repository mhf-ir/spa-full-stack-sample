<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <NuxtLink to="/">Home page</NuxtLink>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware: 'stats',
  // mounted() {
  //   this.$nextTick(() => {
  //     setTimeout(() => this.$nuxt.$loading.start(), 1000);
  //     setTimeout(() => this.$nuxt.$loading.finish(), 5000);
  //   });
  // },
};
</script>
