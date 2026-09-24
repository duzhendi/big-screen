<template>
  <div class="layout-jg-dialog">
    <div class="jg-img"></div>
    <!-- <div class="btn-close" @click="emits('close')">返回 <img :src="backIcon" width="16" alt=""></div> -->
  </div>
</template>

<script setup>
const emits = defineEmits(['close'])
// import backIcon from '@/assets/images/btn_返回按钮图例.png'

</script>

<style lang="scss" scoped>
.layout-jg-dialog {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 200000;
  background: rgba(18,25,33, 0.96);
  padding: 42px 160px;
  box-sizing: border-box;
  background: url('@/assets/images/jgbg2.png') no-repeat center center;
  background-size: 100% 100%;
  .jg-img {
    width: 100%;
    height: 100%;
    background: url('@/assets/images/img_结构图2.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .btn-close {
    position: absolute;
    width: 74px;
    height: 32px;
    background: url('@/assets/images/btn_返回按钮_默认态.png') no-repeat center center;
    background-size: 100% 100%;
    right: 24px;
    top: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #FFFFFF;
    font-family: Alibaba-PuHuiTi-Medium;
    text-shadow: 0px 1px 0px #052345;
    > img {
      margin-left: 4px;
    }
  }
}
</style>
  