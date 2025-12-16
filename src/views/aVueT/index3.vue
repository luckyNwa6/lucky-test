<template>
  <div style="padding: 100px">
    <!-- form表单里加了个表格 -->
    <avue-form
      :option="option"
      v-model="form"
      ref="form"
      @submit="
        (form, done) => {
          submit(form, done, '该提交了')
        }
      "
    >
      <template slot="titleTipLabel" slot-scope="{}">
        <span style="color: red; font-weight: 600">Tip：请维护各种地址</span>
      </template>

      <template slot="titleTip" slot-scope="{}">
        <el-input style="display: none" v-model="form.titleTip" placeholder=""></el-input>
      </template>

      <template slot="envInfoLabel" slot-scope="{}">
        <span style="display: none"></span>
      </template>
      <!-- 自定义环境列 -->
      <template v-slot:env="{ row }">
        <el-select v-model="row.env" :disabled="!!row.id" placeholder="请选择环境" style="width: 100%">
          <el-option label="测试环境1" value="1" />
          <el-option label="测试环境2" value="2" />
        </el-select>
      </template>
    </avue-form>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resData: {},
      form: {},
      option: {
        submitBtn: true, // 显示提交按钮
        column: [
          {
            label: '环境与地址',
            prop: 'title1',
            type: 'title',
            span: 24,
            className: 'titleCss',
            labelWidth: '87px',
            fontSize: '18px',
          },
          {
            label: '（Tip:请分别维护测试环境、预发测试环境、生产环境的地址信息）',
            prop: 'titleTip',
            span: 24,
            className: 'titleTipCss',
            labelWidth: '87px',
            formslot: true,
            labelslot: true,
          },
          {
            label: '环境信息',
            prop: 'envInfo',
            type: 'dynamic',
            labelPosition: 'top',

            span: 24,
            children: {
              align: 'center',
              height: '198px',
              style: {
                'overflow-y': 'auto',
                'max-height': '198px',
              },

              rowAdd: (done) => {
                const objN = {
                  env: '',
                  address: '',
                }
                this.$nextTick(() => {
                  this.$refs.form.value.envInfo.unshift(objN)
                })
                // done(objN)
              },

              rowDel: (row, done) => {
                console.log('🚀 ~ data ~ row:', row)
                // this.$message.success('删除回调' + JSON.stringify(row))
                done()
              },
              column: [
                {
                  label: '环境',
                  prop: 'env',
                  type: 'select',
                  slot: true, // 启用插槽模式
                  dicData: [
                    { label: '测试环境1', value: '1' },
                    { label: '测试环境2', value: '2' },
                  ],
                  rules: [{ required: true, message: '请选择环境', trigger: 'blur' }],
                },
                {
                  label: '地址',
                  prop: 'address',
                },
              ],
            },
          },

          {
            label: '描述',
            prop: 'desc',
            span: 11,
            // disabled: true,
            labelPosition: 'top',
            type: 'textarea',
            rules: [{ required: true, message: '请输入描述', trigger: 'blur' }],
          },
        ],
      },
    }
  },
  methods: {
    async validateFn() {
      return new Promise(async (resolve, reject) => {
        await this.$refs.form.validate((valid, done, msg) => {
          if (valid) resolve({ isPass: true })
          if (!valid) resolve({ isPass: false, msg })
          done()
        })
      })
    },
    async submit(obj, done, tip = '') {
      console.log('🚀 ~ submit ~ form:', this.$refs.form)
      const { isPass = false } = await this.validateFn()
      console.log('🚀 ~ submit ~ isPass:', isPass)
      if (isPass) {
        this.$message.success('校验通过')
        return true
      } else {
        this.$message.error('带*必填')
        return false
      }
    },
  },
  mounted() {
    this.resData = {
      desc: '这里是描述==================',
      envInfo: [
        {
          id: 123,
          env: '1',
          address: 'http://192.168.1.1:8080',
        },
        {
          env: '2',
          address: 'http://192.168.1.2:8080',
        },
      ],
    }
    this.form = this.resData
  },
}
</script>

<style lang="scss" scoped>
::v-deep .titleCss .el-form-item__label {
  font-size: 16px !important;
  font-weight: 600;
}
</style>
