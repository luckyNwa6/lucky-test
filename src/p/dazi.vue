<script setup>
import { ref } from 'vue'
const stringA = ref('')
const stringB = ref('')
const stringCss = ref('')
stringB.value =
  '苏子曰：“客亦知夫水与月乎？逝者如斯，而未尝往也；盈虚者如彼，而卒莫消长也。盖将自其变者而观之，则天地曾不能以一瞬；自其不变者而观之，则物与我皆无尽也，而又何羡乎!且夫天地之间，物各有主,苟非吾之所有，虽一毫而莫取。惟江上之清风，与山间之明月，耳得之而为声，目遇之而成色，取之无禁，用之不竭，是造物者之无尽藏也，而吾与子之所共适。”'
stringCss.value =
  '苏子曰：“客亦知夫水与月乎？逝者如斯，而未尝往也；盈虚者如彼，而卒莫消长也。盖将自其变者而观之，则天地曾不能以一瞬；自其不变者而观之，则物与我皆无尽也，而又何羡乎!且夫天地之间，物各有主,苟非吾之所有，虽一毫而莫取。惟江上之清风，与山间之明月，耳得之而为声，目遇之而成色，取之无禁，用之不竭，是造物者之无尽藏也，而吾与子之所共适。”'

function print() {
  stringA.value = ''
  console.log(stringA.value.length, stringB.value.length)
  printAi()
}
function printAi() {
  if (stringA.value.length >= stringB.value.length) {
    // 退出递归
    return
  } else {
    // stringA仍然比stringB短，进入下一次等待和递归
    setTimeout(() => {
      stringA.value += stringB.value.charAt(stringA.value.length)
      printAi(stringA, stringB)
    }, 100)
  }
}
// onMounted(() => {
//   print()
// })
</script>

<template>
  <div>
    <el-card class="m-2 h-199">
      以下是2种打字效果，1-js，2-css
      <hr />
      <p class="text-6 ml-3">{{ stringA }}</p>
      <el-button class="mt-4 ml-3" @click="print">刷新</el-button>
      <hr />
      <p class="luckyCss">{{ stringCss }}</p>
    </el-card>
  </div>
</template>

<style scoped>
.text {
  font-size: 30px;
}
.luckyCss {
  font-size: 10px;
  margin: 100px auto 0;
  color: pink;
  width: 167em; /*值为文本长度+1，单位em*/
  animation: typingWords 60s steps(167) infinite; /* 打字动画，使用steps让字一个一个的出现*/
  white-space: nowrap; /* 要设置不允许换行，且溢出隐藏 */
  overflow: hidden; /* 使用右边框作为打印的指针光标 */
  border-right: 2px solid #222;
}

@keyframes typingWords {
  0% {
    width: 0;
  }
}
</style>
