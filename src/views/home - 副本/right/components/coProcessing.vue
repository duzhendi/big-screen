<!--
 * @Author: wangyu
 * @Date: 2025-12-05 09:31:42
 * @LastEditTime: 2025-12-08 15:46:43
 * @LastEditors: wangyu
 * @Description: 协同处置
 * @FilePath: \tdpy-screen-dev\src\views\home\right\components\coProcessing.vue
-->
<template>
  <div class="coProcessing">
    <FourTitle title="处理时效分析" width="auto" height="24px" />
    <div class="coProcessing-chart-wrap mt8px">
      <div ref="chartRef" class="chart-container"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
// import SecondTitle from '@/components/titles/second-title.vue'
import * as echarts from 'echarts'
import { getSlrhClsxfx } from '@/apis/rightModel.js'
import FourTitle from '@/components/titles/four-title.vue'

const chartRef = ref(null)
let myChart = null

const initChart = (data) => {
  if (!chartRef.value) return
  if (myChart) myChart.dispose()
  myChart = echarts.init(chartRef.value)

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(9, 54, 100, 0.9)',
      borderColor: 'rgba(60, 227, 255, 0.5)',
      textStyle: {
        color: '#fff',
        fontFamily: 'Alibaba-PuHuiTi-2',
        fontSize: 12
      }
    },
    grid: {
      top: '15%',
      left: '3%',
      right: '4%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map((item) => item.name),
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.2)'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#B9E8FF',
        fontFamily: 'Alibaba-PuHuiTi-2',
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      name: '需求个数',
      nameTextStyle: {
        color: '#B9E8FF',
        fontFamily: 'Alibaba-PuHuiTi-2',
        fontSize: 12,
        padding: [0, 0, 0, 40]
      },
      axisLabel: {
        color: '#B9E8FF',
        fontFamily: 'Alibaba-PuHuiTi-2',
        fontSize: 12
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: [
      {
        name: '需求个数',
        type: 'bar',
        barWidth: '14',
        data: data.map((item) => item.value),
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(45, 128, 255, 0.1)'
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#3CE3FF' },
            { offset: 1, color: '#00A8FC' }
          ])
        }
      }
    ]
  }
  myChart.setOption(option)
}

const getChartData = async () => {
  const res = await getSlrhClsxfx()
  if (res?.data?.code === 100000 && res?.data?.data) {
    const data = res.data.data.map((item) => ({
      name: item.procTm,
      value: Number(item.cnt)
    }))
    initChart(data)
  }
}

onMounted(() => {
  getChartData()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (myChart) myChart.dispose()
  window.removeEventListener('resize', handleResize)
})

const handleResize = () => {
  myChart && myChart.resize()
}
</script>

<style scoped lang="scss">
.coProcessing {
  display: flex;
  flex-direction: column;

  &-chart-wrap {
    height: 220px;

    .chart-container {
      flex: 1;
      width: 100%;
      height: 220px;
    }
  }
}
</style>
