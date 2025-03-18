<template>
  <div>
    i18测试
    <el-input v-model="filterText" :placeholder="$t('role')" />
    <exitButton />
    {{ t('ha-ha') }}
  </div>
</template>

<script setup>
const filterText = ref('')
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// const componentsList = ref([
//   {
//     title: t('Product type statistics'),
//     component: productType,
//     span: 8,
//     index: 3,
//   },
// ])
</script>

<style lang="scss" scoped></style>
