<template>
  <div class="bottom-container">
    <FirstTitle title="育苗认定" width="auto" height="40px" class="clickable-title" @click="goToYmrd" />
    <div style="margin-left: 12px; margin-right: 12px">
      <SecondTitle title="认定环节" width="auto" height="24px" style="margin-top: 8px" />
      <div class="btn-box">
        <div v-for="(item, index) in btnList" :key="item.name" class="btn-item" @mouseenter="pauseAutoSwitch">
          <div @click="handleClick(index)" class="btn-text" :class="activeIndex === index ? 'active' : ''">
            {{ item.dictItemValue }}
          </div>
        </div>
      </div>
      <div class="legend-box">
        <div class="left-legend">
          <div class="legend-item">
            <div class="icon"></div>
            <div class="text">认定效率提升</div>
            <div class="num">{{ rateValue }}%</div>
            <div class="icon1"></div>
          </div>
          <div class="line"></div>
        </div>
        <div class="right-legend">
          <div v-for="item in legendItem" :key="item.name" class="legend-item">
            <div class="icon" :style="{ background: item.color }"></div>
            <div class="text">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <Process style="height: calc(100% - 140px); margin-top: 8px" :list="processList" />
  </div>
</template>

<script setup>
import FirstTitle from '@/components/titles/first-title.vue'
import SecondTitle from '@/components/titles/second-title.vue'
import Process from './components/process/index.vue'
import { getDict, getGraduateProcess } from '@/apis'
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAutoSwitchTabs } from '@/utils/useAutoSwitchTabs'
const autoSwitchMs = 5000

const router = useRouter()

const activeIndex = ref(null)
const rateValue = ref(0)
const processList = ref([])
const btnList = ref()
const legendItem = ref([
  {
    name: '当前环节',
    color: '#3CE3FF'
  },
  {
    name: '历史环节',
    color: '#309EFF'
  },
  {
    name: '未开展环节',
    color: '#A4C1D0'
  }
])
const getProcessData = async (params) => {
  try {
    const res = await getGraduateProcess(params)
    if (res && res.data && res.data.code === 100000 && res.data.data) {
      const data = res.data?.data || []
      rateValue.value = data.rateValue
      processList.value =
        data?.processNodeList?.map((item) => {
          return {
            title: item.nodeName,
            status: item.nodeStatus,
            date: item.finishTime || ''
          }
        }) || []
    }
  } catch (err) {
    console.error('获取流程图数据失败', err)
  }
}
const getBtn = async () => {
  const res = await getDict({
    dictCateCd: 'gradient_type'
  })
  if (res && res.data && res.data.code === 100000 && res.data.data) {
    btnList.value = res.data?.data || []
    nextTick(() => {
      activeIndex.value = 0
      const params = {
        affiliatedGradient: btnList.value[0]['dictItemCd'],
        belongReportBatch: '',
        belongYear: ''
      }
      getProcessData(params)
    })
  }
}
const { pause: pauseAutoSwitch } = useAutoSwitchTabs(activeIndex, btnList, {
  intervalMs: autoSwitchMs,
  autostart: true
})
const handleClick = (index) => {
  activeIndex.value = index
  pauseAutoSwitch()
}
const goToYmrd = () => {
  router.push('/ymrd')
}
watch(activeIndex, (newVal) => {
  const params = {
    affiliatedGradient: btnList.value[newVal]?.['dictItemCd'],
    belongReportBatch: '',
    belongYear: ''
  }
  getProcessData(params)
})
onMounted(() => {
  getBtn()
})
</script>

<style lang="scss" scoped>
.bottom-container {
  .clickable-title {
    cursor: pointer;

    // &:hover {
    //   opacity: 0.8;
    // }
  }

  .btn-box {
    display: flex;
    gap: 4px;
    margin-top: 4px;

    .btn-item {
      flex: 1;
      // width: 96px;
      height: 28px;
      background: url('@/assets/images/left-top/btn_经济发展-默认.png') no-repeat center;
      background-size: cover;
      text-align: center;

      .btn-text {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Alibaba-PuHuiTi-2;
        font-weight: normal;
        font-size: 12px;
        color: #b9e8ff;
        cursor: pointer;
      }

      & .active {
        background: url('@/assets/images/left-top/btn_经济发展-选中.png') no-repeat center;
        background-size: cover;
        color: #ffffff;
      }

      &:hover {
        background: url('@/assets/images/left-bottom/育苗认定_小巨人_黄色.png') no-repeat center;
        background-size: cover;
        color: #ffffff;
      }
    }
  }

  .legend-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left-legend {
      width: 216px;
      height: 32px;
      position: relative;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 4px;
        position: relative;

        .icon {
          background: url('@/assets/images/left-bottom/icon_认定效率图例.png') no-repeat center center;
          background-size: cover;
          width: 32px;
          height: 32px;
          margin-left: 12px;
        }

        .icon1 {
          background: url('@/assets/images/left-bottom/icon_认定效率提升图例.png') no-repeat center center;
          background-size: cover;
          width: 16px;
          height: 16px;
        }

        .text {
          font-family: Alibaba-PuHuiTi-2;
          font-weight: normal;
          font-size: 14px;
          color: #c9e9f8;
        }

        .num {
          margin-left: 4px;
          font-family: Alibaba-PuHuiTi-2;
          font-weight: normal;
          font-size: 16px;
          color: #3ce3ff;
        }
      }

      .line {
        background: url('@/assets/images/left-bottom/img_认定效率底座.png') no-repeat center center;
        background-size: cover;
        width: 100%;
        height: 14px;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }

    .right-legend {
      width: 226px;
      height: 32px;
      display: flex;
      margin-right: 14px;
      align-items: center;
      justify-content: space-between;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 4px;

        .icon {
          width: 6px;
          height: 6px;
        }
      }

      .text {
        font-family: Alibaba-PuHuiTi-2;
        font-weight: normal;
        font-size: 12px;
        line-height: 12px;
        color: #c9e9f8;
      }
    }
  }
}
</style>
