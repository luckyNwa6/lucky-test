//对外暴露配置路由(常量路由):全部用户都可以访问到的路由
export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录', //菜单标题
      hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
    },
  },
  {
    path: '/',
    redirect: '/login',
    name: '/',
    meta: {
      title: '',
      hidden: true,
      icon: '',
    },
  },

  {
    path: '/layoutT',
    component: () => import('@/views/layoutT/index.vue'),
    name: 'layoutT',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/layoutT/home/index.vue'),
        name: '首页',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
          affix: true,
        },
      },
    ],
  },
]

//测试路由    同级index.ts再设置一下
export const testRoute = [
  {
    path: '/i18T',
    component: () => import('@/views/i18T/index.vue'),
    name: 'i18T',
  },
  {
    path: '/chart',
    component: () => import('@/views/chart/index.vue'),
    name: 'chart',
  },
  {
    path: '/unoCssT',
    component: () => import('@/views/unoCssT/index.vue'),
    name: 'unoCssT',
  },

  {
    path: '/tableT',
    component: () => import('@/views/tableT/index.vue'),
    name: 'tableT',
  },
  {
    path: '/iconT',
    component: () => import('@/views/iconT/index.vue'),
    name: 'iconT',
  },
  {
    path: '/conT',
    component: () => import('@/views/conT/index.vue'),
    name: 'conT',
  },
  {
    path: '/mapT',
    component: () => import('@/views/mapT/index.vue'),
    name: 'mapT',
  },
  {
    path: '/menuT',
    component: () => import('@/views/menuT/index.vue'),
    name: 'menuT',
  },
]

//异步路由
export const asnycRoute = [
  {
    path: '/sys',
    component: () => import('@/views/layoutT/index.vue'),
    name: 'Sys',
    meta: {
      title: '系统管理',
      icon: 'Setting',
      hidden: false,
    },
    redirect: '/sys/user',
    children: [
      {
        path: '/sys/user',
        component: () => import('@/views/layoutT/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'User',
          hidden: false,
        },
      },
      {
        path: '/sys/role',
        component: () => import('@/views/layoutT/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'UserFilled',
        },
      },
      {
        path: '/sys/menu',
        component: () => import('@/views/layoutT/menu/index.vue'),
        name: 'Menu',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Monitor',
        },
      },
    ],
  },
]

//任意路由
export const anyRoute = [
  {
    path: '/redirect',
    component: () => import('@/views/layoutT/index.vue'),
    name: 'redirect',
    meta: {
      title: '',
      hidden: true,
      icon: '',
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/layoutT/redirect.vue'),
        meta: {
          title: '',
          hidden: true,
          icon: '',
        },
      },
    ],
  },
  {
    //任意路由
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'DataLine',
    },
  },
]
