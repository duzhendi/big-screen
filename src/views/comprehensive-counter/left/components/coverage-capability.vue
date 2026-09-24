<template>
  <div class="coverage-capability">
    <div class="trend-title">服务覆盖能力</div>
    <div class="capability-content">
      <!-- 左侧：环形仪表图 -->
      <div class="gauge-side">
        <div class="gauge-title">各经办机构应用率</div>
        <div class="gauge-wrap">
          <commonChart :option="COVERAGE_GAUGE_OPTION(applyRate)" />
        </div>
      </div>

      <!-- 右侧：两个上下堆叠卡片 -->
      <div class="card-side">
        <div v-for="item in cardList" :key="item.label" class="stat-card">
          <div class="stat-label">{{ item.label }}</div>
          <div class="stat-value">
            {{ item.value.toLocaleString() }}<span class="unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import commonChart from '@/components/common-chart.vue'
import { COVERAGE_GAUGE_OPTION } from '../../options'

// 各经办机构应用率
const applyRate = 95

// 纳入情况
const cardList = [
  { label: '纳入线下政务综窗', value: 4947, unit: '件', iconClass: 'icon-window' },
  { label: '纳入网厅', value: 0, unit: '件', iconClass: 'icon-net' }
]
</script>

<style scoped lang="scss">
.coverage-capability {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .capability-content {
    box-sizing: border-box;
    padding: 6px 14px 0 14px;
    display: flex;

    // ---- 左侧仪表图 ----
    .gauge-side {
      width: 33%;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      .gauge-title {
        font-size: 14px;
        color: #c2d9f6;
        font-family: Alibaba-PuHuiTi-Regular;
        letter-spacing: 1px;
      }

      .gauge-wrap {
        flex: 1;
        width: 100%;
        min-height: 0;
      }
    }

    // ---- 右侧卡片 ----
    .card-side {
      flex: 1; 

      .stat-card {
        height: 40px;
        height: 40px;
        display: flex;
        padding: 0 15px;
        box-sizing: border-box;
        background: url('@/assets/images/Group 20360846751.png') no-repeat;
        background-size: 100% 100%;
        margin-top:20px;

        .stat-label {
          flex: 1;
          font-size: 14px;
          color: #d9e8f4;
          font-family: Alibaba-PuHuiTi-Regular;
          margin-left: 24px;
          padding-top: 2px;
        }

        .stat-value {
          flex: 0.6;
          font-size: 20px;
          font-family: Alibaba-PuHuiTi-Regular;
          color: #00D1FF;
          flex-shrink: 0;
          text-align: right;

          .unit {
            font-size: 13px;
            color: rgba(255, 255, 255, 0.75);
            margin-left: 2px;
          }
        }
      }
      .stat-card:nth-child(2) {
        background: url('@/assets/images/Group 20360846791.png') no-repeat;
        background-size: 100% 100%;
        .stat-value {
          color: #0091FF;
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
