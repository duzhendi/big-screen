<template>
  <div class="sb-fund-center-wrapper">
    <div class="data-box">
      <div class="box-item card-left">
        <div class="card-title">社保资金总量</div>
        <div class="card-body">
          <div class="sub-cell">
            <div class="cell-head">
              <span class="cell-dot"></span>
              <span class="cell-label">总量</span>
            </div>
            <div class="cell-numbers">
              <span class="number">1,286.42</span>
              <span class="cell-unit">亿元</span>
            </div>
          </div>
          <div class="sub-cell">
            <div class="cell-head">
              <span class="cell-dot"></span>
              <span class="cell-label">同比</span>
            </div>
            <div class="cell-numbers">
              <span class="number">8.6</span>
              <span class="cell-unit">%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="box-item card-right">
        <div class="right-col">
          <div class="col-title">
            <span>基金归集总额（亿元）</span>
          </div>
          <div class="col-numbers">
            <span v-for="(d, i) in totalStr" :key="i"  class="digit digit-blue">{{ d }}</span>
          </div>
        </div>
        <div class="right-col">
          <div class="col-title">
            <span>资金异常预警数（条）</span>
          </div>
          <div class="col-numbers">
            <span v-for="(d, i) in ratioStr" :key="i"  class="digit digit-red">{{ d }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="map-legend">
      <div class="legend-inner">
        <span class="legend-diamond">◆</span>
        <span class="legend-text">社保资金总量区域分布</span>
        <span class="legend-diamond">◆</span>
      </div>
    </div>
    <div class="vit-logo"></div>
    <div class="sb-fund-map-wrapper"><cityMap /></div>
  </div>
</template>

<script setup>
import cityMap from '@/components/esMap/city-map'
import { ref } from 'vue'
const number1 = 1286.42
const number2 = 8.6
const totalStr = String(number1).split('')
const ratioStr = String(number2).split('')
 
</script>

<style scoped lang="scss">
.sb-fund-center-wrapper {
  width: 100%;
  height: 100%;
  padding: 0 22px;
  box-sizing: border-box;
  position: relative;

  .map-legend {
    margin-top: 6px;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 5;

    .legend-inner {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 48px;
      position: relative;
      background: linear-gradient(90deg, rgba(0, 80, 160, 0) 0%, rgba(0, 140, 220, 0.25) 20%, rgba(0, 140, 220, 0.3) 50%, rgba(0, 140, 220, 0.25) 80%, rgba(0, 80, 160, 0) 100%);

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-top: 1px solid rgba(105, 201, 240, 0.5);
        border-bottom: 1px solid rgba(105, 201, 240, 0.5);
        pointer-events: none;
      }

      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        transform: translateY(-50%);
        background: linear-gradient(90deg, transparent, rgba(60, 200, 255, 0.15) 20%, rgba(60, 200, 255, 0.15) 80%, transparent);
        pointer-events: none;
      }

      .legend-diamond {
        font-size: 12px;
        color: #3ce3ff;
        text-shadow: 0 0 6px rgba(60, 227, 255, 0.8);
        animation: diamondPulse 2s ease-in-out infinite;

        &:first-child {
          transform: translateX(-30px);
        }
        &:last-child {
          transform: translateX(30px);
        }
      }

      .legend-text {
        font-size: 16px;
        letter-spacing: 4px;
        color: #cdeaff;
        font-family: Alibaba-PuHuiTi-Medium;
        text-shadow: 0 0 10px rgba(60, 200, 255, 0.5);
      }
    }
  }

  .sb-fund-map-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 5%;
  }

  .vit-logo {
    width: 549px;
    height: 171px;
    background: url('@/assets/images/home/image383.png');
    background-size: 100% 100%;
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
  }

  .data-box {
    display: flex;
    gap: 14px;
    position: relative;
    z-index: 5;

    .box-item {
      height: 87px;
      box-sizing: border-box;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 100% 100%;
    }

    .card-left {
      width: 308px;
      height: 87px;
      padding: 8px 18px 10px 18px;
      background-image: url('@/assets/images/Frame 42731903469.png');
      display: flex;
      flex-direction: column;

      .card-title {
        font-size: 16px;
        font-family: Alibaba-PuHuiTi-Medium;
        letter-spacing: 2px;
        color: #fff;
      }

      .card-body {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 42px;

        .sub-cell {
          display: flex;
          flex-direction: column;

          .cell-head {
            display: flex;
            align-items: center;

            .cell-dot {
              width: 6px;
              height: 6px;
              background: #40c8ff;
              box-shadow: 0 0 6px rgba(64, 200, 255, 0.8);
              margin-right: 6px;
            }

            .cell-label {
              font-size: 14px;
              color: rgba(255, 255, 255, 0.75);
              margin-top: 10px;

            }
          }

          .cell-numbers {
            display: flex;
            align-items: flex-end;

            .number {
              font-size: 18px;
              color: #fff;
              font-family: Alibaba-PuHuiTi-Medium;
              padding-left: 12px;
            }
            .cell-unit {
              font-size: 12px;
              color: rgba(255, 255, 255, 0.6);
              font-family: Alibaba-PuHuiTi-Regular;
              margin-left: 4px;
              padding-bottom: 3px;
            }
          }
        }
        .sub-cell:nth-child(2) {
          .cell-head {
            .cell-dot {
              background: #00ECB3;
              box-shadow: 0 0 6px #00ECB3;
            }
          }
        }
      }
    }

    .card-right {
      width: 571px;
      height: 87px;
      padding: 8px 38px 10px 42px;
      background-image: url('@/assets/images/Frame 4273190341169.png');
      display: flex;
      justify-content: space-between;

      .right-col {
        .col-title {
          display: flex;
          align-items: center;
          font-size: 16px;
          color: #fff;
          font-family: Alibaba-PuHuiTi-Medium;
          letter-spacing: 1px;

          .col-icon {
            width: 18px;
            height: 18px;
            margin-right: 8px;
            flex-shrink: 0;
            border-radius: 50%;

            &.blue-icon {
              background: radial-gradient(circle, #40c8ff 0%, #1e72e6 100%);
            }

            &.red-icon {
              background: radial-gradient(circle, #ff8a8a 0%, #d63031 100%);
            }
          }
        }

        .col-numbers {
          width: 21px;
          height: 29px;
          font-size: 20px;
          font-family: Alibaba-PuHuiTi-num;
          margin-top: 12px;
          color: #fff;
          display: flex;
          text-align: center;
          .digit {
            width: 100%;
            height: 100%;
            display: inline-block;
            background-repeat: no-repeat;
            background-size: auto 100%;
            flex-shrink: 0;
            margin-right: 4px;

          }

          .digit-blue {
            background-image: url('@/assets/images/Group 132131651198.png');
          }

          .digit-red {
            background-image: url('@/assets/images/Group 132131651198 (1).png');
          }
        }
      }
    }
  }
}


</style>