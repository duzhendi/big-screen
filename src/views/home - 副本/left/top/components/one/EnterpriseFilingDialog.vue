<template>
  <CommonDialog v-model:visible="dialogVisible" :title="title" width="900px" height="600px">
    <div class="dialog-content">
      <div class="btn-box">
        <CommonButton
          label="多部门联合推荐企业"
          :active="currentTabActive === '1'"
          @click="handleCurrentTabChange('1')"
          style="width: 180px; height: 32px"
        />
        <CommonButton
          label="多部门联合数据补全"
          :active="currentTabActive === '0'"
          @click="handleCurrentTabChange('0')"
          style="width: 180px; height: 32px"
        />
      </div>

      <div class="dialog-content-header">
        <div class="statistics-box">
          <template v-if="currentTabActive === '0'">
            <div class="stat-item">
              <span class="label">委办局 (IRS)：</span>
              <span class="value">15个</span>
            </div>
            <div class="stat-item">
              <span class="label">库表数：</span>
              <span class="value">2个</span>
            </div>
            <div class="stat-item">
              <span class="label">接口数：</span>
              <span class="value">37个</span>
            </div>
            <div class="stat-item">
              <span class="label">建档数：</span>
              <span class="value">12719个</span>
            </div>
          </template>
          <template v-else>
            <div class="stat-item">
              <span class="label">委办局：</span>
              <span class="value">5个</span>
            </div>
            <div class="stat-item">
              <span class="label">区县：</span>
              <span class="value">39个</span>
            </div>
          </template>
        </div>
        <div class="search-box">
          <CommonSelect
            v-if="currentTabActive === '0'"
            v-model="formData.accessWay"
            :options="typeOptions"
            placeholder="按类型"
            style="width: 140px"
          />
          <CommonInput
            v-model="formData.enterpriseName"
            placeholder="请输入企业名称"
            @search="handleSearch"
            style="width: 200px; margin-left: 10px"
          />
        </div>
      </div>
      <CommonTable
        :loading="loading"
        :data="tableData"
        :columns="currentTabActive === '1' ? columns : columns1"
        style="height: 400px"
      >
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
import { getEnterpriseRecommendList, getEnterpriseFilingList } from '@/apis'

// Props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '企业建档-企业名单'
  },
  indexName: {
    type: String,
    default: '建档企业'
  },
  indexValue: {
    type: [String, Number],
    default: 0
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

const currentTabActive = ref('1')

// 表单数据
const formData = reactive({
  accessWay: '',
  affiliatedGradient: '',
  enterpriseName: ''
})

// 下拉选项
const typeOptions = ref([
  {
    label: '接口',
    value: '1'
  },
  {
    label: '库表',
    value: '2'
  }
])

// 表格数据
const tableData = ref([])
const columns = [
  { label: '序号', type: 'index', width: '60px' },
  { label: '多部门联合推荐企业名称', prop: 'enterpriseName' },
  { label: '推荐部门', prop: 'recommendUnitName' },
  { label: '推荐梯度', prop: 'affiliatedGradientName' }
]
const columns1 = [
  { label: '序号', type: 'index', width: '60px' },
  { label: '多部门联合数据补全企业名称', prop: 'enterpriseName' },
  { label: '委办局（IRS）', prop: 'deptName' },
  { label: '类型', prop: 'accessWayName' }
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
  formData.accessWay = ''
  formData.enterpriseName = ''
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

// 获取表格数据
const fetchData = async () => {
  try {
    loading.value = true
    tableData.value = []
    pagenation.total = 0
    const params = {
      pageIndex: pagenation.pageIndex,
      pageSize: pagenation.pageSize,
      // 注意：这里可能需要根据后端接口区分 '委办局' 和 '区县' 的参数
      // 暂时复用 isFull 参数逻辑或新增参数
      ...formData
    }
    const func = currentTabActive.value === '1' ? getEnterpriseRecommendList : getEnterpriseFilingList
    const res = await func(params)
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
      fetchData()
    }
  }
)
watch(formData, () => {
  fetchData()
})
onMounted(() => {
  if (props.visible) {
    fetchData()
  }
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

  .statistics-box {
    display: flex;
    align-items: center;
    gap: 10px;
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
  }

  .dialog-content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .search-box {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
