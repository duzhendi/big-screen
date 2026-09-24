<template>
  <div class="remote-service-left-wrapper">
    <common-box title="引导办达成率/转化率" height="294px">
      <div class="content-screen">
        <yindaoRate />
      </div>
    </common-box>
    <common-box title="智能办达成率/转化率" height="266px" style="margin-top: 13px">
      <div class="content-screen">
        <zhinengRate />
      </div>
    </common-box>
    <common-box title="视频办达成率/转化率" height="304px" style="margin-top: 14px">
      <div class="content-screen">
        <shipinRate />
      </div>
    </common-box>
  </div>
</template>

<script setup>
import commonBox from '@/components/common-box.vue'
import yindaoRate from './components/yindao-rate.vue'
import zhinengRate from './components/zhineng-rate.vue'
import shipinRate from './components/shipin-rate.vue'
</script>

<style scoped lang="scss">
.remote-service-left-wrapper {
  width: 100%;
  height: 100%;
  .content-screen {
    width: 100%;
    height: 100%;
  }
}
</style>
