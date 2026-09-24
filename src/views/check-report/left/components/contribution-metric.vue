<template>
  <div class="contribution-metric">
    <div class="section-title">
      <div class="title-left">
        <img class="title-arrow" :src="titleArrow" alt="" />
        <span class="title-text">缴费指标</span>
      </div>
      <span class="detail-btn" @click="handleDetail">明细</span>
    </div>
    <div class="metric-cards">
      <div
        v-for="(item, index) in metricCards"
        :key="item.label"
        class="metric-card"
        :class="{ active: activeMetric === index }"
      >
        <div class="metric-label">
          <span>{{ item.label }}</span>
          <span>{{ item.unit }}</span>
        </div>
        <div class="metric-value">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import titleArrow from '@/assets/images/标题背景123.png'
 
// 设计稿中第一张为金色选中态
const metricCards = [
  { label: '缴费基数总额', unit: '（万元）', value: '7933424.76' },
  { label: '缴费人数平均数', unit: '（万元）', value: '1865010' },
  { label: '月人均缴费工资', unit: '（元）', value: '7089.71' }
]
const activeMetric = ref(0)

const handleDetail = () => {
  console.log('缴费指标', '//////明细')
}
</script>

<style scoped lang="scss">
.contribution-metric {
  .section-title {
    height: 28px;
    box-sizing: border-box;
    padding: 0 0 0 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(to left, rgba(2, 16, 40, 0.6) 0%, rgba(13, 96, 179, 0.7) 100%);
    border-bottom: 1px solid rgba(0, 145, 255, 0.45);

    .title-left {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .title-arrow {
      width: 16px;
      height: 16px;
      object-fit: contain;
    }

    .title-text {
      font-size: 15px;
      color: #fff;
      font-family: Alibaba-PuHuiTi-Medium;
      letter-spacing: 1px;
    }

    .detail-btn {
      width: 44px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      font-size: 12px;
      color: #cdeaff;
      cursor: pointer;
      background: rgba(0, 145, 255, 0.2);
      border: 1px solid #0071bc;
      border-radius: 2px;
    }
  }

  .metric-cards {
    display: flex;
    gap: 9px;
    margin-top: 10px;

    .metric-card {
      flex: 1;
      min-width: 0;
      height: 152px;
      box-sizing: border-box;
      padding: 14px 6px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: url('@/assets/images/Group 2036083732.png') no-repeat;
      background-size: 100% 100%;
      .metric-label {
        margin-top: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 13px;
        line-height: 19px;
        background: linear-gradient(180deg, #ffffff 30%, #BBC3C4 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        font-family: Alibaba-PuHuiTi-Regular;
        margin-top: 50px;
      }

      .metric-value {
        margin-top: 10px;
        font-size: 15px;
        font-family: Alibaba-PuHuiTi-Medium;
        background: linear-gradient(180deg, #ffffff 30%, #0091FF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
    .metric-card:nth-child(1) {
      .metric-value {
        background: linear-gradient(180deg, #ffffff 30%, #FFA407 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .metric-card:nth-child(2) {
      background: url('@/assets/images/Group 2036083733.png') no-repeat;
      background-size: 100% 100%;
    }
    .metric-card:nth-child(3) {
      background: url('@/assets/images/Group 2036083734.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
</style>
