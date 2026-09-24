# tdpy-screen 项目 Agent 规范

本文件是 `tdpy-screen` 项目级规范，优先级高于全局 `AGENTS.md`。若当前对话有更明确要求，以当前对话为准。

## 1. 项目定位

- 本项目是大屏可视化项目，默认按 1920 × 1080 大屏适配思路开发。
- 页面应优先保持信息密度、视觉一致性、稳定布局与可读性，不做无关的营销化页面设计。
- 新增页面、子屏、组件时，优先参考 `src/views/home`、`src/views/tdxz`、`src/views/ymrd`、`src/views/pyfn` 的现有结构与风格。

## 2. 技术栈与工具

已从配置文件确认：

- 框架：Vue 3.5 + Vite 6
- 语言：JavaScript、Vue SFC
- 路由与状态：vue-router 4、vuex 4
- UI 与组件辅助：Element Plus、unplugin-auto-import、unplugin-vue-components
- 图表与可视化：ECharts、@turf/turf、vue3-tree-org
- 样式：SCSS，项目已配置 `sass-embedded`
- 构建兼容：`@vitejs/plugin-legacy`、Babel、vite-plugin-compression
- 常用脚本：`npm run dev`、`npm run lint`、`npm run build`

包管理文件同时存在 `package-lock.json`、`yarn.lock`、`pnpm-lock.yaml`。除非用户明确要求，不主动安装、升级或切换包管理器。

团队协作应在 `package.json` 中通过 `volta` 字段固定 Node.js 与包管理器版本，避免不同成员本地环境不一致。新增或调整 Volta 版本前，应先确认团队约定版本。

## 3. 语言与文件约束

- 本项目使用 JavaScript，不新增 TypeScript 文件，不新增 `<script setup lang="ts">`。
- 新建 `.vue` 文件统一使用以下顺序：

```vue
<template>
  ...
</template>

<script setup>
...
</script>

<style lang="scss" scoped>
...
</style>
```

- 若维护旧文件，除非任务需要，不做大范围格式迁移。
- 新增代码优先使用 `Composition API` 与 `<script setup>`。
- 保持项目格式约定：2 空格缩进、单引号、不强制分号、单行宽度约 120、尾随逗号按现有 Prettier 配置处理。

## 4. 样式规范

- 新增或重构样式统一使用 SCSS：`<style lang="scss" scoped>`。
- 样式应根据 DOM 结构使用嵌套写法，例如：

```scss
.container {
  .box1 {
    .bar1 {
    }
  }

  .box2 {
  }
}
```

- 避免过深嵌套。若层级过深，优先拆组件或提取清晰的 class。
- 大屏布局要避免内容溢出、遮挡、抖动；固定格式元素应明确宽高、比例或 flex/grid 约束。
- 不随意引入新的全局样式、主题色体系或第三方样式库。

## 5. 组件复用

- 公用组件位于 `src/components`，新增功能前先检查是否可复用。
- 标题组件位于 `src/components/titles`：
  - `first-title.vue`：一级标题
  - `second-title.vue`：二级标题
  - `third-title.vue`：三级标题
  - `four-title.vue`：四级标题
- 常用通用组件包括：
  - `common-button.vue`
  - `common-dialog.vue`
  - `common-input.vue`
  - `common-pagination.vue`
  - `common-select.vue`
  - `common-table.vue`
  - `drill-header.vue`
  - `scale-box.vue`
  - `top-header.vue`
  - `top-select.vue`
- 有可直接复用的公用组件时，优先引用公用组件实现，不重复造相同能力。

## 6. 视图与目录约定

- 页面放在 `src/views` 下，每个子屏独立文件夹。
- 子屏若采用左中右布局，优先使用：

```text
src/views/<screen>/
├── index.vue
├── left/
│   └── index.vue
├── center/
│   └── index.vue
└── right/
    └── index.vue
```

- `index.vue` 负责集成页面主结构，左右中各目录负责各自区域内容。
- 子屏需要直接访问时，在 `src/router/routes.js` 中注册路由，并设置合适的 `meta.title` 与 `isShowHeader`。

## 7. 数据与接口

- API 调用优先放在 `src/apis` 下，按业务模块拆分。
- 未明确接口前，可以先使用 mock 数据占位；mock 数据应保持局部化，便于后续替换。
- 不在组件里硬编码难以替换的大段业务映射；复杂映射优先抽成常量或局部方法。

## 8. 变更与验证

- 优先做最小增量修改，不做无关重构。
- 每次任务改动后，不默认执行 `build` 构建；本项目通常本地运行 `pnpm dev`，通过 Vite 热更新实时查看页面效果。
- 修改后根据影响范围选择验证；需要静态检查时优先运行 `npm run lint`，只有用户明确要求或需要排查构建问题时才运行 `npm run build`。
- 构建中的既有体积告警、Browserslist 过期提示不等同于本次改动失败；需要在结果中说明。
- 不主动执行安装依赖、删除文件、改写 Git 历史、强推、清空构建产物等高风险操作。

## 9. 任务日志

- 项目内开发任务应追加记录到 `logs/agent-task-log.md`。
- 日志只追加，不覆盖历史。
- 纯咨询或非项目任务不记录日志。
