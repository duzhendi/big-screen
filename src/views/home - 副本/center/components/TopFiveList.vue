<template>
  <div class="top-list-panel">
    <div class="rect-class"></div>
    <div class="panel-title">{{ title }}</div>
    <div class="bottom-line"></div>
    <div class="list-content">
      <div v-for="(item, index) in data" :key="item.name" class="list-item">
        <div class="rank-num">
          <!-- 前5名使用图片图标 -->
          <div v-if="index < 5" class="rank-img" :class="'rank-img-' + (index + 1)"></div>
          <!-- 超过5名显示普通数字 -->
          <span v-else class="num-icon">{{ index + 1 }}</span>
        </div>
        <div class="item-info">
          <div class="info-row">
            <span class="area-name">{{ item.name }}</span>
            <span class="area-value">{{ item.value }}家</span>
          </div>
          <!-- 进度条 -->
          <div class="progress-bg">
            <div
              class="progress-bar"
              :style="{
                width: (item.value / (data[0]?.value || 1)) * 100 + '%',
                background: getProgressColor(index)
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: '排名TOP5'
  },
  data: {
    type: Array,
    default: () => []
  }
})

// 获取进度条颜色
const getProgressColor = (index) => {
  const colors = [
    'linear-gradient(90deg, #f3a505 19%, #f6d71f 100%)',
    'linear-gradient(90deg, #a5b3c1 19%, #d7ebe6 100%)',
    'linear-gradient(90deg, #AB5B16 19%, #F9E5D3 100%)',
    'linear-gradient(90deg, #2D80FF 19%, #97C0FF 100%)',
    'linear-gradient(90deg, #2D80FF 19%, #97C0FF 100%)'
  ]
  return colors[index] || '#ccc'
}
</script>

<style lang="scss" scoped>
.top-list-panel {
  position: absolute;
  top: 1%;
  left: 2%;
  pointer-events: none; /* 防止遮挡地图交互 */

  .rect-class {
    width: 6px;
    height: 7px;
    background: linear-gradient(176deg, #3ce3ff 0%, #62aefa 100%);
    border-radius: 1px;
    position: absolute;
    top: 18px;
    left: 10px;
    z-index: 1;
  }
  .panel-title {
    position: absolute;
    width: 300px; /* 稍微加宽以容纳更长的标题 */
    top: 10px;
    left: 10px;
    font-family: Alibaba-PuHuiTi-2;
    font-weight: normal;
    font-size: 14px;
    color: #ffffff;
    padding-left: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bottom-line {
    position: absolute;
    top: 20px;
    width: 260px;
    height: 9px;
    background: linear-gradient(90deg, rgba(45, 128, 255, 0.64) 1%, rgba(45, 128, 255, 0) 100%);
    border: 1px solid;
    border-image: radial-gradient(circle, rgba(60, 227, 255, 0.48), rgba(60, 227, 255, 0)) 1 1;
    z-index: -1;
  }
  .list-content {
    position: absolute;
    top: 50px;
    pointer-events: auto; /* 列表内容可交互 */

    .list-item {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      width: 156px;
      height: 23px;
    }
    .rank-num {
      width: 24px;
      margin-right: 8px;
      display: flex;
      justify-content: center;
      align-items: flex-start; /* 顶部对齐 */
      padding-top: 2px; /* 微调对齐位置 */
    }
    .rank-img {
      width: 14px;
      height: 14px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .rank-img-1 {
      background-image: url('@/assets/images/center/img_no1.png');
    }
    .rank-img-2 {
      background-image: url('@/assets/images/center/img_no2.png');
    }
    .rank-img-3 {
      background-image: url('@/assets/images/center/img_no3.png');
    }
    .rank-img-4 {
      background-image: url('@/assets/images/center/img_no4.png');
    }
    .rank-img-5 {
      background-image: url('@/assets/images/center/img_no5.png');
    }
    .num-icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background: #333;
      border-radius: 2px;
      font-size: 12px;
      color: #fff;
    }

    .item-info {
      flex: 1;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #fff;
      margin-bottom: 2px;
    }
    .area-name {
      font-family: Alibaba-PuHuiTi-2;
    }
    .area-value {
      font-family: DIN-Bold, sans-serif;
    }
    .progress-bg {
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
    }
    .progress-bar {
      height: 100%;
      border-radius: 2px;
      transition: width 0.5s ease;
    }
  }
}
</style>
