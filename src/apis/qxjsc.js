import { request } from '@/axios'

// 认定环节
// 入参：dist 区县编码
// 返回字段：dist 区县编码，flowNm 流程名称，distAuditPubPd 区县审核公示期，distPass 区县审核通过企业数，distReject 区县审核未通过企业数，entDeclPd 企业申报期，entDeclNotice 通知企业数，entDeclApply 申报企业数
export const getCertificationStage = (params) => {
  return request('/api/business/district-screen/certification-stage', 'GET', params)
}

// 培育目标与成果
// 入参：dist 区县编码，tier 梯度编码
// 返回字段：dist 区县编码，tier 梯度编码，accCultCnt 累计培育数，cultTargetCnt 培育目标数，recomCnt 推荐数，cultCnt 完成认定数，targetCompPct 目标完成率
export const getCultivationTargetResult = (params) => {
  return request('/api/business/district-screen/cultivation-target-result', 'GET', params)
}

// 培优赋能-诊断赋能
// 入参：dist 区县编码
// 返回字段：dist 区县编码，diagTyp 诊断类型（1 培育诊断，2 质量诊断，3 管理诊断，4 数字化赋能），idxId 指标编码，idxNm 指标名称，idxVal 指标值，unit 单位，valueType/idxTyp 值类型（number/text/percent）
export const getDiagnosticEmpowerment = (params) => {
  return request('/api/business/district-screen/diagnostic-empowerment', 'GET', params)
}

// 动态监测-黑名单
// 入参：dist 区县编码
// 返回字段：dist 区县编码，uniScId 统一社会信用代码，entNm 企业名称，blkListTyp 黑名单类型，blkListTypCd 黑名单类型编码（1 失信被执行人，2 经营异常，3 严重违法失信，4 重大税收违法），inBlkListDt 入黑名单日期，stat 状态
export const getDynamicMonitoringBlacklist = (params) => {
  return request('/api/business/district-screen/dynamic-monitoring-blacklist', 'GET', params)
}

// 动态监测
// 入参：dist 区县编码
// 返回字段：dist 区县编码，rskListTyp 风险名单类型，cnt 数量，pct 占比
export const getDynamicMonitoringLedger = (params) => {
  return request('/api/business/district-screen/dynamic-monitoring-ledger', 'GET', params)
}

// 培优赋能-赋能服务
// 入参：dist 区县编码
// 返回字段：dist 区县编码，servNm 服务名称，servDesc 服务描述，servCnt 服务次数
export const getEmpowermentService = (params) => {
  return request('/api/business/district-screen/empowerment-service', 'GET', params)
}

// 企业数据采集
// 入参：dist 区县编码
// 返回字段：dist 区县编码，idxId 指标编码，idxNm 指标名称，idxVal 指标值，unit 单位
export const getEnterpriseDataCollect = (params) => {
  return request('/api/business/district-screen/enterprise-data-collect', 'GET', params)
}

// 分层分类详情
// 入参：dist 区县编码，tier 梯度编码
// 返回字段：dist 区县编码，tier 梯度编码，certCnt 认定潜力库数量，cultCnt 培育潜力库数量，othCnt 其他数量
export const getEnterpriseTierDetail = (params) => {
  return request('/api/business/district-screen/enterprise-tier-detail', 'GET', params)
}

// 培优赋能-重点培育企业
// 入参：dist 区县编码，tier 梯度编码
// 返回字段：dist 区县编码，tier 梯度编码，uniScId 统一社会信用代码，entNm 企业名称，entDesc 企业描述，mainRevenue 主营业务收入，totalAssets 资产总额，rdStaffCnt 研发人员数，ip1Cnt 知识产权数
export const getKeyCultivationEnterprise = (params) => {
  return request('/api/business/district-screen/key-cultivation-enterprise', 'GET', params)
}

// 各区县优质中小企业数量排名TOP5
// 入参：dist 区县编码，tier 梯度编码
// 返回字段：distNm 区县名称，tier 梯度编码，rank 排名，entCnt 企业数量，pct 占比
export const getQualityEnterpriseTop5 = (params) => {
  return request('/api/business/district-screen/quality-enterprise-top5', 'GET', params)
}

// 趋势分析
// 入参：dist 区县编码，tier 梯度编码
// 返回字段：dist 区县编码，tier 梯度编码，stattYr 统计年份，certEntCnt 认定企业数，reviewEntCnt 复核企业数，certPassPct 认定通过率，reviewPassCnt 复核通过数
export const getTrendAnalysis = (params) => {
  return request('/api/business/district-screen/trend-analysis', 'GET', params)
}
