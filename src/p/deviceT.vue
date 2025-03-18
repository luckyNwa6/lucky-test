<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="8">
        <!-- 站点、设备、工单信息 -->
        <station-device-info ref="baseInfo" @getDeviceList="getDeviceList"></station-device-info>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const getDeviceList = () => {
  console.log('xxxx')
}
</script>

<style lang="scss" scoped></style>
