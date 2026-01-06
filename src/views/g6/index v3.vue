<template>
  <div class="page">
    <!-- G6 画布 -->
    <div id="g6-container"></div>

    <!-- 右侧区域 -->
    <div class="right-zone">
      <div class="right-cards">
        <div class="stat-card">
          <div class="block" v-for="(item, index) in cards" :key="index">
            <div class="card-title">{{ item.title }}</div>
            <div class="card-content">
              <div v-for="(row, i) in item.rows" :key="i">
                <span>{{ row.label }}</span>
                <span class="num">{{ row.value }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 服务调用排行 -->
      <div class="rank-panel">
        <div class="card-title rank-title">服务调用排行</div>
        <div class="rank-body">
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
  </div>
</template>

<script>
import G6 from '@antv/g6'
import * as echarts from 'echarts'

export default {
  data() {
    return {
      graph: null,
      edgeTimer: null,

      /* 服务调用排行 10 条 */
      rankData: [
        { name: '订单服务', count: 5230 },
        { name: '用户服务', count: 4310 },
        { name: '支付服务', count: 3890 },
        { name: '库存服务', count: 3120 },
        { name: '日志服务', count: 2750 },
      ],

      /* 上方卡片 */
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
            { label: '新核心开发平台推送数', value: '12（09:45）' },
            { label: '新信创开发平台推送数', value: '8（09:12）' },
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
            { label: '已接入系统总数', value: 42 },
            { label: '服务总数', value: 310 },
            { label: '已发布服务数', value: 278 },
            { label: '已上线服务数', value: 260 },
          ],
        },
        {
          title: '流程统计',
          rows: [
            { label: '已发起流程数', value: 96 },
            { label: '处理中流程数', value: 12 },
            { label: '已完成流程数', value: 84 },
          ],
        },
      ],
    }
  },

  mounted() {
    this.initGraph()
    this.initLineCharts()
    window.addEventListener('resize', this.resizeAll)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeAll)
    clearInterval(this.edgeTimer)
  },

  methods: {
    /* ================= G6 ================= */
    initGraph() {
      const container = document.getElementById('g6-container')

      // 节点数据
      const data = {
        nodes: [
          { id: 'enterprise', label: '企业互联', x: 800, y: 700, type: 'circle', size: 80, style: { fill: '#e6f4ff', stroke: '#1677ff' } },
          { id: 'customer', label: '客户信息', x: 800, y: 550, type: 'circle', size: 80, style: { fill: '#e6f4ff', stroke: '#1677ff' } },
          { id: 'mobile', label: '移动展业互联', x: 590, y: 500, type: 'circle', size: 80, style: { fill: '#e6f4ff', stroke: '#1677ff' } },
          { id: 'gateway', label: '分布式网关', x: 420, y: 490, type: 'circle', size: 100, style: { fill: '#fffbe6', stroke: '#faad14' } },
          { id: 'fengshou', label: '丰收互联', x: 220, y: 540, type: 'circle', size: 80, style: { fill: '#e6f4ff', stroke: '#1677ff' } },
          { id: 'core', label: '柜面核心', x: 220, y: 660, type: 'circle', size: 80, style: { fill: '#e6f4ff', stroke: '#1677ff' } },
        ],
        edges: [
          // 企业互联 <-> 客户信息 双向箭头
          {
            source: 'enterprise',
            target: 'customer',
            style: {
              stroke: '#91caff',
              lineWidth: 2,
              endArrow: { path: G6.Arrow.triangle(6, 8, 0), fill: '#91caff' },
              startArrow: { path: G6.Arrow.triangle(6, 8, 0), fill: '#91caff' },
            },
          },

          // 移动展业互联 -> 分布式网关
          {
            source: 'mobile',
            target: 'gateway',
            style: { stroke: '#91caff', lineWidth: 2, endArrow: { path: G6.Arrow.triangle(6, 8, 0), fill: '#91caff' } },
          },

          // 分布式网关 -> 丰收互联
          {
            source: 'gateway',
            target: 'fengshou',
            style: { stroke: '#91caff', lineWidth: 2, endArrow: { path: G6.Arrow.triangle(6, 8, 0), fill: '#91caff' } },
          },

          // 分布式网关 -> 柜面核心
          {
            source: 'gateway',
            target: 'core',
            style: { stroke: '#91caff', lineWidth: 2, endArrow: { path: G6.Arrow.triangle(6, 8, 0), fill: '#91caff' } },
          },
        ],
      }

      const tooltip = new G6.Tooltip({
        itemTypes: ['node'],
        getContent(e) {
          const m = e.item.getModel()
          return `<div style="padding:6px 10px"><strong>${m.label}</strong><div style="font-size:12px;color:#888">点击查看详情</div></div>`
        },
      })

      this.graph = new G6.Graph({
        container: 'g6-container',
        width: container.clientWidth,
        height: container.clientHeight,
        backgroundColor: '#f5f7fa',
        plugins: [tooltip],
        modes: { default: ['drag-node', 'drag-canvas', 'zoom-canvas'] },
        defaultNode: {
          type: 'circle',
          size: 50,
          style: { fill: '#e6f4ff', stroke: '#1677ff' }, // 默认企业互联样式
        },
        nodeStateStyles: { active: { stroke: '#1677ff', lineWidth: 2 } },
        defaultEdge: { style: { stroke: '#91caff', lineWidth: 2 } },
      })

      // hover效果
      this.graph.on('node:mouseenter', (e) => this.graph.setItemState(e.item, 'active', true))
      this.graph.on('node:mouseleave', (e) => this.graph.setItemState(e.item, 'active', false))
      this.graph.on('node:click', () => window.open('https://www.baidu.com', '_blank'))

      this.graph.data(data)
      this.graph.render()

      // 动态边动画
      let offset = 0
      this.edgeTimer = setInterval(() => {
        offset -= 1
        this.graph.getEdges().forEach((edge) => this.graph.updateItem(edge, { style: { lineDashOffset: offset } }))
      }, 80)
    },
    startEdgeAnimation() {
      let offset = 0
      this.edgeTimer = setInterval(() => {
        offset -= 1
        this.graph.getEdges().forEach((edge) => {
          this.graph.updateItem(edge, { style: { lineDashOffset: offset } })
        })
      }, 80)
    },

    resizeAll() {
      const g6 = document.getElementById('g6-container')
      this.graph?.changeSize(g6.clientWidth, g6.clientHeight)
    },

    /* ================= ECharts ================= */
    initLineCharts() {
      this.initLine('lineChart1', '系统接入趋势', [10, 22, 28, 35, 50])
      this.initLine('lineChart2', '服务调用趋势', [120, 180, 260, 310, 420])
    },

    initLine(id, title, data) {
      const chart = echarts.init(document.getElementById(id))
      chart.setOption({
        title: { text: title, left: 'center', textStyle: { fontSize: 13 } },
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
  background: #f5f7fa;
  overflow: hidden;
}

/* G6画布 */
#g6-container {
  position: absolute;
  inset: 0;
}

/* 左下趋势图 */
.left-panel {
  position: absolute;
  left: 24px;
  bottom: 24px;
  width: 820px;
  display: flex;
  gap: 16px;
  z-index: 5;
}
.chart-box {
  flex: 1;
  height: 220px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* 右侧整体 */
.right-zone {
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 24px;
  width: 340px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  z-index: 5;
}

/* 平台服务总览 - 卡片容器 */
.right-cards {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: thin; /* Firefox */
}

.right-cards::-webkit-scrollbar {
  width: 3px;
}

.right-cards::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 3px;
}

.right-cards::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.7);
}

.right-cards::-webkit-scrollbar-track {
  background: transparent;
}

.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* 卡片标题和内容 */
.card-title {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
  margin-top: 5px;
  border-left: 3px solid #1677ff;
  padding-left: 8px;
}
.card-content > div {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 6px 0;
}
.num {
  color: #1677ff;
  font-weight: 600;
}

/* 服务调用排行 */
.rank-panel {
  flex-shrink: 0;
  background: #fff;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  height: auto;
}

.rank-title {
  flex-shrink: 0;
  margin-bottom: 8px;
}

.rank-body {
  flex: 1;
  overflow-y: auto;
  padding-right: 6px;
  scrollbar-width: thin;
}

.rank-body::-webkit-scrollbar {
  width: 3px;
}

.rank-body::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 3px;
}

.rank-body::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.7);
}

.rank-body::-webkit-scrollbar-track {
  background: transparent;
}

/* 排行列表 */
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
  font-size: 13px;
}

.rank {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #1677ff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.name {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.count {
  font-weight: 600;
  color: #1677ff;
}
</style>
