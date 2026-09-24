<template>
  <CommonDialog
    v-model:visible="dialogVisible"
    :title="batchTitle"
    width="1000px"
    height="700px"
  >
    <div class="three-new-dialog">
      <div class="dialog-search-bar">
        <div class="filters">
          <div class="filter-item">
            <span>企业名称：</span>
            <CommonInput
              v-model="queryParams.enterpriseName"
              placeholder="请输入企业名称"
              @search="handleSearch"
              style="width: 160px"
            />
          </div>
          <CommonButton @click="handleSearch" type="primary" style="margin-left: 10px">搜索</CommonButton>
        </div>
      </div>

      <div class="table-container">
        <CommonTable :columns="columns" :data="tableData" :loading="loading">
          <template #action="{ row }">
            <el-button
              :disabled="
                row.enterpriseName !== '重庆宗申航空发动机制造股份有限公司' &&
                row.enterpriseName !== '重庆天箭惯性科技股份有限公司'
              "
              type="text"
              class="action-btn"
              @click="handleViewDetail(row)"
              >查看推荐计划</el-button
            >
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

    <!-- 推荐计划详情弹窗 -->
    <CommonDialog v-model:visible="detailVisible" :title="detailTitle" width="1200px" height="800px">
      <div class="plan-detail-container">
        <img :src="currentPlanImg" alt="推荐计划详情" class="plan-img" />
      </div>
    </CommonDialog>
  </CommonDialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CommonDialog from '@/components/common-dialog.vue'
import CommonTable from '@/components/common-table.vue'
import CommonPagination from '@/components/common-pagination.vue'
import CommonInput from '@/components/common-input.vue'
import CommonButton from '@/components/common-button.vue'
import { getAreaList } from '@/apis/index'
import imgBatch1 from '@/assets/images/right/三新一强-第一批.png'
import imgBatch2 from '@/assets/images/right/三新一强-第二批.png'
import { getEnterpriseCapacityClassify } from '@/apis/index.js'
import { da } from 'element-plus/es/locales.mjs'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  batch: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:visible'])

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
})

const batchTitle = computed(() => {
  if (props.batch === 1) return '三新一强第一批列表'
  if (props.batch === 2) return '三新一强第二批列表'
  return '三新一强第三批列表'
})

const loading = ref(false)
const total = ref(0)
const queryParams = ref({
  registeredRegion: '',
  pageIndex: 1,
  pageSize: 10
})

const areaOptions = ref([])

const columns = [
  { label: '序号', type: 'index', width: '80px', align: 'center' },
  { label: '企业名称', prop: 'enterpriseName', align: 'left' },
  { label: '投资总额（万元）', prop: 'totalInvest', width: '150px', align: 'center' },
  { label: '推荐计划', prop: 'planName', align: 'left' },
  { label: '操作', prop: 'action', width: '120px', align: 'center' }
]

// 模拟数据
const allData = [
  {
    enterpriseName: '重庆宗申航空发动机制造股份有限公司',
    money: '600',
    plan: '高性能航空重油活塞发动机研发及产业化推进计划',
    batch: 1
  },
  {
    enterpriseName: '重庆鑫景特种玻璃有限公司',
    money: '600',
    plan: '鑫景特种高强度耐摔玻璃研发及产业化项目',
    batch: 1
  },
  {
    enterpriseName: '宝武特冶航研科技有限公司',
    money: '600',
    plan: '航空航天等重大装备用高性能特种钢及合金研发与配套能力提升',
    batch: 1
  },
  {
    enterpriseName: '重庆机床（集团）有限责任公司',
    money: '600',
    plan: '高精度齿轮磨削装备研发',
    batch: 1
  },
  {
    enterpriseName: '重庆川仪十七厂有限公司',
    money: '600',
    plan: '高端装备电加热器及温度仪表科创赋能高质量发展“三新一强”实施计划',
    batch: 1
  },
  {
    enterpriseName: '重庆通用工业（集团）有限责任公司',
    money: '600',
    plan: '集成式磁悬浮变频离心冷水（热泵）机组关键技术研究及产业化项目',
    batch: 2
  },
  {
    enterpriseName: '重庆美的通用制冷设备有限公司',
    money: '600',
    plan: '鲲禹新一代磁悬浮压缩机研发及产业化应用',
    batch: 2
  },
  {
    enterpriseName: '重庆鑫源农机股份有限公司',
    money: '600',
    plan: '高适应性丘陵地区耕作机械研制及产业化',
    batch: 2
  },
  {
    enterpriseName: '北斗智联科技有限公司',
    money: '600',
    plan: '北斗赋能汽车跨域融合发展的推进计划',
    batch: 2
  },
  {
    enterpriseName: '重庆智展齿轮传动有限公司',
    money: '600',
    plan: '压缩机储能用高速重载齿轮箱及液体火箭发动机涡轮泵关键技术攻关及产业化',
    batch: 2
  }
]

// const tableData = computed(() => {
//   return allData.filter((item) => item.batch === props.batch)
// })

const tableData = ref([])

const handleSearch = () => {
  queryParams.value.pageIndex = 1
  fetchData()
}

const handlePageChange = (page) => {
  queryParams.value.pageIndex = page
  fetchData()
}

const fetchData = async () => {
  loading.value = true

  const { data } = await getEnterpriseCapacityClassify({
    ...queryParams.value,
    dataBatch: props.batch
  })
  loading.value = false

  if (data && data.data) {
    console.log(data.data, '弹窗列表')

    const { list, totalCount } = data.data
    tableData.value = list ?? []
    total.value = totalCount ?? 0
  } else {
    tableData.value = []
    total.value = 0
  }
}

// 详情查看
const detailVisible = ref(false)
const detailTitle = ref('')
const currentPlanImg = ref('')

const handleViewDetail = (row) => {
  detailTitle.value = row.enterpriseName
  currentPlanImg.value = props.batch === 2 ? imgBatch2 : imgBatch1
  detailVisible.value = true
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
  fetchData()
})
</script>

<style lang="scss" scoped>
.three-new-dialog {
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
    font-family: Alibaba-PuHuiTi-2;
    &:hover {
      color: #ffffff;
    }
  }
}

.plan-detail-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;

  .plan-img {
    max-width: 100%;
    height: auto;
  }
}
</style>
