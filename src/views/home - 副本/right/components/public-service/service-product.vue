<template>
  <div class="service-product">
    <FourthTitle title="服务产品行业-分布图" width="auto" height="24px" />
    <div class="chart-panel">
      <div class="summary-card">
        <div class="summary-card-container">
          <div class="summary-card__left">
            <img :src="serviceTotalIcon" alt="服务总数" class="summary-card__icon" />
            <span class="summary-card__label">服务总数</span>
          </div>
          <div class="summary-card__value">
            <span class="summary-card__number">{{ serviceTotal.value }}</span>
            <span class="summary-card__unit">{{ serviceTotal.unit }}</span>
          </div>
        </div>
      </div>
      <div ref="chartRef" class="chart-container"></div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import FourthTitle from '@/components/titles/four-title.vue'
import serviceTotalIcon from '@/assets/images/right/icon_服务总数.png'

const serviceTotal = {
  value: '24.63',
  unit: '万次'
}

const chartData = [
  { name: '投融资', count: 2.8, rate: 12 },
  { name: '信息', count: 1.7, rate: 7 },
  { name: '管理咨询', count: 6.4, rate: 26 },
  { name: '法律', count: 0.4, rate: 1 },
  { name: '创业', count: 1.3, rate: 5 },
  { name: '技术创新和质量', count: 10.3, rate: 42 },
  { name: '市场开拓', count: 0.4, rate: 1 },
  { name: '人才与培训', count: 1.1, rate: 4 },
  { name: '其他', count: 1.0, rate: 4 }
]

const chartRef = ref(null)
let chartInstance = null
const xAxisLabelLength = 4

const formatAxisLabel = (value) => {
  const characters = Array.from(String(value).replace(/\n/g, ''))
  const lines = []
  for (let index = 0; index < characters.length; index += xAxisLabelLength) {
    lines.push(characters.slice(index, index + xAxisLabelLength).join(''))
  }
  return lines.join('\n')
}

const buildOption = () => {
  const categoryList = chartData.map((item) => item.name)
  const countList = chartData.map((item) => item.count)
  const rateList = chartData.map((item) => item.rate)

  return {
    color: ['#16B9FF', '#FEDE73'],
    textStyle: {
      fontFamily: 'Alibaba-PuHuiTi-2'
    },
    grid: {
      left: 0,
      right: 0,
      top: 28,
      bottom: 0,
      containLabel: true
    },
    legend: {
      top: 0,
      left: 'center',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 36,
      textStyle: {
        color: '#E4F6FF',
        fontSize: 12
      },
      data: ['服务类型/次', '服务类型占比']
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(15, 64, 112, 0.22)'
        }
      },
      backgroundColor: 'rgba(14, 66, 120, 0.96)',
      borderColor: 'rgba(90, 174, 255, 0.55)',
      borderWidth: 1,
      padding: [12, 16],
      extraCssText: 'font-family: Alibaba-PuHuiTi-2;',
      textStyle: {
        color: '#D6F6FF',
        fontSize: 12
      },
      formatter(params) {
        if (!Array.isArray(params) || !params.length) return ''
        const bar = params.find((item) => item.seriesName === '服务类型/次')
        const line = params.find((item) => item.seriesName === '服务类型占比')
        const title = params[0]?.axisValueLabel ?? ''
        return [
          `<div style="font-size:14px;color:#EAF8FF;margin-bottom:6px;">${title}</div>`,
          bar ? `<div>服务：<span style="color:#3CE3FF;font-weight:700;">${bar.value}</span>万次</div>` : '',
          line ? `<div>占比：<span style="color:#FEDE73;font-weight:700;">${line.value}</span>%</div>` : ''
        ].join('')
      }
    },
    xAxis: {
      type: 'category',
      data: categoryList,
      boundaryGap: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(201, 233, 248, 0.40)',
          width: 1
        }
      },
      axisTick: { show: false },
      axisLabel: {
        interval: 0,
        formatter: formatAxisLabel,
        color: 'rgba(228, 246, 255, 0.85)',
        fontSize: 12,
        lineHeight: 14,
        margin: 12
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '万家',
        min: 0,
        max: 15,
        interval: 5,
        nameLocation: 'end',
        nameGap: 6,
        nameTextStyle: {
          align: 'left',
          color: 'rgba(228, 246, 255, 0.85)',
          fontSize: 12,
          padding: [0, 0, 0, -10]
        },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: 'rgba(228, 246, 255, 0.75)',
          fontSize: 12
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(201, 233, 248, 0.16)',
            width: 1,
            type: 'dashed'
          }
        }
      },
      {
        type: 'value',
        name: '比率(%)',
        min: 0,
        max: 60,
        interval: 20,
        nameLocation: 'end',
        nameGap: 6,
        nameTextStyle: {
          align: 'right',
          color: 'rgba(228, 246, 255, 0.85)',
          fontSize: 12,
          padding: [0, -6, 0, 0]
        },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: {
          color: 'rgba(228, 246, 255, 0.75)',
          fontSize: 12
        },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '服务类型/次',
        type: 'bar',
        yAxisIndex: 0,
        data: countList,
        barWidth: 16,

        showBackground: true,
        backgroundStyle: {
          color: 'rgba(22, 82, 145, 0.48)',
          borderRadius: 0
        },
        itemStyle: {
          borderRadius: 0,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#31D1FF' },
            { offset: 0.5, color: '#0FB5FB' },
            { offset: 1, color: '#0879A8' }
          ]),
          shadowColor: 'rgba(49, 209, 255, 0.45)',
          shadowBlur: 6,
          shadowOffsetY: -1
        },
        z: 3
      },
      {
        name: '服务类型占比',
        type: 'line',
        yAxisIndex: 1,
        data: rateList,
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        lineStyle: {
          width: 2,
          color: '#FEDE73',
          shadowColor: 'rgba(254, 222, 115, 0.45)',
          shadowBlur: 8
        },
        itemStyle: {
          color: '#FEDE73',
          borderColor: '#FFF4BD',
          borderWidth: 1
        },
        z: 4
      }
    ]
  }
}

const renderChart = () => {
  if (!chartRef.value) return
  chartInstance ??= echarts.init(chartRef.value)
  chartInstance.setOption(buildOption(), { notMerge: true })
}

const handleResize = () => {
  chartInstance?.resize()
}

onMounted(async () => {
  await nextTick()
  renderChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
  chartInstance = null
})
</script>

<style scoped lang="scss">
.service-product {
  display: flex;
  flex-direction: column;
  height: 200px;
  margin-top: 8px;
  min-height: 0;
  font-family: Alibaba-PuHuiTi-2;

  .chart-panel {
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    margin-top: 8px;
    overflow: hidden;
  }

  .summary-card {
    width: 100%;
    height: 36px;
    flex-shrink: 0;
    background: url('@/assets/images/right/img_服务总数bg.png') no-repeat center center;
    background-size: 100% 100%;

    .summary-card-container {
      width: 100%;
      height: 36px;
      padding: 0 28px 0 18px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .summary-card__left,
    .summary-card__value {
      display: flex;
      align-items: baseline;
    }

    .summary-card__left {
      align-items: center;
    }

    .summary-card__icon {
      width: 21px;
      height: 21px;
      margin-right: 8px;
      object-fit: contain;
    }

    .summary-card__label {
      color: #b9e8ff;
      font-family: Alibaba-PuHuiTi-2;
      font-size: 14px;
    }

    .summary-card__number,
    .summary-card__unit {
      color: #3ce3ff;
      font-family: Alibaba-PuHuiTi-2;
      font-weight: 700;
      background: linear-gradient(180deg, #ffffff 0%, #17aced 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
    }

    .summary-card__number {
      font-size: 20px;
    }

    .summary-card__unit {
      margin-left: 2px;
      font-size: 16px;
    }
  }

  .chart-container {
    flex: 1;
    min-height: 0;
    width: 100%;
    margin-top: 8px;
  }
}
</style>
