<template>
  <div>
    <!-- 路由组件出口的位置 -->
    <router-view v-slot="{ Component, route }">
      <transition name="fade">
        <!-- 渲染layout一级路由组件的子路由 -->
        <keep-alive :include="tagsViewStore.cachedViews">
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { useTagsViewStore } from '@/store/modules/tagsView.js'
const tagsViewStore = useTagsViewStore()
</script>

<style scoped lang="scss"></style>
