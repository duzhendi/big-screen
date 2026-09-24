import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

/**
 * @description tab 自动轮播切换（支持暂停/恢复、卸载清理、tab 数量变化自适应）
 *
 * @param {import("vue").Ref<number>} activeIndex - 外部传入的当前激活下标
 * @param {number|Array|import("vue").Ref<number>|import("vue").Ref<Array>|Function} tabsOrCount - tab 数量/数组/Ref/或返回数量的函数
 * @param {{ intervalMs?: number|import("vue").Ref<number>, autostart?: boolean }} options
 */
export const useAutoSwitchTabs = (activeIndex, tabsOrCount, options = {}) => {
  const isPaused = ref(false)
  let timer = null

  const tabCount = computed(() => {
    if (typeof tabsOrCount === 'function') return Number(tabsOrCount()) || 0
    if (typeof tabsOrCount === 'number') return Number(tabsOrCount) || 0

    const value = tabsOrCount?.value ?? tabsOrCount
    if (Array.isArray(value)) return value.length
    return Number(value) || 0
  })

  const intervalMs = computed(() => {
    const value = options?.intervalMs?.value ?? options?.intervalMs
    const n = Number(value)
    return Number.isFinite(n) && n > 0 ? n : 10000
  })

  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  const next = () => {
    const len = tabCount.value
    if (len <= 1) return
    activeIndex.value = (activeIndex.value + 1) % len
  }

  const start = () => {
    stop()
    if (isPaused.value) return
    const len = tabCount.value
    if (len <= 1) return

    timer = setInterval(() => {
      if (isPaused.value) return
      next()
    }, intervalMs.value)
  }

  const pause = () => {
    isPaused.value = true
    stop()
  }

  const resume = () => {
    // 3s后继续轮播
    setTimeout(() => {
      isPaused.value = false
      start()
    }, 3000)
  }

  watch([tabCount, intervalMs], ([len]) => {
    if (!len) return
    if (activeIndex.value >= len) activeIndex.value = 0
    start()
  })

  onMounted(() => {
    const autostart = options?.autostart ?? true
    if (autostart) start()
  })

  onUnmounted(() => {
    stop()
  })

  return {
    isPaused,
    start,
    stop,
    pause,
    resume,
    next
  }
}
