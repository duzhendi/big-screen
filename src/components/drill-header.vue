<template>
  <header class="drill-header">
    <div class="header-left">
      <div class="back-btn" @click="goBack"><img src="@/assets/images/tdxz/icon_返回.png" alt="" /></div>
    </div>
    <div class="header-title">{{ title }}</div>
    <div class="header-right">
      <img src="@/assets/images/tdxz/icon_定位.png" alt="" />
      <div class="city-tag">重庆市</div>
      <div class="time-text">{{ currentTime }}</div>
    </div>
  </header>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'TdxzDrillHeader'
})

const route = useRoute()
const router = useRouter()
const currentTime = ref('')
let timer = null

const title = computed(() => {
  if (route.path.includes('qxjsc')) {
    const areaName = route.query.areaName || ''
    return `经济·优质中小企业梯度培育-${areaName || ''}`
  } else {
    return route.meta.title || '数据大屏'
  }
})
const padZero = (num) => String(num).padStart(2, '0')

const updateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = padZero(now.getMonth() + 1)
  const day = padZero(now.getDate())
  const hour = padZero(now.getHours())
  const minute = padZero(now.getMinutes())
  const second = padZero(now.getSeconds())
  currentTime.value = `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

const goBack = () => {
  router.push('/home')
}

onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<style lang="scss" scoped>
.drill-header {
  width: 100%;
  height: 72px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: url('@/assets/images/tdxz/img_页头bg.png') no-repeat center center;
  background-size: 110%;
}

.header-left,
.header-right {
  width: 260px;
  display: flex;
  align-items: center;
}

.header-left {
  gap: 12px;
  margin-left: 24px;
}

.header-right {
  justify-content: flex-end;
  margin-right: 24px;
}

.city-tag {
  padding: 6px 10px;
  font-size: 14px;
  color: #c9e9f8;
}

.time-text {
  font-size: 14px;
  color: #b9e8ff;
}

.header-title {
  font-family: Alimama-ShuHeiTi;
  font-weight: bold;
  font-size: 36px;
  background: linear-gradient(180deg, #ffffff 0%, #92deff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.back-btn {
  width: 48px;
  height: 32px;
  background: url('@/assets/images/tdxz/btn_返回背景-默认.png') no-repeat center center;
  background-size: 100% 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #d8f5ff;
  font-family: Alibaba-PuHuiTi-2;
}
</style>
