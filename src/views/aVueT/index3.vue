<template>
  <div style="padding: 100px">
    <el-button @click="addAll" size="small" type="primary">添加10条子表单数据</el-button>

    <avue-form :option="option" v-model="form">
      <!-- 输入框插槽 -->
      <template slot-scope="{ row }" slot="input">
        <el-tag>序号:{{ row.$index }}-数据:{{ row.input }}</el-tag>
      </template>

      <!-- 新增选择框自定义插槽 -->
      <template slot-scope="{ row }" slot="select">
        <el-select v-model="row.select" :disabled="row.$index === 0" placeholder="请选择">
          <el-option
            v-for="item in option.column[0].children.column[1].dicData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </template>
    </avue-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        dynamic: [
          { input: 1, select: 1 },
          { input: 2, select: 2 },
        ],
      },
      option: {
        column: [
          {
            label: '子表单',
            prop: 'dynamic',
            type: 'dynamic',
            span: 24,
            children: {
              align: 'center',
              headerAlign: 'center',
              rowAdd: (done) => {
                this.$message.success('新增回调')
                done({ input: '默认值' })
              },
              rowDel: (row, done) => {
                this.$message.success('删除回调' + JSON.stringify(row))
                done()
              },
              column: [
                {
                  width: 200,
                  label: '输入框',
                  prop: 'input',
                },
                {
                  label: '选择框',
                  prop: 'select',
                  type: 'select',
                  slot: true, // 启用插槽模式
                  dicData: [
                    { label: '测试1', value: 1 },
                    { label: '测试2', value: 2 },
                  ],
                },
              ],
            },
          },
        ],
      },
    }
  },
  methods: {
    addAll() {
      for (let i = 0; i < 10; i++) {
        this.form.dynamic.push({
          input: `新增${this.form.dynamic.length + 1}`,
          select: 1,
        })
      }
    },
  },
}
</script>
