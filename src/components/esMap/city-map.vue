<!-- src/components/CityMap/index.vue -->
<template>
  <div class="eMap">
    <!-- 主地图 -->
    <div ref="hnMap" id="hn-map" />

    <!-- 三沙市小地图 -->
    <div ref="sanshaMap" id="sansha-map" />

    <!-- 提示弹窗 -->
    <div v-if="dialogVisible" ref="cityMapDialog" class="city-map-dialog" :style="dialogStyle">
      <span>{{ currentData?.name || '' }}</span>
      <span class="value">{{ currentData?.value || 0 }}</span>
      <div class="tips" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'
import mapData from '@/components/esMap/hainan.json'
// 修改1: 将 sanshaMapData 改为导入全国地图数据（包含九段线和南海诸岛）
import chinaMapData from '@/components/esMap/china.json'
import outlineData from '@/components/esMap/outline.json'
import mapBg from '@/assets/images/map-bg.png'
import { mapPointIcon1, mapPointIcon2, mapPointIcon3, mapPointIcon4 } from './image'

// ============ Props ============
const props = defineProps({
  dataList: {
    type: Array,
    default: () => []
  },
  markPointData: {
    type: Array,
    default: () => []
  },
  showSansha: {
    type: Boolean,
    default: true
  },
  zoom: {
    type: Number,
    default: 7.5
  },
  roam: {
    type: Boolean,
    default: false
  },
  showBg: {
    type: Boolean,
    default: true
  }
})

// ============ Emits ============
const emit = defineEmits(['mapClick', 'markPointClick'])

// ============ Refs ============
const hnMap = ref(null)
const sanshaMap = ref(null)
const cityMapDialog = ref(null)
const dialogVisible = ref(false)
const currentData = ref({})
const tipsX = ref(0)
const tipsY = ref(0)

let mainChart = null
let sanshaChart = null

// ============ 常量配置 ============
const MAP_CONFIG = {
  hainanCenter: ['109.93', '19.00'],
  // 修改2: 小地图中心点调整到南海区域
  nanhaiCenter: ['115.0', '12.0'],
  dialogDefaultPos: { x: 1250, y: 600 }
}

// ============ 主岛经纬度包围盒 ============
// map-bg.png 就是「主岛 bbox」这张贴图：经纬比 1.2279，叠加 echarts geo 默认的
// aspectScale 0.75 之后显示宽高比 0.9209，与贴图本身的 622/675 = 0.9215 吻合。
// 也就是说贴图必须跟着 geo 的投影走 —— 写死像素坐标（原来的 x:120/y:70/622x675）
// 只在首页那个画布尺寸下成立，换个页面尺寸就错位。
// 这里排除三沙市（它的纬度跨到 3.84，会把 bbox 拉到底图上不存在的位置）。
const MAIN_ISLAND_BBOX = (() => {
  let minLng = Infinity
  let maxLng = -Infinity
  let minLat = Infinity
  let maxLat = -Infinity
  const walk = (coords) => {
    if (typeof coords[0] === 'number') {
      const [lng, lat] = coords
      if (lng < minLng) minLng = lng
      if (lng > maxLng) maxLng = lng
      if (lat < minLat) minLat = lat
      if (lat > maxLat) maxLat = lat
      return
    }
    coords.forEach(walk)
  }
  mapData.features
    .filter((feature) => feature.properties?.name !== '三沙市')
    .forEach((feature) => walk(feature.geometry.coordinates))
  return { minLng, maxLng, minLat, maxLat }
})()

const mapPointIcon = {
  1: mapPointIcon1,
  2: mapPointIcon2,
  3: mapPointIcon3,
  4: mapPointIcon4
}

// ============ 弹窗样式 ============
const dialogStyle = computed(() => ({
  left: tipsX.value + 'px',
  top: tipsY.value + 'px'
}))

// ============ 工具函数 ============
const getScoreLevel = (value) => {
  if (value >= 0 && value <= 69) return '1'
  if (value > 69 && value <= 89) return '2'
  if (value > 89 && value <= 95) return '3'
  return '4'
}

const getCityCenter = (cityName) => {
  const feature = mapData?.features?.find((i) => i.properties.name === cityName)
  if (feature?.properties?.centroid) {
    return feature.properties.centroid
  }
  return [110, 19]
}

// ============ 构建主地图配置（完全不变） ============
const buildMainMapOption = () => {
  if (!echarts.getMap('海南')) {
    echarts.registerMap('海南', mapData)
  }
  if (!echarts.getMap('hainan_outline')) {
    echarts.registerMap('hainan_outline', outlineData)
  }

  const markPoints =
    props.markPointData.length > 0
      ? props.markPointData
      : props.dataList.map((item) => {
          const center = getCityCenter(item.name)
          return {
            name: item.name,
            coord: center,
            symbol: `image://${mapPointIcon[getScoreLevel(item.value)]}`,
            area: item.area,
            value: item.value
          }
        })

  return {
    tooltip: {
      triggerOn: 'mousemove',
      formatter: (params) => {
        if (!params?.data?.area && !params?.data?.name) return ''
        const data = props.dataList.find((i) => i.area === params.data.area || i.name === params.data.name)
        if (!data) return `<div style="padding:4px 0;">${params.data.name}</div>`
        return `
          <div style="padding: 4px 0;">
            <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #FFFFFF;">
              ${data.name}
            </div>
            <div style="display: flex; justify-content: space-between; gap: 20px; color: #FFFFFF;">
              <span>安全评分</span>
              <span style="color: #FF6B6B; font-weight: bold;">${data.value || 100}分</span>
            </div>
          </div>
        `
      },
      backgroundColor: 'rgba(14, 66, 210, 0.85)',
      borderColor: 'rgba(22, 93, 255, 1)',
      borderWidth: 1,
      padding: [12, 16],
      textStyle: {
        color: '#FFFFFF',
        fontSize: 13
      }
    },
    geo: {
      map: '海南',
      show: true,
      roam: props.roam,
      zoom: props.zoom,
      selectedMode: 'single',
      center: MAP_CONFIG.hainanCenter,
      label: {
        show: true,
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Alibaba-PuHuiTi-Regular',
        formatter: (params) => {
          const code = mapData?.features?.find((i) => i.properties.name === params.name)?.properties?.adcode + '000000'
          const city = props.dataList.find((i) => i.area === code)
          return city ? `${city.value}\n${city.name}` : params.name
        }
      },
      itemStyle: {
        areaColor: 'rgba(15, 35, 65, 0.3)',
        borderColor: '#009EC9',
        borderWidth: 2
      },
      emphasis: {
        label: {
          show: true,
          color: '#FFFFFF',
          fontSize: 14,
          fontFamily: 'Alibaba-PuHuiTi-Regular'
        },
        itemStyle: {
          areaColor: 'rgba(255,215,0, 0.8)',
          borderColor: 'rgba(0, 242, 255, 1)',
          borderWidth: 2
        }
      },
      select: {
        label: {
          show: true,
          color: '#FFFFFF',
          fontSize: 14,
          fontFamily: 'Alibaba-PuHuiTi-Regular',
          fontWeight: 'bold'
        },
        itemStyle: {
          areaColor: 'rgba(27,126,242, .7)', // 选中区域变为金色半透明
          borderColor: '#00D0F8', // 选中边框变为金色
          borderWidth: 4,
          shadowColor: 'rgba(255, 215, 0, 0.5)',
          shadowBlur: 15
        }
      }
    },
    graphic: props.showBg
      ? {
          elements: [
            {
              // 首屏的占位坐标，setOption 之后立刻由 syncMapBg() 按 geo 投影覆盖
              id: 'mapBg',
              type: 'image',
              style: {
                image: mapBg,
                width: 622,
                height: 675,
                x: '120',
                y: '70'
              },
              z: 0
            }
          ]
        }
      : undefined,
    series: [
      {
        map: '海南',
        type: 'map',
        geoIndex: 0,
        data: props.dataList,
        label: { show: false },
        markPoint: {
          data: markPoints,
          symbolSize: [70, 40],
          symbolOffset: [0, '80%'],
          emphasis: { disabled: true }
        }
      },
      {
        map: 'hainan_outline',
        silent: true,
        type: 'map',
        zoom: props.zoom,
        zlevel: 10,
        center: MAP_CONFIG.hainanCenter,
        label: {
          normal: { show: false },
          emphasis: { show: false }
        },
        roam: false,
        itemStyle: {
          normal: {
            areaColor: 'transparent',
            borderColor: '#1793E4',
            borderWidth: 2,
            shadowColor: '#1793E4',
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            shadowBlur: 5
          }
        },
        tooltip: { show: false }
      }
    ]
  }
}

// ============ 构建三沙小地图配置（修改） ============
const buildSanshaMapOption = () => {
  // 修改3: 注册全国地图数据，命名为 'nanhai'
  if (!echarts.getMap('nanhai')) {
    echarts.registerMap('nanhai', chinaMapData)
  }

  // 获取三沙市数据用于标记点
  const sanshaData = props.dataList.find((i) => i.name === '三沙市')
  const value = sanshaData?.value || 100

  // 三沙市标记点
  const sanshaMark = props.markPointData
    .filter((i) => i.name === '三沙市' || i.name.includes('三沙'))
    .map((item) => ({
      ...item,
      symbolOffset: [0, '-180%']
    }))

  const finalMark =
    sanshaMark.length > 0
      ? sanshaMark
      : [
          {
            name: '三沙市',
            coord: [112.338, 16.831],
            symbol: `image://${mapPointIcon[getScoreLevel(value)]}`,
            value: value
          }
        ]

  return {
    tooltip: {
      triggerOn: 'mousemove',
      formatter: (params) => {
        if (params.name) {
          const data = props.dataList.find((i) => i.name === params.name)
          if (data) {
            return `
              <div style="padding: 4px 0;">
                <div style="font-weight: bold; font-size: 16px; margin-bottom: 8px; color: #FFFFFF;">
                  ${data.name}
                </div>
                <div style="display: flex; justify-content: space-between; gap: 20px; color: #FFFFFF;">
                  <span>安全评分</span>
                  <span style="color: #FF6B6B; font-weight: bold;">${data.value || 100}分</span>
                </div>
              </div>
            `
          }
          return `<div style="color:#FFFFFF;">${params.name}</div>`
        }
        return ''
      },
      backgroundColor: 'rgba(14, 66, 210, 0.85)',
      borderColor: 'rgba(22, 93, 255, 1)',
      borderWidth: 1,
      padding: [12, 16],
      textStyle: {
        color: '#FFFFFF',
        fontSize: 13
      }
    },
    geo: {
      map: 'nanhai', // 修改4: 使用全国地图数据
      show: true,
      roam: false,
      zoom: 1.8, // 修改5: 调整缩放，聚焦南海
      selectedMode: false,
      center: MAP_CONFIG.nanhaiCenter, // 修改6: 中心点对准南海
      label: {
        show: true,
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Alibaba-PuHuiTi-Regular',

        formatter: (params) => {
          // 只显示南海区域主要岛屿名称
          const targetNames = ['三沙市', '西沙区', '南沙区', '黄岩岛']
          if (targetNames.includes(params.name)) {
            return params.name
          }
          return ''
        },
        offset: [0, 10]
      },
      itemStyle: {
        areaColor: '#1A6B8A',
        borderColor: '#00D4FF',
        borderWidth: 1.5,
        shadowColor: 'rgba(0, 212, 255, 0.2)',
        shadowBlur: 8
      },
      select: {
        label: {
          show: true,
          color: '#FFFFFF',
          fontSize: 14,
          fontFamily: 'Alibaba-PuHuiTi-Regular',
          fontWeight: 'bold'
        },
        itemStyle: {
          areaColor: 'rgba(27,126,242, .7)', // 选中区域变为金色半透明
          borderColor: '#00D0F8', // 选中边框变为金色
          borderWidth: 4,
          shadowColor: 'rgba(255, 215, 0, 0.5)',
          shadowBlur: 15
        }
      },
      emphasis: {
        label: {
          show: true,
          color: '#FFFFFF',
          fontSize: 14,
          fontFamily: 'Alibaba-PuHuiTi-Regular'
        },
        itemStyle: {
          areaColor: '#2D8FAA',
          borderColor: '#FFD700',
          borderWidth: 2
        }
      }
    },
    series: [
      {
        type: 'map',
        map: 'nanhai',
        geoIndex: 0,
        data: props.dataList,
        label: { show: false }
      },
      // 散点标记 - 突出显示三沙市
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        data: [
          { name: '三沙市', coord: [112.338, 16.831] },
          { name: '永兴岛', coord: [112.337, 16.835] }
        ],
        symbolSize: 20,
        symbol: 'circle',
        itemStyle: {
          color: '#FFD700',
          borderColor: '#FFFFFF',
          borderWidth: 2,
          shadowColor: 'rgba(255, 215, 0, 0.4)',
          shadowBlur: 10
        },
        label: {
          show: true,
          formatter: '{b}',
          position: 'right',
          color: '#FFFFFF',
          fontSize: 14,
          fontFamily: 'Alibaba-PuHuiTi-Regular',

          fontWeight: 'bold',
          textShadowColor: 'rgba(0,0,0,0.8)',
          textShadowBlur: 4
        },
        emphasis: {
          scale: 1.5
        }
      }
    ]
  }
}

// ============ 初始化主地图（完全不变） ============
const initMainMap = () => {
  if (!hnMap.value) return

  if (mainChart) {
    mainChart.dispose()
    mainChart = null
  }

  mainChart = echarts.init(hnMap.value)
  mainChart.setOption(buildMainMapOption())
  syncMapBg()

  mainChart.off('click')
  mainChart.on('click', (params) => {
    if (params.componentType === 'markPoint') {
      emit('markPointClick', params)
      return
    }

    if (params.seriesType === 'map' && params.data) {
      const data = props.dataList.find((i) => i.area === params.data.area || i.name === params.data.name)
      if (data) {
        currentData.value = data
        dialogVisible.value = true
        nextTick(() => {
          const x = params.event?.offsetX - 60 || 100
          const y = params.event?.offsetY - 40 || 100
          tipsX.value = Math.max(0, Math.min(x, window.innerWidth - 200))
          tipsY.value = Math.max(0, Math.min(y, window.innerHeight - 100))
        })
      }
      emit('mapClick', params)
    }
  })

  window.addEventListener('resize', handleResize)
}

// ============ 初始化三沙小地图（修改） ============
const initSanshaMap = () => {
  if (!sanshaMap.value || !props.showSansha) return

  if (sanshaChart) {
    sanshaChart.dispose()
    sanshaChart = null
  }

  sanshaChart = echarts.init(sanshaMap.value)
  sanshaChart.setOption(buildSanshaMapOption())

  sanshaChart.off('click')
  sanshaChart.on('click', (params) => {
    if (params.componentType === 'markPoint') {
      emit('markPointClick', params)
      return
    }

    if (params.name === '三沙市' || params.name === '西沙区' || params.name === '南沙区') {
      const data = props.dataList.find((i) => i.name === '三沙市')
      if (data) {
        currentData.value = data
        dialogVisible.value = true
        nextTick(() => {
          tipsX.value = MAP_CONFIG.dialogDefaultPos.x
          tipsY.value = MAP_CONFIG.dialogDefaultPos.y
        })
      }
      emit('mapClick', { data: { name: '三沙市', area: '460300000000' } })
    }
  })
}

// ============ 让底图贴图跟随 geo 投影 ============
// 用 geo 的「经纬度 → 像素」换算求出主岛在画布里的实际矩形，再把 map-bg.png 铺上去。
// 这样不管画布是 906x892（首页）还是 1386x757（校验报表），贴图都和地图边界重合。
const syncMapBg = () => {
  if (!mainChart || !props.showBg) return

  const topLeft = mainChart.convertToPixel(
    { geoIndex: 0 },
    [MAIN_ISLAND_BBOX.minLng, MAIN_ISLAND_BBOX.maxLat]
  )
  const bottomRight = mainChart.convertToPixel(
    { geoIndex: 0 },
    [MAIN_ISLAND_BBOX.maxLng, MAIN_ISLAND_BBOX.minLat]
  )
  if (!topLeft || !bottomRight) return

  const width = bottomRight[0] - topLeft[0]
  const height = bottomRight[1] - topLeft[1]
  // 容器尺寸还没算出来时保留占位坐标，避免把贴图铺成 0 尺寸
  if (!(width > 0) || !(height > 0)) return

  mainChart.setOption({
    graphic: {
      elements: [
        {
          id: 'mapBg',
          type: 'image',
          style: {
            image: mapBg,
            x: topLeft[0],
            y: topLeft[1],
            width,
            height
          },
          z: 0
        }
      ]
    }
  })
}

// ============ 更新地图 ============
const updateMaps = () => {
  if (mainChart) {
    mainChart.setOption(buildMainMapOption(), true)
    syncMapBg()
  }
  if (sanshaChart && props.showSansha) {
    sanshaChart.setOption(buildSanshaMapOption(), true)
  }
}

// ============ 关闭弹窗 ============
const closeTips = () => {
  dialogVisible.value = false
  currentData.value = {}
}

// ============ 窗口自适应 ============
const handleResize = () => {
  mainChart?.resize()
  sanshaChart?.resize()
  syncMapBg()
}

// ============ 暴露方法 ============
defineExpose({
  closeTips,
  updateMaps,
  getMainChart: () => mainChart,
  getSanshaChart: () => sanshaChart
})

// ============ 生命周期 ============
onMounted(() => {
  // 修改7: 注册全国地图数据 'nanhai'（不影响主地图的 '海南'）
  if (!echarts.getMap('海南')) {
    echarts.registerMap('海南', mapData)
  }
  if (!echarts.getMap('nanhai')) {
    echarts.registerMap('nanhai', chinaMapData)
  }
  if (!echarts.getMap('hainan_outline')) {
    echarts.registerMap('hainan_outline', outlineData)
  }

  nextTick(() => {
    initMainMap()
    initSanshaMap()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  mainChart?.dispose()
  sanshaChart?.dispose()
  mainChart = null
  sanshaChart = null
})

// ============ 监听数据变化 ============
watch(
  () => [props.dataList, props.markPointData],
  () => {
    updateMaps()
  },
  { deep: true }
)
</script>

<style lang="scss" scoped>
.eMap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: rgba(0, 10, 40, 0.5);

  #hn-map {
    width: 100%;
    height: 100%;
    min-height: 800px;
  }

  #sansha-map {
    width: 180px;
    height: 280px;
    border: 1px solid rgba(0, 150, 229, 0.6);
    border-radius: 4px;
    position: absolute;
    right: 3%;
    bottom: 15%;
    background: rgba(0, 10, 40, 0);
    box-shadow: 0 0 20px rgba(0, 150, 229, 0.15);
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(0, 212, 255, 0.8);
      box-shadow: 0 0 30px rgba(0, 212, 255, 0.25);
    }
  }

  .city-map-dialog {
    padding: 14px 20px;
    background: rgba(2, 58, 148, 0.88);
    border-radius: 6px;
    position: absolute;
    left: 0;
    top: 0;
    border: 1px solid rgba(22, 92, 252, 0.8);
    font-size: 15px;
    color: #ffffff;
    z-index: 100;
    min-width: 100px;
    pointer-events: none;
    backdrop-filter: blur(4px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

    .value {
      color: #ff6b6b;
      font-weight: bold;
      margin-left: 8px;
      font-size: 17px;
    }

    .tips {
      width: 10px;
      height: 10px;
      position: absolute;
      background: rgba(2, 58, 148, 0.88);
      border: 1px solid rgba(22, 92, 252, 0.8);
      transform: rotate(45deg) translateX(-50%);
      bottom: -6px;
      left: 50%;
      border-left: none;
      border-top: none;
    }
  }
}

// 响应式适配
</style>
