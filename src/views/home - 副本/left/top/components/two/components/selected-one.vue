<template>
  <div class="selected-one">
    <div class="right-container">
      <div class="chart-box" ref="pieChartRef"></div>
      <div class="legend-box">
        <div class="legend-item" v-for="item in pieData" :key="item.name">
          <div class="name">{{ item.name }}</div>
          <div class="val-box">
            <span class="count">
              <CountUp :value="item.count" :duration="2000" :style="{ fontSize: '15px' }" />
              <span class="unit" style="font-size: 12px">家</span></span
            >
            <span class="percent" style="font-size: 15px" :style="{ color: item.color }">{{ item.value }}%</span>
          </div>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <div class="company-container" @mouseenter="pauseCompanyAutoScroll" @mouseleave="resumeCompanyAutoScroll">
      <div class="company-title" style="height: 15%">
        <div class="block"></div>
        <div class="type-name">认定潜力企业</div>
        <div class="line"></div>
      </div>
      <div class="company-scroll">
        <div class="company-body" :style="companyBodyStyle">
          <div v-for="(name, idx) in companyList" :key="idx" class="company-row" :title="name">
            <span class="dot" />
            <span class="text">{{ name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import * as echarts from 'echarts'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { getGraduateLibraryScroll, getLeftTopData } from '@/apis'

const reportCountValue = ref(0)
const reportUnit = ref('个')
const pieChartRef = ref(null)

const pieData = ref([
  { value: 0, count: 0, name: '认定潜力企业', color: '#008AFF', code: 'xzqyzb', countCode: 'xzqy' },
  { value: 0, count: 0, name: '培育潜力企业', color: '#00FF9D', code: 'pyqyzb', countCode: 'pyqy' },
  { value: 0, count: 0, name: '其他', color: '#FF8F00', code: 'lxqyzb', countCode: 'lxqy' }
])

// 公司名称轮播表格
const companyList = ref([])
const visibleCompanyCount = 3
const companyRowHeight = 22
const companyScrollIntervalMs = 2500
const companyScrollAnimMs = 450
const companyScrollStep = ref(0)
const companyTransitionEnabled = ref(true)
let companyScrollTimer = null

const companyBodyStyle = computed(() => {
  return {
    transform: `translateY(-${companyScrollStep.value * companyRowHeight}px)`,
    transition: companyTransitionEnabled.value ? `transform ${companyScrollAnimMs}ms linear` : 'none'
  }
})

const stopCompanyAutoScroll = () => {
  if (companyScrollTimer) {
    clearInterval(companyScrollTimer)
    companyScrollTimer = null
  }
}

const tickCompanyAutoScroll = () => {
  const len = companyList.value.length || 0
  if (len <= visibleCompanyCount) return

  const maxStep = Math.max(len - visibleCompanyCount, 0)
  if (companyScrollStep.value < maxStep) {
    companyTransitionEnabled.value = true
    companyScrollStep.value += 1
    return
  }

  companyTransitionEnabled.value = false
  companyScrollStep.value = 0
  nextTick(() => {
    setTimeout(() => {
      companyTransitionEnabled.value = true
    }, 0)
  })
}

const startCompanyAutoScroll = () => {
  stopCompanyAutoScroll()
  const len = companyList.value.length || 0
  if (len <= visibleCompanyCount) return
  companyScrollTimer = setInterval(() => {
    tickCompanyAutoScroll()
  }, companyScrollIntervalMs)
}

const pauseCompanyAutoScroll = () => stopCompanyAutoScroll()
const resumeCompanyAutoScroll = () => startCompanyAutoScroll()

const getCompanyList = async () => {
  try {
    const res = await getGraduateLibraryScroll()
    companyList.value = res?.data?.data || []
    // 新数据从顶部重新开始滚动
    companyTransitionEnabled.value = false
    companyScrollStep.value = 0
    nextTick(() => {
      setTimeout(() => {
        companyTransitionEnabled.value = true
        startCompanyAutoScroll()
      }, 0)
    })
  } catch (e) {
    console.error('获取公司名称列表失败', e)
    companyList.value = []
  }
}

const initChart = () => {
  if (!pieChartRef.value) return
  const chart = echarts.init(pieChartRef.value)
  const data = pieData.value.map((item) => ({
    value: item.value,
    name: item.name,
    itemStyle: { color: item.color }
  }))
  chart.setOption({
    series: [
      {
        type: 'pie',
        radius: ['40%', '55%'], // 调整内外半径
        center: ['50%', '50%'],
        label: { show: false },
        labelLine: { show: false },
        data: data
      },
      // 外层装饰圈 (半透明)
      {
        type: 'pie',
        radius: ['60%', '80%'],
        center: ['50%', '50%'],
        label: { show: false },
        data: [
          { value: data[0].value, itemStyle: { color: 'rgba(0, 138, 255, 0.2)' } },
          { value: data[1].value, itemStyle: { color: 'rgba(0, 255, 157, 0.2)' } },
          { value: data[2].value, itemStyle: { color: 'rgba(255, 143, 0, 0.2)' } }
        ]
      }
    ],
    tooltip: {
      show: false,
      trigger: 'item',
      formatter: '{b}: {d}%'
    }
  })
}
const getSelectOneData = async () => {
  try {
    const res = await getLeftTopData({
      belongModel: 'znfx'
    })
    if (res && res.data && res.data.code === 100000 && res.data.data) {
      const data = res.data.data
      data.forEach((item) => {
        if (item.indexCode === 'fxbgs') {
          reportCountValue.value = item.indexValue
          reportUnit.value = item.indexUnit
        } else {
          // 匹配饼图数据
          const pieItem = pieData.value.find((i) => i.code === item.indexCode)
          if (pieItem) {
            pieItem.value = Number(item.indexValue)
          }
          const countItem = pieData.value.find((i) => i.countCode === item.indexCode)
          if (countItem) {
            countItem.count = Number(item.indexValue)
          }
        }
      })
      initChart()
    }
  } catch (error) {
    console.error('获取分析报告数数据失败', error)
  }
}
onMounted(() => {
  getSelectOneData()
  getCompanyList()
  startCompanyAutoScroll()
})

onUnmounted(() => {
  stopCompanyAutoScroll()
})
</script>
<style lang="scss" scoped>
.selected-one {
  width: 100%;
  height: 88px;
  display: flex;
  gap: 9px;
  min-width: 0;
  .right-container {
    width: 250px;
    height: 100%;
    position: relative;
    background: rgba(0, 84, 156, 0.16);
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0 4px;
    box-sizing: border-box;
    min-width: 0;
    .chart-box {
      width: 60px;
      height: 60px;
    }
    .legend-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      margin-left: 4px;
      .legend-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        position: relative;
        .val-box {
          margin-right: 5px;
          .count {
            font-family: Alibaba-PuHuiTi-2;
            margin-right: 5px;
            font-size: 16px;
          }
        }
        .name {
          font-family: Alibaba-PuHuiTi-2;
          font-weight: normal;
          font-size: 13px;
          color: #b9e8ff;
          transform: scale(0.9);
          transform-origin: left center;
          white-space: nowrap;
        }
        .percent {
          font-family: Alibaba-PuHuiTi-2;
          font-weight: normal;
          font-size: 15px;
          font-weight: bold;
        }
      }
      .line {
        width: 170px;
        height: 10px;
        position: absolute;
        bottom: -3px;
        left: -2px;
        z-index: -1;
        background: linear-gradient(270deg, #00549c 0%, rgba(0, 84, 156, 0.41) 24%, rgba(0, 84, 156, 0) 100%);
        border-radius: 1px 1px 1px 1px;
        transform: skew(30deg);
      }
    }
  }

  .company-container {
    width: 240px;
    height: 100%;
    background: rgba(0, 84, 156, 0.16);
    border-radius: 4px;
    padding: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .company-title {
      height: 15%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 5px;
      padding-top: 5px;
      position: relative;
      .block {
        width: 6px;
        height: 7px;
        background: linear-gradient(1deg, #3ce3ff 0%, #62aefa 100%);
      }
      .type-name {
        font-family: Alibaba-PuHuiTi-2;
        font-weight: normal;
        font-size: 14px;
        color: #b9e8ff;
        margin-left: 2px;
      }
      .line {
        width: 100%;
        height: 10px;
        background: url('@/assets/images/left-top/选种企业标题bg.png') no-repeat center center;
        background-size: cover;
        position: absolute;
        bottom: -5px;
        left: 0;
      }
    }
    .company-scroll {
      height: 90%;
      overflow: hidden;
      position: relative;
      top: 10%;
      // 上下渐隐，让滚动看起来更顺滑
      &::before,
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        height: 10px;
        z-index: 2;
        pointer-events: none;
      }
      &::before {
        top: 0;
        background: linear-gradient(180deg, rgba(0, 29, 62, 0.85) 0%, rgba(0, 29, 62, 0) 100%);
      }
      &::after {
        bottom: 0;
        background: linear-gradient(0deg, rgba(0, 29, 62, 0.85) 0%, rgba(0, 29, 62, 0) 100%);
      }
    }

    .company-body {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .company-row {
      height: 22px;
      line-height: 22px;
      font-family: Alibaba-PuHuiTi-2;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.9);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 3px;
      margin-bottom: 5px;
      box-sizing: border-box;
      border-radius: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
      background: linear-gradient(90deg, rgba(45, 128, 255, 0.22) 0%, rgba(45, 128, 255, 0) 100%);
      border: 1px solid rgba(60, 227, 255, 0.14);
      box-shadow: inset 0 0 10px rgba(0, 211, 246, 0.06);

      &:nth-child(2n) {
        background: linear-gradient(90deg, rgba(0, 211, 246, 0.18) 0%, rgba(0, 211, 246, 0) 100%);
      }

      &:hover {
        border-color: rgba(60, 227, 255, 0.35);
        box-shadow:
          inset 0 0 12px rgba(0, 211, 246, 0.12),
          0 0 10px rgba(0, 211, 246, 0.12);
      }

      .dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(60, 227, 255, 0.9);
        box-shadow: 0 0 8px rgba(60, 227, 255, 0.5);
        flex: 0 0 auto;
      }

      .text {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
