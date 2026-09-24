// 模拟五色图数据 (以各区县adcode或name为key，value为数量)
// 颜色将由 ECharts visualMap 根据 value 自动映射
export const fiveColorMapData = [
  { name: '两江新区', value: 4500 }, // 属于 4000-5000
  { name: '渝中区', value: 3200 }, // 属于 2000-3000
  { name: '江北区', value: 2800 },
  { name: '九龙坡区', value: 2500 },
  { name: '沙坪坝区', value: 2100 },
  { name: '南岸区', value: 1800 }, // 属于 1000-2000
  { name: '北碚区', value: 1500 },
  { name: '渝北区', value: 1200 },
  { name: '巴南区', value: 900 }, // 属于 500-1000
  { name: '大渡口区', value: 800 },
  { name: '江津区', value: 700 },
  { name: '合川区', value: 600 },
  { name: '永川区', value: 550 },
  { name: '长寿区', value: 400 }, // 属于 0-500
  { name: '綦江区', value: 300 },
  { name: '大足区', value: 200 },
  { name: '璧山区', value: 100 },
  { name: '铜梁区', value: 50 },
  { name: '潼南区', value: 450 },
  { name: '荣昌区', value: 350 },
  { name: '开州区', value: 250 },
  { name: '梁平区', value: 150 },
  { name: '武隆区', value: 100 },
  { name: '城口县', value: 80 },
  { name: '丰都县', value: 120 },
  { name: '垫江县', value: 180 },
  { name: '忠县', value: 220 },
  { name: '云阳县', value: 280 },
  { name: '奉节县', value: 320 },
  { name: '巫山县', value: 380 },
  { name: '巫溪县', value: 420 },
  { name: '石柱土家族自治县', value: 150 },
  { name: '秀山土家族苗族自治县', value: 200 },
  { name: '酉阳土家族苗族自治县', value: 250 },
  { name: '彭水苗族土家族自治县', value: 300 },
  { name: '万州区', value: 1500 },
  { name: '涪陵区', value: 1300 },
  { name: '南川区', value: 900 },
  { name: '黔江区', value: 3800 },
  { name: '万盛经开区', value: 3800 },
  { name: '中心城区', value: 9800 } // 对应合并后的区域
]

// Top 5 数据
export const top5Data = [
  { name: '两江新区', value: 4500 },
  { name: '渝中区', value: 3200 },
  { name: '江北区', value: 2800 },
  { name: '九龙坡区', value: 2500 },
  { name: '沙坪坝区', value: 2100 }
]

// 模拟散点图数据
export const scatterPlotData = [
  { name: '两江数字经济产业园', value: [106.49, 29.62, 120] },
  { name: '解放碑CBD', value: [106.57, 29.56, 150] },
  { name: '江北嘴金融城', value: [106.58, 29.57, 130] },
  { name: '杨家坪商圈', value: [106.51, 29.51, 90] },
  { name: '三峡广场', value: [106.46, 29.55, 100] },
  { name: '南坪商圈', value: [106.56, 29.52, 110] },
  { name: '万州万达广场', value: [108.38, 30.8, 80] },
  { name: '涪陵高笋塘', value: [107.39, 29.7, 70] },
  { name: '永川万达', value: [105.92, 29.35, 60] },
  { name: '合川财富广场', value: [106.27, 29.99, 50] }
]

// 当前只开放首页、公共服务平台运行情况、综柜事项三个导航，其余暂时注释
export const menuListData = [
  { label: '首页', name: 'home' },
  // { label: '全民参保', name: 'fully-insured' },
  // { label: '远程服务', name: 'ycfw' },
  // { label: '免申即享', name: 'msjx' },
  { label: '公共服务运行', name: 'public-service' },
  // { label: '职业年金', name: 'zynj' },
  // { label: '社保基金', name: 'sbjj' },
  // { label: '综合业务', name: 'zhyw' },
  { label: '综柜事项', name: 'zgsx' },
  { label: '校验报表', name: 'check-report' }
]

export const cbTop5Style = [
  'background: rgba(250,215,96,0.5);box-shadow: 0px 0px 6px 0px rgba(67,148,255,0.3);border-image: linear-gradient(270deg, rgba(250, 215, 96, 1), rgba(250, 215, 96, 0)) 1 1;',
  'background: rgba(0,255,196,0.5);box-shadow: 0px 0px 6px 0px rgba(67,148,255,0.3);border-image: linear-gradient(270deg, rgba(0, 255, 196, 1), rgba(0, 255, 196, 0)) 1 1;',
  'background: rgba(0,238,255,0.5);box-shadow: 0px 0px 6px 0px rgba(67,148,255,0.3);border-image: linear-gradient(270deg, rgba(0, 238, 255, 1), rgba(0, 238, 255, 0)) 1 1;',
  'background: rgba(0,132,255,0.5);box-shadow: 0px 0px 6px 0px rgba(67,148,255,0.3);border-image: linear-gradient(270deg, rgba(120, 190, 255, 1), rgba(0, 132, 255, 0)) 1 1;',
  'background: rgba(0,132,255,0.5);box-shadow: 0px 0px 6px 0px rgba(67,148,255,0.3);border-image: linear-gradient(270deg, rgba(120, 190, 255, 1), rgba(0, 132, 255, 0)) 1 1;'
]

export const mszcTop5Style = [
  'background: rgba(213,39,42,0.6);border-radius: 1px 1px 1px 1px;border: 1px solid;border-image: linear-gradient(90deg, rgba(213, 39, 42, 1), rgba(213, 39, 42, 0.4), rgba(213, 39, 42, 0.4), rgba(213, 39, 42, 1)) 1 1;',
  'background: rgba(250,214,95,0.6);border-radius: 1px 1px 1px 1px;border: 1px solid;border-image: linear-gradient(90deg, rgba(250, 214, 95, 1), rgba(250, 214, 95, 0.4), rgba(250, 214, 95, 0.4), rgba(250, 214, 95, 1)) 1 1;',
  'background: rgba(0,145,255,0.5);border-radius: 1px 1px 1px 1px;border: 1px solid;border-image: linear-gradient(90deg, rgba(0, 145, 255, 1), rgba(0, 145, 255, 0.4), rgba(0, 145, 255, 0.4), rgba(0, 145, 255, 1)) 1 1;',
  'background: rgba(140,173,201,0.5);border-radius: 1px 1px 1px 1px;border: 1px solid;border-image: linear-gradient(90deg, rgba(140, 173, 201, 1), rgba(140, 173, 201, 0.4), rgba(140, 173, 201, 0.4), rgba(140, 173, 201, 1)) 1 1;',
]