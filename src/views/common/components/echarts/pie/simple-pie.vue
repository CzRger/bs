<template>
  <vue-chart :options="options" :autoresize="true" @click="(params) => $emit('item-click', params)"/>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/pie'
  import 'echarts/lib/component/tooltip'

  export default {
    props: {
      data: {
        required: true,
        type: Array,
        validator: function (data) {
          return data.findIndex(v => !v.name || !v.value) == -1
        }
      },
    },
    components: { 'vue-chart': ECharts },
    data() {
      return {
        options: this.init()
      }
    },
    methods: {
      init() {
        return {
          title: {
            text: '总体任务调度情况',
            left: 'center',
            padding: [
              20,  // 上
              0, // 右
              0,  // 下
              0, // 左
            ]
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['成功', '失败']
          },
          series: [
            {
              name: '任务调度',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: this.data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
            }
          ]
        }
      }
    },
    watch: {
      'data': {
        deep: true,
        handler: function () {
          this.options = this.init()
        }
      },
    }
  }
</script>
