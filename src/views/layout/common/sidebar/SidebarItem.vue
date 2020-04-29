<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <!-- 没有children的情况，直接渲染 -->
    <template v-if="!item.children">
      <app-link :to="item">
        <el-menu-item :index="item.name" :class="{'submenu-title-no-dropdown': !isNest}">
          <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <!-- 有children的情况，判断是否可直接跳跃渲染 -->
    <template v-else-if="!item.alwaysShow && hasOneShowingChild(item) && (!onlyOneShowing.children || onlyOneShowing.noShowingChildren)">
      <app-link :to="onlyOneShowing">
        <el-menu-item :index="onlyOneShowing.name" :class="{'submenu-title-no-dropdown':!isNest}">
          <item v-if="onlyOneShowing.meta" :icon="onlyOneShowing.meta.icon || item.meta.icon" :title="onlyOneShowing.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <!-- 有children的情况，需要逐层渲染的情况 -->
    <el-submenu v-else :index="item.name" :popper-append-to-body="false">
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
      </template>
      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children && child.children.length > 0"
          :is-nest="true"
          :item="child"
          :key="child.path"/>

        <app-link v-else :to="child" :key="child.name">
          <el-menu-item :index="child.name">
            <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
  import Item from './Item'
  import AppLink from './Link'

  export default {
    name: 'SidebarItem',
    components: {Item, AppLink},
    props: {
      // route object
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        onlyOneShowing: null
      }
    },
    methods: {
      hasOneShowingChild(router) {
        const showingChildren = router.children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // 记录最后一个非hidden子路由
            this.onlyOneShowing = item
            return true
          }
        })

        // 有且仅有一个可显示的非hidden子路由,根据上述记录结果，显示该子路由
        if (showingChildren.length === 1) {
          return true
        }

        // 没有可显示的非hidden子路由,显示自身路由
        if (showingChildren.length === 0) {
          this.onlyOneShowing = {...router, noShowingChildren: true}
          return true
        }

        // 非hidden子路由大于1个
        return false
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .menu-wrapper {
    .submenu-title-no-dropdown {
      position: relative;

      /deep/ .el-tooltip {
        padding: 0px 10px !important;
      }
    }

  }
</style>
