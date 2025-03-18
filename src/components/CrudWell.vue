<!--crud组件进阶  自定义插槽使用  作为案例就不封装了-->
<template>
  <div>
    <avue-crud class="autoHeaderHeight" :option="option" :data="data" ref="crud">
      <template slot-scope="scope" slot="menuLeft">
        <el-button icon="el-icon-plus" type="primary" :size="scope.size" @click="addRowN">新增</el-button>
      </template>
      <!--有Form对应的是cell的展示-->
      <template slot-scope="scope" slot="nameForm">
        <el-input v-model="scope.row.name" :disabled="!!scope.row.id" :size="scope.size" placeholder="请输入"></el-input>
      </template>
      <template slot-scope="scope" slot="name">
        <el-input v-model="scope.row.name" :disabled="!!scope.row.id" :size="scope.size" placeholder="请输入"></el-input>
      </template>

      <template slot-scope="scope" slot="role">
        <el-select v-model="scope.row.role" :disabled="!!scope.row.id" :size="scope.size" placeholder="请选择">
          <el-option v-for="item in roleTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </template>
    </avue-crud>
  </div>
</template>

<script>
export default {
  name: 'CrudWell',
  data() {
    return {
      resData: [
        {
          name: '张三',
          id: 1,
          state: '1',
          role: '0',
        },
        {
          name: '李四',
          id: 2,
          state: '0',
          role: '1',
        },
        {
          name: '王五',
          id: 3,
          state: '1',
          role: '1',
        },
        {
          name: '赵六',
          id: 4,
          state: '1',
          role: '1',
        },
        {
          name: '钱七',
          id: 5,
          state: '1',
          role: '1',
        },
        {
          name: '孙八',
          id: 6,
          state: '1',
          role: '1',
        },
      ],
      data: [],
      roleTypeList: [
        {
          label: '管理员',
          value: '0',
        },
        {
          label: '普通用户',
          value: '1',
        },
      ],
    }
  },
  created() {
    this.data = this.resData.map((item) => {
      if (item.role !== '0') {
        item.$cellEdit = true
      }
      return item
    })

    console.log('🚀 ~ this.data:', this.data)
  },
  methods: {
    addRowN(row) {
      this.data.unshift({ ...row, $cellEdit: true })
    },
  },
  computed: {
    option() {
      return {
        size: 'mini', //设置按键大小
        border: true, //边框线
        align: 'center', //表格内容居中,默认居左
        menuAlign: 'center', //操作栏内容居中,默认居中
        index: false, //索引
        menu: true, //展示操作栏,结合权限
        // height: 234,//这样固定高
        cellBtn: true, //对应cell元素才有的操作栏里的操作（保存、取消）
        addBtn: false, //表格左上方的新增按钮true则展示
        delBtn: false, //操作里的删除按钮,默认展示
        editBtn: false, //操作里的编辑按钮,默认展示
        page: false, //关闭分页
        emptyBtnText: '重置', //默认清空-搜索的文本
        addBtnText: '新增', //默认新增-新增按钮的文本
        columnBtn: false, //列隐藏的按键,表格右上角
        searchShowBtn: false, //搜索隐藏的按键
        gridBtn: false, //直接讲表格换了样式column未定义
        span: 24,
        column: [
          {
            label: '姓名',
            prop: 'name',
            cell: true,
            slot: true,
            rules: [
              {
                required: true,
                message: '请输入姓名',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '角色',
            prop: 'role',
            cell: true,
            type: 'select',
            dicData: this.roleTypeList,
            rules: [
              {
                required: true,
                message: '请输入选择',
                trigger: 'change',
              },
            ],
          },
        ],
      }
    },
  },
}
</script>

<style>
.autoHeaderHeight .avue-crud__header {
  min-height: auto;
}
</style>
