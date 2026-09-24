<template>
  <div class="zgsx-right-wrapper"> 
    <riskRule />
    <riskEvaluate />
    <caseRankTop10 :range="caseRank" />
    <orgRankTop10 :range="orgRank" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import commonBox from '@/components/common-box.vue' 
import riskRule from './components/risk-rule.vue'
import riskEvaluate from './components/risk-evaluate.vue'
import caseRankTop10 from './components/case-rank-top10.vue'
import orgRankTop10 from './components/org-rank-top10.vue'


</script>

<style scoped lang="scss">
.zgsx-right-wrapper { 
  height: 100%; 
  background: url('@/assets/images/Rectangle 34624198111.png') no-repeat center center;
  background-size: 100% 100%;
}
</style>
