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
          <span class="card-header-title">调用数量统计</span>
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
          <span class="card-header-title">调用数量统计（通过分布式网关平台调用）</span>
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
      <div class="right-scroll-container" v-loading="loading">
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
                  <div class="p-v">{{ processData.toSubmit }}</div>
                  <div class="p-l">待提交</div>
                </div>
              </div>
              <div class="p-item-box orange">
                <div class="p-icon-bg"><i class="el-icon-loading"></i></div>
                <div class="p-info">
                  <div class="p-v">{{ processData.approving }}</div>
                  <div class="p-l">审批中</div>
                </div>
              </div>
              <div class="p-item-box green">
                <div class="p-icon-bg"><i class="el-icon-circle-check"></i></div>
                <div class="p-info">
                  <div class="p-v">{{ processData.completed }}</div>
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
              <el-select v-model="consumerValue" size="mini" placeholder="消费方" clearable style="width: 48%">
                <el-option v-for="opt in consumerOptions" :key="opt" :label="opt" :value="opt"></el-option>
              </el-select>
              <el-select v-model="providerValue" size="mini" placeholder="提供方" clearable style="width: 48%">
                <el-option v-for="opt in providerOptions" :key="opt" :label="opt" :value="opt"></el-option>
              </el-select>
            </div>
            <el-table :data="filteredRankData" size="mini" class="modern-table">
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
      loading: false,
      graph: null,
      edgeTimer: null,
      consumerValue: '',
      providerValue: '',

      /* ===============================
       * 默认值 = 0（结构固定）
       * =============================== */
      assetData: [
        { label: '已接入系统数', value: 0 },
        { label: '服务总数', value: 0 },
        { label: '已发布服务数', value: 0 },
        { label: '已上线服务数', value: 0 },
      ],
      callData: [
        { label: '审批中', value: 0 },
        { label: '已发布', value: 0 },
        { label: '已上线', value: 0 },
        { label: '总数', value: 0 },
      ],
      directData: [
        { label: '审批中', value: 0 },
        { label: '已发布', value: 0 },
        { label: '已上线', value: 0 },
        { label: '总数', value: 0 },
      ],

      /* 排行表 */
      rankTableData: [],

      businessCards: [
        {
          title: 'PaaS 服务管理平台',
          rows: [
            { label: '自动对比次数', value: 0 },
            { label: '已对比服务数', value: 0 },
            { label: '已登记服务数', value: 0 },
            { label: '未登记服务数', value: 0 },
          ],
        },
        {
          title: '开发平台服务推送数',
          rows: [
            { label: '新核心', value: 0 },
            { label: '新信贷', value: 0 },
          ],
        },
        {
          title: '一体化测试',
          rows: [
            { label: '已同步服务数', value: 0 },
            { label: '同步次数', value: 0 },
          ],
        },
      ],

      processData: { toSubmit: 0, approving: 0, completed: 0 },

      consumerOptions: [],
      providerOptions: [],
    }
  },

  computed: {
    filteredRankData() {
      return this.rankTableData.filter((item) => {
        const matchConsumer = !this.consumerValue || item.consumer === this.consumerValue
        const matchProvider = !this.providerValue || item.provider === this.providerValue
        return matchConsumer && matchProvider
      })
    },
  },

  mounted() {
    this.fetchAllData()
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
    // ===============================
    // 唯一允许修改的方法
    // ===============================
    async fetchAllData() {
      this.loading = true
      await new Promise((r) => setTimeout(r, 800))

      /* ===============================
       * 后端假数据
       * =============================== */
      const backendData = {
        asset: {
          sysCount: 70,
          serviceCount: 200,
          publishCount: 360,
          onlineCount: 1500,
        },
        call: {
          sit: 1204,
          uat: 856,
          pre: 432,
          online: 432,
          total: 4597,
        },
        direct: {
          approving: 28,
          publish: 142,
          online: 896,
          total: 1066,
        },
        rank: [
          { consumer: '订单服务', provider: '支付中心', count: 850 },
          { consumer: '订单服务', provider: '库存中心', count: 620 },
          { consumer: '用户服务', provider: '认证中心', count: 510 },
          { consumer: '物流系统', provider: '地图API', count: 430 },
          { consumer: '财务系统', provider: '支付中心', count: 320 },
          { consumer: '营销系统', provider: '短信平台', count: 260 },
          { consumer: '风控系统', provider: '规则引擎', count: 210 },
          { consumer: '报表系统', provider: '数据中台', count: 180 },
          { consumer: 'APP前端', provider: '用户服务', count: 150 },
          { consumer: '柜面系统', provider: '核心服务', count: 120 },
        ],
        right: {
          paas: {
            compareTimes: 128,
            compared: 102,
            registered: 102,
            unregistered: 26,
          },
          push: {
            core: 12,
            credit: 8,
          },
          test: {
            syncService: 12,
            syncTimes: 8,
          },
          process: {
            toSubmit: 96,
            approving: 12,
            completed: 84,
          },
        },
      }

      /* ===============================
       * 左侧值覆盖（局部）
       * =============================== */
      const assetMap = {
        已接入系统数: 'sysCount',
        服务总数: 'serviceCount',
        已发布服务数: 'publishCount',
        已上线服务数: 'onlineCount',
      }
      this.assetData.forEach((i) => {
        const k = assetMap[i.label]
        if (k && backendData.asset[k] !== undefined) i.value = backendData.asset[k]
      })

      const callMap = { SIT数: 'sit', UAT数: 'uat', 准生产: 'pre', 已上线: 'online', 总数: 'total' }
      this.callData.forEach((i) => {
        const k = callMap[i.label]
        if (k && backendData.call[k] !== undefined) i.value = backendData.call[k]
      })

      const directMap = { 审批中: 'approving', 已发布: 'publish', 已上线: 'online', 总数: 'total' }
      this.directData.forEach((i) => {
        const k = directMap[i.label]
        if (k && backendData.direct[k] !== undefined) i.value = backendData.direct[k]
      })

      /* ===============================
       * 排行榜（整体赋值）
       * =============================== */
      this.rankTableData = backendData.rank

      this.consumerOptions = [...new Set(this.rankTableData.map((i) => i.consumer))]
      this.providerOptions = [...new Set(this.rankTableData.map((i) => i.provider))]

      /* ===============================
       * 右侧卡片（只改 value）
       * =============================== */
      this.businessCards.forEach((card) => {
        if (card.title === 'PaaS 服务管理平台') {
          const map = {
            自动对比次数: 'compareTimes',
            已对比服务数: 'compared',
            已登记服务数: 'registered',
            未登记服务数: 'unregistered',
          }
          card.rows.forEach((r) => {
            const k = map[r.label]
            if (k && backendData.right.paas[k] !== undefined) r.value = backendData.right.paas[k]
          })
        }

        if (card.title === '开发平台服务推送数') {
          const map = { 新核心: 'core', 新信贷: 'credit' }
          card.rows.forEach((r) => {
            const k = map[r.label]
            if (k && backendData.right.push[k] !== undefined) r.value = backendData.right.push[k]
          })
        }

        if (card.title === '一体化测试') {
          const map = { 已同步服务数: 'syncService', 同步次数: 'syncTimes' }
          card.rows.forEach((r) => {
            const k = map[r.label]
            if (k && backendData.right.test[k] !== undefined) r.value = backendData.right.test[k]
          })
        }
      })

      /* ===============================
       * 流程数据（字段覆盖）
       * =============================== */
      Object.keys(this.processData).forEach((k) => {
        if (backendData.right.process[k] !== undefined) {
          this.processData[k] = backendData.right.process[k]
        }
      })

      this.loading = false
    },

    /* ===============================
     * G6 拓扑：逐字未动
     * =============================== */
    initGraph() {
      const container = document.getElementById('g6-mount-point')
      if (!container) return

      const width = container.scrollWidth
      const height = container.scrollHeight || 300

      const data = {
        nodes: [
          // ===== 原有节点（完全未动） =====
          { id: 'customer', label: '客户信息', x: 200, y: 40 },
          { id: 'mobile', label: '移动展业', x: 290, y: 40 },
          {
            id: 'gateway',
            label: '分布式网关',
            x: 250,
            y: 180,
            size: 110,
            style: { fill: '#fffbe6', stroke: '#faad14' },
          },
          { id: 'fengshou', label: '丰收互联', x: 300, y: 380 },
          { id: 'core', label: '柜面核心', x: 100, y: 350 },

          { id: 'door', label: '数字门牌', x: 800, y: 40 },
          { id: 'ic', label: 'IC卡多应用', x: 800, y: 150 },
          { id: 'ebank', label: '个人网银', x: 1000, y: 40 },
          { id: 'wechat', label: '信用卡微信', x: 1000, y: 150 },

          // ===== 新增：上游 3 个节点 =====
          { id: 'containerCloud', label: '容器云', x: 100, y: 40 },
          { id: 'trafficCloud', label: '交通场景云', x: 100, y: 120 },
          { id: 'portal', label: '官网门户', x: 100, y: 200 },

          // ===== 新增：下游 2 个节点 =====
          { id: 'inclusive', label: '普惠通', x: 350, y: 260 },
          { id: 'credit', label: '信贷管理', x: 450, y: 260 },
        ],
        edges: [
          // ===== 原有连线（未动） =====
          { source: 'customer', target: 'gateway' },
          { source: 'mobile', target: 'gateway' },
          { source: 'gateway', target: 'fengshou' },
          { source: 'gateway', target: 'core' },

          { source: 'door', target: 'ic' },
          { source: 'ic', target: 'door' },
          { source: 'ebank', target: 'wechat' },

          // ===== 新增：上游 → 网关 =====
          { source: 'containerCloud', target: 'gateway' },
          { source: 'trafficCloud', target: 'gateway' },
          { source: 'portal', target: 'gateway' },

          // ===== 新增：网关 → 下游 =====
          { source: 'gateway', target: 'inclusive' },
          { source: 'gateway', target: 'credit' },
        ],
      }

      this.graph = new G6.Graph({
        container: 'g6-mount-point',
        width,
        height,
        modes: {
          default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
        },
        defaultNode: {
          type: 'circle',
          size: 68,
          style: {
            fill: '#e6f4ff',
            stroke: '#1677ff',
            lineWidth: 2,
          },
          labelCfg: {
            position: 'center',
            style: {
              fontSize: 13,
              fontWeight: 'bold',
              fill: '#1f1f1f',
              stroke: '#ffffff',
              lineWidth: 2,
              textAlign: 'center',
              textBaseline: 'middle',
            },
          },
        },
        defaultEdge: {
          style: {
            stroke: '#91caff',
            lineWidth: 2,
            lineDash: [5, 5],
            endArrow: {
              path: G6.Arrow.triangle(6, 10, 0),
              fill: '#91caff',
            },
          },
        },
      })

      this.graph.on('node:click', () => {
        window.open('https://www.baidu.com', '_blank')
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
      const c = document.getElementById('g6-mount-point')
      if (c && this.graph) {
        this.graph.changeSize(c.scrollWidth, c.scrollHeight)
        this.graph.fitView()
      }
    },
  },
}
</script>

<style scoped>
/* 此处代码完全保留你要求的样式，没有任何文字和视觉上的改动 */
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
  display: flex;
  justify-content: space-between;
}

/* ===============================
 * 流程数统计：横向紧凑布局
 * =============================== */

/* 减少整体内边距 */
.process-card .process-body {
  padding: 10px 12px !important;
}

/* 仍然三等分横排，但整体更扁 */
.process-card .process-flex-grid {
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

/* 每个流程块：改为横向布局 */
.process-card .p-item-box {
  flex-direction: row; /* ⬅ 横向 */
  align-items: center;
  justify-content: flex-start;
  padding: 8px 10px; /* ⬅ 明显变矮 */
}

/* icon 不再占一整行 */
.process-card .p-icon-bg {
  margin-bottom: 0; /* ⬅ 去掉纵向间距 */
  margin-right: 8px;
  width: 32px;
  height: 32px;
  font-size: 16px;
  flex-shrink: 0;
}

/* 数字 + 文本左对齐 */
.process-card .p-info {
  text-align: left;
}

/* 数字略微缩小，防止撑高 */
.process-card .p-v {
  font-size: 18px;
  margin-bottom: 2px;
}

/* 文案更紧凑 */
.process-card .p-l {
  font-size: 12px;
}

.side-card ::v-deep .el-card__header {
  padding: 8px 12px; /* ⬅ 原来 18px 20px，明显变矮 */
}

/* 标题文字本身微调 */
.side-card .card-header-title {
  font-size: 14px;
  line-height: 1.2;
}
</style>
