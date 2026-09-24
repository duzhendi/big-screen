<template>
  <CommonDialog v-model:visible="dialogVisible" v-if="dialogVisible" title="需求详情" width="1360px" height="620px">
    <div class="requirement-detail">
      <!-- 顶部基础信息摘要 -->
      <div class="header-info">
        <div class="title-row">
          <div class="status-tag">{{ detailData?.demandStatusName || '' }}</div>
          <h2 class="demand-title">{{ detailData?.demandName || data?.title || '' }}</h2>
          <span class="type-tag">{{ detailData?.demandType || '' }}</span>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <span class="label">企业名称：</span>
            <span class="value">{{ detailData?.enterpriseName || data?.company || '' }}</span>
          </div>
          <div class="info-item">
            <span class="label">统一社会信用代码：</span>
            <span class="value">{{ detailData?.enterpriseCode || '--' }}</span>
          </div>
          <div class="info-item">
            <span class="label">企业注册地：</span>
            <span class="value">{{ detailData?.registeredRegion || '' }}</span>
          </div>
          <div class="info-item">
            <span class="label">所属梯度：</span>
            <span class="value">{{
              gradientMap[detailData?.affiliatedGradient] || detailData?.affiliatedGradient || ''
            }}</span>
          </div>
          <div class="info-item">
            <span class="label">所属行业：</span>
            <span class="value">{{ detailData?.belongIndustry || '' }}</span>
          </div>
          <div class="info-item">
            <span class="label">具体细分领域：</span>
            <span class="value">{{ detailData?.belongIndustrySubdivision || '' }}</span>
          </div>
          <div class="info-item">
            <span class="label">提交时间：</span>
            <span class="value">{{ detailData?.createTime || data?.time || '' }}</span>
          </div>
          <div class="info-item">
            <span class="label">需求提出单位：</span>
            <span class="value">{{ detailData?.deptName || '' }}</span>
          </div>
        </div>
      </div>

      <!-- 需求处置进度 -->
      <div class="process-section">
        <div class="section-title">
          <span>需求处置进度</span>
          <div class="current-status">
            {{ currentStatusText }}
          </div>
        </div>

        <div class="timeline-container">
          <div class="timeline-line"></div>
          <div class="steps-wrapper">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="step-item"
              :class="{ active: index < currentStep, current: index === currentStep }"
            >
              <div class="step-date">{{ step.date }}</div>
              <div class="step-node">
                <div class="node-circle"></div>
              </div>
              <div class="step-card">
                <div class="step-num">{{ step.num }}</div>
                <div class="step-name">{{ step.name }}</div>
                <div class="step-dept">{{ step.dept }}</div>
                <div v-if="step.predict" class="step-predict">{{ step.predict }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CommonDialog>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import CommonDialog from '@/components/common-dialog.vue'
import { getEnterpriseDetail, getDisposeProcess } from '@/apis'

const props = defineProps({
  visible: Boolean,
  data: Object
})

const emit = defineEmits(['update:visible'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const steps = ref([])
const currentStep = ref(-1)

const currentStatusText = computed(() => {
  if (!steps.value.length || currentStep.value === -1) return ''
  const current = steps.value[currentStep.value]
  const predictText = current.predict ? `，${current.predict}` : ''
  const deptText = current.dept ? `，由${current.dept}负责具体执行` : ''
  return `该需求当前处于第${currentStep.value + 1}步：${current.name}${deptText}${predictText}。`
})

const detailData = ref(null)
const gradientMap = {
  cxxzxqy: '创新型中小企业',
  zjtxzxqy: '专精特新中小企业',
  xjrqy: '小巨人企业',
  sjdxgj: '市级单项冠军',
  gjjdxgj: '国家级单项冠军'
}

const getEnterDetail = async () => {
  const res = await getEnterpriseDetail({ enterpriseCode: props.data.enterpriseCode })
  if (res?.data?.data) {
    detailData.value = res.data.data
  }
}
const getDisposeProcessDetail = async () => {
  const res = await getDisposeProcess({ enterpriseDemandId: props.data?.enterpriseDemandId })
  if (res?.data?.data) {
    const data = res.data.data
    steps.value = data.map((item, index) => ({
      date: item.finishTime || '',
      num: (index + 1).toString().padStart(2, '0'),
      name: item.nodeName,
      dept: item.deptName || '',
      predict: item.estimatedFinishTime ? `预计${item.estimatedFinishTime}完成` : ''
    }))

    // NodeStatus: 2: 已完成, 1: 进行中, 0: 未开始
    const idx = data.findIndex((item) => item.nodeStatus === 1)
    if (idx !== -1) {
      currentStep.value = idx
    } else {
      // 如果没有进行中的，寻找第一个未开始的
      const firstZero = data.findIndex((item) => item.nodeStatus === 0)
      if (firstZero !== -1) {
        currentStep.value = firstZero
      } else {
        // 全是已完成，则指向最后一个
        currentStep.value = data.length - 1
      }
    }
  }
}
watch(
  () => props.visible,
  (val) => {
    if (!val) {
      // 关闭时清空所有数据
      detailData.value = null
      steps.value = []
      currentStep.value = -1
    }
  }
)
watch(
  () => props.data,
  (val) => {
    console.log(props.data, '=============================')
    if (val) {
      getEnterDetail()
      getDisposeProcessDetail()
    } else {
      detailData.value = null
    }
  },
  {
    immediate: true
  }
)
onMounted(() => {
  if (props.data) {
    console.log(props.data, '=============================')
    getEnterDetail()
    getDisposeProcessDetail()
  }
})
</script>

<style lang="scss" scoped>
.requirement-detail {
  padding: 20px;
  color: #fff;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: Alibaba-PuHuiTi-2;

  .top-actions {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 100;

    .action-btn {
      width: 88px;
      height: 32px;
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;

      .btn-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url('@/assets/images/center/btn_返回按钮_默认态.png') no-repeat center center;
        background-size: 100% 100%;
        transition: all 0.3s;
      }

      span {
        position: relative;
        z-index: 1;
        font-family: Alibaba-PuHuiTi-2;
        font-size: 14px;
        color: #b9e8ff;
      }

      .icon-exit {
        position: relative;
        z-index: 1;
        width: 14px;
        height: 14px;
      }

      &:hover {
        .btn-bg {
          background-image: url('@/assets/images/center/btn_返回按钮_悬浮态.png');
          transform: scale(1.05);
        }
        span {
          color: #ffffff;
        }
      }
    }
  }

  .header-info {
    background: url('@/assets/images/center/img_企业详情bg.png') no-repeat center center;
    background-size: cover;
    padding: 20px;
    margin-bottom: 10px;
    position: relative;
    .title-row {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;

      .status-tag {
        background: #00a8fc;
        font-size: 10px;
        padding: 2px 8px;
        border-radius: 2px;
        font-family: Alibaba-PuHuiTi-2;
        position: absolute;
        top: 0;
        left: 0;
      }

      .demand-title {
        font-size: 20px;
        margin: 0;
        font-weight: bold;
      }

      .type-tag {
        color: #3ce3ff;
        border: 1px solid #3ce3ff;
        font-size: 12px;
        padding: 1px 4px;
      }
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;

      .info-item {
        font-size: 14px;
        .label {
          color: rgba(185, 232, 255, 0.7);
        }
        .value {
          color: #fff;
        }
      }
    }
  }

  .process-section {
    .section-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(185, 232, 255, 0.2);

      span {
        font-family: Alibaba-PuHuiTi-2;
        font-size: 18px;
        color: #b9e8ff;
      }

      .current-status {
        font-size: 14px;
        color: #b9e8ff;
      }
    }

    .timeline-container {
      position: relative;
      padding: 0 20px;
      margin-top: 20px;
      height: 320px;

      .timeline-line {
        position: absolute;
        top: 85px;
        left: 80px;
        right: 80px;
        height: 2px;
        background: rgba(255, 255, 255, 0.1);
        z-index: 0;
      }

      .steps-wrapper {
        display: flex;
        justify-content: space-between;
        position: relative;
        z-index: 1;

        .step-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: 180px;

          .step-date {
            height: 24px;
            font-size: 16px;
            color: rgba(60, 227, 255, 0.6);
            margin-bottom: 25px;
            font-weight: bold;
            transition: all 0.3s;
          }

          .step-node {
            width: 30px;
            height: 30px;
            margin-bottom: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            .node-circle {
              width: 10px;
              height: 10px;
              background: #4a6a8a;
              border-radius: 50%;
              transition: all 0.3s;
              z-index: 2;
            }

            // 新增外层装饰环
            &::after {
              content: '';
              position: absolute;
              width: 20px;
              height: 20px;
              border: 1px solid rgba(255, 255, 255, 0.1);
              border-radius: 50%;
              transition: all 0.3s;
              z-index: 1;
            }
          }

          .step-card {
            width: 168px;
            height: 136px;
            background: linear-gradient(180deg, rgba(29, 75, 122, 0.4) 0%, rgba(9, 54, 100, 0.2) 100%);
            border: none;
            border-top: 1px solid rgba(74, 122, 156, 0.4);
            position: relative;
            display: flex;
            flex-direction: column;
            gap: 4px;
            transition: all 0.3s;

            // 左右两侧向下渐变线
            &::before,
            &::after {
              content: '';
              position: absolute;
              top: 0;
              width: 1px;
              height: 100%;
              background: linear-gradient(180deg, rgba(74, 122, 156, 0.4) 0%, transparent 100%);
              transition: all 0.3s;
            }
            &::before {
              left: 0;
            }
            &::after {
              right: 0;
            }

            .step-num {
              font-size: 22px;
              font-family: Alibaba-PuHuiTi-2;
              font-weight: bold;
              background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0.3) 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 5px;
            }
            .step-name {
              font-size: 16px;
              font-weight: bold;
              background: linear-gradient(180deg, #ffffff 0%, #b9e8ff 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            .step-dept {
              font-size: 13px;
              color: rgba(185, 232, 255, 0.6);
            }
            .step-predict {
              font-size: 12px;
              color: #fede73;
              margin-top: auto;
              padding: 2px 0;
            }
          }

          // 已完成状态
          &.active {
            .step-date {
              color: #3ce3ff;
            }
            .step-node {
              .node-circle {
                background: #3ce3ff;
                box-shadow: 0 0 12px #3ce3ff;
              }
              &::after {
                border-color: rgba(60, 227, 255, 0.3);
                transform: scale(1.2);
              }
            }
            .step-card {
              border-top-color: #3ce3ff;
              background: linear-gradient(180deg, rgba(0, 168, 252, 0.2) 0%, rgba(9, 54, 100, 0.4) 100%);
              &::before,
              &::after {
                background: linear-gradient(180deg, #3ce3ff 0%, transparent 100%);
              }
              .step-num {
                background: linear-gradient(180deg, #3ce3ff 0%, rgba(60, 227, 255, 0.3) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              .step-name {
                background: linear-gradient(180deg, #ffffff 0%, #3ce3ff 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                text-shadow: 0 0 8px rgba(60, 227, 255, 0.5);
              }
            }
          }

          // 当前步骤状态
          &.current {
            .step-date {
              color: #3ce3ff;
            }
            .step-node {
              .node-circle {
                background: #fede73;
                width: 14px;
                height: 14px;
                box-shadow: 0 0 15px #fede73;
              }
              &::after {
                border-color: rgba(254, 222, 115, 0.4);
                width: 26px;
                height: 26px;
                animation: pulse 2s infinite;
              }
            }
            .step-card {
              border-top-color: #fede73;
              background: linear-gradient(180deg, rgba(254, 222, 115, 0.15) 0%, rgba(9, 54, 100, 0.5) 100%);
              box-shadow: 0 0 15px rgba(254, 222, 115, 0.1);
              &::before,
              &::after {
                background: linear-gradient(180deg, #fede73 0%, transparent 100%);
              }
              .step-num {
                background: linear-gradient(180deg, #fede73 0%, rgba(254, 222, 115, 0.3) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              .step-name {
                background: linear-gradient(180deg, #ffffff 0%, #fede73 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
            }
          }
        }
      }
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.4;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
}
</style>
