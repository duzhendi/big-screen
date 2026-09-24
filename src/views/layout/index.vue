<template>
  <div class="layout-screen-wrapper">
    <div class="groups-filter">
      <div class="btn-group">
        <div v-for="(btns, idx) in menu" class="group-cell">
          <div :class="['btn', { active_btn: active === btns.name }]" @click="handleMenuClick(btns.name)">
            {{ btns.label }}
          </div>
          <div v-if="idx + 1 < menu.length" class="line"></div>
        </div>
      </div>
      <!-- 区域/时间筛选只有首页需要 -->
      <div v-if="active === 'home'" class="filter-group">
        <span>区域：</span>
        <CommonSelect v-model="formData.belongCountry" :options="areaOptions" placeholder="全部" style="width: 120px" />
        <span>时间：</span>
        <CommonSelect v-model="formData.belongCountry" :options="areaOptions" placeholder="全部" style="width: 120px" />
      </div>
    </div>

    <div class="cont-view"><router-view></router-view></div>
  </div>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { menuListData } from '@/mock'
import { useRoute, useRouter } from 'vue-router'
import CommonSelect from '@/components/common-select.vue'

const menu = ref(menuListData)

const route = useRoute()
const router = useRouter()

const active = computed(() => route.name)

// 切换一级菜单；尚未注册路由的菜单先跳过，避免控制台抛 No match 警告
const handleMenuClick = (name) => {
  if (name !== active.value && router.hasRoute(name)) {
    router.push({ name })
  }
}

const formData = reactive({
  enterpriseName: '',
  affiliatedGradient: '',
  belongCountry: ''
})
</script>

<style scoped lang="scss">
.layout-screen-wrapper {
  width: 100%;
  height: 100%;
  .groups-filter {
    display: flex;
    justify-content: space-between;
    .btn-group {
      color: #ffffff;
      display: flex;
      .group-cell {
        display: flex;
        align-items: center;
        .btn {
          width: 132px;
          height: 48px;
          background: url('@/assets/images/btn-normal.png');
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 18px;
        }
        .line {
          width: 13px;
          height: 12px;
          background: url('@/assets/images/btn-line.png');
          background-size: 100% 100%;
          margin: 0 20px;
        }
        .active_btn {
          background: url('@/assets/images/btn-active.png');
          background-size: 100% 100%;
          font-family: Alibaba-PuHuiTi-Medium;
        }
      }
    }

    .filter-group {
      width: 460px;
      height: 48px;
      background: url('@/assets/images/Group1321317099.png');
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      gap: 16px;
      > span {
        font-size: 16px;
        color: #ccebff;
        margin-left: 16px;
      }
    }
  }

  .cont-view {
    width: 100%;
    height: calc(100% - 48px);
    padding: 20px 0 38px 0;
    box-sizing: border-box;
  }
}
</style>
