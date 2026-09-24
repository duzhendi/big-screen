<!--
 * @Author: wangyu
 * @Date: 2025-12-04 22:40:57
 * @LastEditTime: 2025-12-05 18:36:51
 * @LastEditors: wangyu
 * @Description: 
 * @FilePath: \tdpy-screen-dev\src\components\titles\second-title.vue
-->
<template>
  <div class="second-title" :style="{ width: width, height: height }">
    <div class="start-icon"></div>
    <div class="title">
      {{ title }}
      <slot></slot>
    </div>
    <div class="update-time" v-if="updatetime">
      <div class="icon"></div>
      <div class="text">更新于 {{ updatetime }}</div>
    </div>
    <div class="end-icon">
      <div class="icon"></div>
      <div class="icon" style="margin-left: 5px"></div>
    </div>
  </div>
</template>
<script setup>
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
  },
  updatetime: {
    type: String,
    default: ''
  }
})
</script>
<style lang="scss" scoped>
.second-title {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #37c0ff;
  position: relative;

  .start-icon {
    width: 8px;
    height: 7px;
    background: url('@/assets/images/img_second_title_icon.png') no-repeat center center;
    background-size: cover;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .title {
    position: relative;
    font-family: Alibaba-PuHuiTi-2;
    font-weight: normal;
    font-size: 16px;
    color: #3ce3ff;
    line-height: 16px;
    margin-left: 16px;
    position: absolute;
    // left: 24px;
    top: 10%;
    display: flex;
    justify-content: space-between;
    width: calc(100% - 40px);
  }
  .update-time {
    position: absolute;
    right: 37px;
    top: 50%;
    transform: translateY(-50%);
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: right;
    .icon {
      width: 12px;
      height: 12px;
      background-image: url('@/assets/images/update_time_icon.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
      margin-right: 8px;
    }
    .text {
      font-family: Alibaba-PuHuiTi-2;
      font-weight: normal;
      font-size: 12px;
      color: #b9e8ff;
      line-height: 12px;
      text-align: right;
      font-style: normal;
      text-transform: none;
    }
  }
  .end-icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;

    .icon {
      width: 5px;
      height: 5px;
      background: #37c0ff;
    }
  }
}
</style>
