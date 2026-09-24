<template>
  <div class="service-num">
    <div class="service-chart">
      <commonChart :option="YCFWBJLFB_OPTION()" />
      <div class="cout">
        <div>合计</div>
        <span>86,520件</span>
      </div>
    </div>
    <div class="service-legend">
      <div v-for="cel in chartData" :key="cel.label" class="cell">
        <div class="left">
          <div class="icon" :style="{ background: cel.color }"></div>
          <span>{{ cel.label }}</span>
        </div>
        <div class="center" :style="{ color: cel.color }">{{ cel.num }}<span>次</span></div>
        <div class="right">
          占比<span>{{ cel.cert }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import commonChart from '@/components/common-chart.vue'
import { YCFWBJLFB_OPTION } from '@/views/home/options.js'

const chartData = ref([
  {
    num: 36210,
    cert: 42,
    label: '引导办',
    color: '#0091FF'
  },
  {
    num: 36210,
    cert: 42,
    label: '智能办',
    color: '#00EEFF'
  },
  {
    num: 36210,
    cert: 42,
    label: '视频办',
    color: '#FAD760'
  }
])
// 城市数据
</script>

<style scoped lang="scss">
.service-num {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .service-chart {
    width: 190px;
    height: 177px;
    background: url('@/assets/images/home/Group2036083643.png');
    background-size: 100% 100%;
    position: relative;
    .cout {
      width: 80px;
      height: 80px;
      // background: url('@/assets/images/home/Ellipse2371.png');
      // background-size: 100% 100%;
      background: rgba(32, 160, 255, 0.4);
      box-shadow:
        0px 4px 4px 0px rgba(0, 0, 0, 0.25),
        /* 底部阴影 */ 0px 0px 9px 0px rgba(50, 164, 240, 1); /* 蓝色发光 */
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .service-legend {
    width: 223px;
    height: 177px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .cell {
      height: 51px;
      background: url('@/assets/images/home/Rectangle346241641.png');
      background-size: 100% 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .icon {
          width: 6px;
          height: 6px;
          margin-right: 4px;
        }
        > span {
          font-size: 14px;
          background: linear-gradient(180deg, #ffffff 70%, #adcdff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      }
      .center {
        font-family: Alibaba-PuHuiTi-Medium;
        font-size: 14px;
        > span {
          font-family: Alibaba-PuHuiTi-Regular;
          font-size: 14px;
          background: linear-gradient(180deg, #ffffff 70%, #adcdff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      }
      .right {
        font-size: 14px;
        background: linear-gradient(180deg, #ffffff 70%, #adcdff 100%);

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        > span {
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
