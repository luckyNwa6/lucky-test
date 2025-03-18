<template>
  <div>
    <input ref="fileInput" type="file" multiple @change="handleFileChange" style="display: none" />
    <button @click="openFileInput">选择文件</button>
    <button @click="resetFileInput">重置</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import JSZip from 'jszip'

const fileInput = ref(null) // 创建一个 ref 引用

const openFileInput = () => {
  fileInput.value.click() // 打开文件选择对话框
}

const handleFileChange = (event) => {
  const files = event.target.files // 获取选中的文件列表
  console.log(files)

  // 遍历文件列表
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const reader = new FileReader()
    reader.onload = (e) => {
      const zipData = e.target.result // 获取ZIP文件的内容

      // 使用JSZip解压缩ZIP文件
      JSZip.loadAsync(zipData).then((zip) => {
        // 处理解压缩后的内容
        zip.forEach((relativePath, zipEntry) => {
          if (!zipEntry.dir) {
            // 如果是文件而不是目录
            zipEntry.async('string').then((fileContent) => {
              // 处理文件内容
              console.log(`文件名：${zipEntry.name}`)
              // console.log(`文件内容：${fileContent}`)
            })
          }
        })
      })
    }

    reader.readAsArrayBuffer(file) // 以ArrayBuffer格式读取文件内容
  }
}

const resetFileInput = () => {
  fileInput.value.value = '' // 通过 .value 访问和修改引用的值
}
</script>

<style scoped></style>
