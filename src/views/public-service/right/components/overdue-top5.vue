<template>
  <div class="overdue-top5">
    <div v-for="(item, i) in rankList" :key="i" class="rank-row">
      <div class="rank-no">
        <span class="num" :class="`rank-${i + 1}`">{{ i + 1 }}</span>
      </div>
      <div class="rank-name">{{ item.name }}</div>
      <div class="rank-bar">
        <div class="bar-bg"></div>
        <div class="bar-fill" :style="{ width: item.percent + '%' }"></div>
      </div>
      <div class="rank-value">{{ item.value }}%</div>
    </div>
  </div>
</template>

<script setup>
const rankList = [
  { name: '工伤异地就医备案申请', value: 18.18 },
  { name: '灵活就业人员参保登记', value: 6.10 },
  { name: '城乡居民养老保险关系转移', value: 2.80 },
  { name: '城乡居民养老保险参保登记', value: 2.75 },
  { name: '城乡居民养老保险待遇申领', value: 2.22 }
]

const maxVal = Math.max(...rankList.map(r => r.value))
rankList.forEach(r => {
  r.percent = Math.round((r.value / maxVal) * 100)
})
</script>

<style scoped lang="scss">
.overdue-top5 {
  width: 100%;
  height: 100%;
  padding: 14px 14px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .rank-row {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 28px;

    .rank-no {
      width: 22px;
      display: flex;
      justify-content: center;
      .num {
        width: 22px;
        height: 22px;
        line-height: 22px;
        text-align: center;
        font-size: 13px;
        font-family: Alibaba-PuHuiTi-Medium;
        color: #fff;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 2px;

        &.rank-1 {
          background-image: url('@/assets/images/Group 2036086023.png');
        }
        &.rank-2 {
          background-image: url('@/assets/images/Group 2036086024.png');
        }
        &.rank-3 {
          background-image: url('@/assets/images/Group 2036086025.png');
        }
        &.rank-4, &.rank-5 {
          background-image: url('@/assets/images/Group 2036086026.png');
        }
      }
    }

    .rank-name {
      flex: 1;
      min-width: 130px;
      font-size: 14px;
      color: #fff;
      font-family: Alibaba-PuHuiTi-Regular;
      white-space: nowrap;
    }

    .rank-bar {
      width: 140px;
      flex-shrink: 0;
      height: 8px;
      position: relative;

      .bar-bg {
        position: absolute;
        inset: 0;
        background: rgba(0, 145, 255, 0.12);
        border-radius: 4px;
      }
      .bar-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-radius: 4px;
        background: linear-gradient(90deg, #00D4FF 0%, rgba(0,212,255,0.2) 100%);
      }
    }

    .rank-value {
      width: 55px;
      text-align: right;
      font-size: 14px;
      color: #fff;
      font-family: Alibaba-PuHuiTi-Regular;
    }
  }
}
</style>