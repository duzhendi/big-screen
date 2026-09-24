<template>
  <CommonDialog v-model:visible="dialogVisible" :title="title" width="800px" height="600px" @close="emit('close')">
    <div class="dialog-content">
      <div class="dialog-content-header">
        <div class="search-box">
          <CommonSelect
            v-if="mapType === '0'"
            v-model="formData.reportBatch"
            :options="yearOptions"
            placeholder="按批次"
            style="width: 140px"
          />
          <CommonSelect
            v-else
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
            @change="handleChange"
          />
        </div>
      </div>
      <CommonTable :loading="loading" :data="tableData" :columns="columns" style="height: 400px">
        <template #name="{ row }">
          <span style="color: #00d3f6">{{ row.name }}</span>
        </template>
        <template #opration="{ row }">
          <span style="color: #00d3f6; cursor: pointer">查看</span>
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
import CommonInput from '@/components/common-input.vue'
import CommonTable from '@/components/common-table.vue'
import CommonPagination from '@/components/common-pagination.vue'
import { getMapDetail, getDict } from '@/apis'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '企业明细'
  },
  countryNm: {
    type: String,
    default: ''
  },
  mapType: {
    type: String,
    default: '0'
  },
  affiliatedGradient: {
    type: String,
    default: ''
  }
})
const tdOptions = ref([])

const loading = ref(false)
// Emits
const emit = defineEmits(['update:visible', 'close'])
const yearOptions = ref([
  {
    label: '2025年',
    value: '2025'
  },
  {
    label: '2024年',
    value: '2024'
  },
  {
    label: '2023年',
    value: '2023'
  },
  {
    label: '2022年',
    value: '2022'
  },
  {
    label: '2021年',
    value: '2021'
  },
  {
    label: '2020年',
    value: '2020'
  },
  {
    label: '2019年',
    value: '2019'
  },
  {
    label: '2018年',
    value: '2018'
  },
  {
    label: '2017年',
    value: '2017'
  },
  {
    label: '2016年',
    value: '2016'
  }
])
// 弹窗显示状态同步
const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

// 表单数据
const formData = reactive({
  reportBatch: '',
  enterpriseName: ''
})

// 表格数据
const tableData = ref([])
const columns = computed(() => {
  return props.mapType === '0'
    ? [
        { label: '序号', type: 'index', width: '60px' },
        { label: '企业名称', prop: 'enterpriseName' },
        { label: '梯度', prop: 'affiliatedGradientName' },
        { label: '批次', prop: 'reportBatch', width: '120px' }
        // { label: '操作', prop: 'opration', width: '40px' }
      ]
    : [
        { label: '序号', type: 'index', width: '60px' },
        { label: '企业名称', prop: 'enterpriseName' },
        { label: '梯度', prop: 'affiliatedGradientName' }
        // { label: '操作', prop: 'opration', width: '40px' }
      ]
})
const pagenation = ref({
  pageIndex: 1,
  pageSize: 6,
  total: 0
}) // 搜索
const handleSearch = () => {
  pagenation.value.pageIndex = 1
  fetchData()
}

// 分页变化
const handlePaginationChange = (page) => {
  pagenation.value.pageIndex = page
  fetchData()
}

// 输入框变化
const handleChange = () => {
  pagenation.value.pageIndex = 1
  fetchData()
}
// 获取表格数据
const fetchData = async () => {
  try {
    tableData.value = []
    pagenation.value.total = 0
    loading.value = true
    const params = {
      pageIndex: pagenation.value.pageIndex,
      pageSize: pagenation.value.pageSize,
      belongCountry: props.countryNm,
      platType: props.mapType,
      affiliatedGradient: props.affiliatedGradient,
      ...formData
    }
    const res = await getMapDetail(params)
    if (res?.data?.data) {
      tableData.value = res.data?.data?.list || []
      pagenation.value.total = res.data?.data?.totalCount || 0
    }
    loading.value = false
  } catch (error) {
    console.error('获取列表失败', error)
  } finally {
    loading.value = false
  }
}
// 获取字典和区域数据
const getOptions = async () => {
  try {
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
// 监听弹窗打开时加载数据
watch(
  () => props.visible,
  (val) => {
    if (val) {
      fetchData()
    } else {
      // 清空formData数据
      formData.enterpriseName = ''
      formData.reportBatch = ''
      pagenation.value.pageIndex = 1
    }
  }
)
watch(formData, () => {
  fetchData()
})

// 监听 mapType 变化
watch(
  () => props.mapType,
  (val) => {
    console.log('mapType changed to:', val)
    if (props.visible) {
      // 切换类型时重置表单并刷新
      formData.reportBatch = ''
      formData.affiliatedGradient = ''
      pagenation.value.pageIndex = 1
      fetchData()
    }
  }
)

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
      width: 100%;
      justify-content: flex-end;
    }
  }
}
</style>
