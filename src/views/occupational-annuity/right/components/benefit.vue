<template>
  <div class="oa-benefit">
    <div class="chartPieBg"></div>
    <div ref="chartRef" class="chartPie"></div>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import * as echarts from 'echarts'

  const chartRef = ref(null)
  let chart = null

  const option = {
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
    series: [
      {
        name: '各参保险种人数分布',
        type: 'pie',
        radius: ['50%', '66%'],
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
          color: '#fff',
          fontSize: 14,
          fontFamily: 'Alibaba-PuHuiTi-Regular'
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: 26400, name: '已发放', itemStyle: { color: '#0091FF' } },
          { value: 2860, name: '暂缓发放', itemStyle: { color: '#FAD65F' } },
          { value: 5420, name: '正常发放', itemStyle: { color: '#00FFC4' } }
        ]
      }
    ]
  }

  const handleResize = () => chart && chart.resize()

  onMounted(() => {
    chart = echarts.init(chartRef.value)
    chart.setOption(option)
    window.addEventListener('resize', handleResize)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    chart && chart.dispose()
  })
</script>

<style scoped lang="scss">
.oa-benefit {
  width: 100%;
  height: 100%;
  padding: 10px 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .chartPie {
    width: 360px;
    height: 240px;
  }
  .chartPieBg {
    position: absolute;
    top: 11.5%;
    left: 28.5%;
    width: 198px;
    height: 198px;
    background: url('@/assets/images/Group 1321316250111.png') no-repeat;
    background-size: 100% 100%; 
  }
   
}
</style>