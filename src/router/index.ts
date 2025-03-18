//通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute, testRoute, asnycRoute, anyRoute } from './routes'

const routes = import.meta.glob('../p/*.vue')

const pages = Object.keys(routes).map((path: any) => {
  const name = path.match(/\.\/(.*)\.vue$/)[1]
  return {
    path: `/${name}`,
    component: routes[path],
    name,
  }
})

//创建路由器
const router = createRouter({
  //路由模式hash
  history: createWebHashHistory(),
  routes: [...testRoute, ...constantRoute, ...asnycRoute, ...pages, ...anyRoute],
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})
export default router
