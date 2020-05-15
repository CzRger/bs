<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default{
  name: 'App'
}
</script>
<style type="text/css" media="screen">
  /*chrome滚动条颜色设置*/
  *::-webkit-scrollbar {width:7px; height:10px; background-color:transparent;} /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  *::-webkit-scrollbar-track {background-color:#FFFFFF;  } /*定义滚动条轨道 内阴影+圆角*/
  *::-webkit-scrollbar-thumb {background-color:#DEDFE1; border-radius:6px;} /*定义滑块 内阴影+圆角*/
  .scrollbarHide::-webkit-scrollbar{display: none}
  .scrollbarShow::-webkit-scrollbar{display: block}
  .triggerMsg {
    width: calc(80%);
    height: calc(80%);
    overflow: auto;
  }
</style>
