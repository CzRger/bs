<template>
  <el-card>
    <div style="width: 100%;">
      <div :style="xStyle" :class="{ 'horizontal': isHorizontal }">
        <slot />
      </div>
      <div :style="buttonStyle" :class="{ 'horizontal': isHorizontal }">
        <slot name="button"/>
      </div>
    </div>
  </el-card>
</template>

<script>
  export default {
    name: 'XButtonLayout',
    props: {
      isHorizontal: {
        required: false,
        type: Boolean,
        default: true //垂直布局，false 水平布局
      },
      buttonWidth: {
        required: true,
      }
    },
    computed: {
      buttonStyle() {
        const style = {
          width: this.buttonWidth + 'px'
        }
        if (this.isHorizontal) {
          style.float = 'right'
        } else {
          style.margin = '0 auto'
        }
        return style
      },
      xStyle() {
        if (this.isHorizontal) {
          return { width: 'calc(100% - ' + this.buttonWidth + 'px)' }
        }
        return { width: '100%' }
      }
    }
  }
</script>

<style lang="scss" scoped>

  .horizontal {
    display: inline-block;

    /deep/ .el-form-item {
      margin-bottom: 0px;
    }
  }
</style>
