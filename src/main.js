/*
 * @Author: wangyu
 * @Date: 2025-12-04 22:40:57
 * @LastEditTime: 2025-12-05 20:49:23
 * @LastEditors: wangyu
 * @Description:
 * @FilePath: \tdpy-screen-dev\src\main.js
 */
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import ElementPlus from 'element-plus'
import zhCN from 'element-plus/dist/locale/zh-cn.mjs'
import 'virtual:uno.css'
import '@/assets/fonts/font.scss'
import '@/style/init.scss'
import vue3TreeOrg from 'vue3-tree-org'
import 'vue3-tree-org/lib/vue3-tree-org.css'
import 'echarts-gl'

const app = createApp(App)
app.use(vue3TreeOrg)

// element+ 全局国际化
app.use(ElementPlus, {
  locale: zhCN
})
app.use(store).use(router)
app.mount('#app')
