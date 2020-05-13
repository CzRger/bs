<template>
  <div class="dashboard">
    <div class="top">
      <div class="one inDiv">
        <div class="top_back">
          <div class="left">
            <svg-icon class="icon" :iconClass="'actuator'"/>
          </div>
          <div class="right">
            <div class="in_top">
              <p class="p_one">执行器数量</p>
              <p class="p_two">{{top_data.actuator}}</p>
            </div>
            <div class="in_bottom">
              <p class="p_three">调度平台在线的执行器数量</p>
            </div>
          </div>
        </div>
      </div>
      <div class="two  inDiv">
        <div class="top_back">
          <div class="left">
            <svg-icon class="icon" :iconClass="'task'"/>
          </div>
          <div class="right">
            <div class="in_top">
              <p class="p_one">任务数量</p>
              <p class="p_two">{{top_data.task}}</p>
            </div>
            <div class="in_bottom">
              <p class="p_three">调度平台存在的任务数量</p>
            </div>
          </div>
        </div>
      </div>
      <div class="three  inDiv">
        <div class="top_back">
          <div class="left">
            <svg-icon class="icon" :iconClass="'number'"/>
          </div>
          <div class="right">
            <div class="in_top">
              <p class="p_one">调度次数</p>
              <p class="p_two">{{top_data.log + 66}}</p>
            </div>
            <div class="in_bottom">
              <p class="p_three">调度平台触发的调度次数</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bar inDiv">
        <div class="echarts">
          <simple-bar class="echartBar" :data="barData"/>
        </div>
        <div class="des">
          <div class="success">
            <p>调度成功次数：</p>
            <p class="data">{{barData[0].value}}</p>
          </div>
          <div class="error">
            <p>调度失败次数：</p>
            <p class="data">{{barData[1].value}}</p>
          </div>
        </div>
      </div>
      <div class="pie inDiv">
        <div class="echarts">
          <simple-pie class="echartPie" :data="pieData"/>
        </div>
        <div class="des">
          <div class="success">
            <p>调度成功次数：</p>
            <p class="data">{{pieData[0].value}}</p>
          </div>
          <div class="error">
            <p>调度失败次数：</p>
            <p class="data">{{pieData[1].value}}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import SimplePie from "../common/components/echarts/pie/simple-pie";
  import {JobGroupAPI, JobInfoAPI, JobLogAPI} from "../../api/task-management";
  import SimpleBar from "../common/components/echarts/bar/simple-bar";
  export default {
    components: {
      SimpleBar,
      SimplePie,
    },
    data() {
      return {
        pieData: [
          {value: 66, name: '成功', itemStyle: {color: '#27c800'}},
          {value: 0, name: '失败', itemStyle: {color: '#d33e00'}},
        ],
        barData: [
          {value: 6, name: '成功', itemStyle: {color: '#27c800'}},
          {value: 0, name: '失败', itemStyle: {color: '#d33e00'}},
        ],
        top_data: {
          actuator: 0,
          task: 0,
          log: 0
        }
      }
    },
    mounted() {
      this.initTaskLog()
      this.initYDayTaskLog()
      this.initActuator()
      this.initTask()
    },
    methods: {
      initTaskLog() {
        const params = {"pageSize":99999,"page":1,"sorts":[],"entity":{"jobGroup":null,"jobId":null,"logStatus":null,"filterTime":null}}
        JobLogAPI.pageList(params)
        .then(data => {
          data.list.forEach(v => {
            v.triggerCode == 200
              ? this.pieData[0].value = this.pieData[0].value + 1
              : this.pieData[1].value = this.pieData[1].value + 1
          })
          this.top_data.log = data.total
        })
      },
      initYDayTaskLog() {
        const params = {"pageSize":99999,"page":1,"sorts":[],"entity":{"jobGroup":null,"jobId":null,"logStatus":null,"filterTime":null}}
        const today = new Date()
        today.setTime(today.getTime()-24*60*60*1000)
        const startTime = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + ' 00:00:00'
        const endTime = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + ' 23:59:59'
        params.entity.filterTime = startTime + ' - ' + endTime
        JobLogAPI.pageList(params)
        .then(data => {
          data.list.forEach(v => {
            v.triggerCode == 200
              ? this.barData[0].value = this.barData[0].value + 1
              : this.barData[1].value = this.barData[1].value + 1
          })
        })
      },
      initActuator() {
        this.top_data.actuator = 0
        JobGroupAPI.pageList({"pageSize":10,"page":1,"sorts":[],"entity":{"appName":null,"title":null,"addressType":0}})
        .then(data => {
          this.top_data.actuator = this.top_data.actuator + data.total
        })
        JobGroupAPI.pageList({"pageSize":10,"page":1,"sorts":[],"entity":{"appName":null,"title":null,"addressType":1}})
        .then(data => {
          this.top_data.actuator = this.top_data.actuator + data.total
        })
      },
      initTask() {
        this.top_data.task = 0
        JobInfoAPI.pageList({"pageSize":10,"page":1,"sorts":[],"entity":{"jobGroup": null,"triggerStatus":0,"jobDesc":null,"executorHandler":null,"author":null}})
        .then(data => {
          this.top_data.task = this.top_data.task + data.total
        })
      },
      initLog() {
        const params = {"pageSize":99999,"page":1,"sorts":[],"entity":{"jobGroup":null,"jobId":null,"logStatus":null,"filterTime":null}}
        const today = new Date()
        today.setTime(today.getTime()-24*60*60*1000)
        const startTime = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + ' 00:00:00'
        const endTime = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + ' 23:59:59'
        params.entity.filterTime = startTime + ' - ' + endTime
        JobLogAPI.pageList(params)
          .then(data => {
            data.list.forEach(v => {
              v.triggerCode == 200
                ? this.barData[0].value = this.barData[0].value + 1
                : this.barData[1].value = this.barData[1].value + 1
            })
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .dashboard {
    background-color: #f6f6f6;
    height: calc(100%);
    width: calc(100%);
    padding: 20px;
    .top {
      width: calc(100% - 40px);
      height: 200px;
      margin: 0px 0px 20px 30px;
      div {
        height: calc(100%);
        width: calc(32%);
        float: left;
      }
      .one {
        padding: 30px;
        .left {
          background-color: #195beb;
        }
        .right {
          background-color: #276dff;
        }
      }
      .two {
        padding: 30px;
        margin-left: 25px;
        .left {
          background-color: #eba200;
        }
        .right {
          background-color: #ffb200;
        }
      }
      .three {
        padding: 30px;
        margin-left: 25px;
        .left {
          background-color: #00c364;
        }
        .right {
          background-color: #00e071;
        }
      }
    }
    .bottom {
      width: calc(100% - 40px);
      height: 400px;
      margin: 0px 0px 0px 30px;
      div {
        float: left;
      }
      .bar{
        width: calc(50% - 20px);
        height: calc(100%);
        background-color: #FFFFFF;
        div {
          float: left;
        }
        .echarts {
          width: 500px;
          height: calc(100%);
        }
        .des {
          width: calc(100% - 500px);
          height: calc(100%);
          .success, .error {
            font-size: 30px;
            margin-left: 30px;
            >p {
              float: left;
            }
          }
          .success {
            margin-top: 40%;
            .data {
              color: #00e071;
            }
          }
          .error {
            margin-top: 20px;
            .data {
              color: red;
            }
          }
        }
      }
      .pie{
        margin-left: 20px;
        width: calc(50% - 20px);
        height: calc(100%);
        background-color: #FFFFFF;
        div {
          float: left;
        }
        .echarts {
          width: 500px;
          height: calc(100%);
        }
        .des {
          width: calc(100% - 500px);
          height: calc(100%);
          .success, .error {
            font-size: 30px;
            margin-left: 30px;
            >p {
              float: left;
            }
          }
          .success {
            margin-top: 40%;
            .data {
              color: #00e071;
            }
          }
          .error {
            margin-top: 20px;
            .data {
              color: red;
            }
          }
        }
      }
    }
    .inDiv {
      background-color: #FFFFFF;
      border-radius: 20px;
    }
    .top_back {
      width: calc(100%) !important;
      height: calc(100%) !important;
      .left {
        height: calc(100%);
        width: 140px;
        border-right: #FFFFFF 1px solid;
        border-radius: 20px 0 0 20px;
        .icon {
          width: calc(100%);
          height: calc(100%);
          padding: 20px;
        }
      }
      .right {
        height: calc(100%);
        width: calc(100% - 140px);
        border-radius: 0 20px 20px 0;
        p {
          color: #FFFFFF;
          margin-left: 20px;
        }
        div {
          width: calc(100%);
        }
        .in_top {
          height: 100px;
          border-bottom: #FFFFFF 1px solid;
          .p_one {
            margin-top: 20px;
            font-size: 30px;
          }
          .p_two {
            font-size: 30px;
          }
        }
        .in_bottom {
          height: calc(100% - 100px);
          .p_three {
            margin-top: 10px;
            font-size: 20px;
          }
        }
      }
    }
  }
</style>
