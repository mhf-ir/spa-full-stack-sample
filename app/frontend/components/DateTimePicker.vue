<template>
  <div>
    {{ getDate }}
    <!-- <pre dir="ltr"> {{ dialogDetail.generatedTable }}</pre> -->
    <v-text-field
      v-model="formatedDate"
      :label="placeholder"
      readonly
      clearable
      outlined
      :dense="dense"
      :prepend-inner-icon="icon"
      @click:clear="clearDate"
      @click.native="dialog = true"
    ></v-text-field>
    <v-dialog v-model="dialog" width="600">
      <v-card :dark="dark">
        <v-card-title
          dir="ltr"
          class="headline primary justify-center white--text"
        >
          {{ dialogDetail.title }}
        </v-card-title>
        <v-row class="ma-0 pa-0" justify="center" align="center">
          <v-col>
            <v-select
              v-model="selectedYear"
              :items="yearList"
              item-text="locale"
              item-value="date"
              label="انتخاب سال"
              single-line
              hide-details
              persistent-hint
              :menu-props="{
                top: false,
                auto: true,
                overflowY: true,
                offsetY: true,
              }"
              return-object
              outlined
              dense
              @input="setDate($event.date)"
            ></v-select>
          </v-col>
          <!-- year/mounth-->
          <v-col>
            <v-select
              v-model="selectedMonth"
              :items="monthList"
              single-line
              hide-details
              :menu-props="{
                top: false,
                auto: true,
                overflowY: true,
                offsetY: true,
              }"
              item-text="locale"
              item-value="date"
              label="انتخاب ماه"
              persistent-hint
              return-object
              outlined
              dense
              @input="setDate($event.date)"
            ></v-select>
          </v-col>
        </v-row>
        <!-- time  -->

        <v-card-text class="pa-0 ma-0">
          <!-- head  -->
          <v-simple-table fixed-header class="pa-0 ma-0" :dark="dark">
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    v-for="head in dialogDetail.generatedTable.head"
                    :key="head.name"
                    class="text-center secondary"
                  >
                    <span
                      :class="head.weekend ? 'warning--text' : 'white--text'"
                    >
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
                  <td
                    v-for="day in week"
                    :key="day.dayLocale"
                    :class="
                      $vuetify.breakpoint.mdAndUp
                        ? 'pa-0 ma-0 py-2 text-center'
                        : 'pa-0 ma-0 text-center'
                    "
                  >
                    <v-btn
                      v-show="day"
                      :icon="$vuetify.breakpoint.mdAndDown"
                      depressed
                      :large="$vuetify.breakpoint.mdAndUp"
                      :class="day.className"
                      :color="day.selected ? 'primary' : ''"
                      @click="setTodayDate(day.date)"
                    >
                      {{ day.dayLocale }}
                      <template
                        v-if="$vuetify.breakpoint.mdAndUp"
                        slot="default"
                      >
                        <span
                          v-for="alt in day.alt"
                          :key="alt.dayLocale"
                          class="alties"
                        >
                          {{ alt.dayNative }}
                        </span>
                      </template>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-row dir="ltr" class="ma-0 pa-0" justify="center" align="center">
          <!-- hours  -->
          <v-col dir="ltr">
            <v-text-field
              v-model="selectedHour"
              :reverse="$vuetify.rtl"
              label="ساعت"
              :min="0"
              :max="23"
              hide-details
              type="number"
              outlined
              class="text-h6"
              @input="updateHour"
            ></v-text-field>
          </v-col>
          <!-- minuts  -->
          <v-col dir="ltr">
            <v-text-field
              v-model="selectedMinute"
              class="text-h6"
              :reverse="$vuetify.rtl"
              label="دقیقه"
              :min="0"
              :max="23"
              type="number"
              hide-details
              outlined
              @input="updateMinute"
            ></v-text-field>
          </v-col>
          <!-- seconds  -->
          <v-col dir="ltr">
            <v-text-field
              v-model="selectedSecond"
              class="text-h6"
              :reverse="$vuetify.rtl"
              label="ثانیه"
              min="0"
              max="59"
              type="number"
              hide-details
              outlined
              @input="updateSecond"
            ></v-text-field>
          </v-col>
          <!-- options -->

          <v-col>
            <v-checkbox
              v-model="debug"
              label="دیباگ"
              color="red"
              hide-details
            ></v-checkbox>

            <!-- <v-menu
              :open-on-hover="$vuetify.breakpoint.mdAndUp"
              transition="slide-x-transition"
              top
              left
              :nudge-width="200"
              offset-x
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  fab
                  outlined
                  color="indigo"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon dark>mdi-cog</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item link>
                  <v-list-item-title> نمایش رویداد ها </v-list-item-title>
                </v-list-item>
                <v-list-item link>
                  <v-list-item-title> دیباگ </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu> -->
          </v-col>
        </v-row>
        <!-- debug mood -->
        <v-row v-if="debug" class="secondary my-3 ma-0 pa-0">
          <v-col cols="12" dir="ltr">
            <span class="white--text"> Timezone: </span>
            <kbd>
              {{ timezone }}
            </kbd>
          </v-col>
          <v-col cols="12" dir="ltr">
            <span class="white--text"> Date: </span>
            <kbd>
              {{ processDate.getDate().toString() }}
            </kbd>
          </v-col>
        </v-row>
        <!-- events -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> ذخیره </v-btn>
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
    dark: {
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
      processDate: null,

      debug: false,
      timezone: '',
      formatedDate: '',
      dialog: false,
      yearList: [],
      monthList: [],
      selectedYear: '',
      selectedMonth: '',
      dialogDetail: {},
      selectedMinute: 0,
      selectedSecond: 0,
      selectedHour: 0,
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
    this.processDate = new AasaamDateTime(this.dateTime, this.lang);
    this.updateDate();
    this.timezone = AasaamDateTime.getTimeZone();
  },
  methods: {
    updateDate() {
      const aa = this.processDate.generateMonthWeekTable([], true);
      aa.weeks.forEach((w) => {
        w.map((d) => {
          if (d) {
            let className = '';
            if (d.weekend) {
              className = 'warning--text';
            } else if (d.holiday) {
              className = 'error--text';
            } else if (d.events && d.events.length) {
              className = 'info--text';
            }
            d.className = className;
          }
          return d;
        });
      });

      this.$set(this.dialogDetail, 'generatedTable', aa);

      // this.dialogDetail.generatedTable = this.processDate.generateMonthWeekTable(
      //   [],
      //   false,
      // );
      // console.log(this.processDate.getDate());

      this.yearList = this.processDate.generateYearList(undefined, 10);

      this.monthList = this.processDate.generateMonthList();
      this.yearList.forEach((s) => {
        if (s.selected) {
          this.selectedYear = s.date;
        }
      });
      this.monthList.forEach((s) => {
        if (s.selected) {
          this.selectedMonth = s.date;
        }
      });
      this.selectedHour = this.processDate.getDate().getHours();
      this.selectedMinute = this.processDate.getDate().getMinutes();
      this.selectedSecond = this.processDate.getDate().getSeconds();

      if (this.dateTime) {
        this.formatedDate = this.processDate.isoFormat(this.format);
        // this.dialogDetail.title = this.processDate.isoFormatObject();
        const iso = this.processDate.isoFormatObject();
        this.dialogDetail.title = `${iso.YYYY}/${iso.MM}/${iso.dd} ${iso.HH}:${iso.mm}`;
      }
      // console.log('addednewtest', this.processDate.date);
      // this.getDate = this.processDate.date;
    },
    setDate(date) {
      this.processDate.setDate(date);
      this.updateDate();
    },
    updateSecond(s) {
      this.processDate.setSeconds(s);
      this.setDate(this.processDate.getDate());
      this.getDate = this.processDate.getDate();
    },
    updateMinute(m) {
      this.processDate.setMinutes(m);
      this.setDate(this.processDate.getDate());
      this.getDate = this.processDate.getDate();
    },
    updateHour(h) {
      this.processDate.setHours(h);
      this.setDate(this.processDate.getDate());
      this.getDate = this.processDate.getDate();
    },
    clearDate() {
      this.getDate = null;
      this.formatedDate = '';
      this.dialogDetail.title = '';
    },
    setTodayDate(date) {
      this.setDate(date);
      this.getDate = date;
    },
  },
};
</script>
<style lang="scss" scoped>
tbody {
  tr:hover {
    background-color: transparent !important;
  }
}
.alties {
  position: absolute;
  opacity: 0.5;
  &:first-child {
    right: -12px;
    bottom: -8px;
    font-size: 9px;
  }
  &:nth-child(2) {
    left: -12px;
    bottom: -8px;
    font-size: 9px;
  }
}
.v-select__selections {
  line-height: 21px !important;
}
</style>
