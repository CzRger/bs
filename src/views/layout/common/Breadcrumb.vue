<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in routerMatched" v-if="item.meta.title" :key="item.path">
        <span v-if="index === routerMatched.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <router-link v-else :to="item.redirect || item.path">{{ item.meta.title }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  import pathToRegexp from 'path-to-regexp'

  export default {
    data() {
      return {
        routerMatched: []
      }
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
    created() {
      this.getBreadcrumb()
    },
    methods: {
      getBreadcrumb() {
        const {params} = this.$route
        const matched = this.$route.matched.filter(item => {
          if (item.name) {
            var toPath = pathToRegexp.compile(item.path)
            item.path = toPath(params)
            return true
          }
        })
        if (matched) {
          this.routerMatched = matched
        } else {
          this.routerMatched = []
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: $element-color-text-regular;
      cursor: text;
    }
  }
</style>
