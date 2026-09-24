import * as echarts from 'echarts'

// ========================== 综合业务 ==========================

// 参保对象职业分类
export const JOB_TYPE_DATA = [
  { num: 2860000, label: '企业职工' },
  { num: 1680000, label: '农民' },
  { num: 1360000, label: '自由职业' },
  { num: 826430, label: '退休人员' },
  { num: 560000, label: '在校学生' }
]

// 职业分类-环形饼图
export const YCFWBJLFB_OPTION = (data) => {
  const segData =  [
  { name: '参保登记', value: 86200, },
  { name: '待遇申领', value: 68400,  },
  { name: '转移接续', value: 52600, },
  { name: '其他', value: 43200,  }
]

  const segColors = [
    new echarts.graphic.LinearGradient(0, 0, 1, 1, [
      { offset: 0, color: '#3fb3ff' },
      { offset: 1, color: '#2f6bff' }
    ]),
    '#2fe6ff',
    '#1fe3bf',
    '#f0a552',
    '#f2dd9c'
  ]

  const buildDots = (count, color) =>
    Array.from({ length: count }, (_, i) => ({
      value: 1,
      name: '',
      silent: true,
      itemStyle: { color: i % 2 === 0 ? color : 'transparent' }
    }))

  const GAP = 1
  const ringData = []
  segData.forEach((item, i) => {
    ringData.push({
      name: item.name,
      value: item.value,
      itemStyle: { color: segColors[i % segColors.length] }
    })
    ringData.push({ value: GAP, name: '', silent: true, itemStyle: { color: 'transparent' } })
  })

  const innerArcGrad = new echarts.graphic.LinearGradient(0, 0, 1, 1, [
    { offset: 0, color: 'rgba(90,190,255,0.8)' },
    { offset: 0.55, color: 'rgba(45,120,255,0.4)' },
    { offset: 1, color: 'rgba(40,110,230,0.1)' }
  ])

  const fullRing = (radius, color) => ({
    type: 'pie',
    silent: true,
    radius,
    center: ['50%', '50%'],
    startAngle: 90,
    label: { show: false },
    labelLine: { show: false },
    data: [{ value: 100, name: '', itemStyle: { color } }]
  })

  return {
    tooltip: {
      show: true,
      trigger: 'item',
      textStyle: { color: '#000000', fontSize: 14 }
    },
    legend: { show: false },
    xAxis: { show: false },
    yAxis: { show: false },
    series: [
      // 1. 最外侧渐变实线环
      {
        type: 'pie',
        silent: true,
        radius: ['88%', '90%'],
        center: ['50%', '50%'],
        startAngle: 180,
        label: { show: false },
        labelLine: { show: false },
        data: [
          { value: 50, name: '', itemStyle: { color: '#63B9FF' } },
          {
            value: 50,
            name: '',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#63B9FF' },
                { offset: 1, color: 'rgba(99, 185, 255, 0.05)' }
              ])
            }
          }
        ]
      },
      // 2. 主分段环
      {
        type: 'pie',
        radius: ['69%', '83%'],
        center: ['50%', '50%'],
        startAngle: 90,
        label: { show: false },
        labelLine: { show: false },
        itemStyle: {
          borderColor: 'transparent',
          borderWidth: 0,
          shadowBlur: 10,
          shadowColor: 'rgba(30,120,255,0.35)'
        },
        data: ringData
      },
      fullRing(['65%', '66.5%'], 'rgba(90,180,255,0.55)'),
      {
        type: 'pie',
        silent: true,
        radius: ['59%', '60%'],
        center: ['50%', '50%'],
        startAngle: 90,
        label: { show: false },
        labelLine: { show: false },
        data: buildDots(72, 'rgba(90,160,230,0.35)')
      },
      fullRing(['53%', '54%'], 'rgba(80,160,235,0.3)'),
      {
        type: 'pie',
        silent: true,
        radius: ['40%', '52%'],
        center: ['50%', '50%'],
        startAngle: -20,
        label: { show: false },
        labelLine: { show: false },
        data: [
          { value: 130, name: '', itemStyle: { color: innerArcGrad } },
          { value: 230, name: '', itemStyle: { color: 'transparent' } }
        ]
      },
      fullRing(['34%', '34.8%'], 'rgba(80,160,235,0.22)'),
      fullRing(['24%', '24.6%'], 'rgba(80,160,235,0.15)')
    ]
  }
}

// 各业务类型办理总量趋势
export const ZHYEZLQS_OPTION = () => {
  // 4 条业务线数据，单位：件，按设计图量级缩放
  const lines = [
    { name: '参保登记', color: '#0091FF', data: [22000, 24500, 16800, 28900, 20200, 20800, 35600] },
    { name: '待遇申领', color: '#00C4FF', data: [15000, 16800, 18200, 19500, 8000, 12400, 3800] },
    { name: '转移接续', color: '#FAD760', data: [9800, 10400, 9200, 12000, 12800, 1600, 1500] },
    { name: '其他', color: '#6060FA', data: [1500, 3200, 6800, 8500, 9100, 9800, 10500] }
  ]

  // 为每条线配一个 areaStyle 渐变
  const buildArea = (hex) => ({
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      { offset: 0, color: hex + '66' },
      { offset: 1, color: hex + '00' }
    ])
  })

  return {
    tooltip: {},
    legend: {
      top: '6%',
      right: '20%',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: '#FFFFFF', fontSize: 14 }
    },
    grid: {
      top: '18%',
      left: '12%',
      right: '4%',
      bottom: '12%',
      containLabel: false
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        axisLine: {
          show: true,
          lineStyle: { color: 'rgba(90, 216, 255, 0.3)' }
        },
        axisLabel: {
          textStyle: { color: '#d1e6eb', fontSize: 12 }
        },
        axisTick: { show: false },
        data: ['2月', '3月', '4月', '5月', '6月', '7月']
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        max: 40000,
        interval: 8000,
        splitLine: {
          show: true,
          lineStyle: { color: 'rgba(90, 216, 255, 0.15)', type: 'dashed' }
        },
        axisLine: { show: false },
        axisLabel: {
          textStyle: { color: 'rgba(255, 255, 255, 0.70)', fontSize: 12 },
          formatter: (v) => (v / 1000) + ',000'
        },
        axisTick: { show: false }
      }
    ],
    series: lines.map((line) => ({
      name: line.name,
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      lineStyle: { normal: { color: line.color, width: 2 } },
      itemStyle: { normal: { color: line.color } },
      areaStyle: buildArea(line.color),
      data: line.data.slice(1) // 从3月开始的点
    }))
  }
}
