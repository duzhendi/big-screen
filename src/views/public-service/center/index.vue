<template>
  <div class="public-service-center-wrapper">
    <!-- 区域/时间筛选 -->
    <div class="filter-group">
      <span>区域：</span>
      <CommonSelect v-model="formData.region" :options="areaOptions" placeholder="全部" style="width: 120px" />
      <span>时间：</span>
      <CommonSelect v-model="formData.timeData" :options="areaOptions" placeholder="全部" style="width: 120px; margin-top: 12px" />
    </div>
    <div class="map-legend">
      <div class="legend-inner">
        <span class="legend-diamond">◆</span>
        <span class="legend-text">全省企业职工养老保险关系转移申请总量分布情况</span>
        <span class="legend-diamond">◆</span>
      </div>
    </div>
    <div class="vit-logo"></div>
    <div class="public-service-map-wrapper"><cityMap /></div>
    <TrendAnalysis />
  </div>
</template>

<script setup>
import cityMap from '@/components/esMap/city-map'
import TrendAnalysis from './components/trend-analysis.vue'

// 区县下拉选项
const areaOptions = ref([])
const formData = reactive({
  region: '',
  timeData: ''
})


</script>

<style scoped lang="scss">
.public-service-center-wrapper {
  height: 100%;
  padding: 0 22px;
  box-sizing: border-box;
  position: relative;

  .filter-group {
    width: 200px;
    height: 48px;
    position: relative;
    z-index: 10;
    > span {
      font-size: 16px;
      color: #ccebff;
      margin-left: 16px;
    }
  }
  .map-legend {
    display: flex;
    justify-content: center;
    position: relative;
    left: 4%;
    top: -5%;
    z-index: 5;

    .legend-inner {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 48px;
      position: relative;
      background: linear-gradient(90deg, rgba(0, 80, 160, 0) 0%, rgba(0, 140, 220, 0.25) 20%, rgba(0, 140, 220, 0.3) 50%, rgba(0, 140, 220, 0.25) 80%, rgba(0, 80, 160, 0) 100%);

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-top: 1px solid rgba(105, 201, 240, 0.5);
        border-bottom: 1px solid rgba(105, 201, 240, 0.5);
        pointer-events: none;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        transform: translateY(-50%);
        background: linear-gradient(90deg, transparent, rgba(60, 200, 255, 0.15) 20%, rgba(60, 200, 255, 0.15) 80%, transparent);
        pointer-events: none;
      }

      .legend-diamond {
        font-size: 12px;
        color: #3ce3ff;
        text-shadow: 0 0 6px rgba(60, 227, 255, 0.8);
        animation: diamondPulse 2s ease-in-out infinite;

        &:first-child { transform: translateX(-30px); }
        &:last-child { transform: translateX(30px); }
      }

      .legend-text {
        font-size: 16px;
        letter-spacing: 4px;
        color: #cdeaff;
        font-family: Alibaba-PuHuiTi-Medium;
        text-shadow: 0 0 10px rgba(60, 200, 255, 0.5);
      }
    }
  }

  .public-service-map-wrapper {
    width: 100%;
    height: 85%;
    position: absolute;
    left: 0;
    top: 0%;
  }

  .vit-logo {
    width: 549px;
    height: 171px;
    background: url('@/assets/images/home/image383.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 4;
    pointer-events: none;
  } 
}

@keyframes diamondPulse {
  0%, 100% { opacity: 1; text-shadow: 0 0 6px rgba(60, 227, 255, 0.8); }
  50% { opacity: 0.5; text-shadow: 0 0 2px rgba(60, 227, 255, 0.3); }
}
</style>