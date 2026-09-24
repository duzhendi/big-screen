<template>
  <div class="sb-fund-left-wrapper">
    <common-box title="社保资金险种结构" height="260px">
      <div class="content-screen"><fundStructure /></div>
    </common-box>
    <common-box title="基金归集来源分布" height="292px" style="margin-top: 13px">
      <div class="content-screen"><fundSource /></div>
    </common-box>
    <common-box title="基金赎回类型分布" height="311px" style="margin-top: 14px">
      <div class="content-screen"><fundRedeem /></div>
    </common-box>
  </div>
</template>

<script setup>
import commonBox from '@/components/common-box.vue'
import fundStructure from './components/fund-structure.vue'
import fundSource from './components/fund-source.vue'
import fundRedeem from './components/fund-redeem.vue'
</script>

<style scoped lang="scss">
.sb-fund-left-wrapper {
  width: 100%;
  height: 100%;
  .content-screen {
    width: 100%;
    height: 100%;
  }
}
</style>