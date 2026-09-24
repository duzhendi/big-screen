<template>
  <div class="check-report-left-wrapper">
    <!-- 报表类型 -->
    <div class="left-filter">
      <commonSelect
        v-model="reportType"
        :options="reportOptions"
        width="100%"
        @change="handleReportChange"
      />
    </div>

    <div class="left-scroll">
      <!-- ===== 缴费指标 ===== -->
      <contributionMetric />

      <!-- ===== 养老待遇 ===== -->
      <pensionBenefit />

      <!-- ===== 工伤保险 ===== -->
      <injuryInsurance />
    </div>
  </div>
</template>

<script setup>
import commonSelect from '@/components/common-select.vue'
import contributionMetric from './components/contribution-metric.vue'
import pensionBenefit from './components/pension-benefit.vue'
import injuryInsurance from './components/injury-insurance.vue'

// 报表类型，默认选中设计稿上的这张表
const reportType = ref('employee-pension-injury')
const reportOptions = [
  { label: '城镇职工基本养老保险、工伤保险情况检验表', value: 'employee-pension-injury' },
  { label: '城乡居民基本养老保险情况检验表', value: 'resident-pension' },
  { label: '机关事业单位基本养老保险情况检验表', value: 'government-pension' }
]

const handleReportChange = (value) => {
  console.log(value, '//////报表类型')
}
</script>

<style scoped lang="scss">
.check-report-left-wrapper {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: url('@/assets/images/Rectangle 34624198111.png') no-repeat center center;
  background-size: 100% 100%;

  // 顶部报表下拉（不参与滚动）
  .left-filter {
    flex-shrink: 0;
    padding: 10px 14px 0;
    box-sizing: border-box;
  }

  .left-scroll {
    flex: 1;
    min-height: 0;
    padding: 10px 14px 12px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow-y: auto;
  }
}
</style>
