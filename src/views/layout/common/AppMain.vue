<template>
  <div class="app-main">
    <div class="el-card is-always-shadow">
      <div class="el-card__body">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key"/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AppMain',
    computed: {
      key() {
        return this.$route.name
      }
    }
  }
</script>

<style lang="scss" scoped>
  $content-min-height: 400px;

  .app-main {
    padding: 15px;
    position: relative;

    .el-card {
      width: 100%;
      overflow: auto;

      .el-card__body {
        width: 100%;
        min-height: $content-min-height;
        overflow: auto;
      }
    }
  }

  @mixin media-screen($content-min-height) {
    .app-main {
      .el-card {
        .el-card__body {
          min-height: $content-min-height !important;
        }
      }
    }
  }

  @media screen and (max-height: 1800px) {
    $content-min-height: 1529px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 1680px) {
    $content-min-height: 1409px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 1600px) {
    $content-min-height: 1329px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 1440px) {
    $content-min-height: 1169px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 1200px) {
    $content-min-height: 929px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 1152px) {
    $content-min-height: 881px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 1080px) {
    $content-min-height: 809px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 1050px) {
    $content-min-height: 779px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 1024px) {
    $content-min-height: 753px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 960px) {
    $content-min-height: 689px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 900px) {
    $content-min-height: 661px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 864px) {
    $content-min-height: 669px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 854px) {
    $content-min-height: 659px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 800px) {
    $content-min-height: 605px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 768px) {
    $content-min-height: 573px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 720px) {
    $content-min-height: 525px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 600px) {
    $content-min-height: 405px;
    @include media-screen($content-min-height);
  }

  @media screen and (max-height: 500px) {
    $content-min-height: 305px;
    @include media-screen($content-min-height);
  }

</style>
