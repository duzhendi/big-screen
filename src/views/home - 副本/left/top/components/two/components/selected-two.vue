<template>
  <div class="selected-two">
    <div class="left-container">
      <div class="chart-box" ref="pieChartRef"></div>
      <div class="legend-box">
        <div class="legend-item" v-for="item in pieData" :key="item.name">
          <div class="name">{{ item.name }}</div>
          <div class="percent" :style="{ color: item.color }">{{ item.value }}%</div>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <div class="right-container">
      <div class="list-item" v-for="item in listData" :key="item.name">
        <div class="value" :style="{ color: item.color }">
          {{ item.value }}<span class="unit">{{ item.unit }}</span>
        </div>
        <div class="label">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { getLeftTopData } from '@/apis'

const pieChartRef = ref(null)

const pieData = ref([
  { value: 0, name: '认定潜力', color: '#008AFF', code: 'rdql' },
  { value: 0, name: '培育潜力', color: '#00FF9D', code: 'pyql' },
  { value: 0, name: '其他', color: '#FF8F00', code: 'lxql' }
])

const listData = ref([
  { unit: '家', name: '认定潜力筛查数', value: 0, percent: 0, color: '#008AFF', code: 'rdqlscs' },
  { unit: '家', name: '培育潜力筛查数', value: 0, percent: 0, color: '#00FF9D', code: 'pyqlscs' },
  { unit: '家', name: '落选企业数', value: 0, percent: 0, color: '#FF8F00', code: 'lxqyscs' },
  { unit: '家', name: '推送主管部门数', value: 0, percent: 0, color: '#3CE3FF', code: 'tszgbm' }
])

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
      trigger: 'item',
      formatter: '{b}: {d}%'
    }
  })
}
const getSelectTwoData = async () => {
  try {
    const res = await getLeftTopData({
      belongModel: 'jzsx'
    })
    if (res && res.data && res.data.code === 100000 && res.data.data) {
      const data = res.data.data
      data.forEach((item) => {
        // 匹配饼图数据
        const pieItem = pieData.value.find((i) => i.code === item.indexCode)
        if (pieItem) {
          pieItem.value = Number(item.indexValue)
        }
        // 匹配列表数据
        const listItem = listData.value.find((i) => i.code === item.indexCode)
        if (listItem) {
          listItem.value = Number(item.indexValue)
          listItem.unit = item.indexUnit
        }
      })
      initChart()
    }
  } catch (error) {
    console.error('获取精准筛选数据失败', error)
  }
}
onMounted(() => {
  getSelectTwoData()
})
</script>
<style lang="scss" scoped>
.selected-two {
  width: 100%;
  height: 88px;
  display: flex;
  gap: 9px;
  .left-container {
    width: 176px;
    height: 100%;
    position: relative;
    background: rgba(0, 84, 156, 0.16);
    border-radius: 4px;
    margin-right: 4px;
    display: flex;
    align-items: center;
    padding: 0 4px;
    box-sizing: border-box;
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
          font-size: 16px;
          font-weight: bold;
        }
      }
      .line {
        width: 105px;
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
  .right-container {
    width: 300px;
    height: 88px;
    background: url('@/assets/images/left-top/img_分类管理列表bg.png') no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;

    .list-item {
      display: flex;
      flex-direction: column;
      align-items: space-between;
      gap: 4px;
      width: 25%;
      height: 90%;
      .label {
        font-family: Alibaba-PuHuiTi-2;
        font-size: 14px;
        color: #b9e8ff;
        white-space: nowrap;
        transform: scale(0.9);
      }

      .progress-bg {
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 2px;
        overflow: hidden;
        display: none; // 隐藏进度条，根据图片效果不需要
      }

      .value {
        font-family: Alibaba-PuHuiTi-2;
        font-weight: bold;
        font-size: 16px;
        color: #ffffff;

        .unit {
          font-size: 12px;
          font-weight: normal;
          margin-left: 2px;
        }
      }

      // 根据图片调整样式：值在上，标签在下，中间竖线分割（背景图自带竖线）
      // 值
      .value {
        font-size: 18px;
        margin-bottom: 4px;
      }
      // 标签
      .label {
        color: #c9e9f8;
        width: 60px; // 强制换行
        white-space: normal;
        text-align: center;
        line-height: 1.5;
        text-align: left;
      }

      // 特定颜色
      &:nth-child(1) .value {
        color: #008aff;
      }
      &:nth-child(2) .value {
        color: #00ff9d;
      }
      &:nth-child(3) .value {
        color: #ff8f00;
      }
      &:nth-child(4) .value {
        color: #ffffff;
      }
    }
  }
}
</style>
