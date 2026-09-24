<template>
  <div class="one-content-box">
    <div>
      <ThirdTitle title="数据采集" width="238px" height="20px" :canClick="true" @click="handleDataCollectionClick" />
      <div class="left-content-box">
        <div class="left-chart-box" ref="pieChartRef"></div>
        <div class="right-content-box">
          <div class="content-item-left" v-for="item in leftDataList" :key="item.name">
            <div class="content-item-icon">
              <img :src="item.icon" alt="" />
            </div>
            <div class="content-item-text">
              <div class="content-item-name">
                {{ item.name }}
              </div>
              <div class="content-item-count">
                <CountUp :value="item.count" :duration="2000" />
                <span style="font-size: 14px">{{ item.unit }}</span>
              </div>
            </div>
            <div class="content-item-line"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-content-box" style="margin-left: 20px">
      <ThirdTitle title="企业建档" width="238px" height="20px" :canClick="true" @click="handleEnterpriseFilingClick" />
      <div v-for="item in rightDataList" :key="item.name" class="right-container">
        <div class="right-container-icon" style="width: 32px; height: 32px">
          <img :src="item.icon" alt="" />
        </div>
        <div class="right-container-text">
          <div class="right-container-name">{{ item.name }}</div>
          <div class="right-container-count">
            <CountUp :value="item.count" :duration="2000" />
            <span style="font-size: 14px">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <CollectionDialog v-model:visible="visible" :title="dialogTitle" :collectionData="collectionData" />
    <EnterpriseFilingDialog
      v-model:visible="filingVisible"
      :title="dialogTitle"
      :indexName="dialogIndexName"
      :indexValue="dialogIndexValue"
    />
  </div>
</template>
<script setup>
import CollectionDialog from './CollectionDialog.vue'
import EnterpriseFilingDialog from './EnterpriseFilingDialog.vue'
import ThirdTitle from '@/components/titles/third-title'
import CountUp from '@/components/CountUp.vue'
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { getImage } from '@/utils'
import { getLeftTopData } from '@/apis'

const pieChartRef = ref(null)
// 弹窗相关
const visible = ref(false)
const filingVisible = ref(false)
const dialogTitle = ref('数据采集-企业名单')
const dialogIndexName = ref('采集企业')
const dialogIndexValue = ref(0)
// 这里存储了“累计采集”和“本年度采集”的具体数值，以便点击时传递给弹窗
const collectionData = ref({
  total: 0,
  current: 0
})
// 企业建档数据
const filingData = ref({
  count: 0,
  rate: 0
})

let myChart = null

const leftDataList = ref([
  {
    icon: getImage('left-top/img_累计采集装饰元素.png'),
    name: '累计采集',
    count: '0',
    unit: '家'
  },
  {
    icon: getImage('left-top/img_本年度采集装饰元素.png'),
    name: '本年度采集',
    count: '0',
    unit: '家'
  }
])
const rightDataList = ref([
  {
    icon: getImage('left-top/img_建档数量图例.png'),
    name: '建档数量',
    count: '0',
    unit: '家'
  },
  {
    icon: getImage('left-top/img_补全率图例.png'),
    name: '补全率',
    count: '0',
    unit: '%'
  }
])
const initChart = () => {
  if (!pieChartRef.value) return
  myChart = echarts.init(pieChartRef.value)
  myChart.setOption({
    polar: null, // 清除 polar
    angleAxis: null,
    radiusAxis: null,
    series: [
      // --- 外圈（蓝色） ---
      // 背景
      {
        type: 'pie',
        radius: ['80%', '88%'],
        center: ['53%', '53%'],
        silent: true,
        label: { show: false },
        labelLine: { show: false },
        data: [{ value: 100, itemStyle: { color: 'rgba(255, 255, 255, 0.05)' } }]
      },
      // 数据
      {
        type: 'pie',
        radius: ['80%', '88%'],
        center: ['53%', '53%'],
        startAngle: 90, // 12点钟方向
        label: { show: false },
        labelLine: { show: false },
        data: [
          { value: 65, name: '累计采集', itemStyle: { color: '#3D93F2', borderRadius: 5 } },
          { value: 35, name: '', itemStyle: { color: 'transparent' }, tooltip: { show: false } }
        ],
        z: 2
      },
      // --- 内圈（黄色） ---
      // 背景
      {
        type: 'pie',
        radius: ['65%', '73%'],
        center: ['53%', '53%'],
        silent: true,
        label: { show: false },
        labelLine: { show: false },
        data: [{ value: 100, itemStyle: { color: 'rgba(255, 255, 255, 0.05)' } }]
      },
      // 数据
      {
        type: 'pie',
        radius: ['65%', '73%'],
        center: ['53%', '53%'],
        startAngle: 90, // 向右偏移 45 度
        label: { show: false },
        labelLine: { show: false },
        data: [
          { value: 35, name: '本年度采集', itemStyle: { color: '#FDD56A', borderRadius: 5 } },
          { value: 65, name: '', itemStyle: { color: 'transparent' }, tooltip: { show: false } }
        ],
        z: 2
      }
    ],
    tooltip: {
      show: true,
      formatter: '{b}: {c}%'
    }
  })
}
const getLeftTop = async () => {
  try {
    const res = await getLeftTopData({
      belongModel: 'sjcj'
    })
    if (res && res.data && res.data.code === 100000 && res.data.data) {
      const data = res.data.data
      let ljcjVal = 0
      let bndcjVal = 0
      data.forEach((item) => {
        if (item.indexCode === 'ljcj') {
          const target = leftDataList.value.find((i) => i.name === '累计采集')
          if (target) {
            target.count = item.indexValue
            target.unit = item.indexUnit
            ljcjVal = Number(item.indexValue)
          }
        } else if (item.indexCode === 'bndcj') {
          const target = leftDataList.value.find((i) => i.name === '本年度采集')
          if (target) {
            target.count = item.indexValue
            target.unit = item.indexUnit
            bndcjVal = Number(item.indexValue)
          }
        }
      })
      collectionData.value = {
        total: ljcjVal,
        current: bndcjVal
      }

      if (myChart) {
        const total = ljcjVal + bndcjVal
        if (total > 0) {
          const ljcjRate = Math.round((ljcjVal / total) * 100)
          const bndcjRate = 100 - ljcjRate
          myChart.setOption({
            tooltip: {
              show: false,
              formatter: '{b}: {c}%'
            },
            series: [
              {},
              {
                data: [
                  { value: ljcjRate, name: '累计采集', itemStyle: { color: '#3D93F2', borderRadius: 5 } },
                  { value: 100 - ljcjRate, name: '', itemStyle: { color: 'transparent' }, tooltip: { show: false } }
                ]
              },
              {},
              {
                data: [
                  { value: bndcjRate, name: '本年度采集', itemStyle: { color: '#FDD56A', borderRadius: 5 } },
                  { value: 100 - bndcjRate, name: '', itemStyle: { color: 'transparent' }, tooltip: { show: false } }
                ]
              }
            ]
          })
        }
      }
    }
  } catch (error) {
    console.error('获取数据采集数据失败', error)
  }
}
const getRightTop = async () => {
  try {
    const res = await getLeftTopData({
      belongModel: 'qyjd'
    })
    if (res && res.data && res.data.code === 100000 && res.data.data) {
      const data = res.data.data
      data.forEach((item) => {
        if (item.indexCode === 'jdsl') {
          const target = rightDataList.value.find((i) => i.name === '建档数量')
          if (target) {
            target.count = item.indexValue
            target.unit = item.indexUnit
            filingData.value.count = Number(item.indexValue)
          }
        } else if (item.indexCode === 'bql') {
          const target = rightDataList.value.find((i) => i.name === '补全率')
          if (target) {
            target.count = item.indexValue
            target.unit = item.indexUnit
            filingData.value.rate = Number(item.indexValue)
          }
        }
      })
    }
  } catch (error) {
    console.error('获取企业建档数据失败', error)
  }
}
// 点击“数据采集”
const handleDataCollectionClick = () => {
  dialogTitle.value = '数据采集-企业名单'
  dialogIndexName.value = '采集企业'
  // 这里暂时取“累计采集”作为默认展示
  dialogIndexValue.value = collectionData.value.total
  visible.value = true
}
// 点击“企业建档”
const handleEnterpriseFilingClick = () => {
  dialogTitle.value = '企业建档-企业名单'
  dialogIndexName.value = '建档企业'
  dialogIndexValue.value = filingData.value.count
  filingVisible.value = true
}

onMounted(() => {
  getLeftTop()
  getRightTop()
  initChart()
})
</script>
<style lang="scss" scoped>
.one-content-box {
  display: flex;
  .left-content-box {
    margin-top: 8px;
    display: flex;
    gap: 8px;
    .left-chart-box {
      width: 85px;
      height: 85px;
      background: url('@/assets/images/left-top/pie-bg.png') no-repeat center center;
      background-size: cover;
    }
    .right-content-box {
      width: 140px;
      height: 41px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 12px;
      .content-item-left {
        display: flex;
        align-items: center;
        gap: 4px;
        position: relative;
        .content-item-icon {
          position: absolute;
          left: 1px;
          top: -10px;
          width: 10px;
          height: 10px;
          z-index: -1;
        }
        .content-item-text {
          width: 140px;
          display: flex;
          justify-content: space-between;
          .content-item-name {
            font-family: Alibaba-PuHuiTi-2;
            font-weight: normal;
            font-size: 13px;
            color: #b9e8ff;
            position: relative;
            left: 4px;
            bottom: 2px;
          }
          .content-item-count {
            font-family: Helvetica, Helvetica;
            font-weight: bold;
            font-size: 16px;
            color: #00a8fc;
            position: relative;
            right: 0px;
            bottom: 2px;
          }
        }
      }
      .content-item-line {
        width: 100%;
        height: 10px;
        background: url('@/assets/images/left-top/img_数据采集内容底座.png') no-repeat center center;
        background-size: cover;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: -1;
      }
    }
  }
  .right-content-box {
    .right-container {
      margin-top: 4px;
      background: rgba(0, 84, 156, 0.1);
      border-radius: 4px;
      width: 100%;
      height: 41px;
      display: flex;
      align-items: center;
    }
    .right-container-icon {
      margin-left: 12px;
      width: 30px;
      height: 32px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right-container-text {
      margin-left: 10px;
      margin-right: 12px;
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .right-container-name {
        font-family: Alibaba-PuHuiTi-2;
        font-weight: normal;
        font-size: 14px;
        color: #b9e8ff;
      }
      .right-container-count {
        font-family: Helvetica, Helvetica;
        font-weight: bold;
        font-size: 18px;
        color: #3ce3ff;
      }
    }
  }
}
.dialog-content {
  .btn-box {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  }
  .dialog-content-header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    .title {
      font-family: Alibaba-PuHuiTi-2;
      font-weight: normal;
      font-size: 16px;
      color: #fff;
    }
    .value {
      font-family: Alibaba-PuHuiTi-2;
      font-weight: normal;
      font-size: 16px;
      color: #3ce3ff;
    }
    .search-box {
      display: flex;
    }
  }
}
</style>
