<template>
  <CommonDialog v-if="dialogVisible" v-model:visible="dialogVisible" :title="title" width="1000px" height="600px">
    <div class="portrait-content">
      <div class="tabs-box">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab-item"
          :class="{ active: activeTab === index }"
          @click="activeTab = index"
        >
          {{ tab }}
        </div>
      </div>
      <div class="portrait-body">
        <div class="portrait-body-left">
          <div class="left-bg" :style="{ backgroundImage: `url(${getImage(`center/img_${gradientType}.png`)})` }"></div>
        </div>
        <div class="portrait-body-right">
          <!-- 动态组件切换 -->
          <component
            :is="currentContentComponent"
            :enterpriseName="enterpriseName"
            :portrait="portraitData"
            :tdType="tdType"
          />
        </div>
      </div>
    </div>
  </CommonDialog>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import CommonDialog from '@/components/common-dialog.vue'
import ScoreResult from './ScoreResult.vue'
import BasicInfo from './BasicInfo.vue'
import CoreMetrics from './CoreMetrics.vue'
import DirectConditions from './DirectConditions.vue'
import { getEnterprisePortrait, getEnterprisePortraitCult } from '@/apis'
import { getImage } from '@/utils'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  enterpriseName: {
    type: String,
    default: ''
  },
  tdType: {
    type: String,
    default: ''
  },
  enterprisePortrayalId: {
    type: String,
    default: ''
  },
  isCult: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})
const gradientType = computed(() => {
  const name = props.tdType?.replace(/[“”"]/g, '') ?? ''
  const mapping = {
    创新型中小企业: '创新型中小企业',
    专精特新中小企业: '专精特新中小企业',
    专精特新小巨人企业: '专精特新小巨人',
    重庆市制造业单项冠军企业: '市级单项冠军',
    国家级制造业单项冠军企业: '国家级单项冠军'
  }
  return mapping[name] || '创新型中小企业'
})
const title = computed(() => {
  return props.enterpriseName ? `${props.enterpriseName}-企业画像` : '企业画像'
})

const normalizedTdType = computed(() => {
  const tdType = props.tdType?.replace(/[“"]/g, '') ?? ''
  return tdType === 'cxxzxqy' ? '创新型中小企业' : tdType
})
const isInnovativeEnterprise = computed(() => normalizedTdType.value.replace(/”/g, '') === '创新型中小企业')
const allTabs = [
  { label: '评分结果', component: ScoreResult, onlyInnovative: true },
  { label: '企业基本信息', component: BasicInfo },
  { label: '核心指标', component: CoreMetrics },
  { label: '直通条件', component: DirectConditions }
]
const visibleTabs = computed(() => allTabs.filter((tab) => !tab.onlyInnovative || isInnovativeEnterprise.value))
const tabs = computed(() => visibleTabs.value.map((tab) => tab.label))
const activeTab = ref(0) // 默认选中第一个可见页签

const currentContentComponent = computed(
  () => visibleTabs.value[activeTab.value]?.component || visibleTabs.value[0]?.component
)

const portraitData = ref(null)

// const list = ref({
//   cxxzxqy: '创新型中小企业',
//   zjtxzxqy: '专精特新中小企业',
//   xjrqy: '小巨人企业',
//   sjdxgj: '省级瞪羚企业',
//   gjjdxgj: '国家级瞪羚企业'
// })
const getDetailData = async () => {
  if (!props.enterprisePortrayalId) {
    portraitData.value = null
    return
  }
  console.log(props.isCult, 'props.isCult')
  const res = props.isCult
    ? await getEnterprisePortraitCult({ enterprisePortrayalId: props.enterprisePortrayalId })
    : await getEnterprisePortrait({ enterprisePortrayalId: props.enterprisePortrayalId })
  portraitData.value = res?.data?.data || null
}
watch(
  () => props.enterprisePortrayalId,
  () => {
    getDetailData()
  },
  {
    immediate: true
  }
)

// 弹窗每次打开都回到“评分结果”Tab
watch(
  () => props.visible,
  (val) => {
    if (val) {
      activeTab.value = 0
      getDetailData()
    } else {
      // 关闭时清空，避免下次打开闪旧数据
      portraitData.value = null
    }
  }
)
onMounted(
  () => {
    getDetailData()
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.portrait-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .tabs-box {
    display: flex;
    gap: 10px;
    padding: 0 10px;

    .tab-item {
      flex: 1;
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-family: Alibaba-PuHuiTi-2;
      font-weight: normal;
      font-size: 16px;
      color: #ffffff;
      background: url('@/assets/images/left-top/btn_经济发展-默认.png') no-repeat center;
      background-size: 100% 100%;
      cursor: pointer;
      transition: all 0.3s;

      &.active {
        background: url('@/assets/images/left-top/btn_经济发展-选中.png') no-repeat center;
        background-size: 100% 100%;
        color: #ffffff;
      }

      &:hover {
        background: url('@/assets/images/left-top/btn_经济发展-悬浮.png') no-repeat center;
        background-size: 100% 100%;
      }
    }
  }

  .portrait-body {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;

    .portrait-body-left {
      width: 238px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .left-bg {
        width: 100%;
        height: 335px;
        background: url('@/assets/images/center/企业画像.png') no-repeat center center;
        background-size: cover;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding-bottom: 24px;
        box-sizing: border-box;

        .type-name {
          font-family: Alimama ShuHeiTi;
          font-weight: bold;
          font-size: 20px;
          background:
            linear-gradient(270.00000019171165deg, #ebba5e 28%, #f5e3c0 100%),
            linear-gradient(112.32872177262895deg, rgba(255, 255, 255, 0) 0%, #ffffff 66%, rgba(255, 255, 255, 0) 66%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 10px rgba(254, 222, 115, 0.3);
          letter-spacing: 1px;
        }
      }
    }

    .portrait-body-right {
      flex: 1;
      height: 364px;
      background: url('@/assets/images/内容bg.png') no-repeat center center;
      background-size: cover;
      border: 1px solid rgba(60, 227, 255, 0.1);
      border-radius: 4px;
      margin-left: 20px;
      position: relative;
      overflow: hidden;
    }
  }
}
</style>
