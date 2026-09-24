<template>
  <div class="first-title" :style="{ width: width, height: height }">
    <div class="title">{{ props.title }}</div>
  </div>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  }
})
</script>
<style lang="scss" scoped>
.first-title {
  background: url('@/assets/images/title.png') no-repeat center center;
  background-size: cover;
  padding-left: 50px;
  box-sizing: border-box;
  .title-area {
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .title {
    font-size: 18px;
    color: #ffffff;
    letter-spacing: 0.6px;
    font-family: Alibaba-PuHuiTi-Medium;
  }

  .intro-tooltip {
    position: absolute;
    left: 12px;
    top: calc(100% - 8px);
    z-index: 9999;

    width: 380px;
    max-width: calc(100vw - 80px);
    min-height: 78px;
    box-sizing: border-box;
    color: #ffffff;
    letter-spacing: 2px;

    padding: 26px 26px 30px 26px;
    // background: url('@/assets/images/img_引进词弹窗.png') no-repeat center center;
    background: url('@/assets/images/img_梯度选种引进词弹窗.png') no-repeat center center;

    background-size: 100% 100%;

    font-family: Alibaba-PuHuiTi-2;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    // color: rgba(185, 232, 255, 0.95);

    opacity: 0;
    visibility: hidden;
    transform: translateY(4px);
    transition:
      opacity 0.15s ease,
      transform 0.15s ease,
      visibility 0.15s ease;
    pointer-events: none;
    white-space: normal;
    word-break: break-all;
  }

  .title-area:hover .intro-tooltip {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}
</style>
