<template>
  <div class="check-report-center-wrapper">
    <!-- 区域/时间筛选 -->
    <div class="filter-group">
      <span>区域：</span>
      <CommonSelect v-model="formData.region" :options="areaOptions" placeholder="全部" style="width: 120px" />
      <span>时间：</span>
      <CommonSelect v-model="formData.timeData" :options="timeOptions" placeholder="全部" style="width: 130px" />
    </div>

    <!-- 地图标题 -->
    <div class="map-legend">
      <div class="legend-inner">
        <span class="legend-diamond">◆</span>
        <span class="legend-text">全省缴费人数平均数分布情况</span>
        <span class="legend-diamond">◆</span>
      </div>
    </div>

    <!-- 地图 -->
    <div class="check-report-map-wrapper"><cityMap /></div>

    <!-- 地图下方的平台光效 -->
    <div class="vit-logo"></div>

    <!-- 地图色阶图例 -->
    <div class="map-scale-legend">
      <div class="scale-title">缴费人数平均数（万元）</div>
      <div v-for="item in scaleList" :key="item.label" class="scale-item">
        <span class="scale-dot" :style="{ background: item.color }"></span>
        <span class="scale-label">{{ item.label }}</span>
      </div>
    </div>

    <TrendAnalysis />
  </div>
</template>

<script setup>
import CommonSelect from '@/components/common-select.vue'
import cityMap from '@/components/esMap/city-map'
import TrendAnalysis from './components/trend-analysis.vue'

// 区域/时间下拉：先按设计图回显默认值，接口确定后替换
const areaOptions = ref([{ label: '海南省', value: '海南省' }])
const timeOptions = ref([{ label: '2026年5月', value: '2026年5月' }])
const formData = reactive({
  region: '海南省',
  timeData: '2026年5月'
})

// 地图色阶图例
const scaleList = [
  { label: '< 1000', color: '#2EB9E8' },
  { label: '1000-3000', color: '#E8D46A' },
  { label: '3000-5000', color: '#E8903C' },
  { label: '> 5000', color: '#E34D4D' }
]
</script>

<style scoped lang="scss">
.check-report-center-wrapper {
  height: 100%;
  padding: 0 22px;
  box-sizing: border-box;
  position: relative;

  .filter-group {
    height: 48px;
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    top:0;
    z-index: 10;
    > span {
      font-size: 16px;
      color: #ccebff;
    }
  }
  
  .map-legend {
    display: flex;
    justify-content: center;
    position: relative;
    top: -4%;
    left: 0%;
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

  .check-report-map-wrapper {
    width: 100%;
    height: 85%;
    position: absolute;
    left: 0;
    top: 0;
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

  // 地图左下角的色阶图例
  .map-scale-legend {
    position: absolute;
    left: 23%;
    bottom: 37%;
    width: 168px;
    box-sizing: border-box;
    padding: 8px 12px;
    z-index: 6;
    background: rgba(4, 30, 60, 0.55);
    border: 1px solid rgba(0, 145, 255, 0.35);

    .scale-title {
      margin-bottom: 4px;
      font-size: 12px;
      color: #cdeaff;
      font-family: Alibaba-PuHuiTi-Regular;
    }

    .scale-item {
      display: flex;
      align-items: center;
      gap: 6px;
      line-height: 21px;

      .scale-dot {
        width: 8px;
        height: 8px;
        flex-shrink: 0;
        border-radius: 50%;
      }

      .scale-label {
        font-size: 12px;
        color: #cdeaff;
        font-family: Alibaba-PuHuiTi-Regular;
      }
    }
  }
}

@keyframes diamondPulse {
  0%, 100% { opacity: 1; text-shadow: 0 0 6px rgba(60, 227, 255, 0.8); }
  50% { opacity: 0.5; text-shadow: 0 0 2px rgba(60, 227, 255, 0.3); }
}
</style>
