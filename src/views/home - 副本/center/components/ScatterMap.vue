<template>
  <div class="map-container">
    <div class="echarts-map" ref="chartRef"></div>
    <!-- 左上角 Top 5 列表 -->
    <TopFiveList :data="top5Data" :title="title" />

    <!-- 悬浮框 -->
    <MapTooltip
      v-if="showTooltip"
      :title="tooltipData.title"
      :items="tooltipData.items"
      :style="{
        position: 'absolute',
        left: tooltipPosition.left + 'px',
        top: tooltipPosition.top + 'px',
        transform: 'translate(-50%, -100%)', // 向上偏移，让尖角对准点位
        zIndex: 100
      }"
      @detail="handleDetailClick"
      :countryNm="countryNm"
      mapType="0"
      :affiliatedGradient="affiliatedGradient"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, reactive, computed } from 'vue'
import * as echarts from 'echarts'
import rawCqGeoJSON from '@/assets/geoJson/chongqing1.json'
import rawCqMainGeoJSON from '@/assets/geoJson/cqZC1.json'
import { updateGuideLine, mergeCenterCityInGeoJSON } from '../mapUtils'
import MapTooltip from './MapTooltip.vue'
import TopFiveList from './TopFiveList.vue'
import { getMapData } from '@/apis'

const top5Data = ref([])
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: '排名TOP5'
  },
  activeIndex: {
    type: Number,
    default: 0
  }
})
// 所属梯度
const affiliatedGradient = ref('')
const countryNm = ref('')
const chartRef = ref(null)
let chartInstance = null
const scatterPlotData = ref([])
const mainMapScatterData = ref([])
const smallMapScatterData = ref([])
let cqGeoJSONCache = null

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

// 兼容标准 FeatureCollection 和数组结构（每项带 featureCollection）
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

// 中心城区列表
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
  '两江新区',
  '高新区'
]
const showTooltip = ref(false)
const tooltipPosition = reactive({ left: 0, top: 0 })
const tooltipData = reactive({
  title: '',
  items: []
})

// 监听 icon 变化重新渲染
watch(
  () => props.icon,
  () => {
    if (chartInstance) {
      getScatterMapData()
    }
  }
)

// 小地图配置
const mapRectConfig = {
  rectWidth: 153,
  rectHeight: 231,
  rectLeftPercent: 0.3,
  rectTopPercent: 0.04
}

// 点击详情
const handleDetailClick = () => {
  console.log('点击了详情', tooltipData.title)
  // 这里可以抛出事件或者跳转
}

// 隐藏 Tooltip
const hideTooltip = () => {
  showTooltip.value = false
}
defineExpose({
  hideTooltip
})
const initMap = () => {
  if (!chartRef.value) return

  if (chartInstance) {
    chartInstance.dispose()
  }

  let cqGeoJSON = normalizeGeoJSON(rawCqGeoJSON)
  const cqMainGeoJSON = normalizeGeoJSON(rawCqMainGeoJSON)
  cqGeoJSON = mergeCenterCityInGeoJSON(cqGeoJSON, centerCityNames)
  cqGeoJSONCache = cqGeoJSON

  echarts.registerMap('chongqing', cqGeoJSON)
  echarts.registerMap('cqMain', cqMainGeoJSON)

  chartInstance = echarts.init(chartRef.value)

  const option = {
    backgroundColor: 'transparent',
    // 禁用默认 Tooltip，使用自定义组件
    tooltip: {
      show: false,
      trigger: 'item'
    },
    geo: [
      // 阴影层
      {
        map: 'chongqing',
        roam: false,
        layoutCenter: ['56%', '52%'],
        layoutSize: '115%',
        aspectScale: 1.0,
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
        aspectScale: 1.0,
        label: {
          show: true,
          color: '#FFFFFF',
          fontSize: 14,
          fontFamily: 'Alibaba-PuHuiTi-2',
          fontWeight: 'normal'
        },
        itemStyle: {
          areaColor: '#367ee8',
          borderColor: '#fff',
          borderWidth: 1,
          shadowColor: 'rgba(0, 0, 0, 0.4)',
          shadowBlur: 5
        },
        emphasis: {
          itemStyle: {
            areaColor: '#5698F5'
          },
          label: { color: '#fff' }
        },
        zlevel: 2
      },
      // 小地图阴影
      {
        map: 'cqMain',
        roam: false,
        left: '31%',
        top: '5%',
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
          fontWeight: 'normal'
        },
        itemStyle: {
          areaColor: '#367ee8',
          borderColor: '#fff',
          borderWidth: 1,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10
        },
        emphasis: {
          itemStyle: { areaColor: '#5698F5' },
          label: { color: '#fff' }
        },
        zlevel: 4
      }
    ],
    series: [
      // 底图 Series
      {
        type: 'map',
        map: 'chongqing',
        geoIndex: 1,
        data: []
      },
      // 散点图 Series (主地图)
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        geoIndex: 1,
        data: mainMapScatterData.value,
        symbol: props.icon ? `image://${props.icon}` : 'circle',
        symbolSize: props.icon
          ? 20
          : function (val) {
              return val[2] / 5
            },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          scale: 3
        },
        label: {
          formatter: '{b}',
          position: 'right',
          show: false,
          color: '#fff'
        },
        itemStyle: {
          color: '#f4e925',
          shadowBlur: 10,
          shadowColor: '#333'
        },
        zlevel: 5
      },
      // 小地图散点图 Series
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        geoIndex: 3,
        data: smallMapScatterData.value,
        symbol: props.icon ? `image://${props.icon}` : 'circle',
        symbolSize: props.icon
          ? 15
          : function (val) {
              return val[2] / 8
            },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          scale: 3
        },
        label: {
          show: false
        },
        itemStyle: {
          color: '#f4e925',
          shadowBlur: 10,
          shadowColor: '#333'
        },
        zlevel: 5
      },
      // 小地图 Series
      {
        type: 'map',
        map: 'cqMain',
        geoIndex: 3,
        data: []
      }
    ],
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

  setTimeout(() => {
    updateGuideLine(chartInstance, chartRef.value, cqGeoJSON, mapRectConfig)
  }, 100)
  const labelName = computed({
    get: () => {
      const list = ['创新型中小企业', '专精特新中小企业', '“小巨人企业”', '市级单项冠军', '国家级单项冠军']
      return list[props.activeIndex]
    }
  })
  // 监听点击事件
  chartInstance.on('click', (params) => {
    countryNm.value = params.name
    if (params.name === '高新区' || params.name === '中心城区') {
      return
    }
    console.log(params, 'rapper')
    // 阻止事件冒泡，防止触发 zr 的 click
    // echarts 事件不支持 stopPropagation，需要逻辑处理
    if (params.seriesType === 'scatter') {
      // 更新 Tooltip 数据
      tooltipData.title = params.name
      // 模拟数据，实际应从 params.data 中获取
      const value = params.value ? params.value[2] : 0
      const value1 = params.value ? params.value[3] : 0
      tooltipData.items = [
        { label: labelName.value + '企业累计数', value: value + '家' },
        { label: '年度' + labelName.value + '企业数', value: value1 + '家' }
      ]

      // 计算位置：将经纬度转换为像素坐标
      // params.event.offsetX/Y 是鼠标位置，我们想要点的位置，使用 convertToPixel
      const pointInPixel = chartInstance.convertToPixel({ seriesIndex: params.seriesIndex }, [
        params.value[0],
        params.value[1]
      ])

      if (pointInPixel) {
        tooltipPosition.left = pointInPixel[0]
        tooltipPosition.top = pointInPixel[1] - 10 // 稍微上移
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
    }
  })
}

const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
    const cqGeoJSON = cqGeoJSONCache || normalizeGeoJSON(rawCqGeoJSON)
    updateGuideLine(chartInstance, chartRef.value, cqGeoJSON, mapRectConfig)
    hideTooltip() // resize 时隐藏 tooltip，位置可能不对
  }
}
const getScatterMapData = async () => {
  const list = ['cxxzxqy', 'zjtxzxqy', 'xjrqy', 'sjdxgj', 'gjjdxgj']
  affiliatedGradient.value = list[props.activeIndex]
  const res = await getMapData({
    enterpriseType: list[props.activeIndex],
    platType: '0' //地图类型 1 五色图 0 散点图
  })
  if (res && res.data && res.data.code === 100000 && res.data.data) {
    top5Data.value = res?.data?.data?.slice(0, 5)?.map((item) => {
      return {
        name: item.areaName,
        value: item.aggregateValue
      }
    })
    const rawData = res?.data?.data || []
    const processedData = []

    // 临时存储渝北区和江北区的数据，用于合并
    let yubeiData = null
    let jiangbeiData = null

    rawData.forEach((item) => {
      // 构造基础数据对象
      const dataItem = {
        name: item.areaName,
        value: [item.longitude, item.dimensionality, item.aggregateValue, item.currentValue]
      }

      if (item.areaName === '渝北区') {
        yubeiData = dataItem
      } else if (item.areaName === '江北区') {
        jiangbeiData = dataItem
      } else {
        processedData.push(dataItem)
      }
    })

    // 合并两江新区
    if (yubeiData) {
      // 如果有江北区数据，累加 value 中的指标值（索引 2 和 3）
      // 使用渝北区的经纬度（索引 0 和 1）
      const aggregateValue = (yubeiData.value[2] || 0) + (jiangbeiData ? jiangbeiData.value[2] || 0 : 0)
      const currentValue = (yubeiData.value[3] || 0) + (jiangbeiData ? jiangbeiData.value[3] || 0 : 0)

      processedData.push({
        name: '两江新区',
        value: [yubeiData.value[0], yubeiData.value[1], aggregateValue, currentValue]
      })
    } else if (jiangbeiData) {
      // 只有江北区数据的情况（虽然不太可能，但作为兜底）
      processedData.push({
        name: '两江新区',
        value: [jiangbeiData.value[0], jiangbeiData.value[1], jiangbeiData.value[2], jiangbeiData.value[3]]
      })
    }

    scatterPlotData.value = processedData

    // 分离数据
    mainMapScatterData.value = scatterPlotData.value.filter((item) => !centerCityNames.includes(item.name))
    smallMapScatterData.value = scatterPlotData.value.filter((item) => centerCityNames.includes(item.name))

    console.log(scatterPlotData.value, 'scatterPlotData.value')
    initMap()
  }
}
onMounted(() => {
  getScatterMapData()

  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (chartInstance) {
    chartInstance.dispose()
  }
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.echarts-map {
  width: 100%;
  height: 100%;
}
</style>
