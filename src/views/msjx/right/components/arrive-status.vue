<template>
  <div class="arrive-status">
    <div v-for="(item, i) in statusList" :key="i" class="status-card" :class="`status-${i}`">
      <div class="status-name">{{ item.name }}</div>
      <div class="status-num">
        <span class="num">{{ item.value.toLocaleString() }}</span>
        <span class="unit">笔</span>
      </div>
      <div class="status-icon">
        <img :src="item.icon" alt="">
      </div>
      <div class="status-tag">占比 {{ item.percent }}%</div>
    </div>
  </div>
</template>

<script setup>
import iconArrive from '@/assets/images/yidaozhang.png'
import iconPending from '@/assets/images/daozhangshibai.png'

const statusList = [
  { name: '已到账', value: 28600, percent: 83, color: '#00EEFF', icon: iconArrive },
  { name: '未到账', value: 4260, percent: 12, color: '#FFD500', icon: iconPending },
  { name: '到账失败', value: 1680, percent: 5, color: '#FF5C5C', icon: iconPending }
]
</script>

<style scoped lang="scss">
.arrive-status {
  width: 100%;
  height: 100%;
  padding: 10px 14px;
  box-sizing: border-box;
  display: flex;
  gap: 10px;

  .status-card {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 6px;
    box-sizing: border-box;
    border: 1px solid rgba(27, 126, 242, 0.25);
    border-radius: 2px;

    &.status-0 {
      background: linear-gradient(180deg, rgba(0,238,255,0.15) 0%, rgba(0,238,255,0.02) 100%);
      .status-tag { 
        background: rgba(0,238,255,0.25);
        border: 1px solid #00EEFF;
      }
    }
    &.status-1 {
      background: linear-gradient(180deg, rgba(255,213,0,0.15) 0%, rgba(255,213,0,0.02) 100%);
      .status-tag { 
        background: rgba(255,213,0,0.25);
        border: 1px solid #FFD500;
      }
    }
    &.status-2 {
      background: linear-gradient(180deg, rgba(255,92,92,0.15) 0%, rgba(255,92,92,0.02) 100%);
      .status-tag { 
        background: rgba(255,92,92,0.25);
        border: 1px solid #FF5C5C;
      }
    }

    .status-icon {
      width: 84px;
      height: 96px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .status-name {
      margin-top: 6px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.85);
      font-family: Alibaba-PuHuiTi-Regular;
    }

    .status-num {
      margin-top: 4px;
      .num {
        font-size: 20px;
        font-family: Alibaba-PuHuiTi-Medium;
        font-weight: bold;
        background: linear-gradient(180deg, #ffffff 30%, #64dcff 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .unit {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
        margin-left: 2px;
      }
    }

    .status-tag {
      margin-top: 8px;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 12px;
    }
  }
}
</style>