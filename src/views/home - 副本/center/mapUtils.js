// 地图相关数据转换工具方法
// 将 chongqingGeoJson 和 cqZCGeoJson 转为 ECharts 可直接使用的 FeatureCollection

import * as turf from '@turf/turf';
import chongqingGeoJson from '@/assets/geoJson/chongqing.json';
import cqZCGeoJson from '@/assets/geoJson/cqZC.json';

// 主城区 code 集合（以 cqZC 的所有行政区为主城范围）
const CENTER_CODE_SET = new Set(cqZCGeoJson.map((item) => item.code));

// 两江新区（渝北 + 江北 + 原数据中的两江新区）code 集合
const LIANGJIANG_CODE_SET = new Set(['500112', '500105', '500251']); // 渝北区、江北区、两江新区

// 工具函数：使用 Turf.js 合并多个要素（消除公共边界）
const mergeFeaturesWithTurf = (featureList) => {
  if (!featureList || featureList.length === 0) return null;
  // 如果只有一个，直接返回其 geometry
  if (featureList.length === 1) return featureList[0].geometry;

  try {
    let merged = featureList[0];
    for (let i = 1; i < featureList.length; i++) {
      // turf.union 合并两个多边形，返回合并后的 Feature
      merged = turf.union(merged, featureList[i]);
    }
    return merged.geometry;
  } catch (e) {
    console.error('Turf 合并几何异常，降级为简单坐标合并：', e);
    // 降级方案：简单合并为 MultiPolygon
    const coordinates = [];
    featureList.forEach((f) => {
      const geo = f.geometry || {};
      if (geo.type === 'Polygon' && geo.coordinates) {
        coordinates.push(geo.coordinates);
      } else if (geo.type === 'MultiPolygon' && geo.coordinates) {
        coordinates.push(...geo.coordinates);
      }
    });
    return {
      type: 'MultiPolygon',
      coordinates,
    };
  }
};

/**
 * 将重庆市 geoJSON 转为 FeatureCollection：
 * - 所有主城（CENTER_CODE_SET 中的区）合并为一个「中心城区」要素
 */
export const buildChongqingGeoJSON = () => {
  const features = [];
  const centerFeatures = [];

  try {
    chongqingGeoJson.forEach((item) => {
      if (!item?.featureCollection?.features) return;

      const code = item.code;
      const isCenter = code && CENTER_CODE_SET.has(code);

      item.featureCollection.features.forEach((f) => {
        const baseFeature = {
          ...f,
          type: 'Feature',
          properties: {
            ...(f.properties || {}),
            name: item.name || f.properties?.name,
            adcode: code || f.properties?.code,
          },
        };

        if (isCenter) {
          centerFeatures.push(baseFeature);
        } else {
          features.push(baseFeature);
        }
      });
    });
  } catch (e) {
    console.error('buildChongqingGeoJSON 解析异常：', e);
  }

  // 合并主城区为一个中心城区
  if (centerFeatures.length) {
    const mergedGeometry = mergeFeaturesWithTurf(centerFeatures);
    // 计算中心点，用于绘制引导线
    let centerPoint = null;
    try {
      const centroid = turf.centerOfMass({ type: 'Feature', geometry: mergedGeometry });
      centerPoint = centroid.geometry.coordinates;
    } catch (e) {
      console.warn('计算中心点失败', e);
    }

    features.push({
      type: 'Feature',
      properties: {
        name: '中心城区',
        adcode: '5001',
        cp: centerPoint, // [lng, lat]
      },
      geometry: mergedGeometry,
    });
  }

  return {
    type: 'FeatureCollection',
    features,
  };
};

/**
 * 将主城 geoJSON（cqZCGeoJson）转为 FeatureCollection：
 * - 渝北区(500112) + 江北区(500105) 合并为「两江新区」
 * - 其他主城区保持原样
 */
export const buildCqZCGeoJSON = () => {
  const liangjiangFeatures = [];
  const features = [];

  try {
    cqZCGeoJson.forEach((item) => {
      if (!item?.featureCollection?.features) return;

      const code = item.code;
      const isLiangjiang = code && LIANGJIANG_CODE_SET.has(code);

      item.featureCollection.features.forEach((f) => {
        const baseFeature = {
          ...f,
          type: 'Feature',
          properties: {
            ...(f.properties || {}),
            name: isLiangjiang ? '两江新区' : (item.name || f.properties?.name),
            adcode: code || f.properties?.code,
          },
        };

        if (isLiangjiang) {
          liangjiangFeatures.push(baseFeature);
        } else {
          features.push(baseFeature);
        }
      });
    });
  } catch (e) {
    console.error('buildCqZCGeoJSON 解析异常：', e);
  }

  // 合并两江新区（渝北 + 江北）为一个 MultiPolygon
  if (liangjiangFeatures.length) {
    const mergedGeometry = mergeFeaturesWithTurf(liangjiangFeatures);
    features.push({
      type: 'Feature',
      properties: {
        name: '两江新区',
        adcode: '5002',
      },
      geometry: mergedGeometry,
    });
  }

  return {
    type: 'FeatureCollection',
    features,
  };
};

/**
 * 动态更新引导线位置
 * @param {Object} chartInstance ECharts 实例
 * @param {Object} chartDom 图表 DOM 容器
 * @param {Object} geoJSON 全市 GeoJSON 数据
 * @param {Object} options 配置参数
 * @param {number} options.rectWidth 小地图矩形宽度
 * @param {number} options.rectHeight 小地图矩形高度
 * @param {number} options.rectLeftPercent 小地图左侧百分比 (e.g. 0.30 for 30%)
 * @param {number} options.rectTopPercent 小地图顶部百分比 (e.g. 0.01 for 1%)
 */
export const updateGuideLine = (chartInstance, chartDom, geoJSON, options = {}) => {
  if (!chartInstance || !chartDom) return;

  // 默认配置
  const {
    rectWidth = 153,
    rectHeight = 231,
    rectLeftPercent = 0.30,
    rectTopPercent = 0.01
  } = options;

  // 1. 获取中心城区经纬度 (从 properties.cp 中拿，或者硬编码备用)
  let centerLngLat = [106.55, 29.56]; // 默认值：渝中区附近

  // 尝试从 geoJSON 中找 cp
  if (geoJSON && geoJSON.features) {
    const centerFeature = geoJSON.features.find(f => f.properties.name === '中心城区');
    if (centerFeature && centerFeature.properties.cp) {
      centerLngLat = centerFeature.properties.cp;
    }
  }

  // 2. 转换为全局像素坐标
  // geoIndex: 1 对应交互层
  const endPixel = chartInstance.convertToPixel({ geoIndex: 1 }, centerLngLat);
  if (!endPixel) return;

  // 3. 计算 Group 的位置 (相对于容器左上角的像素偏移)
  const width = chartDom.offsetWidth;
  const height = chartDom.offsetHeight;
  const groupX = width * rectLeftPercent;
  const groupY = height * rectTopPercent;

  // 4. 计算相对坐标 (相对于 Group 内部)
  
  // 起点：矩形底部边框的中心点
  const startRelX = rectWidth / 2;
  const startRelY = rectHeight;

  // 终点：全局像素 - Group偏移
  const endRelX = endPixel[0] - groupX;
  const endRelY = endPixel[1] - groupY;

  // 增加一个中间拐点，使线条更自然 (垂直向下延伸一段距离再折向目标)
  const midRelX = (startRelX + endRelX) * 0.5;
  const midRelY = startRelY + 20; // 向下延伸 20px

  chartInstance.setOption({
    graphic: [
      {
        // 必须指定 id 来更新特定的 graphic group
        id: 'map-guide-group',
        children: [
          {
            // 这里的 rect 必须占位，否则可能会被重置，但我们主要更新 line
            id: 'map-guide-line',
            type: 'polyline',
            shape: {
              points: [
                [startRelX, startRelY],
                // [startRelX, midRelY], // 可选：先垂直向下
                [midRelX, midRelY],   // 斜向过渡
                [endRelX, endRelY]
              ]
            }
          }
        ]
      }
    ]
  });
};

/**
 * 基于已标准化的 FeatureCollection，合并指定的中心城区子区为一个“中心城区”要素
 * @param {Object} geoJSON 标准的 FeatureCollection
 * @param {Array<string>} centerCityNames 需要合并的子区名称列表
 * @returns {Object} 新的 FeatureCollection
 */
export const mergeCenterCityInGeoJSON = (geoJSON, centerCityNames) => {
  if (!geoJSON || !geoJSON.features) return geoJSON;

  const features = [];
  const centerFeatures = [];
  const centerNameSet = new Set(centerCityNames);

  geoJSON.features.forEach((f) => {
    const name = f.properties?.name;
    if (name && centerNameSet.has(name)) {
      centerFeatures.push(f);
    } else {
      features.push(f);
    }
  });

  if (centerFeatures.length > 0) {
    const mergedGeometry = mergeFeaturesWithTurf(centerFeatures);
    
    let centerPoint = [106.55, 29.56]; // 默认值：渝中区附近
    try {
      const centroid = turf.centerOfMass({ type: 'Feature', geometry: mergedGeometry });
      if (centroid && centroid.geometry && centroid.geometry.coordinates) {
        centerPoint = centroid.geometry.coordinates;
      }
    } catch (e) {
      console.warn('计算中心城区中心点失败', e);
    }

    features.push({
      type: 'Feature',
      properties: {
        name: '中心城区',
        adcode: '5001',
        cp: centerPoint,
      },
      geometry: mergedGeometry,
    });
  }

  return {
    ...geoJSON,
    features,
  };
};


