<template>
  <div class="core-metrics">
    <div class="metrics-grid">
      <div class="metric-card" v-for="(item, index) in metrics" :key="index">
        <div class="card-header">{{ item.label }}</div>
        <div class="card-main">
          <span :class="item.unit ? 'value' : 'value1'">{{ item.value }}</span>
          <span class="unit" v-if="item.unit">{{ item.unit }}</span>
        </div>
        <div class="card-footer" v-if="item.desc">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  enterpriseName: String,
  portrait: {
    type: Object,
    default: null
  }
})

const indicatorVo = computed(() => props.portrait?.indicatorVo || {})
const fmt = (v, suffix = '') => {
  if (v === null || v === undefined || v === '') return '-'
  const s = typeof v === 'number' ? String(v) : String(v)
  return suffix ? `${s}${suffix}` : s
}

const metrics = computed(() => [
  {
    label: '有效知识产权数',
    value: fmt(indicatorVo.value?.intellectualPropertyNum),
    unit: '个',
    desc: '与企业主导产品相关的'
  },
  { label: '占营业收入总额比重', value: fmt(indicatorVo.value?.researchRate), unit: '%', desc: '上年度研发费用总额' },
  { label: '主营业务收入增长率', value: fmt(indicatorVo.value?.mainBusinessIncomeRate), unit: '%', desc: '上年度' },
  { label: '资产负债率', value: fmt(indicatorVo.value?.assetLiabilityRatio), unit: '%', desc: '上年度' },
  { label: '主导产品所属领域', value: fmt(indicatorVo.value?.belongIndustrySubdivision), unit: '', desc: '' },
  {
    label: '占营业收入总额比重',
    value: fmt(indicatorVo.value?.mainBusinessOperationRate),
    unit: '%',
    desc: '上年度主营业务收入总额'
  }
])
</script>

<style lang="scss" scoped>
.core-metrics {
  flex: 1;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  position: relative;

  .enterprise-info-title {
    font-family: Alibaba-PuHuiTi-2;
    font-weight: bold;
    font-size: 24px;
    color: #ffffff;
    margin-bottom: 24px;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;

    .metric-card {
      background: url('@/assets/images/center/img_指标内容背景.png') no-repeat center center;
      background-size: cover;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      width: 196px;
      height: 140px;
      .card-header {
        font-size: 16px;
        color: #c9e9f8;
        opacity: 0.9;
        margin-bottom: 12px;
        text-align: center;
      }

      .card-main {
        text-align: center;
        margin-bottom: 8px;
        .value {
          font-family: Helvetica-Bold;
          font-size: 24px;
          background: linear-gradient(180deg, #ffffff 0%, #8fc8ef 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 10px rgba(60, 227, 255, 0.3);
        }
        .value1 {
          font-family: Alibaba-PuHuiTi-2;
          font-size: 14px;
          color: #c9e9f8;
          line-height: 1.4;
          padding: 0 12px;
          text-align: center;
          word-break: break-all;
        }
        .unit {
          font-size: 14px;
          color: #b9e8ff;
          margin-left: 4px;
        }
      }

      .card-footer {
        font-size: 14px;
        color: #c9e9f8;
        text-align: center;
      }
    }
  }
}
</style>
