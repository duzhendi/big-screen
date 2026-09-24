<!--
 * @Author: wangyu
 * @Date: 2025-12-05 09:31:42
 * @LastEditTime: 2025-12-07 10:03:28
 * @LastEditors: wangyu
 * @Description: 政策推送
 * @FilePath: \tdpy-screen-dev\src\views\home\right\components\policyPush.vue
-->
<template>
  <div class="policyPush">
    <SecondTitle title="三新一强" width="auto" height="24px" @mouseenter="showTips" @mouseleave="hiddenTips" />
    <div v-html="tooltipText" class="intro-tooltip" ref="toolTipRef"></div>
    <div class="policyPush-list mt8px" @mouseenter="pauseAutoScroll" @mouseleave="resumeAutoScroll">
      <div class="policyPush-track" :style="trackStyle">
        <div
          v-for="(item, index) in data"
          :key="item.batch"
          class="policyPush-item"
          :class="['has-orbit', `orbit-${index}`]"
          :style="{ backgroundImage: `url(${item.icon})` }"
          @click="handleItemClick(item)"
        >
          <div class="orbit-container">
            <div class="orbit-dot"></div>
          </div>
          <template v-if="item.topInfo">
            <div class="mt7px font-size-18px line-height-20px" :style="{ color: item.color }">
              <span>{{ item.topInfo.indexChinese || '-' }}</span>
              <span class="ml-6px">{{ item.topInfo.indexValue || '-' }}</span>
              <span class="font-size-14px">{{ item.topInfo.indexUnit || '-' }}</span>
            </div>
          </template>
          <template v-if="item.bottomInfo">
            <div class="mt4px font-size-14px line-height-18px">
              <span>{{ item.bottomInfo.indexChinese || '-' }}</span>
              <span class="ml-4px">{{ item.bottomInfo.indexValue || '-' }}</span>
              <span>{{ item.bottomInfo.indexUnit || '-' }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- 三新一强列表弹窗 -->
    <ThreeNewDialog v-if="showThreeNewDialog" v-model:visible="showThreeNewDialog" :batch="currentBatch" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import SecondTitle from '@/components/titles/second-title.vue'
import ThreeNewDialog from './three-new/index.vue'
import { getGraduateProcess } from '@/apis/rightModel.js'
import { formatNumber } from '@/utils/index.js'
import bg1 from '@/assets/images/right/img_第一批.png'
import bg2 from '@/assets/images/right/img_第二批.png'

const showThreeNewDialog = ref(false)
const toolTipRef = ref(null)
const currentBatch = ref(1)
const currentSlide = ref(0)
let scrollTimer = null
const data = ref([
  { batch: 1, name: '', value: '', unit: '', icon: bg1, color: '#3CE3FF', key: ['dyp', 'zczj'], children: [] },
  { batch: 2, name: '', value: '', unit: '', icon: bg2, color: '#70FFC4', key: ['dep', 'depzczj'], children: [] },
  { batch: 3, name: '', value: '', unit: '', icon: bg1, color: '#3CE3FF', key: ['dsp', 'dspzczj'], children: [] }
])

const tooltipText = computed(() => '<span style="color: #B9E8FF;">依据<span style="color: #ffffff;">《关于进一步支持专精特新中小企业高质量发展的通知》</span>（财建〔2024〕148 号），”三新”是指打造<span style="color: #FEDE73;">新动能</span>、攻坚<span style="color: #FEDE73;">新技术</span>、开发<span style="color: #FEDE73;">新产品</span>，”一强”是指<span style="color: #FEDE73;">强化</span>产业链配套能力。</span>')

const trackStyle = computed(() => ({
  transform: `translateX(-${currentSlide.value * 250}px)`
}))

const handleItemClick = (item) => {
  currentBatch.value = item.batch
  showThreeNewDialog.value = true
}

const resumeAutoScroll = () => {
  if (scrollTimer || data.value.length <= 2) return

  scrollTimer = window.setInterval(() => {
    currentSlide.value = currentSlide.value === data.value.length - 2 ? 0 : currentSlide.value + 1
  }, 4000)
}

const pauseAutoScroll = () => {
  window.clearInterval(scrollTimer)
  scrollTimer = null
}

onMounted(() => {
  resumeAutoScroll()
})

onUnmounted(() => {
  pauseAutoScroll()
})
// 政策推送
// getGraduateProcess({ belongModel: 'zcts' }).then((res) => {
//   data.value.forEach((item) => {
//     res.data.data.forEach((item2) => {
//       if (item.key === item2.indexCode) {
//         item.value = formatNumber(item2.indexValue)
//         item.unit = item2.indexUnit
//         item.name = item2.indexChinese
//       }
//     })
//   })
// })
getGraduateProcess({ belongModel: 'sxyq' }).then((res) => {
  data.value.forEach((item) => {
    const {
      data: { data }
    } = res
    if (!data) return
    ;((item.children = data.filter((i) => item.key.includes(i.indexCode))),
      (item.topInfo = item.children.find((v) => v.indexCode === item.key[0])))
    item.bottomInfo = item.children.find((v) => v.indexCode === item.key[1])
  })
})

const handleData = () => {}

const showTips = () => {
  toolTipRef.value.style.opacity = 1
  toolTipRef.value.style.visibility = 'visible'
}

const hiddenTips = () => {
  toolTipRef.value.style.opacity = 0
  toolTipRef.value.style.visibility = 'hidden'
}
</script>

<style scoped lang="scss">
.policyPush {
  position: relative;
  &-list {
    width: 100%;
    overflow: hidden;
  }

  &-track {
    display: flex;
    transition: transform 0.8s ease;
  }

  &-item {
    width: 242px;
    height: 56px;
    box-sizing: border-box;
    flex: 0 0 242px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding-left: 72px;
    cursor: pointer;
    position: relative;

    &:nth-child(n + 2) {
      margin-left: 8px;
    }

    &.has-orbit {
      // 调整这两个变量控制轨道
      --orbit-radius: 40px; // 轨道直径（半径 = 直径/2）
      --arc-angle: 45deg; // 弧线角度（越小弧线越短）

      .orbit-container {
        position: absolute;
        left: 17px; // 圆心 X 偏移
        top: 50%;
        transform: translateY(-50%);
        width: var(--orbit-radius);
        height: var(--orbit-radius);
        pointer-events: none;
        animation: orbitRotate 3s linear infinite;
      }

      .orbit-dot {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-sizing: border-box;
        // 使用 conic-gradient 精确控制弧线长度
        background: conic-gradient(
          var(--orbit-color, #3ce3ff) 0deg,
          var(--orbit-color, #3ce3ff) var(--arc-angle),
          transparent var(--arc-angle)
        );
        // 用 mask 镂空中间，形成弧线
        -webkit-mask: radial-gradient(transparent 60%, #000 62%);
        mask: radial-gradient(transparent 60%, #000 62%);
        filter: drop-shadow(0 0 4px var(--orbit-color, #3ce3ff));
      }
    }

    // 第一个 item - 青色，顺时针
    &.orbit-0 {
      --orbit-color: #3ce3ff;
    }

    // 第二个 item - 绿色，逆时针
    &.orbit-1 {
      --orbit-color: #70ffc4;
      .orbit-container {
        animation-direction: reverse;
      }
    }
  }
}

@keyframes orbitRotate {
  from {
    transform: translateY(-50%) rotate(0deg);
  }
  to {
    transform: translateY(-50%) rotate(360deg);
  }
}
.intro-tooltip {
  position: absolute;
  left: 0px;
  // top: calc(100% - 10px);
  z-index: 9999;

  width: 440px;
  max-width: calc(100vw - 80px);
  min-height: 78px;
  box-sizing: border-box;
  color: #ffffff;

  padding: 26px 26px 30px 26px;
  // background: url('@/assets/images/img_引进词弹窗.png') no-repeat center center;
  background: url('@/assets/images/img_梯度选种引进词弹窗.png') no-repeat center center;

  background-size: 100% 100%;

  font-family: Alibaba-PuHuiTi-2;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 2px;
  // color: rgba(185, 232, 255, 0.95);

  opacity: 0;
  visibility: hidden;
  transform: translateY(4px);
  transition:
    opacity 0.15s ease,
    transform 0.15s ease,
    visibility 0.15s ease;
  pointer-events: none;
  white-space: normal;
  word-break: break-all;
}
</style>
