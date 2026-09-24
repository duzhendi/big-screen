import * as echarts from 'echarts'

// ========================== 免申即享 ==========================

// ---- 服务次数按服务类型分布（3D 立体环形饼图 ----
export const FWCSFWLX_OPTION = () => {
  const pieData = [
    { name: '已处理', value: 3260, itemStyle: { color: '#00D4FF' }, pieHeight: 58 },
    { name: '处理中', value: 1080, itemStyle: { color: '#0066DD' }, pieHeight: 46 },
    { name: '待处理', value: 640, itemStyle: { color: '#E6C200' }, pieHeight: 38 },
    { name: '已驳回', value: 260, itemStyle: { color: '#CC3A3A' }, pieHeight: 32 }
  ]

  return getPie3D(pieData, 0.55)
}

// ---- 申请对象审核状态分布（三色柱状图）----
export const SHDZT_OPTION = () => {
  const xdata = ['待审核', '通过', '驳回']
  const values = [34, 50, 16]
  const percents = [34, 50, 16]
  const barColors = [
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#0091FF' },
      { offset: 1, color: 'rgba(0,145,255,0.2)' }
    ]),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#00EEFF' },
      { offset: 1, color: 'rgba(0,238,255,0.2)' }
    ]),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: '#FF5C5C' },
      { offset: 1, color: 'rgba(255,92,92,0.2)' }
    ])
  ]

  const maxVal = 100
  const grid = { top: '12%', bottom: '20%', left: '14%', right: '6%', containLabel: false }

  return {
    tooltip: {
      trigger: 'axis',
      textStyle: { color: '#333' },
      formatter: (params) => {
        const p = params.find(item => item.seriesName === 'bar')
        if (!p) return ''
        const idx = p.dataIndex
        return `${xdata[idx]}：${values[idx]}%`
      }
    },
    legend: { show: false },
    grid,
    xAxis: {
      type: 'category',
      axisTick: { show: false },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.3)' } },
      axisLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
      data: xdata
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisTick: { show: false },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: 'rgba(199,199,200,0.1)', type: 'dotted' } },
      axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, formatter: '{value}%' }
    },
    series: [
      {
        name: 'bar-bg',
        z: 0,
        type: 'bar',
        barWidth: 28,
        barGap: '-100%',
        data: values.map(() => maxVal),
        itemStyle: {
          color: 'rgba(27,126,242,0.12)',
          borderRadius: [3, 3, 0, 0]
        },
        silent: true,
        tooltip: { show: false }
      },
      {
        name: 'bar',
        z: 1,
        type: 'bar',
        barWidth: 22,
        data: values.map((v, i) => ({
          value: v,
          itemStyle: {
            color: barColors[i],
            borderRadius: [3, 3, 0, 0]
          }
        })),
        label: {
          show: true,
          position: 'top',
          formatter: (p) => `${percents[p.dataIndex]}%`,
          color: '#3ce3ff',
          fontSize: 12
        }
      }
    ]
  }
}

// ---- 资质对象群体类型分布 ----
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

// ---- 政策服务评价星级（横向条形图）----
export const ZFPJJ_OPTION = () => {
  const data = [
    { rank: 1, name: '五星', value: 18200, color: '#FFD700' },
    { rank: 2, name: '四星', value: 8420, color: '#C0C0C0' },
    { rank: 3, name: '三星', value: 3260, color: '#CD7F32' },
    { rank: 4, name: '两星', value: 1260, color: '#5B9BD5' },
    { rank: 5, name: '一星', value: 780, color: '#70AD47' }
  ]
  const maxVal = Math.max(...data.map(d => d.value))

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      textStyle: { color: '#fff' },
      backgroundColor: 'rgba(0,20,40,0.9)',
      borderColor: 'rgba(0,145,255,0.5)',
      formatter: (params) => {
        const p = params[0]
        return `${data[p.dataIndex].name}：${p.value.toLocaleString()}`
      }
    },
    legend: { show: false },
    grid: { top: '5%', bottom: '5%', left: '12%', right: '4%', containLabel: false },
    xAxis: { show: false, max: maxVal * 1.15 },
    yAxis: {
      type: 'category',
      inverse: true,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 13,
        formatter: (value, idx) => {
          const rank = data[idx].rank
          const stars = '★'.repeat(rank) + '☆'.repeat(5 - rank)
          return `${rank}  ${stars}  ${data[idx].name}`
        }
      },
      data: data.map(d => d.name)
    },
    series: [
      {
        name: 'bg',
        z: 0,
        type: 'bar',
        barWidth: 14,
        data: data.map(() => maxVal * 1.1),
        itemStyle: {
          color: 'rgba(27,126,242,0.12)',
          borderRadius: [0, 7, 7, 0]
        },
        silent: true,
        tooltip: { show: false }
      },
      {
        name: 'bar',
        z: 1,
        type: 'bar',
        barWidth: 10,
        data: data.map((d, i) => ({
          value: d.value,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: d.color },
              { offset: 1, color: d.color + '80' }
            ]),
            borderRadius: [0, 5, 5, 0]
          }
        })),
        label: {
          show: true,
          position: 'right',
          color: '#cdeaff',
          fontSize: 13,
          fontFamily: 'Alibaba-PuHuiTi-Medium'
        }
      }
    ]
  }
}

// ======= 3D 饼图生成函数 =======
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