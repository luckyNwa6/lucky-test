<template>
  <div style="padding: 30px">
    <el-card>
      <div slot="header" class="clearfix">
        <span>弹框组件常用场景</span>
        <el-button @click="openDialog" style="float: right; padding: 3px 0" type="text">内置弹框</el-button>
      </div>
      <p style="margin-bottom: 15px">（1）弹框看情况是直接放本vue里</p>
      <p>（2）可以单独弄一个组件出来展示</p>

      <el-divider></el-divider>
      <el-button @click="addOrUpdateHandle()" type="primary">（新增）组件弹框</el-button>
      <el-button @click="addOrUpdateHandle(66)" type="primary">（修改）组件弹框</el-button>
    </el-card>
    <!-- 内置弹窗, 新增 / 修改 -->
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" width="500px" append-to-body>
      <h3>is show time</h3>

      <span slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button type="primary" :loading="dialogInfo.loading" @click="sub">确认</el-button>
      </span>
    </el-dialog>

    <!-- 组件弹窗, 新增 / 修改 -->
    <add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @refreshDataList="getDataList"
      :params="params"
      :data.sync="dataObj"
    ></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './demo-add-update'

export default {
  components: {
    AddOrUpdate,
  },
  data() {
    return {
      addOrUpdateVisible: false,
      dataObj: {
        name: 'luckyAAA',
      },
      params: {
        detail: false,
        pageType: 'add',
      },
      dialogInfo: {
        title: '简单弹框',
        visible: false,
        loading: false,
      },
    }
  },
  methods: {
    getDataList() {
      this.$notify({
        title: '更新数据',
        message: '开始获取列表信息-----------',
      })
    },
    // 新增 / 修改
    addOrUpdateHandle(userId) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(userId)
      })
    },
    openDialog() {
      // 打开表单，并设置初始化
      this.dialogInfo.visible = true
    },
    sub() {
      this.dialogInfo.loading = true
      setTimeout(() => {
        console.log('开启异步请求')
        this.dialogInfo.loading = false
        this.dialogInfo.visible = false
      }, 500)
    },
  },
}
</script>

<style></style>
