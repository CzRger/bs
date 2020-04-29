<template>
  <div class="menu-wrapper">
    <div class="system">
      <router-link :to="{ path: '/redirect/index' }">
        <slot/>
      </router-link>
    </div>
    <div class="menu">
      <template v-for="item in dynamicMenus" v-if="item.hidden !== true">
        <a href="javascript:void(0);" v-if="isExternalLink(item)" :key="item.name || item.path" @click="openExternalLink(item)">
          <div class="item animated zoomIn">{{ item.meta.title }}</div>
        </a>
        <router-link v-else :key="item.name || item.path" :to="getRealRouter(item)">
          <div :class="'item animated zoomIn' + getActive(item.name)">{{ item.meta.title }}</div>
        </router-link>
      </template>
    </div>
    <div class="user">
      <el-dropdown class="avatar-container" trigger="click">
        <img :src="getAvatar(user.avatar)" class="user-avatar">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >
            <span style="display: block;" @click="screenFull">全屏</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
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
</template>

<script>
  import screenFull from 'screenfull'
  import { mapGetters } from 'vuex'
  import { isExternal, obj2Param } from '@/utils'
  import defaultAvatar from '@/assets/images/avatar.jpeg'
  import * as UserAPI from '@/api/system-management/user'

  export default {
    name: 'menu-first',
    data() {
      return {
        previewAvatar: UserAPI.previewAvatar + '?token=' + this.token + '&avatar='
      }
    },
    computed: {
      ...mapGetters([
        'user',
        'menus',
        'token'
      ]),
      dynamicMenus() {
        return JSON.parse(JSON.stringify(this.menus)).reverse()
      }
    },
    methods: {
      isExternalLink(to) {
        return isExternal(to.path)
      },
      openExternalLink(to) {
        let queryStr = obj2Param(to.query)
        if (queryStr && queryStr !== '') {
          queryStr = queryStr + '&' + obj2Param(to.params)
        } else {
          queryStr = obj2Param(to.params)
        }
        window.open(to.path + '?token=' + this.token + '&' + queryStr, '_blank')
      },
      getRealRouter(router) {
        if (router.redirect && router.redirect.name) {
          return router.redirect
        }
        return {name: router.name, query: router.query, params: router.params}
      },
      getActive(name) {
        let matched = false
        this.$route.matched.forEach(m => {
          if (m.name === name) {
            matched = true
          }
        })
        return matched ? ' active ' : ''
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
      },
      screenFull() {
        if (!screenFull.enabled) {
          this.$message({
            message: 'you browser can not work',
            type: 'warning'
          })
          return false
        }
        screenFull.toggle()
      }
    }
  }
</script>

<style lang="scss" scoped>

  $menu-first-item-border-bottom: 3px;
  $system-width: 230px;
  $user-width: 50px;
  .menu-wrapper {
    width: 100%;

    .system {
      width: $system-width;
      height: 100%;
      display: inline-block;
    }

    .menu {
      // width: 单独计算，屏幕宽度 - （$system-width + $user-width）
      width: calc(100% - #{$system-width} - #{$user-width});
      height: 100%;
      display: inline-block;

      .item {
        display: inline-block;
        float: right;
        height: $menu-first-wrapper-height;
        line-height: $menu-first-wrapper-height;
        width: 70px;
        text-align: center;
        color: $menu-first-item-text-color;
        font-family: 微软雅黑;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;

        &:first-child {
          margin-right: 20px;
        }

        &:last-child {
          margin-left: 0px;
        }

        &.active {
          background: $menu-first-item-active-background-color;
          color: $menu-first-item-text-active-color;
          border-bottom: $menu-first-item-border-bottom solid $menu-first-item-text-active-color;
        }

        &:hover {
          background: $menu-first-item-active-background-color;
          color: $menu-first-item-text-active-color;
          border-bottom: $menu-first-item-border-bottom solid $menu-first-item-text-active-color;
        }
      }
    }

    .user {
      width: $user-width;
      height: 100%;
      display: inline-block;

      &:focus {
        outline: none;
      }

      .avatar-container {
        height: 50px;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid ghostwhite;
          position: relative;
          display: inline-block;
          margin-bottom: 20px;
          margin-left: 5px;
        }
      }
    }
  }

  @mixin media-screen($item-width) {
    .menu-wrapper {
      .menu {
        .item {
          width: $item-width;
        }
      }
    }
  }

  @media screen and (max-width: 2560px) {
    $item-width: 200px;
    @include media-screen($item-width);
  }

  @media screen and (max-width: 1920px) {
    $item-width: 150px;
    @include media-screen($item-width);
  }

  @media screen and (max-width: 1680px) {
    $item-width: 150px;
    @include media-screen($item-width);
  }

  @media screen and (max-width: 1440px) {
    $item-width: 120px;
    @include media-screen($item-width);
  }

  @media screen and (max-width: 1366px) {
    $item-width: 105px;
    @include media-screen($item-width);
  }

  @media screen and (max-width: 1280px) {
    $item-width: 100px;
    @include media-screen($item-width);
  }

  @media screen and (max-width: 1024px) {
    $item-width: 70px;
    @include media-screen($item-width);
  }
</style>
