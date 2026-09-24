<template>
  <div class="common-box-wrapper" :style="{ height: height, width: width }" :class="{ 'animate-in': isVisible }">
    <firstTitle :title="props.title" width="auto" height="40px" />
    <!-- 标题栏右侧操作区（可选），例如「前10 / 后10」切换 -->
    <div class="common-box-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="common-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import firstTitle from '@/components/titles/first-title'

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

const isVisible = ref(false)

onMounted(() => {
  // 组件挂载后触发入场动画
  setTimeout(() => {
    isVisible.value = true
  }, 50)
})
</script>

<style lang="scss" scoped>
.common-box-wrapper {
  position: relative;
  background: linear-gradient(180deg, #021028 0%, #012446 100%);
  border-image: linear-gradient(180deg, rgba(13, 13, 13, 1), rgba(15, 88, 166, 1)) 0 0;

  // 👇 只添加以下动画相关代码
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);

  &.animate-in {
    opacity: 1;
    transform: translateY(0);
  }

  // 标题栏右侧操作区，覆盖在 40px 标题栏内
  .common-box-header {
    position: absolute;
    top: 0;
    right: 12px;
    height: 40px;
    display: flex;
    align-items: center;
    z-index: 2;
  }

  .common-box-content {
    height: calc(100% - 40px);
  }
}
</style>
