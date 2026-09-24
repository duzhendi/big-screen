<template>
  <div class="risk-rule">
    <div class="trend-title">风险防控能力</div> 
    <div class="rule-card">
      <div class="rule-label">触发风控规则数</div>
      <div class="num-box">
        <span v-for="(d, i) in digits" :key="i" class="digit">{{ d }}</span>
        <div class="unit">条</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 触发风控规则数
const ruleCount = 10
const digits = String(ruleCount).split('')
</script>

<style scoped lang="scss">
.risk-rule {

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

  .rule-card {
    height: 87px;
    box-sizing: border-box;
    padding: 0 14px; 
    margin: 12px;
    background: url('@/assets/images/Frame 42731906911.png') no-repeat center center;
    background-size: 100% 100%; 

    .rule-label {
      font-size: 16px;
      color: #fff;
      font-family: Alibaba-PuHuiTi-Regular;
      letter-spacing: 1px;
      padding-top: 6px;
    }

    .num-box {
      display: flex;
      gap: 4px;
      margin-top: 16px;

      .digit {
        width: 22px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-family: Alibaba-PuHuiTi-num;
        font-size: 20px;
        color: #fff;
        background: url('@/assets/images/Group 132131651198 (1).png') no-repeat center center;
        background-size: 100% 100%;
      }
    }

    .unit {
      width: 22px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      font-family: Alibaba-PuHuiTi-num;
      color: rgba(255, 255, 255, 0.85);
      margin-left: 6px;
      background: url('@/assets/images/Group 132131651198 (1).png') no-repeat center center;
      background-size: 100% 100%;
    } 
     
  }
}
</style>
