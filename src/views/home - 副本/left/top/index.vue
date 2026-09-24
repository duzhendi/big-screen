<template>
  <div class="top-content-container">
    <FirstTitle title="梯度选种" width="100%" height="40px" @click="goTdxz" />
    <div class="top-content-box">
      <SecondTitle title="数据归集" width="auto" height="24px" />
      <OneContent style="margin-top: 4px" />
      <TwoContent style="margin-top: 12px" />
      <ThreeContent style="margin-top: 12px" />
    </div>
  </div>
</template>

<script setup>
import FirstTitle from '@/components/titles/first-title.vue'
import SecondTitle from '@/components/titles/second-title.vue'
import OneContent from './components/one/index.vue'
import TwoContent from './components/two/index.vue'
import ThreeContent from './components/three/index.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
defineOptions({
  name: 'TopContent'
})
const goTdxz = () => {
  router.push('/tdxz')
}
</script>

<style lang="scss" scoped>
.top-content-container {
  width: 100%;
  height: 100%;
  .top-content-box {
    margin-top: 8px;
    margin-left: 12px;
    margin-right: 12px;
  }
  .third-title-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4px;
  }
}
</style>
