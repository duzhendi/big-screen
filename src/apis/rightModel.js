/*
 * @Author: wangyu
 * @Date: 2025-12-05 21:43:31
 * @LastEditTime: 2025-12-07 10:51:32
 * @LastEditors: wangyu
 * @Description:
 * @FilePath: \tdpy-screen-dev\src\apis\rightModel.js
 */
import { request } from '@/axios'
export const getGraduateProcess = (params) => {
  return request('/api/business/gradientCultivation/getIndex', 'GET', params)
}

export const getEvent = (params) => {
  return request('/api/business/gradientCultivation/getEvent', 'GET', params)
}

export const getDemand = (params) => {
  return request('/api/business/gradientCultivation/getDemand', 'GET', params)
}

// 诊断赋能-培育诊断-分析报告数-培育诊断报告列表
export const getPortrayal = (params) => {
  return request('/api/business/gradientCultivation/portrayal', 'GET', params)
}

// 诊断赋能-质量诊断-诊断报告数-诊断报告数
export const getMapDetail = (params) => {
  return request('/api/business/enterprise/getQualityDiagnose', 'GET', params)
}

// 诊断赋能-管理诊断-诊断报告数-诊断报告数
export const getReportList = (params) => {
  return request('/api/business/enterprise/getManagerDiagnose', 'GET', params)
}

//小快轻表准企业列表
export const getSmallEnterprise = (params) => {
  return request('/api/business/enterprise/getSmallEnterprise', 'GET', params)
}
//支持企业表列表
export const getSupportEnterprise = (params) => {
  return request('/api/business/enterprise/getSupportEnterprise', 'GET', params)
}
//数字化诊断报告列表
export const getDigitalDiagnose = (params) => {
  return request('/api/business/enterprise/getDigitalDiagnose', 'GET', params)
}

//数字化诊断报告列表-真实数据
export const getDiagnose = (params) => {
  return request('/api/business/enterprise/getDiagnose', 'GET', params)
}

// 处理时效分析
export const getSlrhClsxfx = (params) => {
  return request('/api/business/enterprise/getSlrhClsxfx', 'GET', params)
}


