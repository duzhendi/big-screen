import * as echarts from 'echarts'

// 首页-全民参保分布
export const QMCBFB_OPTION = (data) => {
  const chartData = [
    {
      value: 6.7,
      name: 'A'
    },
    {
      value: 93.3,
      name: 'B'
    }
  ]
  const colorList = [
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: 'rgba(255, 120, 122, 1)'
      },
      {
        offset: 1,
        color: 'rgba(213, 39, 42, 1)'
      }
    ]),
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: 'rgba(0, 145, 255, 1)'
      },
      {
        offset: 1,
        color: 'rgba(106, 191, 255, 1)'
      }
    ])
  ]
  const sum = chartData.reduce((per, cur) => per + cur.value, 0)
  const gap = (1 * sum) / 100
  const pieData1 = []
  const pieData2 = []
  const gapData = {
    name: '',
    value: gap,
    itemStyle: {
      color: 'transparent'
    }
  }
  for (let i = 0; i < chartData.length; i++) {
    pieData1.push({
      ...chartData[i],
      itemStyle: {
        borderRadius: 100,
        shadowColor: '#2a2a34',
        shadowBlur: 0,
        shadowOffsetY: 0,
        shadowOffsetX: 0,
        borderColor: '#2a2a34',
        borderWidth: 0
      }
    })
    pieData1.push(gapData)
  }

  return {
    xAxis: { show: false },
    yAxis: { show: false },
    grid: { top: 0, bottom: 0, left: 0, right: 0, containLabel: false },
    title: { show: false },
    tooltip: { show: false },
    legend: { show: false },

    color: colorList,

    series: [
      {
        type: 'pie',
        z: 3,
        roundCap: true,
        radius: ['70%', '85%'],
        center: ['50%', '50%'],
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        data: pieData1
      },
      {
        name: '库存情况',
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
        clockwise: false,
        data: chartData,
        label: {
          show: false,
          normal: {
            textStyle: {
              color: '#999',
              fontSize: 14
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            borderWidth: 0,
            borderColor: '#ffffff'
          },
          emphasis: {
            borderWidth: 0,
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
}

// 首页-各远程服务类型办件量分布
export const YCFWBJLFB_OPTION = (data) => {
  return {
    xAxis: { show: false },
    yAxis: { show: false },
    grid: { top: 0, bottom: 0, left: 0, right: 0, containLabel: false },
    title: { show: false },
    tooltip: { show: false },
    legend: { show: false },
    series: [
      {
        name: '',
        type: 'pie',
        hoverAnimation: false,
        legendHoverLink: false,
        radius: ['60%', '80%'],
        center: ['50%', '50%'],
        color: ['rgba(0,145,255,0.3)', 'rgba(0,238,255,0.3)', 'rgba(250,215,96,0.3)'],
        label: {
          normal: {
            position: 'inner'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            // shadowBlur: 15,
            // shadowColor: 'rgba(0, 0, 0, 0.5)',
            borderColor: '#0a1a2a'
            // borderWidth:'10',
          }
        },
        tooltip: {
          show: false
        },
        data: [
          {
            value: 41,
            name: ''
          },
          {
            value: 20,
            name: ''
          },
          {
            value: 20,
            name: ''
          }
        ]
      },
      {
        name: 'title',
        type: 'pie',
        radius: ['83%', '90%'],
        center: ['50%', '50%'],
        color: ['rgba(0,145,255, 1)', 'rgba(0,238,255, 1)', 'rgba(250,215,96, 1)'],
        label: {
          normal: {
            show: false,
            position: 'inside',
            formatter: '{d}%',
            textStyle: {
              align: 'center',
              baseline: 'middle',
              fontSize: 16,
              fontWeight: '100'
            }
          }
        },
        labelLine: {
          normal: {
            smooth: true,
            length: 10,
            lineStyle: {
              width: 1.5
            }
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 15,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            borderColor: '#0a1a2a'
            // borderWidth:'5',
          }
        },
        data: [
          {
            value: 41,
            name: 'A'
          },
          {
            value: 20,
            name: 'B'
          },
          {
            value: 20,
            name: 'C'
          }
        ]
      }
    ]
  }
}

// 首页-综合业务办理量top10区域
export const ZHYWBLLTOP10_OPTION = (data) => {
  // mock数据
  const dataArr = {
    xdata: ['海口市', '三亚市', '琼海市', '文昌市', '万宁市', '漳州市', '澄迈县', '五指山市', '东方市', '临高县'],
    vaccination: [167832, 138932, 129032, 98932, 91002, 88736, 84903, 75422, 69023, 40922]
  }

  // tooltip
  const tooltip = {
    trigger: 'axis',
    textStyle: { fontSize: '100%' },
    formatter: (params) => {
      let rander = params
        .map((item) =>
          item.seriesType !== 'pictorialBar'
            ? `<div>${item.seriesName}: ${item.seriesType !== 'line' ? item.value : item.value}</div>`
            : ''
        )
        .join('')
      return `
      <div>${params[0].axisValue}</div>
      ${rander}
  `
    }
  }
  const legend = {
    show: false
  }
  const grid = { top: '10%', bottom: '12%', left: '18%', right: '3%', containLabel: false }

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
      name: '上部1',
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
      name: 'PM2.5（μg/m3）',
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

// 首页-综合业务总量趋势
export const ZHYEZLQS_OPTION = (data) => {
  return {
    tooltip: {},
    grid: {
      top: '12%',
      left: '3%',
      right: '3%',
      bottom: '4%',
      containLabel: true
    },
    legend: {
      show: false
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        axisLine: {
          //坐标轴轴线相关设置。数学上的x轴
          show: true,
          lineStyle: {
            color: '#f9f9f9'
          }
        },
        axisLabel: {
          //坐标轴刻度标签的相关设置
          textStyle: {
            color: '#d1e6eb',
            margin: 15
          }
        },
        axisTick: {
          show: false
        },
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        // max: 140,
        splitNumber: 7,
        splitLine: {
          show: true,
          lineStyle: {
            color: '#0a3256'
          }
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: 'rgba(255, 255, 255, 0.80)'
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '注册总量',
        type: 'line',
        // smooth: true, //是否平滑曲线显示
        // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 6,
        lineStyle: {
          normal: {
            color: '#28ffb3' // 线条颜色
          },
          borderColor: '#f0f'
        },
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#fff'
          }
        },
        itemStyle: {
          normal: {
            color: '#28ffb3'
          }
        },
        tooltip: {
          show: false
        },
        areaStyle: {
          //区域填充样式
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0,154,120,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,0,0, 0)'
                }
              ],
              false
            ),
            shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          }
        },
        data: [393, 438, 485, 631, 689, 824, 987]
      }
    ]
  }
}
