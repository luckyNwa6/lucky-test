/*
 * @Author: luckyNwa
 * @Date: 2023-04-17 15:15:08
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home.vue'),
  },
  {
    path: '/excelT',
    name: 'excelT',
    component: () => import('@/views/excelT/index.vue'),
  },
  {
    path: '/dateT',
    name: 'dateT',
    component: () => import('@/views/dateT/index.vue'),
  },

  {
    path: '/chartsT',
    name: 'chartsT',
    component: () => import('@/views/chartsT/index.vue'),
  },
  {
    path: '/aVueT',
    name: 'aVueT',
    component: () => import('@/views/aVueT/index.vue'),
  },
  {
    path: '/aVueT/index2',
    name: 'aVueT',
    component: () => import('@/views/aVueT/index2.vue'),
  },
  {
    path: '/aVueT/index3',
    name: 'aVueT',
    component: () => import('@/views/aVueT/index3.vue'),
  },
  {
    path: '/aVueT/index4',
    name: 'aVueT',
    component: () => import('@/views/aVueT/index4.vue'),
  },
  {
    path: '/dialog',
    name: 'dialog',
    component: () => import('@/views/dialog/index.vue'),
  },
  {
    path: '/screen',
    name: 'screen',
    component: () => import('@/views/screen/index.vue'),
  },
  {
    path: '/screen2',
    name: 'screen2',
    component: () => import('@/views/screen2/index.vue'),
  },
  {
    path: '/screen3',
    name: 'screen3',
    component: () => import('@/views/screen3/index.vue'),
  },
  {
    path: '/step',
    name: 'step',
    component: () => import('@/views/step/index.vue'),
  },
  {
    path: '/yzm',
    name: 'yzm',
    component: () => import('@/views/yzm/index.vue'),
  },
  {
    path: '/dialogD',
    name: 'dialogD',
    component: () => import('@/views/dialog/demo.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
