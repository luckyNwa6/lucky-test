<template>
  <div>看控制台</div>
</template>

<script>
// import dayjs from 'dayjs'
export default {
  methods: {
    init() {
      //基础调用Start-----------------------------------------------------------------------------------
      var nowTime0 = this.dayjs().unix()
      console.log('🚀 ~ convertDateTimeFormat ~ 时间戳（秒）nowTime0:', nowTime0) //1706749967
      var nowTime2 = this.dayjs().format('YYYY/MM/DD')
      console.log('🚀 ~ convertDateTimeFormat ~ 年月日格式化nowTime2:', nowTime2) // 2024/02/01
      var nowTime3 = this.dayjs().format('YYYY-MM-DD HH:mm:ss')
      console.log('🚀 ~ convertDateTimeFormat ~ 年月日时分秒nowTime:', nowTime3) //2024-02-01 09:12:15
      var nowTime4 = this.dayjs().valueOf()
      console.log('🚀 ~ convertDateTimeFormat ~ 时间戳（毫秒）nowTime4:', nowTime4) //1706750110311

      const nowStartDay = this.dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss.SSS')
      console.log('🚀 ~ convertDateTimeFormat ~ 获取当天的开始时间格式化nowStartDay:', nowStartDay)
      const nowEndDay = this.dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss.SSS')
      console.log('🚀 ~ convertDateTimeFormat ~ 当天的结束时间格式化nowEndDay:', nowEndDay)
      const date1 = this.dayjs('2023-01-10')
      const date2 = this.dayjs('2023-11-10')
      const diffDay = date2.diff(date1, 'd') //D是day的缩写也可以，月日都是首字母大写缩写.其他年、周、小时分都是小写,全拼则都是小写
      console.log('🚀 ~ convertDateTimeFormat ~ 时间差（天）dif:', diffDay)
      //基础调用END-----------------------------------------------------------------------------------
      //传值，通过案例去举一反三
      const convertTime1 = this.dayjs(1706753478000).format('YYYY-MM-DD HH:mm')
      console.log('🚀 ~ convertDateTimeFormat ~ 时间戳转日期格化convertTime:', convertTime1) // 2024-02-01 10:11

      const convertTime2 = this.dayjs('2024/01/29 08:55:18').format('YYYY-MM-DD HH:mm')
      console.log('🚀 ~ convertDateTimeFormat ~ 日期字符串格化convertTime:', convertTime2) // 2024-01-29 08:55
      // console.log('如果不想全局引入就把main.js那删了，这里引入即可，不需要加this即可使用：' + dayjs())
    },
  },
  created() {
    this.init()
  },
}
</script>
<style></style>
