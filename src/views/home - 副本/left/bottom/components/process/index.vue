<template>
  <div class="process-container">
    <ProcessItem
      v-for="vm in vmList"
      :key="vm.key"
      :vm="vm"
      :listLen="listLen"
      :startSegmentColor="startSegmentColor"
      :shouldFlowStartArrows="shouldFlowStartArrows"
    />
  </div>
</template>

<script setup>
import { useProcess } from './useProcess'
import ProcessItem from './ProcessItem.vue'

const props = defineProps({
  list: {
    type: Array,
    default: () => [
      { title: '发布通知', date: '06-15', status: 2 },
      { title: '申报信息填写', date: '07-19', status: 2 },
      { title: '区县审核', date: '08-11', status: 2 },
      { title: '区县公示', date: '', status: 2 },
      { title: '市级备案', date: '', status: 1 },
      { title: '市级公示', date: '', status: 3 },
      { title: '电子证书授权', date: '', status: 3 }
    ]
  },
  list1: {
    type: Array,
    default: () => [
      { title: '发布通知', date: '', status: 1 },
      { title: '申报信息填写', date: '', status: 3 },
      { title: '区县审核', date: '', status: 3 },
      { title: '区县公示', date: '', status: 3 },
      { title: '市级备案', date: '', status: 3 },
      { title: '市级公示', date: '', status: 3 },
      { title: '电子证书授权', date: '', status: 3 }
    ]
  }
})

const { vmList, listLen, startSegmentColor, shouldFlowStartArrows } = useProcess(props)
</script>

<style lang="scss" scoped>
.process-container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 8px 80px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  position: relative;
}
</style>

<style lang="scss">
@keyframes flowRight {
  0% {
    opacity: 0;
    transform: translateX(-5px);
  }
  30% {
    opacity: 1;
    transform: translateX(0);
  }
  60% {
    opacity: 0;
    transform: translateX(5px);
  }
  100% {
    opacity: 0;
  }
}

@keyframes flowLeft {
  0% {
    opacity: 0;
    transform: translateX(5px);
  }
  30% {
    opacity: 1;
    transform: translateX(0);
  }
  60% {
    opacity: 0;
    transform: translateX(-5px);
  }
  100% {
    opacity: 0;
  }
}

@keyframes flowDown {
  0% {
    opacity: 0;
    transform: translateY(-5px);
  }
  30% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes flowUp {
  0% {
    opacity: 0;
    transform: translateY(5px) rotate(180deg);
  }
  30% {
    opacity: 1;
    transform: translateY(0) rotate(180deg);
  }
  60% {
    opacity: 0;
    transform: translateY(-5px) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: translateY(-5px) rotate(180deg);
  }
}
</style>
