<template>
  <div class="app-wrapper">
    <div :class="dynamicContainerWrapper" class="container-wrapper">
      <sidebar class="sidebar-container"/>
      <div class="main-container">
        <div class="menu-breadcrumb">
          <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

          <breadcrumb class="breadcrumb-container"/>

          <div class="right-menu">

            <el-tooltip content="全屏" effect="dark" placement="bottom">
              <screenfull class="screenfull right-menu-item"/>
            </el-tooltip>

            <el-dropdown class="avatar-container right-menu-item" trigger="click">
              <div class="avatar-wrapper">
                <img :src="getAvatar(user.avatar)" class="user-avatar">
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/myself/modify">
                    <span style="display: block;" >个人信息</span>
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item divided>
                  <span style="display: block;" @click="logout">退出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>

        <tags-view class="menu-history-tags"/>
        <app-main class="app-main"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppMain from '../common/AppMain'
import TagsView from '../common/TagsView'
import Sidebar from '../common/sidebar'

import * as UserAPI from '@/api/system-management/user'
import Hamburger from '@/views/layout/common/Hamburger'
import Breadcrumb from '@/views/layout/common/Breadcrumb'
import Screenfull from '@/components/Screenfull'
import defaultAvatar from '@/assets/images/avatar.jpeg'

export default {
  name: 'DefaultLayout',
  components: { Sidebar, AppMain, TagsView, Hamburger, Breadcrumb, Screenfull },
  created() {
    this.$store.dispatch('loadBaseSystemDictionary')
  },
  data() {
    return {
      previewAvatar: UserAPI.previewAvatar + '?token=' + this.$store.getters.token + '&avatar='
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'user'
    ]),
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
    },
    getAvatar(avatar) {
      if (avatar) {
        return this.previewAvatar + avatar
      } else if (avatar.trim().startsWith("http")) {
        return avatar
      } else {
        return defaultAvatar
      }
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.replace('/login')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .app-wrapper {
    @include clearfix;
    height: 100%;
    width: 100%;

    .container-wrapper {

      position: relative;
      height: 100%;
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
          .right-menu {
            float: right;
            height: 100%;
            &:focus {
              outline: none;
            }
            .right-menu-item {
              display: inline-block;
              margin: 0 8px;
            }
            .screenfull {
              height: 20px;
            }
            .international {
              vertical-align: top;
            }
            .theme-switch {
              vertical-align: 15px;
            }
            .avatar-container {
              height: 50px;
              margin-right: 15px;
              .avatar-wrapper {
                line-height: initial;
                cursor: pointer;
                margin-top: 5px;
                position: relative;
                .user-avatar {
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                  border: 2px solid ghostwhite;
                }
                .el-icon-caret-bottom {
                  position: absolute;
                  right: -20px;
                  top: 25px;
                  font-size: 12px;
                }
              }
            }
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
        height: 100%;
        width: $sidebar-container-width;
        position: fixed;
        font-size: 0px;
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
        padding-left: $sidebar-container-width;
      }

      &.without-animation {
        .main-container, .sidebar-container {
          transition: none;
        }
      }
    }
  }

</style>
