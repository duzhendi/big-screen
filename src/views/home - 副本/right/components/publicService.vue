<!--
 * @Author: wangyu
 * @Date: 2025-12-05 09:31:42
 * @LastEditTime: 2025-12-07 11:07:26
 * @LastEditors: wangyu
 * @Description: 四链融合
 * @FilePath: \tdpy-screen-dev\src\views\home\right\components\fourChain.vue
-->
<template>
  <div class="public-service">
    <SecondTitle title="公共服务" width="auto" height="24px" />
    <ServiceOrg />
    <ServiceProduct />
    <InterfacePlatform />
  </div>
</template>

<script setup>
import SecondTitle from '@/components/titles/second-title.vue'
import ServiceOrg from './public-service/service-org.vue'
import ServiceProduct from './public-service/service-product.vue'
import InterfacePlatform from './public-service/interface-platform.vue'
</script>

<style scoped lang="scss">
.public-service {
  width: calc(100% - 24px);
  margin-left: 12px;
  margin-right: 12px;
  height: auto;
  box-sizing: border-box;
}
</style>
