<template>
  <div class="zgsx-center-wrapper">
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
        <span class="legend-text">全省总办件数 <span class="num">{{ totalCount.toLocaleString() }}</span> 件</span>
        <span class="legend-diamond">◆</span>
      </div>
    </div>
    <div class="vit-logo"></div>
    <div class="zgsx-map-wrapper"><cityMap /></div>

    <!-- 地图左下角：总办件数分级图例 -->
    <div class="count-legend">
      <div class="count-legend-title">总办件数</div>
      <div v-for="item in countLevels" :key="item.label" class="count-legend-item">
        <span class="dot" :style="{ background: item.color }"></span>
        <span class="label">{{ item.label }}</span>
      </div>
    </div>

    <TrendAnalysis />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import cityMap from '@/components/esMap/city-map'
import TrendAnalysis from './components/trend-analysis.vue'
// 区县下拉选项
const areaOptions = ref([])
const formData = reactive({
  region: '',
  timeData: ''
})
// 全省总办件数
const totalCount = 9130

// 办事量分级图例
const countLevels = [
  { label: '15000以下', color: '#2f7fd6' },
  { label: '15000-29999', color: '#2fc8e8' },
  { label: '30000-49999', color: '#f5b942' },
  { label: '50000以上', color: '#e0483f' }
]
</script>

<style scoped lang="scss">
.zgsx-center-wrapper {
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
    margin-top: 6px;
    display: flex;
    justify-content: center;
    position: relative;
    left: 0;
    top: -6%;
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
      .num {
        color: #0ceee6;
        font-size: 20px;
        font-family: Alibaba-PuHuiTi-Bold;
      }
    }
  }

  .zgsx-map-wrapper {
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

  // 地图左下角分级图例
  .count-legend {
    position: absolute;
    left: 30px;
    top: 52%;
    z-index: 6;
    padding: 8px 12px;
    background: rgba(4, 24, 48, 0.6);
    border: 1px solid rgba(60, 227, 255, 0.2);
    border-radius: 2px;

    .count-legend-title {
      font-size: 13px;
      color: #cdeaff;
      font-family: Alibaba-PuHuiTi-Regular;
      margin-bottom: 6px;
    }

    .count-legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 4px;

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: inline-block;
      }

      .label {
        font-size: 12px;
        color: rgba(205, 234, 255, 0.85);
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
