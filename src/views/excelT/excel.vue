<template>
  <div>
    <input type="file" @change="handleFileUpload" accept=".xlsx, .xls" />
    <el-button>ASSAA</el-button>
    <el-upload ref="upload" :limit="1" accept=".xls,.xlsx" class="upload-demo" :action="upload.url" :file-list="fileList" :on-change="handleFileSuccess">
      <el-button type="primary" icon="el-icon-upload">上传xls文件</el-button>
    </el-upload>
    <div id="excelData">
      <table v-if="excelData.length">
        <thead>
          <tr>
            <th v-for="(header, index) in excelData[0]" :key="index">{{ index }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in excelData" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">
              <p>{{ cell }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx' // npm install xlsx --save 安装命名

export default {
  name: 'Excel',
  data() {
    return {
      excelData: [],
      //上传的列表
      fileList: [],
      upload: {
        open: false, // 是否显示弹出层
        title: '', // 弹出层标题
        isUploading: false, // 是否禁用上传
        url: 'https://jsonplaceholder.typicode.com/posts/', // 请求地址

        data: {}, // 上传的额外数据，用于文件名
      },
    }
  },
  created() {
    const temp = [
      {
        启用时间: 2,
        曲线名称: 3,
        水位: 4,
        流量: 5,
        测站编码: 12,
        点序号: 25,
      },
      {
        启用时间: 2,
        曲线名称: 3,
        水位: 4,
        流量: 5,
        测站编码: 2,
        点序号: 5,
      },
    ]

    // 获取第一个对象的键数组作为表头，并确保顺序与对象中属性的顺序相同
    const keys = Object.keys(temp[0])
      .map((key) => ({
        key,
        order: Object.keys(temp[0]).indexOf(key),
      }))
      .sort((a, b) => a.order - b.order)
      .map((item, index) => ({
        label: item.key,
        prop: `temp${index + 1}`,
      }))

    console.log('表头:', keys)
    // 转换数据格式
    const tableData = temp.map((item, index) => {
      const rowData = {}
      Object.values(item).forEach((value, i) => {
        rowData[`temp${i + 1}`] = value
      })
      return { ...rowData }
    })
    console.log('tableData:', tableData)
  },
  methods: {
    /** 文件上传成功处理 */
    handleFileSuccess(response, file, fileList) {
      console.log('🚀 ~ handleFileSuccess ~ file:', file)
      console.log('🚀 ~ handleFileSuccess ~ response:', response)
      // this.$refs.upload.clearFiles();
      // 提示成功，并刷新

      // this.$modal.msgSuccess('上传成功');
    },
    handleFileUpload(event) {
      console.log('🚀 ~ handleFileUpload ~ event:', event)
      const file = event.target.files[0] //获取上传的文件
      console.log('🚀 ~ handleFileUpload ~ file:', file)

      if (file) {
        const reader = new FileReader() //创建FileReader对象，说明：它通常用于处理本地文件的读取操作，例如读取文本文件、图像文件、或像前面示例中的Excel文件一样的二进制文件

        reader.onload = (event) => {
          // 设置事件监听器
          const data = event.target.result
          /*
          使用XLSX库的XLSX.read方法解析文件数据
         'array'（默认值）: 这是最常见的类型。它用于读取二进制数据数组，通常是通过 FileReader 读取的文件数据。这是用于读取二进制格式文件，如 Excel 文件的一种常见类型。
         'binary': 用于读取二进制字符串。这可以用于将二进制数据传递为二进制字符串。
         'base64': 用于读取 base64 编码的数据。如果你有一个 base64 编码的文件内容，你可以使用这个类型来读取它。
         'buffer': 用于 Node.js 环境，可以读取 Node.js Buffer 对象中的数据。
         'file': 用于在浏览器中直接读取文件对象。这个选项通常用于读取用户选择的文件而不需要先通过 FileReader 将其读取为数组。
          不同的 type 选项允许你根据数据的来源和格式来选择适当的类型，以便 XLSX 库能够正确解析数据。在大多数情况下，使用 'array' 是最常见的，因为它适用于通过 FileReader 读取的文件数据，这是处理文件上传的典型用例。
          * */
          const workbook = XLSX.read(data, { type: 'array' })

          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          this.excelData = XLSX.utils.sheet_to_json(worksheet)
          console.log('🚀 ~ handleFileUpload ~  this.excelData:', this.excelData)
        }

        reader.readAsArrayBuffer(file)
      }
    },
  },
}
</script>

<style scoped>
</style>

