<template>
  <div class="oa-summarys-box">
    <div
      v-for="(item, i) in gridList"
      :key="i"
      class="grid-item"
    >
      <div class="item-label">{{ item.label }}</div>
      <div class="item-value">
        {{ item.value }}
        <span class="unit">{{ item.unit }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import bg1 from '@/assets/images/Group 1321317116.png'
import bg2 from '@/assets/images/Group 1321317117.png'
import bg3 from '@/assets/images/Group 1321317118.png'
import bg4 from '@/assets/images/Group 1321317119.png'

const gridList = [
  { label: '应缴金额', value: '46,820', unit: '万元', bg: bg1 },
  { label: '实缴金额', value: '43,610', unit: '万元', bg: bg2 },
  { label: '应缴人数', value: '82,600', unit: '人', bg: bg3 },
  { label: '实缴人数', value: '78,940', unit: '人', bg: bg4 }
]
</script>
<style scoped lang="scss">
.oa-summarys-box {
  width: 100%;
  height: 100%;
  padding: 10px 14px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  .grid-item {
    width: 210px;
    height: 86px;
    background: url('@/assets/images/Group 1321317116.png');
    background-size: 100% 100%;
    text-align: center;
    .item-label {
      font-size: 16px;
      color: #fff;
      margin-top: 16px;
      font-family: Alibaba-PuHuiTi-Regular;
    }
    .item-value {
      width: 110px;
      text-align: left;
      margin-top: 2px;
      margin-left: 74px;
      font-size: 20px;
      font-family: Alibaba-PuHuiTi-Regular;
      .unit {
        font-size: 14px;
        color: #ebe4e4;
      }
    }
  }
  .grid-item:nth-child(2) {
    background: url('@/assets/images/Group 1321317117.png');
  }
  .grid-item:nth-child(3) {
    background: url('@/assets/images/Group 1321317118.png');
  }
  .grid-item:nth-child(4) {
    background: url('@/assets/images/Group 1321317119.png');
  }
}
</style>