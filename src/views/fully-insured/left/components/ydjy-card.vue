<template>
  <div class="ydjy-card">
    <!-- 顶部 2 个统计卡 -->
    <div class="stat-row">
      <div v-for="item in statList" :key="item.label" class="stat-card">
        <div class="stat-icon">
          <img :src="item.icon" alt="" class="stat-icon-img">
        </div>
        <div class="stat-info">
          <div class="stat-label">{{ item.label }}</div>
          <div class="stat-value">{{ item.value }}</div>
          <div class="stat-value-glow" />
        </div>
      </div>
    </div>

    <!-- 底部 3 个占比卡 -->
    <div class="ratio-row">
      <div
        v-for="(item, idx) in ratioList"
        :key="item.name"
        class="ratio-card"
        :class="`ratio-${idx}`"
      >
        <div class="ratio-title">{{ item.name }}</div>
        <div class="ratio-num">
          <span class="num">{{ item.num }}</span>
          <span class="unit">人次</span>
        </div>
        <div class="ratio-percent">{{ item.percent }}%</div>
        <div class="ratio-tag">占比</div>
        <!-- 底部发光底座图（置于文字下层） -->
        <div class="ratio-glow" />
      </div>
    </div>
  </div>
</template>

<script setup>
import iconRecord from '@/assets/images/Group 2036083504.png'
import iconSettle from '@/assets/images/Group 1321316597.png'

const statList = [
  { label: '异地备案人次', value: '286,400', icon: iconRecord },
  { label: '异地就业结算人数', value: '218,600', icon: iconSettle }
]

const ratioList = [
  { name: '普门', num: '91,800', percent: 42 },
  { name: '住院', num: '76,500', percent: 35 },
  { name: '门慢特', num: '50,300', percent: 23 }
]
</script>

<style scoped lang="scss">
.ydjy-card {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 12px;

  // ========= 顶部统计卡 =========
  .stat-row {
    display: flex;
    gap: 12px;
    height: 72px;
    flex-shrink: 0;
    margin-top: 12px;

    .stat-card { 
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      padding: 0 12px 0 20px;
      gap: 10px;
      background: url('@/assets/images/Frame 427320645.png') no-repeat center center;
      background-size: 100% 100%;

      .stat-icon { 
        width: 44px;
        height: 47px;
        .stat-icon-img {
          width: 100%;
          height: 100%;
        }
      }

      .stat-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .stat-label {
          font-family: Alibaba-PuHuiTi-Regular;
          font-weight: 400;
          font-size: 16px;
          line-height: 1;
          color: #FFFFFF;
          white-space: nowrap;
        }
        .stat-value {
          margin-top: 6px;
          font-family: Alibaba-PuHuiTi-Medium, sans-serif;
          font-size: 20px;
          font-weight: bold;
          line-height: 1;
          background: linear-gradient(180deg, #ffffff 30%, #64dcff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        // 数值下方的横向辉光
        .stat-value-glow {
          margin-top: 4px;
          width: 76px;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, rgba(100, 220, 255, 0.75) 0%, rgba(100, 220, 255, 0) 100%);
          filter: blur(1px);
        }
      }
    }
  }

  // ========= 底部占比卡 =========
  .ratio-row {
    display: flex;
    gap: 12px;
    flex: 1;
    min-height: 0;

    .ratio-card {
      flex: 1;
      width: 135px;
      height: 166px;
      min-width: 0;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      // 各卡独立背景图
      &.ratio-0 {
        background: url('@/assets/images/图列-2.png') no-repeat center center;
        background-size: 100% 100%;
      }
      &.ratio-1 {
        background: url('@/assets/images/图列-2 (2).png') no-repeat center center;
        background-size: 100% 100%;
      }
      &.ratio-2 {
        background: url('@/assets/images/图列-2 (1).png') no-repeat center center;
        background-size: 100% 100%;
      }

      // 标题位于背景图自带的标题框内
      .ratio-title {
        height: 43px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 300;
        font-family: Alibaba-PuHuiTi-2;
        letter-spacing: 3px;
        text-indent: 3px;
        color: #FFFFFF;
      }

      .ratio-num {
        margin-top: 4px;
        display: flex;
        align-items: baseline;
        justify-content: center;
        gap: 4px;

        .num {
          font-family: Alibaba-PuHuiTi-Medium, sans-serif;
          font-size: 20px;
          font-weight: bold;
          line-height: 1;
          // 主题色由各卡覆盖，此处仅作兜底
          background: linear-gradient(180deg, #ffffff 0%, #0095ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .unit {
          font-family: Alibaba-PuHuiTi-Regular;
          font-size: 12px;
          background: linear-gradient(180deg, #ffffff 30%, #cdeaff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }

      .ratio-percent {
        margin-top: 6px;
        font-family: Alibaba PuHuiTi 2.0-65 Medium;
        font-size: 20px;
        ffont-weight: normal;
        line-height: 1;
        letter-spacing: 1px;
        color: #ffffff; 
        margin-top: 10px;
        margin-bottom: 44px;
      }

      .ratio-tag {
        font-family: Alibaba-PuHuiTi-2;
        font-size: 14px;
        line-height: 1;
        color: fff;

      }

      // 底部发光底座图（位于文字下层）
      .ratio-glow {
        position: absolute;
        z-index: 0;
        bottom: 22px;
        left: 50%;
        transform: translateX(-50%);
        width: 68px;
        height: 60px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        pointer-events: none;
      }

      // ---- 各卡主题色 ----
      &.ratio-0 {
        .num {
          background: linear-gradient(180deg, #cfe9ff 0%, #0095ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
        }
        .ratio-glow {
          background-image: url('@/assets/images/Group 2036083505.png');
        }
      }
      &.ratio-1 {
        .num {
          background: linear-gradient(180deg, #ffeec2 0%, #e9c04e 100%);
          -webkit-background-clip: text;
          background-clip: text;
        }
        .ratio-glow {
          background-image: url('@/assets/images/Group 2036083505 (1).png');
        }
      }
      &.ratio-2 {
        .num {
          background: linear-gradient(180deg, #ccfbff 0%, #00e0ff 100%);
          -webkit-background-clip: text;
          background-clip: text;
        }
        .ratio-glow {
          background-image: url('@/assets/images/Group 2036083505 (2).png');
        }
      }
    }
  }
}
</style>
