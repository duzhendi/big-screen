<template>
  <div class="age-dist">
    <div
      v-for="item in ageList"
      :key="item.name"
      class="age-row"
    >
      <div class="icon-box">
        <img src="@/assets/images/Frame-091098.png" alt="" class="icon-emoji" />
      </div>
      <div class="name">{{ item.name }}</div>
      <div class="bar-track">
        <div class="bar-fill" :style="{ width: item.percent + '%', background: item.color }" />
      </div>
      <div class="count">{{ item.value.toLocaleString() }}<span class="unit">人</span></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 参保对象年龄分布
const rawList = [
  { name: '18-35岁', value: 2186000, color: 'linear-gradient(90deg, #d4a017 0%, #f5d24a 100%)' },
  { name: '36-45岁', value: 1764000 },
  { name: '46-60岁', value: 1568000 },
  { name: '60岁以上', value: 982000 },
  { name: '0-17岁', value: 786000 }
]

// 根据最大 value 自动算 percent
const maxVal = Math.max(...rawList.map(i => i.value))
const ageList = computed(() =>
  rawList.map(i => ({ ...i, percent: Math.round((i.value / maxVal) * 100) }))
)
</script>

<style scoped lang="scss">
.age-dist {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 6px 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .age-row {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 8px;
    position: relative;

    // 图标
    .icon-box {
      width: 22px;
      height: 22px;
      .icon-emoji {
        width: 100%;
        height: 100%;
      }
    }

    .name {
      width: 80px;
      flex-shrink: 0;
      font-size: 16px;
      color: #CCEBFF;
      white-space: nowrap;
      font-family: Alibaba-PuHuiTi-2;
    }

    // 进度条
    .bar-track {
      flex: 1;
      height: 6px;
      background: rgba(40, 100, 180, 0.35);
      border-radius: 2px;
      overflow: visible;

      .bar-fill {
        height: 100%;
        background: linear-gradient(90deg, #1d7fe8 0%, #2fb6f0 100%);
        border-radius: 2px;
        transition: width 0.6s ease;
        position: relative;

        // 末端白色高光三角
        &::after {
          content: '';
          position: absolute;
          right: -2px;
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          width: 6px;
          height: 6px;
          background: #ffffff;
          box-shadow: 0 0 4px rgba(126, 240, 255, 0.8);
        }
      }
    }

    .count {
      width: 110px;
      flex-shrink: 0;
      text-align: right;
      font-family: Alibaba-PuHuiTi-Medium;
      font-size: 16px;
      color: #fff;
      letter-spacing: 0.5px;
      .unit {
        font-size: 16px;
        margin-left: 2px;
        color: rgba(200, 220, 255, 0.7);
        font-family: Alibaba-PuHuiTi-Regular;
      }
    }
  }
}
</style>
