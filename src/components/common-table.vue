<template>
  <div class="common-table-wrapper">
    <!-- 表头 -->
    <div class="table-header">
      <div
        v-for="(col, index) in columns"
        :key="index"
        class="header-cell"
        :style="{ width: col.width, flex: col.width ? 'none' : 1, textAlign: col.align || 'left' }"
      >
        {{ col.label }}
      </div>
    </div>

    <!-- 表格主体 -->
    <div
      ref="tableBodyRef"
      class="table-body"
      v-loading="loading"
      element-loading-background="rgba(0, 0, 0, 0.5)"
      @mouseenter="onBodyMouseEnter"
      @mouseleave="onBodyMouseLeave"
    >
      <template v-if="data && data.length > 0">
        <div v-for="(row, rowIndex) in data" :key="rowIndex" class="table-row">
          <div
            v-for="(col, colIndex) in columns"
            :key="colIndex"
            class="body-cell"
            :style="{ width: col.width, flex: col.width ? 'none' : 1, textAlign: col.align || 'left' }"
          >
            <!-- 序号列特殊处理 -->
            <span v-if="col.type === 'index'" class="index-num">{{ rowIndex + 1 }}</span>

            <!-- 普通列支持插槽 -->
            <slot v-else :name="col.prop" :row="row" :index="rowIndex">
              <span class="cell-text" :title="row[col.prop]">{{ row[col.prop] }}</span>
            </slot>
          </div>
        </div>
      </template>

      <!-- 空状态 -->
      <div v-else-if="!loading" class="empty-state">暂无数据</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  /** 是否开启表体自动滚动（需内容超出可视区域），默认关闭 */
  autoScroll: {
    type: Boolean,
    default: false
  }
})

const tableBodyRef = ref(null)

/** 单行高度 48px + 行间距 8px */
const AUTO_SCROLL_ROW_HEIGHT = 56
const AUTO_SCROLL_DURATION_MS = 2200
const AUTO_SCROLL_INTERVAL_MS = 6000

let scrollTimer = null
let scrollRafId = null

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

const easeOutCubic = (t) => 1 - (1 - t) ** 3

const cancelScrollAnim = () => {
  if (scrollRafId != null && typeof window !== 'undefined') {
    window.cancelAnimationFrame(scrollRafId)
    scrollRafId = null
  }
}

const animateScrollTopTo = (el, targetTop, durationMs) => {
  cancelScrollAnim()
  if (prefersReducedMotion()) {
    el.scrollTop = targetTop
    return
  }
  if (typeof window === 'undefined') {
    el.scrollTop = targetTop
    return
  }
  const from = el.scrollTop
  const delta = targetTop - from
  if (Math.abs(delta) < 0.5) return
  const start = window.performance.now()
  const step = (now) => {
    const t = Math.min(1, (now - start) / durationMs)
    el.scrollTop = from + delta * easeOutCubic(t)
    if (t < 1) {
      scrollRafId = window.requestAnimationFrame(step)
    } else {
      el.scrollTop = targetTop
      scrollRafId = null
    }
  }
  scrollRafId = window.requestAnimationFrame(step)
}

const stopAutoScroll = () => {
  cancelScrollAnim()
  if (scrollTimer) {
    clearInterval(scrollTimer)
    scrollTimer = null
  }
}

const tickAutoScroll = () => {
  if (!props.autoScroll) return
  const el = tableBodyRef.value
  if (!el) return
  const maxScroll = el.scrollHeight - el.clientHeight
  if (maxScroll <= 0) return

  const next = el.scrollTop + AUTO_SCROLL_ROW_HEIGHT
  if (next >= maxScroll - 1) {
    el.scrollTop = 0
  } else {
    animateScrollTopTo(el, next, AUTO_SCROLL_DURATION_MS)
  }
}

const startAutoScroll = () => {
  stopAutoScroll()
  if (!props.autoScroll) return
  nextTick(() => {
    const el = tableBodyRef.value
    if (!el) return
    if (!props.data?.length) return
    if (el.scrollHeight <= el.clientHeight) return
    scrollTimer = setInterval(tickAutoScroll, AUTO_SCROLL_INTERVAL_MS)
  })
}

const resetAndStartAutoScroll = () => {
  stopAutoScroll()
  if (!props.autoScroll) return
  nextTick(() => {
    if (tableBodyRef.value) {
      tableBodyRef.value.scrollTop = 0
    }
    startAutoScroll()
  })
}

const onBodyMouseEnter = () => {
  if (!props.autoScroll) return
  stopAutoScroll()
}

const onBodyMouseLeave = () => {
  if (!props.autoScroll) return
  startAutoScroll()
}

watch(
  () => [props.data, props.loading, props.autoScroll],
  () => {
    if (!props.autoScroll) {
      stopAutoScroll()
      return
    }
    resetAndStartAutoScroll()
  },
  { deep: true, immediate: true }
)

onUnmounted(() => {
  stopAutoScroll()
})
</script>

<style lang="scss" scoped>
.common-table-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .table-header {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    margin-bottom: 10px;

    // 表头样式
    background: linear-gradient(
      360deg,
      rgba(29, 105, 195, 0.46) 0%,
      rgba(25, 101, 196, 0) 50%,
      rgba(25, 101, 196, 0.48) 100%
    );
    border-radius: 2px;
    position: relative;

    // 使用伪元素实现渐变边框效果（避免 border-image 影响圆角，虽然 header 圆角较小）
    border: 1px solid rgba(60, 227, 255, 0.3);
    border-bottom: 1px solid rgba(60, 227, 255, 0.6);

    .header-cell {
      font-family: Alibaba-PuHuiTi-2;
      font-weight: normal;
      font-size: 14px;
      color: #b9e8ff;
      font-weight: normal;
      padding: 0 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .table-body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-right: 5px; // 留出滚动条空间
    scroll-behavior: smooth;

    @media (prefers-reduced-motion: reduce) {
      scroll-behavior: auto;
    }

    // 滚动条样式
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(60, 227, 255, 0.3);
      border-radius: 2px;
    }

    .table-row {
      width: 100%;
      height: 48px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;

      // 列表行样式
      // 背景：斜纹 + 渐变
      background:
        repeating-linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.03) 0px,
          rgba(255, 255, 255, 0.03) 15px,
          transparent 15px,
          transparent 30px
        ),
        linear-gradient(180deg, rgba(45, 128, 255, 0) 0%, rgba(45, 128, 255, 0.15) 50%, rgba(45, 128, 255, 0.25) 100%);

      border-radius: 4px;
      border: 1px solid transparent;
      position: relative;
      transition: all 0.3s;

      // 模拟渐变边框和底部高光
      box-shadow: inset 0 0 10px rgba(45, 128, 255, 0.1);
      border: 1px solid rgba(30, 158, 255, 0.2);
      border-bottom: 1px solid rgba(30, 158, 255, 0.5);

      &:hover {
        background: rgba(45, 128, 255, 0.2);
        border: 1px solid rgba(60, 227, 255, 0.5);
        box-shadow: 0 0 10px rgba(60, 227, 255, 0.2);
      }

      .body-cell {
        font-family: Alibaba-PuHuiTi-2;
        font-weight: normal;
        font-size: 14px;
        color: #ffffff;
        padding: 0 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .index-num {
          font-size: 14px;
          color: #b9e8ff;
          font-weight: bold;
        }
      }
    }

    .empty-state {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #999;
      font-size: 14px;
    }
  }
}
</style>
