<template>
  <div class="rank-toggle">
    <CommonButton
      v-for="opt in options"
      :key="opt.value"
      :label="opt.label"
      :active="modelValue === opt.value"
      height="22px"
      style="width: 50px; font-size: 12px;background: rgba(0,145,255,0.2);border: 1px solid #0071BC;"
      @click="handleClick(opt.value)"
    />
  </div>
</template>

<script setup>
import CommonButton from '@/components/common-button.vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: 'top6'
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const options = [
  { label: '前6', value: 'top6' },
  { label: '后6', value: 'last6' }
]

const handleClick = (value) => {
  if (value === props.modelValue) return
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped lang="scss">
.rank-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
