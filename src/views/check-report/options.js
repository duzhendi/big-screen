import * as echarts from 'echarts'

// ========================== 校验报表 ==========================

// ---- 全省缴费人数平均数趋势分析 ----
// 与「公共服务运行 - 全省企业职工养老保险关系转移申请总量趋势分析」保持同一套画法：
// 柱状为指标值，折线为同比（走右轴），另外在异常年份挂「预警」标注
export const TREND_OPTION = () => {
  const years = ['2021年', '2022年', '2023年', '2024年', '2025年', '2026年']
  const values = [7900, 5300, 6600, 6400, 6500, 8000]
  const yoyRates = [1.5, 12, 15, 13, 4, 14]

  // 预警标注（挂在同比折线的数据点上，positive 红 / negative 绿）
  const warningList = [
    { year: '2021年', text: '-92.16%', color: '#22C55E' },
    { year: '2022年', text: '+31.46%', color: '#F5222D' },
    { year: '2025年', text: '-92.16%', color: '#22C55E' }
  ]

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
      data: ['缴费基数总额', '同比']
    },
    grid: { top: '16%', bottom: '10%', left: '2%', right: '2%', containLabel: true },
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
        max: 8000,
        interval: 2000,
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { lineStyle: { color: 'rgba(199,199,200,0.1)', type: 'dotted' } },
        axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 14 }
      },
      {
        type: 'value',
        max: 20,
        interval: 5,
        axisTick: { show: false },
        axisLine: { show: false },
        splitLine: { show: false },
        axisLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, formatter: '{value}%' }
      }
    ],
    series: [
      {
        name: '缴费基数总额',
        type: 'bar',
        barWidth: 14,
        data: values,
        label: { show: false },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#0091FF' },
            { offset: 1, color: 'rgba(0,145,255,0.2)' }
          ]),
          borderRadius: [3, 3, 0, 0]
        },
        // 柱顶的小圆点，纯装饰
        markPoint: {
          symbol: 'circle',
          symbolSize: 7,
          symbolOffset: [0, -2],
          itemStyle: { color: '#08243F', borderColor: '#7FDCFF', borderWidth: 2 },
          label: { show: false },
          data: years.map((year, index) => ({ name: year, coord: [index, values[index]] }))
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
        label: { show: false },
        data: yoyRates,
        markPoint: {
          symbol: 'rect',
          symbolSize: [64, 34],
          symbolOffset: [0, -26],
          label: {
            show: true,
            formatter: (p) => `{t|预警}\n{v|${p.data.text}}`,
            rich: {
              t: { color: '#ffffff', fontSize: 12, lineHeight: 15, fontFamily: 'Alibaba-PuHuiTi-Regular' },
              v: { color: '#ffffff', fontSize: 12, lineHeight: 15, fontFamily: 'Alibaba-PuHuiTi-Medium' }
            }
          },
          data: warningList.map((item) => {
            const index = years.indexOf(item.year)
            return {
              name: '预警',
              coord: [index, yoyRates[index]],
              text: item.text,
              itemStyle: {
                color: 'rgba(0,12,26,0.85)',
                borderColor: item.color,
                borderWidth: 1
              }
            }
          })
        }
      }
    ]
  }
}
