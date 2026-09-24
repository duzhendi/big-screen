<template>
  <div class="node-icon" :style="{ backgroundImage: `url(${vm.nodeIcon})` }" :class="{ 'is-active': vm.isCurrent }">
    <div
      v-if="vm.item.status !== 2"
      class="node-icon-children"
      :style="{ backgroundImage: `url(${vm.bizIcon})` }"
    ></div>
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
.node-icon {
  width: 16px;
  height: 18px;
  background-repeat: no-repeat;
  background-position: center center;
  position: absolute;
  left: -8px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  &.is-active {
    filter: drop-shadow(0 0 8px rgba(60, 227, 255, 0.4)) brightness(1.2);
    transform: scale(1.1);
  }
  .node-icon-children {
    width: 7px;
    height: 6px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
}
</style>
