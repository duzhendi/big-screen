<template>
  <div class="service-num">
    <div class="service-chart">
      <commonChart :option="FWCSFWLX_OPTION()" />
    </div>
    <div class="service-legend">
      <div v-for="cel in chartData" :key="cel.label" class="cell">
        <div class="left">
          <div class="icon" :style="{ background: cel.color }"></div>
          <span>{{ cel.label }}</span>
        </div>
        <div class="center" :style="{ color: cel.color }">{{ cel.num.toLocaleString() }}<span>次</span></div>
        <div class="right">
          占比<span>{{ cel.cert }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import commonChart from '@/components/common-chart.vue'
import { FWCSFWLX_OPTION } from '@/views/msjx/options.js'

const chartData = ref([
  { num: 3260, cert: 40, label: '已处理', color: '#00D4FF' },
  { num: 1080, cert: 30, label: '处理中', color: '#0066DD' },
  { num: 640, cert: 16, label: '待处理', color: '#E6C200' },
  { num: 260, cert: 14, label: '已驳回', color: '#CC3A3A' }
])
</script>

<style scoped lang="scss">
.service-num {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .service-chart {
    width: 193px;
    height: 178px;
    background: url('@/assets/images/grap-0098.png') no-repeat;
    background-size: 100% 100%;
    position: relative;
  }

  .service-legend {
    width: 223px;
    height: 177px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .cell {
      height: 38px;
      background: url('@/assets/images/home/Rectangle346241641.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;

      .left {
        display: flex;
        align-items: center;
        .icon {
          width: 6px;
          height: 6px;
          margin-right: 4px;
        }
        > span {
          font-size: 14px;
          background: linear-gradient(180deg, #ffffff 70%, #adcdff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      }

      .center {
        font-family: Alibaba-PuHuiTi-Medium;
        font-size: 14px;
        > span {
          font-family: Alibaba-PuHuiTi-Regular;
          font-size: 14px;
          background: linear-gradient(180deg, #ffffff 70%, #adcdff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      }

      .right {
        font-size: 14px;
        background: linear-gradient(180deg, #ffffff 70%, #adcdff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        > span {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>