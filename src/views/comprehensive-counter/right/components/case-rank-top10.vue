<template>
  <div class="case-rank-top10">
    <div class="trend-title">
      <div class="title-text">总办件数排名TOP6市县</div> 
      <rankToggle v-model="caseRank" />
    </div>
    <div v-for="item in list" :key="item.name" class="chart-cell">
      <div class="info-cull">
        <div class="sort">
          <div class="icon">{{ item.rank }}</div>
          <div class="label">{{ item.name }}</div>
        </div>
        <span class="value">{{ item.value.toLocaleString() }}<span class="unit">件</span></span>
      </div>
      <div class="cert-full">
        <!-- 第 4 名及以后统一用第 4 档的蓝色，索引卡在 3 -->
        <div class="cert" :style="[{ width: (item.value / maxValue) * 100 + '%' }, cbTop5Style[Math.min(item.rank, 4) - 1]]"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { cbTop5Style } from '@/mock'
import rankToggle from './rank-toggle.vue'

const props = defineProps({
  // 'top6' 前6 | 'last6' 后6
  range: {
    type: String,
    default: 'top6'
  }
})
// 前6 / 后6 切换，初值取 range（父组件未传时默认前6）
const caseRank = ref(props.range === 'last6' ? 'last6' : 'top6')
// 总办件数排名（按办件量降序）
const allList = [
  { name: '海口市', value: 11223 },
  { name: '三亚市', value: 10223 },
  { name: '儋州市', value: 9320 },
  { name: '文昌市', value: 9160 },
  { name: '琼海市', value: 8950 },
  { name: '万宁市', value: 8950 },
  { name: '屯昌县', value: 8950 },
  { name: '定安县', value: 8950 },
  { name: '澄迈县', value: 8720 },
  { name: '东方市', value: 8460 },
  { name: '临高县', value: 3180 },
  { name: '陵水黎族自治县', value: 2960 },

]

// 带真实排名
const rankedList = allList.map((item, i) => ({ ...item, rank: i + 1 }))

const list = computed(() => (caseRank.value === 'last6' ? rankedList.slice(-6) : rankedList.slice(0, 6)))

// 进度条按当前视图内的最大值归一化，避免后6的柱子几乎不可见
const maxValue = computed(() => Math.max(...list.value.map((i) => i.value)))
</script>

<style scoped lang="scss">
.case-rank-top10 { 
  height: 302px;
  margin-top: 12px;
  .trend-title {
    height: 28px;
    line-height: 28px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    background: url('@/assets/images/标题背景12345.png') no-repeat center center;
    background-size: 100% 100%;
    padding-left: 24px;
    
    .title-text {
      font-size: 14px;
      color: #fff;
      font-family: Alibaba-PuHuiTi-Medium;
      letter-spacing: 1px;
    }

    .download-btn {
      width: 76px;
      height: 28px;
      font-size: 12px;
      color: rgba(255,255,255,0.9);
      background: rgba(0,145,255,0.2);
      border-radius: 3px 3px 3px 3px;
      border: 1px solid #0071BC;
      cursor: pointer;
      text-align: center;
      line-height: 28px;
    }
  }

  .chart-cell { 
    margin: 15px;
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
          width: 19px;
          height: 19px;
          font-family: OPPOSans-Heavy;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 1px;
          background: rgba(0, 61, 141, 0.4);
          border-radius: 1px;
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
          font-size: 14px;
          margin-left: 6px;
          color: #e8f3ff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-family: Alibaba-PuHuiTi-Regular;
        }
      }

      .value {
        flex-shrink: 0;
        margin-left: 8px;
        font-size: 14px;
        font-style: normal;
        background: linear-gradient(180deg, #ffffff 36%, #adcdff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-family: Alibaba-PuHuiTi-Regular;

        .unit {
          font-size: 12px;
          margin-left: 2px;
          -webkit-text-fill-color: rgba(200, 220, 255, 0.7);
        }
      }
    }

    .cert-full {
      height: 6px;
      margin-top: 3px;
      background: rgba(0, 79, 153, 0.3);
      border-radius: 2px;

      .cert {
        box-sizing: border-box;
        border-radius: 2px;
        border: 1px solid;
        height: 6px;
        transition: width 0.4s ease;
      }
    }
  }
}
</style>
