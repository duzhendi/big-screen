<template>
  <div class="check-report-screen-wrapper">
    <div class="layout-box"><commonLeft /></div>
    <div class="check-report-layout-center"><commonCenter /></div>
  </div>
</template>

<script setup>
import commonLeft from './left'
import commonCenter from './center'
</script>

<style scoped lang="scss">
.check-report-screen-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  // 模块只有左侧 + 中间两部分，中间区吃掉剩余宽度
  .layout-box {
    width: 440px;
    height: 100%;
    flex-shrink: 0;
  }
  .check-report-layout-center {
    flex: 1;
    min-width: 0;
    height: 100%;
  }
}
</style>
