<template>
  <div class="msjx-left-wrapper">
    <common-box title="政策覆盖类型分布" height="294px">
      <div class="content-screen">
        <policyCover />
      </div>
    </common-box>
    <common-box title="申请对象审核状态分布" height="285px" style="margin-top: 13px">
      <div class="content-screen">
        <auditStatus />
      </div>
    </common-box>
    <common-box title="资质对象群体类型分布" height="285px" style="margin-top: 14px">
      <div class="content-screen">
        <groupType />
      </div>
    </common-box>
  </div>
</template>

<script setup>
import commonBox from '@/components/common-box.vue'
import policyCover from './components/policy-cover.vue'
import auditStatus from './components/audit-status.vue'
import groupType from './components/group-type.vue'
</script>

<style scoped lang="scss">
.msjx-left-wrapper {
  width: 100%;
  height: 100%;
  .content-screen {
    width: 100%;
    height: 100%;
  }
}
</style>