<template>
  <div class="common-pagination">
    <!-- 上一页 -->
    <div class="btn-prev" :class="{ disabled: currentPage <= 1 }" @click="handleCurrentChange(currentPage - 1)">
      &lt;
    </div>

    <!-- 页码列表 -->
    <ul class="pager">
      <!-- 第一页 -->
      <li class="number" :class="{ active: currentPage === 1 }" @click="handleCurrentChange(1)">1</li>

      <!-- 左侧省略号 -->
      <li v-if="showPrevMore" class="more btn-quickprev" @click="handleCurrentChange(currentPage - 5)">...</li>

      <!-- 中间页码 -->
      <li
        v-for="pager in pagers"
        :key="pager"
        class="number"
        :class="{ active: currentPage === pager }"
        @click="handleCurrentChange(pager)"
      >
        {{ pager }}
      </li>

      <!-- 右侧省略号 -->
      <li v-if="showNextMore" class="more btn-quicknext" @click="handleCurrentChange(currentPage + 5)">...</li>

      <!-- 最后一页 -->
      <li
        v-if="pageCount > 1"
        class="number"
        :class="{ active: currentPage === pageCount }"
        @click="handleCurrentChange(pageCount)"
      >
        {{ pageCount }}
      </li>
    </ul>

    <!-- 下一页 -->
    <div class="btn-next" :class="{ disabled: currentPage >= pageCount }" @click="handleCurrentChange(currentPage + 1)">
      &gt;
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    default: 0
  },
  pageSize: {
    type: Number,
    default: 10
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pagerCount: {
    type: Number,
    default: 7 // 显示的页码按钮数量，超过显示省略号
  }
})

const emit = defineEmits(['update:currentPage', 'change'])

const pageCount = computed(() => {
  return Math.ceil(props.total / props.pageSize) || 1
})

const showPrevMore = computed(() => {
  if (pageCount.value <= props.pagerCount) return false
  const halfPagerCount = (props.pagerCount - 1) / 2
  return props.currentPage > halfPagerCount + 1
})

const showNextMore = computed(() => {
  if (pageCount.value <= props.pagerCount) return false
  const halfPagerCount = (props.pagerCount - 1) / 2
  return props.currentPage < pageCount.value - halfPagerCount
})

const pagers = computed(() => {
  const pagerCount = props.pagerCount
  const halfPagerCount = (pagerCount - 1) / 2
  const currentPage = props.currentPage
  const pageCountVal = pageCount.value

  let showPrevMoreVal = false
  let showNextMoreVal = false

  if (pageCountVal > pagerCount) {
    if (currentPage > pagerCount - halfPagerCount) {
      showPrevMoreVal = true
    }
    if (currentPage < pageCountVal - halfPagerCount) {
      showNextMoreVal = true
    }
  }

  const array = []
  if (showPrevMoreVal && !showNextMoreVal) {
    const startPage = pageCountVal - (pagerCount - 2)
    for (let i = startPage; i < pageCountVal; i++) {
      array.push(i)
    }
  } else if (!showPrevMoreVal && showNextMoreVal) {
    for (let i = 2; i < pagerCount; i++) {
      array.push(i)
    }
  } else if (showPrevMoreVal && showNextMoreVal) {
    const offset = Math.floor(pagerCount / 2) - 1
    for (let i = currentPage - offset; i <= currentPage + offset; i++) {
      array.push(i)
    }
  } else {
    for (let i = 2; i < pageCountVal; i++) {
      array.push(i)
    }
  }
  return array
})

const handleCurrentChange = (val) => {
  if (val < 1) val = 1
  if (val > pageCount.value) val = pageCount.value
  if (val !== props.currentPage) {
    emit('update:currentPage', val)
    emit('change', val)
  }
}
</script>

<style lang="scss" scoped>
.common-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  gap: 8px;

  .btn-prev,
  .btn-next,
  .number,
  .more {
    min-width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-family: Alibaba-PuHuiTi-2;
    font-size: 14px;
    color: #f0f8fe;
    border-radius: 2px;
    transition: all 0.3s;

    // 默认样式：深色背景 + 底部高光
    background: linear-gradient(180deg, rgba(30, 80, 160, 0) 0%, rgba(30, 80, 160, 0.4) 100%);
    border: 1px solid rgba(60, 200, 255, 0.2);

    &:hover:not(.disabled):not(.active) {
      border-color: rgba(60, 200, 255, 0.6);
      background: linear-gradient(180deg, rgba(30, 80, 160, 0.2) 0%, rgba(30, 80, 160, 0.6) 100%);
      color: #ffffff;
    }

    &.active {
      // 选中样式：亮青色背景
      background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%), #3ce3ff;
      border: 1px solid #00e0ff;
      color: #002040; // 深色文字
      font-weight: bold;
      box-shadow: 0 0 8px rgba(0, 224, 255, 0.4);
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
      &:hover {
        border-color: rgba(60, 200, 255, 0.2);
      }
    }
  }

  .pager {
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;
    list-style: none;
  }
}
</style>
