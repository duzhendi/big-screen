<template>
  <div class="third-title" :style="{ width: width, height: height }" :class="{ canClick: canClick }">
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
  },
  canClick: {
    type: Boolean,
    default: false
  }
})
const title = ref(props.title)
</script>
<style lang="scss" scoped>
.canClick {
  cursor: pointer;
  &:hover {
    .title {
      color: #fbc40b;
      transition: all 0.3s;
    }
    .bottom-icon {
      background: linear-gradient(90deg, rgba(251, 196, 11, 0.64) 1%, rgba(251, 196, 11, 0) 100%);
      border-radius: 2px 2px 2px 2px;
      transition: all 0.3s;
    }
  }
}
.third-title {
  position: relative;

  .title {
    font-family: Alibaba-PuHuiTi-2;
    font-weight: normal;
    font-size: 14px;
    color: #ffffff;
    position: absolute;
    left: 12px;
    top: -2px;
    z-index: 1;
  }
  .bottom-icon {
    width: 100%;
    height: 10px;
    background: url('@/assets/images/img_third_title_icon.png') no-repeat center center;
    background-size: cover;
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>
