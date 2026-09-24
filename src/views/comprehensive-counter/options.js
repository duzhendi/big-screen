import * as echarts from 'echarts'

// ========================== 综柜事项 ==========================

// ---- 服务覆盖能力：各经办机构应用率整圆环形图 ----
// 画法与「社保基金 - 基金归集来源分布」一致：底色轨道 + 圆头进度弧 + 圆心实心圆底，
// 区别是环身走 #78CEFF → color 的渐变，圆心显示应用率数值（社保基金那张圆心是固定的「占比」二字）
export const COVERAGE_GAUGE_OPTION = (percent = 0, color = '#0070f8') => {
  const bgColor = 'rgba(158, 197, 243, 0.15)'

  return {
    backgroundColor: 'transparent',
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
        shape: { r: 28 },
        style: { fill: 'rgba(0, 100, 200, 0.55)' }
      },
      {
        type: 'text',
        left: 'center',
        top: 'middle',
        z: 101,
        style: {
          text: `${percent}%`,
          fill: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'Alibaba-PuHuiTi-Medium'
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
          {
            value: percent,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                { offset: 0, color: '#78CEFF' },
                { offset: 1, color }
              ]),
              borderRadius: 6
            }
          },
          { value: 100 - percent, itemStyle: { color: bgColor } }
        ]
      }
    ]
  }
}

// ---- 智能填报能力：预填率整圆环形图 ----
// 与上方仪表盘同源画法（外圈亮边 → 主环 progress + 轨道 → 内圈阴影），
// 区别是走满整圆（90° → -270°），并去掉中心文字，只作装饰环
export const FILLING_RING_OPTION = (percent = 0, color = '#2FE6D2') => {
  const common = {
    startAngle: 90,
    endAngle: -270,
    center: ['50%', '50%'],
    min: 0,
    max: 100,
    silent: true,
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: { show: false },
    pointer: { show: false },
    anchor: { show: false },
    title: { show: false },
    detail: { show: false }
  }

  return {
    backgroundColor: 'transparent',
    xAxis: { show: false },
    yAxis: { show: false },
    series: [
      // 1. 外圈细亮边
      {
        type: 'gauge',
        ...common,
        radius: '100%',
        progress: { show: false },
        axisLine: { lineStyle: { width: 1.5, color: [[1, shade(color, 0.2)]] } },
        data: [{ value: 100 }]
      },
      // 2. 主环：暗色轨道 + 渐变进度弧（圆头收尾）
      {
        type: 'gauge',
        ...common,
        radius: '92%',
        progress: {
          show: true,
          width: 7,
          roundCap: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
              { offset: 0, color: shade(color, -0.35) },
              { offset: 1, color: shade(color, 0.25) }
            ]),
          }
        },
        axisLine: { lineStyle: { width: 12, color: [[1, 'rgba(60, 200, 210, 0.12)']] } },
        data: [{ value: percent }]
      },
       
    ]
  }
}

// ---- 地图下方趋势分析：停保总办件数柱线图 ----
export const TREND_OPTION = () => {
  const years = ['2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年', '2023年', '2024年', '2025年', '2026年']
  const values = [3200, 4100, 5400, 4800, 5800, 6200, 7100, 6800, 7500, 7200, 6600]
  const yoyRates = [12, 15, 17, 13, 16, 18, 20, 15, 19, 16, 14]

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      textStyle: { color: '#fff', fontSize: 14 },
      backgroundColor: 'rgba(0,20,40,0.9)',
      borderColor: 'rgba(0,145,255,0.5)',
      formatter: (params) => {
        let html = `${params[0].axisValue}<br/>`
        params.forEach((p) => {
          html += `${p.marker}${p.seriesName}：${p.value}${p.seriesName === '同比' ? '%' : ' 件'}<br/>`
        })
        return html
      }
    },
    legend: { show: false },
    grid: { top: '12%', bottom: '10%', left: '2%', right: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      data: years,
      axisTick: { show: false },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.3)' } },
      axisLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 14 }
    },
    yAxis: [
      {
        type: 'value',
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { lineStyle: { color: 'rgba(199,199,200,0.1)', type: 'dotted' } },
        axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 14 }
      },
      {
        type: 'value',
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, formatter: '{value}%' }
      }
    ],
    series: [
      {
        name: '停保总办件数',
        type: 'bar',
        barWidth: 14,
        yAxisIndex: 0,
        data: values,
        itemStyle: {
          borderRadius: [3, 3, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#0091FF' },
            { offset: 1, color: 'rgba(0,145,255,0.2)' }
          ])
        }
      },
      {
        name: '同比',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: yoyRates,
        lineStyle: { color: '#FFD700', width: 2 },
        itemStyle: { color: '#FFD700' }
      }
    ]
  }
}

// 颜色明度调整
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
