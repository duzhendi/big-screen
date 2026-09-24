<template>
  <div class="channel-dist">
    <div v-for="item in channelList" :key="item.label" class="channel-card">
      <div class="card-info">
        <div class="label">{{ item.label }}</div>
        <div class="value">{{ item.num.toLocaleString() }}<span class="unit">次</span></div>
        <div class="ratio">占比 </div>
        <div class="percent">{{ item.percent }}%</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 服务次数渠道分布：线上 68% / 线下 32%
const channelList = [
  { type: 'online', label: '线上服务次数', num: 158600, percent: 68 },
  { type: 'offline', label: '线下服务次数', num: 74600, percent: 32 }
]
</script>

<style scoped lang="scss">
.channel-dist {
  width: 439px;
  height: 228px;
  box-sizing: border-box;
  margin: 10px 14px;
  display: flex;
  justify-content: space-between;
  background: url('@/assets/images/Rectangle 34624612.png');
  background-size: 100% 100%;

  .channel-card {
    width: 210px;
    display: flex;
    flex-direction: column;
    margin: 10px 8px;
    background: url('@/assets/images/Group 1321315191.png');
    background-size: 100% 100%;

    .card-info {
      text-align: center;

      .label {
      margin-top: 44px;
        font-size: 16px;
        color: #fff;
        font-family: Alibaba-PuHuiTi-Regular;
      }

      .value {
        margin-top: 24px;
        font-family: Alibaba-PuHuiTi-Medium;
        font-size: 20px;
        font-weight: bold;
        background: linear-gradient(180deg, #ffffff 30%, #64dcff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        .unit {
          font-size: 16px;
          font-weight: normal;
          padding-left: 4px;
        }
      }

      .ratio {
        margin-top: 24px;
        font-size: 16px;
        color: #fff;
        font-family: Alibaba-PuHuiTi-Regular; 
      }
      .percent {
        margin-top: 4px;
        font-size: 16px;
        color: #0091FF; 
        font-family: Alibaba-PuHuiTi-Medium;
      }
    }
  }
  .channel-card:nth-child(2) {
    background: url('@/assets/images/Group 1321317076.png');
    background-size: 100% 100%;
    .percent {
      color: #28C9FF; 
    }
  }
}
</style>
