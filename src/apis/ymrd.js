import { request } from '@/axios'

/**
 * @description: 获取认定企业质量分析 - 核心指标看板
 * @param {Object} params { tier: '梯度编码' }
 */
export const getCoreMetrics = (params) => {
  return request('/api/business/ymrd-screen/quality-analysis/core-metrics', 'GET', params)
}

/**
 * @description: 获取认定企业质量分析 - 质量监测指标
 * @param {Object} params { tier: '梯度编码' }
 */
export const getMonitorMetrics = (params) => {
  return request('/api/business/ymrd-screen/quality-analysis/monitor-metrics', 'GET', params)
}

/**
 * @description: 获取认定企业质量分析 - 培育绩效完成进度
 * @param {Object} params { procType: '进度类型编码', tier: '梯度编码' }
 */
export const getPerformanceProgress = (params) => {
  return request('/api/business/ymrd-screen/quality-analysis/performance-progress', 'GET', params)
}
/**
 * @description: 趋势分析-企业认定和复核趋势分析
 * @param {Object} params { tier: '梯度编码' }
 */
export const getCertReivew = (params) => {
  return request('/api/business/ymrd-screen/trend/cert-review', 'GET', params)
}

/**
 * @description: 趋势分析-认定动态
 * @param {Object} params { tier: '梯度编码' }
 */
export const getCertDynamics = (params) => {
  return request('/api/business/ymrd-screen/trend/dynamics', 'GET', params || {})
}

/**
 * @description: 重点企业名单
 * @param {Object} params { tier: '梯度编码' }
 */
export const getkeyenterprises = () => {
  return request('/api/business/ymrd-screen/trend/key-enterprises', 'GET', {
    pageIndex: 1,
    pageSize: 100
  })
}
