<template>
  <div class="zgsx-screen-wrapper">
    <div class="layout-box"><commonLeft /></div>
    <div class="zgsx-layout-center"><commonCenter /></div>
    <div class="layout-box"><commonRight /></div>
  </div>
</template>

<script setup>
import commonLeft from './left'
import commonCenter from './center'
import commonRight from './right'
</script>

<style scoped lang="scss">
.zgsx-screen-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .layout-box {
    width: 440px;
    height: 100%;
  }
  .zgsx-layout-center {
    width: 941px;
  }
}
</style>
