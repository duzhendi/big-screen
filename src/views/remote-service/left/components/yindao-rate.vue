<template>
  <div class="yindao-rate">
    <div v-for="item in rateList" :key="item.label" class="rate-card">
      <div class="rate-name">{{ item.label }}</div>
      <div class="gauge-wrap">
        <commonChart :option="gaugeOption(item)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import commonChart from '@/components/common-chart.vue'
import * as echarts from 'echarts'

// 引导办：达成率 83%（蓝）、转化率 90%（绿）
const rateList = [
  { label: '达成率', value: 83, color: '#4ea8ff' },
  { label: '转化率', value: 90, color: '#2ee6a8' }
]

// 生成单个 gauge 环形仪表盘 option
// 叠 3 层：外圈 border → 主环 progress+axisLine → 内圈 shadow
const gaugeOption = (item) => {
  const common = {
    startAngle: 210,
    endAngle: -30,
    center: ['50%', '48%'],
    min: 0,
    max: 100,
    silent: true,
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: { show: false },
    pointer: { show: false },
    anchor: { show: false },
    title: { show: false }
  }

  return {
    backgroundColor: 'transparent',
    xAxis: { show: false },
    yAxis: { show: false },
    series: [
      // 1. 外圈细边框（亮线）
      {
        type: 'gauge',
        ...common,
        radius: '100%',
        progress: { show: false },
        axisLine: {
          lineStyle: {
            width: 1.5,
            color: [[1, shade(item.color, 0.15)]]
          }
        },
        detail: { show: false },
        data: [{ value: 100 }]
      },
      // 2. 主环（progress 弧 + 底色轨道）
      {
        type: 'gauge',
        ...common,
        radius: '95%',
        progress: {
          show: true,
          width: 10,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: shade(item.color, -0.3) },
              { offset: 1, color: item.color }
            ]),
            shadowColor: item.color,
            shadowBlur: 8
          }
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [[1, 'rgba(100, 180, 255, 0.12)']]
          }
        },
        detail: {
          show: true,
          valueAnimation: true,
          offsetCenter: [0, '5%'],
          formatter: `{value}%`,
          color: item.color,
          fontSize: 24,
          fontWeight: 'bold',
          fontFamily: 'Alibaba-PuHuiTi-Medium'
        },
        data: [{ value: item.value }]
      },
      // 3. 内圈细阴影（暗色 + 发光，模拟内环阴影）
      {
        type: 'gauge',
        ...common,
        radius: '90%',
        progress: { show: false },
        axisLine: {
          lineStyle: {
            width: 3,
            color: [[1, shade(item.color, -0.7)]],
            shadowColor: shade(item.color, -0.5),
            shadowBlur: 6
          }
        },
        detail: { show: false },
        data: [{ value: 100 }]
      }
    ]
  }
}

// 颜色明度调整
function shade(hex, delta) {
  const c = hex.replace('#', '')
  const r = parseInt(c.substring(0, 2), 16)
  const g = parseInt(c.substring(2, 4), 16)
  const b = parseInt(c.substring(4, 6), 16)
  const mix = delta < 0 ? 0 : 255
  const t = Math.abs(delta)
  const nr = Math.round(r + (mix - r) * t)
  const ng = Math.round(g + (mix - g) * t)
  const nb = Math.round(b + (mix - b) * t)
  return `rgb(${nr},${ng},${nb})`
}
</script>

<style scoped lang="scss">
.yindao-rate {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 8px 14px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .rate-card {
    width: 170px;
    height: 100%;
    background: url('@/assets/images/Frame 4273206145.png');
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 10px;
    box-sizing: border-box;

    .rate-name {
      font-size: 16px;
      letter-spacing: 2px;
      font-weight: 400;
      color: #cfeaff;
      font-family: Alibaba-PuHuiTi-Regular;
      margin-top: 12px;
    }

    .gauge-wrap {
      margin-top: 36px;
      width: 108px;
      height: 112px;
    }
  }
}
</style>
