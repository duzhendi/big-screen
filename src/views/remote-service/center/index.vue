<template>
  <div class="remote-service-center-wrapper">
    <div class="data-box">
      <div v-for="cel in moduleData" :key="cel.label" class="box-item">
        <div class="card-title">{{ cel.label }}</div>
        <div class="card-body">
          <div v-for="sub in cel.items" :key="sub.label" class="item-cell">
            <span class="dot"></span>
            <div class="cell-info">
              <span class="cell-label">{{ sub.label }}</span>
              <span class="cell-value">{{ sub.value.toLocaleString() }}<span class="cell-unit">件</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="vit-logo"></div>
    <div class="remote-service-map-wrapper"><cityMap /></div>
  </div>
</template>

<script setup>
import cityMap from '@/components/esMap/city-map'

// 顶部三张远程服务业务卡：引导办 / 智能办 / 视频办
const moduleData = ref([
  {
    label: '引导办',
    items: [
      { label: '办件数', value: 36210 },
      { label: '办结数', value: 32950 }
    ]
  },
  {
    label: '智能办',
    items: [
      { label: '申请数', value: 28640 },
      { label: '办结数', value: 24920 }
    ]
  },
  {
    label: '视频办',
    items: [
      { label: '办件数', value: 21670 },
      { label: '办结数', value: 18460 }
    ]
  }
])
</script>

<style scoped lang="scss">
.remote-service-center-wrapper {
  width: 100%;
  height: 100%;
  padding: 0 22px;
  box-sizing: border-box;
  position: relative;
  .remote-service-map-wrapper {
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
    justify-content: space-between;
    gap: 14px;
    position: relative;
    z-index: 5;

    .box-item {
      flex: 1;
      min-width: 0;
      height: 87px;
      padding: 6px 16px 10px;
      box-sizing: border-box;
      background: url('@/assets/images/Frame 427319069.png') no-repeat center / 100% 100%;

      .card-title {
        font-size: 16px;
        font-family: Alibaba-PuHuiTi-Medium;
        letter-spacing: 2px;
        color: #eaf7ff;
      }

      .card-body {
        margin-top: 8px;
        display: flex;
        justify-content: space-between;

        .item-cell {
          display: flex;
          align-items: center;
          flex: 1;

          .dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #64dcff;
            box-shadow: 0 0 6px rgba(100, 220, 255, 0.8);
            margin-right: 6px;
            flex-shrink: 0;
          }

          .cell-info {
            display: flex;
            flex-direction: column;
            min-width: 0;

            .cell-label {
              font-size: 14px;
              color: #fff;
              font-family: Alibaba-PuHuiTi-Regular;
            }

            .cell-value {
              margin-top: 2px;
              font-size: 20px;
              font-family: Alibaba-PuHuiTi-Medium;
              font-weight: bold;
              background: linear-gradient(180deg, #ffffff 30%, #78d6ff 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              text-fill-color: transparent;

              .cell-unit {
                font-size: 13px;
                font-weight: normal;
                font-family: Alibaba-PuHuiTi-Regular;
                color: rgba(255, 255, 255, 0.75);
                -webkit-text-fill-color: rgba(255, 255, 255, 0.75);
                text-fill-color: rgba(255, 255, 255, 0.75);
                margin-left: 2px;
                background: none;
              }
            }
          }
        }
        .item-cell:nth-child(2) {
          margin-left: 38px;
        }
      }
    }
  }
}
</style>
