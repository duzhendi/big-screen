<template>
  <Teleport to="#app-scale-box">
    <div class="common-dialog-overlay" v-if="visible" @click.self="handleMaskClick">
      <div class="common-dialog-container" :style="{ width: width, height: height }">
        <!-- 顶部标题栏 -->
        <div class="dialog-header">
          <div class="title">{{ title }}</div>
          <div class="close-btn" @click="close">
            <i class="iconfont icon-close"></i>
          </div>
        </div>

        <!-- 内容区域 -->
        <div class="dialog-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '标题'
  },
  width: {
    type: String,
    default: '960px'
  },
  height: {
    type: String,
    default: '600px'
  },
  closeOnClickModal: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:visible', 'close'])

const close = () => {
  emit('update:visible', false)
  emit('close')
}

const handleMaskClick = () => {
  if (props.closeOnClickModal) {
    close()
  }
}
</script>

<style lang="scss" scoped>
.common-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
}

.common-dialog-container {
  background: rgba(4, 18, 35, 0.95);
  border: 1px solid #1e3e5d;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 168, 252, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  .dialog-header {
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    position: relative;
    background:
      repeating-linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.03),
        rgba(255, 255, 255, 0.03) 10px,
        transparent 10px,
        transparent 20px
      ),
      linear-gradient(90deg, rgba(0, 66, 95, 0.9) 0%, rgba(0, 130, 168, 0.9) 50%, rgba(0, 66, 95, 0.9) 100%);
    border-top: 1px solid rgba(113, 234, 255, 0.5);
    border-bottom: 1px solid rgba(113, 234, 255, 0.5);

    // 标题左侧装饰条
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: #00d3f6;
    }

    .title {
      font-family:
        Alimama ShuHeiTi,
        Alimama ShuHeiTi;
      font-weight: bold;
      font-size: 20px;
      color: #ffffff;
      padding-left: 20px;
      letter-spacing: 1px;
      background: linear-gradient(180deg, #ffffff 0%, #92deff 100%);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
    }

    .close-btn {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #b9e8ff;
      font-size: 20px;
      transition: all 0.3s;

      &:hover {
        color: #ffffff;
        transform: rotate(90deg);
      }

      // 这里用个简单的 X 替代 iconfont，或者你可以插入图片
      .icon-close::before {
        content: '×';
        font-style: normal;
        font-size: 24px;
        line-height: 1;
      }
    }
  }

  .dialog-body {
    flex: 1;
    padding: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    // 提供给插槽内容的通用样式
    :deep(.dialog-tabs) {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;

      .tab-btn {
        min-width: 140px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #b9e8ff;
        font-size: 14px;
        font-family: Alibaba-PuHuiTi-2;
        cursor: pointer;
        background: url('@/assets/images/dialog/培育诊断_默认色.png') no-repeat center center;
        background-size: 100% 100%;
        transition: all 0.3s;

        &:hover {
          color: #ffffff;
        }

        &.active {
          color: #ffffff;
          font-weight: bold;
          background-image: url('@/assets/images/dialog/培育诊断_选中色.png');
          text-shadow: 0 0 8px rgba(0, 211, 246, 0.5);
        }
      }
    }

    // 通用搜索栏样式
    :deep(.dialog-search-bar) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      color: #fff;

      .total-count {
        font-size: 14px;
        .num {
          color: #00d3f6;
          font-size: 18px;
          font-weight: bold;
          margin: 0 4px;
        }
      }

      .filters {
        display: flex;
        gap: 10px;

        // 这里可以根据需要添加输入框、下拉框的样式适配
        // 假设使用 element-plus 或原生样式
      }
    }
  }
}
</style>
