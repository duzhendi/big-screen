<template>
  <div class="oa-transfer">
    <div class="transfer-row">  
      <div class="transfer-label">转入人数</div>
      <div class="transfer-value">
        <span
          v-for="(ch, i) in splitVal('21934')"
          :key="'in' + i"
          class="digit-slot"
        >{{ ch }}</span>
      </div> 
    </div>
    <div class="transfer-row">  
      <div class="transfer-label">转出人数</div>
      <div class="transfer-value">
        <span
          v-for="(ch, i) in splitVal('18426')"
          :key="'out' + i"
          class="digit-slot"
        >{{ ch }}</span>
      </div> 
    </div>
  </div>
</template>

<script setup>
const splitVal = (v) => String(v).split('')
</script>

<style scoped lang="scss">
.oa-transfer {
  width: 100%;
  height: 100%;
  padding: 14px 18px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .transfer-row {
    height: 90px;
    display: flex;
    justify-content: space-between;
    background: url('@/assets/images/Frame 11050.png') no-repeat;
    background-size: 100% 100%; 
    padding-left: 20px;
      .transfer-label {
        font-size: 16px;
        color: #fff;
        padding-top: 14px;
        font-family: Alibaba-PuHuiTi-2;
      }
      .transfer-value {
        display: flex;
        gap: 2px;
        padding-top: 34px;
        padding-right: 34px;

        .digit-slot {
          width: 21px;
          height: 29px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: url('@/assets/images/Group 131121316598.png') no-repeat;
          background-size: 100% 100%; 
          padding: 0 4px;
          font-size: 20px;
          font-family: Alibaba-PuHuiTi-num;
          color: #fff;
          text-shadow: 0 0 6px rgba(0, 234, 255, 0.6);
        }
      } 
  }
  .transfer-row:nth-child(2) {
    background: url('@/assets/images/Frame 11051.png') no-repeat;
    margin-top: 11px;
    .transfer-value {
      .digit-slot {
        background: url('@/assets/images/Group 13213165981.png') no-repeat;
        background-size: 100% 100%; 
      }
    } 
  }
  
}
</style>