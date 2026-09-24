import * as echarts from 'echarts'

// ========================== 全民参保 ==========================

// 全民参保-各参保险种人数分布（立体环形饼图 + 引导线标签）
export const GCBXZRLFB_OPTION = () => {
  const chartData = [
    { name: '职工养老', value: 2186 },
    { name: '工伤失业', value: 581431 },
    { name: '职工医保', value: 1024000 },
    { name: '居民养老', value: 1843000 },
    { name: '居民医保', value: 1652000 }
  ]
  const colorList = ['#ee7d13', '#E9C04E', '#5B7BE6', '#3AB4D1', '#276FE7']

  return {
    tooltip: {
      trigger: 'item',
      textStyle: { fontSize: '100%',color:'#333' },
      formatter: '{b}: {c} ({d}%)'
    },
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    legend: { show: false },
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'middle',
        style: {
          text: '参保分布',
          fill: 'rgba(255,255,255,0.7)',
          fontSize: 14
        }
      }
    ],
    series: [
      {
        name: '各参保险种人数分布',
        type: 'pie',
        radius: ['40%', '62%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        bevelSize: 8,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#0a1a2a',
          borderWidth: 2,
          shadowBlur: 20,
          shadowColor: 'rgba(39, 111, 231, 0.35)'
        },
        label: {
          show: true,
          formatter: '{b}\n{c}',
          color: '#cdeaff',
          fontSize: 14,
          fontFamily: 'Alibaba-PuHuiTi-Regular'
        },
        labelLine: {
          show: true,
          length: 14,
          length2: 18,
          lineStyle: {
            color: 'rgba(100, 200, 255, 0.7)',
            width: 1.2
          },
          symbol: 'circle',
          symbolSize: 6
        },
        color: colorList,
        data: chartData
      },
      // 外圈光晕装饰
      {
        name: '',
        type: 'pie',
        radius: ['66%', '67%'],
        center: ['50%', '50%'],
        silent: true,
        label: { show: false },
        labelLine: { show: false },
        itemStyle: {
          color: 'rgba(39, 111, 231, 0.18)',
          borderWidth: 0
        },
        data: [{ value: 1, name: '' }]
      }
    ]
  }
}

// 全民参保-新增参保趋势
export const XZCBQS_OPTION = (data) => {
  // mock数据
  const dataArr = {
    xdata: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    vaccination: [4200, 7600, 8900, 5200, 6800, 5500, 7200, 7900, 6500, 5800, 9600, 7400]
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

  // series
  const series = [
    {
      z: 1,
      type: 'pictorialBar',
      symbolPosition: 'end',
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
      barGap: '-50%',
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
        }
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


// 全民参保-长护险参保类型分布（多层装饰环形图）
export const YCFWBJLFB_OPTION = (data) => {
  // 外环五段占比数据（合计 100），支持外部传入覆盖
  const segData = Array.isArray(data) && data.length
    ? data
    : [
        { name: '护理服务', value: 56 },
        { name: '照护补贴', value: 19 },
        { name: '居家服务', value: 12 },
        { name: '机构评定', value: 7 },
        { name: '其他', value: 3 }
      ]

  // 主环五段配色（蓝 / 青 / 薄荷绿 / 橙 / 米黄）
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

  // 生成点状虚环数据（count 个等分点，奇偶交替显示/透明）
  const buildDots = (count, color) =>
    Array.from({ length: count }, (_, i) => ({
      value: 1,
      name: '',
      silent: true,
      itemStyle: { color: i % 2 === 0 ? color : 'transparent' }
    }))

  // 主环数据：每段之后插入一个透明间隔，形成段间缺口
  const GAP = 1
  const ringData = []
  segData.forEach((item, i) => {
    ringData.push({
      name: item.name,
      value: item.value,
      silent: true,
      itemStyle: { color: segColors[i % segColors.length] }
    })
    ringData.push({ value: GAP, name: '', silent: true, itemStyle: { color: 'transparent' } })
  })

  // 内部半透明蓝色弧形光带渐变
  const innerArcGrad = new echarts.graphic.LinearGradient(0, 0, 1, 1, [
    { offset: 0, color: 'rgba(90,190,255,0.8)' },
    { offset: 0.55, color: 'rgba(45,120,255,0.4)' },
    { offset: 1, color: 'rgba(40,110,230,0.1)' }
  ])

  // 完整细环的通用配置
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
    tooltip: { show: false },
    legend: { show: false },
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    series: [
      // 1. 最外侧渐变实线环（上半圆深色，下半圆渐隐）
      {
        type: 'pie',
        silent: true,
        radius: ['88%', '90%'],
        center: ['50%', '50%'],
        startAngle: 180,
        label: { show: false },
        labelLine: { show: false },
        data: [
          // 上半圆（9点→12点→3点）：深色实线
          {
            value: 50,
            name: '',
            itemStyle: { color: '#63B9FF' }
          },
          // 下半圆（3点→6点→9点）：由深渐隐
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
      // 2. 主分段环（五段彩色 + 缺口）
      {
        type: 'pie',
        silent: true,
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
      // 3. 主环内侧细亮环
      fullRing(['65%', '66.5%'], 'rgba(90,180,255,0.55)'),
      // 4. 内侧点状虚环
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
      // 5. 内侧细环
      fullRing(['53%', '54%'], 'rgba(80,160,235,0.3)'),
      // 6. 内部蓝色弧形光带（底部 130°，自 4 点钟方向扫到 9 点半）
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
      // 7. 中心细环
      fullRing(['34%', '34.8%'], 'rgba(80,160,235,0.22)'),
      // 8. 最内细环
      fullRing(['24%', '24.6%'], 'rgba(80,160,235,0.15)')
    ]
  }
}
