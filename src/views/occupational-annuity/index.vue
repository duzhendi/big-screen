<template>
  <div class="oa-screen-wrapper">
    <div class="layout-box"><commonLeft /></div>
    <div class="oa-layout-center"><commonCenter /></div>
    <div class="layout-box"><commonRight /></div>
  </div>
</template>

<script setup>
import commonLeft from './left'
import commonCenter from './center'
import commonRight from './right'
</script>

<style scoped lang="scss">
.oa-screen-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .layout-box {
    width: 460px;
    height: 100%;
  }
  .oa-layout-center {
    width: calc(100% - 920px);
  }
}
</style>