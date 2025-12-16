<template>
  <div style="padding: 20px">
    <!-- <avue-form :option="option6" v-model="luckyA"></avue-form>
    <el-button @click="banC">切换禁用</el-button> -->
    <el-card>
      <div slot="header"><span>avue-crud进阶</span></div>
      <CrudWell />
    </el-card>
    <el-divider></el-divider>
    <el-card>
      <div slot="header"><span>avue-crud表格</span></div>
      <avue-crud
        :option="option"
        :table-loading="loading"
        :page="page"
        :permission="permissionList"
        :data="data"
        :before-open="beforeOpen"
        :cell-style="cellStyle"
        :row-style="rowStyle"
        :row-class-name="tableRowClassName"
        v-model="form"
        :search.sync="search"
        ref="crud"
        @sort-change="sortChange"
        @row-click="setCurrentRow"
        @row-update="rowUpdate"
        @row-save="rowSave"
        @search-change="searchChange"
        @search-reset="searchReset"
        @selection-change="selectionChange"
        @current-change="currentChange"
        @size-change="sizeChange"
        @refresh-change="onLoad(page)"
        @on-load="onLoad"
      >
        <template slot="userId" slot-scope="{ row }">
          <p v-if="row.userId % 2 == 0" style="color: red">{{ row.userId }}</p>
          <p v-else>{{ row.userId }}自定义表格列里的数据样式</p>
        </template>
        <template slot="menuLeft" slot-scope="{ size }">
          <el-button :size="size" type="primary" icon="el-icon-plus">左上按钮</el-button>
        </template>
        <template slot="menu" slot-scope="{ row, index, size }">
          <el-button :size="size" type="primary" icon="el-icon-view">表格行按钮</el-button>
        </template>
      </avue-crud>
    </el-card>
    <el-divider></el-divider>
    <el-card>
      <div slot="header"><span>avue-form表单</span></div>
      <el-button @click="modClick" style="margin-bottom: 20px">切换详情/编辑模式</el-button>
      <el-button @click="checkForm">表单校验</el-button>
      <el-button @click="saveFrom">保存表单</el-button>
      <ServeInfo ref="serveInfo" :params="params" :data.sync="infoObj['serveInfo']" :columns="getColumn('serveInfo')" />
    </el-card>
    <el-divider></el-divider>
    <div>
      <el-select
        v-model="elValue"
        filterable
        remote
        size="small"
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loadingSel"
      >
        <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code"></el-option>
      </el-select>
      <p style="margin: 15px">这个是下拉加载的组件</p>
      <MySelect ref="luckySelect" placeholder="请输入" :isSelValue="isSelValue" v-model="keyword" />
      <el-button style="margin-left: 10px" size="small" @click="showKeyV">输入框的值</el-button>
    </div>
  </div>
</template>

<script>
import MySelect from '@/components/MySelect.vue'
import ServeInfo from '@/components/ServeInfo.vue'
import { serveInfoData } from '@/components/columnConfig.js'
import CrudWell from '@/components/CrudWell.vue'
import { getUserInfoList, getOpenCityList } from '@/api/user/index'
import { map } from '@/mock/modules/list'
import { mapGetters } from 'vuex'

export default {
  components: {
    MySelect,
    ServeInfo,
    CrudWell,
  },
  data() {
    return {
      luckyA: '',
      dicData: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  // disabled: false,
                  value: 'yizhi',
                  label: '一致',
                },
                {
                  value: 'fankui',
                  label: '反馈',
                },
              ],
            },
          ],
        },
      ],
      options: [],
      elValue: {},
      loadingSel: false,
      keyword: '',
      isSelValue: '1',
      params: {
        detail: false,
      },
      infoObj: {
        serveInfo: JSON.parse(JSON.stringify(serveInfoData)),
      },
      resData: {
        name: 'lucky小维',
        age: 26,
        idCard: '110101199001010001',
        nickName: 'lucky_NWA',
        qq: '1656213092',
        city: '1',
        area: '萧山区',
        remark:
          '如果你已经检查并排除了上述可能性，但问题依旧存在，考虑创建一个新的项目并逐步迁移现有代码，以此来确定是否是项目配置的问题。另外，也可以查阅 VSCode 和相关插件的官方文档或社区论坛，寻找更多针对性的帮助',
      },

      //表格相关
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 10,
      },
      data: [],
      loading: false,
      form: {},
      search: {},
      selectionList: [],
      currentRow: {},
      queryStr: '{}',
      searchStr: '{}',
      cityTypeList: [
        { label: '北京', dataValue: '0' },
        { label: '杭州', dataValue: '1' },
        { label: '上海', dataValue: '2' },
      ],
    }
  },
  //当页面有缓存问题
  async activated() {
    if (this.clearTempIsNeed()) this.clearTempData()

    // this.$refs.crud.refreshTable() //解决表格缩放问题
    // await this.onLoad(this.page)
  },
  mounted() {
    this.init()
    let { type: typeName = '', id = '' } = this.$route.query //es6语法
    console.log('🚀 ~ mounted ~ id:', id)
    console.log('🚀 ~ activated ~ typeName:', typeName)
    this.infoObj.serveInfo = this.handleLeftFixName(this.resData)
  },
  methods: {
    clearTempIsNeed() {
      // let { path = '' } = this.$route
      // let currentTag = this.tagList.find((item) => item.value == path) || {}
      // let { timeStr = '' } = currentTag
      // let currentTime = new Date().getTime()
      // let time = currentTime - +timeStr
      // console.log("🚀 ~ clearTempIsNeed ~ time:", time)
      // if (time < 3000) return true
      return true
    },
    clearTempData() {
      this.search = {}
      this.searchStr = '{}'
      this.$$refs.crud.searchReset()
      this.onLoad(this.page)
    },
    banC() {
      // this.dicData[0]['children'][0]['children'][0].disabled = true
      this.$set(this.dicData[0].children[0].children[0], 'disabled', !this.dicData[0].children[0].children[0].disabled)
      console.log('🚀 ~ banC ~ this.dicData:', this.dicData)
    },
    init() {
      //这个公用接口不行了
      // getOpenCityList('').then((res) => {
      //   console.log('当前res的值:', res)
      //   if (Array.isArray(res)) {
      //     this.options = res.slice(0, 16)
      //   } else {
      //     console.error('Received data is not an array.')
      //   }
      // })
    },

    remoteMethod(query) {
      if (query !== '') {
        this.loadingSel = true
        setTimeout(() => {
          getOpenCityList(query).then((res) => {
            console.log(res)
            this.options = res.data.filter((item) => {
              return item.name.indexOf(query) > -1
            })
          })
          this.loadingSel = false
        }, 200)
      } else {
        this.options = []
      }
    },
    modClick() {
      this.params.detail = !this.params.detail
    },
    checkForm() {
      let { isPass: formCheckRes = false } = this.$refs.serveInfo.validateFn()
      console.log('🚀 ~ checkForm ~ formCheckRes:', formCheckRes)
    },

    handleLeftFixName(obj) {
      const part = obj.nickName.split('_') // 修正为 split
      obj.nickName = part.slice(1).join('_')
      return obj
    },
    saveFrom() {
      console.log('🚀 ~ saveFrom ~ this.infoObj:', this.infoObj.serveInfo) //前面还需处理一下昵称前缀,这里是没有的
    },
    //下面是表格的
    onLoad(page = {}, params = {}) {
      //接口请求数据
      let queryObj = JSON.parse(this.searchStr)
      getUserInfoList({ ...params, limit: page.pageSize, total: page.total, page: page.currentPage })
        .then((res) => {
          console.log('当前返回的list是', res)
          if (res.code === 200) {
            this.data = res.rows || []
            console.log('🚀 ~ onLoad ~ res.rows:', res.rows)
            this.page.total = res.total || 0
          }
        })
        .catch((err) => {
          console.log('ERR异常', err)
        })
    },
    //设置行的样式
    rowStyle({ row, column, rowIndex }) {
      return ''
      // if (rowIndex % 2 === 0) {
      //   return {
      //     backgroundColor: '#eee',
      //     color: 'blue',
      //   }
      // }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 2) {
        if (row.age <= 35) {
          return {
            color: 'green',
            fontWeight: 'bold',
            fontSize: '20',
          }
        } else {
          return {
            color: 'red',
            fontWeight: 'bold',
            fontSize: '20',
          }
        }
      }
    },
    //应该是avue包版本低了没生效
    tableRowClassName({ row, rowIndex }) {
      // console.log('🚀 ~ tableRowClassName ~ rowIndex:', rowIndex)
      if (rowIndex === 0) {
        return 'warning-row'
      } else {
        return ''
      }
    },

    beforeOpen(done, type) {
      if (['add', 'view'].includes(type)) {
        console.log('🚀 ~ beforeOpen ~ type:', type)
      }
      done()
    },
    rowUpdate(row, index, loading, done) {
      loading()
      done()
    },
    rowSave(row, loading, done) {
      loading()
      done()
    },
    setCurrentRow(row, event, column) {
      let index = row.$index
      let val = [this.data[index]]
      this.$refs.crud.toggleSelection(val)
    },
    searchChange(params, done) {
      console.log('params', params)
      this.query = { ...params }
      this.searchStr = JSON.stringify(params)
      this.page.currentPage = 1
      this.onLoad(this.page, params)
      done()
    },
    searchReset() {
      this.query = {}
      this.searchStr = '{}'
      this.page = {
        pageSize: 10,
        currentPage: 1,
        total: 10,
      }
      this.onLoad(this.page)
    },
    selectionChange(list = []) {
      this.selectionList = [...list]
    },
    selectionClear() {
      this.selectionList = []
      this.$refs.crud && this.$refs.crud.toggleSelection()
    },
    currentChange(currentPage = 1) {
      this.page.currentPage = currentPage
    },
    sizeChange(pageSize = 10) {
      this.page.pageSize = pageSize
    },
    //排序
    sortChange(val) {
      this.$message.success(JSON.stringify(val))
    },
    showKeyV() {
      console.log('🚀 ~ showKeyV ~ success:', this.$refs.luckySelect)
      // this.$notify.success('数据为:', )
    },
  },
  computed: {
    // ...mapGetters(['permission']),
    permissionList() {
      // logger.log('🚀 ~ computed ~ permissionList:', this.permission)
      return {
        addBtn: false,
        viewBtn: false,
        editBtn: false,
        delBtn: false, //常用的4个按钮自带权限,可以去弄个方法vaildData( this.permission.serve_delBtn,false)默认false
      }
    },
    getColumn() {
      return (name = '') => {
        if (['serveInfo'].includes(name)) {
          return this.serveColumns
        }
      }
    },
    option6() {
      return {
        column: [
          {
            label: '级联',
            prop: 'cascader',
            type: 'cascader',
            dicData: this.dicData,
          },
        ],
      }
    },

    option() {
      return {
        size: 'mini', //设置按键大小
        // defaultSort: { //结合prop里的sortable
        //   prop: 'id',
        //   order: 'descending', //ascending 表示升序，descending 表示降序
        // },
        border: true, //边框线
        // stripe: true, //斑马纹
        // dialogDrag: true,//它带的弹框设置拖拽移动
        dialogMenuPosition: 'center', //它自带弹框里的确认按钮位置
        // headerAlign: 'left',//头部表格字段默认居中
        align: 'center', //表格内容居中,默认居左
        // menuAlign: 'center', //操作栏内容居中,默认居中
        searchLabelWidth: 100, //搜索的文本宽度 //默认为110,也可以给下面属性单独设置
        // height: 300, //设置表格高度 表格的高度超过设定值，就会出现滚动条，从而达到固定表头的效果
        searchGutter: 5, //搜索框之间的间距
        // submitBtn: true, //搜索框提交按钮,默认true //按钮的位置menuSpan|menuPosition
        // submitText:'完成',//对应的文本
        // emptyBtn: true, //搜索框重置按钮,默认true
        emptyBtnText: '重置', //默认清空-搜索的文本
        // menu: false, //默认true有操作栏
        // menuTitle: '其它',//操作栏标题
        // menuWidth: 250,
        // menuAlign: 'left',
        // menuHeaderAlign: 'left',

        addBtn: false, //表格左上方的新增按钮true则展示
        viewBtn: true, //操作里的查看按钮,默认隐藏
        // delBtn: false, //操作里的删除按钮,默认展示
        // editBtn: false, //操作里的编辑按钮,默认展示

        addBtnText: '新增', //默认新增-新增按钮的文本
        columnBtn: false, //列隐藏的按键,表格右上角
        searchShowBtn: false, //搜索隐藏的按键,表格右上角
        gridBtn: false, //直接讲表格换了样式column未定义
        index: true, //序号,发现没有递增
        indexLabel: '序号',
        searchIcon: true, //启用展开和搜索search
        searchIndex: 3, //默认展示2个搜索条件
        selection: true, //是否可以选择
        selectable: (row, index) => {
          //索引不为1才能选择
          return index !== 1
        },
        // reserveSelection: true, //保留翻页前的数据，感觉还是有bug
        // tip: false,//会提示当前表格已选择多少项
        span: 24,
        searchSpan: 6, //搜索框宽占比
        // searchMenuSpan: 18, //搜索按钮的长度
        // searchBtnIcon: 'el-icon-user',//修改搜索按钮的图标
        // excelBtn: false,
        // filterBtn: false,
        tip: true, //选择框的提示语
        column: [
          {
            label: '序号',
            prop: '_descIndex',
            width: 80,
            formatter: (row, column, cellValue, index) => {
              const list = (this.infoObj && this.infoObj.serveInfo && this.infoObj.serveInfo.envInfo) || []
              return list.length - index
            },
          },
          {
            label: 'id',
            prop: 'userId',
            slot: true, //插槽
            sortable: true, //开启排序
          },
          {
            label: '昵称',
            prop: 'nickname',
            search: true,
            formatter: (val, value, label) => {
              return val.nickname + '-格式化内容'
            },
          },
          {
            label: '账号',
            prop: 'username',
            search: true,
            searchOrder: 1, //搜索字段排序 不写默认为0搜索字段排序不影响表格顺序
            // searchRules: [
            //   {
            //     //还能加入校验搜索框不能为空
            //     required: true,
            //     message: '请输入账号',
            //     trigger: 'blur',
            //   },
            // ],
            searchTip: '我是一个左边提示语',
            searchTipPlacement: 'left',
          },
          { label: '年龄', prop: 'age' },
          {
            label: '性别',
            prop: 'sex',
            filters: true, //表头那可以过滤
            dicData: [
              { label: '男', value: '男' },
              { label: '女', value: '女' },
            ],
            filterMethod: function (value, row, column) {
              return row.sex === value
            },
          },
          { label: '邮箱', prop: 'email' },
          {
            label: '手机号',
            prop: 'mobile',
            search: true,
            searchValue: '138...', //搜索默认值
            html: true,
            // hide: true,//直接隐藏这一列
            formatter: (val) => {
              return '<b style="color:pink">' + val.mobile + '-格式化内容</b>'
            },
          },
          {
            label: '创建时间',
            prop: 'createTime',
            type: 'datetime',
            searchRange: true,
            search: true,
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
            row: true,
          },
          {
            label: '备注',
            prop: 'remark',
            search: true, //搜索
            // hide: true,//隐藏列
            overHidden: true, //字数多悬浮查看
          },
        ],
      }
    },

    serveColumns() {
      return [
        {
          label: '姓名',
          prop: 'name',
          labelslot: true, //name文字的插槽
          formslot: true, //表单name输入框的插槽
          rules: [
            {
              required: true,
              message: '请输入姓名',
              trigger: 'blur',
            },
          ],
        },
        {
          label: '年龄',
          prop: 'age',
          placeholder: '  ',
          rules: [],
        },
        {
          label: '昵称',
          prop: 'nickName',
          maxlength: 10,
          showWordLimit: true,
          prepend: 'lucky_',
          placeholder: '只能输入数字、字母、下划线而且下划线只能在中间,最多10',
          rules: [
            { required: true, message: '请输入昵称', trigger: ['blur', 'change'] },
            {
              pattern: /^(?!_)[a-zA-Z0-9]*[a-zA-Z0-9_]*[a-zA-Z0-9](?<!_)$/,
              message: '只能输入数字、字母、下划线而且下划线只能在中间',
              trigger: 'blur',
            },
          ],
        },
        {
          label: '身份证',
          prop: 'idCard',
          disabled: true,
          rules: [],
        },
        {
          label: 'QQ',
          prop: 'qq',
          disabled: true,
          rules: [],
        },
        {
          label: '城市',
          prop: 'city',
          clearable: false,
          type: 'select', //默认是input
          dicData: this.cityTypeList,
          props: {
            //默认是label和value,不是则需要改
            label: 'label',
            value: 'dataValue',
          },

          rules: [],
        },
        {
          label: '区域',
          prop: 'area',
          disabled: true,
          display: ['1'].includes(this.infoObj.serveInfo.city), //是否隐藏当前表单项
        },
        {
          label: '备注',
          prop: 'remark',
          type: 'textarea',
          span: 24,
        },
      ]
    },
  },
}
</script>
<style scoped>
.warning-row {
  background-color: #f40606 !important;
  color: #fff;
}
.success-row {
  background-color: #67c23a !important;
  color: #fff;
}
.warning-row.hover-row td,
.success-row.hover-row td {
  background-color: initial !important;
}
</style>
