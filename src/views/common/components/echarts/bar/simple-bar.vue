<template>
  <vue-chart :options="options" :autoresize="true" @click="(params) => $emit('item-click', params)"/>
</template>

<script>
  import ECharts from 'vue-echarts'
  import 'echarts/lib/chart/bar'
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
            text: '昨日任务调度情况',
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
            formatter: '{b} : {c}'
          },
          xAxis: {
            type: 'category',
            data: ['成功', '失败']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.data,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(220, 220, 220, 0.8)'
            }
          }]
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
