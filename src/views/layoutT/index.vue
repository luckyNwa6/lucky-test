<template>
  <div>
    <exitButton />
    <div class="flex">
      <!-- 左侧菜单 -->
      <div class="w-50 h-[80vh]">
        <el-menu :default-active="$route.path" background-color="#001529" text-color="white" active-text-color="yellowgreen">
          <!--根据路由动态生成菜单-->
          <MenuLucky :menuList="menuRoutes"></MenuLucky>
        </el-menu>
      </div>
      <!-- 内容展示区域 -->
      <div class="w-300 h-[80vh]">
        <tags-view />
        <MainLucky />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { constantRoute, asnycRoute } from '@/router/routes'
//获取路由对象
import { useRoute } from 'vue-router'
import router from '@/router'
//获取路由对象
let $route = useRoute()
let menuRoutes = [...constantRoute, ...asnycRoute]
console.log('传入菜单中的路由信息：', menuRoutes)
console.log('🚀 ~ 获取到的路由地址 router:', router.getRoutes())
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
