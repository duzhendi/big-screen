<template>
  <div class="oa-left-wrapper">
    <common-box title="年金征缴汇总情况" height="260px">
      <div class="content-screen"><summarys /></div>
    </common-box>
    <common-box title="年金欠缴单位排名TOP5" height="300px" style="margin-top: 13px">
      <div class="content-screen"><owedTop5 /></div>
    </common-box>
    <common-box title="年金逾期催缴情况" height="306px" style="margin-top: 14px">
      <div class="content-screen"><overdue /></div>
    </common-box>
  </div>
</template>

<script setup>
import commonBox from '@/components/common-box.vue'
// import summary from './components/summary.vue'
import summarys from './components/summarys.vue'
import owedTop5 from './components/owed-top5.vue'
import overdue from './components/overdue.vue'
</script>

<style scoped lang="scss">
.oa-left-wrapper {
  width: 100%;
  height: 100%;
  .content-screen {
    width: 100%;
    height: 100%;
  }
}
</style>