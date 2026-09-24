<template>
  <div
    v-if="vm.curveClass"
    :class="['curve-connector', vm.curveClass, { 'is-reverse': vm.reverse }]"
    :style="{ borderColor: vm.curveColor }"
  >
    <template v-if="vm.showCurveArrows">
      <div class="arrow-right"></div>
      <div class="arrow-down"></div>
      <div class="arrow-left"></div>
    </template>
  </div>
</template>

<script setup>
defineProps({
  vm: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.curve-connector {
  position: absolute;
  width: var(--curve-w);
  height: var(--curve-h);
  border: var(--line-w) solid;
  border-left: none;
  border-radius: 0 var(--curve-r) var(--curve-r) 0;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .arrow-right,
  .arrow-down,
  .arrow-left {
    position: absolute;
    z-index: 4;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0;
  }
  .arrow-right {
    background-image: url('@/assets/images/left-bottom/icon_流动箭头_向右.png');
    width: 19px;
    height: 8px;
    top: -15px;
    animation: flowRight 1.5s infinite;
  }
  .arrow-down {
    background-image: url('@/assets/images/left-bottom/icon_流动箭头_向下.png');
    width: 8px;
    height: 19px;
    right: -11px;
    animation: flowDown 1.5s infinite;
  }
  .arrow-left {
    background-image: url('@/assets/images/left-bottom/icon_流动箭头_向左.png');
    width: 19px;
    height: 8px;
    bottom: -13px;
    right: -5px;
    animation: flowLeft 1.5s infinite;
  }

  &.line-end {
    top: 0;
    right: var(--curve-end-right);

    &.is-reverse {
      right: auto;
      left: var(--curve-end-left-reverse);
      border-left: var(--line-w) solid;
      border-right: none;
      border-radius: var(--curve-r) 0 0 var(--curve-r);
      transform: none;
    }
  }

  &.line-start {
    top: var(--curve-top-up);
    left: var(--curve-start-left);
    transform: rotate(180deg);

    .arrow-left {
      top: -15px;
      bottom: auto;
      animation: flowLeft 1.5s infinite;
    }
    .arrow-right {
      top: auto;
      bottom: -15px;
      animation: flowRight 1.5s infinite;
    }
    .arrow-down {
      transform: rotate(180deg);
      animation: flowUp 1.5s infinite;
    }
  }
}
</style>
