<template>
  <div class="score-result">
    <div class="score-container">
      <!-- 左侧总分球 -->
      <div class="score-left">
        <div class="globe-box">
          <div class="globe-placeholder">
            <!-- 图片占位 -->
            <div class="icon-doc"></div>
          </div>
          <div class="base-shadow"></div>
        </div>
        <div class="total-score">
          <div class="num">{{ totalScore }}<span class="unit">分</span></div>
          <div class="desc">满分100分，60分合格</div>
        </div>
      </div>

      <!-- 右侧得分详情 -->
      <div class="score-right">
        <div class="top-cards">
          <div class="score-card" v-for="(item, index) in scoreCards" :key="index">
            <div class="card-title">{{ item.label }}</div>
            <div class="card-divider"></div>
            <div class="gauge-box" :style="{ backgroundImage: `url(${item.icon})` }">
              <div class="gauge-num">{{ item.value }}<span class="unit">分</span></div>
            </div>
            <div class="full-score">满分{{ item.max }}分</div>
          </div>
        </div>
        <div class="bottom-status">
          <div class="status-box">
            <div class="status-title">满足直通条件</div>
            <div class="card-divider"></div>
            <div class="status-tags">
              <div class="tag" :class="{ active: isStraightSatisfied }">其中一项</div>
              <div class="tag" :class="{ active: !isStraightSatisfied }">全不满足</div>
            </div>
            <div class="status-desc">{{ isStraightSatisfied ? '至少满足其中一项' : '全不满足' }}</div>
          </div>
          <div class="status-box">
            <div class="status-title">符合基本条件</div>
            <div class="card-divider"></div>
            <div class="status-tags">
              <div class="tag" :class="{ active: isGeneralSatisfied }">全部符合</div>
              <div class="tag" :class="{ active: !isGeneralSatisfied }">部分符合</div>
            </div>
            <div class="status-desc">{{ isGeneralSatisfied ? '全部符合' : '部分符合' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getImage } from '@/utils'
import { computed } from 'vue'

const props = defineProps({
  enterpriseName: String,
  portrait: {
    type: Object,
    default: null
  }
})

const scoreVo = computed(() => props.portrait?.scoreVo || {})
const totalScore = computed(() => scoreVo.value?.score ?? '--')

const scoreCards = computed(() => [
  {
    label: '创新能力得分',
    value: scoreVo.value?.chuangScore ?? '--',
    max: 40,
    icon: getImage('center/img_创新能力.png')
  },
  { label: '成长性得分', value: scoreVo.value?.chengScore ?? '--', max: 30, icon: getImage('center/img_成长性.png') },
  { label: '专业化得分', value: scoreVo.value?.zhuanScore ?? '--', max: 30, icon: getImage('center/img_专业化.png') }
])

const isStraightSatisfied = computed(() => String(scoreVo.value?.isStraight) === '1')
const isGeneralSatisfied = computed(() => String(scoreVo.value?.isGeneral) === '1')
</script>

<style lang="scss" scoped>
.score-result {
  flex: 1;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;

  .score-container {
    display: flex;
    flex: 1;
    align-items: center;
  }

  .score-left {
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    .globe-box {
      position: relative;
      width: 120px;
      height: 120px;
      .globe-placeholder {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon-doc {
          width: 134px;
          height: 141px;
          background: url('@/assets/images/得分图例.png') no-repeat center center;
          background-size: cover;
        }
      }
      .base-shadow {
        position: absolute;
        bottom: -10px;
        left: 10%;
        width: 80%;
        height: 20px;
        background: radial-gradient(ellipse, rgba(0, 168, 252, 0.6) 0%, transparent 80%);
        transform: rotateX(60deg);
      }
    }

    .total-score {
      text-align: center;
      .num {
        font-family: Helvetica-Bold;
        font-size: 32px;
        color: #ffffff;
        text-shadow: 0 0 15px rgba(60, 227, 255, 0.6);
        .unit {
          font-size: 18px;
          margin-left: 4px;
        }
      }
      .desc {
        font-size: 14px;
        color: #b9e8ff;
        opacity: 0.8;
        margin-top: 8px;
      }
    }
  }

  .score-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
    .top-cards {
      display: flex;
      gap: 20px;
      .score-card {
        width: 140px;
        height: 172px;
        background: linear-gradient(0deg, rgba(51, 133, 255, 0) 0%, rgba(51, 133, 255, 0.24) 99.43%);
        padding: 16px;
        box-sizing: border-box;
        text-align: center;
        .card-title {
          font-size: 14px;
          color: #b9e8ff;
          margin-bottom: 8px;
        }
        .card-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(55, 192, 255, 0) 0%,
            rgba(55, 192, 255, 0.5) 50%,
            rgba(55, 192, 255, 0) 100%
          );
          margin-bottom: 12px;
        }
        .gauge-box {
          width: 85px;
          height: 85px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          .gauge-num {
            font-family: Alibaba-PuHuiTi-2;
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            margin-top: 4px; // 视觉对齐
            .unit {
              font-size: 14px;
              margin-left: 2px;
            }
          }
        }
        .full-score {
          font-family: Alibaba-PuHuiTi-2;
          font-weight: normal;
          font-size: 14px;
          color: #b9e8ff;
          color: rgba(185, 232, 255, 0.6);
          margin-top: 8px;
        }
      }
    }

    .bottom-status {
      display: flex;
      gap: 20px;
      .status-box {
        width: 215px;
        height: 118px;
        background: linear-gradient(0deg, rgba(51, 133, 255, 0.24) 0.57%, rgba(51, 133, 255, 0.04) 100%);
        padding: 16px;
        box-sizing: border-box;
        text-align: center;
        .status-title {
          font-size: 14px;
          color: #b9e8ff;
          margin-bottom: 8px;
        }
        .card-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(55, 192, 255, 0) 0%,
            rgba(55, 192, 255, 0.5) 50%,
            rgba(55, 192, 255, 0) 100%
          );
          margin-bottom: 12px;
        }
        .status-tags {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 12px;
          .tag {
            padding: 4px 12px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 12px;
            color: rgba(185, 232, 255, 0.5);
            border-radius: 2px;
            &.active {
              background: rgba(15, 255, 153, 0.2);
              border-color: #0fff99;
              color: #0fff99;
              position: relative;
              &::after {
                content: '';
                position: absolute;
                top: -8px;
                right: -8px;
                width: 16px;
                height: 16px;
                background: url('@/assets/images/center/icon_选中.png') no-repeat center center;
                background-size: 100% 100%;
              }
            }
          }
        }
        .status-desc {
          font-size: 12px;
          color: rgba(185, 232, 255, 0.8);
        }
      }
    }
  }
}
</style>
