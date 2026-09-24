<template>
  <div class="biz-change">
    <div class="chart-container">
      <div>
        <div class="legend-total">共计 <span class="total-num">250,400</span></div>
        <div class="chart">
          <commonChart :option="YCFWBJLFB_OPTION(bizSegData)" />
        </div>
      </div>
      <div class="legend">
        <div v-for="cel in chartData" :key="cel.name" class="cell">
          <div class="dot" />
          <div class="label">{{ cel.name }}</div>
          <div class="val">{{ cel.num.toLocaleString() }}<span class="unit">件</span></div>
          <div class="percent">占比 {{ cel.percent }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import commonChart from '@/components/common-chart.vue'
import { YCFWBJLFB_OPTION } from '../../options.js'

const chartData = [
  { name: '参保登记', num: 86200, percent: 88, segValue: 40 },
  { name: '待遇申领', num: 68400, percent: 30, segValue: 30 },
  { name: '转移接续', num: 52600, percent: 16, segValue: 16 },
  { name: '其他', num: 43200, percent: 14, segValue: 14 }
]

const bizSegData = chartData.map(i => ({ name: i.name, value: i.segValue }))
</script>

<style scoped lang="scss">
.biz-change {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  gap: 10px;
  .legend-total {
    width: 181px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background: url('@/assets/images/Frame 1502.png') no-repeat;
    background-size: 100% 100%;
    color: #d6ecff;
    text-align: center;
    .total-num {
      font-family: Alibaba-PuHuiTi-Medium;
      font-size: 16px;
      color: #64dcff;
      margin-left: 2px;
    }
  }
  .chart-container {
    display: flex;
    gap: 14px;
    margin-top: 14px;
  }
  .chart {
    width: 180px;
    height: 150px;
    flex-shrink: 0; 
  }

  .legend {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between; 

    .cell {
      height: 42px;
      display: flex;
      align-items: center;
      gap: 6px;
      background: url('@/assets/images/Rectangle 346241641.png') no-repeat;
      background-size: 100% 100%;
      padding-left: 11px;
      margin-bottom: 6px;
      .dot {
        width: 6px;
        height: 6px;
        flex-shrink: 0;
        background: #0091FF;
      }

      .label {
        width: 70px;
        flex-shrink: 0;
        font-size: 14px;
        color: #e8f3ff;
        font-family: Alibaba-PuHuiTi-Regular;
      }

      .val {
        width: 86px;
        flex-shrink: 0;
        font-family: Alibaba-PuHuiTi-Medium;
        font-size: 14px;
        color: #0091FF;
        .unit {
          font-size: 12px;
          color: rgba(200, 220, 255, 0.7);
          padding-left: 3px;
        }
      }

      .percent {
        width: 60px;
        font-size: 12px;
        color: #fff;
      }
    }
    .cell:nth-child(2) {
      .val {
        color: #00C4FF;
      }
      .dot {
        background: #00C4FF;
      }
    }
    .cell:nth-child(3) {
      .val {
        color: #00FFC4;
      }
      .dot {
        background: #00FFC4;
      }
    }
    .cell:nth-child(4) {
      .val {
        color: #FAD65F;
      }
      .dot {
        background: #FAD65F;
      }
    }
  }
}
</style>
