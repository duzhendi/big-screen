<!--
 * @Author: wangyu
 * @Date: 2025-12-04 22:40:57
 * @LastEditTime: 2025-12-05 09:40:17
 * @LastEditors: wangyu
 * @Description: 
 * @FilePath: \tdpy-screen-dev\src\views\home\right\index.vue
-->
<template>
  <div class="home-right-wrapper">
    <!-- 智能诊断 -->
    <FirstTitle title="培优赋能" width="100%" height="40px" @click="handleClick" />
    <!-- 智能诊断 -->
    <intelDiagnosis class="ml12px mr12px mt8px" />
    <policyPush class="ml12px mr12px mt8px" />
    <publicService />
    <!-- <coProcessing class="ml12px mr12px mt8px" /> -->
  </div>
</template>

<script setup>
import FirstTitle from '@/components/titles/first-title.vue'
import intelDiagnosis from './components/intelDiagnosis.vue'
import policyPush from './components/policyPush.vue'
import publicService from './components/publicService.vue'
// import coProcessing from './components/coProcessing.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClick = () => {
  router.push('/pyfn')
}
</script>

<style scoped lang="scss">
.home-right-wrapper {
  width: calc(100% - 16px);
  height: 100%;
  box-sizing: border-box;
  background: rgba(9, 54, 100, 0.26);
  font-family: Alibaba-PuHuiTi-2;
}
</style>
