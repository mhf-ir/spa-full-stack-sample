<template>
  <v-container class="px-0" fluid>
    <v-switch
      v-model="switch1"
      :label="`Switch 1: ${switch1.toString()}`"
    ></v-switch>
    <LangSwitcher />
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      switch1: this.$vuetify.rtl,
    };
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     setTimeout(() => this.$nuxt.$loading.start(), 1000);
  //     setTimeout(() => this.$nuxt.$loading.finish(), 3000);
  //   });
  // },
};
</script>
