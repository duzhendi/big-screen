<template>
  <div class="public-service-left-wrapper">
    <!-- 报表类型：与「校验报表」左侧保持一致 -->
    <div class="left-filter">
      <commonSelect
        v-model="reportType"
        :options="reportOptions"
        width="100%"
        @change="handleReportChange"
      />
    </div>
    <div class="content-screen">
      <div class="left-scroll">

        <!-- 申请情况 -->
        <div class="section">
          <div class="section-title">
            <img class="title-arrow" :src="titleBg" alt="" />
            <span class="title-text">申请情况</span>
          </div>
          <div class="apply-card">
            <img class="apply-bg" :src="applyBg" alt="" />
            <div class="apply-content">
              <div class="apply-icon">
                <img :src="applyIcon" alt="" />
              </div>
              <div class="apply-label">申请总量</div>
              <div class="apply-value">
                <span class="num" v-for="(n, i) in applyAuthTotal.toString().split('')" :key="i" >{{ n }}</span>
                <span class="unit">笔</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 已下载情况 -->
        <div class="section">
          <div class="section-title">
            <img class="title-arrow" :src="titleBg" alt="" />
            <span class="title-text">已下载情况</span>
          </div>
          <div class="dl-col">
            <div class="dl-cell">
              <div class="dl-label">已下载</div>
              <div class="dl-num">16309<span class="unit">笔</span></div>
            </div>
            <div class="dl-cell">
              <div class="dl-label">下载率</div>
              <div class="dl-track">
                <div class="dl-fill" style="width: 100%"></div>
              </div>
              <div class="dl-num">100<span class="unit">%</span></div>
            </div>
          </div>
        </div>

        <!-- 审核情况 -->
        <div class="section">
          <div class="section-title">
            <img class="title-arrow" :src="titleBg" alt="" />
            <span class="title-text">审核情况</span>
          </div>
          <div class="audit-row">
            <div class="audit-cell">
              <div class="audit-head">已审核</div>
              <div class="audit-num">16169<span class="unit">笔</span></div>
            </div>
            <div class="audit-cell">
              <div class="audit-head">审核率</div>
              <div class="audit-num">99.14<span class="unit">%</span>
              </div>
              <div class="audit-bottom">
                <commonChart :option="GROUP_DONUT_OPTION(99.14, '#31abf1')" />
              </div>
            </div>
          </div>
        </div>

        <!-- 超期情况 -->
        <div class="section">
          <div class="section-title">
            <img class="title-arrow" :src="titleBg" alt="" />
            <span class="title-text">超期情况</span>
            <span class="detail-btn">明细 ›</span>
          </div>
          <div class="overdue-card">
            <div class="overdue-cell">
              <div class="overdue-subtitle">超期未审核</div>
            </div>
            <div class="overdue-cell">
              <div class="overdue-subtitle">超期率</div>
              <div class="overdue-num">0.85<span class="unit">%</span></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import commonChart from '@/components/common-chart.vue'
import commonSelect from '@/components/common-select.vue'
import { GROUP_DONUT_OPTION } from '@/views/public-service/options.js'
import titleBg from '@/assets/images/标题背景123.png'
import applyBg from '@/assets/images/Group 2036085903.png'
import applyIcon from '@/assets/images/Group 20360860015.png'

// 报表类型，默认选中原来标题上的那张表
const reportType = ref('employee-pension-transfer')
const reportOptions = [
  { label: '企业职工养老保险关系转移', value: 'employee-pension-transfer' }
]

const applyAuthTotal = 16309

const handleReportChange = (value) => {
  console.log(value, '//////报表类型')
}
</script>

<style scoped lang="scss">
.public-service-left-wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: url('@/assets/images/Rectangle 34624198111.png') no-repeat center center;
  background-size: 100% 100%;

  // 顶部报表下拉，与「校验报表」左侧保持一致
  .left-filter {
    flex-shrink: 0;
    padding: 10px 14px 0;
    box-sizing: border-box;
  }

  .content-screen {
    flex: 1;
    min-height: 0;
    width: 100%;
  }
  .left-scroll {
    width: 100%;
    height: 100%;
    padding: 4px 8px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow-y: auto;
  }
}

.section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: 4px;
  position: relative;
  .title-arrow {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }
  .title-text {
    font-size: 16px;
    font-family: Alibaba-PuHuiTi-Bold;
    letter-spacing: 1px;
    background: linear-gradient(180deg, #ffffff 10%, #0091FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .detail-btn {
    position: absolute;
    right: 4px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    color: #78d6ff;
    cursor: pointer;
    border: 1px solid rgba(120, 214, 255, 0.5);
    padding: 2px 8px;
    border-radius: 2px;
    background: rgba(0, 145, 255, 0.1);
  }
}

/* ===== 申请情况 ===== */
.apply-card {
  position: relative;
  height: 96px;
  border-radius: 2px;
  overflow: hidden;
  background: url('@/assets/images/Group 2036085903.png') no-repeat;
  background-size: 100% 100%;
  .apply-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    pointer-events: none;
  }
  .apply-content {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 18px;
    gap: 16px;
    box-sizing: border-box;
  }
  .apply-icon {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain; }
  }
  .apply-label {
    font-size: 16px;
    color: #e1eff9;
    letter-spacing: 2px;
    font-family: Alibaba-PuHuiTi-Regular;
    flex-shrink: 0;
  }
  .apply-value {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .num {
      display: inline-block;
      width: 26px;
      height: 36px;
      line-height: 36px;
      font-family: Alibaba-PuHuiTi-Medium;
      font-size: 20px;
      margin-right: 5px;
      text-align: center;
      color: #fff;
      background: url('@/assets/images/Rectangle 34624224821.png') no-repeat;
      background-size: 100% 100%;
    }
    .unit {
      display: inline-block;
      width: 26px;
      height: 36px;
      line-height: 36px;
      font-family: Alibaba-PuHuiTi-Regular;
      font-size: 14px;
      color: #fff;
      margin-left: 3px;
      background: url('@/assets/images/Rectangle 34624224821.png') no-repeat;
      background-size: 100% 100%;
      text-align: center;
    }
  }
}

/* ===== 已下载情况 ===== */
.dl-col {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 4px;

  .dl-cell {
    height: 84px;
    background: url('@/assets/images/Frame 1105050.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;

    .dl-label {
      font-size: 16px;
      color: #CCEBFF;
      width: 60px;
      margin-left: 4px;
      margin-top: 18px;
      font-family: Alibaba-PuHuiTi-Regular;
    }
    .dl-track {
      width: 200px;
      height: 6px;
      background: rgba(158, 197, 243, 0.25);
      border-radius: 3px;
      overflow: hidden;
      .dl-fill {
        height: 100%;
        background: linear-gradient(90deg, #00D4FF 0%, #0091FF 100%);
        border-radius: 3px;
      }
    }
    .dl-num {
      font-size: 18px;
      font-family: Alibaba-PuHuiTi-Medium;
      background: linear-gradient(180deg, #ffffff 30%, #64dcff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      flex-shrink: 0;
      min-width: 80px;
      text-align: right;
      .unit {
        font-size: 13px;
        color: rgba(255,255,255,0.7);
        -webkit-text-fill-color: rgba(255,255,255,0.7);
        background: none;
        margin-left: 2px;
      }
    }
  }
  .dl-cell:nth-child(2) {
    background: url('@/assets/images/Frame 1105051.png') no-repeat;
    background-size: 100% 100%;
  }
}

/* ===== 审核情况 ===== */
.audit-row {
  display: flex;
  gap: 8px;

  .audit-cell {
    flex: 1;
    height: 241px;
    background: url('@/assets/images/Frame 42732064511.png') no-repeat;
    background-size: 100% 100%;
    .audit-head {
      text-align: center;
      font-size: 16px;
      color: #fff;
      font-family: Alibaba-PuHuiTi-Regular;
      margin-bottom: 6px;
      margin-top: 16px;
    }
    .audit-num {
      margin-top: 16px;
      text-align: center;
      font-size: 22px;
      font-family: Alibaba-PuHuiTi-Medium;
      background: linear-gradient(180deg, #ffffff 20%, #64dcff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: auto;
      .unit {
        font-size: 14px;
        margin-left: 2px;
      }
    }
    .audit-bottom {
      width: 80%;
      height: 90px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      margin: 0 auto;
    }
  }
  .audit-cell:nth-child(2) {
    background: url('@/assets/images/Frame 42732064611.png') no-repeat;
    background-size: 100% 100%;
  }
}

/* ===== 超期情况 ===== */
.overdue-card {
  height: 183px;
  background: url('@/assets/images/图列-21111145.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  text-align: center;

  .overdue-cell {
    flex: 1;
  }
  .overdue-subtitle {
    font-size: 16px;
    color: #fff;
    font-family: Alibaba-PuHuiTi-Regular;
    margin-top: 12px;
  }
  .overdue-num {
    font-size: 20px;
    font-family: Alibaba-PuHuiTi-Medium;
    background: linear-gradient(180deg, #ffffff 20%, #e78712 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 32px;
    .unit {
      font-size: 13px;
      margin-left: 1px;
      color: rgba(255,255,255,0.7);
    }
  }
}
</style>
