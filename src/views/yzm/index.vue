<template>
  <div class="login-div">
    <div class="kuang">
      <span class="kuang-left">用户名</span>
      天爱有情
    </div>
    <div class="kuang">
      <span class="kuang-left">密码</span>
      *********
    </div>
    <div id="login-btn" @click="loginBtn">登录</div>
    <div id="captcha-div"></div>
  </div>
</template>

<script>
import '@/assets/captcha/css/tac.css' // 验证码css
import '@/assets/captcha/js/tac.min.js' // 验证码js

export default {
  mounted() {
    console.log(jQuery)
  },
  methods: {
    loginBtn() {
      // 样式配置
      const config = {
        requestCaptchaDataUrl: 'http://localhost:10086/luckyAdmin/LuckyYzm/gen',
        validCaptchaUrl: 'http://localhost:10086/luckyAdmin/LuckyYzm/gen',
        bindEl: '#captcha-div',
        // 验证成功回调函数
        validSuccess: (res, c, tac) => {
          this.login()
          tac.destroyWindow()
        },
      }
      new window.TAC(config).init() // 获取要删除的元素
      var elementToRemove = document.getElementById('tianai-captcha-logo')

      // 确保找到了元素再执行删除操作
      if (elementToRemove) {
        // 获取父元素
        var parentElement = elementToRemove.parentNode
        elementToRemove.src = '@/assets/imgs/avatar.png'
        // 从父元素中移除子元素
        // parentElement.removeChild(elementToRemove)
        console.log('删除')
      } else {
        console.log('未找到要删除的元素')
      }
    },
    login() {
      alert('登录成功')
    },
  },
}
</script>

<style>
/* #tianai-captcha-logo {
  display: none;
} */
</style>
