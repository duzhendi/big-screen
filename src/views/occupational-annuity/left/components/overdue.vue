<template>
  <div class="oa-overdue">
    <div class="rating-header">
      <div class="col-name">单位名称</div>
      <div class="col-bar"></div>
      <div class="col-num">逾期天数</div>
    </div>
    <div v-for="(item, i) in ratingList" :key="i" class="rating-row">
      <div class="col-name">{{ item.name }}</div>
      <div class="col-bar">
        <div class="bar-bg"></div>
        <div class="bar-fill" :style="{ width: item.percent + '%', background: item.barColor }"></div>
      </div>
      <div class="col-num">{{ item.value }}<span class="unit">天</span></div>
    </div>
  </div>
</template>

<script setup>
const ratingList = [
  { name: '海南椰海建设投资有限公司', value: 96 },
  { name: '海口云港物流有限公司', value: 82 },
  { name: '三亚蓝湾文旅发展有限公司', value: 76 },
  { name: '儋州海盛矿业有限公司', value: 68 },
  { name: '琼海嘉积商业运营有限公司', value: 55 }
]

const maxVal = Math.max(...ratingList.map(r => r.value))
const colorList = [
  'linear-gradient(90deg, #963f21 0%, #e57d08 100%)',
  'linear-gradient(90deg, #956c32 0%, #e5e609 100%)',
  'linear-gradient(90deg, #0a66af 0%, #03cde9 100%)',
  'linear-gradient(90deg, #0a6bb0 0%, #0355ea 100%)',
  'linear-gradient(90deg, #0a6bb0 0%, #0355ea 100%)'
]
ratingList.forEach((r, i) => {
  r.percent = Math.round((r.value / maxVal) * 100)
  r.barColor = colorList[i % colorList.length]
})
</script>

<style scoped lang="scss">
.oa-overdue {
  width: 100%;
  height: 100%;
  padding: 10px 14px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .rating-header {
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    padding: 0 6px;
    gap: 8px;
    background: rgba(0,157,255,0.05);
    border-radius: 2px 2px 2px 2px;
    border: 1px solid #083C5C;

    .col-name {
      width: 160px;
      font-size: 16px;
      color: #E3F4FF;
      font-family: Alibaba-PuHuiTi-2;
    }
    .col-bar {
      flex: 1;
    }
    .col-num {
      width: 70px;
      font-size: 16px;
      color: #E3F4FF;
      font-family: Alibaba-PuHuiTi-2;
      text-align: right;
    }
  }

  .rating-row {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 38px;
    border-bottom: 1px solid rgba(0, 145, 255, 0.2);

    &:last-child {
      border-bottom: none;
    }

    .col-name {
      width: 160px;
      font-size: 16px;
      color: #CCEBFF;
      font-family: Alibaba-PuHuiTi-2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-left: 6px;
    }

    .col-bar {
      flex: 1;
      height: 8px;
      position: relative;
      display: flex;
      align-items: center;

      .bar-bg {
        position: absolute;
        inset: 0;
        background: rgba(0, 145, 255, 0.17);
      }
      .bar-fill {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
      } 
    }

    .col-num {
      width: 70px;
      font-size: 16px;
      font-family: Alibaba-PuHuiTi-2;
      color: #fff;
      text-align: right;
      padding-right: 30px;

      .unit {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.6);
        font-family: Alibaba-PuHuiTi-Regular;
        margin-left: 2px;
      }
    }
  }
}
</style>