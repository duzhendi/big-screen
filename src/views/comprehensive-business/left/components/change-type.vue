<template>
  <div class="change-type">
    <!-- 顶部总计 -->
    <div class="total-row">
      <span class="label">参保异动类型人数总计</span>
      <div class="num-box">
        <span v-for="(d, i) in totalStr" :key="i" class="digit">{{ d }}</span>
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
          <span class="num">{{ item.num }}<span class="unit">人</span></span>
          
        </div>
        <div class="ratio-percent">{{ item.percent }}%</div>
        <div class="ratio-tag">占比</div>
        <div class="ratio-glow" />
      </div>
    </div>
  </div>
</template>

<script setup>
// 参保异动类型人数：总计 280,400
const totalVal = 280400
const totalStr = String(totalVal).split('')

const ratioList = [
  { name: '频繁转移', num: 126800, percent: 42 },
  { name: '信息错误', num: 86200, percent: 35 },
  { name: '基数异常', num: 67400, percent: 23 }
]
</script>

<style scoped lang="scss">
.change-type {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 12px;

  // 顶部总计
  .total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 66px;
    line-height: 66px;
    flex-shrink: 0;
    padding: 0 14px;
    margin-top: 12px;
    background: url('@/assets/images/Frame 4273206451201.png') no-repeat center center;
    background-size: 100% 100%;

    .label {
      font-size: 16px;
      color: #e8f3ff;
    }

    .num-box {
      display: flex;
      gap: 4px;

      .digit {
        width: 22px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-family: Alibaba-PuHuiTi-Regular;
        font-size: 20px;
        color: #fff;
        background: url('@/assets/images/Group 131121316598.png') no-repeat center center;
        background-size: 100% 100%;
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
      &.ratio-0, &.ratio-2 {
        background: url('@/assets/images/图列-2.png') no-repeat center center;
        background-size: 100% 100%;
      }
      &.ratio-1 {
        background: url('@/assets/images/图列-2 (2).png') no-repeat center center;
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
          background: linear-gradient(180deg, #ffffff 0%, #0095ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          .unit {
            font-family: Alibaba-PuHuiTi-Regular;
            font-size: 12px;
            margin-left: 4px;
          }
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
      &.ratio-0, &.ratio-2 {
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
      
    }
  }
}
</style>
