import * as echarts from 'echarts'

// ========================== 公共服务平台运行情况 ==========================
// ---- 审核情况环形图----
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

// 地图下方的柱状图
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
        params.forEach(p => {
          html += `${p.marker}${p.seriesName}：${p.value}${p.seriesName === '同比' ? '%' : ''}<br/>`
        })
        return html
      }
    },
    legend: {
      show: true,
      top: 2,
      right: 'center',
      itemWidth: 12,
      itemHeight: 8,
      textStyle: { color: '#fff', fontSize: 14 },
      data: ['申请总量', '同比']
    },
    grid: { top: '14%', bottom: '10%', left: '2%', right: '2%', containLabel: true },
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
        name: '',
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { lineStyle: { color: 'rgba(199,199,200,0.1)', type: 'dotted' } },
        axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 14 }
      },
      {
        type: 'value',
        name: '',
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, formatter: '{value}%' }
      }
    ],
    series: [
      {
        name: '申请总量',
        type: 'bar',
        barWidth: 14,
        data: values,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#0091FF' },
            { offset: 1, color: 'rgba(0,145,255,0.2)' }
          ]),
          borderRadius: [3, 3, 0, 0]
        }
      },
      {
        name: '同比',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#FFD700', width: 2 },
        itemStyle: { color: '#FFD700' },
        data: yoyRates
      }
    ]
  }
}