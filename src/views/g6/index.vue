<template>
  <div id="mountNode"></div>
</template>

<script>
import G6 from '@antv/g6'
export default {
  data() {
    return {
      // 节点信息
      nodes: [
        {
          // 点的数据
          id: 'node0',
          x: 100, // 节点x轴位置
          y: 400, // 节点y轴位置
          size: 60, // 图形尺寸,注意：该数据类型会根据type变化,一定要看官方文档，这里表示的是圆的直径
          type: 'circle', // 节点的形状
          label: 'circle圆形', // 节点的文本名称
        },
        {
          id: 'node1',
          x: 100,
          y: 100,
          size: 60,
          type: 'circle',
          label: 'circle圆形',
        },
        {
          id: 'node2',
          x: 220,
          y: 100,
          size: [90, 50], // 数组的形式，节点的长宽值
          type: 'rect',
          label: 'rect矩形',
        },
        {
          id: 'node3',
          x: 350,
          y: 100,
          size: [80, 40],
          type: 'ellipse',
          label: 'ellipse椭圆',
          labelCfg: {
            // 文本配置项
            position: 'bottom', // 文本相对于节点的位置
            offset: 5, // 文本的偏移
            style: {}, // 设置文本标签的样式
          },
          style: {
            // 设置节点的样式 (注意区分上面的style对象)
            fill: '#fa8c16', // 节点填充色
            stroke: '#000', // 节点的描边颜色
            lineWidth: 2, // 描边宽度
          },
        },
        {
          id: 'node4',
          x: 460,
          y: 100,
          size: [100, 80],
          type: 'diamond',
          label: 'diamond菱形',
        },
        {
          id: 'node5',
          x: 600,
          y: 100,
          type: 'triangle',
          label: 'triangle三角形',
          labelCfg: {
            position: 'right',
            offset: 5,
          },
        },
        {
          id: 'node6',
          x: 220,
          y: 210,
          size: 65,
          type: 'star',
          label: 'star五角星',
        },
        {
          id: 'node7',
          x: 350,
          y: 220,
          size: 60,
          type: 'image',
          img: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg', // 图片路径
          label: 'image自定义图片',
        },
        {
          id: 'node8',
          x: 550,
          y: 220,
          description: '描述文本xxxxxxxxxxx', // 描述
          type: 'modelRect',
          label: 'modelRect文本描述',
        },
      ],
      //边信息
      edges: [
        {
          source: 'node0', // 起始点id
          target: 'node6', // 结束点id
          type: 'line', // 边的类型，默认为 'line'
          label: '文本文字', // 文本文字，没有则不会显示
          labelCfg: {
            // 文本配置
            refX: '0', // 标签在 x 方向的偏移量
            refY: '10', // 标签在 y 方向的偏移量
            position: 'top', // 文本相对于边的位置
            autoRotate: true, // 标签文字是否跟随边旋转
            style: {
              // 文本样式
              fill: 'skyblue', // 文本颜色
              stroke: 'red', // 文本描边颜色
              lineWidth: 1, // 文本描边粗细
              opacity: 0.9, // 文本透明度
              // ……
            },
          }, // 文本文字的配置样式
          style: {
            // 修改边的属性
            endArrow: true, // 结束端绘制箭头
            lineWidth: 4, // 线宽
            stroke: 'red', // 边颜色
          },
        },
        {
          source: 'node1',
          target: 'node2',
        },
        {
          source: 'node2',
          target: 'node3',
        },
        {
          source: 'node1',
          target: 'node3',
        },
        {
          source: 'node3',
          target: 'node4',
        },
        {
          source: 'node4',
          target: 'node5',
        },
        {
          source: 'node1',
          target: 'node6',
        },
        {
          source: 'node1',
          target: 'node7',
        },
        {
          source: 'node6',
          target: 'node7',
        },
        {
          source: 'node7',
          target: 'node8',
        },
        {
          source: 'node8',
          target: 'node5',
        },
      ],
      graph: [],
    }
  },
  methods: {
    init() {
      // 数据汇总
      const data = {
        nodes: this.nodes,
        edges: this.edges,
      }
      // 图实例
      // const grid = new Grid()
      this.graph = new G6.Graph({
        container: 'mountNode', // 图的 DOM 容器，可以传入该 DOM 的 id 或者直接传入容器的 HTML 节点对象
        width: 1000, // 指定画布宽度，单位为 'px'，默认为画布容器宽度
        height: 1000, // 指定画布高度，单位为 'px'，默认为画布容器高度
        modes: {
          // default: ['drag-canvas', 'zoom-canvas', 'drag-node'] // 允许拖拽画布、放缩画布、拖拽节点
          default: [
            'drag-canvas',
            'drag-node',
            {
              type: 'tooltip', // 提示框
              formatText(model) {
                // 提示框文本内容
                const text = 'label: ' + model.label + '<br/> class: ' + model.class
                return text
              },
            },
          ], // 允许拖拽画布、拖拽节点
        },
        // plugins: [grid],
        // fitView: true, // 是否开启画布自适应。开启后图自动适配画布大小。
        defaultEdge: {
          // 默认状态下边的配置,可看上一节
          type: 'line',
          style: {
            endArrow: true,
            lineWidth: 2,
            stroke: '#666',
          },
        },
        nodeStateStyles: {
          // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
          hover: {
            fill: 'pink',
          },
          // 鼠标点击节点，即 click 状态为 true 时的样式
          click: {
            stroke: '#000',
            lineWidth: 3,
          },
        },
        // 边不同状态下的样式集合
        edgeStateStyles: {
          // 鼠标点击边，即 click 状态为 true 时的样式
          click: {
            stroke: 'steelblue',
          },
        },
      })
      // 鼠标进入节点
      this.graph.on('node:mouseenter', (e) => {
        const nodeItem = e.item // 获取鼠标进入的节点元素对象
        this.graph.setItemState(nodeItem, 'hover', true) // 设置当前节点的 hover 状态为 true
      })

      // 鼠标离开节点
      this.graph.on('node:mouseleave', (e) => {
        const nodeItem = e.item // 获取鼠标离开的节点元素对象
        this.graph.setItemState(nodeItem, 'hover', false) // 设置当前节点的 hover 状态为 false
      })

      // 点击节点
      this.graph.on('node:click', (e) => {
        // 先将所有当前是 click 状态的节点置为非 click 状态
        const clickNodes = this.graph.findAllByState('node', 'click')
        clickNodes.forEach((cn) => {
          this.graph.setItemState(cn, 'click', false)
        })
        const nodeItem = e.item // 获取被点击的节点元素对象
        this.graph.setItemState(nodeItem, 'click', true) // 设置当前节点的 click 状态为 true
      })

      // 点击边
      this.graph.on('edge:click', (e) => {
        // 先将所有当前是 click 状态的边置为非 click 状态
        const clickEdges = this.graph.findAllByState('edge', 'click')
        clickEdges.forEach((ce) => {
          this.graph.setItemState(ce, 'click', false)
        })
        const edgeItem = e.item // 获取被点击的边元素对象
        this.graph.setItemState(edgeItem, 'click', true) // 设置当前边的 click 状态为 true
      })
      // 注意这两需要搭配使用才会有效果
      this.graph.data(data) // 初始化的图数据，是一个包括 nodes 数组和 edges 数组的对象
      this.graph.render() // 接收数据，并进行渲染，read 方法的功能相当于 data 和 render 方法的结合
    },
    initG6() {
      // 数据请求
      fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
        .then((res) => res.json())
        .then((data) => {
          // 获取容器id
          const container = document.getElementById('mountNode')
          // 宽高
          const width = container.scrollWidth
          const height = container.scrollHeight || 600
          // 图配置，注意这里是TreeGraph --> 树图， Graph --> 图
          const graph = new G6.TreeGraph({
            container: 'mountNode',
            width,
            height,
            modes: {
              default: [
                // 官方文档给的不是很明确，有很多方法需要我们通过样例了解
                {
                  type: 'collapse-expand', // 节点的展示
                  onChange: function onChange(item, collapsed) {
                    const data = item.getModel()
                    data.collapsed = collapsed
                    return true
                  },
                },
                'drag-canvas', // 拖动
                'zoom-canvas', // 缩放
              ],
            },
            defaultNode: {
              // 设置默认节点
              size: 26, // 节点大小
              anchorPoints: [
                // 指定边连入节点的连接点的位置
                [0, 0.5],
                [1, 0.5],
              ],
            },
            defaultEdge: {
              // 设置默认边
              type: 'cubic-horizontal', // 边类型
            },
            layout: {
              type: 'compactBox', // 树布局
              direction: 'LR', // 看官网, 以下配置需要根据官网给的参数进行自定义配置
              getId: function getId(d) {
                // 节点 id 的回调函数
                return d.id
              },
              getHeight: function getHeight() {
                // 每个节点的高度
                return 16
              },
              getWidth: function getWidth() {
                // 每个节点的宽度
                return 16
              },
              getVGap: function getVGap() {
                // 每个节点的垂直间隙
                return 10
              },
              getHGap: function getHGap() {
                // 每个节点的水平间隙
                return 100
              },
            },
          })
          graph.node(function (node) {
            // 对各个节点样式及其他配置进行设置
            return {
              label: node.id,
              labelCfg: {
                offset: 10,
                position: node.children && node.children.length > 0 ? 'left' : 'right',
              },
            }
          })
          graph.data(data) // 初始化数据
          graph.render() // 渲染
          graph.fitView() // 支持伸缩
          if (typeof window !== 'undefined') {
            // 尺寸自适应
            window.onresize = () => {
              if (!graph || graph.get('destroyed')) return
              if (!container || !container.scrollWidth || !container.scrollHeight) return
              graph.changeSize(container.scrollWidth, container.scrollHeight)
            }
          }
        })
    },
  },
  mounted() {
    this.init()
    // this.initG6()
  },
}
</script>

<style>
/* 提示框的样式 */
.g6-tooltip {
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  font-size: 12px;
  color: #545454;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px 8px;
  box-shadow: rgb(174, 174, 174) 0px 0px 10px;
}
</style>
