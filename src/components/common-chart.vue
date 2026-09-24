<!-- src/components/BaseChart/index.vue -->
<template>
  <div ref="chartRef" class="base-chart" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  // 图表配置（用户传入的 ECharts 配置）
  option: {
    type: Object,
    required: true,
    default: () => ({})
  },
  // 是否自动适配容器大小
  autoResize: {
    type: Boolean,
    default: true
  },
  // 主题
  theme: {
    type: String,
    default: 'light' // 'light' | 'dark'
  }
})

const chartRef = ref(null)
let chartInstance = null

// 统一文字样式配置
const textStyleConfig = {
  // 标题样式
  title: {
    textStyle: {
      fontSize: 16,
      fontWeight: 600,
      color: 'rgba(255, 255, 255, 0.68)',
      fontFamily: 'Alibaba-PuHuiTi-Regular'
    },
    subtextStyle: {
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.68)',
      fontFamily: 'Alibaba-PuHuiTi-Regular'
    }
  },
  // X轴样式
  xAxis: {
    axisLabel: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.68)',
      fontFamily: 'Alibaba-PuHuiTi-Regular'
    },
    nameTextStyle: {
      fontSize: 14,
      fontWeight: 500,
      color: 'rgba(255, 255, 255, 0.68)',
      fontFamily: 'Alibaba-PuHuiTi-Regular'
    }
  },
  // Y轴样式
  yAxis: {
    axisLabel: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.68)',
      fontFamily: 'Alibaba-PuHuiTi-Regular'
    },
    nameTextStyle: {
      fontSize: 14,
      fontWeight: 500,
      color: 'rgba(255, 255, 255, 0.68)',
      fontFamily: 'Alibaba-PuHuiTi-Regular'
    }
  },
  // 图例样式
  legend: {
    textStyle: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.68)',
      fontFamily: 'Alibaba-PuHuiTi-Regular'
    }
  },
  // 提示框样式
  tooltip: {
    textStyle: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.68)',
      fontFamily: 'Alibaba-PuHuiTi-Regular'
    },
    // 提示框内容样式增强
    formatter: null // 可由用户自定义
  },
  // 数据标签样式
  label: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.68)',
    fontFamily: 'Alibaba-PuHuiTi-Regular'
  },
  // 数据视图样式
  dataZoom: {
    textStyle: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.68)',
      fontFamily: 'Alibaba-PuHuiTi-Regular'
    }
  },
  // 视觉映射组件
  visualMap: {
    textStyle: {
      fontSize: 14,
      color: 'rgba(255, 255, 255, 0.68)',
      fontFamily: 'Alibaba-PuHuiTi-Regular'
    }
  }
}

// 深度合并配置函数
const mergeConfig = (userOption) => {
  const defaultConfig = {
    title: {
      ...textStyleConfig.title,
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#E8E8E8',
      borderWidth: 1,
      padding: [12, 16],
      textStyle: textStyleConfig.tooltip.textStyle,
      ...(userOption.tooltip || {})
    },
    legend: {
      ...textStyleConfig.legend,
      top: 10,
      right: 20,
      itemWidth: 16,
      itemHeight: 10,
      ...(userOption.legend || {})
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#E8E8E8'
        }
      },
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: textStyleConfig.xAxis.axisLabel,
      nameTextStyle: textStyleConfig.xAxis.nameTextStyle,
      ...(userOption.xAxis || {})
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: '#F0F0F0',
          type: 'dashed'
        }
      },
      axisLabel: textStyleConfig.yAxis.axisLabel,
      nameTextStyle: textStyleConfig.yAxis.nameTextStyle,
      ...(userOption.yAxis || {})
    },
    // 数据标签默认样式
    series:
      userOption.series?.map((serie) => ({
        label: {
          show: true,
          fontSize: textStyleConfig.label.fontSize,
          color: textStyleConfig.label.color,
          fontFamily: textStyleConfig.label.fontFamily,
          ...(serie.label || {})
        },
        ...serie
      })) || []
  }

  // 深度合并用户配置
  return deepMerge(defaultConfig, userOption)
}

// 深度合并工具函数
const deepMerge = (target, source) => {
  const result = { ...target }

  if (!source) return result

  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key])
    } else {
      result[key] = source[key]
    }
  }

  return result
}

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return

  // 销毁旧实例
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }

  chartInstance = echarts.init(chartRef.value, props.theme)

  // 合并配置并设置
  const finalOption = mergeConfig(props.option)
  chartInstance.setOption(finalOption, true)

  // 自适应
  if (props.autoResize) {
    chartInstance.resize()
  }
}

// 更新图表
const updateChart = () => {
  if (!chartInstance) return

  const finalOption = mergeConfig(props.option)
  chartInstance.setOption(finalOption, true)
}

// 窗口自适应
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

// 暴露实例方法给父组件
defineExpose({
  getInstance: () => chartInstance,
  resize: handleResize,
  updateChart
})

// 生命周期
onMounted(() => {
  nextTick(() => {
    initChart()
    if (props.autoResize) {
      window.addEventListener('resize', handleResize)
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
})

// 监听配置变化
watch(
  () => props.option,
  () => {
    updateChart()
  },
  { deep: true }
)

watch(
  () => props.theme,
  () => {
    initChart()
  }
)
</script>

<style scoped>
.base-chart {
  width: 100%;
  height: 100%;
}
</style>
