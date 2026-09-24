import { request } from '@/axios'

// 企业培育成果
export const getCultivationResult = (params) => {
  return request('/api/business/jsc-screen/cultivation-result', 'GET', params)
}

// 企业数据采集
export const getDataCollect = ({ findType, sourceType, year } = {}) => {
  return request('/api/business/jsc-screen/data-collect', 'GET', { findType, sourceType, year })
}

// 企业潜力挖掘与精准培育
export const getPotentialCultivation = (params) => {
  return request('/api/business/jsc-screen/potential-cultivation', 'GET', params)
}

// 企业建档与数据质量分析
export const getDataQuality = (params) => {
  return request('/api/business/jsc-screen/data-quality', 'GET', params)
}
//企业潜力挖掘与精准培育-潜力筛查企业分页列表
export const getPotentialScreeningList = (params) => {
  return request('/api/business/jsc-screen/potential-cultivation/enterprise-page', 'GET', params)
}
