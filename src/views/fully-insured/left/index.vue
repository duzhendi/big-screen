<template>
  <div class="fully-insured-left-wrapper">
    <common-box title="各参保险种人数分布" height="294px">
      <div class="content-screen qmcbfb">
          <commonChart :option="GCBXZRLFB_OPTION()" />
      </div>
    </common-box>
    <common-box title="新增参保趋势" height="266px" style="margin-top: 13px">
      <div class="content-screen xzcbqs">
        <commonChart :option="XZCBQS_OPTION()" />
      </div>
    </common-box>
    <common-box title="异地就医情况" height="304px" style="margin-top: 14px">
      <div class="content-screen ydjyqk">
        <ydjyCard />
      </div>
    </common-box>
  </div>
</template>

<script setup>
import commonBox from '@/components/common-box.vue'
import commonChart from '@/components/common-chart.vue'
import { GCBXZRLFB_OPTION, XZCBQS_OPTION } from '@/views/fully-insured/options.js'
import ydjyCard from './components/ydjy-card.vue'
</script>

<style scoped lang="scss">
.fully-insured-left-wrapper {
  width: 100%;
  height: 100%;
  .content-screen {
    width: 100%;
    height: 100%;
  }
  .qmcbfb {
    border: none;
    border-bottom: 1px solid rgba(15, 88, 166, 1);
    position: relative;
    width: 100%;
    height: 254px;

    // 左侧渐变竖线（下暗→上亮）
    &::before,
    // 右侧渐变竖线（下暗→上亮）
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      width: 1px;
      background: linear-gradient(180deg, rgba(15, 88, 166, 0.2) 30%, rgba(39, 111, 231, 0.7) 100%);
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
  }
  .xzcbqs {
    width: 100%;
    height: 266px;
  }
  .ydjyqk {
    width: 100%;
    height: 304px;
  }
}
</style>
