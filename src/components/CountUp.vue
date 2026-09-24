<template>
  <span class="count-up" :style="style">{{ displayValue }}</span>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  // 目标值
  value: {
    type: [Number, String],
    default: 0
  },
  // 动画持续时间（毫秒）
  duration: {
    type: Number,
    default: 2000
  },
  // 小数位数（默认自动检测）
  decimals: {
    type: Number,
    default: -1
  },
  // 是否使用千位分隔符
  separator: {
    type: Boolean,
    default: true
  },
  // 前缀
  prefix: {
    type: String,
    default: ''
  },
  // 后缀
  suffix: {
    type: String,
    default: ''
  },
  // 延迟开始（毫秒）
  delay: {
    type: Number,
    default: 0
  },
  // 样式
  style: {
    type: Object,
    default: () => ({})
  }
})

const displayValue = ref(props.prefix + '0' + props.suffix)
let animationId = null

// 格式化数字
const formatNumber = (num, decimalPlaces, useSeparator) => {
  let result
  if (decimalPlaces >= 0) {
    result = num.toFixed(decimalPlaces)
  } else {
    result = String(Math.floor(num))
  }

  if (useSeparator && decimalPlaces <= 0) {
    result = Number(result).toLocaleString()
  }

  return props.prefix + result + props.suffix
}

// 执行动画
const animate = (endValue) => {
  // 取消之前的动画
  if (animationId) {
    window.cancelAnimationFrame(animationId)
  }

  const numericValue = Number(endValue) || 0
  const startValue = 0
  const startTime = performance.now()
  const duration = props.duration

  // 自动检测小数位数
  let decimalPlaces = props.decimals
  if (decimalPlaces < 0) {
    const strValue = String(endValue)
    if (strValue.includes('.')) {
      decimalPlaces = strValue.split('.')[1]?.length || 0
    } else {
      decimalPlaces = 0
    }
  }

  const step = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // easeOutExpo 缓动函数
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    const currentValue = startValue + (numericValue - startValue) * easeProgress

    displayValue.value = formatNumber(currentValue, decimalPlaces, props.separator)

    if (progress < 1) {
      animationId = window.requestAnimationFrame(step)
    } else {
      // 确保最终值精确
      displayValue.value = formatNumber(numericValue, decimalPlaces, props.separator)
    }
  }

  animationId = window.requestAnimationFrame(step)
}

// 监听值变化
watch(
  () => props.value,
  (newValue) => {
    if (props.delay > 0) {
      setTimeout(() => animate(newValue), props.delay)
    } else {
      animate(newValue)
    }
  }
)

// 组件挂载时执行动画
onMounted(() => {
  if (props.delay > 0) {
    setTimeout(() => animate(props.value), props.delay)
  } else {
    animate(props.value)
  }
})
</script>

<style scoped>
.count-up {
  display: inline-block;
  font-variant-numeric: tabular-nums;
}
</style>
