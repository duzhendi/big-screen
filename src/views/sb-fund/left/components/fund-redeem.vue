<template>
  <div class="fund-redeem">
    <div v-for="item in redeemList" :key="item.label" class="redeem-row">
      <img :src="item.imgUrl" class="row-icon" />
      <div class="row-content">
        <div class="row-info">
          <span class="label">{{ item.label }}</span>
          <span class="count">{{ item.num.toLocaleString() }}<span class="unit">万元</span></span>
          <span class="percent">{{ item.percent }}<span class="percent-sign">%</span></span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" :style="{ width: item.percent + '%' }">
            <span class="bar-arrow"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import icon1 from '@/assets/images/Group 1321316307.png'
import icon2 from '@/assets/images/Group 1321316307 (1).png'
import icon3 from '@/assets/images/Group 1321316307 (2).png'

const redeemList = [
  {
    label: '养老基金赎回',
    num: 28600,
    percent: 46,
    imgUrl: icon1
  },
  {
    label: '医疗基金赎回',
    num: 22400,
    percent: 36,
    imgUrl: icon2
  },
  {
    label: '失业基金赎回',
    num: 28600,
    percent: 18,
    imgUrl: icon3
  }
]
</script>

<style scoped lang="scss">
.fund-redeem {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .redeem-row {
    display: flex;
    align-items: flex-start;

    .row-icon {
      width: 72px;
      height: 60px;
      flex-shrink: 0;
      margin-right: 10px;
    }

    .row-content {
      flex: 1;
      min-width: 0;
      padding-top: 6px;

      .row-info {
        display: flex;
        align-items: baseline;
        justify-content: space-between;

        .label {
          font-size: 16px;
          color: #d6ecff;
          font-weight: 400;
          letter-spacing: 1px;
          font-family: Alibaba-PuHuiTi-Regular;
        }

        .count {
          font-size: 20px;
          color: #E5E9FF;
          font-weight: 600;
          font-family: Alibaba-PuHuiTi-num;

          .unit {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.55);
            font-weight: normal;
            margin-left: 2px;
          }
        }

        .percent {
          font-size: 20px;
          color: #E5E9FF;
          font-weight: 400;
          font-family: Alibaba-PuHuiTi-Regular;

          .percent-sign {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.5);
            font-weight: normal;
            margin-left: 2px;
          }
        }
      }

      .bar-track {
        margin-top: 10px;
        height: 6px;
        background: rgba(58, 182, 255, 0.15);
        border-radius: 3px;
        position: relative;

        .bar-fill {
          height: 100%;
          border-radius: 3px;
          background: linear-gradient(90deg, #1e72e6 0%, #40c8ff 100%);
          position: relative;
          transition: width 0.6s ease;

          .bar-arrow {
            position: absolute;
            right: -2px;
            top: 6px;
            width: 0;
            height: 0;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            border-bottom: 6px solid #40c8ff;
          }
        }
      }
    }
  }
}
</style>