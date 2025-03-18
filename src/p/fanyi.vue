<template>
  <div>
    <div>小维在线翻译</div>
    <el-input v-model="q" style="width: 400px; margin-right: 10px; margin-top: 20px; margin-bottom: 20px"></el-input>
    <el-button @click="translateText">翻译</el-button>
    <div>Result:{{ result }}</div>
  </div>
</template>

<script setup>
import MD5 from 'js-md5'
import { ref } from 'vue'

const appid = '20230908001809439'
const key = 'PEXtjvB3p2CoLF5TNEa3'
const salt = 'luckyNwa666'
const q = ref('')
const result = ref('')
const from = ref('en')
const to = ref('zh')
const sign = ref('')

// watch(
//   () => q.value,
//   (newVal, oldVal) => {
//     console.log('🚀 ~ watch ~ oldVal:', oldVal)
//     console.log('🚀 ~ watch ~ newVal:', newVal)
//   },
// )

const translateText = () => {
  console.log('未处理前的字符串：', appid + q.value + salt + key)
  sign.value = MD5(appid + q.value + salt + key) //里面是固定的字符串格式
  console.log('🚀 ~ translateText ~ MD5后的字符串:', sign.value)

  $.ajax({
    url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
    type: 'get',
    dataType: 'jsonp',
    data: {
      q: q.value,
      appid: appid,
      salt: salt,
      from: from.value,
      to: to.value,
      sign: sign.value,
    },
    success: function (res) {
      console.log(res)
      result.value = res.trans_result[0].dst
    },
  })
}
</script>

<style lang="scss" scoped></style>
