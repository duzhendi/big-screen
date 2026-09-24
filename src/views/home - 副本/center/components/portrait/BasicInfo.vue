<template>
  <div class="basic-info">
    <div class="enterprise-info-title">{{ titleName }}</div>
    <div class="info-grid">
      <div class="info-item" v-for="(item, index) in infoList" :key="index">
        <span class="label">{{ item.label }}：</span>
        <span class="value">{{ item.value }}</span>
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

const basicInfoVo = computed(() => props.portrait?.basicInfoVo || {})

const formatDate = (v) => {
  if (!v) return '-'
  const s = String(v)
  return s.includes('T') ? s.split('T')[0] : s
}

const fmt = (v) => (v === null || v === undefined || v === '' ? '-' : String(v))

const titleName = computed(() =>
  fmt(basicInfoVo.value?.enterpriseName) !== '-' ? basicInfoVo.value.enterpriseName : props.enterpriseName || ''
)

const infoList = computed(() => [
  { label: '统一社会信用代码', value: fmt(basicInfoVo.value?.enterpriseCode) },
  { label: '企业类型', value: fmt(basicInfoVo.value?.enterpriseType) },
  { label: '法定代表人', value: fmt(basicInfoVo.value?.legalRepresentativeName) },
  { label: '电话', value: fmt(basicInfoVo.value?.legalRepresentativePhone) },
  { label: '所属区县', value: fmt(basicInfoVo.value?.belongCountry) },
  { label: '所属行业', value: fmt(basicInfoVo.value?.belongIndustry) },
  { label: '注册时间', value: formatDate(basicInfoVo.value?.registeredDate) },
  {
    label: '注册资本',
    value:
      basicInfoVo.value?.registeredCapital !== undefined && basicInfoVo.value?.registeredCapital !== null
        ? `${basicInfoVo.value.registeredCapital}万`
        : '-'
  },
  { label: '注册地址', value: fmt(basicInfoVo.value?.registeredRegion) },
  { label: '联系地址', value: fmt(basicInfoVo.value?.contactAddress) },
  {
    label: '从事该产品领域时间',
    value: basicInfoVo.value?.productDomainTime ? `${basicInfoVo.value.productDomainTime}年` : '-'
  }
])
</script>

<style lang="scss" scoped>
.basic-info {
  flex: 1;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  position: relative;

  .enterprise-info-title {
    font-family: Alibaba-PuHuiTi-2;
    font-weight: bold;
    font-size: 20px;
    color: #ffffff;
    margin-bottom: 32px;
    letter-spacing: 1px;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 20px 40px;

    .info-item {
      display: flex;
      align-items: baseline;
      font-family: Alibaba-PuHuiTi-2;
      font-size: 14px;
      line-height: 1.6;

      .label {
        color: #b9e8ff;
        opacity: 0.8;
        white-space: nowrap;
      }

      .value {
        color: #ffffff;
        margin-left: 4px;
      }
    }
  }
}
</style>
