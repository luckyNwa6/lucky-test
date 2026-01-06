<template>
  <div class="page-container">
    <div class="left-sidebar">
      <el-card class="side-card stat-card" shadow="never">
        <div slot="header" class="card-header-box">
          <i class="el-icon-pie-chart icon-header"></i>
          <span class="card-header-title">服务资产统计</span>
        </div>
        <div class="horizontal-grid">
          <div class="grid-item-box" v-for="item in assetData" :key="item.label">
            <div class="label">{{ item.label }}</div>
            <div class="value">{{ item.value }}</div>
          </div>
        </div>
      </el-card>

      <el-card class="side-card stat-card" shadow="never">
        <div slot="header" class="card-header-box">
          <i class="el-icon-connection icon-header blue"></i>
          <span class="card-header-title">过网关调用数</span>
        </div>
        <div class="horizontal-grid">
          <div class="grid-item-box" v-for="item in callData" :key="item.label">
            <div class="label">{{ item.label }}</div>
            <div class="value color-blue">{{ item.value }}</div>
          </div>
        </div>
      </el-card>

      <el-card class="side-card stat-card" shadow="never">
        <div slot="header" class="card-header-box">
          <i class="el-icon-share icon-header green"></i>
          <span class="card-header-title">直连调用数</span>
        </div>
        <div class="horizontal-grid">
          <div class="grid-item-box" v-for="item in directData" :key="item.label">
            <div class="label">{{ item.label }}</div>
            <div class="value color-green">{{ item.value }}</div>
          </div>
        </div>
      </el-card>

      <div class="topology-container flex-fill">
        <div class="custom-card-header header-with-more">
          <div class="header-left">
            <i class="el-icon-guide icon-header"></i>
            <span class="card-header-title">链路拓扑</span>
          </div>
          <el-link type="primary" :underline="false" href="https://www.baidu.com" target="_blank" class="more-link">
            更多
            <i class="el-icon-arrow-right"></i>
          </el-link>
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
            <div v-for="(row, i) in item.rows" :key="i" class="content-row enhanced">
              <span class="row-label">{{ row.label }}</span>
              <span class="num-badge">{{ row.value }}</span>
            </div>
          </div>
        </div>

        <div class="custom-card process-card">
          <div class="custom-card-header">
            <span class="card-header-title mini">流程数统计</span>
          </div>
          <div class="custom-card-body process-body">
            <div class="process-flex-grid">
              <div class="p-item-box gray">
                <div class="p-icon-bg"><i class="el-icon-document"></i></div>
                <div class="p-info">
                  <div class="p-v">96</div>
                  <div class="p-l">待提交</div>
                </div>
              </div>
              <div class="p-item-box orange">
                <div class="p-icon-bg"><i class="el-icon-loading"></i></div>
                <div class="p-info">
                  <div class="p-v">12</div>
                  <div class="p-l">审批中</div>
                </div>
              </div>
              <div class="p-item-box green">
                <div class="p-icon-bg"><i class="el-icon-circle-check"></i></div>
                <div class="p-info">
                  <div class="p-v">84</div>
                  <div class="p-l">已完成</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="custom-card rank-card">
          <div class="custom-card-header">
            <span class="card-header-title mini">服务链路排行</span>
          </div>
          <div class="custom-card-body rank-body">
            <div class="rank-filters-row">
              <el-select v-model="consumerValue" size="mini" placeholder="消费方" style="width: 48%" clearable>
                <el-option label="订单系统" value="order"></el-option>
              </el-select>
              <el-select v-model="providerValue" size="mini" placeholder="提供方" style="width: 48%" clearable>
                <el-option label="支付中心" value="pay"></el-option>
              </el-select>
            </div>
            <el-table :data="rankTableData" size="mini" class="modern-table">
              <el-table-column prop="consumer" label="消费方系统" show-overflow-tooltip></el-table-column>
              <el-table-column prop="provider" label="提供方系统" show-overflow-tooltip></el-table-column>
              <el-table-column prop="count" label="次数" width="70" align="center">
                <template slot-scope="scope">
                  <span class="rank-count">{{ scope.row.count }}</span>
                </template>
              </el-table-column>
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
      edgeTimer: null,
      isGateway: true,
      consumerValue: '',
      providerValue: '',
      assetData: [
        { label: '已接入系统数', value: 42 },
        { label: '服务总数', value: 156 },
        { label: '已发布服务数', value: 310 },
        { label: '已上线服务数', value: 1240 },
      ],
      callData: [
        { label: '审批中', value: 28 },
        { label: '已发布', value: 142 },
        { label: '已上线', value: 896 },
        { label: '总数', value: 1066 },
      ],
      directData: [
        { label: '审批中', value: 28 },
        { label: '已发布', value: 142 },
        { label: '已上线', value: 896 },
        { label: '总数', value: 1066 },
      ],
      rankTableData: [
        { consumer: '订单服务', provider: '支付中心', count: 850 },
        { consumer: '用户服务', provider: '认证中心', count: 620 },
        { consumer: '物流系统', provider: '地图API', count: 410 },
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
          title: '开发平台服务推送数',
          rows: [
            { label: '新核心', value: '12' },
            { label: '新信贷', value: '8' },
          ],
        },
        {
          title: '一体化测试',
          rows: [
            { label: '已同步服务数', value: '12' },
            { label: '同步次数', value: '8' },
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
  beforeDestroy() {
    if (this.edgeTimer) clearInterval(this.edgeTimer)
    window.removeEventListener('resize', this.resizeAll)
    if (this.graph) this.graph.destroy()
  },
  methods: {
    initGraph() {
      const container = document.getElementById('g6-mount-point')
      if (!container) return
      const width = container.scrollWidth
      const height = container.scrollHeight || 300
      const data = {
        nodes: [
          { id: 'customer', label: '客户信息', x: 500, y: 100 },
          { id: 'mobile', label: '移动展业', x: 300, y: 150 },
          { id: 'gateway', label: '分布式网关', x: 200, y: 250, size: 70, style: { fill: '#fffbe6', stroke: '#faad14' } },
          { id: 'fengshou', label: '丰收互联', x: 100, y: 150 },
          { id: 'core', label: '柜面核心', x: 100, y: 350 },
        ],
        edges: [
          { source: 'customer', target: 'gateway' },
          { source: 'mobile', target: 'gateway' },
          { source: 'gateway', target: 'fengshou' },
          { source: 'gateway', target: 'core' },
        ],
      }
      this.graph = new G6.Graph({
        container: 'g6-mount-point',
        width,
        height,
        fitView: true,
        fitViewPadding: 30,
        modes: { default: ['drag-canvas', 'zoom-canvas', 'drag-node'] },
        defaultNode: {
          type: 'circle',
          size: 40,
          style: { fill: '#e6f4ff', stroke: '#1677ff', lineWidth: 1.5 },
          labelCfg: { style: { fontSize: 10, fill: '#555' } },
        },
        defaultEdge: {
          style: { stroke: '#91caff', lineWidth: 2, lineDash: [5, 5], endArrow: { path: G6.Arrow.triangle(5, 8, 0), fill: '#91caff' } },
        },
      })
      this.graph.data(data)
      this.graph.render()
      this.startEdgeAnimation()
    },
    startEdgeAnimation() {
      let offset = 0
      this.edgeTimer = setInterval(() => {
        offset = (offset + 1) % 100
        if (this.graph && !this.graph.get('destroyed')) {
          this.graph.getEdges().forEach((edge) => {
            this.graph.updateItem(edge, { style: { lineDashOffset: -offset } })
          })
        }
      }, 50)
    },
    resizeAll() {
      const container = document.getElementById('g6-mount-point')
      if (container && this.graph) {
        this.graph.changeSize(container.scrollWidth, container.scrollHeight)
        this.graph.fitView()
      }
    },
  },
}
</script>

<style scoped>
/* 保持原有结构样式不变 */
.page-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background: #f0f2f5;
  overflow: hidden;
  padding: 12px;
  box-sizing: border-box;
}

.left-sidebar {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-right: 12px;
  height: 100%;
  overflow: hidden;
}

.side-card {
  border: none !important;
  border-radius: 10px !important;
  flex-shrink: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03) !important;
}

.card-header-box {
  display: flex;
  align-items: center;
}
.icon-header {
  margin-right: 8px;
  font-size: 18px;
}
.card-header-title {
  font-weight: 800;
  font-size: 16px;
  color: #262626;
}

.header-with-more {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.more-link {
  font-size: 12px;
  font-weight: normal;
}

.horizontal-grid {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.grid-item-box {
  flex: 1;
  background: #f8fbff;
  padding: 15px 5px;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #ebf1f5;
}
.grid-item-box .label {
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
}
.grid-item-box .value {
  font-size: 24px;
  font-weight: 900;
  color: #262626;
}

.flex-fill {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.topology-container {
  background: #fff;
  border-radius: 10px;
  border: 1px solid #e8e8e8;
  overflow: hidden;
}
.g6-wrapper {
  flex: 1;
  width: 100%;
  background: radial-gradient(#f0f0f0 1px, transparent 1px);
  background-size: 20px 20px;
}

.color-blue {
  color: #1677ff !important;
}
.color-green {
  color: #52c41a !important;
}
.blue {
  color: #1677ff;
}
.green {
  color: #52c41a;
}

.right-sidebar {
  width: 440px;
  background: #ffffff;
  border-left: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.05);
}

.right-scroll-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.right-scroll-container::-webkit-scrollbar {
  width: 6px;
}
.right-scroll-container::-webkit-scrollbar-thumb {
  background: #dcdfe6;
  border-radius: 10px;
}

.custom-card {
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}
.custom-card-header {
  padding: 12px 16px;
  background: #f9fbff;
  border-bottom: 1px solid #edf2f9;
}
.card-header-title.mini {
  font-size: 14px;
  border-left: 4px solid #1677ff;
  padding-left: 10px;
}

.enhanced {
  padding: 14px 10px !important;
  margin: 0 6px;
}
.content-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed #f0f0f0;
}
.row-label {
  font-size: 13px;
  color: #595959;
}
.num-badge {
  background: #e6f4ff;
  color: #1677ff;
  padding: 2px 10px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 14px;
}

/* --------------------------------------------------- */
/* 流程统计：深度美化部分                             */
/* --------------------------------------------------- */
.process-body {
  padding: 16px !important;
}
.process-flex-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.p-item-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 4px;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  position: relative;
  overflow: hidden;
}
.p-item-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.p-icon-bg {
  font-size: 18px;
  margin-bottom: 8px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
}
.p-info {
  text-align: center;
}
.p-v {
  font-size: 20px;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 4px;
}
.p-l {
  font-size: 12px;
  font-weight: 500;
  opacity: 0.8;
}

/* 状态配色方案 */
.p-item-box.gray {
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%);
  color: #4b5563;
  border-color: #d1d5db;
}
.p-item-box.gray .p-icon-bg {
  color: #6b7280;
}

.p-item-box.orange {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  color: #b45309;
  border-color: #fde68a;
}
.p-item-box.orange .p-icon-bg {
  color: #f59e0b;
}

.p-item-box.green {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  color: #15803d;
  border-color: #bbf7d0;
}
.p-item-box.green .p-icon-bg {
  color: #22c55e;
}

/* --------------------------------------------------- */

.rank-body {
  padding: 12px !important;
}
.modern-table {
  border-radius: 8px;
  overflow: hidden;
}
.rank-count {
  background: #f0f2f5;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
  color: #1677ff;
}
.rank-filters-row {
  margin-bottom: 12px;
}
</style>
