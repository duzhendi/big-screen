<template>
  <div class="oa-right-wrapper">
    <common-box title="年金转移信息" height="260px">
      <div class="content-screen"><transfer /></div>
    </common-box>
    <common-box title="年金待遇发放状态" height="300px" style="margin-top: 13px">
      <div class="content-screen"><benefit /></div>
    </common-box>
    <common-box title="年金赎回/补退情况" height="306px" style="margin-top: 14px">
      <div class="content-screen"><redeem /></div>
    </common-box>
  </div>
</template>

<script setup>
import commonBox from '@/components/common-box.vue'
import transfer from './components/transfer.vue'
import benefit from './components/benefit.vue'
import redeem from './components/redeem.vue'
</script>

<style scoped lang="scss">
.oa-right-wrapper {
  width: 100%;
  height: 100%;
  .content-screen {
    width: 100%;
    height: 100%;
  }
}
</style>