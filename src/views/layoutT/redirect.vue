<template>
  <div></div>
</template>

<script>
import { h } from 'vue'
export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render() {
    return h() // avoid warning message
  },
}
</script>
<style lang="scss" scoped></style>
