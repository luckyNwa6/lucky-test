<template>
  <div>404</div>
</template>

<script setup>
import router from '@/router'
onMounted(() => {
  console.log('🚀 ~ 404获取到的路由地址 router:', router.getRoutes())
})
</script>

<style lang="scss" scoped></style>
