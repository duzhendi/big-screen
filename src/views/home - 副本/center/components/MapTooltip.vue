<template>
  <div class="map-tooltip" :style="{ width: items.length === 1 ? '280px' : '340px' }">
    <div class="tooltip-header">
      <div class="title">{{ title }}</div>
      <div class="detail-btn" @click="handleDetail">详情 <span class="arrow">>></span></div>
    </div>
    <!-- 
      items 支持 1 条或 2 条：
      - 1 条：label 和 value 同行，左右两端对齐
      - 2 条：保持原有左右两列布局，中间竖线分隔
    -->
    <div class="tooltip-content" :class="{ 'is-single': items.length === 1 }">
      <div class="items-row">
        <template v-for="(item, index) in items" :key="index">
          <div class="data-item">
            <div class="label">{{ item.label }}</div>
            <div class="value">{{ item.value }}<span class="unit"></span></div>
          </div>
          <!-- 只有两条数据时，在第一条和第二条中间加竖线 -->
          <div v-if="items.length === 2 && index === 0" class="divider"></div>
        </template>
      </div>

      <div v-if="hasGradient" class="gradient-toggle-wrap">
        <div class="gradient-toggle-btn" @click="toggleGradient">
          {{ showGradientDetail ? '收起梯度详情' : '查看梯度详情' }}
          <span class="toggle-arrow" :class="{ expanded: showGradientDetail }">▼</span>
        </div>
      </div>

      <div class="gradient-list" v-if="hasGradient && showGradientDetail">
        <div class="gradient-item">
          <span class="g-label">创新型中小企业</span>
          <span class="g-value">{{ gradient.cxxzxqy || 0 }}<span class="g-unit">家</span></span>
        </div>
        <div class="gradient-item">
          <span class="g-label">专精特新中小企业</span>
          <span class="g-value">{{ gradient.zjtxzxqy || 0 }}<span class="g-unit">家</span></span>
        </div>
        <div class="gradient-item">
          <span class="g-label">“小巨人”企业</span>
          <span class="g-value">{{ gradient.xjrqy || 0 }}<span class="g-unit">家</span></span>
        </div>
        <div class="gradient-item">
          <span class="g-label">市级单项冠军企业</span>
          <span class="g-value">{{ gradient.sjdxgj || 0 }}<span class="g-unit">家</span></span>
        </div>
        <div class="gradient-item">
          <span class="g-label">国家级单项冠军企业</span>
          <span class="g-value">{{ gradient.gjjdxgj || 0 }}<span class="g-unit">家</span></span>
        </div>
      </div>
    </div>
    <!-- 底部尖角 -->
    <div class="tooltip-arrow"></div>
    <enterpriseDetail
      v-model:visible="enterpriseDetailVisible"
      title="企业明细"
      :countryNm="detailCountryNm"
      :mapType="mapType"
      :affiliatedGradient="affiliatedGradient"
      @close="emits('start')"
    />
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, ref, watch, markRaw } from 'vue'
import enterpriseDetail from './enterpriseDetail.vue'
const enterpriseDetailVisible = ref(false)
const showGradientDetail = ref(false)

const emits = defineEmits(['stop', 'start'])

const props = defineProps({
  title: {
    type: String,
    default: '区域名称'
  },
  items: {
    type: Array,
    default: () => [
      { label: '国家级单项冠军企业累计数', value: '3913' },
      { label: '年度国家级单项冠军企业数', value: '911' }
    ]
  },
  countryNm: {
    type: String,
    default: ''
  },
  mapType: {
    type: String,
    default: '0'
  },
  affiliatedGradient: {
    type: String,
    default: ''
  },
  gradient: {
    type: Object,
    default: () => ({})
  }
})
// 由于地图有轮播，详情数据的城市名称传参会被自动覆盖，所以在打开详情时，要将当前的城市名称固定下来，避免被轮播时的城市名称覆盖掉
const detailCountryNm = ref('')
const hasGradient = computed(() => props.gradient && Object.keys(props.gradient).length > 0)

const toggleGradient = () => {
  showGradientDetail.value = !showGradientDetail.value
}

watch(
  () => [props.title, props.gradient],
  () => {
    // 切换到新的地区时默认收起梯度明细，避免再次遮挡地图
    showGradientDetail.value = false
  },
  { deep: true }
)

const handleDetail = () => {
  detailCountryNm.value = markRaw(props.countryNm)
  enterpriseDetailVisible.value = true
  emits('stop')
}
</script>

<style lang="scss" scoped>
.map-tooltip {
  position: relative;
  width: 340px;
  background: rgba(4, 28, 56, 0.95);
  border: 1px solid #00a8fc;
  border-radius: 4px;
  box-shadow: 0 0 15px rgba(0, 168, 252, 0.4);
  color: #fff;
  overflow: visible;
  pointer-events: auto; /* 确保按钮可点击 */

  .tooltip-header {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    position: relative;
    background:
      repeating-linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.05) 4px,
        transparent 4px,
        transparent 8px
      ),
      linear-gradient(90deg, rgba(0, 88, 125, 0.9) 0%, rgba(0, 140, 180, 0.9) 100%);
    border-bottom: 1px solid rgba(0, 168, 252, 0.5);
    border-radius: 4px 4px 0 0;

    .title {
      font-family: Alimama ShuHeiTi;
      font-size: 18px;
      font-weight: bold;
      color: #ffffff;
      text-shadow: 0 0 5px rgba(0, 168, 252, 0.8);
      letter-spacing: 1px;
    }

    .detail-btn {
      font-size: 12px;
      color: #00d2ff;
      cursor: pointer;
      display: flex;
      align-items: center;
      z-index: 1;

      &:hover {
        color: #ffffff;
        .arrow {
          transform: translateX(2px);
        }
      }

      .arrow {
        font-family: monospace;
        margin-left: 4px;
        transition: transform 0.3s;
      }
    }
  }

  .tooltip-content {
    display: flex;
    flex-direction: column;
    padding: 15px 0;
    background: linear-gradient(180deg, rgba(4, 28, 56, 0.8) 0%, rgba(0, 40, 80, 0.9) 100%);
    border-radius: 0 0 4px 4px;

    &.is-single {
      .items-row {
        padding: 0 15px;

        .data-item {
          padding: 0 20px 0 0;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          .label {
            margin-bottom: 0;
            margin-right: 10px;
          }

          .value {
            font-size: 20px;
          }
        }
      }
    }

    .items-row {
      display: flex;
      align-items: stretch;
      width: 100%;
    }

    .data-item {
      flex: 1;
      padding: 0 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .label {
        font-size: 14px;
        color: #b9e8ff;
        line-height: 1.4;
        margin-bottom: 8px;
      }

      .value {
        font-family: DIN-Bold, sans-serif;
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);

        .unit {
          font-size: 14px;
          font-weight: normal;
          margin-left: 2px;
          color: #b9e8ff;
          text-shadow: none;
        }
      }
    }

    .divider {
      width: 1px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    .gradient-list {
      padding: 15px 15px 0;
      margin-top: 2px;
      border-top: 1px dashed rgba(0, 168, 252, 0.3);

      .gradient-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2px;

        &:last-child {
          margin-bottom: 0;
        }

        .g-label {
          font-size: 14px;
          color: #b9e8ff;
        }

        .g-value {
          font-family: DIN-Bold, sans-serif;
          font-size: 16px;
          color: #fff;
          font-weight: bold;

          .g-unit {
            font-size: 12px;
            font-weight: normal;
            margin-left: 2px;
            color: #b9e8ff;
          }
        }
      }
    }

    .gradient-toggle-wrap {
      padding: 10px 15px 0;

      .gradient-toggle-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: #00d2ff;
        cursor: pointer;
        user-select: none;
        transition: color 0.2s;
        font-family: Alibaba-PuHuiTi-2;
        &:hover {
          color: #ffffff;
        }

        .toggle-arrow {
          font-size: 10px;
          transition: transform 0.2s;

          &.expanded {
            transform: rotate(180deg);
          }
        }
      }
    }
  }

  .tooltip-arrow {
    position: absolute;
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background: #062a4d; /* 匹配 content 底部颜色 */
    border-right: 1px solid #00a8fc;
    border-bottom: 1px solid #00a8fc;
    box-shadow: 2px 2px 5px rgba(0, 168, 252, 0.3);
    z-index: 1;
  }
}
</style>
