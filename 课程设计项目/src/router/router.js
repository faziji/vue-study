import Home from '@/views/Home.vue'

export const routerMap = [
  {
    path: '/home',
    component: () => import('_v/LayOut.vue'),
    name: 'home',
    meta: {
      icon: 'md-home',
      title: '首页'
    },
    children: [
      {
        path: 'home_index',
        name: 'home_index',
        meta: {
          icon: 'ios-arrow-forward',
          title: '关于系统'
        },
        component: Home
      },
      {
        path: 'counter',
        name: 'counter',
        meta: {
          icon: 'ios-arrow-forward',
          title: '收银台'
        },
        component: () => import('_v/counter/counter.vue')
      }
    ]
  },
  {
    path: '/money',
    component: () => import('_v/LayOut.vue'),
    name: 'money',
    meta: {
      icon: 'md-pie',
      title: '资金管理'
    },
    children: [
      {
        path: 'moneyAnalyse',
        name: 'moneyAnalyse',
        meta: {
          icon: 'ios-arrow-forward',
          title: '资金分析'
        },
        component: () => import('_v/table.vue')
      }, {
        path: 'moneySearch',
        name: 'moneySearch',
        meta: {
          icon: 'ios-arrow-forward',
          title: '资金查询'
        },
        component: () => import('_v/table.vue')
      }
    ]
  },
  {
    path: '/product',
    component: () => import('_v/LayOut.vue'),
    name: 'product',
    meta: {
      icon: 'md-cube',
      title: '商品管理'
    },
    children: [
      {
        path: 'productManage',
        name: 'productManage',
        meta: {
          icon: 'ios-arrow-forward',
          title: '商品列表'
        },
        component: () => import('_v/product/productManage.vue')
      }, {
        path: 'productAdd',
        name: 'productAdd',
        meta: {
          icon: 'ios-arrow-forward',
          title: '新添商品'
        },
        component: () => import('_v/product/productAdd.vue')
      }
    ]
  },
  {
    path: '/会员管理',
    component: () => import('_v/LayOut.vue'),
    name: 'vip',
    meta: {
      icon: 'logo-vimeo',
      title: '会员管理'
    },
    children: [
      {
        path: 'vipManage',
        name: 'vipManage',
        meta: {
          icon: 'ios-arrow-forward',
          title: '编辑会员'
        },
        component: () => import('_v/table.vue')
      }, {
        path: 'vipAdd',
        name: 'vipAdd',
        meta: {
          icon: 'ios-arrow-forward',
          title: '新添会员'
        },
        component: () => import('_v/vip/vipAdd.vue')
      }
    ]
  },
  {
    path: '/manager',
    component: () => import('_v/LayOut.vue'),
    name: 'manager',
    meta: {
      icon: 'md-contact',
      title: '管理员管理'
    },
    children: [
      {
        path: 'managerManage',
        name: 'managerManage',
        meta: {
          icon: 'ios-arrow-forward',
          title: '管理员列表'
        },
        component: () => import('_v/manager/managerList.vue')
      }, {
        path: 'managerAdd',
        name: 'managerAdd',
        meta: {
          icon: 'ios-arrow-forward',
          title: '新添管理员'
        },
        component: () => import('_v/manager/managerAdd.vue')
      }
    ]
  },
  {
    path: '/order',
    component: () => import('_v/LayOut.vue'),
    name: 'order',
    meta: {
      icon: 'ios-list-box',
      title: '订单管理'
    },
    children: [
      {
        path: 'orderManage',
        name: 'orderManage',
        meta: {
          icon: 'ios-arrow-forward',
          title: '查看订单'
        },
        component: () => import('_v/table.vue')
      }
    ]
  },
  {
    path: '/Test',
    component: () => import('_v/LayOut.vue'),
    name: 'Test',
    meta: {
      icon: 'ios-build',
      title: '测试'
    },
    children: [
      {
        meta: {
          icon: 'ios-arrow-forward',
          title: 'table'
        },
        name: 'table',
        path: 'table',
        component: () => import('_v/table.vue')
      },
      {
        path: 'test',
        component: () => import('_v/Test.vue'),
        name: 'test',
        meta: {
          icon: 'ios-arrow-forward',
          title: 'test'
        }
      },
      {
        path: 'params/:id',
        name: 'params',
        props: true,
        component: () => import('_v/argu.vue'),
        meta: {
          icon: 'ios-arrow-forward',
          title: '参数'
        }
      }, {
        path: 'upload/:id',
        name: 'upload',
        props: true,
        component: () => import('_v/upload.vue'),
        meta: {
          icon: 'ios-arrow-forward',
          title: '文件上传'
        }
      }
    ]
  }
]

export const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    },
    component: () => import('_v/login.vue')
  },
  {
    path: '*',
    component: () => import('_v/error_404.vue')
  }
]
