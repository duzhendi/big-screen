<template>
  <div class="public-service-screen-wrapper">
    <div class="layout-box"><commonLeft /></div>
    <div class="public-service-layout-center"><commonCenter /></div>
    <div class="layout-box"><commonRight /></div>
  </div>
</template>

<script setup>
import commonLeft from './left'
import commonCenter from './center'
import commonRight from './right'
</script>

<style scoped lang="scss">
.public-service-screen-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  .layout-box {
    width: 440px;
    height: 100%;
  }
  .public-service-layout-center {
    width: 940px;
  }
}
</style>