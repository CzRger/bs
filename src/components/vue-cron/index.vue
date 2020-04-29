<template>
  <div id="changeContab">
    <div class="cron">
      <el-tabs ref="tab" type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i>秒</span>
          <div class="tabBody">
            <el-row>
              <el-radio v-model="second.cronEvery" label="999">默认</el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="second.cronEvery" label="1">每一秒钟</el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="second.cronEvery" label="2">每隔
                <el-input-number size="small" v-model="second.incrementIncrement" :min="0" :max="59"></el-input-number>
                秒执行 从
                <el-input-number size="small" v-model="second.incrementStart" :min="0" :max="59"></el-input-number>
                秒开始
              </el-radio>
            </el-row>
            <el-row>
              <el-radio class="long" v-model="second.cronEvery" label="3">具体秒数(可多选)
                <el-select size="small" multiple v-model="second.specificSpecific">
                  <el-option v-for="val in 60" :key="val.index" :value="val-1">{{val-1}}</el-option>
                </el-select>
              </el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="second.cronEvery" label="4">周期从
                <el-input-number size="small" v-model="second.rangeStart" :min="0" :max="58"></el-input-number>
                到
                <el-input-number v-if="judgeSecond(second.rangeStart, second.rangeEnd)" size="small"
                                 v-model="second.rangeEnd" :min="second.rangeStart+1" :max="59"></el-input-number>
                <el-input-number v-else size="small" v-model="second.rangeEnd" :min="second.rangeStart+1"
                                 :max="59"></el-input-number>
                秒
              </el-radio>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i>分</span>
          <div class="tabBody">
            <el-row>
              <el-radio v-model="minute.cronEvery" label="999">默认</el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="minute.cronEvery" label="1">每一分钟</el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="minute.cronEvery" label="2">每隔
                <el-input-number size="small" v-model="minute.incrementIncrement" :min="0" :max="59"></el-input-number>
                分执行 从
                <el-input-number size="small" v-model="minute.incrementStart" :min="0" :max="59"></el-input-number>
                分开始
              </el-radio>
            </el-row>
            <el-row>
              <el-radio class="long" v-model="minute.cronEvery" label="3">具体分钟数(可多选)
                <el-select size="small" multiple v-model="minute.specificSpecific">
                  <el-option v-for="val in 60" :key="val.index" :value="val-1">{{val-1}}</el-option>
                </el-select>
              </el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="minute.cronEvery" label="4">周期从
                <el-input-number size="small" v-model="minute.rangeStart" :min="0" :max="58"></el-input-number>
                到
                <el-input-number v-if="judgeMinute(minute.rangeStart, minute.rangeEnd)" size="small"
                                 v-model="minute.rangeEnd" :min="minute.rangeStart+1" :max="59"></el-input-number>
                <el-input-number v-else size="small" v-model="minute.rangeEnd" :min="minute.rangeStart+1"
                                 :max="59"></el-input-number>
                分
              </el-radio>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i>时</span>
          <div class="tabBody">
            <el-row>
              <el-radio v-model="hour.cronEvery" label="999">默认</el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="hour.cronEvery" label="1">每一小时</el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="hour.cronEvery" label="2">每隔
                <el-input-number size="small" v-model="hour.incrementIncrement" :min="0" :max="23"></el-input-number>
                小时执行 从
                <el-input-number size="small" v-model="hour.incrementStart" :min="0" :max="23"></el-input-number>
                小时开始
              </el-radio>
            </el-row>
            <el-row>
              <el-radio class="long" v-model="hour.cronEvery" label="3">具体小时数(可多选)
                <el-select size="small" multiple v-model="hour.specificSpecific">
                  <el-option v-for="val in 24" :key="val.index" :value="val-1">{{val-1}}</el-option>
                </el-select>
              </el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="hour.cronEvery" label="4">周期从
                <el-input-number size="small" v-model="hour.rangeStart" :min="0" :max="22"></el-input-number>
                到
                <el-input-number v-if="judgeHour(hour.rangeStart, hour.rangeEnd)" size="small" v-model="hour.rangeEnd"
                                 :min="hour.rangeStart+1" :max="23"></el-input-number>
                <el-input-number v-else size="small" v-model="hour.rangeEnd" :min="hour.rangeStart+1"
                                 :max="23"></el-input-number>
                小时
              </el-radio>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i>天</span>
          <div class="tabBody">
            <el-row>
              <el-radio v-model="day.cronEvery" label="999">默认</el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="day.cronEvery" label="1">每一天</el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="day.cronEvery" label="3">每隔
                <el-input-number size="small" v-model="day.incrementIncrement" :min="1" :max="31"></el-input-number>
                天执行 从
                <el-input-number size="small" v-model="day.incrementStart" :min="1" :max="31"></el-input-number>
                天开始
              </el-radio>
            </el-row>
            <el-row>
              <el-radio class="long" v-model="day.cronEvery" label="5">具体天数(可多选)
                <el-select size="small" multiple v-model="day.specificSpecific">
                  <el-option v-for="val in 31" :key="val.index" :value="val">{{val}}</el-option>
                </el-select>
              </el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="day.cronEvery" label="6">在这个月的最后一天</el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="day.cronEvery" label="7">在这个月的最后一个工作日</el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="day.cronEvery" label="9">
                在本月底前
                <el-input-number size="small" v-model="day.cronDaysBeforeEomMinus" :min="1" :max="31"></el-input-number>
                天
              </el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="day.cronEvery" label="10">最近的工作日（周一至周五）至本月
                <el-input-number size="small" v-model="day.cronDaysNearestWeekday" :min="1" :max="31"></el-input-number>
                日
              </el-radio>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i>月</span>
          <div class="tabBody">
            <el-row>
              <el-radio v-model="month.cronEvery" label="999">默认</el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="month.cronEvery" label="1">每一月</el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="month.cronEvery" label="2">
                每隔
                <el-input-number size="small" v-model="month.incrementIncrement" :min="1" :max="12"></el-input-number>
                月执行 从
                <el-input-number size="small" v-model="month.incrementStart" :min="1" :max="12"></el-input-number>
                月开始
              </el-radio>
            </el-row>
            <el-row>
              <el-radio class="long" v-model="month.cronEvery" label="3">具体月数(可多选)
                <el-select size="small" multiple v-model="month.specificSpecific">
                  <el-option v-for="val in 12" :key="val.index" :label="val" :value="val"></el-option>
                </el-select>
              </el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="month.cronEvery" label="4">
                周期从
                <el-input-number size="small" v-model="month.rangeStart" :min="1" :max="11"></el-input-number>
                到
                <el-input-number v-if="judgeMonth(month.rangeStart, month.rangeEnd)" size="small"
                                 v-model="month.rangeEnd" :min="month.rangeStart+1" :max="12"></el-input-number>
                <el-input-number v-else size="small" v-model="month.rangeEnd" :min="month.rangeStart+1"
                                 :max="12"></el-input-number>
                月
              </el-radio>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i>周</span>
          <div class="tabBody">
            <el-row>
              <el-radio v-model="day.cronEvery" label="2">每隔
                <el-input-number size="small" v-model="week.incrementIncrement" :min="1" :max="7"></el-input-number>
                周执行 从
                <el-select size="small" v-model="week.incrementStart">
                  <el-option v-for="val in 7" :key="val.index" :label="Week[val-1]" :value="val"></el-option>
                </el-select>
                开始
              </el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="day.cronEvery" label="11">在这个月的第
                <el-input-number size="small" v-model="week.cronNthDayNth" :min="1" :max="5"></el-input-number>
                周的
                <el-select size="small" v-model="week.cronNthDayDay">
                  <el-option v-for="val in 7" :key="val.index" :label="Week[val-1]" :value="val"></el-option>
                </el-select>
              </el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="day.cronEvery" label="8">在这个月的最后一个
                <el-select size="small" v-model="week.cronLastSpecificDomDay">
                  <el-option v-for="val in 7" :key="val.index" :label="Week[val-1]" :value="val"></el-option>
                </el-select>
              </el-radio>
            </el-row>
            <el-row>
              <el-radio class="long" v-model="day.cronEvery" label="4">具体星期几(可多选)
                <el-select size="small" multiple v-model="week.specificSpecific">
                  <el-option v-for="val in 7"
                             :key="val.index"
                             :label="Week[val-1]"
                             :value="val-1"
                  ></el-option>
                </el-select>
              </el-radio>
            </el-row>
            <el-row>
              <el-radio v-model="day.cronEvery" label="12">
                周期从
                <el-select size="small" v-model="week.rangeStart">
                  <el-option v-for="val in 6" :key="val.index" :label="Week[val-1]" :value="val"></el-option>
                </el-select>
                到
                <el-select size="small" v-model="week.rangeEnd">
                  <el-option v-if="judgeWeek(week.rangeStart, week.rangeEnd)" v-for="val in 6" :key="val.index"
                             :label="Week[val]" :value="val+1"></el-option>
                  <el-option v-else v-for="val in 6" :key="val.index" :label="Week[val]" :value="val+1"></el-option>
                </el-select>
              </el-radio>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="bottom">
        <span class="value">{{cron}}</span>
        <el-button class="button" type="primary" size="small" @click="buttonRest">重置</el-button>
        <el-button class="button" type="primary" size="small" @click="close">关闭</el-button>
        <el-button class="button" type="primary" size="small" @click="change">保存</el-button>
      </div>
    </div>
    <template v-if="isRecent">
      <div class="recent">
        <p class="title">过去2次运行情况</p>
        <p v-for="item in recentRunLast" :key="item.index">{{item}}</p>
        <p class="title">未来5次运行情况</p>
        <p v-for="item in recentRunWill" :key="item.index">{{item}}</p>
      </div>
    </template>
  </div>
</template>
<script>
  import CronParser from 'cron-parser'

  export default {
    props: {
      cronVal: {
        required: false,
        default: ''
      }
    },
    data() {
      return {
        Week: ['天', '一', '二', '三', '四', '五', '六'].map(val => '星期' + val),
        second: {
          cronEvery: '',
          incrementStart: 3,
          incrementIncrement: 5,
          rangeStart: 0,
          rangeEnd: 1,
          specificSpecific: [],
        },
        minute: {
          cronEvery: '',
          incrementStart: 3,
          incrementIncrement: 5,
          rangeStart: 0,
          rangeEnd: 1,
          specificSpecific: [],
        },
        hour: {
          cronEvery: '',
          incrementStart: 3,
          incrementIncrement: 5,
          rangeStart: 0,
          rangeEnd: 1,
          specificSpecific: [],
        },
        day: {
          cronEvery: '',
          incrementStart: 1,
          incrementIncrement: 1,
          specificSpecific: [],
          cronLastSpecificDomDay: 1,
          cronDaysBeforeEomMinus: '',
          cronDaysNearestWeekday: '',
        },
        week: {
          cronEvery: '',
          incrementStart: 1,
          incrementIncrement: 1,
          specificSpecific: [],
          cronLastSpecificDomDay: 1,
          cronNthDayDay: 1,
          cronNthDayNth: 1,
          rangeStart: 1,
          rangeEnd: 2,
        },
        month: {
          cronEvery: '',
          incrementStart: 3,
          incrementIncrement: 5,
          rangeStart: 1,
          rangeEnd: 2,
          specificSpecific: [],
        },
        cronCol: '',
        isRecent: false,
        recentRunLast: [],
        recentRunWill: []
      }
    },
    watch: {
      cronVal: {
        handler: function (newVal) {
          if (newVal == '' || newVal == null || newVal == undefined){
            this.buttonRest()
          }else {
            this.cronCol = newVal
            this.reset()
            try {
              let interval = CronParser.parseExpression(this.cronCol)
              for (let i = 0; i < 2; i++) {
                this.recentRunLast.push(this.format(interval.prev()))
              }
              this.recentRunLast.reverse()
              interval = CronParser.parseExpression(this.cronCol)
              for (let i = 0; i < 5; i++) {
                this.recentRunWill.push(this.format(interval.next()))
              }
            } catch (err) {
              console.log('Error: ' + err.message)
            }
            if (this.cronCol != '' && this.cronCol != null) {
              this.isRecent = true
              this.reCron(this.cronCol)
            }
            this.cronCol = ''
          }
        }
      }
    },
    computed: {
      secondsText() {
        let seconds = ''
        let cronEvery = this.second.cronEvery
        let arr = []
        if (((Number(this.minute.cronEvery) >= 1 && Number(this.minute.cronEvery) <= 4)
          || (Number(this.hour.cronEvery) >= 1 && Number(this.hour.cronEvery) <= 4)
          || (Number(this.day.cronEvery) >= 1 && Number(this.day.cronEvery) <= 12)
          || (Number(this.month.cronEvery) >= 1 && Number(this.month.cronEvery) <= 4)
          ) && (Number(cronEvery) < 1 || Number(cronEvery) > 4)){
          cronEvery = '99'
        }
        switch (cronEvery.toString()) {
          case '1':
            if ((Number(this.minute.cronEvery) >= 1 && Number(this.minute.cronEvery) <= 4)
              || (Number(this.hour.cronEvery) >= 1 && Number(this.hour.cronEvery) <= 4)
              || (Number(this.day.cronEvery) >= 1 && Number(this.day.cronEvery) <= 12)
              || (Number(this.month.cronEvery) >= 1 && Number(this.month.cronEvery) <= 4)){
              for (let i = 0; i < 60; i++) {
                arr.push(i)
              }
              arr.map(val => {
                seconds += val + ','
              })
              seconds = seconds.slice(0, -1)
            }else{
              seconds = '*'
            }
            break;
          case '2':
            seconds = this.second.incrementStart + '/' + this.second.incrementIncrement
            break
          case '3':
            if (this.second.specificSpecific.length == 0) {
              seconds = '?'
            }else {
              arr = this.second.specificSpecific
              if (arr.length>1){
                for(let i = 0; i < arr.length - 1; i++){
                  for(let j = i + 1; j < arr.length; j++){
                    if(arr[i] > arr[j]) {
                      let temp = arr[j];
                      arr[j] = arr[i];
                      arr[i] = temp;
                    }
                  }
                }
              }
              this.second.specificSpecific.map(val => {
                seconds += val + ','
              })
              seconds = seconds.slice(0, -1)
            }
            break
          case '4':
            seconds = this.second.rangeStart + '-' + this.second.rangeEnd
            break
          case '99':
            seconds = '0'
            break
        }
        return seconds
      },
      minutesText() {
        let minutes = ''
        let cronEvery = this.minute.cronEvery
        let arr = []
        if (((Number(this.hour.cronEvery) >= 1 && Number(this.hour.cronEvery) <= 4)
          || (Number(this.day.cronEvery) >= 1 && Number(this.day.cronEvery) <= 12)
          || (Number(this.month.cronEvery) >= 1 && Number(this.month.cronEvery) <= 4)
          ) && (Number(cronEvery) < 1 || Number(cronEvery) > 4)){
          cronEvery = '99'
        }
        switch (cronEvery.toString()) {
          case '1':
            if ((Number(this.hour.cronEvery) >= 1 && Number(this.hour.cronEvery) <= 4)
              || (Number(this.day.cronEvery) >= 1 && Number(this.day.cronEvery) <= 12)
              || (Number(this.month.cronEvery) >= 1 && Number(this.month.cronEvery) <= 4)){
              for (let i = 0; i < 60; i++) {
                arr.push(i)
              }
              arr.map(val => {
                minutes += val + ','
              })
              minutes = minutes.slice(0, -1)
            }else{
              minutes = '*'
            }
            break;
          case '2':
            minutes = this.minute.incrementStart + '/' + this.minute.incrementIncrement
            break;
          case '3':
            if (this.minute.specificSpecific.length == 0) {
              minutes = '?'
            }else {
              arr = this.minute.specificSpecific
              if (arr.length > 1) {
                for (let i = 0; i < arr.length - 1; i++) {
                  for (let j = i + 1; j < arr.length; j++) {
                    if (arr[i] > arr[j]) {
                      let temp = arr[j];
                      arr[j] = arr[i];
                      arr[i] = temp;
                    }
                  }
                }
              }
              this.minute.specificSpecific.map(val => {
                minutes += val + ','
              })
              minutes = minutes.slice(0, -1)
            }
            break
          case '4':
            minutes = this.minute.rangeStart + '-' + this.minute.rangeEnd
            break
          case '99':
            minutes = '0'
            break
        }
        return minutes
      },
      hoursText() {
        let hours = ''
        let cronEvery = this.hour.cronEvery
        let arr = []
        if (((Number(this.day.cronEvery) >= 1 && Number(this.day.cronEvery) <= 12)
          || (Number(this.month.cronEvery) >= 1 && Number(this.month.cronEvery) <= 4)
          ) && (Number(cronEvery) < 1 || Number(cronEvery) > 4)){
          cronEvery = '99'
        }
        switch (cronEvery.toString()) {
          case '1':
            if ((Number(this.day.cronEvery) >= 1 && Number(this.day.cronEvery) <= 12)
              || (Number(this.month.cronEvery) >= 1 && Number(this.month.cronEvery) <= 4)){
              for (let i = 0; i < 24; i++) {
                arr.push(i)
              }
              arr.map(val => {
                hours += val + ','
              })
              hours = hours.slice(0, -1)
            }else{
              hours = '*'
            }
            break;
          case '2':
            hours = this.hour.incrementStart + '/' + this.hour.incrementIncrement
            break;
          case '3':
            if (this.hour.specificSpecific.length == 0) {
              hours = '?'
            }else {
              arr = this.hour.specificSpecific
              if (arr.length > 1) {
                for (let i = 0; i < arr.length - 1; i++) {
                  for (let j = i + 1; j < arr.length; j++) {
                    if (arr[i] > arr[j]) {
                      let temp = arr[j];
                      arr[j] = arr[i];
                      arr[i] = temp;
                    }
                  }
                }
              }
              this.hour.specificSpecific.map(val => {
                hours += val + ','
              })
              hours = hours.slice(0, -1)
            }
            break
          case '4':
            hours = this.hour.rangeStart + '-' + this.hour.rangeEnd
            break
          case '99':
            hours = '0'
            break
        }
        return hours
      },
      daysText() {
        let days = ''
        let cronEvery = this.day.cronEvery
        let arr = []
        if (((Number(this.month.cronEvery) >= 1 && Number(this.month.cronEvery) <= 4)
        ) && (Number(cronEvery) < 1 || Number(cronEvery) > 12)){
          cronEvery = '99'
        }
        switch (cronEvery.toString()) {
          case '1':
            if (Number(this.month.cronEvery) >= 1 && Number(this.month.cronEvery) <= 4) {
              for (let i = 1; i < 32; i++) {
                arr.push(i)
              }
              arr.map(val => {
                days += val + ','
              })
              days = days.slice(0, -1)
            }else{
              days = '*'
            }
            break;
          case '2':
            days = '?'
            break
          case '3':
            days = this.day.incrementStart + '/' + this.day.incrementIncrement
            break
          case '4':
            days = '?'
            break
          case '5':
            if (this.day.specificSpecific.length == 0) {
              days = '?'
            }else {
              arr = this.day.specificSpecific
              if (arr.length > 1) {
                for (let i = 0; i < arr.length - 1; i++) {
                  for (let j = i + 1; j < arr.length; j++) {
                    if (arr[i] > arr[j]) {
                      let temp = arr[j];
                      arr[j] = arr[i];
                      arr[i] = temp;
                    }
                  }
                }
              }
              this.day.specificSpecific.map(val => {
                days += val + ','
              })
              days = days.slice(0, -1)
            }
            break
          case '6':
            days = 'L'
            break
          case '7':
            days = 'LW'
            break;
          case '8':
            days = '?'
            break;
          case '9':
            days = this.day.cronDaysBeforeEomMinus + 'L'
            break
          case '10':
            days = this.day.cronDaysNearestWeekday + 'W'
            break
          case '11':
            days = '?'
            break
          case '12':
            days = '?'
            break
          case '99':
            days = '1'
            break
        }
        return days
      },
      weeksText() {
        let weeks = ''
        let cronEvery = this.day.cronEvery
        let arr = []
        switch (cronEvery.toString()) {
          case '1':
            weeks = '?'
            break
          case '3':
            weeks = '?'
            break
          case '2':
            weeks = this.week.incrementStart + '/' + this.week.incrementIncrement
            break
          case '4':
            if (this.week.specificSpecific.length == 0) {
              weeks = '?'
            }else {
              arr = this.week.specificSpecific
              if (arr.length > 1) {
                for (let i = 0; i < arr.length - 1; i++) {
                  for (let j = i + 1; j < arr.length; j++) {
                    if (arr[i] > arr[j]) {
                      let temp = arr[j];
                      arr[j] = arr[i];
                      arr[i] = temp;
                    }
                  }
                }
              }
              this.week.specificSpecific.map(val => {
                weeks += val + ','
              })
            }
            weeks = weeks.slice(0, -1)
            break
          case '5':
            weeks = '?'
            break
          case '6':
            weeks = '?'
            break
          case '7':
            weeks = '?'
            break
          case '8':
            weeks = this.week.cronLastSpecificDomDay + 'L'
            break
          case '9':
            weeks = '?'
            break
          case '10':
            weeks = '?'
            break
          case '11':
            weeks = this.week.cronNthDayDay + '#' + this.week.cronNthDayNth
            break
          case '12':
            weeks = this.week.rangeStart + '-' + this.week.rangeEnd
            break
          case '99':
            weeks = '?'
            break
        }
        return weeks;
      },
      monthsText() {
        let months = ''
        let cronEvery = this.month.cronEvery
        let arr = []
        switch (cronEvery.toString()) {
          case '1':
            months = '*'
            break;
          case '2':
            months = this.month.incrementStart + '/' + this.month.incrementIncrement
            break
          case '3':
            if (this.month.specificSpecific.length == 0) {
              months = '?'
            }else {
              arr = this.month.specificSpecific
              if (arr.length > 1) {
                for (let i = 0; i < arr.length - 1; i++) {
                  for (let j = i + 1; j < arr.length; j++) {
                    if (arr[i] > arr[j]) {
                      let temp = arr[j];
                      arr[j] = arr[i];
                      arr[i] = temp;
                    }
                  }
                }
              }
              this.month.specificSpecific.map(val => {
                months += val + ','
              })
              months = months.slice(0, -1)
            }
            break
          case '4':
            months = this.month.rangeStart + '-' + this.month.rangeEnd
            break
        }
        return months
      },
      cron() {
        return `${this.secondsText || '*'} ${this.minutesText || '*'} ${this.hoursText || '*'} ${this.daysText || '*'} ${this.monthsText || '*'} ${this.weeksText || '?'}`
      }
    },
    activated() {
      if (this.cronVal == null) {
        this.buttonRest()
      }else {
        this.reset()
        try {
          let interval = CronParser.parseExpression(this.cronVal)
          for (let i = 0; i < 2; i++) {
            this.recentRunLast.push(this.format(interval.prev()))
          }
          this.recentRunLast.reverse()
          interval = CronParser.parseExpression(this.cronVal)
          for (let i = 0; i < 5; i++) {
            this.recentRunWill.push(this.format(interval.next()))
          }
        } catch (err) {
          console.log('Error: ' + err.message)
        }
        this.isRecent = true
        this.reCron(this.cronVal)
      }
    },
    methods: {
      judgeSecond(smallVal, bigVal) {
        if (smallVal >= bigVal) {
          this.second.rangeEnd = smallVal + 1
          return false
        }
        return true
      },
      judgeMinute(smallVal, bigVal) {
        if (smallVal >= bigVal) {
          this.minute.rangeEnd = smallVal + 1
          return false
        }
        return true
      },
      judgeHour(smallVal, bigVal) {
        if (smallVal >= bigVal) {
          this.hour.rangeEnd = smallVal + 1
          return false
        }
        return true
      },
      judgeMonth(smallVal, bigVal) {
        if (smallVal >= bigVal) {
          this.month.rangeEnd = smallVal + 1
          return false
        }
        return true
      },
      judgeWeek(smallVal, bigVal) {
        if (smallVal >= bigVal) {
          this.week.rangeEnd = smallVal + 1
          return false
        }
        return true
      },
      complementZero(val) {
        if ((val + '').length < 2) {
          return '0' + val
        }
        return val
      },
      format(date) {
        return date.getFullYear() + '-' + this.complementZero((date.getMonth() + 1)) + '-' + this.complementZero(date.getDate()) + ' ' + this.complementZero(date.getHours()) + ':' + this.complementZero(date.getMinutes()) + ':' + this.complementZero(date.getSeconds())
      },
      reCron(cronV) {
        const cronArr = cronV.split(' ')
        this.reWeeksText(cronArr[5], cronArr[3])
        this.reMonthsText(cronArr[4])
        this.reDaysText(cronArr[3], cronArr[5])
        this.reHoursText(cronArr[2])
        this.reMinutesText(cronArr[1])
        this.reSecondsText(cronArr[0])
      },
      reSecondsText(seconds) {
        if (seconds.includes('*')) {
          this.second.cronEvery = '999'
          this.minute.cronEvery = '999'
          this.hour.cronEvery = '999'
          this.day.cronEvery = '999'
          this.month.cronEvery = '999'
        } else if (seconds.includes('/')) {
          this.second.cronEvery = '2'
          const incrementArr = seconds.split('/')
          this.second.incrementStart = Number(incrementArr[0])
          this.second.incrementIncrement = Number(incrementArr[1])
        } else if (seconds.includes(',')) {
          this.second.cronEvery = '3'
          this.second.specificSpecific = seconds.split(',')
        } else if (seconds.includes('-')) {
          this.second.cronEvery = '4'
          const rangeArr = seconds.split('-')
          this.second.rangeStart = Number(rangeArr[0])
          this.second.rangeEnd = Number(rangeArr[1])
        }else if (seconds.includes('?')) {
          this.second.cronEvery = '3'
        } else {
          this.second.cronEvery = '3'
          this.second.specificSpecific.push(Number(seconds))
        }
      },
      reMinutesText(minutes) {
        if (minutes.includes('*')) {
          this.minute.cronEvery = '1'
          this.hour.cronEvery = '999'
          this.day.cronEvery = '999'
          this.month.cronEvery = '999'
        } else if (minutes.includes('/')) {
          this.minute.cronEvery = '2'
          const incrementArr = minutes.split('/')
          this.minute.incrementStart = Number(incrementArr[0])
          this.minute.incrementIncrement = Number(incrementArr[1])
        } else if (minutes.includes(',')) {
          this.minute.cronEvery = '3'
          this.minute.specificSpecific = minutes.split(',')
        } else if (minutes.includes('-')) {
          this.minute.cronEvery = '4'
          const rangeArr = minutes.split('-')
          this.minute.rangeStart = Number(rangeArr[0])
          this.minute.rangeEnd = Number(rangeArr[1])
        }else if (minutes.includes('?')) {
          this.minute.cronEvery = '3'
        } else {
          this.minute.cronEvery = '3'
          this.minute.specificSpecific.push(Number(minutes))
        }
      },
      reHoursText(hours) {
        if (hours.includes('*')) {
          this.hour.cronEvery = '1'
          this.day.cronEvery = '999'
          this.month.cronEvery = '999'
        } else if (hours.includes('/')) {
          this.hour.cronEvery = '2'
          const incrementArr = hours.split('/')
          this.hour.incrementStart = Number(incrementArr[0])
          this.hour.incrementIncrement = Number(incrementArr[1])
        } else if (hours.includes(',')) {
          this.hour.cronEvery = '3'
          this.hour.specificSpecific = hours.split(',')
        } else if (hours.includes('-')) {
          this.hour.cronEvery = '4'
          const rangeArr = hours.split('-')
          this.hour.rangeStart = Number(rangeArr[0])
          this.hour.rangeEnd = Number(rangeArr[1])
        }else if (hours.includes('?')) {
          this.hour.cronEvery = '3'
        } else {
          this.hour.cronEvery = '3'
          this.hour.specificSpecific.push(Number(hours))
        }
      },
      reDaysText(days, weeks) {
        if (days.includes('*') && weeks.includes('?')) {
          this.day.cronEvery = '1'
          this.month.cronEvery = '999'
        } else if (days.includes('/') && weeks.includes('?')) {
          this.day.cronEvery = '3'
          const incrementArr = days.split('/')
          this.day.incrementStart = Number(incrementArr[0])
          this.day.incrementIncrement = Number(incrementArr[1])
        } else if (days.includes(',') && weeks.includes('?')) {
          this.day.cronEvery = '5'
          this.day.specificSpecific = weeks.split(',')
        } else if (days == 'L' && weeks.includes('?')) {
          this.day.cronEvery = '6'
        } else if (days == 'LW' && weeks.includes('?')) {
          this.day.cronEvery = '7'
        } else if (days.includes('L') && weeks.includes('?')) {
          this.day.cronEvery = '9'
          this.day.cronDaysBeforeEomMinus = Number(days.split('L'))
        } else if (days.includes('W') && weeks.includes('?')) {
          this.day.cronEvery = '10'
          this.day.cronDaysNearestWeekday = Number(days.split('W'))
        }else if (days.includes('?') && !weeks.includes('?')) {
          // this.reWeeksText(weeks, days)
        }else {
          this.day.cronEvery = '5'
          this.day.specificSpecific.push(Number(days))
        }
      },
      reMonthsText(months) {
        if (months.includes('*')) {
          this.month.cronEvery = '1'
        } else if (months.includes('/')) {
          this.month.cronEvery = '2'
          const incrementArr = months.split('/')
          this.month.incrementStart = Number(incrementArr[0])
          this.month.incrementIncrement = Number(incrementArr[1])
        } else if (months.includes(',')) {
          this.month.cronEvery = '3'
          this.month.specificSpecific = months.split(',')
        } else if (months.includes('-')) {
          this.month.cronEvery = '4'
          const rangeArr = months.split('-')
          this.month.rangeStart = Number(rangeArr[0])
          this.month.rangeEnd = Number(rangeArr[1])
        }else if (months.includes('?')) {
          this.month.cronEvery = '3'
        } else {
          this.month.cronEvery = '3'
          this.month.specificSpecific.push(Number(months))
        }
      },
      reWeeksText(weeks, days) {
        if (weeks.includes('?') && days.includes('*')) {
          this.day.cronEvery = '999'
        } else if (weeks.includes('-') && days.includes('?')) {
          this.day.cronEvery = '12'
          const rangeArr = weeks.split('-')
          this.week.rangeStart = Number(rangeArr[0])
          this.week.rangeEnd = Number(rangeArr[1])
        } else if (weeks.includes('/') && days.includes('?')) {
          this.day.cronEvery = '2'
          const incrementArr = weeks.split('/')
          this.week.incrementStart = Number(incrementArr[0])
          this.week.incrementIncrement = Number(incrementArr[1])
        } else if (weeks.includes('#') && days.includes('?')) {
          this.day.cronEvery = '11'
          const cronNthDayArr = weeks.split('#')
          this.week.cronNthDayDay = Number(cronNthDayArr[1])
          this.week.cronNthDayNth = Number(cronNthDayArr[0] - 1)
        } else if (weeks.includes('L') && days.includes('?')) {
          this.day.cronEvery = '8'
          this.week.cronLastSpecificDomDay = Number(weeks.split('L')[0])
        } else if (weeks.includes(',') && days.includes('?')) {
          this.day.cronEvery = '4'
          this.week.specificSpecific = weeks.split(',')
        } else {
          this.day.cronEvery = '4'
          this.week.specificSpecific.push(Number(weeks))
        }
      },
      reset() {
        this.second = {
          cronEvery: '',
          incrementStart: 3,
          incrementIncrement: 5,
          rangeStart: 0,
          rangeEnd: 1,
          specificSpecific: []
        }
        this.minute = {
          cronEvery: '',
          incrementStart: 3,
          incrementIncrement: 5,
          rangeStart: 0,
          rangeEnd: 1,
          specificSpecific: []
        }
        this.hour = {
          cronEvery: '',
          incrementStart: 3,
          incrementIncrement: 5,
          rangeStart: 0,
          rangeEnd: 1,
          specificSpecific: []
        }
        this.day = {
          cronEvery: '',
          incrementStart: 1,
          incrementIncrement: 1,
          rangeStart: 1,
          rangeEnd: 2,
          specificSpecific: [],
          cronLastSpecificDomDay: 1,
          cronDaysBeforeEomMinus: '',
          cronDaysNearestWeekday: ''
        }
        this.week = {
          cronEvery: '',
          incrementStart: 1,
          incrementIncrement: 1,
          specificSpecific: [],
          cronLastSpecificDomDay: 1,
          cronNthDayDay: 1,
          cronNthDayNth: 1,
          rangeStart: 1,
          rangeEnd: 2
        }
        this.month = {
          cronEvery: '',
          incrementStart: 3,
          incrementIncrement: 5,
          rangeStart: 1,
          rangeEnd: 2,
          specificSpecific: []
        }
        this.isRecent = false
        this.recentRunLast = []
        this.recentRunWill = []
      },
      buttonRest() {
        this.reset()
        this.reCron('* * * * * ?')
      },
      change() {
        this.$emit('change', this.cron)
      },
      close() {
        this.$emit('close')
      }
    }
  }
</script>
<style lang="scss" scoped>
  #changeContab {
    .language {
      position: absolute;
      right: 25px;
      z-index: 1;
    }
    .el-tabs {
      box-shadow: none;
    }
    .tabBody {
      .el-row {
        margin: 10px 0;
        .long {
          .el-select {
            width: 200px;
          }
        }
        .el-input-number {
          width: 110px;
        }
      }
    }
    .bottom {
      width: 100%;
      text-align: center;
      margin-top: 5px;
      position: relative;
      .value {
        font-size: 18px;
        vertical-align: middle;
        float: left;
      }
      .button {
        float: right;
        margin-left: 2px !important;
        margin-right: 0px !important;
      }
    }
  }

  .recent {
    width: 180px;
    float: left;
    text-align: center;
    height: calc(100%);
    line-height: 10px;
  }

  .cron {
    float: left;
    height: calc(100%);
  }

  .title {
    font-size: 18px;
  }

</style>
