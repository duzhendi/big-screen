import { request } from '@/axios'

//获取左上数据采集的数据
export const getLeftTopData = (params) => {
  return request('/api/business/gradientCultivation/getIndex', 'GET', params)
}

//获取字典值
export const getDict = (params) => {
  return request('/api/business/gradientCultivation/getDict', 'GET', params)
}

// 获取认定环节数据
export const getGraduateProcess = (params) => {
  return request('/api/business/gradientCultivation/getGradientCultivationProcess', 'GET', params)
}
// 获取地图数据
export const getMapData = (params) => {
  return request('/api/business/enterprise/getEnterpriseIndex', 'GET', params)
}

// 获取区县信息
export const getAreaInfo = (params) => {
  return request('/api/business/gradientCultivation/getDept', 'GET', params)
}
// 获取数据采集列表数据
export const getDataCollectionList = (params) => {
  return request('/api/business/gradientCultivation/getCollectEnterprise', 'GET', params)
}

// 多部门联合数据补全
export const getEnterpriseFilingList = (params) => {
  return request('/api/business/enterprise/getFilingCollect', 'GET', params)
}
// 多部门联合推荐企业
export const getEnterpriseRecommendList = (params) => {
  return request('/api/business/enterprise/getFilingRecommend', 'GET', params)
}
// 获取认定库信息
export const getGraduateLibraryInfo = (params) => {
  return request('/api/business/enterprise/getIdentified', 'GET', params)
}
// 获取培育库信息
export const getNurturingLibraryInfo = (params) => {
  return request('/api/business/enterprise/getCultivate', 'GET', params)
}
// 获取33618详情
export const get33618Detail = (params) => {
  return request('/api/business/gradientCultivation/getEnterpriseClassify', 'GET', params)
}
// 地图详情接口
export const getMapDetail = (params) => {
  return request('/api/business/enterprise/getMapDetail', 'GET', params)
}
// 获取33618企业需求
export const get33618EnterpriseDemand = (params) => {
  return request('/api/business/gradientCultivation/getEnterpriseDemand', 'GET', params)
}

// 获取中间顶部企业列表
export const getCenterTopEnterpriseList = (params) => {
  return request('/api/business/gradientCultivation/portrayal', 'GET', params)
}

// 获取区县
export const getAreaList = (params) => {
  return request('/api/collect/region/listAdmin', 'GET', params)
}

// 获取中间顶部指标
export const getCenterTopIndex = (params) => {
  return request('/api/business/gradientCultivation/portrayalIndex', 'GET', params)
}
// 获取企业画像
export const getEnterprisePortrait = (params) => {
  return request('/api/business/gradientCultivation/portrayalById', 'GET', params)
}
// 获取企业画像-认定库
export const getEnterprisePortraitCult = (params) => {
  return request('/api/business/gradientCultivation/getPortrayalCultById', 'GET', params)
}
// 获取企业需求清单
export const getEnterpriseDemandList = (params) => {
  return request('/api/business/enterprise/getEnterpriseDemandRecord', 'GET', params)
}

// 三新一强-弹窗列表
export const getEnterpriseCapacityClassify = (params) => {
  return request('/api/business/enterprise/getEnterpriseCapacityClassify', 'GET', params)
}
// 企业详情接口
export const getEnterpriseDetail = (params) => {
  return request('/api/business/enterprise/getDemandEnterpriseDetail', 'GET', params)
}
// 处置流程接口
export const getDisposeProcess = (params) => {
  return request('/api/business/enterprise/getDemandProcessDetail', 'GET', params)
}

// 认定潜力企业滚动
export const getGraduateLibraryScroll = () => {
  return request('/api/business/enterprise/getRollEnterprise', 'GET', {
    dataNum: '12'
  })
}
// 企业基本信息-企业基本信息，核心指标
export const getEnterpriseBasicInfoAndCoreMetrics = (params) => {
  return request('/api/business/gradientCultivation/getJscEnterpriseInfoByCode', 'GET', params)
}
