<template>
  <div class="risk-evaluate">
    <div class="trend-title">风险防控能力</div> 
    <div class="evaluate-card">
      <div class="star-icon"></div>
      <div
        v-for="(item, i) in evaluateList"
        :key="item.label"
        class="evaluate-item"
        :class="{ 'has-divider': i > 0 }"
      >
        <div class="item-label">{{ item.label }}</div>
        <div class="item-value">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const evaluateList = [
  { label: '差评数', value: 2 },
  { label: '不满意', value: 1 },
  { label: '非常不满意', value: 1 }
]
</script>

<style scoped lang="scss">
.risk-evaluate { 
  
  .trend-title {
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

    .download-btn {
      width: 76px;
      height: 28px;
      font-size: 12px;
      color: rgba(255,255,255,0.9);
      background: rgba(0,145,255,0.2);
      border-radius: 3px 3px 3px 3px;
      border: 1px solid #0071BC;
      cursor: pointer;
      text-align: center;
      line-height: 28px;
    }
  }

  .evaluate-card { 
    height: 87px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 14px; 
    margin: 12px;
    background: url('@/assets/images/Group 2036086022.png') no-repeat center center;
    background-size: 100% 100%; 
    

    // 左侧星形图标
    .star-icon {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      margin-right: 16px;
      background: linear-gradient(180deg, #8fd8ff 0%, #1f7fe0 100%);
      clip-path: polygon(
        50% 0%,
        61% 35%,
        98% 35%,
        68% 57%,
        79% 91%,
        50% 70%,
        21% 91%,
        32% 57%,
        2% 35%,
        39% 35%
      );
      filter: drop-shadow(0 0 8px rgba(80, 190, 255, 0.7));
    }

    .evaluate-item {
      flex: 1;
      min-width: 0;
      text-align: center;

      .item-label {
        font-size: 16px;
        font-family: Alibaba-PuHuiTi-Regular;
        background: linear-gradient(180deg, #ffffff 50%, #0091FF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .item-value {
        margin-top: 6px;
        font-size: 20px;
        font-family: Alibaba-PuHuiTi-Regular;
        color: #FFA407;
        text-shadow: 0 0 8px rgba(60, 227, 255, 0.45);
      }
    }
    .evaluate-item:nth-child(3) {
      padding-left: 28px;
    }
  }
}
</style>
