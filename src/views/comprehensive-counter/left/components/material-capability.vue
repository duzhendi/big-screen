<template>
  <div class="material-capability">
    <div class="trend-title">材料数字化能力</div>
    <div class="capability-content">
      <!-- 复用「综合业务 - 参保异动类型人数分布」的卡片，去掉顶部总计行，三张卡统一蓝色 -->
      <div class="ratio-row">
        <div v-for="(item, idx) in ratioList" :key="item.name" class="ratio-card">
          <div class="ratio-title">{{ item.name }}</div>
          <div class="ratio-num">
            <span class="num">{{ item.num }}<span class="unit">{{ item.unit }}</span></span>
          </div>
          <div class="ratio-percent">{{ item.percent }}{{ item.name == '受理材料数' ? '%' : item.unit }}</div>
          <div class="ratio-glow" />
          <div class="ratio-caption">{{ item.caption }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const ratioList = [
  { name: '受理材料数', num: 4, unit: '件', percent: 0, caption: '电子化率' },
  { name: '免提交材料数', num: 0, unit: '件', percent: 7, caption: '归档材料件' },
  { name: '平均归档页数', num: 3, unit: '页', percent: 1.84, caption: '平均归档档案页数偏差值' }
]
</script>

<style scoped lang="scss">
.material-capability {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .capability-content {
    flex: 1;
    min-height: 0;
    box-sizing: border-box;
    padding: 8px 12px 0;

    .ratio-row {
      display: flex;
      gap: 12px;
      height: 100%;
      min-height: 0;

      .ratio-card {
        height: 163px;
        flex: 1;
        min-width: 0;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        overflow: hidden;
        text-align: center;

        // 三张卡统一蓝色（原模块第 2 张是黄色）
        background: url('@/assets/images/图列-2.png') no-repeat center center;
        background-size: 100% 100%;

        // 标题位于背景图自带的标题框内
        .ratio-title { 
          font-size: 15px;
          font-family: Alibaba-PuHuiTi-Regular;
          letter-spacing: 3px;
          text-indent: 3px;
          color: #ffffff;
          padding-top: 14px;
        }

        .ratio-num {
          margin-top: 4px;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 4px;
          padding-top: 10px;

          .num {
            font-family: Alibaba-PuHuiTi-Medium;
            font-size: 20px;
            line-height: 1;
            background: linear-gradient(180deg, #cfe9ff 0%, #0095ff 100%);
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
          margin-top: 10px;
          font-family: Alibaba PuHuiTi Medium;
          font-size: 20px;
          letter-spacing: 1px;
          color: #ffffff;
          z-index: 1;
        }
 
        // 卡片底部小字说明
        .ratio-caption {
          display: inline-block;
          width: 90px;
          height: 24px;
          margin-top: 30px;
          font-family: Alibaba-PuHuiTi-Regular;
          font-size: 12px;
          line-height: 1.2;
          color: #FFFFFF;
          display: flex;
          align-items: end;
          justify-content: center;
        }

        // 底部发光底座图（位于文字下层）
        .ratio-glow {
          position: absolute;
          z-index: 0;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          width: 68px;
          height: 57px;
          background-image: url('@/assets/images/Group 2036083505.png');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
          pointer-events: none;
        }
      }
    }
  }

  // 标题栏，与右侧各面板保持一致
  .trend-title {
    flex-shrink: 0;
    height: 28px;
    line-height: 28px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    background: url('@/assets/images/标题背景12345.png') no-repeat center center;
    background-size: 100% 100%;
    padding-left: 24px;
    font-size: 14px;
    color: #fff;
    font-family: Alibaba-PuHuiTi-Medium;
    letter-spacing: 1px;

  }
}
</style>
