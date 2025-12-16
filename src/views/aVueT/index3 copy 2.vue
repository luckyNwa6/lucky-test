<template>
  <div style="padding: 100px">
    <avue-form :option="option" v-model="form" ref="form">
      <!-- 自定义新增按钮（放在表格标题位置） -->
      <template slot="envInfoLabel">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%">
          <span style="font-weight: 600">环境信息</span>
          <el-button size="mini" type="primary" @click="addRow">新增环境</el-button>
        </div>
      </template>

      <!-- 自定义删除按钮插槽（prop = deleteBtn） -->
      <template slot="deleteBtn" slot-scope="{ row, index }">
        <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="removeRow(index)"></el-button>
      </template>
    </avue-form>
  </div>
</template>

<script>
export default {
  data() {
    const vm = this // 在 data 中捕获 vm，供 formatter 闭包使用（避免 this 在运行时丢失）
    return {
      form: {
        envInfo: [
          { env: '测试环境1', address: '192.168.1.10' },
          { env: '预发环境', address: '10.0.0.12' },
        ],
      },
      option: {
        labelWidth: 100,
        column: [
          {
            label: '环境与地址',
            prop: 'title1',
            type: 'title',
            span: 24,
            fontSize: '18px',
          },
          {
            label: '环境信息',
            prop: 'envInfo',
            type: 'dynamic',
            span: 24,
            labelslot: true, // 使用上面定义的 envInfoLabel slot
            children: {
              index: false, // 关闭内置序号列（我们自定义序号）
              align: 'center',
              headerAlign: 'center',
              height: 200,
              style: { 'overflow-y': 'auto', 'max-height': '200px' },
              column: [
                // 自定义倒序序号列（注意这里使用 vm 来读取数据）
                {
                  label: '序号',
                  prop: 'customIndex',
                  width: 70,
                  // 使用普通 function 并访问 vm.form.envInfo（更稳定）
                  formatter: function (row, column, cellValue, index) {
                    const list = vm && vm.form && Array.isArray(vm.form.envInfo) ? vm.form.envInfo : []
                    // index 可能为 undefined（保险起见），返回安全值
                    if (typeof index !== 'number') return list.length
                    return list.length - index
                  },
                },
                {
                  label: '环境',
                  prop: 'env',
                  type: 'select',
                  dicData: [
                    { label: '测试环境1', value: '测试环境1' },
                    { label: '预发环境', value: '预发环境' },
                    { label: '生产环境', value: '生产环境' },
                  ],
                },
                {
                  label: '地址',
                  prop: 'address',
                },
                {
                  label: '操作',
                  prop: 'deleteBtn',
                  width: 80,
                  formslot: true,
                  cell: true,
                  slot: true, // 启用插槽（上面 slot="deleteBtn"）
                },
              ],
            },
          },
        ],
      },
    }
  },
  methods: {
    addRow() {
      const newRow = { env: '', address: '' }
      // 插到顶部（最新在上）
      if (!Array.isArray(this.form.envInfo)) {
        this.$set(this.form, 'envInfo', [])
      }
      this.form.envInfo.unshift(newRow)
    },
    removeRow(index) {
      if (!Array.isArray(this.form.envInfo)) return
      this.form.envInfo.splice(index, 1)
    },
  },
}
</script>

<style scoped>
::v-deep .avue-dynamic .el-table {
  border: 1px solid #ebeef5;
  border-radius: 4px;
}
</style>
