<template>
  <div>
    <avue-form ref="form" v-model="baseInfoObj" :option="baseInfoOption">
      <template slot="nameLabel" slot-scope="{}">
        <span>姓名辣&nbsp;&nbsp;</span>
        <el-tooltip class="item" effect="dark" content="文字提示哈哈哈" placement="top-start">
          <i class="el-icon-warning" />
        </el-tooltip>
      </template>
      <template slot="name" slot-scope="{ disabled, size }">
        <el-input v-model="baseInfoObj.name" :disabled="disabled" :size="size" placeholder="请输入名称自定义"></el-input>
      </template>
    </avue-form>
  </div>
</template>

<script>
export default {
  props: {
    data: { type: Object, default: () => {} },
    params: { type: Object, default: () => {} },
    columns: { type: [Array], default: [] },
  },
  data() {
    return {}
  },
  methods: {
    //表单校验
    async validateFn() {
      return new Promise(async (resolve, reject) => {
        // this.$refs.form.validate(valid => {
        //   if (valid) {
        //     resolve(true)
        //   } else {
        //     reject(false)
        //   }
        // })
        await this.$refs.form.validate((valid, done, msg) => {
          console.log('表单校验结果:', valid)
          if (valid) resolve({ isPass: true, code: 200 })
          if (!valid) resolve({ isPass: false, code: 400, msg: msg })
          done()
        })
      })
    },
  },
  computed: {
    //表单渲染的真正数据,这边修改data里的数据-->通过this.$set(this.data,"属性名","需要的赋值"),修改data数据
    baseInfoObj: {
      get() {
        return this.data
      },
      set(val) {
        this.$emit('update:data', val)
      },
    },
    //配置,控制表单是否是详情模式
    config() {
      return {
        detail: false,
        ...this.params,
      }
    },
    baseInfoOption() {
      return {
        labelWidth: 120,
        detail: this.config.detail,
        emptyBtn: false,
        submitBtn: false,
        menuBtn: false,
        span: 6,
        column: this.columns,
      }
    },
  },
}
</script>

<style></style>
