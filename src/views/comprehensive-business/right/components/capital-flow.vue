<template>
  <div class="capital-flow">
    <div class="flow-card-box">
      <div v-for="(item, idx) in flowList" :key="item.name" class="flow-card" :class="`flow-${idx}`">
        <div class="val">{{ item.value.toLocaleString() }}<span class="unit">万</span></div>
        <div class="label">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 资金流入流出结构：只放数据，背景图片用户自己处理
const flowList = [
  { name: '流入金额', value: 186420 },
  { name: '净流入金额', value: 43740 },
  { name: '流出金额', value: 142680 }
]
</script>

<style scoped lang="scss">
.capital-flow {
  width: 399px;
  height: 212px;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 21px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: url('@/assets/images/Group 2036084046.png') no-repeat;
  background-size: 100% 100%;
  .flow-card-box {
    display: flex;
    width: 357px;
    height: 104px;
    margin: 0 auto;
    background: url('@/assets/images/Group 2036084031.png') no-repeat;
    background-size: 100% 100%;
    .flow-card {
      flex: 1;
      text-align: center;
        .val {
          font-family: Alibaba-PuHuiTi-2;
          font-size: 20px;
          color: #fff;
          margin-top: 34px;
          .unit {
            font-size: 14px;
            color: #fff;
            font-family: Alibaba-PuHuiTi-Regular;
          }
        }
      .label {
        font-size: 16px;
        color: #fff;
        font-family: Alibaba-PuHuiTi-2;
        margin-top: 48px;
      }
    }
    .flow-card:nth-child(1) {
      text-align: left;
      .val {
        margin-top: 34px;
      }
      .label {
        margin-left: 12px;
        margin-top: 34px;
      }
    }
    .flow-card:nth-child(3) {
       text-align: right;
       .val {
        margin-top: 34px;
      }
      .label {
        margin-left: 12px;
        margin-top: 34px;
      }
    }
  }
}
</style>
