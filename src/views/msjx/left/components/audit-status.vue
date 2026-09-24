<template>
  <div class="audit-status">
    <div class="tag-row">
      <div v-for="(tag, i) in tagList" :key="i" class="tag-item" :class="`tag-${i}`">
        <span class="label">{{ tag.label }}</span>
        <span class="value">{{ tag.value.toLocaleString() }}<span class="unit">件</span></span>
      </div>
    </div>
    <div class="chart-box">
      <commonChart :option="SHDZT_OPTION()" />
    </div>
  </div>
</template>

<script setup>
import commonChart from '@/components/common-chart.vue'
import { SHDZT_OPTION } from '@/views/msjx/options.js'

const tagList = [
  { label: '待审核', value: 9280 },
  { label: '通过', value: 28170 },
  { label: '驳回', value: 5230 }
]
</script>

<style scoped lang="scss">
.audit-status {
  width: 100%;
  height: 100%;
  padding: 0 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .tag-row {
    display: flex;
    gap: 10px;

    .tag-item {
      flex: 1;
      height: 68px;
      padding: 6px 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border: 1px solid rgba(27, 126, 242, 0.3);
      border-radius: 2px;
      margin-top: 6px;

      .label {
        font-size: 16px;
        color: #fff;
        font-family: Alibaba-PuHuiTi-Regular;
      }
      .value {
        margin-top: 2px;
        font-size: 20px;
        font-family: Alibaba-PuHuiTi-Medium;
        font-weight: 400;
        color: #fff;
        .unit {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.55);
          font-weight: normal;
          margin-left: 2px;
        }
      }

      &.tag-0 {
        background: url('@/assets/images/Frame 427319069 (0).png') no-repeat;
        background-size: 100% 100%;
      }
      &.tag-1 {
        background: url('@/assets/images/Frame 427319069 (1).png') no-repeat;
        background-size: 100% 100%;
      }
      &.tag-2 {
        background: url('@/assets/images/Frame 427319069 (2).png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .chart-box {
    flex: 1;
    margin-top: 4px;
    min-height: 0;
  }
}
</style>