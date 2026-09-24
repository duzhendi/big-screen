<template>
  <div class="fund-structure">
    <div class="fund-chart">
      <commonChart :option="FUND_STRUCTURE_OPTION()" />
    </div>
    <div class="fund-legend">
      <div v-for="cel in chartData" :key="cel.label" class="cell">
        <div class="left">
          <div class="icon" :style="{ background: cel.color }"></div>
          <span>{{ cel.label }}</span>
        </div>
        <div class="center">{{ cel.num.toLocaleString() }}<span>万元</span></div>
        <div class="right">占比<span>{{ cel.cert }}%</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import commonChart from '@/components/common-chart.vue'
  import { FUND_STRUCTURE_OPTION } from '@/views/sb-fund/options.js'

  const chartData = [
    { num: 514568, cert: 37.1, label: '养老保险', color: '#00D4FF' },
    { num: 308741, cert: 24, label: '医疗保险', color: '#0066DD' },
    { num: 231556, cert: 17.5, label: '工伤保险', color: '#E6C200' },
    { num: 154370, cert: 12.5, label: '失业保险', color: '#FF7D5C' },
    { num: 77185, cert: 12.5, label: '生育保险', color: '#B06CE8' }
  ]
</script>

<style scoped lang="scss">
  .fund-structure {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 8px 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .fund-chart {
      width: 170px;
      height: 170px;
      flex-shrink: 0;
    }

    .fund-legend {
      width: 255px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center; 

      .cell {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 14px;

        .left {
          display: flex;
          align-items: center;
          width: 80px; 

          .icon {
            width: 6px;
            height: 6px;
            margin-right: 6px;
            border-radius: 1px;
          }
          > span {
            font-size: 14px;
            color: #fff;
            font-family: Alibaba-PuHuiTi-Regular;
          }
        }
        .center {
          font-family: Alibaba-PuHuiTi-Regular;
          font-size: 14px;
          color: #fff;
          width: 100px;
          margin: 0 6px;

          > span {
            margin-left: 2px;
            color: #bebebe;
          }
        }
        .right {
          font-size: 14px;
          color: #fff;
          font-family: Alibaba-PuHuiTi-Regular;
          width: 100px;
          > span {
            margin-left: 2px;
          }
        }
      }
      .cell:nth-child(1) {
        font-size: 16px;
        .center {
          color: #00D4FF;
        }
      }
      .cell:nth-child(2) {
        font-size: 16px;
        .center {
          color: #0066DD;
        }
      }
      .cell:nth-child(3) {
        font-size: 16px;
        .center {
          color: #E6C200;
        }
      }
      .cell:nth-child(4) {
        font-size: 16px;
        .center {
          color: #FF7D5C;
        }
      }
      .cell:nth-child(5) {
        font-size: 16px;
        .center {
          color: #B06CE8;
        }
      }
    }
  }
</style>