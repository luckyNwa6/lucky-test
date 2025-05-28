<template>
  <div :style="{ height: elHeight + 'px' }">
    <avue-crud
      class="autoHeaderHeight"
      ref="crud"
      v-model="form"
      :data="dataObj"
      :option="option"
      :page.sync="page"
      @row-click="rowClick"
      @row-del="rowDel"
      :cell-class-name="cellStyle"
      :row-class-name="rowClass"
    >
      <template slot="remarkCusHeader" slot-scope="{ column }">
        {{ (column || {}).label }}
        <el-tooltip class="item" effect="dark" style="margin-left: 1px" content="该字段xxxx" placement="top-start">
          <i class="el-icon-question"></i>
        </el-tooltip>
      </template>
      <!-- 自定义表单-->
      <template slot-scope="{ row, index }" slot="menu">
        <el-button
          type="text"
          title="添加子节点"
          size="small"
          v-if="
            config.showAddBtn &&
            !rootName.includes(row[primaryField]) &&
            (acceptChildType.includes(row.type) || !rootName.includes(row[primaryField]))
          "
          @click="handleAdd(row, 'add')"
        >
          <i class="el-icon-plus"></i>
        </el-button>
        <el-button
          type="text"
          title="上方插入"
          size="small"
          v-if="!disabledRows.includes(row[primaryField])"
          @click="handleAdd(row, 'beforeAdd')"
        >
          <i class="el-icon-plus"></i>
        </el-button>
        <el-button
          type="text"
          title="下方插入"
          size="small"
          v-if="!disabledRows.includes(row[primaryField])"
          @click="handleAdd(row, 'afterAdd')"
        >
          <i class="el-icon-plus"></i>
        </el-button>
        <el-button
          type="text"
          v-show="false"
          title=""
          icon="el-icon-edit"
          size="small"
          v-if="!disabledRows.includes(row[primaryField])"
          @click="this.$refs.crud.rowEdit(row, index)"
        >
          <i class="el-icon-plus"></i>
        </el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { editRow, editTree2, editTree, findNodes, findRepeatFields, moveNode } from './tool'
export default {
  props: {
    needCheckRow: {
      type: [Boolean],
      default: () => false,
    },
    time: {
      type: [String, Number],
      default: () => '',
    },
    repeatIds: {
      type: [Array],
      default: () => [],
    },
    acceptNullFields: {
      //接受可以为空的节点
      type: [Array],
      default: () => ['lengthCus'],
    },
    hideMoveNode: {
      type: [Array],
      default: () => ['root', 'request', 'response'],
    },
    acceptChildType: {
      type: [Array],
      default: () => ['array', 'struct'],
    },
    acceptChildNode: {
      type: [Array],
      default: () => ['request', 'response'],
    },
    columns: {
      type: [Array],
      default: () => [],
    },
    rootName: {
      type: [Array],
      default: () => ['root'],
    },
    disabledRows: {
      type: [Array],
      default: () => ['root', 'request', 'response'],
    },
    primaryField: {
      type: String,
      default: () => 'structName',
    },
    data: {
      type: [Array, Object],
      default: () => {},
    },
    params: {
      type: [Object],
      default: () => {},
    },
  },
  data() {
    return {
      nullRowObj: {},
      hasNullCell: false,
      addType: '',
      elHeight: 200,
      parentId: '',
      form: {},
      page: {
        total: 50,
        pagerCount: 5,
        currentPage: 1,
        pageSize: 10,
      },
      tableWrapper: null,
      handlers: {
        mousedown: null,
        mouseleave: null,
        mouseup: null,
        mousemove: null,
      },
      isDown: false,
      startX: 0,
      scrollLeft: 0,
    }
  },
  computed: {
    getRequiredFields() {
      let requiredFields = []
      this.columns.map((item) => {
        item.children.map((sItem) => {
          let rules = sItem.rules || []
          if (rules.length && rules.length > 0 && rules[0].required) {
            requiredFields.push(sItem.prop)
          }
        })
      })
      return requiredFields
    },
    dataObj: {
      get() {
        return this.data
      },
      set(val) {
        this.$emit('update:data', val)
      },
    },
    config() {
      return {
        detail: false,
        showMenu: true,
        showSelectNodeBtn: false,
        showAddBtn: true,
        ...this.params,
      }
    },
    option() {
      return {
        detail: this.config.detail,
        size: 'mini',
        treeType: true,
        border: true,
        // index: true,
        // indexLabel: '序号',
        labelWidth: 120,

        dialogDrag: true,
        align: 'center',
        menuAlign: 'center',
        menuWidth: 350,
        addBtnText: '添加字段',
        addBtn: false,
        viewBtn: false,
        editBtn: false,
        delBtn: false,

        menu: !this.config.detail && this.config.showMenu,
        searchShow: false,
        refreshBtn: false,
        columnBtn: false,
        gridBtn: false,
        searchShowBtn: false,
        filterBtn: false,

        excelBtn: false,
        searchBtn: false,
        Selection: false,
        span: 24,
        page: false,
        defaultExpandAll: true,
        rowKey: 'id',
        parentId: 'parentId',
        column: this.columns,
      }
    },
  },
  methods: {
    setELHeight() {
      this.$nextTick(() => {
        let el = this.$refs.crud.$el
        this.elHeight = el.offsetHeight + 40
        console.log('设置了高度')
      })
    },
    sleep(time) {
      return new Promise((res) => {
        setTimeout(res, time)
      })
    },

    // refs调用这个校验整个表格
    async checkCell() {
      // console.log("树形接收&zwnj;**********************************&zwnj;")
      // this.hasNullCell = false; this.hasRepeatCell = false; this.$refs.crud.refreshTable()
      return new Promise(async (resolve, reject) => {
        await this.sleep(100)
        let isPass = true
        if (Object.keys(this.nullRowObj).Length > 0) {
          for (let key in this.nullRowObj) {
            if (this.nullRowObj[key]) {
              isPass = false
              console.log('校验不通过')
              break
            }
          }
        }
        resolve({ isPass })
      })
    },
    rowClass({ row, rowIndex }) {
      if (this.config.detail || !this.needCheckRow) return
      if (!this.disabledRows.includes(row[this.primaryField])) {
        let className = ''
        this.nullRowObj[rowIndex] = false
        for (let i = 0; i < this.getRequiredFields.length; i++) {
          let key = this.getRequiredFields[i]
          if (!(this.acceptNullFields.includes(key) & this.acceptChildType.includes(row.type))) {
            if (!row[key]) {
              className = 'nullRow'
              break
            }
          }
        }
        if (className != '') {
          console.log(`第${rowIndex + 1}行校验不通过`)
          this.nullRowObj[rowIndex] = true
        }
        if (this.repeatIds.includes(row.id + '')) {
          className += ' repeatRow'
        }
        return className
      }
      /*console.log("row:",row)
    console.log("rowIndex: ",rowIndex)*/
    },

    cellStyle({ column, columnIndex, row, rowIndex }) {
      if (this.config.detail || !row.$scaleEdit) return '' //详情模式或非编辑行不需要校验
      let { label = '', columnKey: prop = '' } = column
      if (!row.$scaleEdit || !label || ['操作'].includes(label)) return // 当前行为编辑状态，操作栏不需要校验
      let propArr = findNodes(this.columns, (item) => item.prop === prop)
      // let propArr = this.columns.filter(item=>item.prop === prop)
      let { rules = [], cell = false } = propArr[0] || {}
      /*console.log(prop,"=====================")
    console.log("column:",column)
    console.log("row:",row)
    console.log("rules:",rules)*/
      if (cell && rules.length && rules[0].required) {
        let {
          validatorFn = () => {
            return true
          },
          validatorNullFn = () => {},
        } = rules[0]
        if (!row[prop]) {
          if (this.acceptNull && !this.columns.includes(prop)) {
            if (validatorFn(row[prop], { prop, row, column })) return 'acceptNull'
            // if(validatorNullFn(row[prop],{prop,row,column})) return 'acceptNull'
            this.hasNullCell = true
            return 'isNull'
          }
          // else if (!validatorFn(row[prop], {prop, row, column})) {
          return 'isNull'
        }
      }
    },
    modeMove(id = '', dir = 'up') {
      moveNode(this.dataObj, id, dir)
      this.setELHeight()
    },
    async handleAdd(row, addType = 'add') {
      this.addType = addType
      this.parentId = row.id
      let { isPass = true } = await this.checkCell()
      if (!isPass) {
        this.$message.warning({ text: '请先填写完整再新增新一行' })
        return
      }
      let id = new Date().getTime()
      editRow(this.dataObj, id, 'id', (item) => {
        if (item.$cellEdit) {
          item.$cellEdit = false
        }
      })
      editTree2(
        this.dataObj,
        row.id,
        {
          id,
          $cellEdit: true,
          functionManageType: row.functionManageType || '',
          children: [],
        },
        {
          type: this.addType || 'add',
          primaryKey: this.primaryKey,
        }
      )
      this.setELHeight()
    },
    expandChange() {
      this.setELHeight()
    },
    async rowClick(row, column, e) {
      // console.log("点击了树行的数据................")
      if (row.$cellEdit || column.property === 'menu') return //禁止编辑的列
      if (this.disabledRows.includes(row[this.primaryKey])) {
        this.$message.warning({ text: '本行不允许编辑' })
        return
      }
      editRow(this.dataObj, row.id, 'id', (item) => {
        item.$cellEdit = item.id === row.id
      })
    },
    rowDel(row, index) {
      this.$confirm({
        message: '确定将选择数据删除？',
        options: {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      })
        .then(() => {
          this.nullRowObj = {} // 节点有变化后清空空行信息
          let { id = '' } = row
          // console.log("id:", id)
          editTree(this.dataObj, id, { obj: {} }, { params: { type: 'del' } })
          // this.$refs.crud.refreshTable()
          this.setELHeight()
        })
        .then(() => {
          // this.onLoad(this.page)
          this.$message({
            type: 'success',
            message: '操作成功!',
          })
        })
    },
    async checkRepeat() {
      return new Promise((resolve, reject) => {
        let isPass = true
        let isRepeat = false
        let { repeatArr = [] } = findRepeatFields(this.dataObj, this.primaryField)
        console.log('repeatArr===', repeatArr)
        if (repeatArr.length > 0) {
          isRepeat = true
          isPass = false
        }
        resolve({ isPass, isRepeat, code: isPass ? '200' : '400', repeatArr })
      })
    },

    setTable() {
      console.log('表格重新加载渲染！--------')
      this.removeDragLis()
      this.$refs.crud.refreshTable()
      this.enableDrag()
    },
  },
  watch: {
    time: {
      handler() {
        this.setELHeight()
      },
      immediate: true,
      deep: true,
    },
  },
}
</script>

<style>
.el-table .pdBlue {
  background: #1e9fff;
}
</style>
