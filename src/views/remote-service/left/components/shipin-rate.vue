<template>
  <div class="shipin-rate">
    <!-- 顶部两个总数卡 -->
    <div class="stat-row">
      <div v-for="item in statList" :key="item.label" class="stat-card">
        <div class="stat-label">{{ item.label }}</div>
        <div class="stat-value">{{ item.value.toLocaleString() }}</div>
      </div>
    </div>
    <!-- 底部达成率/转化率柱状图 -->
    <div class="chart-box">
      <commonChart :option="SPB_RATE_OPTION()" />
    </div>
  </div>
</template>

<script setup>
import commonChart from '@/components/common-chart.vue'
import { SPB_RATE_OPTION } from '@/views/remote-service/options.js'

// 视频办达成/转化总数
const statList = [
  { label: '视频办达成总数', value: 286400 },
  { label: '视频办转化总数', value: 286400 }
]
</script>

<style scoped lang="scss">
.shipin-rate {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 14px 8px;
  display: flex;
  flex-direction: column;

  .stat-row {
    display: flex;
    justify-content: space-between;
    gap: 12px;

    .stat-card {
      flex: 1;
      height: 68px;
      background: url('@/assets/images/Frame 4273190169.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      padding: 10px 15px;

      .stat-label {
        font-size: 16px;
        color: #d2e7f1;
        font-family: Alibaba-PuHuiTi-Regular;
      }

      .stat-value {
        margin-top: 6px;
        font-family: Alibaba-PuHuiTi-Medium;
        font-size: 22px;
        font-weight: 400;
        background: linear-gradient(180deg, #ffffff 30%, #78d6ff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        margin-top: 16px;
      }
    }
  }

  .chart-box {
    flex: 1;
    margin-top: 8px;
  }
}
</style>
