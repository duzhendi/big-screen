<template>
  <div class="sbgxzy-card">
    <!-- 上行：人数 -->
    <div class="row row-top">
      <div class="cell cell-left">
        <div class="text-box">
          <div class="label label-left">转入人数</div>
          <div class="value">18,520 <span class="unit">人</span></div>
        </div>
      </div>
      <div class="cell cell-right">
        <div class="text-box">
          <div class="label label-right">转出人数</div>
          <div class="value">12,680 <span class="unit">人</span></div>
        </div>
      </div>
    </div>

    <!-- 下行：金额 -->
    <div class="row row-bottom">
      <div class="cell cell-left">
        <div class="text-box">
          <div class="label label-left">转入金额</div>
          <div class="value">8,640 <span class="unit">万元</span></div>
        </div>
      </div>
      <div class="cell cell-right">
        <div class="text-box">
          <div class="label label-right">转出金额</div>
          <div class="value">5,920 <span class="unit">万元</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 数据后续接口化：直接替换上面的硬编码数字即可
</script>

<style scoped lang="scss">
.sbgxzy-card {
  width: 428px;
  height: 220px;
  box-sizing: border-box;
  position: relative;
  background: url('@/assets/images/Group 1321314826.png') no-repeat center center;
  background-size: 100% 100%;
  margin: 20px 17px;
  padding: 0px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // ========= 上下行通用 =========
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42%;

    .cell {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 12px;

      // 左边：图标在前
      &.cell-left {
        justify-content: flex-start;
        .label-left {
          padding-left: 36px;
        }
      }
      // 右边：图标在后
      &.cell-right {
        flex-direction: row-reverse;
        justify-content: flex-start;
        .label-right {
          padding-right: 36px;
        }
      } 

      .text-box {
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        // margin-top: 10px;
        // 右边单元的文字也保持左对齐（因为 flex-direction 反转后自然靠右展示，text-box 内部维持 row-reverse 会变对齐）
        :deep(&) { /* noop just to reset */ }

        .label {
          font-family: Alibaba PuHuiTi-Regular;
          font-size: 16px;
          color: ffffff;
          font-weight:400;
          white-space: nowrap;
          margin-bottom: 10px;
        }
        .value {
          margin-top: 2px;
          font-family: Alibaba PuHuiTi-2;
          font-size: 20px;
          letter-spacing: 1px;
          color: #ffffff;

          .unit {
            font-size: 13px;
            font-weight: normal;
            letter-spacing: 0;
            background: linear-gradient(180deg, rgba(255,255,255,0.9) 30%, rgba(180,220,255,0.8) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        }
      }
    }
  }
  .row-bottom {
    height: 50%;
  }
}
</style>
