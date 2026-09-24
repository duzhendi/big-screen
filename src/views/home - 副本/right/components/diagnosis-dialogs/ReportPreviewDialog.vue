<template>
  <CommonDialog v-model:visible="dialogVisible" title="报告预览" width="90vw" height="90vh">
    <div class="report-preview-container">
      <iframe v-if="reportUrl" :src="reportUrl" frameborder="0" class="report-iframe"></iframe>
      <el-scrollbar v-else v-loading="loading">
        <pdf-perview ref="pdfRenderRef" />
      </el-scrollbar>
    </div>
  </CommonDialog>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import CommonDialog from '@/components/common-dialog.vue'
import pdfPerview from './pdfPerview.vue'
import axios from 'axios'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '报告预览'
  },
  reportUrl: {
    type: String,
    default: ''
  },
  fileName: {
    type: String,
    default: ''
  },
  bucketName: {
    type: String,
    default: 'tidu'
  }
})

const loading = ref(false)
const pdfRenderRef = ref(null)

const emit = defineEmits(['update:visible'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const getFileBlob = async () => {
  loading.value = true
  const response = await axios.get('/api/business/enterprise/getFilevVew', {
    responseType: 'blob', // 必须设置这个
    headers: {
      Accept: 'application/pdf'
    },
    params: { bucketName: props.bucketName, objectName: props.fileName },
    timeout: 60000 // 60秒超时
  })
  loading.value = false
  pdfRenderRef.value?.handleFileBlob(response?.data ?? '')
}

onMounted(() => {
  if (!props.reportUrl && props.fileName) getFileBlob()
})
</script>

<style lang="scss" scoped>
.report-preview-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0);
  border-radius: 4px;

  .report-iframe {
    width: 100%;
    height: 100%;
  }

  :deep(.el-loading-mask) {
    background: none !important;
  }
}
</style>
