<template>
  <div>
    <el-radio-group v-model="size" label="size control">
      <el-radio-button value="large">large</el-radio-button>
      <el-radio-button value="default">default</el-radio-button>
      <el-radio-button value="small">small</el-radio-button>
    </el-radio-group>
    <el-button @click="clickWeek">一周</el-button>
    <div class="demo-date-picker">
      <div class="block">
        <span class="demonstration">Default</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          :size="size"
        />
      </div>
      <div class="block">
        <span class="demonstration">With quick options</span>
        <el-date-picker
          v-model="timeRange"
          type="daterange"
          unlink-panels
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          :shortcuts="shortcuts"
          :size="size"
          :default-time="[new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const size = (ref < 'default') | 'large' | ('small' > 'default')

const value1 = ref('')
const timeRange = ref([])
const clickWeek = () => {
  let today = new Date() //转换的日期，必须加会被覆盖
  let endDay = new Date() //结束的日期
  let sevenDay = new Date(parseInt(today.setTime(today.getTime() - 3600 * 1000 * 24 * 6))) //7天前开始日期
  timeRange.value[0] = formatDate(sevenDay)
  // this.$set(this.timeRange, [1], this.formatDate(endDay));
  timeRange.value[1] = formatDate(endDay)
  console.log(timeRange.value)
  // value2.value = ['2023-03-01', '2023-03-07']
}

const formatDate = (date) => {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  return y + '-' + m + '-' + d
}
const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
</script>

<style scoped>
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
