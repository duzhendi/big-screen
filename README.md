# 梯度培育 - 地图可视化模块

本项目使用 Vue 3 + ECharts 实现了一个交互式的海南省地图可视化大屏，主要用于展示梯度培育相关的企业数据分布。

## 技术栈
*   Vue 3
*   ECharts 5
*   Turf.js (地理空间计算)

## 目录结构
```
src/views/home/center/
├── index.vue                # 地图容器
├── mapUtils.js              # 地图工具函数
└── components/
    ├── FiveColorMap.vue     # 五色图组件
    └── ScatterMap.vue       # 散点图组件
```

