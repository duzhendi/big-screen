<template>
  <div class="comprehensive-business-right-wrapper">
    <common-box title="业务变化类型统计" height="260px">
      <div class="content-screen">
        <bizChange />
      </div>
    </common-box>
    <common-box title="资金流入流出结构" height="292px" style="margin-top: 13px">
      <div class="content-screen">
        <capitalFlow />
      </div>
    </common-box>
    <common-box title="各业务类型办理总量趋势" height="311px" style="margin-top: 14px">
      <div class="content-screen">
        <commonChart :option="ZHYEZLQS_OPTION()" />
      </div>
    </common-box>
  </div>
</template>

<script setup>
import commonBox from '@/components/common-box.vue'
import commonChart from '@/components/common-chart.vue'
import bizChange from './components/biz-change.vue'
import capitalFlow from './components/capital-flow.vue'
import { ZHYEZLQS_OPTION } from '../options.js'
</script>

<style scoped lang="scss">
.comprehensive-business-right-wrapper {
  width: 100%;
  height: 100%;
  .content-screen {
    width: 100%;
    height: 100%;
  }
}
</style>
