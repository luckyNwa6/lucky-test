<template>
  <div>
    <el-button @click="downloadFile" icon="el-icon-download">下载配置模板</el-button>
    <el-upload ref="upload" :limit="1" accept=".xls,.xlsx" class="upload-demo" :action="upload.url" :file-list="fileList" :on-success="handleFileSuccess">
      <el-button type="primary" icon="el-icon-upload">上传xls文件</el-button>
    </el-upload>

    <el-card class="box-card" style="height: 250px">
      <div slot="header" class="clearfix">
        <span>数据展示</span>
      </div>
      <el-table ref="singleTable" :data="tableData" highlight-current-row height="170" @current-change="handleCurrentChange">
        <el-table-column v-for="(item, index) in tableHeader" :prop="item.prop" :key="index" :label="item.label" show-overflow-tooltip></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// npm install file-loader --save-dev    //开发，Webpack 配置中使用它来处理文件加载
// npm i xlsx --save					          //生产，解析和处理 Excel 文件的库
import excelFile from '@/assets/excelTemplate/模板.xls'
import * as XLSX from 'xlsx'
import dayjs from 'dayjs'
import { readExcelFile, formatExcelDataA, transformTableHeader, transformTableData, processTableHeaderLabel } from '@/views/common/index.js' //算法模块公用方法lUCKY封装

export default {
  data() {
    return {
      tableHeader: '',
      tableData: '',
      responseName: '',
      responseUrl: '',
      //上传的列表
      fileList: [],
      // 上传参数
      upload: {
        url: 'http://192.168.15.115:3737/luckyNwa/uploadPicLocal', // 请求地址
      },
    }
  },
  methods: {
    //上传之前的限制
    beforeUpload(file) {
      console.log('🚀 ~ beforeUpload ~ file:', file)
      const validFormats = ['.xls', '.xlsx']
      const fileFormat = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
      if (!validFormats.includes(fileFormat)) {
        this.$message.error('只能上传xls或xlsx文件')
        return false // 阻止文件上传
      }
      return true // 允许文件上传
    },
    //下载
    downloadFile() {
      const link = document.createElement('a')
      link.href = excelFile
      link.download = '模板.xls'
      link.style.display = 'none' // 隐藏元素
      document.body.appendChild(link) // 添加到文档中
      link.click()
      document.body.removeChild(link) // 点击后移除
    },
    /** 文件上传成功处理 */
    handleFileSuccess(response, f, fileList) {
      this.isUpload = true
      this.$refs.upload.clearFiles()
      this.responseUrl = f.response.data
      console.log('🚀 ~ handleFileSuccess ~ this.responseUrl:', this.responseUrl)
      this.responseName = f.raw.name
      const file = f.raw //获取上传的文件
      console.log('🚀 ~ handleFileSuccess ~ file:', file)
      // this.$modal.msgSuccess('上传成功');
      if (file) {
        this.isFileDeal(file)
      }
    },
    //处理excel
    isFileDeal(file) {
      readExcelFile(
        file,
        (error, data) => {
          if (error) {
            console.log('里面的tryCatch捕获的异常：' + error)
            this.beforeRemove()
            this.$modal.msgWarning('表格数据不能为空！')
          } else {
            const tableHeader = data.tableHeader || []
            const excelData = data.excelData || []
            if (excelData.length === 0 || excelData === null) {
              this.beforeRemove()
              this.$modal.msgWarning('表格数据不能为空！')
              return
            }
            console.log('读取的excel表头数据（第一行）', tableHeader)
            console.log('读取所有excel数据', excelData)

            //这里进一步验证里面的数据，必填的里面不能为空也就是-
            let emptyFields = new Set()
            excelData.forEach((item) => {
              if (item['*曲线名称'] === '-' && item['*水位(m)'] === '-' && item['*流量(m³/s)'] === '-' && item['*测站编码'] === '-') {
                emptyFields.add('测站编码、曲线名称、水位、流量')
              } else {
                if (item['*曲线名称'] === '-') {
                  emptyFields.add('曲线名称')
                }
                if (item['*水位(m)'] === '-') {
                  emptyFields.add('水位')
                }
                if (item['*流量(m³/s)'] === '-') {
                  emptyFields.add('流量')
                }
                if (item['*测站编码'] === '-') {
                  emptyFields.add('测站编码')
                }
              }
            })

            if (emptyFields.size > 0) {
              this.beforeRemove()
              const errorMessage = [...emptyFields].join('、') + '数据为空，请重新输入后上传'
              console.log(errorMessage)

              this.$confirm(errorMessage, '系统提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'warning',
              }).then(() => {
                console.log('确定')
              })
              return
            } else {
              console.log('所有字段均有值，可以上传')
            }

            this.tableHeader = tableHeader
            this.excelData = formatExcelDataA(excelData, dayjs)
            this.dealExcelData() //处理成表格的数据模板
          }
        },
        XLSX,
        dayjs
      )
    },
    //处理数据
    dealExcelData() {
      // 获取第一个对象的键数组作为表头，并确保顺序与对象中属性的顺序相同
      this.tableHeader = transformTableHeader(this.tableHeader)
      console.log('表头:', this.tableHeader)
      this.tableData = transformTableData(this.tableHeader, this.excelData) // 转换数据格式
      console.log('这里是表数据tableData:', this.tableData)
      this.tableHeader = processTableHeaderLabel(this.tableHeader)
      this.$refs.singleTable.doLayout()
    },
    //监听下拉框变化
    handleSelectChange(number) {
      const dateTimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
      switch (number) {
        case 1:
          this.stationCodeTemp = this.tableData.map((row) => row[this.formLabelTop.stationCode])
          console.log('🚀 ~ handleSelectChange ~ this.stationCodeTemp :', this.stationCodeTemp)
          break
        case 2:
          this.curveNameTemp = this.tableData.map((row) => row[this.formLabelTop.curveName])
          console.log('🚀 ~ handleSelectChange ~   this.curveNameTemp:', this.curveNameTemp)
          break
        case 3:
          for (let i = 0; i < this.tableData.length; i++) {
            const row = this.tableData[i]
            const value = row[this.formLabelTop.enableTime]
            console.log('🚀 ~ handleSelectChange ~ value:', value)
            // 判断值是否不是 'YYYY-MM-DD HH:mm:ss' 格式
            if (!dateTimeRegex.test(value)) {
              console.log('value不是YYYY-MM-DD HH:mm:ss格式')
              this.formLabelTop.enableTime = ''
              this.$modal.msgWarning('BGTM字段需为日期,字段类型不匹配,请重新选择')
              return
            }
          }
          this.enableTimeTemp = this.tableData.map((row) => row[this.formLabelTop.enableTime])
          console.log('🚀 ~ handleSelectChange ~ this.enableTimeTemp :', this.enableTimeTemp)
          break
        case 4:
          for (let i = 0; i < this.tableData.length; i++) {
            const row = this.tableData[i]
            const value = row[this.formLabelTop.pointNum]
            console.log('🚀 ~ handleSelectChange ~ value:', value)
            // 在这里放置对 value 值的判断逻辑
            if (typeof value !== 'number' || !Number.isInteger(value)) {
              console.log('value不是整数')
              this.formLabelTop.pointNum = ''
              this.$modal.msgWarning('PTNO字段需为整型,字段类型不匹配,请重新选择')

              return
            }
          }
          this.pointNumTemp = this.tableData.map((row) => row[this.formLabelTop.pointNum])
          console.log('🚀 ~ handleSelectChange ~   this.pointNumTemp:', this.pointNumTemp)
          break
        case 5:
          for (let i = 0; i < this.tableData.length; i++) {
            const row = this.tableData[i]
            const value = row[this.formLabelTop.waterLevel]
            console.log('🚀 ~ handleSelectChange ~ value:', value)
            // 在这里放置对 value 值的判断逻辑
            if (typeof value !== 'number') {
              console.log('waterLevel中有数据不是number')
              this.formLabelTop.waterLevel = ''
              this.$modal.msgWarning('Z字段需为浮点型,字段类型不匹配,请重新选择')

              return
            }
          }
          this.waterLevelTemp = this.tableData.map((row) => row[this.formLabelTop.waterLevel])
          console.log('🚀 ~ handleSelectChange ~ this.waterLevelTemp:', this.waterLevelTemp)
          break
        case 6:
          for (let i = 0; i < this.tableData.length; i++) {
            const row = this.tableData[i]
            const value = row[this.formLabelTop.flow]
            console.log('🚀 ~ handleSelectChange ~ value:', value)
            // 在这里放置对 value 值的判断逻辑
            if (typeof value !== 'number') {
              console.log('flow中有数据不是number')
              this.formLabelTop.flow = ''
              this.$modal.msgWarning('Q字段需为浮点型,字段类型不匹配,请重新选择')
              return
            }
          }
          console.log('flow++++++')
          this.flowTemp = this.tableData.map((row) => row[this.formLabelTop.flow])
          console.log('🚀 ~ handleSelectChange ~  this.flowTemp:', this.flowTemp)
          break
        case 7:
          this.columnCommentsTemp = this.tableData.map((row) => row[this.formLabelTop.columnComments])
          console.log('🚀 ~ handleSelectChange ~ this.columnCommentsTemp:', this.columnCommentsTemp)
          break
        case 8:
          for (let i = 0; i < this.tableData.length; i++) {
            const row = this.tableData[i]
            const value = row[this.formLabelTop.columnModitime]
            console.log('🚀 ~ handleSelectChange ~ value:', value)
            // 判断值是否不是 'YYYY-MM-DD HH:mm:ss' 格式
            if (!dateTimeRegex.test(value)) {
              console.log('value不是YYYY-MM-DD HH:mm:ss格式')
              this.formLabelTop.columnModitime = ''
              this.$modal.msgWarning('MODITIME字段需为日期,字段类型不匹配,请重新选择')
              return
            }
          }

          this.columnModitimeTemp = this.tableData.map((row) => row[this.formLabelTop.columnModitime])
          console.log('🚀 ~ handleSelectChange ~ this.columnModitimeTemp:', this.columnModitimeTemp)
          break
        case 9:
          console.log('🚀 ~ handleSelectChange ~ this.tableData:', this.tableData)
          this.columnExkeyTemp = this.tableData.map((row) => row[this.formLabelTop.columnExkey])
          console.log('🚀 ~ handleSelectChange ~ this.columnExkeyTemp:', this.columnExkeyTemp)
          break
        default:
          console.log('number 参数不正确')
          break
      }
    },
    //处理下拉框的曲线数据
    dealData2() {
      // 定义属性数组
      let propArrays = [
        this.stationCodeTemp,
        this.curveNameTemp,
        this.enableTimeTemp,
        this.pointNumTemp,
        this.waterLevelTemp,
        this.flowTemp,
        this.columnCommentsTemp,
        this.columnModitimeTemp,
        this.columnExkeyTemp,
      ]

      // 遍历属性数组
      for (let i = 0; i < Math.max(...propArrays.map((arr) => arr.length)); i++) {
        // 创建新的对象
        let newObj = {
          formulaId: null,
          stationCode: '',
          curveName: '',
          enableTime: '',
          pointNum: '',
          waterLevel: '',
          flow: '',
          columnComments: '',
          columnModitime: '',
          columnExkey: '',
        }

        // 遍历属性数组并赋值
        propArrays.forEach((arr, index) => {
          if (i < arr.length) {
            newObj[Object.keys(newObj)[index + 1]] = arr[i]
          }
        })

        // 将对象添加到结果数组中
        this.curveInfoTemp.push(newObj)
      }

      const obj = {
        tableHeader: this.tableHeader,
        fileName: this.responseName,
        stationCode: this.formLabelTop.stationCode,
        curveName: this.formLabelTop.curveName,
        enableTime: this.formLabelTop.enableTime,
        pointNum: this.formLabelTop.pointNum,
        waterLevel: this.formLabelTop.waterLevel,
        flow: this.formLabelTop.flow,
        columnComments: this.formLabelTop.columnComments,
        columnModitime: this.formLabelTop.columnModitime,
        columnExkey: this.formLabelTop.columnExkey,
      }

      this.curveColumnMappingTemp = JSON.stringify(obj)
      console.log(this.curveInfoTemp)
    }, //移除文件
    beforeRemove(file, fileList) {
      this.isUpload = false
      this.tableHeader = []
      this.tableData = []
      this.responseName = ''
      this.formLabelTop = {
        stationCode: '',
        curveName: '',
        enableTime: '',
        pointNum: '',
        waterLevel: '',
        flow: '',
        columnComments: '',
        columnModitime: '',
        columnExkey: '',
      }
      this.$nextTick(() => {
        this.$refs['formLabelTop'].clearValidate()
      })
    },
  },
}
</script>

<style></style>
