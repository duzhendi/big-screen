<template>
  <div class="home-left-wrapper">
    <common-box title="全民参保分布" height="262px">
      <div class="content-screen qmcbfb">
        <div class="board-bg">
          <div class="data-bg">
            <div class="data-left">
              <div class="label-cell">
                <div class="icon"></div>
                <span class="label">已参保人数</span>
              </div>
              <span class="value">7,286,430 <span class="unit">人</span></span>
            </div>
            <div class="data-right">
              <div class="label-cell">
                <span class="label">未参保人数</span>
                <div class="icon"></div>
              </div>
              <span class="value">7,286,430 <span class="unit">人</span></span>
            </div>
            <div class="data-chart">
              <commonChart :option="QMCBFB_OPTION()" />
              <div class="cout">
                <span>94.3%</span>
                <div>已参保</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </common-box>
    <common-box title="参保覆盖率TOP5区域" height="300px" style="margin-top: 13px">
      <div class="content-screen"><cbTop5 /></div>
    </common-box>
    <common-box title="各远程服务类型办件量分布" height="304px" style="margin-top: 14px">
      <div class="content-screen"><serviceNum /></div>
    </common-box>
  </div>
</template>

<script setup>
import commonBox from '@/components/common-box.vue'
import cbTop5 from './components/cb-top5.vue'
import serviceNum from './components/service-num.vue'
import commonChart from '@/components/common-chart.vue'
import { QMCBFB_OPTION } from '@/views/home/options.js'
</script>

<style scoped lang="scss">
.home-left-wrapper {
  width: 100%;
  height: 100%;
  .content-screen {
    width: 100%;
    height: 100%;
  }
  .qmcbfb {
    display: flex;
    justify-content: center;
    align-items: center;
    .board-bg {
      width: 434px;
      height: 183px;
      background: url('@/assets/images/home/board-bg.png');
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .data-bg {
        width: 426px;
        height: 115px;
        background: url('@/assets/images/home/Group2036084032.png');
        background-size: 100% 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 18px 0 14px;
        position: relative;
        .data-chart {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 115px;
          height: 115px;
          .cout {
            width: 115px;
            height: 115px;
            position: absolute;
            top: 0;
            left: 0%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            > span {
              font-family: Alibaba-PuHuiTi-Medium;
              font-size: 16px;
              font-weight: bold;
              letter-spacing: 1px;
            }
          }
        }
        .data-left,
        .data-right {
          .label-cell {
            display: flex;
            align-items: center;
          }
          .label {
            font-size: 16px;
            color: #b9e8ff;
          }
          .icon {
            width: 10px;
            height: 7px;
          }
          .value {
            font-family: Alibaba-PuHuiTi-Medium;
            font-size: 20px;
            display: inline-block;
            margin-top: 6px;
            .unit {
              font-size: 14px;
            }
          }
        }
        .data-left {
          .icon {
            background: url('@/assets/images/home/Rectangle1455.png');
            background-size: 100% 100%;
            margin-right: 6px;
          }
        }
        .data-right {
          .icon {
            background: url('@/assets/images/home/Rectangle14551.png');
            background-size: 100% 100%;
            margin-left: 6px;
          }
        }
      }
    }
  }
}
</style>
