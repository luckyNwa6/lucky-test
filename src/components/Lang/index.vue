<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <div>
      <!-- <svg-icon class-name="international-icon" icon-class="language" /> -->
      点击切换
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="'zh' === $i18n.locale">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="'en' === $i18n.locale">en</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.getters.language
    },
  },
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang // 设置给本地的i18n插件
      //   this.$store.dispatch('app/setLanguage', lang)
      this.$message.success('切换多语言成功')
    },
  },
}
</script>
