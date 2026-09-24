<template>
  <div class="service-num">
    <div class="service-chart">
      <commonChart :option="YCFWBJLFB_OPTION()" /> 
    </div>
    <div class="service-legend">
      <div v-for="cel in chartData" :key="cel.label" class="cell">
        <div class="left">
          <span>{{ cel.label }}</span>
        </div>
        <div class="center" :style="{ color: cel.color }">{{ cel.num }}<span> 人</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import commonChart from '@/components/common-chart.vue'
import { YCFWBJLFB_OPTION } from '@/views/fully-insured/options.js'

const chartData = ref([
  {
    num: 36210,
    cert: 42,
    label: '在职',
    color: '#0091FF'
  },
  {
    num: 36210,
    cert: 42,
    label: '退休',
    color: '#00EEFF'
  },
  {
    num: 36210,
    cert: 42,
    label: '灵活就业',
    color: '#00FFC4'
  },
  {
    num: 36210,
    cert: 42,
    label: '城乡',
    color: '#FB9506'
  },
  {
    num: 36210,
    cert: 42,
    label: '视同参保',
    color: '#FAD760'
  }
])
// 城市数据
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
    width: 190px;
    height: 177px;
    background: url('@/assets/images/group1109-2.png');
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
      height: 34px;
      background: url('@/assets/images/Group 2036084034.png');
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
      margin-bottom: 10px;
      .left {
        display: flex;
        align-items: center; 
        padding-left: 28px;
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
    }
    .cell:nth-child(2) {
      background: url('@/assets/images/Group 2036084035.png');
      background-size: 100% 100%;
    }
    .cell:nth-child(3) {
      background: url('@/assets/images/Group 2036084036.png');
      background-size: 100% 100%;
    }
    .cell:nth-child(4) {
      background: url('@/assets/images/Group 2036084037.png');
      background-size: 100% 100%;
    }
    .cell:nth-child(5) {
      background: url('@/assets/images/Group 2036084038.png');
      background-size: 100% 100%;
    }
  }
}
</style>
