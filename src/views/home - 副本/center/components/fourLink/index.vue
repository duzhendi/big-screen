<template>
  <CommonDialog v-model:visible="dialogVisible" title="四链融合" width="1600px" height="900px">
    <div class="four-link-container">
      <!-- 内容区域 -->
      <div class="content-body">
        <!-- 左侧需求列表 -->
        <div class="left-panel">
          <div class="search-box">
            <CommonInput v-model="searchKeyword" placeholder="请输入企业名称或需求关键词" @search="handleSearch" />
          </div>
          <div class="demand-list">
            <div
              v-for="(item, index) in demandList"
              :key="index"
              class="demand-card"
              :class="{ active: selectedDemandIndex === index }"
              @click="handleDemandClick(item, index)"
            >
              <div class="status-tag" :class="getStatusClass(item.status)">{{ item.status }}</div>
              <div class="demand-title">{{ item.title }}</div>
              <div class="info-row">
                <span class="type-tag" :class="getTypeClass(item.type)">{{ item.type }}</span>
                <span class="company-name">{{ item.company }}</span>
              </div>
              <div class="time-row">提交时间：{{ item.time }}</div>
            </div>
          </div>
        </div>

        <!-- 右侧主内容 -->
        <div class="right-panel">
          <!-- 统计卡片 -->
          <div class="stat-row">
            <div v-for="stat in stats" :key="stat.label" class="stat-card" :class="stat.type">
              <div class="stat-info">
                <div class="stat-value">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
              <div class="icon-wrap">
                <img :src="stat.icon" class="stat-icon" />
              </div>
            </div>
          </div>

          <!-- 中部图表区 -->
          <div class="charts-row">
            <div class="chart-block distribution">
              <div class="block-title">各链需求分布</div>
              <div class="chart-container" style="margin-left: 80px">
                <div class="chart-bg"></div>
                <div ref="pieChartRef" class="chart-box"></div>
                <div class="chart-center">
                  <div class="total-num">{{ totalNum }}</div>
                  <div class="total-label">需求总数</div>
                </div>
                <div class="legend-list">
                  <div v-for="item in distributionData" :key="item.name" class="legend-item">
                    <span class="dot" :style="{ backgroundColor: item.color }"></span>
                    <span class="name">{{ item.name }}</span>
                    <span class="percent">{{ item.percent }}%</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="chart-block efficiency">
              <div class="block-title">处理时效分析</div>
              <div ref="barChartRef" class="chart-container"></div>
            </div>
          </div>

          <!-- 底部流程图 -->
          <div class="flow-block">
            <div class="block-title">需求流程</div>
            <div class="flow-container"></div>
          </div>
        </div>
      </div>

      <!-- 详情弹窗 -->
      <RequirementDetail v-model:visible="detailVisible" v-if="detailVisible" :data="currentDemand" />
    </div>
  </CommonDialog>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'
import CommonDialog from '@/components/common-dialog.vue'
import CommonInput from '@/components/common-input.vue'
import RequirementDetail from './RequirementDetail.vue'
import * as echarts from 'echarts'
import { getImage, debounce } from '@/utils'
import { getEnterpriseDemandList, getLeftTopData } from '@/apis'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const searchKeyword = ref('')
const selectedDemandIndex = ref(0)
const detailVisible = ref(false)
const currentDemand = ref(null)

const getDemandList = async () => {
  const res = await getEnterpriseDemandList({
    demandName: searchKeyword.value,
    pageIndex: 1,
    pageSize: 10
  })
  if (res?.data?.data?.list) {
    demandList.value = res.data.data.list.map((item) => {
      return {
        title: item.demandName,
        status: item.demandStatusName,
        type: item.demandType,
        company: item.enterpriseName,
        time: item.createTime,
        enterpriseDemandId: item.enterpriseDemandId,
        ...item
      }
    })
  } else {
    demandList.value = []
  }
}

const demandList = ref([])
// 1. 统计卡片联调
const getStatsData = async () => {
  const res = await getLeftTopData({ belongModel: 'slrhhz' })
  if (res?.data?.data) {
    stats.value.forEach((item, index) => {
      item.value = res?.data?.data?.find((it) => it.indexCode === item.model)?.indexValue
    })
  }
}
const stats = ref([
  { label: '总需求', value: '', icon: getImage('center/img_总需求图例.png'), type: 'total', model: 'zxq' },
  { label: '待确认', value: '', icon: getImage('center/img_待确认图例.png'), type: 'confirm', model: 'dqr' },
  { label: '处置中', value: '', icon: getImage('center/img_处置中图例.png'), type: 'process', model: 'czz' },
  { label: '已反馈', value: '', icon: getImage('center/img_已反馈图例.png'), type: 'feedback', model: 'yfk' },
  { label: '超时预警', value: '', icon: getImage('center/img_超时图例.png'), type: 'warning', model: 'css' }
])

const distributionData = ref([])

const barData = ref([])
const totalNum = ref()

const pieChartRef = ref(null)
const barChartRef = ref(null)

const getStatusClass = (status) => {
  const map = {
    处置中: 'processing',
    待确认: 'to-confirm',
    已反馈: 'feedbacked',
    超时预警: 'warning'
  }
  return map[status] || ''
}

const getTypeClass = (type) => {
  const map = {
    产业链: 'cyl',
    资金链: 'zjl',
    人才链: 'rcl',
    创新链: 'cxl'
  }
  return map[type] || ''
}

const handleSearch = () => {
  getDemandList()
}

const handleDemandClick = (item, index) => {
  console.log(item, 'demandList.value')
  selectedDemandIndex.value = index
  currentDemand.value = item
  detailVisible.value = true
}

let pieChart = null
let barChart = null
const getPieData = async () => {
  const res = await getLeftTopData({
    belongModel: 'glxqfb'
  })
  if (res?.data?.data) {
    const total = res.data.data.reduce((sum, item) => sum + Number(item.indexValue), 0)
    totalNum.value = total
    const mapping = {
      cylxq: { name: '产业链', color: '#00A8FC' },
      zjlxq: { name: '资金链', color: '#FEDE73' },
      rclxq: { name: '人才链', color: '#A0E33C' },
      cxlxq: { name: '创新链', color: '#00D3F6' }
    }
    distributionData.value = res.data.data.map((item) => {
      const config = mapping[item.indexCode] || { name: item.indexChinese, color: '#00A8FC' }
      const value = Number(item.indexValue)
      return {
        name: config.name,
        value,
        percent: total > 0 ? ((value / total) * 100).toFixed(0) : 0,
        color: config.color
      }
    })
    initPieChart()
  }
}
const initPieChart = () => {
  if (!pieChartRef.value) return
  if (pieChart) pieChart.dispose()
  pieChart = echarts.init(pieChartRef.value)
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
      backgroundColor: 'rgba(9, 54, 100, 0.9)',
      borderColor: 'rgba(60, 227, 255, 0.5)',
      textStyle: {
        color: '#fff'
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['53%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        label: { show: false },
        data: distributionData.value.map((item) => ({
          value: item.value,
          name: item.name,
          itemStyle: { color: item.color }
        }))
      }
    ]
  }
  pieChart.setOption(option)
}
const getBarData = async () => {
  const res = await getLeftTopData({
    belongModel: 'clsxfx'
  })
  if (res?.data?.data) {
    barData.value = res.data.data.map((item) => ({
      name: item.indexChinese,
      value: Number(item.indexValue)
    }))
    initBarChart()
  }
}
const initBarChart = () => {
  if (!barChartRef.value) return
  if (barChart) barChart.dispose()
  barChart = echarts.init(barChartRef.value)
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(9, 54, 100, 0.9)',
      borderColor: 'rgba(60, 227, 255, 0.5)',
      textStyle: {
        color: '#fff'
      }
    },
    grid: { top: 40, bottom: 30, left: 40, right: 20 },
    xAxis: {
      type: 'category',
      data: barData.value.map((item) => item.name),
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } },
      axisTick: { show: false },
      axisLabel: { color: '#B9E8FF', fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      name: '需求个数',
      nameTextStyle: { color: '#B9E8FF', align: 'right', padding: [0, 0, 0, 60] },
      splitLine: { lineStyle: { type: 'dashed', color: 'rgba(255,255,255,0.1)' } },
      axisLabel: { color: '#B9E8FF' }
    },
    series: [
      {
        data: barData.value.map((item) => item.value),
        type: 'bar',
        barWidth: 14,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(45, 128, 255, 0.1)'
        },
        itemStyle: {
          color: '#00D3F6'
        }
      }
    ]
  }
  barChart.setOption(option)
}

onMounted(() => {
  // window.addEventListener('resize', handleResize)
  // 如果初始就是可见的，则初始化图表
  if (props.visible) {
    nextTick(() => {
      getDemandList()
      getPieData()
      getBarData()
    })
  }
})

// 监听弹窗可见性，打开时重新初始化
watch(
  () => props.visible,
  (val) => {
    if (val) {
      getDemandList()
      getStatsData()
      getPieData()
      getBarData()
    }
  }
)

onUnmounted(() => {
  // window.removeEventListener('resize', handleResize)
  pieChart?.dispose()
  barChart?.dispose()
})
watch(
  searchKeyword,
  debounce(() => {
    getDemandList()
  }, 500)
)
</script>

<style lang="scss" scoped>
.four-link-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  box-sizing: border-box;
  font-family: Alibaba-PuHuiTi-2;

  .top-actions {
    position: absolute;
    top: 4px;
    right: 50px;
    z-index: 100;
  }

  .content-body {
    flex: 1;
    display: flex;
    gap: 20px;
    overflow: hidden;
    margin-top: 20px; // 为顶部按钮留出空间

    .left-panel {
      width: 320px;
      display: flex;
      flex-direction: column;
      gap: 15px;

      .demand-list {
        flex: 1;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding-right: 5px;

        &::-webkit-scrollbar {
          width: 4px;
        }
        &::-webkit-scrollbar-thumb {
          background: rgba(60, 227, 255, 0.3);
          border-radius: 2px;
        }

        .demand-card {
          padding: 15px;
          background: rgba(9, 54, 100, 0.7);
          box-shadow: inset 0 0 10px rgba(60, 227, 255, 0.2);
          border-radius: 6px;
          border: 1px solid rgba(74, 122, 156, 0.3);
          position: relative;
          cursor: pointer;
          transition: all 0.3s;

          &.active,
          &:hover {
            background: linear-gradient(180deg, rgba(45, 128, 255, 0.1) 0%, rgba(9, 54, 100, 0.9) 100%);
            box-shadow:
              inset 0 0 15px rgba(60, 227, 255, 0.3),
              0 0 15px rgba(0, 168, 252, 0.2);
          }

          .status-tag {
            position: absolute;
            top: 0;
            right: 0;
            padding: 2px 10px;
            font-size: 12px;
            color: #fff;
            font-family: Alibaba-PuHuiTi-2;
            border-bottom-left-radius: 8px;

            &.processing {
              background: #00a8fc;
            }
            &.to-confirm {
              background: #00d3f6;
            }
            &.feedbacked {
              background: #52c41a;
            }
            &.warning {
              background: #fea15c;
            }
          }

          .demand-title {
            font-size: 15px;
            color: #ffffff;
            font-weight: bold;
            margin-bottom: 12px;
            line-height: 1.4;
          }

          .info-row {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;

            .type-tag {
              font-size: 12px;
              padding: 2px 6px;
              border-radius: 2px;
              font-weight: bold;

              &.cyl {
                color: #ffffff;
                background: #0076b2;
              }
              &.zjl {
                color: #ffffff;
                background: #b29100;
              }
              &.rcl {
                color: #ffffff;
                background: #3c9213;
              }
              &.cxl {
                color: #ffffff;
                background: #0093ae;
              }
            }

            .company-name {
              color: #b9e8ff;
              font-size: 13px;
              flex: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .time-row {
            font-size: 12px;
            color: rgba(185, 232, 255, 0.6);
          }
        }
      }
    }

    .right-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;

      .stat-row {
        display: flex;
        gap: 15px;

        .stat-card {
          flex: 1;
          height: 100px;
          background: rgba(51, 133, 255, 0.12);
          border-radius: 2px 2px 2px 2px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          &.total {
            .stat-value,
            .stat-label {
              color: #ffffff;
            }
          }
          &.confirm {
            .stat-value,
            .stat-label {
              color: #3ce3ff;
            }
          }
          &.process {
            .stat-value,
            .stat-label {
              color: #00a8fc;
            }
          }
          &.feedback {
            .stat-value,
            .stat-label {
              color: #52c41a;
            }
          }
          &.warning {
            .stat-value,
            .stat-label {
              color: #fea15c;
            }
          }

          .stat-value {
            font-family: Alibaba-PuHuiTi-2;
            font-size: 32px;
            line-height: 1;
            margin-bottom: 8px;
          }

          .stat-label {
            font-size: 14px;
          }

          .icon-wrap {
            width: 48px;
            height: 48px;
            border: 1px dashed rgba(60, 227, 255, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;

            .stat-icon {
              width: 48px;
              height: 48px;
              opacity: 0.9;
            }
          }
        }
      }

      .charts-row {
        display: flex;
        gap: 20px;
        height: 300px;

        .chart-block {
          flex: 1;
          background: rgba(9, 54, 100, 0.4);
          border: 1px solid rgba(74, 122, 156, 0.3);
          padding: 15px;
          display: flex;
          flex-direction: column;

          .block-title {
            font-family: Alibaba-PuHuiTi-2;
            font-size: 16px;
            color: #ffffff;
            padding-left: 10px;
            border-left: 3px solid #3ce3ff;
            margin-bottom: 15px;
          }

          .chart-container {
            flex: 1;
            position: relative;
            display: flex;
            align-items: center;
          }
        }

        .distribution {
          .chart-bg {
            position: absolute;
            width: 148px;
            height: 148px;
            background: url('@/assets/images/center/img_各链需求分布图1.png') no-repeat center center;
            background-size: 100% 100%;
            left: 100px;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
          }
          .chart-box {
            width: 200px;
            height: 100%;
            position: relative;
            z-index: 1;
          }
          .chart-center {
            position: absolute;
            left: 100px;
            top: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            .total-num {
              font-size: 24px;
              color: #fff;
              font-weight: bold;
            }
            .total-label {
              font-size: 12px;
              color: #b9e8ff;
            }
          }
          .legend-list {
            width: 150px;
            padding-left: 30px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            .legend-item {
              display: flex;
              align-items: center;
              gap: 10px;
              color: #b9e8ff;
              font-size: 14px;
              .dot {
                width: 8px;
                height: 8px;
                border-radius: 2px;
              }
              .percent {
                margin-left: auto;
                color: #fff;
                font-weight: bold;
              }
            }
          }
        }
      }

      .flow-block {
        flex: 1;
        background: rgba(9, 54, 100, 0.4);
        border: 1px solid rgba(74, 122, 156, 0.3);
        padding: 15px;
        display: flex;
        flex-direction: column;

        .block-title {
          font-family: Alimama ShuHeiTi;
          font-size: 16px;
          color: #ffffff;
          padding-left: 10px;
          border-left: 3px solid #3ce3ff;
          margin-bottom: 15px;
        }

        .flow-container {
          flex: 1;
          background: url('@/assets/images/center/img_流程图@2x.png') no-repeat center center;
          background-size: contain;
        }
      }
    }
  }
}
</style>
