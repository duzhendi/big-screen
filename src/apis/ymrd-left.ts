import { request } from '@/axios'

/**
 * 流程批次选项类型
 */
export interface FlowBatchOption {
  /** 批次名称 */
  batchName?: string
  /** 梯度编码 */
  tier?: string
  /** 梯度名称 */
  tierName?: string
}

/**
 * 流程批次选项响应类型
 */
export interface FlowBatchOptionResponse {
  /** 返回代码 */
  code?: number
  /** 流程批次选项列表 */
  data?: FlowBatchOption[]
  /** 返回信息 */
  message?: string
}

/**
 * 流程批次选项请求参数类型
 */
export interface GetFlowBatchOptionsParams {
  /** 梯度编码 */
  tier?: string
}

/**
 * @description: 获取流程批次选项列表
 * @param {GetFlowBatchOptionsParams} params 请求参数
 * @returns {Promise<FlowBatchOptionResponse>} 流程批次选项列表
 */
export const getFlowBatchOptions = (params?: GetFlowBatchOptionsParams) => {
  return request('/api/business/ymrd-screen/process/batch-options', 'GET', params) as Promise<FlowBatchOptionResponse>
}

/**
 * 流程节点请求参数类型
 */
export interface GetFlowNodeParams {
  /** 批次名称 */
  batchName?: string
  /** 梯度编码 */
  tier?: string
  /** 流程类型 */
  procTyp?: string
}

/**
 * 流程节点类型
 */
export interface FlowNodeItem {
  /** 批次名称 */
  batchName?: string
  /** 数量 */
  cnt?: number
  /** 流程节点名称 */
  procNodeName?: string
  /** 排序 */
  sortOrder?: number
  /** 梯度编码 */
  tier?: string
  /** 梯度名称 */
  tierName?: string
}

/**
 * 流程节点响应类型
 */
export interface FlowNodeResponse {
  /** 返回代码 */
  code?: number
  /** 流程节点列表 */
  data?: FlowNodeItem[]
  /** 返回信息 */
  message?: string
}

/**
 * @description: 获取流程节点列表
 * @param {GetFlowNodeParams} params 请求参数
 * @returns {Promise<FlowNodeResponse>} 流程节点列表
 */
export const getFlowNodes = (params?: GetFlowNodeParams) => {
  return request('/api/business/ymrd-screen/process/nodes', 'GET', params) as Promise<FlowNodeResponse>
}

/**
 * 流程通过率请求参数类型
 */
export interface GetFlowPassRateParams {
  /** 批次名称 */
  batchName?: string
  /** 梯度编码 */
  tier?: string
  /** 流程类型 */
  procTyp?: string
}

/**
 * 流程通过率类型
 */
export interface FlowPassRate {
  /** 批次名称 */
  batchName?: string
  /** 企业通过率 */
  entPassPct?: number
  /** 梯度编码 */
  tier?: string
  /** 梯度名称 */
  tierName?: string
  /** 同比 */
  yoy?: number
}

/**
 * 流程通过率响应类型
 */
export interface FlowPassRateResponse {
  /** 返回代码 */
  code?: number
  /** 流程通过率数据 */
  data?: FlowPassRate
  /** 返回信息 */
  message?: string
}

/**
 * @description: 获取流程通过率
 * @param {GetFlowPassRateParams} params 请求参数
 * @returns {Promise<FlowPassRateResponse>} 流程通过率
 */
export const getFlowPassRate = (params?: GetFlowPassRateParams) => {
  return request('/api/business/ymrd-screen/process/pass-rate', 'GET', params) as Promise<FlowPassRateResponse>
}

/**
 * 动态管理风险指标类型
 */
export interface RiskMetricItem {
  /** 指标编号 */
  idxId?: string
  /** 指标名称 */
  idxName?: string
  /** 指标值 */
  idxVal?: number
  /** 单位 */
  unit?: string
}

/**
 * 动态管理风险占比类型
 */
export interface RiskProportionItem {
  /** 数量 */
  cnt?: number
  /** 占比 */
  pct?: number
  /** 风险类型 */
  riskType?: string
}

/**
 * 动态管理风险趋势类型
 */
export interface RiskTrendItem {
  /** 数量 */
  cnt?: number
  /** 统计月份 */
  statMonth?: string
  /** 同比 */
  yoy?: number
}

/**
 * 企业培育监测总览类型
 */
export interface CultivationMonitorOverview {
  /** 动态管理风险数指标 */
  riskMetricList?: RiskMetricItem[]
  /** 动态管理风险数占比 */
  riskProportionList?: RiskProportionItem[]
  /** 动态管理风险趋势 */
  riskTrendList?: RiskTrendItem[]
}

/**
 * 企业培育监测总览响应类型
 */
export interface CultivationMonitorResponse {
  /** 返回代码 */
  code?: number
  /** 企业培育监测总览 */
  data?: CultivationMonitorOverview
  /** 返回信息 */
  message?: string
}

/**
 * 企业培育监测总览请求参数类型
 */
export interface GetCultivationMonitorParams {
  /** 梯度编码 */
  tier?: string
}

/**
 * @description: 获取企业培育监测总览
 * @param {GetCultivationMonitorParams} params 请求参数
 * @returns {Promise<CultivationMonitorResponse>} 企业培育监测总览
 */
export const getCultivationMonitor = (params?: GetCultivationMonitorParams) => {
  return request(
    '/api/business/ymrd-screen/cultivation-monitor/overview',
    'GET',
    params
  ) as Promise<CultivationMonitorResponse>
}

/**
 * 企业培育监测黑名单类型
 */
export interface BlacklistItem {
  /** 黑名单类型 */
  blacklistType?: string
  /** 企业名称 */
  enterpriseName?: string
  /** 进入黑名单日期 */
  inBlacklistDate?: string
  /** 统一社会信用代码 */
  unifiedSocialCreditCode?: string
  /** 状态 */
  stat?: string
}

/**
 * 企业培育监测黑名单响应类型
 */
export interface BlacklistResponse {
  /** 返回代码 */
  code?: number
  /** 黑名单列表 */
  data?: BlacklistItem[]
  /** 返回信息 */
  message?: string
}

/**
 * 企业培育监测黑名单请求参数类型
 */
export interface GetBlacklistParams {
  /** 梯度编码 */
  tier?: string
}

/**
 * @description: 获取企业培育监测黑名单
 * @param {GetBlacklistParams} params 请求参数
 * @returns {Promise<BlacklistResponse>} 黑名单列表
 */
export const getBlacklist = (params?: GetBlacklistParams) => {
  return request('/api/business/ymrd-screen/cultivation-monitor/blacklist', 'GET', params) as Promise<BlacklistResponse>
}

/**
 * 流程企业分页列表项类型
 */
export interface FlowEnterpriseItem {
  /** 批次名称 */
  batchName?: string
  /** 企业名称 */
  entName?: string
  /** 流程节点名称 */
  procNodeName?: string
  /** 报告ID */
  rptId?: number
  /** 排序 */
  sortOrder?: number
  /** 梯度编码 */
  tier?: string
  /** 梯度名称 */
  tierName?: string
  /** 统一社会信用代码 */
  uniScId?: string
}

/**
 * 流程企业分页列表响应类型
 */
export interface FlowEnterprisePageResponse {
  /** 返回代码 */
  code?: number
  /** 分页数据 */
  data?: {
    /** 返回代码 */
    code?: number
    /** 当前页数 */
    currPage?: number
    /** 列表数据 */
    list?: FlowEnterpriseItem[]
    /** 每页数 */
    pageSize?: number
    /** 总记录数 */
    totalCount?: number
    /** 总页数 */
    totalPage?: number
  }
  /** 返回信息 */
  message?: string
}

/**
 * 流程企业分页列表请求参数类型
 */
export interface GetFlowEnterprisePageParams {
  /** 企业名称 */
  entName?: string
  /** 当前页 */
  pageIndex?: number
  /** 每页数 */
  pageSize?: number
  /** 流程节点名称 */
  procNodeNm?: string
  /** 梯度编码 */
  tier?: string
  /** 流程类型 */
  procTyp?: string
}

/**
 * @description: 获取流程企业分页列表
 * @param {GetFlowEnterprisePageParams} params 请求参数
 * @returns {Promise<FlowEnterprisePageResponse>} 流程企业分页列表
 */
export const getFlowEnterprisePage = (params?: GetFlowEnterprisePageParams) => {
  return request(
    '/api/business/ymrd-screen/process/enterprise-page',
    'GET',
    params
  ) as Promise<FlowEnterprisePageResponse>
}
