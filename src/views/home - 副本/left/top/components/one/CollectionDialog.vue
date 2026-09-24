<template>
  <CommonDialog v-model:visible="dialogVisible" :title="title" width="800px" height="600px">
    <div class="dialog-content">
      <div class="btn-box">
        <CommonButton
          label="累计采集企业"
          :active="currentTabActive === '1'"
          @click="handleCurrentTabChange('1')"
          style="width: 140px; height: 32px"
        />
        <CommonButton
          label="本年度采集企业"
          :active="currentTabActive === '0'"
          @click="handleCurrentTabChange('0')"
          style="width: 140px; height: 32px"
        />
      </div>
      <div class="dialog-content-header">
        <div class="stat-item">
          <div class="title">{{ indexName }}</div>
          <div class="value">{{ indexValue }}家</div>
        </div>
        <div class="search-box">
          <CommonSelect
            v-model="formData.recommendUnit"
            :options="areaOptions"
            placeholder="按部门"
            style="width: 140px"
          />
          <CommonSelect
            v-model="formData.affiliatedGradient"
            :options="tdOptions"
            placeholder="按梯度"
            style="width: 140px; margin-left: 10px"
          />
          <CommonInput
            v-model="formData.enterpriseName"
            placeholder="请输入企业名称"
            @search="handleSearch"
            style="width: 200px; margin-left: 10px"
          />
        </div>
      </div>
      <CommonTable :loading="loading" :data="tableData" :columns="columns" style="height: 400px">
        <template #name="{ row }">
          <span style="color: #00d3f6">{{ row.name }}</span>
        </template>
      </CommonTable>
      <CommonPagination
        :total="pagenation.total"
        :pageSize="pagenation.pageSize"
        :currentPage="pagenation.pageIndex"
        @change="handlePaginationChange"
      />
    </div>
  </CommonDialog>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import CommonDialog from '@/components/common-dialog.vue'
import CommonButton from '@/components/common-button.vue'
import CommonSelect from '@/components/common-select.vue'
import CommonInput from '@/components/common-input.vue'
import CommonTable from '@/components/common-table.vue'
import CommonPagination from '@/components/common-pagination.vue'
import { getDataCollectionList, getDict, getAreaInfo } from '@/apis'

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '数据采集-企业名单'
  },
  collectionData: {
    type: Object,
    default: () => ({
      total: 0,
      current: 0
    })
  }
})

const loading = ref(false)
// Emits
const emit = defineEmits(['update:visible'])

// 弹窗显示状态同步
const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

// 当前选中的 Tab：'1' 累计, '0' 本年度
const currentTabActive = ref('1')
const indexName = computed(() => (currentTabActive.value === '1' ? '累计采集企业' : '本年度采集企业'))
const indexValue = computed(() => (currentTabActive.value === '1' ? props.collectionData.total : props.collectionData.current))
// 表单数据
const formData = reactive({
  recommendUnit: '',
  affiliatedGradient: '',
  enterpriseName: ''
})

// 下拉选项
const areaOptions = ref([])
const tdOptions = ref([])

// 表格数据
const tableData = ref([])
const columns = [
  { label: '序号', type: 'index', width: '60px' },
  { label: '企业名称', prop: 'enterpriseName' },
  { label: '推荐部门', prop: 'recommendUnitName' },
  { label: '推荐梯度', prop: 'affiliatedGradientName' }
]

// 分页配置
const pagenation = reactive({
  pageIndex: 1,
  pageSize: 6,
  total: 0
})

// 切换 Tab
const handleCurrentTabChange = (val) => {
  currentTabActive.value = val
  pagenation.pageIndex = 1
  fetchData()
}

// 搜索
const handleSearch = () => {
  pagenation.pageIndex = 1
  fetchData()
}

// 分页变化
const handlePaginationChange = (page) => {
  pagenation.pageIndex = page
  fetchData()
}

// 获取字典和区域数据
const getOptions = async () => {
  try {
    // 获取区县
    const areaRes = await getAreaInfo()
    if (areaRes?.data?.data) {
      areaOptions.value = areaRes.data.data.map((item) => ({
        label: item.deptName,
        value: item.deptId
      }))
    }

    // 获取梯度
    const dictRes = await getDict({ dictCateCd: 'gradient_type' })
    if (dictRes?.data?.data) {
      tdOptions.value = dictRes.data.data.map((item) => ({
        label: item.dictItemValue,
        value: item.dictItemCd
      }))
    }
  } catch (error) {
    console.error('获取选项数据失败', error)
  }
}

// 获取表格数据
const fetchData = async () => {
  try {
    tableData.value = []
    pagenation.total = 0
    loading.value = true
    const params = {
      pageIndex: pagenation.pageIndex,
      pageSize: pagenation.pageSize,
      isFull: currentTabActive.value, // 1累计 0本年度
      ...formData
    }
    const res = await getDataCollectionList(params)
    if (res?.data?.data) {
      tableData.value = res.data?.data?.list || []
      pagenation.total = res.data?.data?.totalCount || 0
    }
    loading.value = false
  } catch (error) {
    console.error('获取列表失败', error)
  } finally {
    loading.value = false
  }
}

// 监听弹窗打开时加载数据
watch(
  () => props.visible,
  (val) => {
    if (val) {
      getOptions()
      fetchData()
    }
  }
)
watch(formData, () => {
  fetchData()
})
onMounted(() => {
  getOptions()
  fetchData()
})
</script>

<style lang="scss" scoped>
.dialog-content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .btn-box {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .dialog-content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .stat-item {
      display: flex;
      align-items: center;
      position: relative;
      padding-bottom: 5px;

      // 底部蓝色装饰条
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 6px;
        background: rgba(61, 147, 242, 0.3); // 浅蓝色底
        border-radius: 3px;
        z-index: 0;
      }

      // 底部蓝色装饰条高亮部分 (模拟斜切效果可以用伪元素叠加或 clip-path，简单起见用纯色)
      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%; // 可以调整宽度
        height: 6px;
        background: linear-gradient(90deg, #2b80ff 0%, rgba(43, 128, 255, 0) 100%);
        border-radius: 3px;
        z-index: 1;
      }

      .label {
        font-family: Alibaba-PuHuiTi-2;
        font-weight: bold;
        font-size: 14px;
        color: #ffffff;
        z-index: 2;
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
      }

      .value {
        font-family: Alibaba-PuHuiTi-2;
        font-weight: bold;
        font-size: 16px;
        color: #3ce3ff;
        margin-left: 5px;
        z-index: 2;
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
      }
    }
    .title {
      font-family: Alibaba-PuHuiTi-2;
      font-weight: normal;
      font-size: 16px;
      color: #ffffff;
      margin-right: 10px;
    }

    .value {
      font-family: Alibaba-PuHuiTi-2;
      font-weight: bold;
      font-size: 20px;
      color: #3ce3ff;
    }

    .search-box {
      display: flex;
    }
  }
}
</style>
