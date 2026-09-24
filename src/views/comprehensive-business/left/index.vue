<template>
  <div class="comprehensive-business-left-wrapper">
    <common-box title="参保对象年龄分布" height="271px">
      <div class="content-screen">
        <ageDist />
      </div>
    </common-box>
    <common-box title="参保对象职业分类" height="294px" style="margin-top: 13px">
      <div class="content-screen">
        <jobType />
      </div>
    </common-box>
    <common-box title="参保异动类型人数分布" height="311px" style="margin-top: 14px">
      <div class="content-screen">
        <changeType />
      </div>
    </common-box>
  </div>
</template>

<script setup>
import commonBox from '@/components/common-box.vue'
import ageDist from './components/age-dist.vue'
import jobType from './components/job-type.vue'
import changeType from './components/change-type.vue'
</script>

<style scoped lang="scss">
.comprehensive-business-left-wrapper {
  width: 100%;
  height: 100%;
  .content-screen {
    width: 100%;
    height: 100%;
  }
}
</style>
