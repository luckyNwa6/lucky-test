<template>
  <el-dialog :title="!dataForm.userId ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit" label-width="80px">
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="dataForm.nickname" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getUserInfoList, addOrUpdateInfo } from '@/api/user/index'
export default {
  props: {
    data: { type: Object, default: () => {} }, //配合dataObj 同步数据
    params: { type: Object, default: () => {} }, //父-->子,单向这里不能改
  },
  data() {
    return {
      visible: false,
      dataForm: {
        userId: null,
        nickname: '',
        remark: '',
      },
      dataRule: {
        nickname: [{ required: true, message: '昵称不能为空', trigger: 'blur' }],
      },
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 10,
      },
    }
  },
  methods: {
    init(userId) {
      this.dataForm.userId = userId || null
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.userId) {
          getUserInfoList({
            userId,
            limit: this.page.pageSize,
            total: this.page.total,
            page: this.page.currentPage,
          }).then((res) => {
            console.log('当前返回的list是', res)
            if (res.code === 0) {
              this.dataForm.nickname = res.data.list[0].nickname
              this.dataForm.remark = res.data.list[0].remark
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let sendName = !this.dataForm.userId ? 'saveUserInfo' : 'updateUserInfo'
          addOrUpdateInfo(sendName, {
            userId: this.dataForm.userId || null,
            nickname: this.dataForm.nickname,
            remark: this.dataForm.remark,
          }).then((res) => {
            if (res.code === 0) {
              this.$message({
                message: res.msg,
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                },
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
  },
  computed: {
    dataObj: {
      //内部表单啥的绑定这个数据，修改它，外部也会同步变化
      get() {
        return this.data
      },
      set(val) {
        this.$emit('update:data', val)
      },
    },

    //config前面属性是初始,params中有则覆盖值
    config() {
      return {
        detail: false,
        pageType: 'add',
        ...this.params,
      }
    },
  },
}
</script>
