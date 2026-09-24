<template>
  <div class="benefit-change">
    <div
      v-for="(item, idx) in chartData"
      :key="item.name"
      class="chart-row"
    >
      <div class="icon-box">
        <img :src="item.icon" class="icon-img" alt="">
      </div>
      <div class="name">{{ item.name }}</div>
      <div class="count">{{ item.value.toLocaleString() }}<span class="unit">笔</span></div>
      <div class="bar-track">
        <div class="bar-fill" :style="{ width: item.percent + '%' }" />
      </div>
      <div class="percent">{{ item.percent }}%</div>
    </div>
  </div>
</template>

<script setup>
import icon1 from '@/assets/images/Frame.png'
import icon2 from '@/assets/images/Frame (1).png'
import icon3 from '@/assets/images/Frame (2).png'
import icon4 from '@/assets/images/Frame (3).png'
import icon5 from '@/assets/images/Frame (4).png'

const chartData = [
  { name: '养老金调整', value: 18600, percent: 30, icon: icon1 },
  { name: '医疗报销', value: 16200, percent: 25, icon: icon2 },
  { name: '失业金发放', value: 9200, percent: 23, icon: icon3 },
  { name: '工伤赔付', value: 6800, percent: 14, icon: icon4 },
  { name: '生育津贴', value: 3200, percent: 8, icon: icon5 }
]
</script>

<style scoped lang="scss">
.benefit-change {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 8px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .chart-row {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 8px;
    position: relative;

    &:not(:last-child)::after {
      content: '';
      position: absolute;
      left: 8px;
      right: 8px;
      bottom: 0;
      height: 1px;
      background: linear-gradient(90deg, rgba(90, 216, 255, 0.25), rgba(90, 216, 255, 0.05));
    }

    .icon-box {
      width: 32px;
      height: 32px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-img {
        width: 20px;
        height: 20px;
        object-fit: contain;
        display: block;
      }
    }

    .name {
      width: 80px;
      flex-shrink: 0;
      font-size: 14px;
      color: #e8f3ff;
    }

    .count {
      width: 86px;
      flex-shrink: 0;
      font-family: Alibaba-PuHuiTi-Medium;
      font-size: 15px;
      background: linear-gradient(180deg, #ffffff 30%, #64dcff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      .unit {
        font-size: 11px;
        color: rgba(200, 220, 255, 0.7);
        margin-left: 2px;
        -webkit-text-fill-color: rgba(200, 220, 255, 0.7);
      }
    }

    .bar-track {
      flex: 1;
      height: 8px;
      background: rgba(120, 160, 210, 0.22);
      border-radius: 1px;
      overflow: hidden;
      position: relative;

      .bar-fill {
        height: 100%;
        background: linear-gradient(90deg, #1d7fe8 0%, #2fb6f0 55%, #7ef0ff 100%);
        border-radius: 1px;
        box-shadow: 0 0 6px rgba(80, 200, 255, 0.5);
        transition: width 0.6s ease;
      }
    }

    .percent {
      width: 38px;
      flex-shrink: 0;
      text-align: right;
      font-family: Alibaba-PuHuiTi-Medium;
      font-size: 13px;
      color: #dff1ff;
    }
  }
}
</style>