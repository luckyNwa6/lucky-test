<template>
  <div class="page">
    <div class="left-sidebar">
      <el-card class="side-card flex-1" shadow="never">
        <div slot="header"><span class="card-header-title">服务资产统计</span></div>
        <div class="grid-container">
          <div class="grid-item-box" v-for="item in assetData" :key="item.label">
            <div class="label">{{ item.label }}</div>
            <div class="value">{{ item.value }}</div>
          </div>
        </div>
      </el-card>

      <el-card class="side-card flex-1" shadow="never">
        <div slot="header" class="header-with-action">
          <span class="card-header-title">调用数量统计</span>
          <div class="header-action">
            <span class="action-label">网关</span>
            <el-switch v-model="isGateway" size="mini" active-color="#1677ff"></el-switch>
          </div>
        </div>
        <div class="grid-container">
          <div class="grid-item-box" v-for="item in callData" :key="item.label">
            <div class="label">{{ item.label }}</div>
            <div class="value color-blue">{{ item.value }}</div>
          </div>
        </div>
      </el-card>
    </div>

    <div class="main-content">
      <div id="g6-container"></div>
    </div>

    <div class="right-sidebar">
      <div class="right-scroll-container">
        <el-card v-for="(item, index) in filteredCards" :key="index" class="mini-card" shadow="never">
          <div slot="header" class="mini-header"><span class="card-header-title mini">{{ item.title }}</span></div>
          <div class="card-content">
            <div v-for="(row, i) in item.rows" :key="i" class="content-row">
              <span class="row-label">{{ row.label }}</span>
              <span class="num">{{ row.value }}</span>
            </div>
          </div>
        </el-card>

        <el-card class="mini-card" shadow="never">
          <div slot="header" class="mini-header"><span class="card-header-title mini">流程统计</span></div>
          <div class="process-flex">
            <div class="p-item"><div class="p-v">96</div><div class="p-l">流程数</div></div>
            <div class="p-item"><div class="p-v warning">12</div><div class="p-l">审批中</div></div>
            <div class="p-item"><div class="p-v success">84</div><div class="p-l">已完成</div></div>
          </div>
          <div id="trend-chart" style="width: 100%; height: 110px;"></div>
        </el-card>

        <el-card class="rank-card-el" shadow="never">
          <div slot="header">
            <div class="rank-title-row">
              <span class="card-header-title mini">服务调用排行</span>
            </div>
            <div class="rank-filters-row">
              <el-select v-model="consumerValue" size="mini" placeholder="消费方" clearable>
                <el-option label="系统1" value="core1"></el-option>
                <el-option label="系统2" value="core2"></el-option>
              </el-select>
              <el-select v-model="providerValue" size="mini" placeholder="提供方" clearable>
                <el-option label="系统A" value="scene1"></el-option>
                <el-option label="系统B" value="scene2"></el-option>
              </el-select>
            </div>
          </div>
          <el-table :data="rankTableData" size="mini" border stripe style="width: 100%">
            <el-table-column prop="consumer" label="消费方系统" show-overflow-tooltip></el-table-column>
            <el-table-column prop="provider" label="提供方系统" show-overflow-tooltip></el-table-column>
            <el-table-column prop="count" label="次数" width="55" align="center"></el-table-column>
          </el-table>
        </el-card>
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
      isGateway: true,
      consumerValue: '',
      providerValue: '',
      assetData: [
        { label: '已接入系统', value: 42 }, { label: '服务总数', value: 156 },
        { label: '已发布', value: 310 }, { label: '已上线', value: 1240 },
      ],
      callData: [
        { label: 'SIT数', value: '1,204' }, { label: 'UAT数', value: '856' },
        { label: '准生产', value: '432' }, { label: '已上线', value: '2,105' },
        { label: '总数', value: '4,597' },
      ],
      rankTableData: [
        { consumer: '系统1', provider: '系统A', count: 850 },
        { consumer: '系统2', provider: '系统B', count: 620 },
        { consumer: '系统3', provider: '系统C', count: 410 },
      ],
      cards: [
        { title: 'PaaS 服务管控平台', rows: [{ label: '对比次数', value: '128' }, { label: '已登记', value: 102 }] },
        { title: '服务推送情况', rows: [{ label: '核心平台', value: '12' }, { label: '信创平台', value: '8' }] },
        { title: '一体化测试平台', rows: [{ label: '同步次数', value: 34 }, { label: '同步服务', value: 28 }] },
      ]
    }
  },
  computed: {
    filteredCards() { return this.cards.slice(0, 3) }
  },
  mounted() {
    this.initGraph()
    this.initChart()
    window.addEventListener('resize', this.resizeAll)
  },
  beforeDestroy() {
    clearInterval(this.edgeTimer)
    window.removeEventListener('resize', this.resizeAll)
  },
  methods: {
    initGraph() {
      const container = document.getElementById('g6-container')
      const data = {
        nodes: [
          { id: 'gateway', label: '分布式网关\n核心集群', x: 520, y: 260, size: [160, 80], style: { fill: '#e6f4ff', stroke: '#1677ff' } },
          { id: 'core1', label: '系统1', x: 220, y: 200 },
          { id: 'core2', label: '系统2', x: 220, y: 260 },
          { id: 'core3', label: '系统3', x: 220, y: 320 },
          { id: 'scene1', label: '系统A', x: 820, y: 200 },
          { id: 'scene2', label: '系统B', x: 820, y: 260 },
          { id: 'scene3', label: '系统C', x: 820, y: 320 },
        ],
        edges: [
          { source: 'core1', target: 'gateway' }, { source: 'core2', target: 'gateway' }, { source: 'core3', target: 'gateway' },
          { source: 'gateway', target: 'scene1' }, { source: 'gateway', target: 'scene2' }, { source: 'gateway', target: 'scene3' },
        ],
      }

      const tooltip = new G6.Tooltip({
        itemTypes: ['node'],
        getContent(e) {
          const m = e.item.getModel()
          return `<div style="padding:6px 10px"><strong>${m.label.replace('\n', '')}</strong><br/><span style="font-size:12px;color:#888">状态: 正常运行</span></div>`
        },
      })

      this.graph = new G6.Graph({
        container: 'g6-container',
        width: container.clientWidth,
        height: container.clientHeight,
        backgroundColor: '#f5f7fa',
        plugins: [tooltip],
        fitView: true,
        modes: { default: ['drag-node', 'drag-canvas', 'zoom-canvas'] },
        defaultNode: { type: 'rect', size: [96, 38], style: { fill: '#fff', stroke: '#d9d9d9', radius: 6 } },
        nodeStateStyles: { active: { stroke: '#1677ff', lineWidth: 2 } },
        defaultEdge: {
          style: {
            stroke: '#91caff',
            lineWidth: 2,
            lineDash: [6, 4],
            endArrow: { path: G6.Arrow.triangle(8, 10, 0), fill: '#91caff' },
          },
        },
      })

      this.graph.on('node:mouseenter', (e) => this.graph.setItemState(e.item, 'active', true))
      this.graph.on('node:mouseleave', (e) => this.graph.setItemState(e.item, 'active', false))
      this.graph.on('node:click', () => window.open('https://www.baidu.com', '_blank'))

      this.graph.data(data)
      this.graph.render()
      this.startEdgeAnimation()
    },
    startEdgeAnimation() {
      let offset = 0
      this.edgeTimer = setInterval(() => {
        offset = (offset + 1) % 100
        this.graph.getEdges().forEach((edge) => {
          this.graph.updateItem(edge, { style: { lineDashOffset: -offset } })
        })
      }, 50)
    },
    initChart() {
      const chart = echarts.init(document.getElementById('trend-chart'))
      chart.setOption({
        tooltip: { trigger: 'axis' },
        grid: { top: 10, bottom: 20, left: 35, right: 10 },
        xAxis: { type: 'category', data: ['01-01', '01-02', '01-03', '01-04', '01-05'], axisLabel: { fontSize: 10 } },
        yAxis: { type: 'value', axisLabel: { fontSize: 10 } },
        series: [{ data: [12, 18, 15, 25, 22], type: 'line', smooth: true, areaStyle: { opacity: 0.1 }, itemStyle: { color: '#1677ff' } }]
      })
    },
    resizeAll() {
      const container = document.getElementById('g6-container')
      this.graph?.changeSize(container.clientWidth, container.clientHeight)
      echarts.getInstanceByDom(document.getElementById('trend-chart'))?.resize()
    }
  }
}
</script>

<style scoped>
.page { display: flex; width: 100%; height: 100vh; background: #f0f2f5; overflow: hidden; }

/* 左侧：铺平 */
.left-sidebar { width: 340px; background: #fff; border-right: 1px solid #e8e8e8; display: flex; flex-direction: column; }
.side-card { border: none !important; border-bottom: 1px solid #f0f0f0 !important; border-radius: 0 !important; }
.side-card /deep/ .el-card__body { padding: 15px; }
.flex-1 { flex: 1; }

.grid-container { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.grid-item-box { background: #f8faff; padding: 12px 5px; border-radius: 4px; text-align: center; border: 1px solid #edf2f9; }
.grid-item-box .label { font-size: 11px; color: #8c8c8c; margin-bottom: 4px; }
.grid-item-box .value { font-size: 18px; font-weight: 800; color: #333; }
.color-blue { color: #1677ff !important; }

/* 中间 */
.main-content { flex: 1; position: relative; }
#g6-container { width: 100%; height: 100%; }

/* 右侧：滚动 */
.right-sidebar { width: 340px; background: #fff; border-left: 1px solid #e8e8e8; display: flex; flex-direction: column; }
.right-scroll-container { flex: 1; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 12px; }

/* 标题 */
.card-header-title { font-weight: 700; border-left: 4px solid #1677ff; padding-left: 10px; font-size: 14px; }
.card-header-title.mini { font-size: 13px; }

/* 卡片密度优化 */
.mini-card /deep/ .el-card__header { padding: 8px 12px; background: #fafafa; }
.mini-card /deep/ .el-card__body { padding: 10px; }
.content-row { display: flex; justify-content: space-between; font-size: 12px; padding: 4px 0; border-bottom: 1px dashed #f0f0f0; }
.num { color: #1677ff; font-weight: 600; }

/* 流程统计 */
.process-flex { display: flex; justify-content: space-around; margin-bottom: 5px; }
.p-v { font-size: 15px; font-weight: bold; }
.p-l { font-size: 11px; color: #999; }
.warning { color: #e6a23c; }
.success { color: #67c23a; }

/* 排行卡片 */
.rank-card-el /deep/ .el-card__header { padding: 10px; }
.rank-title-row { margin-bottom: 8px; }
.rank-filters-row { display: flex; gap: 6px; }
.rank-filters-row /deep/ .el-input__inner { padding: 0 8px; }

/* 滚动条 */
.right-scroll-container::-webkit-scrollbar { width: 4px; }
.right-scroll-container::-webkit-scrollbar-thumb { background: #dcdfe6; border-radius: 2px; }

.header-with-action { display: flex; justify-content: space-between; align-items: center; }
.action-label { font-size: 11px; color: #666; }
</style>