<template>
  <div class="zhineng-rate">
    <div v-for="item in rateList" :key="item.label" class="rate-row">
      <div class="row-head">
        <div class="head-left">
          <img :src="item.imgUrl" alt="" class="head-left-img">
          <span class="label">{{ item.label }}</span>
        </div>
        <span class="count" :style="{ color: item.color }">{{ item.num.toLocaleString() }}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" :style="{ width: item.percent + '%', background: item.gradient }">
          <span class="bar-percent" :style="{ color: item.textColor, background: item.percentBg, borderColor: item.percentBorder }">{{ item.percent }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import icon1 from '@/assets/images/Frame1v3.png'
import icon2 from '@/assets/images/Frame1v4.png'

// 智能办：达成率 87%（蓝）、转化率 80%（金）
const rateList = [
  {
    label: '智能办达成率',
    num: 36400,
    percent: 87,
    color: '#3ab6ff',
    textColor: '#ffffff',
    percentBg: 'rgba(58, 182, 255, 0.35)',
    percentBorder: '#3ab6ff',
    imgUrl: icon1,
    gradient: 'linear-gradient(90deg, rgba(30, 110, 230, 0.9) 0%, rgba(64, 200, 255, 1) 100%)'
  },
  {
    label: '智能办转化率',
    num: 36400,
    percent: 80,
    color: '#f0c75a',
    textColor: '#ffffff',
    percentBg: 'rgba(240, 199, 90, 0.3)',
    percentBorder: '#f0c75a',
    imgUrl: icon2,
    gradient: 'linear-gradient(90deg, rgba(190, 150, 40, 0.9) 0%, rgba(245, 215, 110, 1) 100%)'
  }
]
</script>

<style scoped lang="scss">
.zhineng-rate {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 14px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .rate-row {
    .row-head {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .head-left {
        display: flex;
        align-items: center;

        .head-left-img {
          width: 20px;
          height: 20px;
        }

        .label {
          margin-left: 10px;
          font-size: 16px;
          color: #d6ecff;
        }
      }

      .count {
        font-family: Alibaba-PuHuiTi-Medium;
        font-size: 18px;
      }
    }

    .bar-track {
      margin-top: 8px;
      margin-bottom: 18px;
      height: 12px;
      background: rgba(0, 79, 153, 0.3);
      border-radius: 2px;
      position: relative;

      .bar-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.6s ease;
        position: relative;

        .bar-percent {
          position: absolute;
          right: -2px;
          top: 14px;
          font-size: 13px;
          font-family: Alibaba-PuHuiTi-Medium;
          padding: 2px 6px;
          border-radius: 3px;
          border: 1px solid;
          line-height: 1;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
