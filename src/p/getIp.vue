<template>
  <div>当前电脑的IP为:{{ ip }}</div>
</template>

<script setup>
const ip = ref('')
var request = new XMLHttpRequest()
request.open('GET', 'https://api.ipify.org?format=json', true)
request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText)
    ip.value = data.ip
    console.log(data.ip)
  }
}
request.onerror = function () {
  console.error('Error occurred during the network request')
}
request.send()
</script>

<style lang="scss" scoped></style>
