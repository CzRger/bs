<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200"
      :default-active="$route.name"
      :collapse="isCollapse"
      :unique-opened="uniqueOpened"
      popper-class="system-popper-menu"
      mode="vertical">
      <slot/>
      <sidebar-item v-for="route in dynamicRouters" :key="route.name" :index="route.name" :item="route" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SidebarItem from './SidebarItem'

  export default {
    props: {
      menuSplit: {  // 是否进行菜单切分，默认为false，展示所有菜单，反之仅展示当前一级路由对应的子路由
        required: false,
        type: Boolean,
        default: false
      },
      uniqueOpened: {
        required: false,
        type: Boolean,
        default: true
      }
    },
    components: {SidebarItem},
    computed: {
      ...mapGetters([
        'menus',
        'sidebar'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      },
      dynamicRouters() {
        if (this.menuSplit) {
          const router = this.menus.find(router => {
            try {
              if (router.path.length <= 1) {
                return false
              }
              const reg = new RegExp("^" + router.path)
              return reg.test(this.$route.path)
            } catch {
              return false
            }
          })
          if (router && router.children && router.children.length > 0) {
            return router.children
          }
          return []
        }
        return this.menus
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

  /deep/ .el-menu {
    background-color: $sidebar-menu-background-color !important;

    li.el-submenu.is-active:not(.is-opened) .el-submenu__title {
      @include menu-active
    }

    li.el-menu-item, div.el-submenu__title {
      @include menu-simple;

      &:hover, &.is-active {
        @include menu-active;
      }
    }
  }

  /deep/ .scrollbar-wrapper {
    overflow-x: hidden !important;

    .el-scrollbar__view {
      height: 100%;
    }
  }


</style>
