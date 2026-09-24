<template>
  <CommonDialog v-model:visible="dialogVisible" :title="title" width="800px" height="600px">
    <div class="dialog-content">
      <div class="btn-box" v-if="currentType === '其他'">
        <CommonButton
          label="不通过"
          :active="currentTabActive === '2'"
          @click="handleCurrentTabChange('2')"
          style="width: 140px; height: 32px"
        />
        <CommonButton
          label="取消认定"
          :active="currentTabActive === '3'"
          @click="handleCurrentTabChange('3')"
          style="width: 140px; height: 32px"
        />
        <CommonButton
          label="黑名单"
          :active="currentTabActive === '4'"
          @click="handleCurrentTabChange('4')"
          style="width: 140px; height: 32px"
        />
      </div>
      <div class="dialog-content-header">
        <div class="search-box">
          <CommonSelect
            v-if="currentTabActive !== '4'"
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
      <CommonTable :loading="loading" :data="tableData" :columns="columnsList" style="height: 400px">
        <template #name="{ row }">
          <span style="color: #00d3f6">{{ row.name }}</span>
        </template>
        <template #affiliatedGradientName="{ row }">
          <span style="color: #3ce3ff; cursor: pointer" @click="handleView(row)">查看</span>
          <!-- <span v-else style="color: #666; cursor: not-allowed">查看</span> -->
        </template>
      </CommonTable>
      <CommonPagination
        :total="pagenation.total"
        :pageSize="pagenation.pageSize"
        :currentPage="pagenation.pageIndex"
        @change="handlePaginationChange"
        style="margin-top: 10px"
      />
    </div>
  </CommonDialog>
  <PortraitDialog
    v-model:visible="portraitVisible"
    :enterpriseName="selectedEnterprise"
    :tdType="selectedTdType"
    :enterprisePortrayalId="enterprisePortrayalId"
    :enterpriseCode="selectedEnterpriseCode"
    :isCult="true"
  />
  <!-- <PortraitDialogNotCxxzxqy
    v-model:visible="portraitVisibleNotCxxzxqy"
    :enterpriseName="selectedEnterprise"
    :tdType="selectedTdType"
    :enterprisePortrayalId="enterprisePortrayalId"
    :enterpriseCode="selectedEnterpriseCode"
  /> -->
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import CommonDialog from '@/components/common-dialog.vue'
import CommonButton from '@/components/common-button.vue'
import CommonInput from '@/components/common-input.vue'
import CommonTable from '@/components/common-table.vue'
import CommonPagination from '@/components/common-pagination.vue'
import PortraitDialog from '@/views/home/center/components/portrait/index.vue'
// import PortraitDialogNotCxxzxqy from '@/views/tdxz/components/portrait/index.vue'
import { getGraduateLibraryInfo, getNurturingLibraryInfo, getDict } from '@/apis'
const tdOptions = ref([])
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
  currentType: {
    type: String,
    default: ''
  }
})
const loading = ref(false)
// Emits
const emit = defineEmits(['update:visible'])
const enterprisePortrayalId = ref(null)
// 弹窗显示状态同步
const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const currentTabActive = ref('2')
// const portraitVisibleNotCxxzxqy = ref(false)
const portraitVisible = ref(false)
const selectedEnterprise = ref('')
const selectedTdType = ref('')
const selectedEnterpriseCode = ref('')
// 表单数据
const formData = reactive({
  enterpriseName: '',
  affiliatedGradient: ''
})

// 表格数据
const tableData = ref([])
const columns = [
  { label: '序号', type: 'index', width: '60px' },
  { label: '企业名称', prop: 'enterpriseName' },
  { label: '梯度', prop: 'affiliatedGradient' },
  { label: '操作', prop: 'affiliatedGradientName', width: '80px' }
]
const columns1 = [
  { label: '序号', type: 'index', width: '60px' },
  { label: '企业名称', prop: 'enterpriseName' },
  { label: '建议梯度', prop: 'affiliatedGradient' },
  { label: '操作', prop: 'affiliatedGradientName', width: '80px' }
]
const columns2 = computed(() =>
  currentTabActive.value === '4'
    ? [
        { label: '序号', type: 'index', width: '60px' },
        { label: '企业名称', prop: 'enterpriseName' },
        { label: '列入原因', prop: 'remark' },
        { label: '列入时间', prop: 'blackTime', width: '100px' }
      ]
    : [
        { label: '序号', type: 'index', width: '60px' },
        { label: '企业名称', prop: 'enterpriseName' },
        { label: '梯度', prop: 'affiliatedGradient' }
      ]
)

const columnsList = computed(() => {
  return props.currentType === '认定潜力库' ? columns : props.currentType === '培育潜力库' ? columns1 : columns2.value
})
const pagenation = ref({
  pageIndex: 1,
  pageSize: 6,
  total: 0
})

// 切换 Tab
const handleCurrentTabChange = (val) => {
  currentTabActive.value = val
  pagenation.value.pageIndex = 1
  fetchData()
}

// 搜索
const handleSearch = () => {
  pagenation.value.pageIndex = 1
  fetchData()
}

// 查看
const handleView = (row) => {
  console.log(row, 'row')
  selectedEnterpriseCode.value = row.enterpriseCode
  enterprisePortrayalId.value = row.reportId
  selectedEnterprise.value = row.enterpriseName
  selectedTdType.value = row.affiliatedGradient
  // selectedTdType.value === '创新型中小企业' ? (portraitVisible.value = true) : (portraitVisibleNotCxxzxqy.value = true)
  portraitVisible.value = true
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
      identifiedStatus:
        props.currentType === '认定潜力库' || props.currentType === '培育潜力库' ? '1' : currentTabActive.value,
      affiliatedGradient: formData.affiliatedGradient,
      ...formData
    }
    const func =
      props.currentType === '认定潜力库'
        ? getGraduateLibraryInfo
        : props.currentType === '培育潜力库'
          ? getNurturingLibraryInfo
          : getGraduateLibraryInfo
    const res = await func(params)
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
      formData.affiliatedGradient = ''
      currentTabActive.value = '2'
      pagenation.value.pageIndex = 1
    }
  }
)
watch(currentTabActive, () => {
  pagenation.value.pageIndex = 1
  fetchData()
})
watch(formData, () => {
  fetchData()
})
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
