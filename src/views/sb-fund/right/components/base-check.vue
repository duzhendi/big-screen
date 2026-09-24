<template>
  <div class="base-check">
    <div class="check-top">
      <div class="check-label">校验总人数</div>
      <div class="check-num">
        <span v-for="(d, i) in String(totalCheck).split('')" :key="i" class="num-digit">{{ d }}</span>
      </div>
    </div>
    <div class="check-bottom">
      <div class="check-card normal">
        <div class="card-label">正常人数</div>
        <div class="card-value">{{ normalNum.toLocaleString() }}<span class="unit">人</span></div>
      </div>
      <div class="check-card abnormal">
        <div class="card-label">异常人数</div>
        <div class="card-value">{{ abnormalNum.toLocaleString() }}<span class="unit">人</span></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import iconNormal from '@/assets/images/Frame 20360830091.png'
import iconAbnormal from '@/assets/images/Frame 20360830091 (1).png'

const totalCheck = 1246000
const normalNum = 1178400
const abnormalNum = 67600
</script>

<style scoped lang="scss">
.base-check {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  display: flex;
  flex-direction: column;

  .check-top {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 8px;

    .check-label {
      font-size: 14px;
      color: #fff;
      font-family: Alibaba-PuHuiTi-Regular;
    }

    .check-num {
      display: flex;
      gap: 2px;

      .num-digit {
        width: 24px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        font-size: 20px;
        font-family: Alibaba-PuHuiTi-Regular;
        color: #fff;
        background: url('@/assets/images/Group 1321316598.png') no-repeat center / 100% 100%;
      }
    }
  }

  .check-bottom {
    width: 439px;
    height: 286px;
    display: flex;
    gap: 10px;
    margin-top: 10px;
    background: url('@/assets/images/Group 203608311648.png') no-repeat;
    background-size: 100% 100%;

    .check-card {
      flex: 1;
      text-align: center;
      gap: 8px;

      .card-label {
        font-size: 14px;
        color: #d6ecff;
        font-family: Alibaba-PuHuiTi-2;
        margin-top: 55px;
      }

      .card-value {
        font-family: Alibaba-PuHuiTi-Medium;
        font-size: 20px;
        color: #fff;
        margin-top: 40px;
        .unit {
          font-size: 14px;
          color: rgba(232, 226, 226, 0.8);
          margin-left: 2px;
        }
      }
    }
  }
}
</style>