<template>
  <div class="home-right-wrapper">
    <common-box title="符合免申政策资质TOP5区域" height="262px">
      <div class="content-screen"><mszcTop5 /></div>
    </common-box>
    <common-box title="综合业务办理量TOP10区域" height="300px" style="margin-top: 13px">
      <div class="content-screen"><commonChart :option="ZHYWBLLTOP10_OPTION()" /></div>
    </common-box>
    <common-box title="综合业务总量趋势" height="304px" style="margin-top: 14px">
      <div class="content-screen"><commonChart :option="ZHYEZLQS_OPTION()" /></div>
    </common-box>
  </div>
</template>

<script setup>
import commonBox from '@/components/common-box.vue'
import mszcTop5 from './components/mszc-top5.vue'
import commonChart from '@/components/common-chart.vue'

import { ZHYWBLLTOP10_OPTION, ZHYEZLQS_OPTION } from '@/views/home/options.js'
</script>

<style scoped lang="scss">
.home-right-wrapper {
  width: 100%;
  height: 100%;
  .content-screen {
    width: 100%;
    height: 100%;
  }
}
</style>
