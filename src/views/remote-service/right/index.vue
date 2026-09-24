<template>
  <div class="remote-service-right-wrapper">
    <common-box title="服务次数渠道分布" height="294px">
      <div class="content-screen">
        <channelDist />
      </div>
    </common-box>
    <common-box title="服务次数按服务类型分布" height="266px" style="margin-top: 13px">
      <!-- 复用 home 页面「各远程服务类型办件量分布」组件 -->
      <div class="content-screen">
        <img src="@/assets/images/Frame 2036082995.png" alt="" class="service-num-bg" />
        <serviceNum />
      </div>
    </common-box>
    <common-box title="小程序使用次数地域TOP5" height="304px" style="margin-top: 14px">
      <div class="content-screen">
        <xcxTop5 />
      </div>
    </common-box>
  </div>
</template>

<script setup>
import commonBox from '@/components/common-box.vue'
import channelDist from './components/channel-dist.vue'
import xcxTop5 from './components/xcx-top5.vue'
// 直接复用 home 的远程服务类型办件量分布组件
import serviceNum from '@/views/remote-service/right/components/service-num.vue'
</script>

<style scoped lang="scss">
.remote-service-right-wrapper {
  width: 100%;
  height: 100%;
  .content-screen {
    width: 100%;
    height: 100%;
    position: relative;
    .service-num-bg {
      width: 176px;
      height: 74px;
      position: absolute;
      bottom: 20%;
      left: 6%;  
    }
  }
}
</style>
