<template>
  <svg
    :class="{'hamburger': true, 'is-active':isActive}"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="0 0 1024 1024"
    @click="toggleClick">
    <path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"/>
    <path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"/>
    <path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"/>
  </svg>
</template>

<script>
  export default {
    props: {
      isActive: {
        type: Boolean,
        default: false
      },
      toggleClick: {
        type: Function,
        default: null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hamburger {
    line-height: $menu-breadcrumb-height / 2;
    height: $menu-breadcrumb-height / 2;
    margin-top: $menu-breadcrumb-height / 4;
    margin-left: $menu-breadcrumb-space;
    cursor: pointer;

    transform: rotate(90deg);
    transition: .38s;
    transform-origin: 50% 50%;

    &.is-active {
      transform: rotate(0deg);
    }
  }
</style>
