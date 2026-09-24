<script setup>
let scaleBoxRef = ref()
// 计算缩放比例
const getScale = (type, width = 1920, height = 1080) => {
  let ww = window.innerWidth / width
  let wh = window.innerHeight / height
  if (type == 'whole') {
    // 整体的缩放比
    // return ww < wh ? ww : wh
    return `${ww}, ${wh}`
  } else if (type == 'single') {
    //单个宽高的缩放比
    return { ww: ww, wh: wh }
  }
}
// 处理缩放
const resize = () => {
  if (scaleBoxRef.value) {
    scaleBoxRef.value.style.transform = `scale(${getScale('whole')})`
  }
}

onMounted(() => {
  if (scaleBoxRef.value) {
    scaleBoxRef.value.style.transform = `scale(${getScale('whole')})`
    scaleBoxRef.value.style.width = `1920px`
    scaleBoxRef.value.style.height = `1080px`
  }
  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <div class="scale-box-container" ref="scaleBoxRef" id="app-scale-box">
    <slot></slot>
  </div>
</template>

<style scoped>
.scale-box-container {
  /* position: fixed;
  top: 50%;
  left: 50%; */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform 0.3s;
  transform-origin: left top;
  z-index: 2;
}
</style>
