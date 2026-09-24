<template>
  <div class="text-content">
    <div class="date">{{ vm.item.date }}</div>
    <div class="text" :style="{ color: vm.textColor }">{{ vm.item.title }}</div>
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
.text-content {
  position: absolute;
  top: -32px;
  left: -8px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  .date {
    font-family: Alibaba-PuHuiTi-2;
    font-weight: normal;
    font-size: 10px;
    line-height: 10px;
    color: #c9e9f8;
  }
  .text {
    font-family: Alibaba-PuHuiTi-2;
    font-weight: normal;
    font-size: 13px;
    line-height: 13px;
    color: #309eff;
  }
}
</style>
