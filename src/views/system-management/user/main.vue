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
  import edit from './edit'
  import add from './add'
  import check from './check'
  import batchEdit from './batchEdit'

  export default {
    components: {query, edit, add, check, batchEdit},
    data() {
      return {
        optionType: 'query',
        detail: {}
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
