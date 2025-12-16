<template>
  <div>
    <el-row :gutter="20" style="margin: 0">
      <el-col :span="17">
        <el-card>
          <div id="lucky_chart" style="min-height: 400px"></div>
        </el-card>
        <el-button @click="resetChart">重置图表</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ResizeMixins from '@/views/common/mixins-resize.js'
import { demoCharts1, pressureCharts, pressureCharts2 } from '@/views/common/echartsOpt.js'
export default {
  mixins: [ResizeMixins],
  data() {
    return {
      myChart: null,
      xLabel: ['7:00', '7:20', '7:40', '8:00', '8:20', '8:40', '9:00', '9:20', '9:40', '10:00'], //x轴数据
      dataValue: [120, 500, 300, 700, 50, 80, 150, 200, 300, 400, 600, 500], // 浓度数据，范围0到1000
      dataValue1: [20.5, 22.0, 25.0, 19.0, 21.5, 24.0, 23.5, 22.5, 20.0, 19.5, 25.0, 24.5], // 温度数据，范围0到100
      dataValue2: [5.0, 7.0, 6.5, 5.5, 6.0, 6.8, 7.2, 6.0, 5.5, 6.5, 7.0, 6.8], // 浊度或pH数据，假设为pH值，范围0到14
      dataYaLi: [7.5, 5.0, 7.0, 6.5, 5.5, 6.0, 6.8, 7.2, 6.0, 5.5], //压力
      xLabel2: ['9:00:20', '9:00:30', '9:00:40', '9:00:50'], //x轴数据
      dataYaLi2: [4.5, 5.4, 7.2, 6.5],
      xLabel3: ['9:40:10', '9:40:20', '9:40:30', '9:40:40', '9:40:50'], //x轴数据
      dataYaLi3: [4.5, 5.4, 7.2, 5.5, 5.5],
      closestValue: '', //靠近锤点的值
      objData: '', //处理后的y值
    }
  },
  mounted() {
    this.closestValue = this.findClosest(this.xLabel, this.xLabel2)
    this.objData = this.dataYaLi.map((item, index) => {
      console.log('🚀 ~ this.objData=this.dataYaLi.map ~ index:', index)
      return {
        value: item,
        itemStyle: {
          color: this.closestValue !== this.xLabel[index] ? 'rgba(102, 225, 223, 1)' : 'red',
          borderColor: this.closestValue !== this.xLabel[index] ? 'rgba(102, 225, 223, 0.4)' : 'red',
        },
      }
    })
    this.$nextTick(() => {
      console.log('Closest value:', this.closestValue)
      this.demo2()
    })

    console.log(this.objData)
  },

  methods: {
    demo2() {
      this.myChart = this.$echarts.init(document.getElementById('lucky_chart'))

      let demoTooltip = {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        confine: true,
        formatter: function (params) {
          // console.log(params)
          var relVal = ''
          for (var i = 0, l = params.length; i < l; i++) {
            if (that.closestValue === params[i].axisValue) {
              relVal += `<span style="display:inline-block;padding-bottom:20px;width:1px;"></span>
                水锤压力 <span style="color:red">></span>
        `
            } else {
              relVal += `<span style="display:inline-block;padding-bottom:20px;width:1px;"></span>
        <span style="display:inline-block;margin-right:5px;margin-bottom:4px;border-radius:10px;width:13px;height:3px;background-color:${
          params[i].color
        };"></span>
        ${params[i].seriesName}: ${params[i].value || '-'}Mpa<br/>
        时间: ${params[i].axisValue}
        `
            }
          }

          return relVal
        },
        // 添加以下样式
        textStyle: {
          fontSize: 14,
          color: '#FFFFFF ',
          margin: 20,
        },
        extraCssText: 'max-width: 300px; padding: 12px;',
      }

      let optionMain = pressureCharts(demoTooltip, true, this.xLabel, this.objData, this.$echarts)
      let that = this
      // 监听点击事件
      this.myChart.on('click', function (params) {
        if (params.componentType === 'series') {
          // console.log('点击的值:', params.data)
          that.isMainData = !that.isMainData
          if (that.isMainData) {
            that.updateChart(that.xLabel, that.dataYaLi)
          } else {
            that.updateChart(that.xLabel2, that.dataYaLi2)
          }
        }
      })
      this.myChart.setOption(optionMain)
    },
    updateChart(xLabel, dataYaLi) {
      let option = undefined
      if (this.isMainData) {
        option = pressureCharts('', true, xLabel, dataYaLi, this.$echarts)
      } else {
        option = pressureCharts2('', true, xLabel, dataYaLi, this.$echarts)
      }

      this.myChart.setOption(option)
    },
    resetChart() {
      this.isMainData = true
      this.updateChart(this.xLabel, this.dataYaLi)
    },

    timeToMinutes(time) {
      const parts = time.split(':')
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10)
    },

    findClosest(xLabel, xLabel2) {
      const xLabelInMinutes = xLabel.map(this.timeToMinutes)
      const xLabel2FirstInMinutes = this.timeToMinutes(xLabel2[0])

      let closestIndex = 0
      let minDiff = Math.abs(xLabel2FirstInMinutes - xLabelInMinutes[0])

      for (let i = 1; i < xLabelInMinutes.length; i++) {
        const diff = Math.abs(xLabel2FirstInMinutes - xLabelInMinutes[i])
        if (diff < minDiff) {
          minDiff = diff
          closestIndex = i
        }
      }

      return xLabel[closestIndex]
    },
    demo1() {
      let option = demoCharts1('', true, this.xLabel, this.dataValue, this.$echarts, this.dataValue1, this.dataValue2)
      this.myChart = this.$echarts.init(document.getElementById('lucky_chart'))
      //最少留下一个图例
      var that = this
      this.myChart.on('legendselectchanged', function (params) {
        console.log(params) // 可以打印看下参数
        let selected = []
        for (let key in params.selected) {
          if (params.selected[key]) {
            selected.push(key)
          }
        }
        if (selected.length < 1) {
          that.myChart.dispatchAction({
            type: 'legendSelect',
            name: params.name,
          })
        }
      })
      this.myChart.setOption(option)
    },

    //自适应分辨率
    onResize() {
      this.myChart && this.myChart.resize()
      // this.$refs.swiper1 && this.$refs.swiper1.resize();
    },
  },
}
</script>
