<template>
  <div>
    <v-snackbar v-model="snackbar" multi-line>
      <span>
        مینیموم تاریخ و ساعت باید
        <span dir="ltr">
          {{ min }}
        </span>

        باشد
      </span>

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          بستن
        </v-btn>
      </template>
    </v-snackbar>
    <v-text-field
      v-model="formatedDate"
      dir="ltr"
      :label="placeholder"
      readonly
      clearable
      outlined
      :dense="dense"
      :prepend-inner-icon="icon"
      @click:clear="clearDate"
      @click.native="dialog = true"
    ></v-text-field>
    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
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
          <v-simple-table fixed-header class="pa-0 ma-0">
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    v-for="head in dialogDetail.generatedTable.head"
                    :key="head.name"
                    class="text-center secondary"
                  >
                    <span :class="head.weekend ? 'error--text' : 'white--text'">
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
                      icon
                      :class="`${day.className} body-1`"
                      :color="day.selected ? 'primary' : ''"
                      :outlined="day.selected ? true : false"
                      :disabled="checkForAccept(day.dateStart, day.dateEnd)"
                      @click="setTodayDate(day.date)"
                    >
                      {{ day.dayLocale }}
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
          <v-col>
            <v-text-field
              v-model.number="selectedHour"
              filled
              hide-details
              type="number"
              class="text-h6"
              @input="updateHour"
            ></v-text-field>
          </v-col>
          :
          <!-- minuts  -->
          <v-col>
            <v-text-field
              v-model.number="selectedMinute"
              class="text-h6"
              filled
              hide-details
              type="number"
              suffix="′"
              @input="updateMinute"
            ></v-text-field>
          </v-col>
          :
          <!-- seconds  -->
          <v-col>
            <v-text-field
              v-model.number="selectedSecond"
              class="text-h6"
              filled
              hide-details
              type="number"
              suffix="″"
              @input="updateSecond"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="clearDate()"> لغو </v-btn>
          <v-btn color="warning" @click="setDate(new Date())"> اکنون </v-btn>
          <v-btn color="primary" @click="validateDate()"> ذخیره </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { AasaamDateTime } from '@aasaam/date-time';
export default {
  name: 'DateTimePicker',

  filters: {
    formatFilter(value) {
      if (!value) return '';
      // const formatInstance = new AasaamDateTime(value, 'fa');
      // value = value.toString();

      // value = formatInstance.isoFormat('EEEE d MMMM YYYY HH:mm');
      return value;

      // return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  props: {
    dateTime: {
      type: Date,
      default: undefined,
      required: false,
    },
    min: {
      type: Date,
      default: undefined,
      required: false,
    },
    max: {
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
      processDate: null,

      snackbar: false,
      debug: false,
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
  },
  methods: {
    updateDate() {
      const aa = this.processDate.generateMonthWeekTable([]);
      aa.weeks.forEach((w) => {
        w.map((d) => {
          if (d) {
            let className = '';
            if (d.weekend) {
              className = 'error--text';
            }
            d.className = className;
          }
          return d;
        });
      });

      this.$set(this.dialogDetail, 'generatedTable', aa);

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

      this.formatter();
    },
    formatter() {
      if (this.dateTime) {
        const iso = this.processDate.isoFormatObject();
        this.formatedDate = `${iso.YYYY}-${iso.MM}-${iso.dd} ${iso.HH}:${iso.mm}:${iso.ss}`;
        this.$set(
          this.dialogDetail,
          'title',
          `${iso.YYYY}-${iso.MM}-${iso.dd} ${iso.HH}:${iso.mm}:${iso.ss}`,
        );
      } else {
        this.$set(this.dialogDetail, 'title', 'selectDate');
      }
    },
    validateDate() {
      // save method
      // this.dialog = false;
      if (!(this.min && this.processDate.getDate() > this.min)) {
        console.log('k');
        this.snackbar = true;
      }
      if (this.max && this.processDate.getDate() < this.max) {
        console.log('b');
        // this.snackbar = true;
      }
    },
    checkForAccept(dateStart, dateEnd) {
      if (this.min && this.min > dateEnd) {
        return true;
      }
      if (this.max && this.max < dateStart) {
        return true;
      }
      return false;
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
      // this.$set(this.dialogDetail, 'title', '');
      // this.dialog = false;
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
</style>
