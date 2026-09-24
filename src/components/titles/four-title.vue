<template>
  <div class="four-title" :style="{ width: width, height: height }">
    <div class="icon"></div>
    <div class="title">{{ title }}</div>
    <div class="bottom-icon"></div>
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
  }
})
const title = ref(props.title)
</script>
<style lang="scss" scoped>
.four-title {
  position: relative;
  .icon {
    width: 6px;
    height: 7px;
    background: linear-gradient(176deg, #3ce3ff 0%, #62aefa 100%);
    border-radius: 1px 1px 1px 1px;
    position: absolute;
    bottom: 5px;
    left: 10px;
    z-index: 1;
  }
  .title {
    font-family: Alibaba-PuHuiTi-2;
    font-weight: normal;
    font-size: 14px;
    color: #ffffff;
    margin-left: 24px;
  }
  .bottom-icon {
    width: 100%;
    height: 10px;
    background: url('@/assets/images/img_三级标题样式2-长.png') no-repeat center center;
    background-size: cover;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
}
</style>
