import { computed, nextTick, onBeforeUnmount, ref } from 'vue'

export const useAutoScrollList = (list, options = {}) => {
  const visibleCount = options.visibleCount || 3
  const rowHeight = options.rowHeight || 32
  const step = options.step || 1
  const intervalMs = options.intervalMs || 3000
  const animMs = options.animMs || 500

  const scrollStep = ref(0)
  const transitionEnabled = ref(true)
  let scrollTimer = null

  const listStyle = computed(() => ({
    transform: `translateY(-${scrollStep.value * rowHeight}px)`,
    transition: transitionEnabled.value ? `transform ${animMs}ms linear` : 'none'
  }))

  const stopAutoScroll = () => {
    if (scrollTimer) {
      clearInterval(scrollTimer)
      scrollTimer = null
    }
  }

  const tickAutoScroll = () => {
    const len = list.value?.length || 0
    if (len <= visibleCount) return

    const maxStep = Math.max(len - visibleCount, 0)
    if (scrollStep.value < maxStep) {
      transitionEnabled.value = true
      scrollStep.value = Math.min(scrollStep.value + step, maxStep)
      return
    }

    transitionEnabled.value = false
    scrollStep.value = 0
    nextTick(() => {
      setTimeout(() => {
        transitionEnabled.value = true
      }, 0)
    })
  }

  const startAutoScroll = () => {
    stopAutoScroll()
    if ((list.value?.length || 0) <= visibleCount) return
    scrollTimer = setInterval(tickAutoScroll, intervalMs)
  }

  const resetAutoScroll = () => {
    stopAutoScroll()
    transitionEnabled.value = false
    scrollStep.value = 0
    nextTick(() => {
      transitionEnabled.value = true
      startAutoScroll()
    })
  }

  onBeforeUnmount(stopAutoScroll)

  return {
    listStyle,
    startAutoScroll,
    stopAutoScroll,
    resetAutoScroll
  }
}
