<template>
  <CommonDialog v-model:visible="dialogVisible" :title="title" width="1260px" height="720px">
    <div class="dialog-content">
      <div class="dialog-content-header">
        <div class="filter-left">
          <span class="label">所属区县：</span>
          <CommonSelect
            v-model="formData.belongCountry"
            :options="areaOptions"
            placeholder="全部"
            style="width: 140px"
          />
          <CommonButton label="搜索" @click="handleSearch" style="width: 80px; height: 32px; margin-left: 10px" />
        </div>
      </div>

      <div class="data-cards">
        <div class="card-item" v-for="(card, index) in dataCards" :key="index">
          <div class="card-label">{{ card.label }}</div>
          <div class="card-value" v-if="card.value">
            {{ card.value }}<span class="unit">{{ card.unit }}</span>
            <span v-if="card.trend === 'up'" class="trend-up">↑</span>
          </div>
          <div class="card-value" v-else>-</div>
        </div>
      </div>

      <CommonTable :loading="loading" :data="tableData" :columns="columns" style="height: 400px">
        <template #enterpriseName="{ row }">
          <span style="color: #00d3f6; cursor: pointer" @click="handleView(row)">{{ row.enterpriseName }}</span>
        </template>
        <template #operation="{ row }">
          <span style="color: #00d3f6; cursor: pointer" @click="handleView(row)">查看</span>
        </template>
      </CommonTable>

      <CommonPagination
        :total="pagination.total"
        :pageSize="pagination.pageSize"
        :currentPage="pagination.pageIndex"
        @change="handlePaginationChange"
        style="margin-top: 10px"
      />
    </div>
  </CommonDialog>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import CommonDialog from '@/components/common-dialog.vue'
import CommonSelect from '@/components/common-select.vue'
import CommonTable from '@/components/common-table.vue'
import CommonPagination from '@/components/common-pagination.vue'
import CommonButton from '@/components/common-button.vue'
import { getCenterTopEnterpriseList, getAreaList, getCenterTopIndex } from '@/apis'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '创新型中小企业列表'
  },
  // 企业类型代码：cxxzxqy, zjtxzxqy, xjrqy, sjdxgj, gjjdxgj
  enterpriseType: {
    type: String,
    default: 'cxxzxqy'
  },
  // 数据源类型：graduate(认定库) / nurturing(培育库)
  dataSourceType: {
    type: String,
    default: 'graduate',
    validator: (value) => ['graduate', 'nurturing'].includes(value)
  }
})

const emit = defineEmits(['update:visible', 'open-portrait'])

const loading = ref(false)

// 弹窗显示状态同步
const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

// 表单数据
const formData = reactive({
  enterpriseName: '',
  affiliatedGradient: '',
  belongCountry: ''
})

// 区县下拉选项
const areaOptions = ref([])

// 数据卡片
const dataCards = ref([
  { label: '平均企业营业收入', value: '', unit: '万元', model: 'avgOperationRevenue' },
  { label: '平均研发费用', value: '', unit: '万元', model: 'avgResearchCost' },
  { label: '平均研发投入强度', value: '', unit: '%', model: 'avgResearchRate' },
  { label: '平均研发人员占比', value: '', unit: '%', model: 'avgResearchStaffRatio' },
  { label: '平均发明专利数', value: '', unit: '个', model: 'avgInventionPatentNum' },
  { label: '平均营业收入增长率', value: '', unit: '%', trend: 'up', model: 'avgOperationRevenueGrowthRate' }
])

// 表格列配置
const columns = [
  { label: '序号', type: 'index', width: '60px' },
  { label: '企业名称', prop: 'enterpriseName', width: '280px' },
  // { label: '统一社会信用代码', prop: 'enterpriseCode' },
  { label: '所属区县', prop: 'belongCountry', width: '160px' },
  { label: '所属梯度', prop: 'affiliatedGradient', width: '120px' },
  { label: '认定批次', prop: 'affirmBatch', width: '160px' },
  { label: '所属行业', prop: 'belongIndustry' }
  // { label: '具体细分领域', prop: 'belongIndustrySubdivision' }
]

// 表格数据
const tableData = ref([])

// 分页配置
const pagination = reactive({
  pageIndex: 1,
  pageSize: 10,
  total: 0
})

// 获取区县字典
const getAreaDict = async () => {
  try {
    const res = await getAreaList()
    if (res?.data?.data) {
      areaOptions.value = res.data.data.map((item) => ({
        label: item.areaName,
        value: item.areaName
      }))
    }
  } catch (error) {
    console.error('获取区县字典失败', error)
  }
}

// 获取表格数据
const fetchData = async () => {
  try {
    loading.value = true
    tableData.value = []
    pagination.total = 0
    const params = {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      ...formData,
      affiliatedGradient: props.enterpriseType
    }

    const apiFunc = getCenterTopEnterpriseList

    const res = await apiFunc(params)
    if (res?.data?.data) {
      const map = {
        cxxzxqy: '创新型中小企业',
        zjtxzxqy: '专精特新中小企业',
        xjrqy: '小巨人企业',
        sjdxgj: '市级单项冠军',
        gjjdxgj: '国家级单项冠军'
      }
      tableData.value =
        res.data?.data?.list?.map((item) => ({
          ...item,
          affiliatedGradient: map[item.affiliatedGradient]
        })) || []
      pagination.total = res.data?.data?.totalCount || 0
    }
  } catch (error) {
    console.error('获取企业列表失败', error)
  } finally {
    loading.value = false
  }
}
const getIndexData = async () => {
  try {
    dataCards.value = [
      { label: '平均企业营业收入', value: '', unit: '万元', model: 'avgOperationRevenue' },
      { label: '平均研发费用', value: '', unit: '万元', model: 'avgResearchCost' },
      { label: '平均研发投入强度', value: '', unit: '%', model: 'avgResearchRate' },
      { label: '平均研发人员占比', value: '', unit: '%', model: 'avgResearchStaffRatio' },
      { label: '平均发明专利数', value: '', unit: '个', model: 'avgInventionPatentNum' },
      { label: '平均营业收入增长率', value: '', unit: '%', trend: 'up', model: 'avgOperationRevenueGrowthRate' }
    ]
    const res = await getCenterTopIndex({
      affiliatedGradient: props.enterpriseType,
      belongCountry: formData.belongCountry
    })
    if (res?.data?.data) {
      dataCards.value.forEach((item) => {
        item.value = res.data.data[item.model]?.toFixed(2) || ''
      })
      console.log(dataCards.value, 'dataCards.value')
    }
  } catch (error) {
    console.error('获取指标数据失败', error)
  }
}

// 搜索
const handleSearch = () => {
  pagination.pageIndex = 1
  fetchData()
}

// 分页变化
const handlePaginationChange = (page) => {
  pagination.pageIndex = page
  fetchData()
}

// 查看详情
const handleView = (row) => {
  emit('open-portrait', row)
}

// 监听弹窗打开时加载数据
watch(
  () => props.visible,
  (val) => {
    if (val) {
      // 重置表单和分页
      formData.enterpriseName = ''
      formData.affiliatedGradient = ''
      formData.belongCountry = ''
      pagination.pageIndex = 1
      getAreaDict()
      getIndexData()
      fetchData()
    }
  }
)

// 监听区县筛选变化
watch(
  () => formData.belongCountry,
  () => {
    pagination.pageIndex = 1
    fetchData()
    getIndexData()
  }
)
</script>

<style lang="scss" scoped>
.dialog-content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .dialog-content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .filter-left {
      display: flex;
      align-items: center;

      .label {
        font-family: Alibaba-PuHuiTi-2;
        font-size: 14px;
        color: #b9e8ff;
      }
    }
  }

  // 数据卡片区
  .data-cards {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    padding: 0 4px;

    .card-item {
      flex: 1;
      height: 72px;
      background: linear-gradient(180deg, rgba(0, 84, 156, 0.2) 0%, rgba(0, 84, 156, 0.05) 100%);
      border: 1px solid rgba(60, 227, 255, 0.25);
      border-radius: 4px;
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      position: relative;
      transition: all 0.3s ease;
      box-shadow: inset 0 0 15px rgba(0, 211, 246, 0.05);

      &:hover {
        background: rgba(0, 84, 156, 0.3);
        border-color: rgba(60, 227, 255, 0.5);
        box-shadow: 0 0 15px rgba(0, 211, 246, 0.15);
        transform: translateY(-2px);
      }

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 15%;
        height: 70%;
        width: 3px;
        background: linear-gradient(180deg, #00f0ff 0%, #008aff 100%);
        border-radius: 0 2px 2px 0;
        box-shadow: 0 0 8px rgba(0, 211, 246, 0.5);
      }

      // 卡片上角的小装饰
      &::after {
        content: '';
        position: absolute;
        right: 4px;
        top: 4px;
        width: 6px;
        height: 6px;
        border-top: 1px solid rgba(60, 227, 255, 0.6);
        border-right: 1px solid rgba(60, 227, 255, 0.6);
      }

      .card-label {
        font-family: Alibaba-PuHuiTi-2;
        font-size: 14px;
        color: #b9e8ff;
        letter-spacing: 0.5px;
      }

      .card-value {
        font-family: Helvetica-Bold, Helvetica;
        font-weight: bold;
        font-size: 20px;
        color: #3ce3ff;
        text-shadow: 0 0 10px rgba(60, 227, 255, 0.3);
        display: flex;
        align-items: baseline;

        .unit {
          font-family: Alibaba-PuHuiTi-2;
          font-size: 12px;
          color: #b9e8ff;
          margin-left: 4px;
          font-weight: normal;
        }

        .trend-up {
          color: #0fff99;
          font-size: 14px;
          margin-left: 6px;
          filter: drop-shadow(0 0 5px rgba(15, 255, 153, 0.4));
        }
      }
    }
  }

  .table-toolbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 12px;

    .search-box {
      display: flex;
      align-items: center;
    }
  }
}
</style>
