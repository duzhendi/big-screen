<template>
  <div class="efficiency-capability">
    <div class="trend-title">办理效率能力</div>
    <div class="capability-content">
      <!-- 复用「社保基金 - 社保缴费赎回情况」的三行卡片样式 -->
      <div v-for="(item, i) in statusList" :key="i" class="status-card">
        <div class="status-info">
          <div class="status-label">
            <img :src="item.img" alt="" class="status-icon">
            {{ item.label }}
          </div>
          <div class="status-num">
            <span class="num">{{ item.display }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import img1 from '@/assets/images/Group 2036083586.png'
import img2 from '@/assets/images/Group 2036083586 (1).png'
import img3 from '@/assets/images/Group 2036083586 (2).png'


// 无数据时展示占位符
const toDisplay = (v) => (v === null || v === undefined ? '---' : Number(v).toLocaleString())

const rawList = [
  { label: '平均办结时长', value: 0, img: img1 },
  { label: '平均办结时长偏差值', value: 0.04, img: img2 },
  { label: '超期件数', value: null, img: img3 }
]

const statusList = rawList.map((item) => ({ ...item, display: toDisplay(item.value) }))
</script>

<style scoped lang="scss">
.efficiency-capability {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .capability-content {
    flex: 1;
    min-height: 0;
    padding: 8px 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 6px;

    .status-card {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 0px 14px;
      background: url('@/assets/images/Group 2036086021.png') no-repeat center center;
      background-size: 100% 100%;

      .status-info {
        height: 100%;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .status-label {
          font-size: 16px;
          font-family: Alibaba-PuHuiTi-2;
          background: linear-gradient(180deg, #ffffff 40%, #0561f4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: flex;
          align-items: center;
          .status-icon {
            width: 56px;
            height: 46px;
            margin-right: 8px;
          }
        }

        .status-num {
          width: 100px;
          text-align: center;
          margin-right: 10px;
          .num {
            font-size: 20px;
            font-family: Alibaba-PuHuiTi-Medium;
            color: #fff;
          }
        }
      }
    }
    .status-card:nth-child(3) {
      .status-info {
        .status-label {
          background: linear-gradient(180deg, #ffffff 30%, #f17274 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
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
