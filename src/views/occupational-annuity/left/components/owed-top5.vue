<template>
  <div class="owed-top5">
    <div class="row-header">
      <div class="col-rank">排名</div>
      <div class="col-name">单位名称</div>
      <div class="col-value">金额</div>
    </div>
    <div v-for="(cel, idx) in chartData" :key="cel.name" class="chart-cell">
      <div class="info-cull">
        <div class="sort">
          <div class="icon" :style="top5StyleList[idx]">{{ idx + 1 }}</div>
          <div class="label">{{ cel.name }}</div>
        </div>
        <span class="value">{{ cel.value }}<span class="unit">万元</span></span>
      </div>
    </div>
  </div>
</template>

<script setup>
const chartData = [
  { name: '海南海控置业有限公司', value: 860 },
  { name: '三亚湾旅游发展集团', value: 720 },
  { name: '儋州港务投资有限公司', value: 640 },
  { name: '琼海博鳌会展服务有限公司', value: 520 },
  { name: '文昌航天配套服务有限公司', value: 480 }
]

const top5StyleList = [
  'background: rgba(213,39,42,0.6);border: 1px solid;border-image: linear-gradient(90deg, rgba(213, 39, 42, 1), rgba(213, 39, 42, 0.4), rgba(213, 39, 42, 0.4), rgba(213, 39, 42, 1)) 1 1;',
  'background: rgba(250,214,95,0.6);border: 1px solid;border-image: linear-gradient(90deg, rgba(250, 214, 95, 1), rgba(250, 214, 95, 0.4), rgba(250, 214, 95, 0.4), rgba(250, 214, 95, 1)) 1 1;',
  'background: rgba(0,145,255,0.5);border: 1px solid;border-image: linear-gradient(90deg, rgba(0, 145, 255, 1), rgba(0, 145, 255, 0.4), rgba(0, 145, 255, 0.4), rgba(0, 145, 255, 1)) 1 1;',
  'background: rgba(140,173,201,0.5);border: 1px solid;border-image: linear-gradient(90deg, rgba(140, 173, 201, 1), rgba(140, 173, 201, 0.4), rgba(140, 173, 201, 0.4), rgba(140, 173, 201, 1)) 1 1;',
  'background: rgba(140,173,201,0.5);border: 1px solid;border-image: linear-gradient(90deg, rgba(140, 173, 201, 1), rgba(140, 173, 201, 0.4), rgba(140, 173, 201, 0.4), rgba(140, 173, 201, 1)) 1 1;'
]
</script>

<style scoped lang="scss">
.owed-top5 {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 18px;
  display: flex;
  flex-direction: column;

  .row-header {
    display: flex;
    padding: 0px 54px 6px 14px;
    font-size: 16px;
    color: #E3F4FF;
    font-family: Alibaba-PuHuiTi-2;

    .col-rank { width: 54px; }
    .col-name { flex: 1; }
    .col-value { width: 80px; text-align: right; }
  }

  .chart-cell {

    .info-cull {
      height: 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .sort {
        display: flex;
        align-items: center;
        flex: 1;
        margin-left: 14px;

        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20px;
          height: 20px;
          font-size: 16px;
          color: #ffffff;
          letter-spacing: 1px;
          border-radius: 1px;
        }
        .label {
          margin-left: 30px;
          font-size: 15px;
          color: #ffffff;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

        }
      }
      .value {
        font-size: 16px;
        color: #00C4FF;
        letter-spacing: 1px;
        font-family: Alibaba-PuHuiTi-2;
        margin-right: 30px;

        .unit {
          font-size: 14px;
          color: #39a8c9;
          font-family: Alibaba-PuHuiTi-2;
        }
      }
    }
  }

  .chart-cell:nth-child(even) .info-cull {
    background: url('@/assets/images/home/data.png');
    background-size: 100% 100%;
  }
}
</style>