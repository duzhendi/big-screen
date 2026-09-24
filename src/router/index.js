import { createRouter, createWebHashHistory } from 'vue-router'
import Routes from './routes'
import Store from '@/store'
// import { getRoleKeyItems } from "../apis/common.js";

const routes = Routes

const router = createRouter({
  history: createWebHashHistory(), // 若要加统一路由前缀 history: createWebHistory('xxx')
  routes
})
// const goLogin = () => {
//   localStorage.clear()
//   let LoginURL = import.meta.env.VITE_APP_LOGIN_URL
//   window.location.href = LoginURL
// }
// router.beforeEach(async to => {
//   // step 1. 获取token
//   // 检查路径中是否有带token
//   // 有则直接取用存到localStorage中，然后重定向去掉地址中的token
//   // 后续直接从locakStorage中取用token
//   let TOKEN = "";
//   if (to && to.query && to.query.token) {
//     TOKEN = to.query.token;
//     delete to.query.token;
//     localStorage.setItem("token", TOKEN);
//     router.replace({ path: to.path, query: to.query, params: to.params });
//     return false;
//   }
//   TOKEN = localStorage.getItem("token");
//   if (!TOKEN) {
//     // goLogin();
//     return false;
//   }
//   // step 2. 查询token是否有效
//   // 有效则继续
//   // 无效则跳转登陆
//   let response = await getRoleKeyItems()
//   if (response && response.data && response.data.code && response.data.code == 200) {
//     Store.commit("SET_ROLE_KEY_ITEMS", response.data.data);
//   } else {
//     // goLogin();
//     return false;
//   }
// });

export default router
