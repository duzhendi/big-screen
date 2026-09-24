<template>
  <div class="oa-redeem">
    <div class="redeem-stage">
      <div class="stage-bg"></div>
      <div class="stat-item pos-top">
        <div class="stat-text">
          <div class="stat-num blue">2,860笔</div>
          <div class="stat-label">补缴业务数</div>
        </div>
      </div>

      <div class="stat-item pos-left">
        <div class="stat-text">
          <div class="stat-num cyan">1,240笔</div>
          <div class="stat-label">退费业务数</div>
        </div>
      </div>

      <div class="stat-item pos-right">
        <div class="stat-text">
          <div class="stat-num gold">9,680万元</div>
          <div class="stat-label">补缴总金额</div>
        </div>
      </div>

      <div class="stat-item pos-bottom">
        <div class="stat-text">
          <div class="stat-num green">4,260万元</div>
          <div class="stat-label">退费总金额</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.oa-redeem {
  width: 100%;
  height: 100%;
  padding: 10px 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  .redeem-stage {
    width: 100%;
    height: 100%;
    position: relative;

    .stage-bg {
      position: absolute;
      left: 50%;
      top: 55%;
      transform: translate(-50%, -50%);
      width: 410px;
      height: 248px;
      background: url('@/assets/images/Group 2036083603.png') no-repeat;
      background-size: 100% 100%;
      pointer-events: none;
      z-index: 0;
    }

    .stat-item {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 1;

      .stat-text {
        text-align: center;

        .stat-num {
          font-size: 16px;
          font-family: Alibaba-PuHuiTi-Regular;
          letter-spacing: 1px;

          &.blue { color: #40c8ff; }
          &.cyan { color: #00e6ff; }
          &.gold { color: #fad65f; }
          &.green { color: #28ffb3; }

        }
        .stat-label {
          font-size: 14px;
          color: #fff;
          font-family: Alibaba-PuHuiTi-Regular;
          margin-top: 2px;
        }
      }
    }

    .pos-top {
      top: 28%;
      left: 50%;
      transform: translateX(-50%);
    }
    .pos-left {
      top: 63%;
      left: 7%;
      transform: translateY(-50%);
      align-items: flex-start;

      .stat-text { text-align: left; }
    }
    .pos-right {
      top: 63%;
      right: 5%;
      transform: translateY(-50%);
      align-items: flex-end;

      .stat-text { text-align: right; }
    }
    .pos-bottom {
      bottom: 5%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>