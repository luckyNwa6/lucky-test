<template>
  <div>
    <el-calendar>
      <template #date-cell="{ data }">
        <div style="text-align: right; font-weight: 600; margin-bottom: 10px">
          {{ data.day.split('-').slice(2).join('').replace(/^0+/, '') }}
        </div>
        <template v-for="(item, index) in resData" :key="index">
          <p @click="openDialog(item)" v-if="data.day === item.day" :class="[data.isSelected ? 'is-selected' : '']">
            {{ item.task.name }}
            <View width="12px" />
          </p>
        </template>
      </template>
    </el-calendar>

    <el-dialog v-model="dialogVisible" :title="dialogObj.task.name" width="500" :before-close="handleClose">
      <span>{{ dialogObj.task.data }}</span>
    </el-dialog>
  </div>
</template>
<script setup>
const dialogVisible = ref(false)
const dialogObj = reactive({
  title: '',
  content: '',
})
const resData = ref([
  {
    day: '2024-04-09',
    task: {
      name: '任务1',
      data: '这是任务名称',
    },
  },
  {
    day: '2024-04-10',
    task: {
      name: '任务2',
      data: '这是任务名称',
    },
  },
  {
    day: '2024-04-11',
    task: {
      name: '任务3',
      data: '这是任务名称',
    },
  },
])
const openDialog = (data) => {
  Object.assign(dialogObj, data)
  console.log('🚀 ~ openDialog ~ dialogObj:', dialogObj)
  console.log(data)
  nextTick(() => {
    dialogVisible.value = true
  })
}

const handleClose = (done) => {
  ElMessageBox.confirm('确定要关闭吗?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>
<style>
.is-selected {
  color: #1989fa;
}
</style>
