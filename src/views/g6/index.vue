<template>
  <div class="page">
    <!-- G6 底层画布 -->
    <div id="g6-container"></div>

    <!-- 左下：双折线 -->
    <div class="left-panel">
      <div id="lineChart1" class="chart-box"></div>
      <div id="lineChart2" class="chart-box"></div>
    </div>

    <!-- 右侧整体区域 -->
    <div class="right-zone">
      <!-- 右侧纵向指标卡 -->
      <div class="right-cards">
        <div class="stat-card" v-for="(item, index) in cards" :key="index">
          <div class="card-title">{{ item.title }}</div>
          <div class="card-content">
            <div v-for="(row, i) in item.rows" :key="i">
              <span>{{ row.label }}</span>
              <span class="num">{{ row.value }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 服务调用排行 -->
      <div class="rank-panel">
        <div class="card-title">服务调用排行</div>
        <ul class="rank-list">
          <li v-for="(item, index) in rankData" :key="index">
            <span class="rank">{{ index + 1 }}</span>
            <span class="name">{{ item.name }}</span>
            <span class="count">{{ item.count }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import G6 from '@antv/g6'
import * as echarts from 'echarts'

export default {
  data() {
    return {
      graph: null,
      rankData: [
        { name: '订单服务', count: 5230 },
        { name: '用户服务', count: 4310 },
        { name: '支付服务', count: 3890 },
        { name: '库存服务', count: 3120 },
        { name: '日志服务', count: 2750 },
      ],
      cards: [
        {
          title: 'PaaS 服务管控平台',
          rows: [
            { label: '自动对比次数', value: '128（10:32）' },
            { label: '已对比服务数', value: 86 },
            { label: '已登记服务数', value: 102 },
            { label: '未登记服务数', value: 16 },
          ],
        },
        {
          title: '服务推送情况',
          rows: [
            { label: '核心开发平台推送数', value: 12 },
            { label: '信创开发平台推送数', value: 8 },
          ],
        },
        {
          title: '一体化测试平台',
          rows: [
            { label: '同步服务次数', value: 34 },
            { label: '已同步服务数', value: 28 },
          ],
        },
        {
          title: '服务接入情况',
          rows: [
            { label: '接入系统总数', value: 42 },
            { label: '服务总数', value: 310 },
            { label: '已发布服务数', value: 278 },
            { label: '已上线服务数', value: 260 },
          ],
        },
      ],
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.initGraph()
      this.initLineCharts()
      window.addEventListener('resize', this.resizeGraph)
    })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeGraph)
  },

  methods: {
    /* ================= G6 ================= */
    initGraph() {
      const container = document.getElementById('g6-container')

      const data = {
        nodes: [
          {
            id: 'gateway',
            label: '分布式网关\n核心集群',
            x: 520,
            y: 260,
            type: 'rect',
            size: [160, 80],
            style: { fill: '#E6F7FF', stroke: '#1890FF' },
          },
          { id: 'core1', label: '系统1', x: 200, y: 200 },
          { id: 'core2', label: '系统2', x: 200, y: 260 },
          { id: 'core3', label: '系统3', x: 200, y: 320 },
          { id: 'scene1', label: '系统A', x: 820, y: 200 },
          { id: 'scene2', label: '系统B', x: 820, y: 260 },
          { id: 'scene3', label: '系统C', x: 820, y: 320 },
        ],
        edges: [
          { source: 'core1', target: 'gateway' },
          { source: 'core2', target: 'gateway' },
          { source: 'core3', target: 'gateway' },
          { source: 'gateway', target: 'scene1' },
          { source: 'gateway', target: 'scene2' },
          { source: 'gateway', target: 'scene3' },
        ],
      }

      const tooltip = new G6.Tooltip({
        offsetX: 10,
        offsetY: 10,
        itemTypes: ['node'],
        getContent(e) {
          const model = e.item.getModel()
          const div = document.createElement('div')
          div.innerHTML = `
            <div style="font-weight:600">${model.label}</div>
            <div style="font-size:12px;color:#666">ID：${model.id}</div>
            <div style="color:#999;font-size:11px">点击查看详情</div>
          `
          return div
        },
      })

      this.graph = new G6.Graph({
        container: 'g6-container',
        width: container.clientWidth,
        height: container.clientHeight,
        backgroundColor: 'transparent',
        plugins: [tooltip],
        minZoom: 0.5,
        maxZoom: 2,
        modes: {
          default: ['drag-node', 'drag-canvas', 'zoom-canvas'],
        },
        defaultNode: {
          type: 'rect',
          size: [90, 36],
          style: {
            fill: '#fff',
            stroke: '#5B8FF9',
            radius: 4,
          },
        },
        nodeStateStyles: {
          active: {
            stroke: '#ff4d4f',
            lineWidth: 2,
          },
        },
        defaultEdge: {
          style: {
            stroke: '#91d5ff',
            lineWidth: 2,
            lineDash: [6, 4],
            endArrow: {
              path: G6.Arrow.triangle(8, 10, 0),
              fill: '#91d5ff',
            },
          },
        },
      })

      this.graph.on('node:mouseenter', (e) => {
        this.graph.setItemState(e.item, 'active', true)
      })

      this.graph.on('node:mouseleave', (e) => {
        this.graph.setItemState(e.item, 'active', false)
      })

      this.graph.on('node:click', () => {
        window.open('https://www.baidu.com', '_blank')
      })
      this.graph.getEdges().forEach((edge) => {
        edge.animate(
          {
            lineDashOffset: -20,
          },
          {
            repeat: true,
            duration: 2000,
          }
        )
      })
      this.graph.data(data)
      this.graph.render()
    },

    resizeGraph() {
      if (!this.graph) return
      const container = document.getElementById('g6-container')
      this.graph.changeSize(container.clientWidth, container.clientHeight)
    },

    /* ================= ECharts ================= */
    initLineCharts() {
      this.initLine('lineChart1', '系统接入趋势', [10, 22, 28, 35, 50])
      this.initLine('lineChart2', '服务调用趋势', [120, 180, 260, 310, 420])
    },

    initLine(domId, title, data) {
      const chart = echarts.init(document.getElementById(domId))
      chart.setOption({
        title: { text: title, left: 'center', textStyle: { fontSize: 14 } },
        tooltip: { trigger: 'axis' },
        grid: { left: 40, right: 20, top: 40, bottom: 30 },
        xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月'] },
        yAxis: { type: 'value' },
        series: [{ type: 'line', smooth: true, data }],
      })
    },
  },
}
</script>

<style scoped>
.page {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* G6 */
#g6-container {
  position: absolute;
  inset: 0;
  z-index: 1;
}

/* 左下折线 */
.left-panel {
  position: absolute;
  left: 24px;
  bottom: 24px;
  width: 820px;
  display: flex;
  gap: 16px;
  z-index: 10;
}

.chart-box {
  flex: 1;
  height: 220px;
  padding: 8px;
}

/* 右侧区域 */
.right-zone {
  position: absolute;
  top: 80px;
  right: 24px;
  bottom: 24px;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
}

.right-cards {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
}

/* 通用卡片 */
.stat-card,
.rank-panel,
.chart-box {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(8px);
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

.stat-card {
  padding: 12px;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: #1f2d3d;
  margin-bottom: 10px;
  padding-left: 8px;
  border-left: 3px solid #1890ff;
}

.card-content > div {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 4px 0;
  color: #59636e;
}

.num {
  color: #1890ff;
  font-weight: 600;
}

/* 排行榜 */
.rank-panel {
  padding: 12px;
  height: 260px;
}

.rank-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rank-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
}

.rank {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #1890ff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.rank-list li:nth-child(1) .rank {
  background: #f5222d;
}
.rank-list li:nth-child(2) .rank {
  background: #fa8c16;
}
.rank-list li:nth-child(3) .rank {
  background: #fadb14;
  color: #333;
}

.name {
  flex: 1;
  font-size: 13px;
}

.count {
  font-weight: 600;
  color: #1890ff;
}

/* 禁止误选 */
.stat-card,
.rank-panel,
.left-panel {
  user-select: none;
}
</style>
