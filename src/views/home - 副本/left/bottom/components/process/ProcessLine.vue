<template>
  <div class="line-container" :class="{ 'is-reverse': vm.reverse }">
    <!-- start 段：跟随第一行起点（长度固定 20px），不会因布局变化而偏移 -->
    <div
      v-if="vm.index === 0"
      class="start-segment"
      :style="{
        '--start-seg-color': startSegmentColor
      }"
    >
      <div v-if="shouldFlowStartArrows" class="start-arrows">
        <div class="start-arrow"></div>
        <div class="start-arrow"></div>
        <!-- <div class="start-arrow"></div> -->
      </div>
    </div>

    <slot></slot>

    <div class="line" :style="vm.lineStyle" :class="vm.lineClass">
      <template v-if="vm.showLineArrows">
        <div class="arrow-item"></div>
        <div class="arrow-item"></div>
        <div class="arrow-item"></div>
      </template>
    </div>
  </div>
</template>

<script setup>
defineProps({
  vm: {
    type: Object,
    required: true
  },
  startSegmentColor: {
    type: String,
    default: ''
  },
  shouldFlowStartArrows: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss" scoped>
.line-container {
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  &.is-reverse {
    flex-direction: row-reverse;
    border-radius: 5px;

    .start-segment {
      left: auto;
      right: calc(0px - var(--start-seg-w));
      background: linear-gradient(to left, transparent, var(--start-seg-color, rgb(13, 53, 90)));

      .start-arrow {
        background-image: url('@/assets/images/left-bottom/icon_流动箭头_向左.png');
        animation: flowLeft 1.5s infinite;
      }
    }
  }

  &:not(.is-reverse) {
    .start-segment .start-arrow {
      background-image: url('@/assets/images/left-bottom/icon_流动箭头_向右.png');
      animation: flowRight 1.5s infinite;
    }
  }

  .start-segment {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: var(--start-seg-w);
    height: 14px;
    border-radius: 10px;
    pointer-events: none;
    z-index: 1;
    left: calc(0px - var(--start-seg-w));
    background: linear-gradient(to right, transparent, var(--start-seg-color, rgb(13, 53, 90)));
    display: flex;
    align-items: center;
    justify-content: center;

    .start-arrows {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }

    .start-arrow {
      width: 19px;
      height: 8px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0;
    }

    .start-arrow:nth-child(1) {
      animation-delay: 0s;
    }
    .start-arrow:nth-child(2) {
      animation-delay: 0.2s;
    }
    .start-arrow:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  .line {
    width: 100%;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    &.flow-right .arrow-item {
      background-image: url('@/assets/images/left-bottom/icon_流动箭头_向右.png');
      animation: flowRight 1.5s infinite;
    }

    &.flow-left .arrow-item {
      background-image: url('@/assets/images/left-bottom/icon_流动箭头_向左.png');
      animation: flowLeft 1.5s infinite;
    }

    .arrow-item {
      width: 19px;
      height: 8px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      opacity: 0;
      position: relative;
      z-index: 4;
    }

    .arrow-item:nth-child(1) {
      animation-delay: 0s;
    }
    .arrow-item:nth-child(2) {
      animation-delay: 0.2s;
    }
    .arrow-item:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}
</style>
