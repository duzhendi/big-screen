<template>
  <div class="zgsx-left-wrapper">
    <!-- 业务域筛选：下拉 + 搜索 -->
    <div class="left-filter">
      <commonSelect
        v-model="businessType"
        :options="businessOptions"
        placeholder="全部"
        width="150px"
        @change="handleBusinessChange"
      />
      <div class="filter-input">
        <commonInput v-model="keyword" placeholder="请输入关键字" @search="handleSearch" />
      </div>
    </div>

    <coverageCapability class="left-block block-coverage" />
    <operationCapability class="left-block block-operation" />
    <materialCapability class="left-block block-material" />
    <fillingCapability class="left-block block-filling" />
    <efficiencyCapability class="left-block block-efficiency" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import commonSelect from '@/components/common-select.vue'
import commonInput from '@/components/common-input.vue'
import coverageCapability from './components/coverage-capability.vue'
import operationCapability from './components/operation-capability.vue'
import materialCapability from './components/material-capability.vue'
import fillingCapability from './components/filling-capability.vue'
import efficiencyCapability from './components/efficiency-capability.vue'

// 业务域下拉
const businessType = ref('')
const businessOptions = [
  { label: '工伤保险', value: '工伤保险' },
  { label: '公共服务', value: '公共服务' },
  { label: '关系管理', value: '关系管理' },
  { label: '居民养老', value: '居民养老' },
  { label: '医疗生育', value: '医疗生育' },
  { label: '职工养老', value: '职工养老' }
]

// 搜索关键字
const keyword = ref('')

const handleBusinessChange = (value) => {
  console.log(value, '//////业务域')
}

const handleSearch = () => {
  console.log(keyword.value, '//////关键字搜索')
}
</script>

<style scoped lang="scss">
.zgsx-left-wrapper { 
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: url('@/assets/images/Rectangle 34624198111.png') no-repeat center center;
  background-size: 100% 100%;

  // 顶部筛选行（不参与高度分配）
  .left-filter {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px 0;
    box-sizing: border-box;

    .filter-input {
      flex: 1;
      min-width: 0;
    }
  }

  .left-block {
    min-height: 0;
  }

  // 各块高度按原 common-box 的内容高度等比分配
  .block-coverage { flex: 110; }
  .block-operation { flex: 78; }
  .block-material { flex: 140; }
  .block-filling { flex: 100; }
  .block-efficiency { flex: 150; }
}
</style>
