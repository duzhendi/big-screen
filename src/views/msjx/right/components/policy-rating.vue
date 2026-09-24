<template>
  <div class="policy-rating">
    <div class="rating-header">
      <div class="col-rank">排名</div>
      <div class="col-star">星级</div>
      <div class="col-bar"></div>
      <div class="col-num">数量</div>
    </div>
    <div v-for="(item, i) in ratingList" :key="i" class="rating-row">
      <div class="col-rank">
        <span class="rank-num" :class="`rank-${i + 1}`">{{ i + 1 }}</span>
      </div>
      <div class="col-star">{{ item.name }}</div>
      <div class="col-bar">
        <div class="bar-bg"></div>
        <div class="bar-fill" :style="{ width: item.percent + '%' }"></div>
        <div class="bar-thumb" :style="{ left: item.percent + '%' }"></div>
      </div>
      <div class="col-num">{{ item.value.toLocaleString() }}</div>
    </div>
  </div>
</template>

<script setup>
const ratingList = [
  { name: '五星', value: 18200 },
  { name: '四星', value: 8420 },
  { name: '三星', value: 3260 },
  { name: '两星', value: 1260 },
  { name: '一星', value: 780 }
]

const maxVal = Math.max(...ratingList.map(r => r.value))
ratingList.forEach(r => {
  r.percent = Math.round((r.value / maxVal) * 100)
})
</script>

<style scoped lang="scss">
.policy-rating {
  width: 100%;
  height: 100%;
  padding: 10px 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .rating-header {
    display: flex;
    align-items: center;
    padding: 0 4px 6px;
    gap: 8px;

    .col-rank {
      width: 36px;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.85);
      font-family: Alibaba-PuHuiTi-2;
    }
    .col-star {
      width: 64px;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.85);
      font-family: Alibaba-PuHuiTi-2;
    }
    .col-bar {
      flex: 1;
    }
    .col-num {
      width: 80px;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.85);
      font-family: Alibaba-PuHuiTi-2;
      text-align: right;
    }
  }

  .rating-row {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 38px;
    border-bottom: 1px solid rgba(0, 145, 255, 0.2);

    &:last-child {
      border-bottom: none;
    }

    .col-rank {
      width: 36px;
      display: flex;
      align-items: center;
      justify-content: center;

      .rank-num {
        width: 26px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        font-size: 16px;
        font-family: Alibaba-PuHuiTi-Medium;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 2px;
          z-index: -1;
        }

        &.rank-1 {
          background: linear-gradient(180deg, #fff 0%, #D5272A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          &::before {
            border: 1px solid rgba(220, 85, 32, 0.5);
            background: rgba(216, 89, 30, 0.1);
            box-shadow: 0 0 8px rgba(207, 80, 30, 0.3);
          }
        }
        &.rank-2 {
          background: linear-gradient(180deg, #fff 0%, #FFA407 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          &::before {
            border: 1px solid rgba(214, 156, 31, 0.4);
            background: rgba(206, 159, 31, 0.08);
            box-shadow: 0 0 8px rgba(235, 130, 11, 0.3);
          }
        }
        &.rank-3 {
          background: linear-gradient(180deg, #fff 0%, #076eff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          &::before {
            border: 1px solid rgba(31, 115, 234, 0.4);
            background: rgba(48, 100, 179, 0.08);
            box-shadow: 0 0 8px rgba(30, 110, 207, 0.3);
          }
        }
        &.rank-4, &.rank-5 {
          background: linear-gradient(180deg, #fff 0%, #00FFFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          &::before {
            border: 1px solid rgba(55, 184, 166, 0.3);
            background: rgba(60, 171, 138, 0.06);
            box-shadow: 0 0 8px rgba(36, 161, 90, 0.3);
          }
        }
      }
    }

    .col-star {
      width: 64px;
      font-size: 15px;
      color: #fff;
      font-family: Alibaba-PuHuiTi-2;
    }

    .col-bar {
      flex: 1;
      height: 8px;
      position: relative;
      display: flex;
      align-items: center;

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
        background: linear-gradient(90deg, #00d4ff 0%, #0091ff 100%);
      }
      .bar-thumb {
        position: absolute;
        top: 50%;
        width: 8px;
        height: 12px;
        transform: translate(-50%, -50%);
        background: #fff;
        border-radius: 1px;
        box-shadow: 0 0 6px rgba(0, 212, 255, 0.8);
      }
    }

    .col-num {
      width: 80px;
      font-size: 16px;
      font-family: Alibaba-PuHuiTi-Medium;
      color: #fff;
      text-align: right;
    }
  }
}
</style>