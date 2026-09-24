<template>
  <div class="filling-capability">
    <div class="trend-title">智能填报能力</div>
    <div class="capability-content">
      <!-- 左侧：预填率环形图 -->
       <div class="ring-box"> 
         <div class="ring-side">
           <commonChart :option="FILLING_RING_OPTION(prefillRate)" />
         </div>
       </div>

      <!-- 右侧：文本 + 数值行 -->
      <div class="row-side"> 
        <div v-for="item in chartData" :key="item.name" class="chart-row">
          <div class="name">{{ item.name }}</div>
          <div class="count">{{ item.value.toLocaleString() }}<span class="unit">{{ item.unit }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import commonChart from '@/components/common-chart.vue'
import { FILLING_RING_OPTION } from '../../options'

const chartData = [
  { name: '电子表单数据项总数', value: 10, unit: '个' },
  { name: '预填数据项', value: 7, unit: '个' }
]

// 预填率 = 预填数据项 / 电子表单数据项总数
const [formTotal, prefillTotal] = chartData
const prefillRate = Math.round((prefillTotal.value / formTotal.value) * 100)
</script>

<style scoped lang="scss">
.filling-capability {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .capability-content {
    flex: 1;
    min-height: 0;
    box-sizing: border-box;
    padding: 8px 14px;
    display: flex;
    align-items: stretch;
    gap: 12px;
    margin-top: 4px;
   
    .ring-box {
      width: 147px;
      height: 106px;
      background: url('@/assets/images/图列-1092.png') no-repeat center center;
      background-size: 100% 100%; 
      display: flex;
      align-items: center;
      justify-content: center;

    }

    // ---- 左侧环形图 ----
    .ring-side {
      width: 86px;
      height: 86px;
      box-sizing: border-box;
      padding: 4px; 
      background: url('@/assets/images/Group 2036083510.png') no-repeat center center;
      background-size: 100% 100%; 
    }

    // ---- 右侧行列表 ----
    .row-side {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .chart-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 25px 10px 10px;
      background: url('@/assets/images/Rectangle 34624164111.png') no-repeat;
      background-size: 100% 100%;  
      margin-bottom: 10px;

      .name {
        font-size: 14px;
        color: #e8f3ff;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: Alibaba-PuHuiTi-Regular;
      }

      .count {
        flex-shrink: 0;
        font-family: Alibaba-PuHuiTi-Medium;
        font-size: 14px;
        color: #0091FF;
        letter-spacing: 0.5px;

        .unit {
          font-size: 14px;
          margin-left: 2px;
          color: rgba(200, 220, 255, 0.7);
          font-family: Alibaba-PuHuiTi-Medium;
        }
      }
    }
  }

  // 标题栏，与右侧各面板保持一致
  .trend-title {
    flex-shrink: 0;
    height: 28px;
    line-height: 28px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    background: url('@/assets/images/标题背景12345.png') no-repeat center center;
    background-size: 100% 100%;
    padding-left: 24px;
    font-size: 14px;
    color: #fff;
    font-family: Alibaba-PuHuiTi-Medium;
    letter-spacing: 1px;
    
  }
}
</style>
