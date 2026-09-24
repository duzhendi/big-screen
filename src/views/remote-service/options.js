import * as echarts from 'echarts'

// ========================== 远程服务 ==========================

// 远程服务-视频办达成率/转化率
export const SPB_RATE_OPTION = (data) => {
  // mock数据
  const dataArr = {
    xdata: ['达成率', '转化率'],
    vaccination: [4200, 7600]
  }

  // tooltip
  const tooltip = {
    trigger: 'axis',
    textStyle: { fontSize: '100%' }, 
    formatter: (params) => {
      const p = params.find(item => item.seriesType === 'bar' && item.seriesName)
      if (!p) return ''
      return `${p.axisValue}：${p.value.toLocaleString()}</b>`
    }
  }
  const legend = {
    show: false
  }
  const grid = { top: '8%', bottom: '32%', left: '16%', right: '3%', containLabel: false }

  // xAxis
  const xAxis = {
    axisTick: { show: true },
    axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.30)' } },
    data: dataArr.xdata
  }

  // yAxis
  const yAxis = [
    {
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(199,199,200,0.1)', type: 'dotted' } },
      axisLabel: { textStyle: { fontSize: 14, color: 'rgba(255, 255, 255, 0.80)' } }
    }
  ]

  // series：背景柱
  const yAxisMax = Math.ceil(Math.max(...dataArr.vaccination) / 1000) * 1000
  const series = [
    {
      z: 0,
      type: 'bar',
      barWidth: 16,
      data: dataArr.vaccination.map(() => yAxisMax),
      itemStyle: {
        color: 'rgba(27,126,242, 0.12)',
        borderRadius: [3, 3, 0, 0]
      },
      silent: true,
      tooltip: { show: false }
    },
    {
      z: 1,
      type: 'pictorialBar',
      symbolPosition: 'end',
      barWidth: 18,
      barGap: '-100%',
      data: dataArr.vaccination,
      symbol: 'diamond',
      symbolOffset: ['0%', '-50%'],
      symbolSize: [18, 9],
      itemStyle: {
        borderColor: '#1B7EF2',
        color: '#1B7EF2'
      }
    },
    {
      z: 1,
      type: 'bar',
      barWidth: 18,
      barGap: '-100%',
      data: dataArr.vaccination,
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          x2: 1,
          y: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: 'rgba(27,126,242, .7)' },
            { offset: 0.5, color: 'rgba(27,126,242, .7)' },
            { offset: 0.5, color: 'rgba(27,126,242, .3)' },
            { offset: 1, color: 'rgba(27,126,242, .3)' }
          ]
        },
        borderRadius: [2, 2, 0, 0]
      }
    }
  ]
  return {
    tooltip,
    xAxis,
    yAxis,
    series,
    grid,
    legend
  }
}

// 远程服务-服务次数按服务类型分布（真 3D 立体环形饼图）
export const YCFWBJLFB_OPTION = () => {
  const pieData = [
    { name: '引导办', value: 32456, itemStyle: { color: '#0091FF', opacity: 0.95 }, pieHeight: 52 },
    { name: '智能办', value: 28765, itemStyle: { color: '#00EEFF', opacity: 0.9 }, pieHeight: 44 },
    { name: '视频办', value: 21450, itemStyle: { color: '#ffd500ff', opacity: 0.85 }, pieHeight: 36 }
  ]

  return getPie3D(pieData, 0.55)
}

// ======= 以下为通用 3D 饼图生成函数 =======
function getPie3D(pieData, internalDiameterRatio) {
  const series = []
  let sumValue = 0
  let startValue = 0
  let endValue = 0
  const k = 1 - internalDiameterRatio

  // 为每个数据项生成一个 surface series
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value
    series.push({
      name: pieData[i].name || `series${i}`,
      type: 'surface',
      parametric: true,
      wireframe: { show: false },
      pieData: pieData[i],
      pieStatus: { selected: false, hovered: false, k: k },
      itemStyle: {
        ...pieData[i].itemStyle,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowBlur: 8
      }
    })
  }

  // 计算每段 startRatio / endRatio，填入 parametricEquation
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value
    series[i].pieData.startRatio = startValue / sumValue
    series[i].pieData.endRatio = endValue / sumValue
    const segHeight = series[i].pieData.pieHeight || 22
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      segHeight
    )
    startValue = endValue
  }

  // ====== 为每段边界插入深色薄壁（模拟边框）======
  const pieSegCount = series.length 
  const R_INNER = 1 - k   // 内半径
  const R_OUTER = 1 + k   // 外半径
  const maxH = Math.max(...series.map(s => s.pieData.pieHeight || 22)) * 0.1

  for (let i = 0; i < pieSegCount; i++) {
    const boundaryAngle = series[i].pieData.startRatio * Math.PI * 2
    const segColor = series[i].pieData.itemStyle.color
    series.push({
      name: `edge-${i}`,
      type: 'surface',
      parametric: true,
      silent: true,
      wireframe: { show: false },
      itemStyle: {
        color: shade(segColor, -0.35),
        opacity: 0.75
      },
      parametricEquation: {
        u: { min: 0, max: 1, step: 0.05 },
        v: { min: 0, max: 1, step: 0.05 },
        x: (u, v) => Math.cos(boundaryAngle) * (R_INNER + (R_OUTER - R_INNER) * u),
        y: (u, v) => Math.sin(boundaryAngle) * (R_INNER + (R_OUTER - R_INNER) * u),
        z: (u, v) => v * maxH * 1.02
      }
    })
  }

  const pieSegmentsOnly = series.filter(s => s.pieData && s.pieData.value)
  const maxPieHeight = Math.max(...pieSegmentsOnly.map(s => s.pieData.pieHeight || 22))
  const boxHeight = maxPieHeight * 0.1 * 1.3  // 最大高度 × 0.1（和 parametric z 公式对齐）× 1.3 留白

  return {
    backgroundColor: 'transparent',
    tooltip: { show: false },
    legend: { show: false },
    xAxis: { show: false },
    yAxis: { show: false },
    xAxis3D: { min: -1, max: 1, show: false },
    yAxis3D: { min: -1, max: 1, show: false },
    zAxis3D: { min: -1, max: 1, show: false },

    grid3D: {
      show: false,
      boxHeight: boxHeight,
      left: 0,
      top: 0,
      viewControl: {
        alpha: 28,
        distance: 220,
        rotateSensitivity: 0,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: false
      },
      light: {
        main: { intensity: 2.0, alpha: 40, beta: 50, shadow: true, shadowQuality: 'high' },
        ambient: { intensity: 0.4 }
      },
      postEffect: {
        enable: true,
        bloom: { enable: true, bloomIntensity: 0.35, bloomThreshold: 0.75 }
      },
      environment: 'none'
    },

    series
  }
}

// 根据数据最大值计算柱体高度（让最高扇段达到设定的像素高度）
function getHeight3D(series, height) {
  series.sort((a, b) => b.pieData.value - a.pieData.value)
  return (height * 25) / series[0].pieData.value
}

// 单个扇段的 parametric 曲面方程（三角函数分段，自动生成顶面+侧面+底面）
// 段间自动留 GAP 缝隙，让背景透出来形成视觉分割线
const GAP = 0.012
function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
  // 收窄角度范围，制造缝隙
  startRatio = startRatio + GAP
  endRatio = endRatio - GAP

  const midRatio = (startRatio + endRatio) / 2
  const startRadian = startRatio * Math.PI * 2
  const endRadian = endRatio * Math.PI * 2
  const midRadian = midRatio * Math.PI * 2

  if (startRatio === 0 && endRatio === 1) isSelected = true
  k = typeof k !== 'undefined' ? k : 1 / 3

  const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
  const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
  const hoverRate = isHovered ? 1.05 : 1

  return {
    u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
    v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
    x: function (u, v) {
      if (u < startRadian) return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      if (u > endRadian) return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    y: function (u, v) {
      if (u < startRadian) return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      if (u > endRadian) return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    },
    z: function (u, v) {
      if (u < -Math.PI * 0.5) return Math.sin(u)
      if (u > Math.PI * 2.5) return Math.sin(u) * h * 0.1
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1
    }
  }
}

// 颜色明度调整（SPB_RATE_OPTION 也在用）
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