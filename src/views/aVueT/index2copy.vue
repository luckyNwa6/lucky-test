<!--- 
需求场景: 表单里的输入框点击后,需要有个弹框,里面是个任务列表,然后勾选对应任务,表单回显对应任务名称,支持分页勾选
--->

<template>
  <div>
    <avue-form ref="formRef" :key="time" v-model="baseInfoObj" :option="baseInfoOption"></avue-form>

    <el-drawer
      :title="titleA"
      :size="'60%'"
      custom-class="lucky-drawer-task"
      :visible.sync="showDia"
      :direction="'rtl'"
      :before-close="handleClose"
    >
      <avue-crud
        ref="crud"
        :option="option"
        :table-loading="loading"
        :page.sync="page"
        :data="tableData"
        :before-open="beforeOpen"
        :row-style="rowStyle"
        :row-class-name="tableRowClassName"
        v-model="form"
        :search.sync="search"
        @sort-change="sortChange"
        @row-click="setCurrentRow"
        @row-update="rowUpdate"
        @row-save="rowSave"
        @search-change="searchChange"
        @search-reset="searchReset"
        @selection-change="handleSelectionChange"
        @current-change="currentChange"
        @size-change="sizeChange"
        @refresh-change="onLoad"
        @on-load="onLoad"
      >
        <template slot="menuLeft">
          <el-button type="danger" size="mini" @click="clearAllSelection">清空全选</el-button>
        </template>
      </avue-crud>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表格相关
      page: {
        pageSize: 10, // 每页5条，便于测试分页
        currentPage: 1,
        total: 15,
      },
      form: {},
      search: {},
      loading: false,
      tableData: [], // 当前页数据
      allData: [], // 全量模拟数据
      selectedRows: [], // 当前页选中数据
      allSelectedData: [], // 所有页选中数据
      allSelectedIds: new Set(), // 存储选中数据的唯一 ID
      time: 0,
      //表单
      baseInfoObj: {},

      titleA: '关联任务 [😀已选0]',
      showDia: false,
    }
  },
  computed: {
    baseInfoOption() {
      return {
        labelWidth: 120,
        emptyBtn: false,
        submitBtn: false,
        span: 8,
        column: [
          {
            label: '关联任务',
            prop: 'relateTask',
            clearable: false,
            disabled: false,
            placeholder: '请点击 选择关联任务',
            click: () => {
              //不能是详情页
              this.showDia = true
              if (this.baseInfoObj.relateTaskIds) {
                let arrN = this.baseInfoObj.relateTaskIds.split(',')
                let arrT = this.baseInfoObj.relateTask.split(',')
                this.allSelectedIds = new Set(arrN)

                this.allSelectedData = arrT.map((assetName, index) => {
                  return {
                    uuid: arrN[index],
                    assetName,
                  }
                })
                this.titleA = `关联任务 [😀已选${this.allSelectedData.length}]`
              } else {
                this.titleA = '关联任务 [😀已选0]'
              }
            },
            rules: [
              {
                required: true,
                message: '请选中关联任务',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '关联任务UUID',
            prop: 'relateTaskIds',
            display: false,
          },
        ],
      }
    },
    option() {
      return {
        size: 'mini',
        border: true,
        align: 'center',
        dialogMenuPosition: 'center',
        emptyBtnText: '重置',
        addBtn: false,
        menu: false,
        columnBtn: false,
        gridBtn: false,
        index: false,
        indexLabel: '序号',
        searchIndex: 3,
        selection: true,
        rowKey: 'userId', // 确保跨页勾选需要唯一键
        span: 24,
        searchSpan: 6,
        tip: false,
        column: [
          {
            label: 'UUID',
            prop: 'uuid',
            slot: true,
          },
          {
            label: '任务名',
            prop: 'assetName',
            search: true,
          },
        ],
      }
    },
  },
  methods: {
    handleClose() {
      this.showDia = false
    },
    // 生成模拟数据
    generateMockData() {
      const mockData = []
      for (let i = 1; i <= 15; i++) {
        mockData.push({
          uuid: i + '',
          assetName: `assetName${i}` + '',
        })
      }
      this.allData = mockData
      this.page.total = mockData.length
    },

    // 加载当前页数据
    onLoad(page = {}, params = {}) {
      this.loading = true
      this.page.currentPage = page.currentPage || 1
      this.page.pageSize = page.pageSize || 10
      // 模拟搜索过滤
      let filteredData = [...this.allData]
      if (params.assetName) {
        filteredData = filteredData.filter((item) => item.assetName.includes(params.assetName))
      }

      // 分页处理
      const start = (this.page.currentPage - 1) * this.page.pageSize
      const end = start + this.page.pageSize
      this.tableData = filteredData.slice(start, end)
      this.page.total = filteredData.length

      // 恢复当前页勾选状态
      this.restoreSelection()
      this.loading = false
    },

    // 恢复当前页勾选状态
    restoreSelection() {
      let arrCheck = []
      this.tableData.forEach((row) => {
        console.log('🚀 ~ 触发次数 ~ row:', row.uuid)
        if (this.allSelectedIds.has(row.uuid)) {
          arrCheck.push(row.uuid)
          console.log('翻页触发的allSelectedIds 和当前row 的uuid ', this.allSelectedIds, row.uuid)
        }
      })

      const rowSel = this.tableData.filter((item) => arrCheck.includes(item.uuid))
      this.$nextTick(() => {
        console.log('🚀 ~ restoreSelection ~ his.$refs.crud:', this.$refs.crud)
        this.$refs.crud.toggleSelection(rowSel)
      })
    },

    // 监听当前页选中变化
    handleSelectionChange(rows) {
      const currentSelectIds = new Set(rows.map((item) => item.uuid))
      const afterTableData = this.tableData.map((item) => {
        return {
          uuid: item.uuid,
          assetName: item.assetName,
        }
      })
      const selFormData = afterTableData.filter((item) => {
        return currentSelectIds.has(item.uuid)
      })
      console.log('🚀 ~ 表格当前页选中的数据 ~ selFormData:', selFormData)

      const notInData = this.allSelectedData.filter((item) => {
        return !afterTableData.some((d) => d.uuid === item.uuid)
      })

      this.allSelectedData = [...notInData, ...selFormData]
      console.log('🚀 ~ 当前选的值 ~ this.allSelectedData:', this.allSelectedData)

      this.allSelectedIds = new Set(this.allSelectedData.map((item) => item.uuid))
      console.log('🚀 ~ 当前选择的数据uuid总集合 ~ this.allSelectedIds:', this.allSelectedIds)
      const tempArr = this.allSelectedData.map((item) => item.assetName).join(',')
      this.$set(this.baseInfoObj, 'relateTask', tempArr)
      this.$set(this.baseInfoObj, 'relateTaskIds', [...this.allSelectedIds].join(','))
      this.titleA = `关联任务 [😀已选${this.allSelectedData.length}]`
    },

    // 清空全选
    clearAllSelection() {
      this.allSelectedData = []
      this.allSelectedIds.clear()
      this.titleA = '关联任务 [😀已选0]'
      this.$set(this.baseInfoObj, 'relateTask', '')
      this.$set(this.baseInfoObj, 'relateTaskIds', '')
      this.$refs.crud.clearSelection()
    },

    // 分页相关
    currentChange(currentPage = 1) {
      this.page.currentPage = currentPage
    },
    sizeChange(pageSize = 5) {
      this.page.pageSize = pageSize
    },

    // 搜索相关
    searchChange(params, done) {
      this.search = { ...params }
      this.page.currentPage = 1
      this.onLoad(this.page, params)
      done()
    },
    searchReset() {
      this.search = {}
      this.page.currentPage = 1
      this.onLoad(this.page)
    },

    // 其他表格方法
    rowStyle({ row, column, rowIndex }) {
      return ''
    },

    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return 'warning-row'
      }
      return ''
    },
    beforeOpen(done, type) {
      if (['add', 'view'].includes(type)) {
        console.log('🚀 ~ beforeOpen ~ type:', type)
      }
      done()
    },
    rowUpdate(row, index, loading, done) {
      loading()
      this.$message.success('更新成功')
      done()
    },
    rowSave(row, loading, done) {
      loading()
      this.onLoad(this.page, this.search)
      done()
    },
    setCurrentRow(row) {
      const index = row.$index
      const val = [this.tableData[index]]
      this.allSelectedData = this.allSelectedData.filter((item) => item.uuid !== row.uuid)
      this.$refs.crud.toggleSelection(val)
    },
    sortChange(val) {
      this.$message.success(JSON.stringify(val))
    },
  },
  mounted() {
    this.generateMockData() // 生成模拟数据
    this.onLoad(this.page) // 初始加载
  },
}
</script>

<style>
.warning-row {
  background-color: #f0f9eb !important;
}
</style>
<style scoped>
::v-deep .lucky-drawer-task .is-leaf span .el-checkbox__inner {
  display: none;
}
</style>
