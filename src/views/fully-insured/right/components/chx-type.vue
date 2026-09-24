<template>
  <div class="chx-type">
    <div
      v-for="(item, idx) in chartData"
      :key="item.name"
      class="chart-row"
      :class="{ 'is-active': idx === 1 }"
    >
      <!-- 左侧图标 -->
      <div class="icon-box">
        <img :src="item.icon" class="icon-img" alt="">
      </div>
      <!-- 名称 -->
      <div class="name">{{ item.name }}</div>
      <!-- 人数 -->
      <div class="count">{{ item.value.toLocaleString() }}<span class="unit">人</span></div>
      <!-- 进度条 -->
      <div class="bar-track">
        <div class="bar-fill" :style="{ width: item.percent + '%' }" />
      </div>
      <!-- 百分比 -->
      <div class="percent">{{ item.percent }}%</div>
    </div>
  </div>
</template>

<script setup>
import icon1 from '@/assets/images/Frame.png'
import icon2 from '@/assets/images/Frame (1).png'
import icon3 from '@/assets/images/Frame (2).png'
import icon4 from '@/assets/images/Frame (3).png'
import icon5 from '@/assets/images/Frame (4).png'

// 长护险参保类型分布（本地占位数据，后续替换接口）
const chartData = [
  { name: '居家照护', value: 42300, percent: 38, icon: icon1 },
  { name: '机构照护', value: 31200, percent: 28, icon: icon2 },
  { name: '社区照护', value: 20100, percent: 18, icon: icon3 },
  { name: '住院照护', value: 11400, percent: 10, icon: icon4 },
  { name: '其他', value: 6700, percent: 6, icon: icon5 }
]
</script>

<style scoped lang="scss">
.chx-type {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 8px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .chart-row {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 12px;
    position: relative;
    background: linear-gradient(90deg, rgba(20, 70, 140, 0.35) 0%, rgba(15, 55, 115, 0.15) 100%);
    border: 1px solid transparent;

    // 行分隔线（底边线）
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: 0;
      height: 1px;
      background: linear-gradient(90deg, rgba(90, 216, 255, 0.25), rgba(90, 216, 255, 0.05));
    }

    // 高亮行（第二行）金色描边 + 内阴影
    &.is-active {
      background: linear-gradient(90deg, rgba(240, 199, 90, 0.18) 0%, rgba(240, 199, 90, 0.05) 100%);
      border: 1px solid rgba(240, 199, 90, 0.75);
      box-shadow:
        inset 0 0 18px rgba(240, 199, 90, 0.4),
        inset 0 0 6px rgba(240, 210, 120, 0.35);
    }

    // 图标
    .icon-box {
      width: 34px;
      height: 34px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-img {
        width: 20px;
        height: 20px;
        object-fit: contain;
        display: block;
      }
    }

    .name {
      width: 78px;
      flex-shrink: 0;
      font-size: 15px;
      color: #e8f3ff;
      white-space: nowrap;
      overflow: hidden;
    }

    .count {
      width: 92px;
      flex-shrink: 0;
      font-family: Alibaba-PuHuiTi-Medium, sans-serif;
      font-size: 16px;
      color: #eaf4ff;
      letter-spacing: 0.5px;
      .unit {
        font-size: 13px;
        margin-left: 2px;
        color: rgba(200, 220, 255, 0.7);
      }
    }

    // 进度条
    .bar-track {
      flex: 1;
      height: 12px;
      background: rgba(120, 160, 210, 0.22);
      border-radius: 1px;
      overflow: hidden;
      position: relative;

      .bar-fill {
        height: 100%;
        background: linear-gradient(90deg, #1d7fe8 0%, #2fb6f0 55%, #7ef0ff 100%);
        border-radius: 1px;
        box-shadow: 0 0 6px rgba(80, 200, 255, 0.5);
        transition: width 0.6s ease;
      }
    }

    .percent {
      width: 48px;
      flex-shrink: 0;
      text-align: right;
      font-family: Alibaba-PuHuiTi-Regular;
      font-size: 18px;
      font-weight: normal;
      color: #dff1ff;
      letter-spacing: 1px;
    }
  }
}
</style>
