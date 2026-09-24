<template>
  <div class="group-type">
    <div v-for="(item, i) in groupList" :key="i" class="group-card" :class="`group-${i}`">
      <div class="group-title">{{ item.name }}</div>
      <div class="group-num">
        <span class="num">{{ item.value.toLocaleString() }}</span>
        <span class="unit">万元</span>
      </div>
      <div class="donut-box">
        <commonChart :option="GROUP_DONUT_OPTION(item.percent, item.color)" />
      </div>
      <div class="group-desc">{{ item.percent }}%</div>
    </div>
  </div>
</template>

<script setup>
import commonChart from '@/components/common-chart.vue'
import { GROUP_DONUT_OPTION } from '@/views/sb-fund/options.js'

const groupList = [
  { name: '单位缴费', value: 46800, percent: 36, color: '#009FF8' },
  { name: '个人缴费', value: 52600, percent: 45, color: '#009FF8' },
  { name: '财政补贴', value: 29060, percent: 23, color: '#009FF8' }
]
</script>

<style scoped lang="scss">
.group-type {
  width: 100%;
  height: 100%;
  padding: 4px 14px 10px;
  box-sizing: border-box;
  display: flex;
  gap: 10px;

  .group-card {
    flex: 1;
    width: 135px;
    height: 228px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 8px 8px;
    box-sizing: border-box;
    border: 1px solid rgba(27, 126, 242, 0.25);
    border-radius: 2px;
    position: relative;
    background: url('@/assets/images/图列11131642.png') no-repeat;
    background-size: 100% 100%; 
    margin-top: 8px;

    .group-title {
      font-size: 16px;
      color: #fff;
      font-family: Alibaba-PuHuiTi-Regular;
      letter-spacing: 2px;
      margin-top: 2px;
    }

    .group-num {
      margin-top: 10px;
      .num {
        font-size: 20px;
        font-family: Alibaba-PuHuiTi-2;
        color: #fff;
      }
      .unit {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
        margin-left: 2px;
        font-family: Alibaba-PuHuiTi-Regular;
      }
    }

    .donut-box {
      margin-top: 14px;
      width: 80px;
      height: 80px;
      position: absolute;
      top: 30%;
    }
    .group-desc {
      width: 83px;
      height: 202px;
      background: url('@/assets/images/Frame 13213161829.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: end;
      justify-content: center;
      font-size: 14px;
      font-family: Alibaba-PuHuiTi-RegularQuan;
      color: #fff;
      padding-bottom: 34px;
    }
  }
}
</style>