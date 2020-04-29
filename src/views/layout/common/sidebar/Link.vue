<template>
  <!-- eslint-disable-next-line vue/require-component-is -->
  <component v-bind="linkProps(to)">
    <slot/>
  </component>
</template>

<script>
  import { isExternal, obj2Param} from '@/utils'

  export default {
    props: {
      to: {
        type: Object,
        required: true
      }
    },
    methods: {
      linkProps(to) {
        if (isExternal(to.path)) {
          let queryStr = obj2Param(to.query)
          if (queryStr && queryStr !== '') {
            queryStr = queryStr + '&' + obj2Param(to.params)
          } else {
            queryStr = obj2Param(to.params)
          }
          return {
            is: 'a',
            href: to.path + '?token=' + this.$store.getters.token + '&' + queryStr,
            target: '_blank',
            rel: 'noopener'
          }
        }
        return {
          is: 'router-link',
          to: { name: to.name, query: to.query, params: to.params }
        }
      }
    }
  }
</script>
