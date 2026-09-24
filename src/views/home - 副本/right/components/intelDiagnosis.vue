<!--
 * @Author: wangyu
 * @Date: 2025-12-05 09:31:42
 * @LastEditTime: 2025-12-07 10:00:25
 * @LastEditors: wangyu
 * @Description: 智能诊断
 * @FilePath: \tdpy-screen-dev\src\views\home\right\components\intelDiagnosis.vue
-->
<template>
  <div class="intelDiagnosis" @mouseenter="pauseAutoSwitch" @mouseleave="resumeAutoSwitch">
    <SecondTitle title="诊断赋能" width="auto" height="24px" />
    <div class="intelDiagnosis-tabs mt8px">
      <div
        v-for="item in tabs"
        :key="item.name"
        class="intelDiagnosis-tabItem"
        :class="{ active: item.active }"
        @click="toActive(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <div v-if="tab.value === '1'" class="intelDiagnosis-content1">
      <header>
        <img src="@/assets/images/right/icon_管理诊断改进意见图例.png" class="ml10px mr10px" />
        <div class="pt3px">
          培育诊断改进建议推送企业数<span class="fr font-size-16px color-#3CE3FF"
            >{{ tab.count }}
            <span class="font-size-14px">家</span>
          </span>
        </div>
      </header>
      <div class="intelDiagnosis-content1-list mt8px">
        <div
          v-for="(item, index) in tab.children"
          :key="item.name"
          class="intelDiagnosis-content1-item"
          :class="{ 'cursor-pointer': index === 2 }"
          @click="index === 2 && openReportList('1')"
        >
          <div v-if="item.key === 'mydpf'" class="pulse-container">
            <div class="pulse-bg"></div>
          </div>
          <img :src="item.icon" />
          <div class="ml8px">
            <div class="font-size-14px">{{ item.name }}</div>
            <div class="font-size-18px mt4px color-#3CE3FF">
              <CountUp :value="item.value" :duration="2000" />

              <span class="font-size-14px">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="tab.value === '2'" class="intelDiagnosis-content2">
      <header>
        <img src="@/assets/images/right/数据记录数.png" class="ml10px mr10px" />
        <div class="pt3px">
          质量诊断改进建议推送企业数<span class="fr font-size-16px color-#00A8FC"
            >{{ tab.count }}<span class="font-size-14px">家</span></span
          >
        </div>
      </header>
      <div class="intelDiagnosis-content2-list mt8px">
        <div
          v-for="(item, index) in tab.children"
          :key="item.name"
          class="intelDiagnosis-content2-item"
          :class="{ 'cursor-pointer': index === 2 }"
          @click="index === 2 && openReportList('2')"
        >
          <img :src="item.icon" />
          <div class="ml8px">
            <div class="font-size-14px">{{ item.name }}</div>
            <div class="font-size-18px mt4px color-#00A8FC">
              <!-- {{ item.value }} -->
              <CountUp :value="item.value" :duration="2000" />
              <span class="font-size-14px">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="tab.value === '3'" class="intelDiagnosis-content3">
      <header>
        <img src="@/assets/images/right/数据记录数.png" class="ml10px mr10px" />
        <div class="pt3px">
          管理诊断改进建议推送企业数<span class="fr font-size-16px color-#FEDE73"
            >{{ tab.count }}<span class="font-size-14px">家</span></span
          >
        </div>
      </header>
      <div class="intelDiagnosis-content3-list mt8px">
        <div
          v-for="(item, index) in tab.children"
          :key="item.name"
          class="intelDiagnosis-content3-item"
          :class="{ 'cursor-pointer': index === 2 }"
          @click="index === 2 && openReportList('3')"
        >
          <img :src="item.icon" />
          <div class="ml8px">
            <div class="font-size-14px">{{ item.name }}</div>
            <div class="font-size-18px mt4px color-#FEDE73">
              <!-- {{ item.value }} -->
              <CountUp :value="item.value" :duration="2000" />
              <span class="font-size-14px">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="tab.value === '4'" class="intelDiagnosis-content4">
      <div class="intelDiagnosis-content4-list mt8px pt8px">
        <div
          v-for="(item, index) in tab.children"
          :key="item.name"
          class="intelDiagnosis-content4-item"
          :class="{ 'cursor-pointer': index !== 0 }"
          @click=";(index === 1 || index === 2 || index === 3) && openReportList(`4${index + 1}`)"
        >
          <img :src="item.icon" />
          <div class="font-size-14px" style="height: 20px; line-height: 20px">{{ item.name }}</div>
          <div class="ml8px">
            <div class="font-size-12px mt4px color-#FEDE73">
              <span v-if="item.value.includes('区')">{{ item.value }}</span>
              <CountUp v-else :value="item.value" :duration="2000" :style="{ fontSize: '14px' }" />
              <span class="font-size-14px">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 报告列表弹窗 -->
    <ReportListDialog ref="ReportListDialogRef" v-model:visible="reportListVisible" :type="reportType" />
  </div>
</template>

<script setup>
import SecondTitle from '@/components/titles/second-title.vue'
import ReportListDialog from './diagnosis-dialogs/ReportListDialog.vue'
import { getGraduateProcess } from '@/apis/rightModel.js'
import { computed, ref, watch } from 'vue'
import { formatNumber } from '@/utils/index.js'
import { useAutoSwitchTabs } from '@/utils/useAutoSwitchTabs'
import znt1 from '@/assets/images/right/img_问卷记录数图例1.png'
import znt2 from '@/assets/images/right/img_问卷记录数图例2.png'
import znt3 from '@/assets/images/right/img_问卷记录数图例3.png'
import zlzd1 from '@/assets/images/right/img_问卷记录数图例.png'
import zlzd2 from '@/assets/images/right/img_企业参与数图例.png'
import zlzd3 from '@/assets/images/right/img_诊断报告数图例.png'
import zlzd4 from '@/assets/images/right/img_满意度评分图例.png'
import CountUp from '@/components/CountUp.vue'

defineEmits(['open-report'])

const reportListVisible = ref(false)
const ReportListDialogRef = ref()
const reportType = ref('1')

const openReportList = (type) => {
  reportType.value = type
  reportListVisible.value = true
  ReportListDialogRef.value.fetchData()
}

const tabs = ref([
  {
    name: '培育诊断',
    value: '1',
    active: true,
    count: '',
    children: [
      { name: '', value: '', unit: '', icon: znt1, key: 'zntjhcs' },
      { name: '', value: '', unit: '', icon: znt2, key: 'zntfnqys' },
      { name: '', value: '', unit: '', icon: znt3, key: 'zntmydpf' }
    ]
  },
  {
    name: '质量诊断',
    value: '2',
    active: false,
    count: '',
    key: 'zlzdgjjytsqys',
    children: [
      {
        name: '',
        value: '',
        unit: '',
        icon: zlzd1,
        key: 'wjjls'
      },
      { name: '', value: '', unit: '', icon: zlzd2, key: 'qycys' },
      { name: '', value: '', unit: '', icon: zlzd3, key: 'zdbgs' },
      { name: '', value: '', unit: '', icon: zlzd4, key: 'mydpf' }
    ]
  },
  {
    name: '管理诊断',
    value: '3',
    active: false,
    count: '4869',
    key: 'glzdgjjytsqys',
    children: [
      { name: '', value: '', unit: '', icon: zlzd1, key: 'wjjls' },
      { name: '', value: '', unit: '', icon: zlzd2, key: 'qycys' },
      { name: '', value: '', unit: '', icon: zlzd3, key: 'zdbgs' },
      { name: '', value: '', unit: '', icon: zlzd4, key: 'mydpf' }
    ]
  },
  {
    name: '数字化赋能',
    value: '4',
    active: false,
    count: '',
    children: [
      { name: '', value: '', unit: '', icon: zlzd3, key: 'sdcs' },
      { name: '', value: '', unit: '', icon: zlzd2, key: 'zcqy' },
      { name: '', value: '', unit: '', icon: zlzd1, key: 'xkqz' },
      { name: '', value: '', unit: '', icon: zlzd4, key: 'szhzd' }
    ]
  }
])

// 用 index 作为单一真相，统一驱动 tabs[i].active（方便自动轮播复用）
const activeIndex = ref(
  Math.max(
    tabs.value.findIndex((t) => t.active),
    0
  )
)
const syncActiveByIndex = (idx) => {
  tabs.value.forEach((t, i) => {
    t.active = i === idx
  })
}
syncActiveByIndex(activeIndex.value)
watch(activeIndex, (idx) => syncActiveByIndex(idx))

const { pause: pauseAutoSwitch, resume: resumeAutoSwitch } = useAutoSwitchTabs(activeIndex, tabs, {
  intervalMs: 3000,
  autostart: true
})

const tab = computed(() => {
  return tabs.value.find((item) => item.active)
})
const toActive = (item) => {
  const idx = tabs.value.findIndex((t) => t.value === item.value)
  activeIndex.value = idx >= 0 ? idx : 0
  // 用户手动点击后暂停自动切换
  pauseAutoSwitch()
}
// 诊断培育
getGraduateProcess({ belongModel: 'pyzd' }).then((res) => {
  res.data.data.forEach((item) => {
    if (item.indexCode === 'pyzdgjjytsqys') {
      tabs.value[0].count = formatNumber(item.indexValue)
    }
  })
  tabs.value[0].children.forEach((item) => {
    res.data.data.forEach((item2) => {
      if (item.key === item2.indexCode) {
        item.value = item2.indexValue
        item.unit = item2.indexUnit
        item.name = item2.indexChinese
      }
    })
  })
})
// 质量诊断
getGraduateProcess({ belongModel: 'zlzd' }).then((res) => {
  res.data.data.forEach((item) => {
    if (item.indexCode === 'zlzdgjjytsqys') {
      tabs.value[1].count = formatNumber(item.indexValue)
    }
  })
  tabs.value[1].children.forEach((item) => {
    res.data.data.forEach((item2) => {
      if (item.key === item2.indexCode) {
        item.value = item2.indexValue
        item.unit = item2.indexUnit
        item.name = item2.indexChinese
      }
    })
  })
})
// 管理诊断
getGraduateProcess({ belongModel: 'glzd' }).then((res) => {
  res.data.data.forEach((item) => {
    if (item.indexCode === 'glzdgjjytsqys') {
      tabs.value[2].count = formatNumber(item.indexValue)
    }
  })
  tabs.value[2].children.forEach((item) => {
    res.data.data.forEach((item2) => {
      if (item.key === item2.indexCode) {
        item.value = item2.indexValue
        item.unit = item2.indexUnit
        item.name = item2.indexChinese
      }
    })
  })
})
// 数字化赋能
getGraduateProcess({ belongModel: 'szhfn' }).then((res) => {
  tabs.value[3].children.forEach((item) => {
    res.data.data.forEach((item2) => {
      if (item.key === item2.indexCode) {
        item.value = item2.indexValue
        item.unit = item2.indexValue.includes('区') ? '' : item2.indexUnit
        item.name = item2.indexChinese
      }
    })
  })
})
</script>

<style scoped lang="scss">
.intelDiagnosis {
  &-tabs {
    display: flex;
  }

  &-tabItem {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    height: 28px;
    width: 161px;
    background-image: url(@/assets/images/right/培育诊断_默认色.png);
    background-size: 100% 100%;
    cursor: pointer;

    &:nth-child(n + 2) {
      margin-left: 4px;
    }

    &:hover {
      background-image: url(@/assets/images/right/智能诊断_黄色.png);
    }

    &.active {
      background-image: url(@/assets/images/right/培育诊断_选中色.png);
    }
  }
  &-content1 {
    height: 106px;
    header {
      display: flex;
      font-size: 14px;
      height: 34px;
      width: 100%;
      align-items: center;
      background-image: url(@/assets/images/right/img_质量诊断底座.png);
      background-repeat: no-repeat;
      background-size: auto;
      background-position: bottom;

      > div {
        flex: 1;
      }
    }

    &-list {
      display: flex;
    }

    &-item {
      width: 30%;
      height: 56px;
      display: flex;
      padding: 8px;
      background-image: url(@/assets/images/right/img_质量诊断内容bg.png);
      background-size: 100% 100%;

      img {
        width: 20px;
        height: 20px;
      }

      &:nth-child(n + 2) {
        margin-left: 8px;
      }

      &.cursor-pointer {
        cursor: pointer;
      }
    }
  }

  &-content2 {
    height: 106px;
    header {
      display: flex;
      font-size: 14px;
      height: 34px;
      width: 100%;
      align-items: center;
      background-image: url(@/assets/images/right/img_质量诊断底座.png);
      background-repeat: no-repeat;
      background-size: auto;
      background-position: bottom;

      > div {
        flex: 1;
      }
    }

    &-list {
      display: flex;
    }

    &-item {
      width: auto;
      height: 56px;
      display: flex;
      padding: 8px;
      background-image: url(@/assets/images/right/img_质量诊断内容bg.png);
      background-size: 100% 100%;

      img {
        width: 20px;
        height: 20px;
      }

      &:nth-child(n + 2) {
        margin-left: 8px;
      }

      &.cursor-pointer {
        cursor: pointer;
      }
    }
  }

  &-content3 {
    height: 106px;
    header {
      display: flex;
      font-size: 14px;
      height: 34px;
      width: 100%;
      align-items: center;
      background-image: url(@/assets/images/right/img_质量诊断底座.png);
      background-repeat: no-repeat;
      background-size: auto;
      background-position: bottom;

      > div {
        flex: 1;
      }
    }

    &-list {
      display: flex;
    }

    &-item {
      width: auto;
      height: 56px;
      display: flex;
      padding: 8px;
      background-image: url(@/assets/images/right/img_质量诊断内容bg.png);
      background-size: 100% 100%;

      img {
        width: 20px;
        height: 20px;
      }

      &:nth-child(n + 2) {
        margin-left: 8px;
      }

      &.cursor-pointer {
        cursor: pointer;
      }
    }
  }
  &-content4 {
    height: 106px;
    overflow: hidden;
    header {
      display: flex;
      font-size: 14px;
      height: 34px;
      width: 100%;
      align-items: center;
      background-image: url(@/assets/images/right/img_质量诊断底座.png);
      background-repeat: no-repeat;
      background-size: auto;
      background-position: bottom;

      > div {
        flex: 1;
      }
    }

    &-list {
      display: flex;
    }

    &-item {
      flex: 1;
      height: 70px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-image: url(@/assets/images/right/img_质量诊断内容bg.png);
      background-size: 100% 100%;
      padding: 4px;
      img {
        width: 20px;
        height: 20px;
      }

      &:nth-child(n + 2) {
        margin-left: 8px;
      }

      &.cursor-pointer {
        cursor: pointer;
      }
    }
  }
}
</style>
