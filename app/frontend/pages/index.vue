<template>
  <v-container class="px-0" fluid>
    <!-- <v-switch
      v-model="switch1"
      :label="`Switch 1: ${switch1.toString()}`"
    ></v-switch> -->
    <LangSwitcher />
    <v-row>
      <v-col cols="12">
        <div class="ma-4">
          date1:{{ selectDate1 }}
          <DateTimePicker
            :date-time.sync="selectDate1"
            :lang="selectLang"
            placeholder="select Date"
            :dense="true"
          />
        </div>

        <div class="ma-4">
          date2: {{ selectDate2 }}
          <br />
          <DateTimePicker
            :date-time.sync="selectDate2"
            :lang="selectLang"
            placeholder="انتخاب زمان"
          />
        </div>

        <div class="ma-4">
          date3:
          <br />
          <pre>{{ selectDate3 }}</pre>
          <DateTimePicker
            :dark="true"
            :date-time.sync="selectDate3"
            :lang="selectLang"
            format="EEEE d MMMM YYYY HH:mm"
            placeholder="انتخاب زمان"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      switch1: this.$vuetify.rtl,
      selectDate1: undefined,
      selectDate2: new Date(),
      selectDate3: new Date('1986-01-27 12:00:00'),
      selectLang: this.$i18n.locale,
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
