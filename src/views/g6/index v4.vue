<template>
  <div class="page-container">
    <div class="left-sidebar">
      <el-card class="side-card main-stat" shadow="never">
        <div slot="header" class="card-header-box">
          <span class="card-header-title large">服务资产统计</span>
        </div>
        <div class="horizontal-grid">
          <div class="grid-item-box big-height" v-for="item in assetData" :key="item.label">
            <div class="label">{{ item.label }}</div>
            <div class="value">{{ item.value }}</div>
          </div>
        </div>
      </el-card>

      <el-card class="side-card main-stat" shadow="never">
        <div slot="header" class="header-with-action">
          <span class="card-header-title large">过网关数量统计</span>
          <div class="header-action">
            <span class="action-label">是否过网关</span>
            <el-switch v-model="isGateway" size="mini" active-color="#1677ff"></el-switch>
          </div>
        </div>
        <div class="horizontal-grid">
          <div class="grid-item-box big-height" v-for="item in callData" :key="item.label">
            <div class="label">{{ item.label }}</div>
            <div class="value color-blue">{{ item.value }}</div>
          </div>
        </div>
      </el-card>

      <el-card class="side-card main-stat" shadow="never">
        <div slot="header" class="card-header-box">
          <span class="card-header-title large">直连数量统计</span>
        </div>
        <div class="horizontal-grid">
          <div class="grid-item-box big-height" v-for="item in directData" :key="item.label">
            <div class="label">{{ item.label }}</div>
            <div class="value color-green">{{ item.value }}</div>
          </div>
        </div>
      </el-card>

      <div class="topology-container">
        <div class="custom-card-header">
          <span class="card-header-title">链路拓扑</span>
        </div>
        <div id="g6-mount-point" class="g6-wrapper"></div>
      </div>
    </div>

    <div class="right-sidebar">
      <div class="right-scroll-container">
        <div v-for="(item, index) in businessCards" :key="'bus-' + index" class="custom-card">
          <div class="custom-card-header">
            <span class="card-header-title mini">{{ item.title }}</span>
          </div>
          <div class="custom-card-body">
            <div v-for="(row, i) in item.rows" :key="i" class="content-row">
              <span class="row-label">{{ row.label }}</span>
              <span class="num">{{ row.value }}</span>
            </div>
          </div>
        </div>

        <div class="custom-card">
          <div class="custom-card-header">
            <span class="card-header-title mini">流程数统计</span>
          </div>
          <div class="custom-card-body">
            <div class="process-flex">
              <div class="p-item">
                <div class="p-v">96</div>
                <div class="p-l">待提交</div>
              </div>
              <div class="p-item">
                <div class="p-v warning">12</div>
                <div class="p-l">审批中</div>
              </div>
              <div class="p-item">
                <div class="p-v success">84</div>
                <div class="p-l">已完成</div>
              </div>
            </div>
          </div>
        </div>

        <div class="custom-card rank-card">
          <div class="custom-card-header">
            <span class="card-header-title mini">服务链路排行</span>
          </div>
          <div class="custom-card-body">
            <div class="rank-filters-row">
              <el-select v-model="consumerValue" size="mini" placeholder="消费方" style="width: 48%">
                <el-option label="订单系统" value="order"></el-option>
              </el-select>
              <el-select v-model="providerValue" size="mini" placeholder="提供方" style="width: 48%">
                <el-option label="支付中心" value="pay"></el-option>
              </el-select>
            </div>
            <el-table :data="rankTableData" size="mini" border stripe class="tight-table">
              <el-table-column prop="consumer" label="消费方系统" min-width="110" show-overflow-tooltip></el-table-column>
              <el-table-column prop="provider" label="提供方系统" min-width="110" show-overflow-tooltip></el-table-column>
              <el-table-column prop="count" label="次数" width="55" align="center"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import G6 from '@antv/g6'

export default {
  data() {
    return {
      graph: null,
      isGateway: true,
      consumerValue: '',
      providerValue: '',
      assetData: [
        { label: '已接入系统', value: 42 },
        { label: '服务总数', value: 156 },
        { label: '已发布服务', value: 310 },
        { label: '已上线服务', value: 1240 },
      ],
      callData: [
        { label: 'SIT数', value: '1,204' },
        { label: 'UAT数', value: '856' },
        { label: '准生产', value: '432' },
        { label: '总数', value: '4,597' },
      ],
      directData: [
        { label: '待处理', value: '24' },
        { label: '审批中', value: '118' },
        { label: '已通过', value: '856' },
        { label: '合计', value: '998' },
      ],
      rankTableData: [
        { consumer: '订单服务', provider: '支付中心', count: 850 },
        { consumer: '用户服务', provider: '认证中心', count: 620 },
      ],
      businessCards: [
        {
          title: 'PaaS 服务管理平台',
          rows: [
            { label: '自动对比次数', value: '128' },
            { label: '已对比服务数', value: '102' },
            { label: '已登记服务数', value: '102' },
            { label: '未登记服务数', value: '102' },
          ],
        },
        {
          title: '开发平台推送统计',
          rows: [
            { label: '新核心推送量', value: '12' },
            { label: '新信贷推送量', value: '8' },
          ],
        },
      ],
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initGraph()
    })
    window.addEventListener('resize', this.resizeAll)
  },
  methods: {
    initGraph() {
      const container = document.getElementById('g6-mount-point')
      if (!container) return
      this.graph = new G6.Graph({
        container: 'g6-mount-point',
        width: container.scrollWidth,
        height: container.scrollHeight,
        fitView: true,
        defaultNode: { size: 40, style: { fill: '#e6f4ff', stroke: '#1677ff' } },
      })
      this.graph.data({ nodes: [{ id: 'n1', x: 100, y: 100, label: '示例节点' }], edges: [] })
      this.graph.render()
    },
    resizeAll() {
      const container = document.getElementById('g6-mount-point')
      if (this.graph && container) {
        this.graph.changeSize(container.scrollWidth, container.scrollHeight)
      }
    },
  },
}
</script>

<style scoped>
.page-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background: #f0f2f5;
  overflow: hidden;
  padding: 12px;
  box-sizing: border-box;
}

/* --- 左侧布局：固定高度卡片 + 自适应拓扑 --- */
.left-sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-right: 12px;
  height: 100%;
}

.side-card.main-stat {
  border: none !important;
  flex-shrink: 0; /* 保持统计卡片高度 */
}

/* 标题加大 */
.card-header-title.large {
  font-size: 17px;
  font-weight: 800;
  color: #1a1a1a;
  border-left: 5px solid #1677ff;
  padding-left: 12px;
}

/* 统计格高度设置 */
.horizontal-grid {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.grid-item-box.big-height {
  flex: 1;
  background: #f8faff;
  padding: 20px 5px; /* 增加高度 */
  text-align: center;
  border-radius: 6px;
  border: 1px solid #edf2f9;
}
.grid-item-box .label {
  font-size: 13px;
  color: #666;
  margin-bottom: 8px;
}
.grid-item-box .value {
  font-size: 26px; /* 巨大数字 */
  font-weight: 900;
}

/* 拓扑图：自动填充剩余高度 */
.topology-container {
  flex: 1;
  background: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}
.g6-wrapper {
  flex: 1;
  width: 100%;
}

/* --- 右侧布局：支持滚动 --- */
.right-sidebar {
  width: 440px;
  background: #fff;
  border-left: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.05);
}

.right-scroll-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 40px; /* 底部留白 */
}

.custom-card {
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  flex-shrink: 0;
}

/* 解决文字遮挡的核心布局 */
.content-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px dashed #f0f0f0;
}
.row-label {
  font-size: 14px;
  color: #555;
  flex: 1; /* 占据左侧空间 */
  padding-right: 15px; /* 距离数字的间隔 */
}
.num {
  font-size: 16px;
  color: #1677ff;
  font-weight: 700;
  white-space: nowrap; /* 确保数字不换行 */
}

.color-blue {
  color: #1677ff;
}
.color-green {
  color: #52c41a;
}

/* 滚动条美化 */
.right-scroll-container::-webkit-scrollbar {
  width: 5px;
}
.right-scroll-container::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 10px;
}
</style>
