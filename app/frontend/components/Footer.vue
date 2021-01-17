<template>
  <div class="d-flex align-center justify-space-between">
    <div class="pa-6">
      <p class="text--secondary">
        {{ $t('projectName') }}
        <br />
        {{ $t('projectDescription') }}
      </p>
      <p class="text--disabled caption">
        {{
          $t('copyright', {
            name: $t('aasaam.description'),
          })
        }}
      </p>
    </div>
    <div class="pa-6">
      <v-select :items="items" dense></v-select>
      <v-breadcrumbs :items="items">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :href="item.href">
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </div>
  </div>

  <!-- <v-footer class="asm-router" padless>
    <v-row>
      <v-col class="pa-6" cols="6">
        <div class="text-start">
          <p class="text--secondary caption">
            {{ $t('projectName') }}
            <br />
            {{ $t('projectDescription') }}
          </p>
          <p class="text--disabled caption">
            {{
              $t('copyright', {
                name: $t('aasaam.description'),
              })
            }}
          </p>
        </div>
      </v-col>
      <v-col class="pa-6" cols="6">
        <v-breadcrumbs :items="items">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item :href="item.href">
              {{ item.text.toUpperCase() }}
            </v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>
      </v-col>
    </v-row>
  </v-footer> -->
</template>

<script>
import { Organization as info } from '@aasaam/information';

export default {
  name: 'Footer',
  data: () => ({
    items: [
      {
        text: 'support',
        href: `mailto:${info.en.email}`,
      },
    ],
  }),
};
</script>
