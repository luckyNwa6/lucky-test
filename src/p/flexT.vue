<template>
  <div>
    <el-card>
      <div class="sketch_content2" style="display: flex; flex-wrap: wrap; gap: 10px">
        <div class="h-40 w-70 bg-green-400">块级1</div>
        <div class="h-40 w-70 bg-yellow-400">块级2</div>
        <div class="h-40 w-70 bg-pink-400">块级3</div>
        <div class="h-40 w-70 bg-gray-400">块级4</div>
        <div class="h-40 w-70 bg-blue-400">块级5</div>
        <div class="h-40 w-70 bg-dark-400">块级6</div>
        <div class="h-40 w-70 bg-purple-400">块级7</div>
        <div class="h-40 w-70 bg-red-400">块级8</div>
        <div class="h-40 w-70 bg-yellow-700">块级9</div>
        <div class="h-40 w-70 bg-dark-400">块级6</div>
        <div class="h-40 w-70 bg-purple-400">块级7</div>
        <div class="h-40 w-70 bg-red-400">块级8</div>
        <div class="h-40 w-70 bg-yellow-700">块级9</div>
      </div>
    </el-card>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.sketch_content2 {
  /* // 必须有高度 overflow 为自动 */
  overflow: auto;
  height: 652px;

  padding: 0 20px;
}
</style>
