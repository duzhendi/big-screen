<template>
  <div class="custom-year-range">
    <!-- 自定义 tab -->
    <CommonButton
      label="自定义"
      :active="active"
      :height="height"
      :style="{ width: '80px' }"
      @click="handleTabClick"
    />

    <!-- 年份区间选择触发器 -->
    <div class="range-trigger" :class="{ active }" :style="{ width, height }" @click="togglePanel">
      <span class="text" :class="{ placeholder: !displayText }">
        {{ displayText || placeholder }}
      </span>
      <i class="calendar-icon"></i>
    </div>

    <!-- 年份区间面板 -->
    <transition name="zoom-in-top">
      <div class="range-panel" v-show="panelVisible" :style="{ left: '86px' }">
        <div class="panel-header">
          <span class="panel-title">开始年份</span>
          <span class="panel-title">结束年份</span>
        </div>
        <div class="panel-body">
          <div class="year-column">
            <div
              v-for="year in yearList"
              :key="`s-${year}`"
              class="year-item"
              :class="{ active: tempStart === year }"
              @click="handlePickStart(year)"
            >
              {{ year }}
            </div>
          </div>
          <div class="year-column">
            <div
              v-for="year in yearList"
              :key="`e-${year}`"
              class="year-item"
              :class="{ active: tempEnd === year, disabled: tempStart && year < tempStart }"
              @click="handlePickEnd(year)"
            >
              {{ year }}
            </div>
          </div>
        </div>
        <div class="panel-footer">
          <span class="btn-clear" @click="handleClear">清空</span>
          <span class="btn-confirm" :class="{ disabled: !canConfirm }" @click="handleConfirm">确定</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import CommonButton from '@/components/common-button.vue'

const props = defineProps({
  // 选中区间，格式：'2016-2026'
  modelValue: {
    type: String,
    default: ''
  },
  // 是否为当前选中的筛选方式
  active: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: '请选择开始年份-结束年份'
  },
  // 年份可选范围
  minYear: {
    type: Number,
    default: 2016
  },
  maxYear: {
    type: Number,
    default: 2026
  },
  width: {
    type: String,
    default: '240px'
  },
  height: {
    type: String,
    default: '26px'
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'select'])

const rootRef = ref(null)
const panelVisible = ref(false)
const tempStart = ref('')
const tempEnd = ref('')

// 年份列表（倒序，近期年份在上方，符合大屏使用习惯）
const yearList = computed(() => {
  const list = []
  for (let y = props.maxYear; y >= props.minYear; y--) list.push(y)
  return list
})

// 已选区间回显
const displayText = computed(() => {
  if (!props.modelValue) return ''
  const [start, end] = props.modelValue.split('-')
  return `${start}年-${end}年`
})

const canConfirm = computed(() => Boolean(tempStart.value && tempEnd.value))

// 点击「自定义」tab：切换到自定义筛选
const handleTabClick = () => {
  emit('select')
  panelVisible.value = true
  syncTempFromModel()
}

const togglePanel = () => {
  panelVisible.value = !panelVisible.value
  if (panelVisible.value) {
    if (!props.active) emit('select')
    syncTempFromModel()
  }
}

// 面板打开时把已选值同步到临时态
const syncTempFromModel = () => {
  const [start, end] = (props.modelValue || '').split('-')
  tempStart.value = start ? Number(start) : ''
  tempEnd.value = end ? Number(end) : ''
}

const handlePickStart = (year) => {
  tempStart.value = year
  // 开始年份晚于已选结束年份时，结束年份自动跟随
  if (tempEnd.value && tempEnd.value < year) tempEnd.value = year
}

const handlePickEnd = (year) => {
  if (tempStart.value && year < tempStart.value) return
  tempEnd.value = year
}

const handleClear = () => {
  tempStart.value = ''
  tempEnd.value = ''
}

const handleConfirm = () => {
  if (!canConfirm.value) return
  const value = `${tempStart.value}-${tempEnd.value}`
  emit('update:modelValue', value)
  emit('change', value)
  panelVisible.value = false
}

// 点击外部关闭面板
const handleClickOutside = (e) => {
  if (rootRef.value && !rootRef.value.contains(e.target)) {
    panelVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
.custom-year-range {
  position: relative;
  display: flex;
  align-items: center;

  .range-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.3s;

    background:
      linear-gradient(180deg, rgba(45, 128, 255, 0) 0%, rgba(45, 128, 255, 0.1) 70%, rgba(45, 128, 255, 0.4) 100%),
      radial-gradient(60% 60% at 0% 100%, rgba(45, 128, 255, 0.3) 0%, transparent 100%);

    // border-image 会让 border-radius 失效，这里为还原设计图优先使用 border-image
    border: 1px solid transparent;
    border-image: linear-gradient(180deg, rgba(100, 148, 210, 0), rgba(100, 148, 210, 0.48), rgba(100, 148, 210, 0.8)) 1 1;

    .text {
      flex: 1;
      font-family: Alibaba-PuHuiTi-2;
      font-size: 13px;
      color: #ffffff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &.placeholder {
        color: #cdeaff;
      }
    }

    .calendar-icon {
      position: relative;
      flex-shrink: 0;
      width: 13px;
      height: 12px;
      margin-left: 8px;
      border: 1px solid #b9e8ff;
      border-radius: 1px;
      box-sizing: border-box;
      opacity: 0.85;

      // 日历顶部横条
      &::before {
        content: '';
        position: absolute;
        top: 2px;
        left: 0;
        right: 0;
        height: 1px;
        background: #b9e8ff;
      }

      // 日历挂钩
      &::after {
        content: '';
        position: absolute;
        top: -3px;
        left: 3px;
        width: 1px;
        height: 3px;
        background: #b9e8ff;
        box-shadow: 5px 0 0 #b9e8ff;
      }
    }

    &:hover {
      border-image: linear-gradient(180deg, rgba(100, 148, 210, 0.2), rgba(100, 148, 210, 0.7), #3ce3ff) 1 1;

      .calendar-icon {
        opacity: 1;
      }
    }

    &.active {
      border-image: linear-gradient(180deg, rgba(60, 227, 255, 0.3), rgba(60, 227, 255, 0.7), #3ce3ff) 1 1;
      box-shadow: 0 0 8px rgba(60, 227, 255, 0.25);
    }
  }

  .range-panel {
    position: absolute;
    top: calc(100% + 6px);
    z-index: 200;
    width: 229px;
    padding: 8px 0 0;
    box-sizing: border-box;
    background: rgba(4, 18, 35, 0.96);
    border: 1px solid rgba(45, 128, 255, 0.35);
    border-radius: 2px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);

    .panel-header {
      display: flex;
      padding: 0 0 6px;

      .panel-title {
        flex: 1;
        text-align: center;
        font-family: Alibaba-PuHuiTi-2;
        font-size: 12px;
        color: #3ce3ff;
      }
    }

    .panel-body {
      display: flex;
      max-height: 180px;
      overflow-y: auto;
      border-top: 1px solid rgba(45, 128, 255, 0.2);

      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(45, 128, 255, 0.3);
        border-radius: 2px;
      }

      .year-column {
        flex: 1;
        padding: 4px 0;

        & + .year-column {
          border-left: 1px solid rgba(45, 128, 255, 0.2);
        }
      }

      .year-item {
        height: 26px;
        line-height: 26px;
        text-align: center;
        font-family: Alibaba-PuHuiTi-2;
        font-size: 13px;
        color: #b9e8ff;
        cursor: pointer;
        transition: all 0.2s;

        &:hover:not(.disabled) {
          background: rgba(45, 128, 255, 0.2);
          color: #ffffff;
        }

        &.active {
          color: #00d3f6;
          background: rgba(45, 128, 255, 0.25);
          font-weight: bold;
        }

        &.disabled {
          color: rgba(185, 232, 255, 0.25);
          cursor: not-allowed;
        }
      }
    }

    .panel-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 12px;
      padding: 6px 10px;
      border-top: 1px solid rgba(45, 128, 255, 0.2);

      .btn-clear,
      .btn-confirm {
        font-family: Alibaba-PuHuiTi-2;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.2s;
      }

      .btn-clear {
        color: rgba(185, 232, 255, 0.7);

        &:hover {
          color: #ffffff;
        }
      }

      .btn-confirm {
        padding: 2px 10px;
        color: #3ce3ff;
        border: 1px solid rgba(60, 227, 255, 0.4);

        &:hover:not(.disabled) {
          border-color: #3ce3ff;
          box-shadow: 0 0 8px rgba(60, 227, 255, 0.3);
        }

        &.disabled {
          color: rgba(185, 232, 255, 0.3);
          border-color: rgba(60, 227, 255, 0.15);
          cursor: not-allowed;
        }
      }
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
