<!-- 测试滚动条定位 -->
<template>
  <div style="height: 100vh; background: white; overflow: auto" id="luckyCon">
    <div style="position: sticky; top: 0px; z-index: 9; background-color: rgb(231, 201, 201); padding: 12px 5px">
      这边是导航
      <floor
        style="margin: 0 100px"
        :params="{ containerId: 'luckyCon', scrollClass: 'scrollContainer', stepsClass: 'approval-floor', detail: typeNameNow == 'detail' }"
        :steps="steps"
      ></floor>
    </div>

    <el-card class="scrollContainer">
      <div>
        <el-card class="approval-floor" style="height: 600px; margin-top: 15px">
          <div slot="header"><span>第1部分</span></div>
        </el-card>
        <el-card class="approval-floor" style="height: 600px; margin-top: 15px">
          <div slot="header"><span>第2部分</span></div>
          <el-button @click="changeStep">切换step值</el-button>
        </el-card>
        <el-card class="approval-floor" style="height: 600px; margin-top: 15px">
          <div slot="header"><span>第3部分</span></div>
        </el-card>
        <el-card v-if="isShowL" class="approval-floor" style="height: 600px; margin-top: 15px">
          <div slot="header"><span>隐藏部分</span></div>
        </el-card>
        <el-card class="approval-floor" style="height: 600px; margin-top: 15px">
          <div slot="header"><span>第4部分</span></div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import floor from './floor.vue'
export default {
  components: { floor },
  data() {
    return {
      steps: [{ title: '标题1' }, { title: '标题2' }, { title: '标题3' }, { title: '标题4' }],
      typeNameNow: 'edit', //detail
      isShowL: false,
    }
  },
  methods: {
    changeStep() {
      console.log('🚀 ~ changeStep ~   this.isShowL:', this.isShowL)
      this.isShowL = !this.isShowL
      console.log('🚀 ~ changeStep ~   this.isShowL:', this.isShowL)
      if (this.isShowL) {
        this.steps = [{ title: '标题1' }, { title: '标题2' }, { title: '标题3' }, { title: '隐藏部分' }, { title: '标题4' }]
      } else {
        this.steps = [{ title: '标题1' }, { title: '标题2' }, { title: '标题3' }, { title: '标题4' }]
      }
    },
  },
}
</script>

<style></style>
