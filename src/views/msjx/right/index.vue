<template>
  <div class="msjx-right-wrapper">
    <common-box title="服务次数按服务类型分布" height="294px">
      <div class="content-screen">
        <serviceNum />
      </div>
    </common-box>
    <common-box title="权益到账状态分布" height="285px" style="margin-top: 13px">
      <div class="content-screen">
        <arriveStatus />
      </div>
    </common-box>
    <common-box title="政策服务评价星级" height="285px" style="margin-top: 14px">
      <div class="content-screen">
        <policyRating />
      </div>
    </common-box>
  </div>
</template>

<script setup>
import commonBox from '@/components/common-box.vue'
import serviceNum from './components/service-num.vue'
import arriveStatus from './components/arrive-status.vue'
import policyRating from './components/policy-rating.vue'
</script>

<style scoped lang="scss">
.msjx-right-wrapper {
  width: 100%;
  height: 100%;
  .content-screen {
    width: 100%;
    height: 100%;
  }
}
</style>