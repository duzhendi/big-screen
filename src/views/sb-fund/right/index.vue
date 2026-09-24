<template>
  <div class="sb-fund-right-wrapper">
    <common-box title="待遇变更类型分布" height="260px">
      <div class="content-screen"><benefitChange /></div>
    </common-box>
    <common-box title="社保缴费基数异常校验分析" height="292px" style="margin-top: 13px">
      <div class="content-screen"><baseCheck /></div>
    </common-box>
    <common-box title="社保缴费赎回情况" height="311px" style="margin-top: 14px">
      <div class="content-screen"><redeemStatus /></div>
    </common-box>
  </div>
</template>

<script setup>
import commonBox from '@/components/common-box.vue'
import benefitChange from './components/benefit-change.vue'
import baseCheck from './components/base-check.vue'
import redeemStatus from './components/redeem-status.vue'
</script>

<style scoped lang="scss">
.sb-fund-right-wrapper {
  width: 100%;
  height: 100%;
  .content-screen {
    width: 100%;
    height: 100%;
  }
}
</style>