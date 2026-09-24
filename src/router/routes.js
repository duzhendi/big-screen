const Routes = [
  {
    path: '/',
    name: 'origin',
    redirect: '/layout/index'
  },
  {
    path: '/layout',
    component: () => import('@/views/layout/index'),
    redirect: '/layout/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/home/index'),
        name: 'home',
        meta: { title: '首页' }
      },
      {
        path: 'fully-insured',
        component: () => import('@/views/fully-insured/index'),
        name: 'fully-insured',
        meta: { title: '全民参保' }
      },
      {
        path: 'remote-service',
        component: () => import('@/views/remote-service/index'),
        name: 'ycfw',
        meta: { title: '远程服务' }
      },
      {
        path: 'msjx',
        component: () => import('@/views/msjx/index'),
        name: 'msjx',
        meta: { title: '免申即享' }
      },
      {
        path: 'public-service',
        component: () => import('@/views/public-service/index'),
        name: 'public-service',
        meta: { title: '公共服务平台运行情况' }
      },
      {
        path: 'comprehensive-business',
        component: () => import('@/views/comprehensive-business/index'),
        name: 'zhyw',
        meta: { title: '综合业务' }
      },
      {
        path: 'sb-fund',
        component: () => import('@/views/sb-fund/index'),
        name: 'sbjj',
        meta: { title: '社保基金' }
      },
      {
        path: 'occupational-annuity',
        component: () => import('@/views/occupational-annuity/index'),
        name: 'zynj',
        meta: { title: '职业年金' }
      },
      {
        path: 'comprehensive-counter',
        component: () => import('@/views/comprehensive-counter/index'),
        name: 'zgsx',
        meta: { title: '综柜事项' }
      },
      {
        path: 'check-report',
        component: () => import('@/views/check-report/index'),
        name: 'check-report',
        meta: { title: '校验报表' }
      },
      // {
      //   path: 'detail',
      //   component: () => import('@/views/views/detail/index'),
      //   name: 'detail',
      //   meta: { title: '海南省总体安全态势'}
      // },
      // {
      //   path: 'data',
      //   component: () => import('@/views/views/dataItem/index'),
      //   name: 'data',
      //   meta: { title: '海南省领域安全态势'}
      // },
    ]
  }
]

export default Routes