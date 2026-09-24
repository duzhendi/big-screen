<template>
  <div class="org-rank-top10">
    <div class="trend-title">
      <div class="title-text">应用率排名TOP6社保经办机构</div> 
      <rankToggle v-model="orgRank" />
    </div>
    <div class="row-header">
      <div class="col-rank">排名</div>
      <div class="col-name">经办机构</div>
      <div class="col-value">应用率</div>
    </div>
    <div v-for="item in list" :key="item.name" class="chart-cell">
      <div class="info-cull">
        <div class="sort">
          <div class="icon" :style="rankStyle(item.rank)">{{ item.rank }}</div>
          <div class="label">{{ item.name }}</div>
        </div>
        <span class="value">{{ item.value }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import rankToggle from './rank-toggle.vue'

const props = defineProps({
  // 'top6' 前6 | 'last6' 后6
  range: {
    type: String,
    default: 'top6'
  }
})
// 前6 / 后6 切换，初值取 range（父组件未传时默认前6）
const orgRank = ref(props.range === 'last6' ? 'last6' : 'top6')

// 应用率排名（按应用率降序）
const allList = [
  { name: '海口市社保经办中心', value: 95 },
  { name: '三亚市社保经办中心', value: 93 },
  { name: '儋州市社保经办中心', value: 90 },
  { name: '文昌市社保经办中心', value: 88 },
  { name: '琼海市社保经办中心', value: 86 },
  { name: '万宁市社保经办中心', value: 84 },
  { name: '屯昌县社保经办中心', value: 82 },
  { name: '定安县社保经办中心', value: 80 },
  { name: '澄迈县社保经办中心', value: 78 },
  { name: '东方市社保经办中心', value: 76 },
  { name: '临高县社保经办中心', value: 62 },
  { name: '陵水县社保经办中心', value: 60 },
]

const rankedList = allList.map((item, i) => ({ ...item, rank: i + 1 }))

const list = computed(() => (orgRank.value === 'last6' ? rankedList.slice(-6) : rankedList.slice(0, 6)))

// 排名徽标配色：第 1 名红、第 2 名金、第 3 名蓝，其余按名次渐次转灰
const RANK_COLORS = [
  '213,39,42',
  '250,214,95',
  '0,145,255'
]

const rankStyle = (rank) => {
  const rgb = RANK_COLORS[rank - 1] || '140,173,201'
  const alpha = rank <= 5 ? 0.6 : 0.5
  return `background: rgba(${rgb},${alpha});border: 1px solid;border-image: linear-gradient(90deg, rgba(${rgb}, 1), rgba(${rgb}, 0.4), rgba(${rgb}, 0.4), rgba(${rgb}, 1)) 1 1;`
}
</script>

<style scoped lang="scss">
.org-rank-top10 {
  height: 202px;
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

  .row-header {
    height: 36px;
    line-height: 36px;
    display: flex;
    font-size: 14px;
    color: #e3f4ff;
    font-family: Alibaba-PuHuiTi-2;
    background: url('@/assets/images/group333233118114170.png') no-repeat center center;
    background-size: 100% 100%; 
    margin: 15px 15px 0 15px;


    .col-rank { 
      width: 44px; 
      padding-left: 14px; 
    }
    .col-name { 
      flex: 1; 
      padding-left: 14px; 
    }
    .col-value { 
      width: 120px; 
      text-align: center; 
    }
  }

  .chart-cell {
    height: 36px;
    line-height: 36px;
    display: flex;
    align-items: center; 
    margin: 0 15px;
    
    .info-cull {
      background: url('@/assets/images/group333233118114171.png') no-repeat center center;
      background-size: 100% 100%; 
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .sort {
        display: flex;
        align-items: center;
        flex: 1;
        min-width: 0;
        margin-left: 14px;

        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          font-size: 14px;
          color: #ffffff;
          letter-spacing: 1px;
          border-radius: 1px;
        }

        .label {
          margin-left: 20px;
          font-size: 14px;
          color: #ffffff;
          flex: 0.8;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding-left: 16px;
          font-family: Alibaba-PuHuiTi-Regular;
        }
      }

      .value {
        flex: 0.2;
        font-size: 14px;
        color: #00FF99;
        letter-spacing: 1px;
        font-family: Alibaba-PuHuiTi-2;  
      }
    }
  }

  // 隔行底纹
  .chart-cell:nth-child(odd) .info-cull {
    background: url('@/assets/images/group333233118114172.png');
    background-size: 100% 100%;
  }
}
</style>
