<template>
  <div class="operation-capability">
    <div class="trend-title">业务运行能力</div>
    <div class="capability-content">
      <div v-for="(item, i) in cardList" :key="item.label" class="grid-item" :class="`item-${i}`">
        <div class="item-label">{{ item.label }}</div>
        <div class="item-value">
          {{ item.value.toLocaleString() }}
          <span class="unit">{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 复用「职业年金 - 年金征缴汇总情况」的卡片样式，只保留两个：
// 绿色在左、蓝色在右
const cardList = [
  { label: '线下综柜受理', value: 4183, unit: '件' },
  { label: '网办率', value: 0, unit: '%' }
]
</script>

<style scoped lang="scss">
.operation-capability {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .capability-content {
    flex: 1;
    padding: 0 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 10px;

    .grid-item {
      flex: 1;
      min-width: 0;
      height: 76px;
      background-size: 100% 100%;
      text-align: center;
      margin-top: 6px;

      .item-label {
        text-align: left;
        font-size: 16px;
        color: #fff;
        margin-top: 16px;
        padding-left: 70px;
        font-family: Alibaba-PuHuiTi-Regular;
      }

      .item-value {
        width: 110px;
        text-align: left;
        margin-top: 2px;
        margin-left: 74px;
        font-size: 20px;
        font-family: Alibaba-PuHuiTi-Regular;

        .unit {
          font-size: 14px;
          color: #ebe4e4;
        }
      }
    }

    // 绿色在左
    .item-0 {
      background: url('@/assets/images/Group 132131711811.png');
      background-size: 100% 100%;
    }

    // 蓝色在右
    .item-1 {
      background: url('@/assets/images/Group 203608401411.png');
      background-size: 100% 100%;
    }
  }

  // 标题栏，与右侧各面板保持一致
  .trend-title {
    flex-shrink: 0;
    height: 28px;
    line-height: 28px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    background: url('@/assets/images/标题背景12345.png') no-repeat center center;
    background-size: 100% 100%;
    padding-left: 24px;
    font-size: 14px;
    color: #fff;
    font-family: Alibaba-PuHuiTi-Medium;
    letter-spacing: 1px;
     
  }
}
</style>
