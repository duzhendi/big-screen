<template>
  <CommonDialog v-model:visible="dialogVisible" :title="title" width="800px" height="600px">
    <div class="dialog-content">
      <div class="dialog-content-header">
        <div class="search-box">
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
import { get33618Detail, getDict } from '@/apis'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '数据采集-企业名单'
  },
  nameCn: {
    type: String,
    default: '智能网联新能源汽车'
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

// 表单数据
const formData = reactive({
  enterpriseName: ''
})

// 表格数据
const tableData = ref([])
const columns = [
  { label: '序号', type: 'index', width: '60px' },
  { label: '企业名称', prop: 'enterpriseName' },
  { label: '梯度', prop: 'affiliatedGradientName' },
  { label: '操作', prop: 'opration', width: '80px' }
]
const pagenation = ref({
  pageIndex: 1,
  pageSize: 6,
  total: 0
})
const codeList = ref([])
// 搜索
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
// 获取33618字典表
getDict({ dictCateCd: '33618' }).then((res) => {
  if (res && res.data && res.data.code === 100000 && res.data.data) {
    codeList.value = res.data?.data || []
  }
})
// 获取表格数据
const fetchData = async () => {
  try {
    tableData.value = []
    pagenation.value.total = 0
    loading.value = true
    const params = {
      pageIndex: pagenation.value.pageIndex,
      pageSize: pagenation.value.pageSize,
      classifyCode: codeList.value.find((item) => item.dictItemValue === props.nameCn)?.dictItemCd,
      ...formData
    }
    const res = await get33618Detail(params)
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

// 监听弹窗打开时加载数据
watch(
  () => props.visible,
  (val) => {
    if (val) {
      fetchData()
    } else {
      // 清空formData数据
      formData.enterpriseName = ''
      pagenation.value.pageIndex = 1
    }
  }
)
onMounted(() => {
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
