<template>
  <transition name="fade-transform" mode="out-in">
    <keep-alive>
      <component :is="optionType" :detail="detail" @option-changed="optionChangeHandler"/>
    </keep-alive>
  </transition>
</template>

<script>
  import NProgress from 'nprogress' // 进度条组件
  import query from './query'
  import detail from './detail'

  export default {
    components: {query, detail},
    data() {
      const detail = {}
      if (this.$route.params.jobId) {
        console.log(this.$route)
        detail.jobId = this.$route.params.jobId
      }
      return {
        optionType: 'query',
        detail: detail
      }
    },
    methods: {
      optionChangeHandler(optionType = 'query', detail = {}) {
        NProgress.start()
        this.detail = detail
        this.optionType = optionType
        NProgress.done()
      }
    }
  }
</script>
