<template>
  <div class="redeem-status">
    <div v-for="(item, i) in statusList" :key="i" class="status-card" :style="{ background: `url(${item.bg}) no-repeat center / 100% 100%` }">
      <div class="status-info">
        <div class="status-label">{{ item.label }}</div>
        <div class="status-num">
          <span class="num">{{ item.value.toLocaleString() }}</span>
          <span class="unit">{{ item.unit }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import bg1 from '@/assets/images/Frame 2036083013.png'
import bg2 from '@/assets/images/Frame 2036083014.png'
import bg3 from '@/assets/images/Frame 2036083015.png'

const statusList = [
  { label: '赎回业务数', value: 12680, unit: '笔', bg: bg1 },
  { label: '赎回总金额', value: 62400, unit: '万', bg: bg2 },
  { label: '已到账业务数', value: 11920, unit: '笔', bg: bg3 }
]
</script>

<style scoped lang="scss">
.redeem-status {
  width: 100%;
  height: 100%;
  padding: 10px 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .status-card {
    height: 58px;
    display: flex;
    align-items: center;
    padding: 8px 14px;
    margin-top: 6px;

    .status-icon {
      width: 42px;
      height: 42px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 28px;
        height: 28px;
      }
    }

    .status-info {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .status-label {
        font-size: 16px;
        color: #e6edf4;
        font-family: Alibaba-PuHuiTi-Regular;
        margin-left: 60px;
      }

      .status-num {
        .num {
          font-size: 20px;
          font-family: Alibaba-PuHuiTi-Medium;
          color: #fff;
        }
        .unit {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          margin-left: 2px;
          font-family: Alibaba-PuHuiTi-2; 
          padding-left: 3px;
        }
      }
    }
  }
}
</style>