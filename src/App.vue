<script setup>
import ScaleBox from '@/components/scale-box.vue'
import TopHeader from '@/components/top-header.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const roleVisiable = ref(false)
const route = useRoute()

const isPlainBg = computed(() => {
  return route.path === '/ymrd'
})
</script>

<template>
  <div class="app" :class="{ 'plain-bg': isPlainBg }">
    <ScaleBox>
      <div class="app-layout">
        <TopHeader />
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </ScaleBox>
  </div>
</template>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/bg.png') no-repeat 0 0;
  background-size: 100% 100%;
  background-position: center center;
  position: relative;
  margin: 0 !important;
  padding: 0 !important;
  user-select: none;

  &.plain-bg {
    background: #121921;
  }

  .app-layout {
    width: 100%;
    height: 100%;
    position: relative;
    .main-content {
      width: 100%;
      height: calc(100% - 82px);
      box-sizing: border-box;
      font-family: Alibaba-PuHuiTi-Regular;
      padding: 0 50px 0 44px;
      color: #fff;
    }
  }
}
</style>
