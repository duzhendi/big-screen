import { createStore } from 'vuex'
import global from './modules'
import label from './modules/label'

export default createStore({
  // 全局模块
  ...global,
  // 局部模块
  modules: {
    label
  },
})
