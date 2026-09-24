<template>
  <div class="common-button" :class="{ active: active }" @click="handleClick" :style="{ height: height }">
    <span class="label">{{ label }}</span>
    <slot></slot>
  </div>
</template>

<script setup>
defineOptions({
  name: 'CommonButton'
})

defineProps({
  // 按钮文本
  label: {
    type: String,
    default: ''
  },
  // 是否选中
  active: {
    type: Boolean,
    default: false
  },
  height: {
    type: String,
    default: '40px'
  }
})

const emit = defineEmits(['click'])

const handleClick = (e) => {
  emit('click', e)
}
</script>

<style lang="scss" scoped>
.common-button {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  // 默认尺寸，父组件可通过 style 覆盖（用 width 而非 min-width，否则父级的 width 会被 min-width 顶掉）
  padding: 3px 10px;
  box-sizing: border-box;

  font-family: Alibaba-PuHuiTi-Regular;
  font-weight: normal;
  font-size: 14px;
  color: #cdeaff; // 默认文字颜色

  // 说明：原设计稿的三张切图（通用组件_tab_默认态/鼠标悬浮态/选中态.png）在仓库中不存在，
  // 这里改用纯 CSS 实现，视觉风格与 layout/index.vue 的按钮保持一致。
  // 若后续拿到设计切图，把下面三段 background / border 换回 background-image 即可。
  background: linear-gradient(180deg, rgba(0, 110, 200, 0.35) 0%, rgba(0, 60, 130, 0.15) 100%);
  border: 1px solid rgba(60, 227, 255, 0.35);
  border-radius: 2px;
  transition: all 0.3s;

  &:hover {
    color: #ffffff;
    background: linear-gradient(180deg, rgba(0, 140, 230, 0.5) 0%, rgba(0, 80, 160, 0.25) 100%);
    border-color: rgba(60, 227, 255, 0.7);
    box-shadow: 0 0 10px rgba(60, 227, 255, 0.35);
  }

  &.active { 
    color: #3ce3ff;
    background: linear-gradient(180deg, rgba(0, 140, 230, 0.5) 0%, rgba(0, 80, 160, 0.25) 100%);
    border-color: rgba(60, 227, 255, 0.7);
    box-shadow: 0 0 10px rgba(60, 227, 255, 0.35);
  }
}
</style>
