<template>
  <div>
    <el-row>
      <!-- 树形 -->
      <el-col :span="4">
        <el-card>
          <select-area-station
            :check="false"
            @selectFunc="selectFunc"
            @nodeClick="nodeClick"
            ref="stationTree"
            :setFirstNode="setFirstNode"
            :stationType="'0'"
          ></select-area-station>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
const setFirstNode = ref(false)

setFirstNode.value = true

//树形点击传值
const selectFunc = (value: any, node: any, flag: any) => {
  // value--被勾选的树节点数组 node-- 当前被选择的节点 flag--勾选 or 取消勾选
  console.log('多选', value, node)
}
const nodeClick = (data: any, node: any) => {
  // data = deepClone(data);
  // if ('0' === data.type) {
  //   this.$message.error('请选择站点节点');
  //   return;
  // }
  // this.$refs.baseInfo.nodeClick(data, node);
  // this.stationId = parseInt(data.id.substring(8, data.id.length));
  // this.$nextTick(() => {
  //   this.echartType = 'liquid/flow';
  //   this.chartsFlag = false;
  //   // this.handleQuery();
  // });
  // // 清空设备信息的过滤参数
  // this.faMsg = '';
}
</script>
