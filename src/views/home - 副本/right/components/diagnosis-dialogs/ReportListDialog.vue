<template>
  <CommonDialog v-model:visible="dialogVisible" :title="title" width="1000px" height="700px">
    <div class="report-list-dialog">
      <div class="dialog-search-bar">
        <div class="filters">
          <div class="filter-item">
            <span>所属区县：</span>
            <CommonSelect v-model="queryParams.area" :options="areaOptions" placeholder="全部" style="width: 160px" />
          </div>
          <CommonButton @click="handleSearch" type="primary" style="margin-left: 10px">搜索</CommonButton>
        </div>
      </div>

      <div class="table-container">
        <CommonTable :columns="columns" :data="tableData" :loading="loading">
          <template #gradient="{ row }">
            <span :style="{ color: gradientColor(row.gradient) }">{{ row.gradient }}</span>
          </template>
          <template #level="{ row }">
            <span :style="{ color: gradientColor(row.level) }">{{ row.level }}</span>
          </template>
          <template #scope="{ row }">
            <span class="scope-text" :title="row.scope">{{ row.scope }}</span>
          </template>
          <template #action="{ row }">
            <span class="action-btn" @click="handlePreview(row)">查看报告</span>
          </template>
        </CommonTable>
      </div>

      <div class="pagination-container">
        <CommonPagination
          v-model:currentPage="queryParams.pageIndex"
          :total="total"
          :pageSize="queryParams.pageSize"
          @change="handlePageChange"
        />
      </div>
    </div>

    <!-- 报告预览弹窗 -->
    <ReportPreviewDialog
      v-if="previewVisible"
      v-model:visible="previewVisible"
      :title="previewTitle"
      :reportUrl="previewUrl"
      :fileName="fileName"
      :bucketName="bucketName"
    />

    <!-- 企业画像弹窗 -->
    <PortraitDialog
      v-model:visible="portraitVisible"
      :enterpriseName="selectedEnterprise"
      :enterpriseCode="selectedEnterpriseCode"
      :enterprisePortrayalId="enterprisePortrayalId"
      :tdType="selectedTdName"
    />
  </CommonDialog>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import CommonDialog from '@/components/common-dialog.vue'
import CommonTable from '@/components/common-table.vue'
import CommonPagination from '@/components/common-pagination.vue'
import CommonSelect from '@/components/common-select.vue'
import CommonButton from '@/components/common-button.vue'
import ReportPreviewDialog from './ReportPreviewDialog.vue'
import PortraitDialog from '@/views/home/center/components/portrait/index.vue'
import { getAreaList } from '@/apis/index'
import {
  getPortrayal as RequestFn1,
  getMapDetail as RequestFn2,
  getReportList as RequestFn3,
  getSmallEnterprise as RequestFn43,
  getSupportEnterprise as RequestFn42,
  getDiagnose as RequestFn44
} from '@/apis/rightModel.js'
import { COL_T1_ITEMS, COL_T2_ITEMS, COL_T3_ITEMS, COL_T43_ITEMS, COL_T42_ITEMS, COL_T44_ITEMS } from './consts'
const bucketName = ref('tidu')
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: '1' // 1: 培育, 2: 质量, 3: 管理 41/42/44: 数智化
  }
})

const emit = defineEmits(['update:visible'])
const enterprisePortrayalId = ref('')
const fileName = ref('')
const selectedEnterpriseCode = ref('')
const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const title = computed(() => {
  const titles = {
    1: '培育诊断报告列表',
    2: '质量诊断报告列表',
    3: '管理诊断报告列表',
    42: '支持企业列表',
    43: '小快轻准列表',
    44: '数字化诊断报告列表'
  }
  return titles[props.type] || '报告列表'
})

const loading = ref(false)
const total = ref(0)
const queryParams = ref({
  area: '',
  pageIndex: 1,
  pageSize: 10
})

const areaOptions = ref([])

const columns = computed(() => {
  let _columns = null
  switch (props.type) {
    case 1:
    case '1':
      _columns = COL_T1_ITEMS
      break
    case 2:
    case '2':
      _columns = COL_T2_ITEMS
      break
    case 3:
    case '3':
      _columns = COL_T3_ITEMS
      break
    case 42:
    case '42':
      _columns = COL_T42_ITEMS
      break
    case 43:
    case '43':
      _columns = COL_T43_ITEMS
      break
    case 44:
    case '44':
      _columns = COL_T44_ITEMS
      break
  }
  return _columns
})

// 模拟数据
const tableData = ref([])

const gradientColor = (gradient) => {
  return '#ffffff'
}

const handleSearch = () => {
  queryParams.value.pageIndex = 1
  fetchData()
}

const handlePageChange = (page) => {
  queryParams.value.pageIndex = page
  fetchData()
}

const fetchData = async () => {
  tableData.value = []
  const RequestFnItems = {
    RequestFn1,
    RequestFn2,
    RequestFn3,
    RequestFn43,
    RequestFn42,
    RequestFn44
  }
  let RequestFn = RequestFnItems[`RequestFn${props.type}`]
  // 只有 “诊断赋能-培育诊断-分析报告数-培育诊断报告列表”即type == 1 需要传固定参数affiliatedGradient: 'cxxzxqy'
  // 其余只需要传分页参数
  let params = null
  if (props.type == 1) {
    params = {
      belongCountry: queryParams.value.area,
      affiliatedGradient: 'cxxzxqy',
      pageIndex: queryParams.value.pageIndex,
      pageSize: queryParams.value.pageSize
    }
  } else {
    params = {
      pageIndex: queryParams.value.pageIndex,
      pageSize: queryParams.value.pageSize,
      diagnosisCategory: 'szhzd',
      registeredRegion: queryParams.value.area
    }
  }
  const map = {
    cxxzxqy: '创新型中小企业',
    zjtxzxqy: '专精特新中小企业',
    xjrqy: '小巨人企业',
    sjdxgj: '市级单项冠军',
    gjjdxgj: '国家级单项冠军'
  }
  loading.value = true
  // 这里应该是调用 API
  const res = await RequestFn(params)
  if (res && res.data && res.data.data && res.data.data.list) {
    tableData.value = res.data.data.list.map((item) => {
      return {
        ...item,
        affiliatedGradientString: map[item.affiliatedGradient]
      }
    })
    total.value = res.data.data.totalCount
  } else {
    tableData.value = []
    total.value = 0
  }

  loading.value = false
}

// 预览相关
const previewVisible = ref(false)
const previewTitle = ref('')
const previewUrl = ref('')

const portraitVisible = ref(false)
const selectedEnterprise = ref('')
const selectedTdName = ref('')
const handlePreview = (row) => {
  if (props.type === '1') {
    // 培育诊断打开企业画像
    selectedEnterprise.value = row.enterpriseName
    console.log(row, 'row')
    selectedEnterpriseCode.value = row.enterpriseCode
    enterprisePortrayalId.value = row.enterprisePortrayalId
    selectedTdName.value = row.affiliatedGradientString
    portraitVisible.value = true
  } else {
    previewTitle.value = `${row.enterpriseName} - 诊断报告`
    // 根据类型选择不同的报告
    if (props.type === '3') {
      // previewUrl.value = './mgmt-report.html'
      previewUrl.value = ''
      fileName.value = row.fileUrl
      bucketName.value = 'glzd'
    } else if (props.type === '2') {
      // previewUrl.value = './quality-report.html'
      previewUrl.value = ''
      fileName.value = row.fileUrl
      bucketName.value = 'zlzd'
    } else if (props.type === '44') {
      previewUrl.value = ''
      fileName.value = row.fileUrl
      bucketName.value = 'tidu'
    }
    previewVisible.value = true
  }
}

onMounted(() => {
  getAreaList().then((res) => {
    if (res.data && res.data.data) {
      areaOptions.value = res.data.data.map((item) => ({
        label: item.areaName,
        value: item.areaName
      }))
    }
  })
  // fetchData()
})
watch(
  () => props.type,
  () => {
    queryParams.value.area = ''
    fetchData()
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.report-list-dialog {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 10px;

  .dialog-search-bar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;

    .filters {
      display: flex;
      align-items: center;

      .filter-item {
        display: flex;
        align-items: center;
        margin-right: 20px;
        color: #b9e8ff;
        font-size: 14px;
      }
    }
  }

  .table-container {
    flex: 1;
    overflow: hidden;
    margin-bottom: 20px;
  }

  .pagination-container {
    display: flex;
    justify-content: center;
  }

  .action-btn {
    color: #3ce3ff;
    cursor: pointer;
    text-decoration: underline;

    &:hover {
      color: #ffffff;
    }
  }

  .scope-text {
    display: inline-block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    color: #e0f2ff;
  }
}
</style>
