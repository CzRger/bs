<template>
  <div class="app-wrapper">
    <top-menu-first class="menu-first-wrapper">
      <img src="@/assets/images/logo.png"/>
    </top-menu-first>
    <div :class="dynamicContainerWrapper" class="container-wrapper">
      <sidebar :menu-split="true" class="sidebar-container"/>
      <div class="main-container">
        <div class="menu-breadcrumb">
          <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
          <breadcrumb class="breadcrumb-container"/>
        </div>
        <tags-view class="menu-history-tags"/>
        <app-main class="app-main"/>
      </div>
    </div>
  </div>
</template>

<script>
import Hamburger from '@/views/layout/common/Hamburger'
import Breadcrumb from '@/views/layout/common/Breadcrumb'

import AppMain from '../common/AppMain'
import TagsView from '../common/TagsView'
import Sidebar from '../common/sidebar'
import TopMenuFirst from '../common/menu-first'

export default {
  name: 'DefaultLayout',
  components: { TopMenuFirst, Sidebar, AppMain, TagsView, Hamburger, Breadcrumb },
  created() {
    this.$store.dispatch('loadBaseSystemDictionary')
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    dynamicContainerWrapper() {
      return {
        'hide-sidebar': !this.sidebar.opened,
        'open-sidebar': this.sidebar.opened,
        'without-animation': this.sidebar.withoutAnimation
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    height: 100%;
    width: 100%;

    .menu-first-wrapper {
      height: $menu-first-wrapper-height !important;
      background: $menu-first-wrapper-background-color;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;

      img {
        height: $app-logo-height;
        width: $app-logo-width;
        float: left;
        margin-top: ($menu-first-wrapper-height - $app-logo-height ) / 2;
        margin-left: 11px;
      }
    }

    .container-wrapper {

      position: relative;
      padding-top: $menu-first-wrapper-height !important;
      height: calc(100% - #{$menu-first-wrapper-height});
      width: 100%;

      // 主体区域
      .main-container {
        transition: margin-left .28s;
        height: 100%;
        position: relative;

        .menu-breadcrumb {
          height: $menu-breadcrumb-height;
          line-height: $menu-breadcrumb-height;
          border-radius: 0px !important;

          .hamburger-container {
            float: left;
          }
          .breadcrumb-container {
            float: left;
          }
        }
        .menu-history-tags {
          height: $menu-history-tags-height;
        }
        .app-main {
          width: 100%;
          min-height: 100%;
          background: $app-main-background-color;
        }
      }

      // 侧边栏
      .sidebar-container {
        transition: width 0.28s;

        height: calc(100% - #{$menu-first-wrapper-height});
        width: $sidebar-container-width !important;
        position: fixed;
        font-size: 0px;
        margin-top: $menu-first-wrapper-height !important;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 9999;
        overflow: hidden;

        //reset element-ui css
        /deep/ .horizontal-collapse-transition {
          transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
        }

        /deep/ .el-scrollbar__bar.is-vertical {
          right: 0px;
        }
        /deep/ .is-horizontal {
          display: none;
        }
        /deep/ a {
          display: inline-block;
          width: 100%;
          overflow: hidden;
        }
        /deep/ .svg-icon {
          margin-right: 16px;
        }
        /deep/ .el-menu {
          border: none;
          height: 100%;
          width: 100% !important;
        }
      }

      &.hide-sidebar {
        .sidebar-container {
          width: $hide-sidebar-container-width;
        }

        .main-container {
          padding-left: $hide-sidebar-container-width;
        }

        /deep/ .el-submenu {
          overflow: hidden;
          & > .el-submenu__title {
            padding: 0 10px !important;
            .el-submenu__icon-arrow {
              display: none;
            }
          }
        }

        /deep/ .logo {
          display: none;
        }

        .el-menu--vertical > .el-menu .svg-icon {
          margin-right: 20px;
        }
      }

      &.open-sidebar {
        padding-left: $sidebar-container-width !important;
      }

      &.without-animation {
        .main-container, .sidebar-container {
          transition: none;
        }
      }
    }
  }

</style>
