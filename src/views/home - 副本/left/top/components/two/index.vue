<template>
  <div class="two-container">
    <SecondTitle title="企业筛选" width="auto" height="24px" />
    <div class="btn-box" @mouseenter="pauseAutoSwitch" @mouseleave="resumeAutoSwitch">
      <div v-for="(item, index) in btnList" :key="item.name" class="btn-item">
        <div @click="handleClick(index)" class="btn-text" :class="activeIndex === index ? 'active' : ''">
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="content-box">
      <OneCom v-if="!activeIndex" />
      <TwoCom v-else />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import SecondTitle from '@/components/titles/second-title.vue'
import OneCom from './components/selected-one.vue'
import TwoCom from './components/selected-two.vue'
import { useAutoSwitchTabs } from '@/utils/useAutoSwitchTabs'
defineOptions({
  name: 'TwoComponent'
})
const activeIndex = ref(0)
const autoSwitchMs = 3000

const btnList = ref([
  {
    name: '智能分析'
  },
  {
    name: '精准筛选'
  }
])

// const { pause: pauseAutoSwitch, resume: resumeAutoSwitch } = useAutoSwitchTabs(activeIndex, btnList, {
//   intervalMs: autoSwitchMs,
//   autostart: true
// })

const handleClick = (index) => {
  activeIndex.value = index
  // 用户手动操作后暂停自动切换
  // pauseAutoSwitch()
}
</script>
<style lang="scss" scoped>
.two-container {
  .btn-box {
    display: flex;
    gap: 4px;
    margin-top: 8px;
    .btn-item {
      width: 96px;
      height: 28px;
      background: url('@/assets/images/left-top/btn_经济发展-默认.png') no-repeat center;
      background-size: cover;
      text-align: center;
      &:hover {
        background: url('@/assets/images/left-top/btn_经济发展-悬浮.png') no-repeat center;
        background-size: cover;
        color: #ffffff;
      }
      .btn-text {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Alibaba-PuHuiTi-2;
        font-weight: normal;
        font-size: 14px;
        color: #b9e8ff;
        cursor: pointer;
      }
      & .active {
        background: url('@/assets/images/left-top/btn_经济发展-选中.png') no-repeat center;
        color: #ffffff;
      }
    }
  }
  .content-box {
    margin-top: 8px;
  }
}
</style>
