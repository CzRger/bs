<template>
  <div class="menu-group">
    <router-view/>
  </div>
</template>

<script>
/**
 * 目的： 用于更多级的菜单，默认提供的layout不支持三级菜单
 */
export default {
  name: 'MenuGroup'
}
</script>

<style lang="scss" scoped>
  .menu-group {
    width: 100%;
    height: inherit;
    min-height: inherit;
    border: 0;
  }
</style>
