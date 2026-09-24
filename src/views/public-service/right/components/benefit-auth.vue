<template>
  <div class="benefit-auth">
    <div class="auth-cards">
      <div class="auth-card normal"> 
        <div class="card-label">已反馈量</div>
        <div class="card-value">
          <span class="num">{{ fedBack.toLocaleString() }}</span>
          <span class="u">笔</span>
        </div>
        <div class="card-rate">
          <span class="rate-label">反馈率</span>
          <span class="rate-val">{{ feedbackRate }}%</span>
        </div>
      </div>
      <div class="auth-card danger">
        <div class="card-label">超期未反馈</div>
        <div class="card-value">
          <span class="num num-red">{{ overdueNum }}</span>
          <span class="u">笔</span>
        </div>
        <div class="card-rate">
          <span class="rate-label">超期率</span>
          <span class="rate-val">{{ overdueRate }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const fedBack = 38842
const feedbackRate = 100
const overdueNum = 0
const overdueRate = 0
</script>

<style scoped lang="scss">
.benefit-auth {
  width: 418px;
  height: 166px;
  padding: 14px;
  margin: 0 auto;
  box-sizing: border-box;
  background: url('@/assets/images/Group 2036083648.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 8px;

  .auth-cards {
    display: flex;
    gap: 10px;
    height: 100%;

    .auth-card {
      flex: 1;
      position: relative;
      padding: 20px 16px 14px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 6px;
      text-align: center;

      .card-label {
        font-size: 16px;
        color: #fff;
        font-family: Alibaba-PuHuiTi-Regular;
        margin-top: 12px;
      }
      .card-value {
        margin-top: 14px;
        .num {
          font-size: 24px;
          font-family: Alibaba-PuHuiTi-Medium;
          background: linear-gradient(180deg, #ffffff 30%, #0ebcf1 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .u {
          font-size: 13px;
          color: rgba(255,255,255,0.85);
          margin-left: 3px;
        }
        .num-red {
          background: linear-gradient(180deg, #ffffff 30%, #eb4040 90%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .card-rate {
        display: flex;
        flex-direction: column;
        gap: 6px; 
        .rate-label {
          font-size: 14px;
          color: #fff;
          font-family: Alibaba-PuHuiTi-Regular;
        }
      }
    }
  }
}
</style>