<template>
  <div class="common-select" ref="selectRef" :style="{ width, height }">
    <!-- 触发框 -->
    <div
      class="select-trigger"
      @click="toggle"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
      :style="{ height }"
    >
      <span class="text" :class="{ placeholder: !selectedLabel }">
        {{ selectedLabel || placeholder }}
      </span>
      <i class="clear-icon" v-if="showClear" @click.stop="handleClear">×</i>
      <i class="arrow-icon" v-else :class="{ active: visible }"></i>
    </div>

    <!-- 下拉菜单 -->
    <transition name="zoom-in-top">
      <div class="select-dropdown" v-show="visible">
        <div class="dropdown-scroll">
          <div
            v-for="(item, index) in options"
            :key="item.value || index"
            class="option-item"
            :class="{ active: modelValue === item.value }"
            @click="handleSelect(item)"
            :title="item.label"
          >
            {{ item.label }}
          </div>
          <div v-if="options.length === 0" class="empty-text">暂无数据</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  clearable: {
    type: Boolean,
    default: true
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '32px'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const visible = ref(false)
const selectRef = ref(null)
const isHover = ref(false)

const selectedLabel = computed(() => {
  const target = props.options.find((item) => item.value === props.modelValue)
  return target ? target.label : ''
})

const showClear = computed(() => {
  return props.clearable && (props.modelValue || props.modelValue === 0) && isHover.value
})

const toggle = () => {
  visible.value = !visible.value
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('change', '')
}

const close = (e) => {
  if (selectRef.value && !selectRef.value.contains(e.target)) {
    visible.value = false
  }
}

const handleSelect = (item) => {
  if (props.modelValue !== item.value) {
    emit('update:modelValue', item.value)
    emit('change', item.value)
  }
  visible.value = false
}

onMounted(() => {
  document.addEventListener('click', close)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', close)
})
</script>

<style lang="scss" scoped>
.common-select {
  position: relative;
  display: inline-block;
  // width: 100%;
  // min-width: 120px;
  user-select: none;
  box-sizing: border-box;
  .select-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.3s;

    // 应用传入的自定义背景样式
    background:
      linear-gradient(180deg, rgba(45, 128, 255, 0) 0%, rgba(45, 128, 255, 0.1) 70%, rgba(45, 128, 255, 0.4) 100%),
      radial-gradient(60% 60% at 0% 100%, rgba(45, 128, 255, 0.3) 0%, transparent 100%);

    // 边框渐变
    border: 1px solid transparent;
    // border-image 会导致 border-radius 失效，这里为了样式还原优先使用 border-image
    border-image: linear-gradient(180deg, rgba(100, 148, 210, 0), rgba(100, 148, 210, 0.48), rgba(100, 148, 210, 0.8)) 1
      1;

    .text {
      font-family: Alibaba-PuHuiTi-2;
      font-size: 14px;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;

      &.placeholder {
        color: #fff;
      }
    }

    .arrow-icon {
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 6px solid #b9e8ff;
      margin-left: 8px;
      transition: transform 0.3s;
      opacity: 0.8;

      &.active {
        transform: rotate(180deg);
      }
    }

    .clear-icon {
      font-style: normal;
      color: #fff;
      margin-left: 8px;
      font-size: 16px;
      line-height: 1;
      opacity: 0.8;

      &:hover {
        opacity: 1;
        color: #ffffff;
      }
    }

    &:hover {
      opacity: 0.9;
      .arrow-icon {
        opacity: 1;
      }
    }
  }

  .select-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin-top: 4px;
    background: rgba(4, 18, 35, 0.95);
    border: 1px solid rgba(45, 128, 255, 0.3);
    border-radius: 2px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    z-index: 100;
    padding: 4px 0;

    .dropdown-scroll {
      max-height: 200px;
      overflow-y: auto;

      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(45, 128, 255, 0.3);
        border-radius: 2px;
      }
    }

    .option-item {
      font-family: Alibaba-PuHuiTi-2;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      font-size: 14px;
      color: #b9e8ff;
      cursor: pointer;
      transition: all 0.2s;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background: rgba(45, 128, 255, 0.2);
        color: #ffffff;
      }

      &.active {
        color: #00d3f6;
        background: rgba(45, 128, 255, 0.15);
        font-weight: bold;
      }
    }

    .empty-text {
      padding: 10px;
      text-align: center;
      color: #999;
      font-size: 12px;
    }
  }
}

// 过渡动画
.zoom-in-top-enter-active,
.zoom-in-top-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
  transform-origin: center top;
}
.zoom-in-top-enter-from,
.zoom-in-top-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style>
