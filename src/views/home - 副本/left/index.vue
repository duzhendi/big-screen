<template>
  <div class="home-left-wrapper">
    <div class="top-container">
      <topCom />
    </div>
    <div class="bottom-container">
      <bottomCom />
    </div>
  </div>
</template>

<script setup>
import topCom from './top/index.vue'
import bottomCom from './bottom/index.vue'
</script>

<style lang="scss" scoped>
.home-left-wrapper {
  width: 100%;
  height: 100%;
  .top-container {
    width: 100%;
    height: 637px;
    background: rgba(9, 54, 100, 0.26);
  }
  .bottom-container {
    margin-top: 10px;
    width: 100%;
    height: 329px;
    background: rgba(9, 54, 100, 0.26);
  }
}
</style>
