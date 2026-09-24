<template>
  <div
    class="process-row"
    :class="{ 'reverse-row': vm.reverse }"
    :style="{
      flexGrow: vm.index === listLen - 1 ? 1 : 0,
      order: vm.order,
      '--row-mt': `${vm.spacing.mt}px`,
      '--row-mb': `${vm.spacing.mb}px`
    }"
  >
    <ProcessText :vm="vm" />
    <ProcessLine :vm="vm" :startSegmentColor="startSegmentColor" :shouldFlowStartArrows="shouldFlowStartArrows">
      <ProcessNode :vm="vm" />
    </ProcessLine>
    <ProcessCurve :vm="vm" />
  </div>
</template>

<script setup>
import ProcessText from './ProcessText.vue'
import ProcessNode from './ProcessNode.vue'
import ProcessLine from './ProcessLine.vue'
import ProcessCurve from './ProcessCurve.vue'

defineProps({
  vm: {
    type: Object,
    required: true
  },
  listLen: {
    type: Number,
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
.process-row {
  width: 33.33%;
  display: flex;
  align-items: center;
  height: var(--row-h);
  margin-bottom: var(--row-mb);
  margin-top: var(--row-mt);
  position: relative;

  /* --- CSS 变量定义：修改此处即可自动调整弯道 --- */
  --row-h: 14px; /* 行内容高度 */
  --row-mb: 10px; /* margin-bottom */
  --row-mt: 15px; /* margin-top */
  --line-w: 14px; /* 线条粗细 */
  --start-seg-w: 70px; /* start 段长度 */

  /* 左右弯道：right/left 偏移 与 弯道宽度(长度) */
  --curve-w: 70px; /* 弯道水平宽度 */
  --curve-end-right: -70px; /* 正向行：line-end 的 right */
  --curve-start-left: -70px; /* 正向行：line-start 的 left */
  --curve-end-left-reverse: -20px; /* reverse-row：line-end 的 left */

  --curve-h: calc(var(--row-h) + var(--row-mb) + var(--row-mt) + var(--line-w));
  --curve-r: calc(var(--curve-h) / 2); /* 半径 */
  /* 向上弯道的 top 偏移量 = -(间距 + 行高) */
  --curve-top-up: calc(0px - var(--row-mb) - var(--row-mt) - var(--row-h));

  &.reverse-row {
    flex-direction: row-reverse;
    justify-content: flex-end;
  }
}
</style>
