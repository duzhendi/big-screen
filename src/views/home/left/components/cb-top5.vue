<template>
  <div class="cb-top5">
    <div v-for="(cel, idx) in chartData" class="chart-cell">
      <div class="info-cull">
        <div class="sort">
          <div class="icon">{{ idx + 1 }}</div>
          <div class="label">{{ cel.name }}</div>
        </div>
        <span class="value">{{ cel.value }}%</span>
      </div>
      <div class="cert-full">
        <div v-if="cel.value > 0" class="cert" :style="[{ width: cel.value + '%' }, cbTop5Style[idx]]"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { cbTop5Style } from '@/mock'

// 城市数据
const chartData = [
  { name: '海口市', value: 96.8 },
  { name: '三亚市', value: 95.4 },
  { name: '儋州市', value: 93.2 },
  { name: '琼海市', value: 91.6 },
  { name: '文昌市', value: 89.5 }
]
</script>

<style scoped lang="scss">
.cb-top5 {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 12px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .chart-cell {
    .info-cull {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .sort {
        display: flex;
        align-items: center;
        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20px;
          font-family: OPPOSans-Heavy;
          height: 20px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 1px;
          background: rgba(0, 61, 141, 0.4);
          border-radius: 1px 1px 1px 1px;
          border: 1px solid;
          border-image: linear-gradient(
              90deg,
              rgba(56, 142, 255, 1),
              rgba(56, 142, 255, 0.4),
              rgba(56, 142, 255, 0.4),
              rgba(56, 142, 255, 1)
            )
            1 1;
        }
        .label {
          font-size: 16px;
          margin-left: 6px;
        }
      }
      .value {
        font-size: 16px;
        text-align: center;
        font-style: normal;
        text-transform: none;
        background: linear-gradient(180deg, #ffffff 36%, #adcdff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        font-family: OPPOSans-Heavy;
      }
    }
    .cert-full {
      height: 7px;
      margin-top: 4px;
      background: rgba(0, 79, 153, 0.3);
      border-radius: 2px 2px 2px 2px;
      .cert {
        box-sizing: border-box;
        border-radius: 2px 2px 2px 2px;
        border: 1px solid;
        height: 7px;
      }
    }
  }
  .chart-cell:nth-child(1) {
    margin: 0;
  }
}
</style>
