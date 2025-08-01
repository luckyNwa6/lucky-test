<!--acrud表格中使用表单-->
<template>
  <div>
    <!-- el-table -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label">
        <template #default="scope">
          <div v-if="col.hasTooltip && scope.row[col.prop]">
            <el-tooltip effect="dark" :content="scope.row.tip" placement="top">
              <el-input v-model="scope.row[col.prop]"></el-input>
            </el-tooltip>
          </div>
          <span v-else>{{ scope.row[col.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>

    <!-- avue-crud -->
    <avue-crud :data="tableData" :option="option">
      <!-- 自定义 name 插槽 -->
      <template slot-scope="scope" slot="nameForm">
        <el-tooltip v-if="scope.row.tip" effect="dark" :content="scope.row.tip" placement="left">
          <el-input v-model="scope.row.name" :size="scope.size" placeholder="请输入名称"></el-input>
        </el-tooltip>
      </template>
    </avue-crud>
  </div>
</template>

<script>
export default {
  computed: {
    option() {
      return {
        size: 'mini',
        index: true,
        page: false,
        menu: false,
        column: [
          {
            label: '姓名',
            prop: 'name',
            type: 'input', // 指定列为输入框类型
            cell: true, // 启用单元格编辑模式
            tip: '11111111111111',
            tipPlacement: 'bottom',
            rules: [
              {
                required: true,
                message: '请输入名称',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '年龄',
            prop: 'age',
            type: 'input',

            rules: [
              {
                required: true,
                message: '请输入年龄',
                trigger: 'blur',
              },
            ],
          },
        ],
      }
    },
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '张1',
          age: 25,
          tip: '这是提示张三',
        },
        {
          id: 2,
          name: '张2',
          age: 30,
          tip: '这是提示',
        },
        {
          id: 3,
          name: '张3',
          age: 28,
          tip: '自定义提示1111',
        },
        { id: 4, name: '张4', age: 30, tip: '自定义提示1111', $cellEdit: true },
        { id: 5, name: '', age: 28 },
      ],
      columns: [
        { prop: 'name', label: '姓名', hasTooltip: true },
        { prop: 'age', label: '年龄' },
      ],
    }
  },
}
</script>
