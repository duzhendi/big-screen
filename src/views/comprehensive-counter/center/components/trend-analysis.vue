<template>
  <div class="trend-box">
    <div class="trend-title">
      <div class="title-text">
        <img class="title-icon" src="@/assets/images/标题背景123.png" alt="" />
        全省职工停保总办件数趋势分析
      </div>
      <div class="download-btn">下载趋势图</div>
    </div>
    <div class="trend-filter">
      <div class="filter-group">
        <div class="filter-item">
          <!-- 分析维度 -->
          <CommonButton
            label="按时间分析"
            :active="activeDim === '按时间分析'"
            height="26px"
            @click="handleDimChange('按时间分析')"
          />
          <CommonButton
            label="按区域分析"
            :active="activeDim === '按区域分析'"
            height="26px" 
            @click="handleDimChange('按区域分析')"
          />
        </div>
        <div class="filter-item">
          <!-- 时间范围 -->
          <CommonButton
            label="近5年"
            :active="activeRange === '近5年'"
            height="26px" 
            @click="handleRangeChange('近5年')"
          />
          <CommonButton
            label="近10年"
            :active="activeRange === '近10年'"
            height="26px"
            style="margin-left: -18px"
            @click="handleRangeChange('近10年')"
          />
          <CustomYearRange
            v-model="customRange"
            :active="activeRange === '自定义'"
            height="26px"
            @select="handleRangeChange('自定义')"
            @change="handleCustomRangeChange"
          />
        </div>
      </div>
    </div>
    <div class="trend-chart">
      <commonChart :option="TREND_OPTION()" />
    </div>
  </div>
</template>

<script setup>
import commonChart from '@/components/common-chart.vue'
import { TREND_OPTION } from '../../options'
import CommonButton from '@/components/common-button.vue'
import CustomYearRange from '@/components/custom-year-range.vue'

// 分析维度：按时间分析 / 按区域分析
const activeDim = ref('按时间分析')
// 时间范围：近5年 / 近10年 / 自定义
const activeRange = ref('近5年')
// 自定义年份区间，格式：'2016-2026'
const customRange = ref('')

const activeLegend = ref('indicator')

// 切换分析维度
const handleDimChange = (value) => {
  activeDim.value = value
}

// 切换时间范围
const handleRangeChange = (value) => {
  activeRange.value = value
}

// 自定义年份区间变化
const handleCustomRangeChange = (value) => {
  console.log(value, '//////自定义区间')
}

// 图例单选切换
const handleLegendChange = (key) => {
  activeLegend.value = key
}
</script>

<style scoped lang="scss">
.trend-box {
  height: 272px;
  position: absolute;
  bottom: 0;
  left: 1%;
  right: 1%;
  z-index: 5;
  box-sizing: border-box;
  background: url('@/assets/images/Rectangle 346241981.png') no-repeat;
  background-size: 100% 100%;

  .trend-title {
    height: 28px;
    line-height: 28px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    background: url('@/assets/images/标题背景12345.png') no-repeat center center;
    background-size: 100% 100%;

    .title-icon {
      width: 16px;
      height: 16px;
    }

    .title-text {
      font-size: 14px;
      color: #fff;
      font-family: Alibaba-PuHuiTi-Medium;
      letter-spacing: 1px;
    }

    .download-btn {
      width: 88px;
      height: 28px;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.9);
      background: rgba(0, 145, 255, 0.2);
      border-radius: 3px;
      border: 1px solid #0071bc;
      cursor: pointer;
      text-align: center;
      line-height: 28px;
    }
  }

  .trend-filter {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin-top: 12px;
    margin-left: 10px;
    margin-right: 10px;

    .filter-group {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .filter-item {
        display: flex;
        align-items: center;
        gap: 16px;
      }
    }
 
  }

  .trend-chart {
    width: 100%;
    height: 190px;
    margin-top: 16px;
  }
}
</style>
