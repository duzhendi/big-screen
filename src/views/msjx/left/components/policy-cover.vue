<template>
  <div class="policy-cover">
    <div class="left-area">
      <div class="policy-tag">政策覆盖类型</div>
      <div class="icon-base">
        <img src="@/assets/images/数据汇聚ss12.png" alt="">
      </div>
    </div>
    <div class="right-area">
      <div v-for="(group, gi) in policyData" :key="gi" class="policy-card">
        <div class="card-corner"></div>
        <div v-for="(item, ii) in group" :key="ii" class="policy-cell">
          <div class="cell-name">{{ item.name }}</div>
          <div class="cell-num">
            <span class="num">{{ item.count.toLocaleString() }}</span>
            <span class="unit">条</span>
          </div>
          <div class="cell-percent">占比 {{ item.percent }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const policyData = [
  [
    { name: '稳岗返还', count: 86, percent: 30 },
    { name: '社保补贴', count: 92, percent: 32 }
  ],
  [
    { name: '技能提升', count: 48, percent: 17 },
    { name: '就业补贴', count: 36, percent: 13 }
  ]
]
</script>

<style scoped lang="scss">
.policy-cover {
  width: 100%;
  height: 100%;
  padding: 12px 14px;
  box-sizing: border-box;
  display: flex;
  gap: 12px;

  .left-area {
    width: 170px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 16px;

    .policy-tag {
      width: 173px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      background: url('@/assets/images/Group 203608401311116.png') no-repeat center / 100% 100%;
      font-size: 16px;
      color: #fff;
      font-family: Alibaba-PuHuiTi-Medium;
      letter-spacing: 2px;
    }

    .icon-base {
      margin-top: 36px;
      width: 120px;
      height: 120px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .right-area {
    flex: 1;
    display: flex;
    gap: 10px;

    .policy-card {
      flex: 1;
      background: url('@/assets/images/Group 2036083631.png') no-repeat;
      background-size: 100% 100%;
      padding: 16px 18px;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 14px;

      .card-corner {
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border-top: 10px solid #ffcf3d;
        border-right: 10px solid transparent;
      }

      .policy-cell {
        .cell-name {
          font-size: 16px;
          color: #fff;
          font-family: Alibaba-PuHuiTi-2;
          letter-spacing: 1px;
        }

        .cell-num {
          margin-top: 4px;
          .num {
            font-size: 20px;
            font-family: Alibaba-PuHuiTi-Regular;
            background: linear-gradient(360deg, #ffffff 0%, #64dcff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .unit {
            font-size: 14px; 
            margin-left: 2px;
            font-family: Alibaba-PuHuiTi-Regular;
            background: linear-gradient(360deg, #ffffff 0%, #64dcff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        }

        .cell-percent {
          margin-top: 2px;
          font-size: 14px;
          color: #e0d8d8;
          font-family: Alibaba-PuHuiTi-2;
        }
      }
    }
  }
}
</style>