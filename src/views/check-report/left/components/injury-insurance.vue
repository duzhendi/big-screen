<template>
  <div class="injury-insurance">
    <div class="section-title">
      <div class="title-left">
        <img class="title-arrow" :src="titleArrow" alt="" />
        <span class="title-text">工伤保险</span>
      </div>
      <span class="detail-btn" @click="handleDetail">明细</span>
    </div>
    <div class="row-list">
      <div v-for="row in injuryRows" :key="row.label" class="row-item insurance">
        <div class="row-label">{{ row.label }}</div>
        <div class="row-value">
          <span class="value">{{ row.value }}</span>
          <span class="unit">{{ row.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import titleArrow from '@/assets/images/标题背景123.png'

const injuryRows = [
  { label: '参保人员期末数', value: '1992494', unit: '人' },
  { label: '当年新增参保人数（首次参保）', value: '74797', unit: '人' },
  { label: '上月未统计当月统计为参保人数', value: '20550', unit: '人' },
  { label: '暂停超过12个月当月不统计为参保人数', value: '20938', unit: '人' }
]

const handleDetail = () => {
  console.log('工伤保险', '//////明细')
}
</script>

<style scoped lang="scss">
.injury-insurance {
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

  .row-list {
    margin-top: 2px;

    .row-item {
      display: flex;
      align-items: center;
      height: 65px;
      line-height: 65px;
      box-sizing: border-box;
      background: url('@/assets/images/Group 2036086034.png') no-repeat;
      background-size: 100% 100%;

      .row-label {
        flex: 1;
        font-size: 14px;
        color: #d9e8f4;
        font-family: Alibaba-PuHuiTi-Regular;
        padding-left: 70px;
      }

      .row-value {
        width: 80px;
        text-align: right;
        padding-right: 10px;
        flex-shrink: 0;
        font-size: 15px;
        font-family: Alibaba-PuHuiTi-Medium;
        background: linear-gradient(180deg, #ffffff 40%, #adcdff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;

        .unit {
          margin-left: 1px;
          font-size: 12px;
          font-family: Alibaba-PuHuiTi-Regular;
          color: rgba(255, 255, 255, 0.75);
          -webkit-text-fill-color: rgba(255, 255, 255, 0.75);
        }
      }
    }
  }
}
</style>
