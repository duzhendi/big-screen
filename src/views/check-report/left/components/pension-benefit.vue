<template>
  <div class="pension-benefit">
    <div class="section-title">
      <div class="title-left">
        <img class="title-arrow" :src="titleArrow" alt="" />
        <span class="title-text">养老待遇</span>
      </div>
      <span class="detail-btn" @click="handleDetail">明细</span>
    </div>
    <div class="row-list">
      <div
        v-for="(row, index) in pensionRows"
        :key="row.label"
        class="row-item"
        :class="{ active: activePensionRow === index }"
      >
        <img class="row-icon" :src="row.icon" alt="" />
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
import iconPayable from '@/assets/images/icon-pension-payable.png'
import iconRetireeBasic from '@/assets/images/icon-pension-retiree-basic.png'
import iconRecipientAverage from '@/assets/images/icon-pension-recipient-average.png'
import iconRetired from '@/assets/images/icon-pension-retired.png'
import iconMonthlyAverage from '@/assets/images/icon-pension-monthly-average.png'

// 月人均基本养老金 / 月人均养老金 共用同一张图标
const pensionRows = [
  { label: '本期应发养老金', value: '1912668.49', unit: '万元', icon: iconPayable },
  { label: '退休(职)人员基本养老金', value: '1910101.00', unit: '万元', icon: iconRetireeBasic },
  { label: '离退休(职)实际领取待遇人员平均数', value: '864831', unit: '万元', icon: iconRecipientAverage },
  { label: '退休（职）', value: '864618', unit: '万元', icon: iconRetired },
  { label: '月人均基本养老金', value: '3681.97', unit: '元', icon: iconMonthlyAverage },
  { label: '月人均养老金', value: '3685.11', unit: '元', icon: iconMonthlyAverage }
]

// 设计稿中「退休(职)人员基本养老金」是深蓝底 + 金色数值
const activePensionRow = ref(1)

const handleDetail = () => {
  console.log('养老待遇', '//////明细')
}
</script>

<style scoped lang="scss">
.pension-benefit {
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
    margin-top: 12px;

    .row-item {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 40px; 
      background: url('@/assets/images/Rectangle 346246124.png') no-repeat;
      background-size: 100% 100%;
      margin-top: 6px;
      padding: 0 10px;

      .row-icon {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        object-fit: contain;
      }

      .row-label {
        flex: 1;
        min-width: 0;
        font-size: 14px;
        line-height: 20px;
        color: #d9e8f4;
        font-family: Alibaba-PuHuiTi-Regular;
      }

      .row-value {
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

      // 选中态：深蓝底 + 金色数值
      &.active {
        // border-bottom-color: transparent;
        background: rgba(255,164,7,0.04);
        box-shadow: inset 0px 0px 24px 0px rgba(255,164,7,0.4);
        border-radius: 2px;
        border: 1px solid rgba(255,164,7,0.2);
        .row-value {
          background: linear-gradient(180deg, #ffe9a8 0%, #f5c451 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;

          .unit {
            color: #f5c451;
            -webkit-text-fill-color: #f5c451;
          }
        }
      }
    }

  }
}
</style>
