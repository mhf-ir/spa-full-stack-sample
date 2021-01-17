<template>
  <div>
    {{ $i18n.locale }}
    <!-- {{ availableLocales }} -->
    <!-- <v-menu
      offset-y
      min-width="130"
      nudge-bottom="16"
      light
      left
      origin="right right"
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn text color="primary" dark class="nocase" v-on="on">
          <span v-if="$i18n.locale == 'fa'" class="fn-t inline-b"> فارسی </span>
          <span v-if="$i18n.locale == 'en'" class="fn-t inline-b">
            English
          </span>
          <v-icon class="inline-b pr-2">mdi-earth</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="locale in availableLocales"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          @change="vuetifyDirrtl(locale.code)"
          @input="vuetifyDirrtl(locale.code)"
        >
          <v-list-item-title>{{ locale.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
    <!-- <v-row>
      <v-col cols="3">
        <v-select
          :items="availableLocales"
          label="Select lang"
          item-text="nativeName"
          item-value="code"
          outlined
          v-model="defaultL"
        >
          <template v-slot:item="{ item }">
            <v-list>
              <v-list-item
                :to="switchLocalePath(item.code)"
                @click.native="vuetifyDirrtl(item.code)"
              >
                <v-list-item-title>{{ item.nativeName }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </template>
        </v-select>
      </v-col>
    </v-row> -->

    <div>
      <v-select
        v-model="defaultL"
        :items="availableLocales"
        label="choooos"
        required
        return-object
        item-text="nativeName"
        item-value="code"
      >
        <template v-slot:item="{ item }">
          <v-list>
            <v-list-item
              value="true"
              :to="switchLocalePath(item.code)"
              @click.native="checkDirection(item.code)"
            >
              {{ item.nativeName }}
            </v-list-item>
          </v-list>
        </template>
      </v-select>
    </div>
    <div class="mb-12"></div>
    <!-- <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
    >
      {{ locale.name }}</nuxt-link
    > -->
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
      this.$i18n.setLocaleCookie(locale);
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
