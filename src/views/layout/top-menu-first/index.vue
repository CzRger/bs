<template>
  <div class="app-wrapper">
    <menu-first class="menu-first-wrapper">
      <img src="@/assets/images/logo.png"/>
    </menu-first>
    <div class="container-wrapper">
      <div class="main-container">
        <router-view :key="key"/>
      </div>
    </div>
  </div>
</template>

<script>
  import menuFirst from '../common/menu-first'
  export default {
    components: { menuFirst },
    computed: {
      key() {
        return this.$route.name
      }
    }
  }
</script>

<style lang="scss" scoped>
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
      // height: 单独计算，屏幕高度 - $menu-first-wrapper-height
      height: calc(100%);
      width: calc(100%);

      // 主体区域
      .main-container {
        transition: margin-left .28s;
        height: calc(100%);
      }
    }
  }
</style>
