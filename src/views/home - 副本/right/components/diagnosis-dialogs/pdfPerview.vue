
<template>
  <div class="layout-pdf-view">
    <VuePdfEmbed 
      :source="pdfSource"
      @password-requested="handlePasswordRequest"
      @rendered="handlePdfRendered"
      @error="handlePdfError"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import VuePdfEmbed from 'vue-pdf-embed'

const pdfSource = ref('')


// 处理文件流
const handleFileBlob = async (blob) => {
  if (blob) {
    // 验证是否是有效的PDF
    if (blob.type !== 'application/pdf') {
      console.warn('返回的文件类型不是PDF:', blob.type)
      // 但继续尝试，有些服务器可能返回的content-type不正确
    }
    // 创建Blob URL
    const blobUrl = URL.createObjectURL(blob)
    pdfSource.value = blobUrl
  }
}

const handlePasswordRequest = (callback, retry) => {
  const password = prompt('请输入PDF密码:')
  callback(password)
}

const handlePdfRendered = () => {
  console.log('PDF渲染完成')
}

const handlePdfError = (error) => {
  console.error('PDF加载错误:', error)
}

defineExpose({ handleFileBlob })
</script>

<style scoped lang="scss">
.layout-pdf-view {}
</style>
  