<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
const currentTime = ref('')

let timer = null

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
onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  if (timer !== null) {
    clearInterval(timer)
  }
})
</script>

<template>
  <div class="top-header-container">
    <div class="top-header-name">
      <span>社保全景图</span>
    </div>
    <div class="sub-text">
      <span>社保全景图</span>
    </div>

    <span class="top-header-time">{{ currentTime }}</span>
  </div>
</template>

<style lang="scss" scoped>
.top-header-container {
  height: 82px;
  width: 100%;
  position: relative;
}

.top-header-name {
  font-family: YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 48px;
  text-align: center;
  background: linear-gradient(180deg, #ffffff 37%, #b4cff2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  position: relative;
  z-index: 10;
}
.sub-text {
  width: 100%;
  font-family: YouSheBiaoTiHei;
  font-weight: 400;
  font-size: 48px;
  text-align: center;
  color: rgba(0, 0, 0, 0.25);
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 5;
  > span {
    display: inline-block;
    position: relative;
    top: 2px;
    left: 3px;
  }
}

.top-header-time {
  font-family: YouSheBiaoTiHei;
  position: absolute;
  right: 50px;
  letter-spacing: 1px;
  color: #fff;
  font-size: 22px;
  top: 24px;
}
</style>
