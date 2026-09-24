<template>
  <div class="service-org">
    <FourthTitle title="服务机构" width="auto" height="24px" />
    <div class="metric-list">
      <div v-for="item in metricList" :key="item.key" class="metric-card">
        <div class="metric-card__header">
          <img :src="item.icon" :alt="item.label" class="metric-card__icon" />
          <span class="metric-card__label">{{ item.label }}</span>
        </div>
        <div class="metric-card__value">
          <span class="metric-card__number">{{ item.value }}</span>
          <span class="metric-card__unit">{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FourthTitle from '@/components/titles/four-title.vue'
import serviceOrgIcon from '@/views/pyfn/right/images/img_服务机构数图例@2x.png'
import serviceCompanyIcon from '@/views/pyfn/right/images/img_服务企业数图例@2x.png'
import serviceProductIcon from '@/views/pyfn/right/images/img_服务产品图例@2x.png'
import professionalServiceIcon from '@/views/pyfn/right/images/img_专业服务图例@2x.png'
import publicServiceIcon from '@/views/pyfn/right/images/img_公益服务图例@2x.png'
import activityServiceIcon from '@/views/pyfn/right/images/img_服务活动图例@2x.png'

const metricList = [
  { key: 'orgCount', label: '服务机构数', value: '3541', unit: '家', icon: serviceOrgIcon },
  { key: 'enterpriseCount', label: '服务企业数', value: '83114', unit: '家', icon: serviceCompanyIcon },
  { key: 'productCount', label: '服务产品', value: '9780', unit: '个', icon: serviceProductIcon },
  { key: 'professionalCount', label: '专业服务', value: '24.63', unit: '万次', icon: professionalServiceIcon },
  { key: 'publicCount', label: '公益服务', value: '134.65', unit: '万次', icon: publicServiceIcon },
  { key: 'activityCount', label: '服务活动', value: '9728', unit: '次', icon: activityServiceIcon }
]
</script>

<style scoped lang="scss">
.service-org {
  font-family: Alibaba-PuHuiTi-2;

  .metric-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    margin-top: 8px;

    .metric-card {
      height: 60px;
      padding: 5px 12px 0;
      box-sizing: border-box;
      background: url('@/views/pyfn/right/images/img_核心指标底座@2x.png') no-repeat center center;
      background-size: 100% 100%;

      &__header {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      &__icon {
        width: 16px;
        height: 16px;
        object-fit: contain;
        flex-shrink: 0;
      }

      &__label {
        overflow: hidden;
        color: #b9e8ff;
        font-family: Alibaba-PuHuiTi-2;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &__value {
        display: flex;
        align-items: baseline;
        justify-content: center;
        margin-top: 8px;
      }

      &__number {
        color: #3ce3ff;
        font-family: Alibaba-PuHuiTi-2;
        font-size: 20px;
        font-weight: 700;
        line-height: 1;
      }

      &__unit {
        margin-left: 2px;
        color: #3ce3ff;
        font-family: Alibaba-PuHuiTi-2;
        font-size: 16px;
        font-weight: 700;
        line-height: 1;
      }
    }
  }
}
</style>
