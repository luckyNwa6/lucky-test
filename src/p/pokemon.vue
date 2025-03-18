<template>
  <div>
    <div class="lucky">
      <hr />
      <span style="margin-left: 40px">数量：</span>
      <el-input v-model="picNum" placeholder="请输入图片的数量" style="width: 240px" clearable />
      <span style="margin-left: 40px">宽度：</span>
      <el-input v-model="picWidth" placeholder="请输入图片的宽度(默认带像素)" style="width: 240px" clearable />
      <span style="margin-left: 40px">高度：</span>
      <el-input v-model="picHeight" placeholder="请输入图片的高度(默认带像素)" style="width: 240px" clearable />
      <el-button @click="genPicS" type="primary" style="margin-left: 55px">生成</el-button>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="由于图片地址是动态的下载，所以下载不会是下面原图，也是随机的"
        placement="bottom-end"
      >
        <el-button @click="loadPicS" type="success" style="margin-left: 55px">全下载</el-button>
      </el-tooltip>
      <el-button @click="restPicS" type="warning" style="margin-left: 55px">清空图片</el-button>

      <el-button @click="getData" type="primary" style="margin-left: 55px">获取宝可梦数据图片</el-button>
      <hr />
      <el-card style="width: 100%; height: 700px; display: flex; overflow: auto" v-loading="loading">
        <div v-for="(item, index) in picList" v-if="showPic">
          <img :src="`http://picsum.photos/${item.width}/${item.height}?${index + 1}`" :alt="`pic${index + 1}`" />
        </div>
      </el-card>
    </div>
    <el-card style="width: 100%; height: 130px; display: flex; overflow: auto; margin-top: 10px">
      <div v-if="responseData">
        <h2>{{ responseData.name }}</h2>
        <div>height: {{ responseData.height }}</div>
        <div>weight: {{ responseData.weight }}</div>
        <img :src="responseData.sprites['other']['official-artwork']['front_default']" alt="pokemon pic" />
        <img :src="responseData.sprites['other']['official-artwork']['front_shiny']" alt="pokemon pic" />
        <img :src="responseData.sprites['other']['dream_world']['front_default']" alt="pokemon pic" />
        <img :src="responseData.sprites['other']['home']['front_default']" alt="pokemon pic" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import axios from 'axios'
const responseData = ref(null)
const picNum = ref(10)
const picWidth = ref(200)
const picHeight = ref(100)
const loading = ref(false)
const showPic = ref(false)
const picList = reactive([])
//获取自定义大小图片
const genPicS = () => {
  restPicS()
  if (!picWidth.value && !picHeight.value) {
    ElMessage({
      type: 'error',
      message: '宽度和高度不能同时为空！',
    })
    return false
  }
  showPic.value = true
  let arr = []
  for (let index = 0; index < picNum.value; index++) {
    arr.push({
      height: picHeight.value,
      width: picWidth.value,
    })
  }
  picList.splice(0, picList.length, ...arr)
  console.log('🚀 ~ genPicS ~ picList:', toRef(picList, 'value'))
}

//清空图片
const restPicS = () => {
  showPic.value = false
  responseData.value = null
}

//下载生成
const loadPicS = async () => {
  for (const index in picList) {
    let link = document.createElement('a')
    link.href = `http://picsum.photos/${picList[index].width}/${picList[index].height}?${Number(index) + 1}`
    link.download = `W${picList[index].width}H${picList[index].height}${Number(index)}.png`
    link.style.display = 'none' // 隐藏元素
    document.body.appendChild(link) // 添加到文档中

    try {
      const response = await fetch(link.href)
      const blob = await response.blob()
      const imageUrl = URL.createObjectURL(blob)
      link.href = imageUrl

      setTimeout(() => {
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(imageUrl)
      }, 100)
    } catch (error) {
      console.error('下载图片时出错:', error)
    }
  }
}
//获取宝可梦的图片
const getData = () => {
  axios
    .get('https://pokeapi.co/api/v2/pokemon/150/')
    .then((response) => {
      responseData.value = response.data
      console.log('🚀 ~ getData ~ this.responseData:', responseData.value)
    })
    .catch((error) => {
      console.error('请求失败', error)
    })
}

onMounted(() => {
  genPicS()
})
</script>

<style lang="scss" scoped></style>
