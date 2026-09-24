<template>
  <div class="public-service-right-wrapper">
    <div class="ps-panel" style="height: 220px">
      <div class="trend-title">超期率排名前5服务名称</div>
      <div class="content-screen">
        <overdueTop5 />
      </div>
    </div>

    <div class="ps-panel" style="height: 263px; margin-top: 13px">
      <div class="trend-title">领取待遇资格认证</div>
      <div class="content-screen">
        <div class="auth-header">
          <span class="auth-label">申请总量(笔)</span>
          <span class="auth-nums">
            <span v-for="(n, i) in applyAuthTotal.toString().split('')" :key="i" class="auth-num">{{ n }}</span>
          </span>
        </div>
        <benefitAuth />
      </div>
    </div>

    <div class="ps-panel" style="height: 341px; margin-top: 13px">
      <div class="trend-title">查询服务接口调用情况</div>
      <div class="content-screen">
        <apiCall />
      </div>
    </div>
  </div>
</template>

<script setup>
import overdueTop5 from './components/overdue-top5.vue'
import benefitAuth from './components/benefit-auth.vue'
import apiCall from './components/api-call.vue'

const applyAuthTotal = 38842
</script>

<style scoped lang="scss">
.public-service-right-wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: url('@/assets/images/Rectangle 34624198111.png') no-repeat center center;
  background-size: 100% 100%;

  .ps-panel {
    position: relative;
  }

  // 标题栏，与综柜事项页面保持一致
  .trend-title {
    height: 28px;
    line-height: 28px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    background: url('@/assets/images/标题背景12345.png') no-repeat center center;
    background-size: 100% 100%;
    padding-left: 24px;
    font-size: 14px;
    color: #fff;
    font-family: Alibaba-PuHuiTi-Medium;
    letter-spacing: 1px;
  }

  .content-screen {
    width: 100%;
    height: calc(100% - 28px);
  }

  .auth-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px 0;

    .auth-label {
      font-size: 14px;
      color: #cdeaff;
    }
    .auth-nums {
      display: flex;
      gap: 2px;
      .auth-num {
        width: 21px;
        height: 29px;
        font-family: DS-DIGI;
        margin-right: 5px;
        font-size: 20px;
        text-align: center;
        color: #fff;
        background: url('@/assets/images/Group 1321316598.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
