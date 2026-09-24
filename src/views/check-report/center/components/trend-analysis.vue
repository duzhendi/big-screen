<template>
  <div class="trend-box">
    <div class="trend-title">
      <div class="title-text">
        <img class="title-icon" src="@/assets/images/标题背景123.png" alt="" />
        全省缴费人数平均数趋势分析
      </div>
      <div class="download-btn" @click="handleDownload">下载趋势图</div>
    </div>
    <div class="trend-filter">
      <div class="filter-group">
        <!-- 分析维度 -->
        <div class="mode-group">
          <CommonButton
            v-for="item in modeList"
            :key="item.key"
            :label="item.label"
            :active="activeMode === item.key"
            height="26px"
            @click="handleModeChange(item.key)"
          />
        </div>
        <!-- 时间区间 -->
        <div class="range-group">
          <CommonButton
            label="近5年"
            :active="activeRange === '近5年'"
            height="26px"
            style="width: 80px"
            @click="handleSearch('近5年')"
          />
          <CommonButton
            label="近10年"
            :active="activeRange === '近10年'"
            height="26px"
            style="width: 80px"
            @click="handleSearch('近10年')"
          />
          <CustomYearRange
            v-model="customRange"
            :active="activeRange === '自定义'"
            height="26px"
            @select="handleSearch('自定义')"
            @change="handleRangeChange"
          />
        </div>
      </div>
      <div class="trend-legend">
        <div
          v-for="item in legendItems"
          :key="item.key"
          class="legend-item"
          :class="{ active: activeLegend === item.key }"
          @click="handleLegendChange(item.key)"
        >
          <span class="checkbox"></span>
          {{ item.label }}
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

// 分析维度：按时间 / 按区域
const modeList = [
  { key: 'time', label: '按时间分析' },
  { key: 'area', label: '按区域分析' }
]
const activeMode = ref('time')

// 当前筛选方式：近5年 / 近10年 / 自定义
const activeRange = ref('近5年')
// 自定义年份区间，格式：'2016-2026'
const customRange = ref('')

// 右侧图例（单选）
const legendItems = [
  { key: 'indicator', label: '指标值' },
  { key: 'yoy', label: '同比' },
  { key: 'mom', label: '环比' }
]
const activeLegend = ref('indicator')

// 切换分析维度
const handleModeChange = (key) => {
  activeMode.value = key
  console.log(key, '//////分析维度')
}

// 切换筛选方式
const handleSearch = (value) => {
  activeRange.value = value
  console.log(value, '//////sss')
}

// 自定义年份区间变化
const handleRangeChange = (value) => {
  console.log(value, '//////自定义区间')
}

// 图例单选切换
const handleLegendChange = (key) => {
  activeLegend.value = key
  console.log(key, '//////图例')
}

// 下载趋势图
const handleDownload = () => {
  console.log('//////下载趋势图')
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
      background: linear-gradient(to left, rgba(2,16,40,0.6) 0%, rgba(13, 96, 179, 0.7) 100%);

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
        width: 76px;
        height: 28px;
        font-size: 12px;
        color: rgba(255,255,255,0.9);
        background: rgba(0,145,255,0.2);
        border-radius: 3px 3px 3px 3px;
        border: 1px solid #0071BC;
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
        display: flex;
        align-items: center;
        gap: 6px;
      }
      // 分析维度与时间区间之间留出设计稿的间距
      .mode-group {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-right: 24px;
      }
      .range-group {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .trend-legend {
        display: flex;
        align-items: center;
        gap: 16px;
        .legend-item {
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: Alibaba-PuHuiTi-Regular;
          color: #cdeaff; // 默认文字颜色
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.2s;
          user-select: none;

          .checkbox {
            width: 14px;
            height: 14px;
            border: 1px solid rgba(0,145,255,0.5);
            display: inline-block;
            box-sizing: border-box;
            line-height: 10px;
            text-align: center;
            font-size: 10px;
            color: #ffffff;
            transition: all 0.2s;
          }

          // 选中态：对号 + 高亮
          &.active {
            color: #3ce3ff;
            text-shadow: 0 0 8px rgba(60, 227, 255, 0.5);

            .checkbox {
              background: rgba(0, 211, 246, 0.35);
              border-color: #3ce3ff;
              box-shadow: 0 0 6px rgba(60, 227, 255, 0.5);

              &::after {
                content: '✓';
              }
            }
          }
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
