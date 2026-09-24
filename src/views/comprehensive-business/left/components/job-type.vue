<template>
  <div class="job-type">
    <div class="job-chart">
      <commonChart :option="YCFWBJLFB_OPTION()" />
    </div>
    <div class="job-legend">
      <div v-for="cel in chartData" :key="cel.label" class="cell">
        <div class="left">
          <span>{{ cel.label }}</span>
        </div>
        <div class="center" :style="{ color: cel.color }">{{ cel.num.toLocaleString() }}<span> 人</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import commonChart from '@/components/common-chart.vue'
import { YCFWBJLFB_OPTION, JOB_TYPE_DATA as chartData } from '../../options.js'
</script>

<style scoped lang="scss">
.job-type {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .job-chart {
    width: 190px;
    height: 177px;
    background: url('@/assets/images/group1109-2.png');
    background-size: 100% 100%;
    position: relative;
  }
  .job-legend {
    width: 223px;
    height: 177px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .cell {
      height: 34px;
      background: url('@/assets/images/Group 2036084042.png');
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
        color: #ffffff;
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
      background: url('@/assets/images/Group 2036084041.png');
      background-size: 100% 100%;
    }
    .cell:nth-child(3) {
      background: url('@/assets/images/Group 2036084043.png');
      background-size: 100% 100%;
    }
    .cell:nth-child(4) {
      background: url('@/assets/images/Group 2036084044.png');
      background-size: 100% 100%;
    }
    .cell:nth-child(5) {
      background: url('@/assets/images/Group 2036084045.png');
      background-size: 100% 100%;
    }
  }
}
</style>
