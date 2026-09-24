<template>
  <div class="mszc-top5">
    <div v-for="(cel, idx) in chartData" class="chart-cell">
      <div class="info-cull">
        <div class="sort">
          <div class="icon" :style="[mszcTop5Style[idx]]">{{ idx + 1 }}</div>
          <div class="label">{{ cel.name }}</div>
        </div>
        <span class="value">{{ cel.value }}<span class="unit">人</span></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { mszcTop5Style } from '@/mock'

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
.mszc-top5 {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 12px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .chart-cell {
    padding: 0 40px 0 14px;
    box-sizing: border-box;
    .info-cull {
      height: 36px;
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
          height: 20px;
          font-size: 16px;
          color: #ffffff;
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
          margin-left: 40px;
          font-size: 16px;
          color: #ffffff;
        }
      }
      .value {
        font-size: 16px;
        color: #00c4ff;
        letter-spacing: 1px;
        .unit {
          font-size: 14px;
        }
      }
    }
  }
  .chart-cell:nth-child(odd) {
    background: url('@/assets/images/home/data.png');
    background-size: 100% 100%;
  }
}
</style>
