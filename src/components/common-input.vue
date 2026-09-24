<template>
  <div class="common-input">
    <input
      class="input-inner"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      @input="handleInput"
      @keyup.enter="handleSearch"
    />
    <div class="suffix-icon" @click="handleSearch">
      <i class="search-icon"></i>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onBeforeUnmount } from 'vue'

defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入'
  }
})

const emit = defineEmits(['update:modelValue', 'search', 'change'])

let timer = null

const handleInput = (e) => {
  const value = e.target.value
  emit('update:modelValue', value) // v-model 实时更新，保证显示一致

  // 防抖处理 change 事件
  if (timer) window.clearTimeout(timer)
  timer = setTimeout(() => {
    emit('change', value)
  }, 500)
}

const handleSearch = () => {
  if (timer) window.clearTimeout(timer)
  emit('search')
}

onBeforeUnmount(() => {
  if (timer) window.clearTimeout(timer)
})
</script>

<style lang="scss" scoped>
.common-input {
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 120px;
  height: 32px;

  // 复用 Select 的背景和边框样式
  background:
    linear-gradient(180deg, rgba(45, 128, 255, 0) 0%, rgba(45, 128, 255, 0.1) 70%, rgba(45, 128, 255, 0.4) 100%),
    radial-gradient(60% 60% at 0% 100%, rgba(45, 128, 255, 0.3) 0%, transparent 100%);

  border: 1px solid transparent;
  border-image: linear-gradient(180deg, rgba(100, 148, 210, 0), rgba(100, 148, 210, 0.48), rgba(100, 148, 210, 0.8)) 1 1;

  box-sizing: border-box;
  display: flex;
  align-items: center;

  .input-inner {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    outline: none;
    padding: 0 30px 0 10px; // 右侧留出图标位置
    font-family: Alibaba-PuHuiTi-2;
    font-size: 14px;
    color: #f0f8fe;

    &::placeholder {
      color: rgba(240, 248, 254, 0.6); // #f0f8fe with opacity
    }
  }

  .suffix-icon {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    opacity: 0.8;
    transition: opacity 0.3s;

    &:hover {
      opacity: 1;
    }

    // CSS 绘制搜索图标
    .search-icon {
      position: relative;
      width: 12px;
      height: 12px;
      border: 2px solid #b9e8ff;
      border-radius: 50%;
      box-sizing: border-box;

      &::after {
        content: '';
        position: absolute;
        width: 2px;
        height: 5px;
        background: #b9e8ff;
        bottom: -4px;
        right: -3px;
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
