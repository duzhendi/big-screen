<template>
  <div class="home-center-wrapper">
    <div class="top">
      <div
        v-for="(item, index) in listData"
        :key="index"
        class="btn-container"
        @click="switchScatterType(index)"
        @mouseenter="hoverIndex = index"
        @mouseleave="hoverIndex = null"
      >
        <div class="light-icon"></div>
        <div class="title" :class="activeIndex === index ? 'active' : ''">
          <span>{{ item.name }}</span>
          <div v-if="item.tooltipText" v-html="item.tooltipText" class="intro-tooltip"></div>
        </div>
        <div class="value-container">
          <div v-for="(it, i) in item.items" :key="it.label">
            <div class="value-item" :class="activeIndex === index || hoverIndex === index ? 'active' : ''">
              <div
                class="value-text"
                :style="{ color: colorList[index], cursor: i === 0 ? 'pointer' : '' }"
                @click="handleEnterpriseClick(item, index)"
              >
                {{ it.value }} <span class="unit">{{ it.unit }}</span>
              </div>
              <div
                class="value-title"
                :style="{ color: it.label === '目标完成率' ? 'rgba(15,255,153,0.8)' : '#B9E8FF' }"
              >
                {{ it.label }}
              </div>
            </div>
          </div>
        </div>
        <div class="four-icon" v-if="item.items.find((it) => it.label === '目标完成率')?.value == 100"></div>
      </div>
    </div>

    <!-- 地图容器：根据类型渲染不同组件 -->
    <div class="center">
      <div v-if="currentMapType === 'scatter'" class="five-btn" @click="switchMapType('fiveColor')">企业分布五色图</div>
      <FiveColorMap v-if="currentMapType === 'fiveColor'" />
      <ScatterMap
        ref="scatterMap"
        v-else-if="currentMapType === 'scatter'"
        :icon="currentScatterIcon"
        :title="currentTop5Title"
        :activeIndex="activeIndex"
      />
    </div>

    <div class="bottom">
      <div class="title">
        <div class="text">梯度培育成果</div>
        <div class="left-arrow"></div>
        <div class="right-arrow"></div>
      </div>
      <div class="chart-content">
        <!-- <div class="btn-container" @mouseenter="pauseBottomAutoSwitch" @mouseleave="resumeBottomAutoSwitch"> -->
        <div class="btn-container">
          <div
            class="btn-itm"
            :class="activeBottomIndex === item.dictItemCd ? 'active' : ''"
            v-for="item in bottomBtnList"
            :key="item.dictItemCd"
            :title="item.dictItemValue"
            @click="handleBottomBtnClick(item.dictItemCd)"
          >
            <div class="btn-text">{{ item.dictItemValue }}</div>
          </div>
        </div>
        <div
          class="chart-box"
          ref="chartBox"
          @mouseenter="pauseBottomTooltipAutoplay"
          @mouseleave="resumeBottomTooltipAutoplay"
        ></div>
      </div>
    </div>

    <!-- 企业列表弹窗 -->
    <EnterpriseListDialog
      v-model:visible="enterpriseDialogVisible"
      :title="enterpriseDialogTitle"
      :enterpriseType="currentEnterpriseType"
      dataSourceType="graduate"
      @open-portrait="handleOpenPortrait"
    />

    <!-- 企业画像弹窗 -->
    <EnterprisePortraitDialog
      v-model:visible="portraitVisible"
      :enterpriseName="currentEnterpriseName"
      :tdType="currentEnterpriseType"
      :enterprisePortrayalId="enterprisePortrayalId"
    />

    <!-- 四链融合弹窗 -->
    <FourLinkDialog
      :visible="currentMapType === 'fourLink'"
      @update:visible="(val) => !val && switchMapType('fiveColor')"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch, computed } from 'vue'
import * as echarts from 'echarts'
import FiveColorMap from './components/FiveColorMap.vue'
import ScatterMap from './components/ScatterMap.vue'
import FourLinkDialog from './components/fourLink/index.vue'
import EnterpriseListDialog from './components/EnterpriseListDialog.vue'
import EnterprisePortraitDialog from './components/portrait/index.vue'
import icon1 from '@/assets/images/icon-arrow1.png'
import icon2 from '@/assets/images/icon-arrow2.png'
import icon3 from '@/assets/images/icon-arrow3.png'
import icon4 from '@/assets/images/icon-arrow4.png'
import icon5 from '@/assets/images/icon-arrow5.png'
import { getLeftTopData, getDict } from '@/apis'
// import { useAutoSwitchTabs } from '@/utils/useAutoSwitchTabs'

defineOptions({
  name: 'HomeCenter'
})

const iconList = [icon1, icon2, icon3, icon4, icon5]
const colorList = ref(['#70FFC4', '#3CE3FF', '#FEDE73', '#00A8FC', '#A0E33C'])
const activeIndex = ref(null)
const hoverIndex = ref(null)
const activeBottomIndex = ref(null)
const chartBox = ref(null)
const scatterMap = ref(null)

// 底部图表 tooltip 自动轮播
let bottomTooltipTimer = null
let bottomTooltipResumeTimer = null
let bottomTooltipIndex = 0
let bottomTooltipPrevIndex = -1
const BOTTOM_TOOLTIP_INTERVAL_MS = 2500
const BOTTOM_TOOLTIP_RESUME_AFTER_INTERACT_MS = 8000

const stopBottomTooltipAutoplay = () => {
  if (bottomTooltipTimer) {
    clearInterval(bottomTooltipTimer)
    bottomTooltipTimer = null
  }
  if (bottomTooltipResumeTimer) {
    window.clearTimeout(bottomTooltipResumeTimer)
    bottomTooltipResumeTimer = null
  }
  bottomTooltipPrevIndex = -1
}

const showBottomTooltipAt = (dataIndex) => {
  if (!chartInstance) return
  const data = chartDataMap.value[activeBottomIndex.value] || chartDataMap.value['cxxzxqy']
  const len = data?.years?.length || 0
  if (!len) return

  const idx = ((dataIndex % len) + len) % len

  // 取消上一个高亮
  if (bottomTooltipPrevIndex >= 0 && bottomTooltipPrevIndex !== idx) {
    try {
      chartInstance.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: bottomTooltipPrevIndex })
      chartInstance.dispatchAction({ type: 'downplay', seriesIndex: 1, dataIndex: bottomTooltipPrevIndex })
      chartInstance.dispatchAction({ type: 'downplay', seriesIndex: 2, dataIndex: bottomTooltipPrevIndex })
    } catch {
      // ignore
    }
  }

  // 显示 tooltip（axis 触发，传任一 seriesIndex 即可）
  try {
    chartInstance.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: idx })
    chartInstance.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: idx })
    chartInstance.dispatchAction({ type: 'highlight', seriesIndex: 1, dataIndex: idx })
    chartInstance.dispatchAction({ type: 'highlight', seriesIndex: 2, dataIndex: idx })
  } catch {
    // ignore
  }

  bottomTooltipPrevIndex = idx
}

const startBottomTooltipAutoplay = (reset = false) => {
  stopBottomTooltipAutoplay()
  if (!chartInstance) return

  const data = chartDataMap.value[activeBottomIndex.value] || chartDataMap.value['cxxzxqy']
  const len = data?.years?.length || 0
  if (!len) return

  if (reset) {
    bottomTooltipIndex = 0
  }

  // 找第一个有数据的索引
  const getNextValidIndex = (d, startIdx) => {
    const l = d?.years?.length || 0
    for (let i = 0; i < l; i++) {
      const idx = (startIdx + i) % l
      const gt = d.grandTotal[idx]
      const cn = d.currentNum[idx]
      const ar = d.addRate[idx]
      // 判断是否有数据：非空、非零、非短横杠
      const hasData =
        (gt && gt !== '0' && gt !== '-' && gt !== '') ||
        (cn && cn !== '0' && cn !== '-' && cn !== '') ||
        (ar && ar !== '0' && ar !== '-' && ar !== '')
      if (hasData) return idx
    }
    return 0
  }

  bottomTooltipIndex = getNextValidIndex(data, bottomTooltipIndex % len)
  showBottomTooltipAt(bottomTooltipIndex)
  bottomTooltipIndex = (bottomTooltipIndex + 1) % len

  bottomTooltipTimer = setInterval(() => {
    const d = chartDataMap.value[activeBottomIndex.value] || chartDataMap.value['cxxzxqy']
    const l = d?.years?.length || 0
    if (!l) return

    bottomTooltipIndex = getNextValidIndex(d, bottomTooltipIndex % l)
    showBottomTooltipAt(bottomTooltipIndex)
    bottomTooltipIndex = (bottomTooltipIndex + 1) % l
  }, BOTTOM_TOOLTIP_INTERVAL_MS)
}

const pauseBottomTooltipThenResume = (ms = BOTTOM_TOOLTIP_RESUME_AFTER_INTERACT_MS) => {
  if (bottomTooltipTimer) {
    clearInterval(bottomTooltipTimer)
    bottomTooltipTimer = null
  }
  if (bottomTooltipResumeTimer) window.clearTimeout(bottomTooltipResumeTimer)
  bottomTooltipResumeTimer = window.setTimeout(() => {
    startBottomTooltipAutoplay()
  }, ms)
}

const pauseBottomTooltipAutoplay = () => {
  if (bottomTooltipTimer) {
    clearInterval(bottomTooltipTimer)
    bottomTooltipTimer = null
  }
  if (bottomTooltipResumeTimer) {
    window.clearTimeout(bottomTooltipResumeTimer)
    bottomTooltipResumeTimer = null
  }
}

const resumeBottomTooltipAutoplay = () => {
  startBottomTooltipAutoplay()
}

// 企业列表弹窗相关
const enterpriseDialogVisible = ref(false)
const enterpriseDialogTitle = ref('')
const currentEnterpriseType = ref('')

// 企业画像弹窗相关
const portraitVisible = ref(false)
const currentEnterpriseName = ref('')
const enterprisePortrayalId = ref('')
const handleOpenPortrait = (row) => {
  currentEnterpriseName.value = row.enterpriseName
  enterprisePortrayalId.value = row.enterprisePortrayalId
  portraitVisible.value = true
}

let chartInstance = null
const listData = [
  {
    name: '创新型中小企业',
    code: 'cxxzxqy',
    items: [
      { code: 'enterpriseNum', label: '企业总数', value: 0, unit: '家' },
      { code: 'cultivatePlanNum', label: '培育目标数', value: 0, unit: '家' },
      { code: 'cultivateNum', label: '培育完成数', value: 0, unit: '家' },
      { code: 'cultivateRate', label: '目标完成率', value: 0, unit: '%' }
    ],
    // <span style="color: #B9E8FF;"></span> <span style="color: #ffffff;"></span> <span style="color: #FEDE73;"></span>
    tooltipText:
      '<span style="color: #B9E8FF;">依据工业和信息化部关于印发<span style="color: #ffffff">《优质中小企业梯度培育管理办法》</span>的通知，<span style="color: #FEDE73;">创新型中小企业</span>具有较高专业化水平、较强创新能力和发展潜力，是优质中小企业的基础力量。</span>'
  },
  {
    name: '专精特新中小企业',
    code: 'zjtxzxqy',
    items: [
      { code: 'enterpriseNum', label: '企业总数', value: 0, unit: '家' },
      { code: 'cultivatePlanNum', label: '培育目标数', value: 0, unit: '家' },
      { code: 'cultivateNum', label: '培育完成数', value: 0, unit: '家' },
      { code: 'cultivateRate', label: '目标完成率', value: 0, unit: '%' }
    ],
    tooltipText:
      '<span style="color: #B9E8FF;">依据工业和信息化部关于印发《优质中小企业梯度培育管理办法》的通知第二条，</span><span style="color: #eb5252;font-weight: bold;">专精特新中小企业</span><span style="color: #B9E8FF;">实现专业化、精细化、特色化发展，创新能力强、质量效益好，是优质中小企业的骨干力量。</span>'
  },
  {
    name: '"小巨人"企业',
    code: 'xjrqy',
    items: [
      { code: 'enterpriseNum', label: '企业总数', value: 0, unit: '家' },
      { code: 'cultivatePlanNum', label: '培育目标数', value: 0, unit: '家' },
      { code: 'cultivateNum', label: '培育完成数', value: 0, unit: '家' },
      { code: 'cultivateRate', label: '目标完成率', value: 0, unit: '%' }
    ],
    tooltipText:
      '<span style="color: #B9E8FF;">依据工业和信息化部关于印发《优质中小企业梯度培育管理办法》的通知第二条，</span><span style="color: #eb5252;font-weight: bold;">专精特新“小巨人”企业</span><span style="color: #B9E8FF;">位于产业基础核心领域、产业链关键环节，创新能力突出、掌握核心技术、细分市场占有率高、质量效益好，是优质中小企业的中坚力量。</span>'
  },
  {
    name: '市级单项冠军',
    code: 'sjdxgj',
    items: [
      { code: 'enterpriseNum', label: '企业总数', value: 0, unit: '家' },
      { code: 'cultivatePlanNum', label: '培育目标数', value: 0, unit: '家' },
      { code: 'cultivateNum', label: '培育完成数', value: 0, unit: '家' },
      { code: 'cultivateRate', label: '目标完成率', value: 0, unit: '%' }
    ],
    tooltipText:
      '<span style="color: #B9E8FF;">依据工业和信息化部<span style="color: #ffffff;">《制造业单项冠军企业认定管理办法》</span> <span style="color: #ffffff;">《重庆市制造业单项冠军企业认定管理办法》</span><span style="color: #FEDE73;">市级单项冠军企业</span>是市级工信部门认定的、长期专注制造业特定细分领域，技术 / 工艺国内先进、单项产品（生产性服务）市场占有率居国内前列的企业，是国家级单项冠军的储备与培育对象。</span>'
  },
  {
    name: '国家级单项冠军',
    code: 'gjjdxgj',
    items: [
      { code: 'enterpriseNum', label: '企业总数', value: 0, unit: '家' },
      { code: 'cultivatePlanNum', label: '培育目标数', value: 0, unit: '家' },
      { code: 'cultivateNum', label: '培育完成数', value: 0, unit: '家' },
      { code: 'cultivateRate', label: '目标完成率', value: 0, unit: '%' }
    ],
    tooltipText:
      '<span style="color: #B9E8FF;">依据工业和信息化部<span style="color: #ffffff;">《制造业单项冠军企业认定管理办法》</span>第二条，<span style="color: #FEDE73;">国家级单项冠军</span>是指指长期专注制造业特定细分领域，生产技术或工艺国际先进，单项产品（生产性服务）市场占有率位居全球前列。</span>'
  }
]
const getTopListData = async () => {
  try {
    const res = await getLeftTopData({
      belongModel: 'dpdb'
    })
    if (res && res.data && res.data.code === 100000 && res.data.data) {
      const data = res.data?.data || []
      listData.forEach((i) => {
        const target = data?.find((it) => it.indexCode === i.code)
        const targetToData = JSON.parse(target.indexValue)
        if (targetToData) {
          i.items.forEach((it) => {
            it.value = targetToData[it.code]?.replace('家', '')?.replace('%', '')
          })
        }
      })
    }
  } catch (err) {
    console.error('获取顶部指标失败', err)
  }
}
const bottomBtnList = ref()
import { useStore } from 'vuex'
const store = useStore()

// 当前地图类型: 'fiveColor' | 'scatter' | 'fourLink'
const currentMapType = computed({
  get: () => store.state.currentMapType,
  set: (val) => store.commit('SET_CURRENT_MAP_TYPE', val)
})

// 当前散点图图标
const currentScatterIcon = ref('')

// 计算 Top 5 列表标题
const currentTop5Title = computed(() => {
  if (currentMapType.value === 'fiveColor') {
    return '各区县专精特新中小企业数量排名TOP5'
  }
  if (currentMapType.value === 'scatter' && activeIndex.value !== null) {
    const currentItem = listData[activeIndex.value]
    return currentItem ? `各区县${currentItem.name}数量排名TOP5` : '排名TOP5'
  }
  return '排名TOP5'
})

// 切换地图类型
const switchMapType = (type) => {
  currentMapType.value = type
  activeIndex.value = null
}

// 点击企业卡片：打开弹窗 + 切换地图
const handleEnterpriseClick = (item, index) => {
  console.log(item, index, 'item, index')
  // 打开企业列表弹窗
  enterpriseDialogTitle.value = `${item.name}列表`
  currentEnterpriseType.value = item.code
  enterpriseDialogVisible.value = true
}
const bottomActiveIndex = ref(0)

// const { pause: pauseBottomAutoSwitch, resume: resumeBottomAutoSwitch } = useAutoSwitchTabs(
//   bottomActiveIndex,
//   bottomBtnList,
//   {
//     intervalMs: 3000,
//     autostart: true
//   }
// )
// 切换散点图类型
const switchScatterType = (index) => {
  const list = ['cxxzxqy', 'zjtxzxqy', 'xjrqy', 'sjdxgj', 'gjjdxgj']
  activeIndex.value = index
  currentMapType.value = 'scatter'
  currentScatterIcon.value = iconList[index]
  activeBottomIndex.value = list[index]
  // pauseBottomAutoSwitch()
  nextTick(() => {
    console.log(scatterMap.value, 'scatterMap.value')
    scatterMap.value?.hideTooltip()
  })
}
// 图表数据配置（根据按钮切换）
const chartDataMap = ref({
  cxxzxqy: {
    years: [],
    grandTotal: [],
    currentNum: [],
    addRate: []
  },
  zjtxzxqy: {
    years: [],
    grandTotal: [],
    currentNum: [],
    addRate: []
  },
  xjrqy: {
    years: [],
    grandTotal: [],
    currentNum: [],
    addRate: []
  },
  sjdxgj: {
    years: [],
    grandTotal: [],
    currentNum: [],
    addRate: []
  },
  gjjdxgj: {
    years: [],
    grandTotal: [],
    currentNum: [],
    addRate: []
  }
})

const initChart = () => {
  if (!chartBox.value) return
  chartInstance = echarts.init(chartBox.value)
  updateChart()
}

const updateChart = () => {
  if (!chartInstance) return
  const data = chartDataMap.value[activeBottomIndex.value] || chartDataMap.value['cxxzxqy']
  const years = data.years
  chartInstance.setOption({
    backgroundColor: 'transparent',
    grid: {
      left: '5%',
      right: '5%',
      top: '23%',
      bottom: '0',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLine: {
        lineStyle: {
          color: '#4A7A9C'
        }
      },
      axisLabel: {
        color: '#B9E8FF',
        fontSize: 12,
        fontFamily: 'Alibaba-PuHuiTi-Regular'
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '单位: 家',
        nameLocation: 'end',
        nameGap: 15,
        nameTextStyle: {
          color: '#B9E8FF',
          fontSize: 12,
          fontFamily: 'Alibaba-PuHuiTi-Regular'
        },
        axisLine: {
          lineStyle: {
            color: '#4A7A9C'
          }
        },
        axisLabel: {
          color: '#B9E8FF',
          fontSize: 12,
          formatter: '{value}',
          fontFamily: 'Alibaba-PuHuiTi-Regular'
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(74, 122, 156, 0.3)',
            type: 'dashed'
          }
        }
      },
      {
        type: 'value',
        name: '单位: %',
        nameLocation: 'end',
        nameGap: 15,
        nameTextStyle: {
          color: '#B9E8FF',
          fontSize: 12,
          fontFamily: 'Alibaba-PuHuiTi-Regular'
        },
        axisLine: {
          lineStyle: {
            color: '#4A7A9C'
          }
        },
        axisLabel: {
          color: '#B9E8FF',
          fontSize: 12,
          fontFamily: 'Alibaba-PuHuiTi-Regular',

          formatter: '{value}'
        },
        splitLine: {
          show: false
        }
      }
    ],
    legend: {
      data: ['累计数', '本年度数', '累计增长率'],
      top: '5%',
      textStyle: {
        color: '#B9E8FF',
        fontSize: 12,
        fontFamily: 'Alibaba-PuHuiTi-Regular'
      },
      itemWidth: 12,
      itemHeight: 12
    },
    series: [
      {
        name: '累计数',
        type: 'bar',
        yAxisIndex: 0,
        data: data.grandTotal,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#008AFF' },
              { offset: 1, color: 'rgba(0, 138, 255, 0.3)' }
            ]
          }
        },
        barWidth: '30%'
      },
      {
        name: '本年度数',
        type: 'bar',
        yAxisIndex: 0,
        data: data.currentNum,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#FEDE73' },
              { offset: 1, color: 'rgba(254, 222, 115, 0.3)' }
            ]
          }
        },
        barWidth: '30%'
      },
      {
        name: '累计增长率',
        type: 'line',
        yAxisIndex: 1,
        data: data.addRate,
        itemStyle: {
          color: '#FFFFFF',
          borderColor: '#3CE3FF',
          borderWidth: 2,
          shadowBlur: 10,
          shadowColor: '#3CE3FF'
        },
        lineStyle: {
          width: 2,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#3CE3FF' },
              { offset: 1, color: 'rgba(60, 227, 255, 0.3)' }
            ]
          }
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(60, 227, 255, 0.3)' },
              { offset: 1, color: 'rgba(60, 227, 255, 0)' }
            ]
          }
        },
        symbol: 'circle',
        symbolSize: 8,
        emphasis: {
          itemStyle: {
            color: '#FFFFFF',
            borderColor: '#3CE3FF',
            borderWidth: 3,
            shadowBlur: 15,
            shadowColor: '#3CE3FF'
          },
          symbolSize: 10
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: 'transparent',
      extraCssText: 'z-index: 1;',
      textStyle: {
        color: '#B9E8FF',
        fontFamily: 'Alibaba-PuHuiTi-2'
      },
      formatter: function (params) {
        let result = params[0].axisValue + '<br/>'
        params.forEach((param) => {
          let unit = ''
          if (param.seriesName === '累计增长率') {
            unit = '%'
          } else {
            unit = '家'
          }
          result += `${param.marker}${param.seriesName}: ${param.value}${unit}<br/>`
        })
        return result
      }
    }
  })

  // option 更新后重启 tooltip 轮播（等一帧确保渲染完成）
  window.setTimeout(() => {
    startBottomTooltipAutoplay(true)
  }, 0)
}

const switchBottomBtn = (index) => {
  activeBottomIndex.value = index
  updateChart()
}

// bottom tab 自动轮播：activeIndex(数字) <-> activeBottomIndex(dictItemCd)
const syncBottomIndexByCd = (cd) => {
  const list = bottomBtnList.value || []
  const idx = list.findIndex((it) => it.dictItemCd === cd)
  return idx >= 0 ? idx : 0
}

watch(
  () => activeBottomIndex.value,
  (cd) => {
    if (!cd) return
    const idx = syncBottomIndexByCd(cd)
    if (bottomActiveIndex.value !== idx) bottomActiveIndex.value = idx
  }
)

watch(
  () => bottomActiveIndex.value,
  (idx) => {
    const list = bottomBtnList.value || []
    const nextCd = list?.[idx]?.dictItemCd
    if (nextCd && nextCd !== activeBottomIndex.value) switchBottomBtn(nextCd)
  }
)

const handleBottomBtnClick = (cd) => {
  switchBottomBtn(cd)
  // 用户手动点击后暂停自动轮播
  // pauseBottomAutoSwitch()
  pauseBottomTooltipThenResume()
}

// 监听窗口大小变化
watch(
  () => activeBottomIndex.value,
  () => {
    nextTick(() => {
      updateChart()
    })
  }
)
const getBottomBtnData = async () => {
  const res = await getDict({
    dictCateCd: 'gradient_type'
  })
  if (res && res.data && res.data.code === 100000 && res.data.data) {
    bottomBtnList.value = res.data?.data || []
    activeBottomIndex.value = 'cxxzxqy'
    bottomActiveIndex.value = syncBottomIndexByCd(activeBottomIndex.value)
    nextTick(() => {
      updateChart()
    })
  }
}
const getBottomData = async () => {
  const res = await getLeftTopData({
    belongModel: 'tdpyjg'
  })
  getBottomBtnData()
  if (res && res.data && res.data.code === 100000 && res.data.data) {
    transChartData(res?.data?.data || [])
  }
}
const transChartData = (data) => {
  const keys = Object.keys(chartDataMap.value)
  keys.forEach((it) => {
    const targetList = data
      ?.filter((item) => item.indexCode === it)
      ?.sort((a, b) => {
        const yearA = parseInt(a.indexUnit) // parseInt() 会从字符串开头解析数字，遇到非数字停止
        const yearB = parseInt(b.indexUnit)
        return yearA - yearB // 升序
      })
    const years = targetList?.map((item) => {
      return item.indexUnit
    })
    const grandTotal = targetList.map((it) => {
      const toObjectValue = JSON.parse(it.indexValue)
      return toObjectValue['grandTotal']?.replace('家', '')
    })
    const currentNum = targetList.map((it) => {
      const toObjectValue = JSON.parse(it.indexValue)
      return toObjectValue['currentNum']?.replace('家', '')
    })
    const addRate = targetList.map((it) => {
      const toObjectValue = JSON.parse(it.indexValue)
      return toObjectValue['addRate']?.replace('%', '')
    })
    chartDataMap.value[it] = {
      years,
      grandTotal,
      currentNum,
      addRate
    }
  })
}
const handleBottomChartResize = () => {
  if (chartInstance) chartInstance.resize()
}

onMounted(() => {
  nextTick(() => {
    initChart()
  })
  getTopListData()
  getBottomData()
  // 监听窗口大小变化，重新调整图表
  window.addEventListener('resize', handleBottomChartResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleBottomChartResize)
  stopBottomTooltipAutoplay()
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
  currentMapType.value = 'fiveColor'
})
</script>

<style lang="scss" scoped>
.home-center-wrapper {
  width: 100%;
  height: 100%;
  background: rgba(9, 54, 100, 0.26);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.top {
  width: 100%;
  height: 181px;
  position: relative;
  background: url('@/assets/images/center/img_项目建设背景.png') no-repeat center center;
  background-size: cover;
  display: flex;
  gap: 6px;
  .btn-container {
    flex: 1;
    height: 181px;
    position: relative;

    .light-icon {
      width: 141px;
      height: 181px;
      background: url('@/assets/images/灯光素材1.png') no-repeat center center;
      background-size: cover;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      z-index: 1;
      pointer-events: none;
      opacity: 0;
      animation: lightPulse 10s linear infinite;
    }

    &:nth-child(1) .light-icon {
      --max-opacity: 0.75;
      animation-delay: 0s;
    }
    &:nth-child(2) .light-icon {
      --max-opacity: 0.8;
      animation-delay: 2s;
    }
    &:nth-child(3) .light-icon {
      --max-opacity: 0.85;
      animation-delay: 4s;
    }
    &:nth-child(4) .light-icon {
      --max-opacity: 0.9;
      animation-delay: 6s;
    }
    &:nth-child(5) .light-icon {
      --max-opacity: 1;
      animation-delay: 8s;
    }

    .four-icon {
      width: 16px;
      height: 16px;
      background: url('@/assets/images/center/img_目标完成图例.png') no-repeat center center;
      background-size: cover;
      position: absolute;
      right: 5px;
      top: 115px;
    }
    &::after {
      content: '';
      position: absolute;
      right: -3px;
      top: 65%;
      transform: translateY(-50%);
      width: 1px;
      height: 60%;
      border-right: 1px solid;
      border-image: linear-gradient(180deg, rgba(55, 192, 255, 0), rgba(55, 192, 255, 1), rgba(55, 192, 255, 0)) 1 1;
    }

    &:last-child::after {
      display: none;
    }

    .title {
      position: relative;
      z-index: 2;
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-family: Alibaba-PuHuiTi-2;
      font-weight: normal;
      font-size: 16px;
      color: #ffffff;
      background: url('@/assets/images/center/核心指标_创新_默认.png') no-repeat center center;
      background-size: cover;
      cursor: pointer;
      &.active {
        background: url('@/assets/images/center/核心指标_创新_选中.png') no-repeat center center;
        background-size: cover;
      }
      &:hover {
        background: url('@/assets/images/center/核心指标_创新_选中.png') no-repeat center center;
        background-size: cover;
        .intro-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
      }
      position: relative;
      .intro-tooltip {
        position: absolute;
        left: 12px;
        top: calc(100% - 6px);
        z-index: 9999;

        width: 380px;
        max-width: calc(100vw - 80px);
        min-height: 78px;
        box-sizing: border-box;
        color: #ffffff;

        padding: 26px 26px 30px 26px;
        // background: url('@/assets/images/img_引进词弹窗.png') no-repeat center center;
        background: url('@/assets/images/img_梯度选种引进词弹窗.png') no-repeat center center;

        background-size: 100% 100%;

        font-family: Alibaba-PuHuiTi-2;
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        text-align: left;
        letter-spacing: 2px;
        // color: rgba(185, 232, 255, 0.95);

        opacity: 1;
        visibility: hidden;
        transform: translateY(4px);
        transition:
          opacity 0.15s ease,
          transform 0.15s ease,
          visibility 0.15s ease;
        pointer-events: none;
        white-space: normal;
        word-break: break-all;
        .info-text-bule {
          color: red !important;
        }
      }
    }
    .value-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 4px;
      margin-top: 12px;
      position: relative;
      z-index: 0;
      .value-item {
        width: 73px;
        height: 56px;
        background: rgba(9, 54, 100, 0.26);
        border-radius: 4px 4px 4px 4px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        box-sizing: border-box;
        padding-left: 8px;
        &.active {
          background: rgba(86, 69, 11, 0.26);
        }
        .value-text {
          font-size: 16px;
          color: #ffffff;
          .unit {
            font-family: Alibaba-PuHuiTi-2;
            font-weight: normal;
            font-size: 16px;
            color: #b9e8ff;
          }
        }
        .value-title {
          font-family: Alibaba-PuHuiTi-2;
          font-weight: normal;
          font-size: 12px;
          color: #b9e8ff;
        }
      }
    }
  }
}

.center {
  width: 100%;
  height: 580px;
  /* 背景图可以根据需要保留或移除，如果组件内部是透明的 */
  background: url('@/assets/images/img_map.png') no-repeat center center;
  background-size: cover;
  position: relative; /* 确保子组件绝对定位（如果有）能正常工作 */
  .five-btn {
    position: absolute;
    background: url('@/assets/images/center/btn_企业分布五色图_默认色.png') no-repeat center center;
    background-size: cover;
    width: 121px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 10px;
    top: 10px;
    cursor: pointer;
    font-family: Alibaba-PuHuiTi-2;
    font-weight: normal;
    font-size: 14px;
    color: #ffffff;
    z-index: 1;
  }
}
.bottom {
  width: 100%;
  height: 194px;
  .title {
    width: 100%;
    height: 40px;
    background: url('@/assets/images/center/img_特殊标题梯度培育成果bg2.png') no-repeat center center;
    background-size: cover;
    font-family: Alibaba-PuHuiTi-2;
    font-weight: bold;
    font-size: 24px;
    color: #f6f9fe;
    text-align: center;
    position: relative;

    .text {
      background: linear-gradient(180deg, #ffffff 0%, #92deff 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
    .left-arrow {
      width: 20px;
      height: 20px;
      background: url('@/assets/images/center/左箭头.png') no-repeat center center;
      background-size: cover;
      position: absolute;
      left: 35%;
      top: 50%;
      transform: translateY(-50%);
      animation: moveLeft 6s ease-in-out infinite;
    }
    .right-arrow {
      width: 20px;
      height: 20px;
      background: url('@/assets/images/center/右箭头.png') no-repeat center center;
      background-size: cover;
      position: absolute;
      right: 35%;
      top: 50%;
      transform: translateY(-50%);
      animation: moveRight 6s ease-in-out infinite;
    }

    @keyframes moveLeft {
      0%,
      100% {
        transform: translateY(-50%) translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateY(-50%) translateX(-260px);
        opacity: 0.4;
      }
    }

    @keyframes moveRight {
      0%,
      100% {
        transform: translateY(-50%) translateX(0);
        opacity: 1;
      }
      50% {
        transform: translateY(-50%) translateX(260px);
        opacity: 0.4;
      }
    }
  }
  .chart-content {
    display: flex;
    box-sizing: border-box;
    height: calc(100% - 40px);
    .btn-container {
      width: 176px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-left: 12px;
      margin-top: 7px;
      .btn-itm {
        width: 100%;
        height: 24px;
        font-family: Alibaba-PuHuiTi-2;
        user-select: none;
        font-weight: normal;
        font-size: 14px;
        color: #c9e9f8;
        text-align: center;
        background: url('@/assets/images/center/培育成果_创新型_默认色.png') no-repeat center center;
        background-size: cover;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        .btn-text {
          width: 120px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        &:hover {
          background: url('@/assets/images/center/培育成果_黄色.png') no-repeat center center;
          background-size: cover;
        }
        &.active {
          background: url('@/assets/images/center/培育成果_创新型_选中色.png') no-repeat center center;
          background-size: cover;
          color: #3ce3ff;
        }
      }
    }
    .chart-box {
      height: calc(100% - 7px);
      margin-top: 7px;
      flex: 1;
    }
  }
}
@keyframes moveDiv {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(50%);
    opacity: 0;
  }
}

@keyframes lightPulse {
  0%,
  20%,
  100% {
    opacity: 0;
  }
  10% {
    opacity: var(--max-opacity, 1);
  }
  18% {
    opacity: var(--max-opacity, 1);
  }
}
</style>
