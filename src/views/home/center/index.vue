<template>
  <div class="home-center-wrapper">
    <div class="data-box">
      <div v-for="cel in moduleData" class="box-item">
        <img :src="cel.icon" class="icon" alt="" />
        <div class="info">
          <div class="label">{{ cel.label }}</div>
          <span class="value"
            >{{ cel.value }}<span class="unit">{{ cel.unit }}</span></span
          >
        </div>
      </div>
    </div>
    <div class="vit-logo"></div>
    <div class="home-map-wrapper"><cityMap /></div>
  </div>
</template>

<script setup>
import icon1 from '@/assets/images/home/Frame203608300921.png'
import icon2 from '@/assets/images/home/Frame2036083009.png'
import icon3 from '@/assets/images/home/Frame20360830092.png'
import icon4 from '@/assets/images/home/Frame20360830093.png'
import cityMap from '@/components/esMap/city-map'

const moduleData = ref([
  {
    label: '全险种总参保人数',
    value: 728.64,
    unit: '万人',
    icon: icon1
  },
  {
    label: '远程服务办件总量',
    value: 728.64,
    unit: '万件',
    icon: icon2
  },
  {
    label: '免申即享政策覆盖总人数',
    value: 728.64,
    unit: '万人',
    icon: icon3
  },
  {
    label: '综合业务办理总量',
    value: 728.64,
    unit: '万件',
    icon: icon4
  }
])
</script>

<style scoped lang="scss">
.home-center-wrapper {
  width: 100%;
  height: 100%;
  padding: 0 22px;
  box-sizing: border-box;
  position: relative;
  .home-map-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 5%;
  }
  .vit-logo {
    width: 549px;
    height: 171px;
    background: url('@/assets/images/home/image383.png');
    background-size: 100% 100%;
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
  }
  .data-box {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 5;
    .box-item {
      display: flex;
      .icon {
        width: 52px;
        height: 52px;
        margin-right: 10px;
      }
      .info {
        height: 52px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .label {
          font-size: 16px;
        }
        .value {
          font-size: 20px;
          font-family: Alibaba-PuHuiTi-Medium;
          .unit {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            letter-spacing: 1px;
            margin-left: 3px;
            font-family: Alibaba-PuHuiTi-Regular;
          }
        }
      }
    }
  }
}
</style>
