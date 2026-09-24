<template>
  <div class="map-container">
    <div class="echarts-map" ref="chartRef"></div>

    <!-- 左上角 Top 5 列表 -->
    <TopFiveList :data="top5Data" title="各区县优质中小企业数量排名TOP5" />

    <!-- 悬浮框 -->
    <MapTooltip
      v-if="showTooltip"
      :title="tooltipData.title"
      :items="tooltipData.items"
      :gradient="tooltipData.gradient"
      @mouseenter="stopAutoplay"
      @mouseleave="startAutoplay"
      :style="{
        position: 'absolute',
        left: tooltipPosition.left + 'px',
        top: tooltipPosition.top + 'px',
        transform: 'translate(-50%, -100%)',
        zIndex: 100
      }"
      @detail="handleDetailClick"
      :countryNm="countryNm"
      mapType="1"
      @stop="stopAutoplay"
      @start="startAutoplay"
    />

    <!-- 右下角图例 -->
    <div class="legend-panel">
      <div class="rect-class"></div>
      <div class="legend-title">企业分布热点区域</div>
      <div class="bottom-line"></div>
      <div class="legend-list">
        <div
          class="legend-item"
          v-for="(item, index) in legendItems"
          :key="index"
          :style="{ background: getBgColor(index) }"
        >
          <span class="color-block" :style="{ backgroundColor: item.color }"></span>
          <span class="legend-label">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, reactive, onActivated, onDeactivated, nextTick } from 'vue'
import * as echarts from 'echarts'
import rawCqGeoJSON from '@/assets/geoJson/chongqing1.json'
import rawCqMainGeoJSON from '@/assets/geoJson/cqZC1.json'
import TopFiveList from './TopFiveList.vue'
import MapTooltip from './MapTooltip.vue'
import { getMapData } from '@/apis'
import { updateGuideLine, mergeCenterCityInGeoJSON } from '../mapUtils'
const top5Data = ref([])
const chartRef = ref(null)
let chartInstance = null
const fiveColorMapData = ref([
  { name: '两江新区', value: 4500 },
  { name: '渝中区', value: 3200 } // 属于 2000-3000
])
const countryNm = ref('')
// Tooltip 状态
const showTooltip = ref(false)
const tooltipPosition = reactive({ left: 0, top: 0 })
const tooltipData = reactive({
  title: '',
  items: [],
  gradient: []
})
// 自动轮播 Tooltip
let autoplayTimer = null
let autoplayResumeTimer = null
let autoplayIndex = 0
let lastHighlightName = ''
const AUTOPLAY_INTERVAL_MS = 3000
const AUTOPLAY_RESUME_AFTER_CLICK_MS = 8000
const featureCenterMapMain = new Map() // name -> [lng, lat]（大地图 geoIndex: 1）
const featureCenterMapZC = new Map() // name -> [lng, lat]（小地图 geoIndex: 3）

const parseCenter = (value) => {
  if (Array.isArray(value) && value.length >= 2) {
    const lng = Number(value[0])
    const lat = Number(value[1])
    if (Number.isFinite(lng) && Number.isFinite(lat)) return [lng, lat]
  }
  if (typeof value === 'string') {
    const [lng, lat] = value.split(',').map((n) => Number(n))
    if (Number.isFinite(lng) && Number.isFinite(lat)) return [lng, lat]
  }
  return null
}

// 兼容后端/文件两种地图结构：
// 1) 标准 FeatureCollection
// 2) 数组结构（每项包含 featureCollection）
const normalizeGeoJSON = (rawGeo) => {
  if (rawGeo && rawGeo.type === 'FeatureCollection' && Array.isArray(rawGeo.features)) {
    return rawGeo
  }
  if (!Array.isArray(rawGeo)) {
    return { type: 'FeatureCollection', features: [] }
  }

  const features = []
  rawGeo.forEach((item) => {
    const sourceFeatures = item?.featureCollection?.features
    if (!Array.isArray(sourceFeatures)) return

    sourceFeatures.forEach((feature) => {
      const cp =
        parseCenter(feature?.properties?.cp) || parseCenter(item?.center) || parseCenter(feature?.properties?.center)
      features.push({
        ...feature,
        type: 'Feature',
        properties: {
          ...(feature?.properties || {}),
          name: item?.name || feature?.properties?.name,
          adcode: item?.code || feature?.properties?.code,
          cp
        }
      })
    })
  })

  return {
    type: 'FeatureCollection',
    features
  }
}

const buildFeatureCenterMap = (geoJSON, targetMap) => {
  targetMap.clear()
  const features = geoJSON?.features || []
  features.forEach((feature) => {
    const name = feature?.properties?.name
    if (!name) return
    const cp = parseCenter(feature?.properties?.cp) || parseCenter(feature?.properties?.center)
    if (cp) {
      targetMap.set(name, cp)
    }
  })
}

// 按地理位置从左（西）到右（东）排序的区域列表，最后是中心城区
const AUTOPLAY_ORDER = [
  // 渝西片区（西部）
  '潼南区',
  '铜梁区',
  '大足区',
  '荣昌区',
  '永川区',
  '璧山区',
  '合川区',
  // 西南部
  '江津区',
  // 中南部
  '綦江区',
  '万盛经开区',
  // 渝东南片区（南部）
  '南川区',
  '武隆区',
  '彭水苗族土家族自治县',
  '黔江区',
  '酉阳土家族苗族自治县',
  '秀山土家族苗族自治县',
  // 中东部
  '涪陵区',
  '长寿区',
  '垫江县',
  '丰都县',
  '石柱土家族自治县',
  '忠县',
  // 渝东北片区（东北部）
  '梁平区',
  '万州区',
  '开州区',
  '云阳县',
  '奉节县',
  '巫山县',
  '巫溪县',
  '城口县',
  // 最后是中心城区（小地图）
  '渝中区',
  '大渡口区',
  '江北区',
  '沙坪坝区',
  '九龙坡区',
  '南岸区',
  '北碚区',
  '巴南区',
  '两江新区'
]

// 小地图配置
const mapRectConfig = {
  rectWidth: 153,
  rectHeight: 231,
  rectLeftPercent: 0.3,
  rectTopPercent: 0.04
}

// 图例配置 (对应 visualMap 的 pieces)
const legendItems = [
  { min: 800, max: 999999, label: '800家以上', color: '#D54B43' }, // 红
  { min: 500, max: 800, label: '500-800家', color: '#D57343' }, // 橙
  { min: 300, max: 500, label: '300-500家', color: '#F1C42F' }, // 黄
  { min: 150, max: 300, label: '150-300家', color: '#31D8F2' }, // 蓝
  { min: 0, max: 150, label: '0-150家', color: '#12BA73' } // 绿
]

// 点击详情
const handleDetailClick = () => {
  console.log('点击了详情', tooltipData.title)
  // 这里可以抛出事件或者跳转
}

// 隐藏 Tooltip
const hideTooltip = () => {
  showTooltip.value = false
  if (chartInstance && lastHighlightName) {
    try {
      chartInstance.dispatchAction({ type: 'downplay', seriesIndex: 0, name: lastHighlightName })
      chartInstance.dispatchAction({ type: 'downplay', seriesIndex: 1, name: lastHighlightName })
    } catch {
      // ignore
    }
    lastHighlightName = ''
  }
}

const getAutoplayNames = () => {
  const dataNames = new Set((fiveColorMapData.value || []).map((d) => d?.name).filter(Boolean))
  // 与点击逻辑保持一致：不轮播“高新区/中心城区”
  dataNames.delete('高新区')
  dataNames.delete('中心城区')

  // 按预定义顺序（从左到右，最后是中心城区）过滤，仅保留有数据且能定位到中心点的区域
  const result = []
  AUTOPLAY_ORDER.forEach((name) => {
    if (!dataNames.has(name)) return
    if (featureCenterMapMain.has(name) || featureCenterMapZC.has(name)) {
      result.push(name)
    }
  })

  // 如果有数据中存在但不在预定义列表中的区域，追加到末尾
  dataNames.forEach((name) => {
    if (!AUTOPLAY_ORDER.includes(name) && (featureCenterMapMain.has(name) || featureCenterMapZC.has(name))) {
      result.push(name)
    }
  })

  return result
}

const showTooltipByName = (name) => {
  if (!chartInstance || !name) return

  const lngLatMain = featureCenterMapMain.get(name)
  const lngLatZC = featureCenterMapZC.get(name)
  const useGeoIndex = lngLatMain ? 1 : 3
  const lngLat = lngLatMain || lngLatZC
  if (!lngLat) return

  // 高亮当前区域
  if (lastHighlightName && lastHighlightName !== name) {
    try {
      chartInstance.dispatchAction({ type: 'downplay', seriesIndex: 0, name: lastHighlightName })
      chartInstance.dispatchAction({ type: 'downplay', seriesIndex: 1, name: lastHighlightName })
    } catch {
      // ignore
    }
  }
  try {
    chartInstance.dispatchAction({ type: 'highlight', seriesIndex: 0, name })
    chartInstance.dispatchAction({ type: 'highlight', seriesIndex: 1, name })
  } catch {
    // ignore
  }
  lastHighlightName = name

  // 更新 Tooltip 数据
  tooltipData.title = name
  const v = (fiveColorMapData.value || []).find((d) => d?.name === name)
  tooltipData.items = [{ label: '认定企业数', value: (Number(v?.value) || 0) + '家' }]
  tooltipData.gradient = v?.gradient || {}
  // 计算位置：经纬度 -> 像素坐标
  const pixel = chartInstance.convertToPixel({ geoIndex: useGeoIndex }, lngLat)
  if (pixel && Array.isArray(pixel) && pixel.length >= 2) {
    tooltipPosition.left = pixel[0]
    tooltipPosition.top = pixel[1] - 10
    showTooltip.value = true
  }
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
  if (autoplayResumeTimer) {
    window.clearTimeout(autoplayResumeTimer)
    autoplayResumeTimer = null
  }
}

const startAutoplay = () => {
  stopAutoplay()
  const names = getAutoplayNames()
  if (!names.length) return

  // 立刻先展示一个，避免等待间隔
  autoplayIndex = autoplayIndex % names.length
  showTooltipByName(names[autoplayIndex])
  autoplayIndex = (autoplayIndex + 1) % names.length

  autoplayTimer = setInterval(() => {
    const list = getAutoplayNames()
    if (!list.length) return
    autoplayIndex = autoplayIndex % list.length
    showTooltipByName(list[autoplayIndex])
    autoplayIndex = (autoplayIndex + 1) % list.length
  }, AUTOPLAY_INTERVAL_MS)
}

const pauseAutoplayThenResume = (ms = AUTOPLAY_RESUME_AFTER_CLICK_MS) => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
  if (autoplayResumeTimer) window.clearTimeout(autoplayResumeTimer)
  autoplayResumeTimer = window.setTimeout(() => {
    startAutoplay()
  }, ms)
}

const initMap = () => {
  if (!chartRef.value) return

  if (chartInstance) {
    chartInstance.dispose()
  }

  let cqGeoJSON = normalizeGeoJSON(rawCqGeoJSON)
  const cqMainGeoJSON = normalizeGeoJSON(rawCqMainGeoJSON)

  const centerCityNamesList = [
    '渝中区',
    '大渡口区',
    '沙坪坝区',
    '九龙坡区',
    '南岸区',
    '北碚区',
    '巴南区',
    '渝北区',
    '江北区',
    '两江新区',
    '高新区'
  ]
  cqGeoJSON = mergeCenterCityInGeoJSON(cqGeoJSON, centerCityNamesList)

  buildFeatureCenterMap(cqGeoJSON, featureCenterMapMain)
  buildFeatureCenterMap(cqMainGeoJSON, featureCenterMapZC)

  echarts.registerMap('chongqing', cqGeoJSON)
  echarts.registerMap('cqMain', cqMainGeoJSON)

  chartInstance = echarts.init(chartRef.value)

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      show: false,
      trigger: 'item',
      formatter: '{b}: {c}家'
    },
    // 视觉映射组件，控制五色图颜色
    visualMap: {
      type: 'piecewise',
      left: -9999, // 隐藏 echarts 自带的 visualMap 组件，使用自定义 HTML 图例
      pieces: legendItems.map((item) => ({
        min: item.min,
        max: item.max,
        color: item.color
      })),
      show: false // 不显示默认控件
    },
    geo: [
      // 阴影层
      {
        map: 'chongqing',
        roam: false,
        layoutCenter: ['56%', '52%'],
        layoutSize: '115%',
        aspectScale: 1.0, // 保持一致
        label: { show: false },
        itemStyle: {
          areaColor: '#072b4d',
          borderColor: '#091e42',
          borderWidth: 1,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10
        },
        zlevel: 1,
        silent: true
      },
      // 交互层
      {
        map: 'chongqing',
        roam: false,
        layoutCenter: ['55%', '50%'],
        layoutSize: '115%',
        aspectScale: 1.0, // 保持一致
        label: {
          show: true,
          color: '#FFFFFF',
          fontSize: 14,
          fontFamily: 'Alibaba-PuHuiTi-2',
          fontWeight: 'normal'
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
          shadowColor: 'rgba(0, 0, 0, 0.4)',
          shadowBlur: 5
        },
        emphasis: {
          itemStyle: {
            areaColor: '#2b91b7',
            shadowBlur: 10
          },
          label: { color: '#fff' }
        },
        zlevel: 2
      },
      // 小地图阴影
      {
        map: 'cqMain',
        roam: false,
        left: '31%', // 稍微偏移
        top: '5%', // 稍微偏移
        width: mapRectConfig.rectWidth,
        height: mapRectConfig.rectHeight,
        label: { show: false },
        itemStyle: {
          areaColor: '#072b4d',
          borderColor: '#091e42',
          borderWidth: 1,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10
        },
        zlevel: 3,
        silent: true
      },
      // 小地图
      {
        map: 'cqMain',
        roam: false,
        left: '30%',
        top: '4%',
        width: mapRectConfig.rectWidth,
        height: mapRectConfig.rectHeight,
        label: {
          show: true,
          color: '#FFFFFF',
          fontSize: 14,
          fontFamily: 'Alibaba-PuHuiTi-2',
          fontWeight: 'bold'
        },
        itemStyle: {
          // areaColor: '#0e4c7d', // 删除默认颜色，让 visualMap 控制
          borderColor: '#4fd2dd',
          borderWidth: 1,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10
        },
        emphasis: {
          itemStyle: { areaColor: '#2b91b7' },
          label: { color: '#fff' }
        },
        zlevel: 4
      }
    ],
    series: [
      // 全市五色图数据
      {
        type: 'map',
        map: 'chongqing',
        geoIndex: 1, // 绑定到交互层
        data: fiveColorMapData.value
      },
      // 小地图数据 - 绑定 visualMap
      {
        type: 'map',
        map: 'cqMain',
        geoIndex: 3, // 绑定到小地图交互层 (index 3)
        data: fiveColorMapData.value // 复用数据，visualMap 会自动根据 name 匹配两江新区的数据并染色
      }
    ],
    // 指引线
    graphic: [
      {
        id: 'map-guide-group',
        type: 'group',
        left: '30%',
        top: '4%',
        zlevel: 10,
        children: [
          {
            type: 'rect',
            shape: { x: 0, y: 0, width: mapRectConfig.rectWidth, height: mapRectConfig.rectHeight },
            style: { stroke: '#fff', lineWidth: 1, fill: 'none', lineDash: [5, 5] }
          },
          {
            id: 'map-guide-line',
            type: 'polyline',
            shape: { points: [] },
            zlevel: 11,
            style: { stroke: '#fff', lineWidth: 1, lineDash: [5, 5] }
          }
        ]
      }
    ]
  }

  chartInstance.setOption(option)

  // 初始计算一次引导线

  setTimeout(() => {
    updateGuideLine(chartInstance, chartRef.value, cqGeoJSON, mapRectConfig)
  }, 100)

  // 监听点击事件
  chartInstance.on('click', (params) => {
    if (params.name === '高新区' || params.name === '中心城区') {
      return
    }
    countryNm.value = params.name
    if (params.seriesType === 'map') {
      // 点击时暂停轮播一段时间
      pauseAutoplayThenResume()

      // 更新 Tooltip 数据
      tooltipData.title = params.name
      // 模拟数据，实际应从 params.data 中获取，五色图 data 是 {name, value}
      const value = params.value
      tooltipData.items = [{ label: '认定企业数', value: (value || 0) + '家' }]
      tooltipData.gradient = params.data?.gradient || {}

      // 计算位置：将经纬度转换为像素坐标
      const event = params.event
      if (event) {
        tooltipPosition.left = event.offsetX
        tooltipPosition.top = event.offsetY - 10
        showTooltip.value = true
      }
    } else {
      hideTooltip()
    }
  })

  // 点击空白处隐藏
  chartInstance.getZr().on('click', (event) => {
    if (!event.target) {
      hideTooltip()
      // 点击空白处后继续轮播
      pauseAutoplayThenResume(0)
    }
  })

  // 启动自动轮播
  setTimeout(() => {
    startAutoplay()
  }, 200)
}
const getBgColor = (index) => {
  const colors = [
    'linear-gradient(90deg, rgba(213,75,67,0.32) 1%, rgba(213,75,67,0) 100%)',
    'linear-gradient(90deg, rgba(213,115,67,0.32) 1%, rgba(213,115,67,0) 100%)',
    'linear-gradient(90deg, rgba(254,222,115,0.32) 1%, rgba(254,222,115,0) 100%)',
    'linear-gradient(90deg, rgba(113,241,234,0.32) 1%, rgba(113,241,234,0) 100%)',
    'linear-gradient(90deg, rgba(15,255,153,0.24) 1%, rgba(15,255,153,0) 100%)'
  ]
  return colors[index] || '#ccc'
}
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
    hideTooltip()
    // resize 后重新定位（下一帧再轮播，避免 convertToPixel 取到旧尺寸）
    pauseAutoplayThenResume(200)
  }
}
const getFiveMapData = async () => {
  const res = await getMapData({
    enterpriseType: '',
    platType: '1' //地图类型 1 五色图 0 散点图
  })
  if (res && res.data && res.data.code === 100000 && res.data.data) {
    top5Data.value = res?.data?.data?.slice(0, 5)?.map((item) => {
      return {
        name: item.areaName,
        value: item.aggregateValue
      }
    })
    const rawData = res?.data?.data || []
    const newData = []
    let liangjiangValue = 0
    let centerCityValue = 0

    // 中心城区包含的区域（用于计算中心城区总和）
    const centerCityNames = [
      '渝中区',
      '大渡口区',
      '沙坪坝区',
      '九龙坡区',
      '南岸区',
      '北碚区',
      '巴南区',
      '渝北区',
      '江北区',
      '两江新区'
    ]

    rawData.forEach((item) => {
      const val = Number(item.aggregateValue || 0)

      // 计算中心城区总和
      if (centerCityNames.includes(item.areaName)) {
        centerCityValue += val
      }

      // 计算两江新区总和（渝北+江北）
      if (item.areaName === '渝北区' || item.areaName === '江北区') {
        liangjiangValue += val
      }

      // 构建数据列表：
      // 1. 渝北和江北不直接加入（后续作为两江新区加入）
      // 2. 其他区域（包括其他主城区和非主城区）正常加入
      if (item.areaName !== '渝北区' && item.areaName !== '江北区') {
        newData.push({
          name: item.areaName,
          value: item.aggregateValue,
          gradient: item.gradientCurrentValue
        })
      }
    })

    // 添加两江新区（供小地图使用）
    if (!newData.find((item) => item.name === '两江新区')) {
      newData.push({
        name: '两江新区',
        value: liangjiangValue
      })
    }

    // 添加中心城区（供大地图使用）
    if (!newData.find((item) => item.name === '中心城区')) {
      newData.push({
        name: '中心城区',
        value: centerCityValue
      })
    }

    fiveColorMapData.value = newData
    console.log(newData, rawData, 'newData')
    // tooltipData.gradient =
    initMap()
  }
}
onMounted(() => {
  nextTick(() => {
    getFiveMapData()
  })
  window.addEventListener('resize', handleResize)
})

onActivated(() => {
  if (chartInstance) {
    nextTick(() => {
      chartInstance.resize()
      startAutoplay()
    })
  } else {
    getFiveMapData()
  }
})

onDeactivated(() => {
  stopAutoplay()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  stopAutoplay()
  if (chartInstance) {
    chartInstance.dispose()
  }
})
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.echarts-map {
  width: 100%;
  height: 100%;
}

/* 右下角图例 */
.legend-panel {
  position: absolute;
  bottom: 10%;
  right: 5%;
  .rect-class {
    width: 6px;
    height: 7px;
    background: linear-gradient(176deg, #3ce3ff 0%, #62aefa 100%);
    border-radius: 1px;
    position: absolute;
    top: 18px;
    left: 10px;
    z-index: 1;
  }
  .bottom-line {
    position: absolute;
    top: 20px;
    width: 135px;
    height: 9px;
    background: linear-gradient(90deg, rgba(45, 128, 255, 0.64) 1%, rgba(45, 128, 255, 0) 100%);
    border: 1px solid;
    border-image: radial-gradient(circle, rgba(60, 227, 255, 0.48), rgba(60, 227, 255, 0)) 1 1;
    z-index: -1;
  }
  .legend-title {
    width: 135px;
    position: absolute;
    top: 7px;
    left: 22px;
    font-family: Alibaba-PuHuiTi-2;
    font-weight: normal;
    font-size: 14px;
    color: #ffffff;
  }
  .legend-list {
    position: relative;
    top: 35px;
    .legend-item {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      padding: 4px 8px;
      width: 100%;
      color: #fff;
      font-size: 12px;
      border-radius: 2px;
      font-family: Alibaba-PuHuiTi-2;
    }
    .color-block {
      width: 8px;
      height: 8px;
      margin-right: 8px;
      border-radius: 2px;
    }
  }
}
</style>
