<template>
  <div class="msjx-center-wrapper">
    <div class="data-box">
      <div v-for="cel in moduleData" :key="cel.label" class="box-item">
        <div class="icon">
          <span class="icon-emoji"><img :src="cel.emoji" alt=""></span>
        </div>
        <div class="info">
          <div class="label">{{ cel.label }}</div>
          <span class="value">{{ cel.value.toLocaleString() }}<span class="unit">{{ cel.unit }}</span></span>
        </div>
      </div>
    </div>
    <div class="map-legend">
      <div class="legend-inner">
        <span class="legend-diamond">◆</span>
        <span class="legend-text">资质符合对象区域分布</span>
        <span class="legend-diamond">◆</span>
      </div>
    </div>
    <div class="vit-logo"></div>
    <div class="msjx-map-wrapper"><cityMap /></div>
  </div>
</template>

<script setup>
import cityMap from '@/components/esMap/city-map'
import icon1 from '@/assets/images/Frame 20360830091.png'
import icon2 from '@/assets/images/Frame 20360830091 (1).png'
import icon3 from '@/assets/images/Frame 20360830091 (2).png'

const moduleData = [
  {
    label: '政策信息数',
    value: 286,
    unit: '条',
    emoji: icon1
  },
  {
    label: '申请对象数量',
    value: 42680,
    unit: '件',
    emoji: icon2
  },
  {
    label: '政策服务评价总量',
    value: 31920,
    unit: '次',
    emoji: icon3
  }
]
</script>

<style scoped lang="scss">
.msjx-center-wrapper {
  width: 100%;
  height: 100%;
  padding: 0 22px;
  box-sizing: border-box;
  position: relative;

  .map-legend {
    margin-top: 6px;
    display: flex;
    justify-content: center;
    position: relative;
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

        &:first-child {
          transform: translateX(-30px);
        }
        &:last-child {
          transform: translateX(30px);
        }
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

  .msjx-map-wrapper {
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
    height: 76px;
    background: url('@/assets/images/Rectangle 346246124.png');
    background-size: 100% 100%;

    .box-item {
      flex: 1;
      max-width: 340px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      gap: 12px;

      .icon {
        width: 44px;
        height: 44px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;

        .icon-emoji {
          img {
            width: 44px;
            height: 44px;
          }
        }
      }

      .info {
        height: 52px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .label {
          font-size: 16px;
          color: #d6ecff;
          font-family: Alibaba-PuHuiTi-2;
        }

        .value {
          font-size: 22px;
          font-family: Alibaba-PuHuiTi-Medium;
          color: #fff;
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

@keyframes diamondPulse {
  0%, 100% { opacity: 1; text-shadow: 0 0 6px rgba(60, 227, 255, 0.8); }
  50% { opacity: 0.5; text-shadow: 0 0 2px rgba(60, 227, 255, 0.3); }
}
</style>