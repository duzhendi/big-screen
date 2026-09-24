<template>
  <div class="triangle-pagination">
    <!-- Left Arrow Button -->
    <button
      type="button"
      class="triangle-btn left"
      :class="{ disabled: !canPrev }"
      :disabled="!canPrev"
      :aria-label="ariaLabelPrev"
      @click="prevPage"
      @keydown="onPrevKeydown"
    >
      <div class="triangle left-triangle"></div>
    </button>
    <!-- Right Arrow Button -->
    <button
      type="button"
      class="triangle-btn right"
      :class="{ disabled: !canNext }"
      :disabled="!canNext"
      :aria-label="ariaLabelNext"
      @click="nextPage"
      @keydown="onNextKeydown"
    >
      <div class="triangle right-triangle"></div>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  // 兼容现有“仅 1/2 页”的场景：默认最大页数仍为 2
  minPage: {
    type: Number,
    default: 1
  },
  maxPage: {
    type: Number,
    default: 2
  },
  step: {
    type: Number,
    default: 1
  },
  ariaLabelPrev: {
    type: String,
    default: '上一页'
  },
  ariaLabelNext: {
    type: String,
    default: '下一页'
  }
})

// 兼容旧事件：update / change；同时支持 Vue 标准 v-model 写法 update:currentPage
const emit = defineEmits(['update', 'change', 'update:currentPage'])

const page = computed(() => {
  const p = Number(props.currentPage)
  return Number.isFinite(p) ? p : props.minPage
})

const canPrev = computed(() => page.value - props.step >= props.minPage)
const canNext = computed(() => page.value + props.step <= props.maxPage)

const emitPage = (next) => {
  const min = Number.isFinite(Number(props.minPage)) ? props.minPage : 1
  const max = Number.isFinite(Number(props.maxPage)) ? props.maxPage : min
  const clamped = Math.min(max, Math.max(min, next))

  if (clamped === page.value) return
  emit('update', clamped)
  emit('update:currentPage', clamped)
  emit('change', clamped)
}

const prevPage = () => {
  if (!canPrev.value) return
  emitPage(page.value - props.step)
}

const nextPage = () => {
  if (!canNext.value) return
  emitPage(page.value + props.step)
}

const onPrevKeydown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    prevPage()
  }
}

const onNextKeydown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    nextPage()
  }
}
</script>

<style scoped lang="scss">
.triangle-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}

.triangle-btn {
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  background: transparent;
  border: none;
  padding: 0;

  &:hover:not(.disabled) {
    transform: scale(1.1);
  }

  &:active:not(.disabled) {
    transform: scale(0.95);
  }

  &.disabled,
  &:disabled {
    opacity: 0.4;
    // cursor: not-allowed;
  }
}

.triangle {
  width: 0;
  height: 0;
}

.left-triangle {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 10px solid #3ce3ff;
}

.right-triangle {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 10px solid #3ce3ff;
}

.disabled,
.triangle-btn:disabled {
  .left-triangle {
    border-right: 10px solid #b9e8ff;
  }

  .right-triangle {
    border-left: 10px solid #b9e8ff;
  }
}

.right {
  margin-left: -14px;
}
</style>
