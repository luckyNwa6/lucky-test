<template>
  <div style="padding: 30px">
    <el-button @click="login">Express登录</el-button>
    <!-- 打开nodeT->zhenghe->执行nodemon app.js  -->
    <el-button @click="exit">退出登录</el-button>
    <el-button @click="testSession">测试Session</el-button>
    <el-divider></el-divider>
    <el-button @click="mockTest">mock测试</el-button>
    <el-divider></el-divider>
    数据回显区:😃
    <span>{{ responseData }}</span>
    <el-divider></el-divider>
    <p style="margin-bottom: 20px">路由跳转:</p>
    <el-button @click="goCharts">图表测试</el-button>
    <el-select style="margin: 0 10px" v-model="avueValue" placeholder="请选择AVUE案例" @change="handleChange">
      <el-option v-for="item in avueSelectOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-button @click="goAVue">aVue测试</el-button>
    <el-button @click="goScreen">大屏</el-button>
    <el-button @click="goDialog">弹框组件</el-button>
    <el-button @click="goStep">导航组件</el-button>
    <el-button @click="goYzm">验证码</el-button>
    <el-divider></el-divider>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称" class="luckyTest">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from 'axios'
import { userList } from '@/api/user'
export default {
  data() {
    return {
      form: {
        name: 'HHA',
      },
      responseData: '',
      url: require('@/assets/imgs/Connect_logo_7.webp'),
      avueValue: '',
      avueSelectOpt: [
        { value: '/aVueT', label: '基础' },
        { value: '/aVueT/index2', label: '表单' },
        { value: '/aVueT/index3', label: '子表单' },
        { value: '/aVueT/index4', label: '特殊表格' },
      ],
    }
  },
  methods: {
    handleChange(path) {
      this.$router.push(path)
    },
    //下面是路由跳转
    goJisuanqi() {
      this.$router.push('/jisuanqi')
    },
    goCharts() {
      this.$router.push('/chartsT')
    },

    goScreen() {
      this.$router.push('/screen')
    },
    goDialog() {
      this.$router.push('/dialog')
    },
    goStep() {
      this.$router.push('/step')
    },
    goYzm() {
      this.$router.push('/yzm')
    },
    //下面是测试session
    testSession() {
      request.get('http://localhost/api/testSession').then((res) => {
        this.responseData = res.data
      })
    },
    //下面是按钮点击回显
    login() {
      const data = {
        username: 'admin',
        password: 'admin',
      }
      request.post('http://localhost/api/login', data).then((res) => {
        this.responseData = res.data
      })
    },
    exit() {
      request.post('http://localhost/api/logout').then((res) => {
        this.responseData = res.data
      })
    },
    testSession() {
      request.get('http://localhost/api/userInfo').then((res) => {
        this.responseData = res.data
      })
    },
    mockTest() {
      userList().then((res) => {
        this.responseData = res.data
      })
    },
  },
  created() {
    /*看板娘初始化
    参数说明
    model 模型的配置
       json 文件资源路径，可以支持网络路径，此处使用的是相对路径
       scale 模型缩放系数
    display 模型布局
       position 位置
       width 宽度
       height 高度
       hOffset 水平偏移量
       vOffset 垂直偏移量
    mobile 移动端配置
       show 显示/隐藏
       scale 缩放比例
    react 模型矩形框样式
       opacity 透明度
       opacityDefault 默认透明度
       opacityOnHover 鼠标悬浮透明度
  */
    // setTimeout(() => {
    //   window.L2Dwidget.init({
    //     pluginRootPath: '../live2dw/',
    //     pluginJsPath: 'lib/',
    //     pluginModelPath: 'live2d-widget-model-haru_1/assets/', //中间这个haru_2就是你的老婆,想换个老婆,换这个就可以了
    //     tagMode: false,
    //     debug: false,
    //     model: {
    //       jsonPath: '../live2dw/live2d-widget-model-haru_1/assets/haru01.model.json',
    //     },
    //     display: { position: 'left', width: 150, height: 400 }, //调整大小,和位置
    //     mobile: { show: true }, //要不要盯着你的鼠标看
    //     log: false,
    //   })
    // }, 1000)
  },
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>

<style scoped>
::v-deep .luckyTest .el-form-item__label {
  color: red;
}
</style>
