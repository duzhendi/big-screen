import * as echarts from 'echarts'

// ========================== 社保基金 ==========================

// ---- 社保资金险种结构（3D 立体环形饼图）----
export const FUND_STRUCTURE_OPTION = () => {
  const pieData = [
    { name: '养老保险', value: 514568, itemStyle: { color: '#00D4FF' }, pieHeight: 58 },
    { name: '医疗保险', value: 308741, itemStyle: { color: '#0066DD' }, pieHeight: 46 },
    { name: '工伤保险', value: 231556, itemStyle: { color: '#E6C200' }, pieHeight: 40 },
    { name: '失业保险', value: 154370, itemStyle: { color: '#FF7D5C' }, pieHeight: 34 },
    { name: '生育保险', value: 77185, itemStyle: { color: '#B06CE8' }, pieHeight: 28 }
  ]

  return getPie3D(pieData, 0.55)
}

// ---- 基金归集来源分布（环形图共用函数）----
export const GROUP_DONUT_OPTION = (percent, color) => {
  const bgColor = 'rgba(158, 197, 243, 0.15)'
  return {
    tooltip: { show: false },
    legend: { show: false },
    xAxis: { show: false },
    yAxis: { show: false },
    graphic: [
      {
        type: 'circle',
        left: 'center',
        top: 'middle',
        z: 100,
        shape: { r: 20 },
        style: { fill: 'rgba(0, 100, 200, 0.55)' }
      },
      {
        type: 'text',
        left: 'center',
        top: 'middle',
        z: 101,
        style: {
          text: '占比',
          fill: '#fff',
          fontSize: 12,
          fontFamily: 'Alibaba-PuHuiTi-2',
          fontWeight: 'normal'
        }
      }
    ],
    series: [
      {
        type: 'pie',
        radius: ['68%', '88%'],
        center: ['50%', '50%'],
        startAngle: 90,
        label: { show: false },
        labelLine: { show: false },
        itemStyle: { borderColor: 'transparent', borderWidth: 0 },
        data: [
          { value: percent, itemStyle: { color, borderRadius: 6 } },
          { value: 100 - percent, itemStyle: { color: bgColor } }
        ]
      }
    ]
  }
}

// ========================== 以下为通用 3D 饼图生成函数 ==========================
function getPie3D(pieData, internalDiameterRatio) {
  const series = []
  let sumValue = 0
  let startValue = 0
  let endValue = 0
  const k = 1 - internalDiameterRatio

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

  const pieSegCount = series.length
  const R_INNER = 1 - k
  const R_OUTER = 1 + k
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
  const boxHeight = maxPieHeight * 0.1 * 1.3

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

function getHeight3D(series, height) {
  series.sort((a, b) => b.pieData.value - a.pieData.value)
  return (height * 25) / series[0].pieData.value
}

const GAP = 0.012
function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
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