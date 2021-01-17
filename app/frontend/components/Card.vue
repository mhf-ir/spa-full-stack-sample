<template>
  <v-theme-provider root>
    <v-card>
      <v-app-bar dark color="primary">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>My Music</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-app-bar>
      <v-toolbar flat height="72">
        <v-switch
          v-model="$vuetify.theme.dark"
          hint="This toggles the global state of the Vuetify theme"
          inset
          label="Vuetify Theme Dark"
          persistent-hint
        ></v-switch>
      </v-toolbar>

      <v-card-text>
        <v-list>
          <v-subheader>I inherit dark from my parent</v-subheader>

          <v-list-item v-for="item in items" :key="item">
            <v-list-item-title v-text="item"></v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider class="mb-y"></v-divider>

        <v-list rounded>
          <v-subheader>
            <span>I inherit from the root</span>

            <strong>&nbsp;$vuetify.theme.dark</strong>
          </v-subheader>

          <v-list-item v-for="item in items" :key="item">
            <v-list-item-title v-text="item"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-theme-provider>
</template>

<script>
export default {
  name: 'Card',
  data: () => ({ items: ['One', 'Two', 'Three'] }),
};
</script>
