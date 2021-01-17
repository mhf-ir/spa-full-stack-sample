<template>
  <div>
    <v-text-field
      v-model="formatedDate"
      :label="placeholder"
      readonly
      clearable
      outlined
      :dense="dense"
      :prepend-inner-icon="icon"
      @click:clear="clearDate"
      @click.stop="dialog = true"
    ></v-text-field>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          {{ dialogDetail.title }}
        </v-card-title>

        <v-card-text class="pa-0 ma-0">
          <!-- head  -->
          <v-simple-table fixed-header class="pa-0 ma-0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    v-for="head in dialogDetail.generatedTable.head"
                    :key="head.name"
                    class="text-center grey darken-3"
                  >
                    <span :class="head.weekend ? 'red--text' : 'white--text'">
                      {{ head.narrow }}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(week, i) in dialogDetail.generatedTable.weeks"
                  :key="i"
                  class="text-center"
                >
                  <td v-for="day in week" :key="day.dayLocale">
                    {{ day.dayLocale }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <!-- <v-row class="grey darken-3">
            <v-col
              v-for="head in dialogDetail.generatedTable.head"
              :key="head.name"
              class="text-center"
            >
              <span class="white--text">
                {{ head.narrow }}
              </span>
            </v-col>
          </v-row> -->
          <!-- week -->
          <!-- <v-row class="py-2 grey lighten-4">
            <v-col
              v-for="day in dialogDetail.generatedTable.weeks"
              :key="day.name"
              cols="12"
              class="text-center"
            >
              <v-row class="pa-0" cols="12">
                <v-col v-for="i in day" :key="i.name" class="pa-0 text-center">
                  <v-btn icon class="my-1">
                    {{ i.dayLocale }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row> -->
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> I accept </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { AasaamDateTime } from '@aasaam/date-time';
export default {
  name: 'DateTimePicker',
  props: {
    dateTime: {
      type: Date,
      default: undefined,
      required: false,
    },
    lang: {
      type: String,
      default: 'fa',
      required: true,
    },
    icon: {
      type: String,
      default: 'mdi-calendar',
      required: false,
    },
    placeholder: {
      type: String,
      default: '',
      required: true,
    },
    dense: {
      type: Boolean,
      default: false,
      required: false,
    },
    format: {
      type: String,
      default: 'YYYY/MM/dd HH:mm',
      required: false,
    },
  },
  data() {
    return {
      formatedDate: '',
      dialog: false,
      dialogDetail: {},
    };
  },
  computed: {
    getDate: {
      get() {
        return this.dateTime;
      },
      set(newValue) {
        this.$emit('update:dateTime', newValue);
      },
    },
  },
  created() {
    this.updateDate(this.dateTime);
    // console.log(d.generateMonthWeekTable([], true));
  },
  methods: {
    formatTime() {},
    updateDate(date) {
      const d = new AasaamDateTime(this.dateTime, this.lang);
      this.dialogDetail.generatedTable = d.generateMonthWeekTable([], false);
      console.log(d.generateMonthWeekTable([], true));

      if (this.dateTime) {
        this.formatedDate = d.isoFormat(this.format);
        this.dialogDetail.title = d.isoFormat('EEEE d MMMM YYYY HH:mm');
      }
    },
    clearDate() {
      this.getDate = null;
      this.formatedDate = '';
      this.dialogDetail.title = '';
    },
  },
};
</script>
