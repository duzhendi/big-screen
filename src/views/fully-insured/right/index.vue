<template>
  <div class="fully-insured-right-wrapper">
    <common-box title="工伤保险特定人员类型分布" height="294px">
      <div class="content-screen"><ChxType /></div>
    </common-box>
    <common-box title="长护险参保类型分布" height="266px" style="margin-top: 13px">
      <div class="content-screen"><serviceNum /></div>
    </common-box>
    <common-box title="社保关系转移情况" height="304px" style="margin-top: 14px">
      <div class="content-screen">
        <sbgxzyCard />
      </div>
    </common-box>
  </div>
</template>

<script setup>
import commonBox from '@/components/common-box.vue'
import ChxType from './components/chx-type.vue'
import sbgxzyCard from './components/sbgxzy-card.vue'
import serviceNum from './components/service-num.vue'
</script>

<style scoped lang="scss">
.fully-insured-right-wrapper {
  width: 100%;
  height: 100%;
  .content-screen {
    width: 100%;
    height: 100%;
  }
}
</style>
