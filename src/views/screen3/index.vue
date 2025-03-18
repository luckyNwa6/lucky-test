<template>
  <div class="screen-container">
    <!-- 头部 -->
    <div class="header">
      <div class="header-left"><span>智慧机房环境监测平台</span></div>
      <div class="header-center">
        <div>监控大屏</div>
        <div>管理中心</div>
      </div>
      <div class="header-right">
        <span>{{ currentDay }}</span>
        <span>{{ currentWeekday }}</span>
        <span>{{ currentTime }}</span>
      </div>
    </div>
    <!-- 中间左右3块 -->
    <div class="center">
      <div class="center-left">
        <Card title="办公环境参数"></Card>
        <div class="center-left-con" v-for="i in officeData">
          <div class="img-box">
            <img :src="require(`@/assets/screen_images/smart-machine-room/${i.icon}.png`)" />
          </div>
          <div>
            <span style="opacity: 0.75; margin: 0 16px 0 10px">{{ i.id }}</span>
            <span>{{ i.name }}</span>
          </div>
          <div>
            <span :style="i.isStyle ? { 'margin-left': i.isStyle } : {}">{{ i.suffix }}</span>
          </div>
        </div>
        <Card title="设备情况" style="margin-top: 14px; margin-bottom: 22px"></Card>
        <div class="all-device">
          <div class="img-box" style="margin-left: 7px; margin-top: 11px; width: 80px">
            <img src="@/assets/screen_images/smart-machine-room/所有设备.png" style="top: 10%" />
          </div>
          <div class="device-q">
            <div class="device-title">所有设备</div>
            <div class="device-con">
              <span class="device-key">总数:</span>
              <span class="device-value">20</span>
              <span class="device-key">正常:</span>
              <span class="device-value">20</span>
              <span class="device-key">离线:</span>
              <span class="device-value">0</span>
            </div>
          </div>
        </div>
      </div>
      <div class="center-center">
        <Card title="机房环境监测"></Card>
        <div class="machine-con">
          <!-- <iframe
            style="width: 100%; height: 100%; border: none"
            src="http://sensing.four-faith.com:9013/modules/topology/graphpreview.html?id=af781a93-ffe3-4381-bf21-a5fd27736b37&ht=%E6%9C%BA%E6%88%BF%E5%AE%89%E5%85%A8%E7%9B%91%E6%B5%8B"
          ></iframe> -->
        </div>
      </div>
      <div class="center-right">
        <Card title="仓储及消防监测"></Card>
        <div style="flex: 1">
          <Card title="烟感监测" isBg2 style="margin-top: 16px"></Card>
          <div class="lucky-echart">
            <div id="lucky" style="width: 100%; height: 130px"></div>
          </div>
        </div>
        <div style="display: flex; margin-top: 13px">
          <div style="flex: 1">
            <Card title="温度" isBg2></Card>
            <div id="luckySpeed1" style="width: 100%; height: 180px"></div>
          </div>
          <div style="flex: 1; margin-left: 16px">
            <Card title="湿度" isBg2></Card>
            <div id="luckySpeed2" style="width: 100%; height: 180px"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底下3块 -->
    <div class="footer">
      <div class="footer-left">
        <Card title="重点区域温湿度"></Card>
        <div class="table1" @mousemove="move">
          <div class="real-time-data" @mouseleave="leave">
            <dv-scroll-board :config="realData" @mouseover="over" />
            <p v-if="tipShow" class="tip-text" :style="{ top: tipText.offsetY, left: tipText.offsetX }">
              {{ tipText.name }}
            </p>
          </div>
        </div>
      </div>
      <div class="footer-center">
        <Card title="重点区域参数"></Card>
        <div :class="['box-content', imageClassName]">
          <div class="footer-top">
            <div><span>1</span></div>
            <div><span>2</span></div>
            <div><span>3</span></div>
            <div><span>4</span></div>
            <div><span>5</span></div>
          </div>
          <div class="footer-center2">
            <div class="title">储气用气气压</div>
            <div class="title">重点区域用水</div>
            <div class="title">重点设备用电</div>
            <div class="title">区域危气浓度</div>
            <div class="title" style="margin-right: 0">厂区区域雨量</div>
          </div>
          <div class="foot-center-bottom">
            <div class="one" @click="clickFun(1)">
              <div class="img-box2" style="margin: 0 auto; margin-top: 40px; width: 80px">
                <img src="@/assets/screen_images/smart-machine-room/储气用气气压.png" style="top: 10%" />
              </div>
              <div class="num">0.72</div>
              <div class="suffix">MPA</div>
            </div>
            <div class="two" @click="clickFun(2)">
              <div class="img-box2" style="margin: 0 auto; margin-top: 40px; width: 80px">
                <img src="@/assets/screen_images/smart-machine-room/湿度.png" style="top: 10%" />
              </div>
              <div class="num">125</div>
              <div class="suffix">m³</div>
            </div>
            <div class="three" @click="clickFun(3)">
              <div class="img-box2" style="margin: 0 auto; margin-top: 40px; width: 80px">
                <img src="@/assets/screen_images/smart-machine-room/重点设备用电.png" style="top: 10%" />
              </div>
              <div class="num">20657.16</div>
              <div class="suffix">KWH</div>
            </div>
            <div class="four" @click="clickFun(4)">
              <div class="img-box2" style="margin: 0 auto; margin-top: 40px; width: 80px">
                <img src="@/assets/screen_images/smart-machine-room/区域危气浓度.png" style="top: 10%" />
              </div>
              <div class="num">0</div>
              <div class="suffix">单位</div>
            </div>
            <div class="five" @click="clickFun(5)">
              <div class="img-box2" style="margin: 0 auto; margin-top: 40px; width: 80px">
                <img src="@/assets/screen_images/smart-machine-room/储气用气气压.png" style="top: 10%" />
              </div>
              <div class="num">0.0</div>
              <div class="suffix">mm</div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-right">
        <Card title="异常告警"></Card>
        <div class="table2" @mousemove="move">
          <div class="alarm-data" @mouseleave="leave">
            <dv-scroll-board :config="alarmData" @mouseover="alarmOver" />
            <p v-if="alarmTipShow" class="tip-text" :style="{ top: tipText.offsetY, left: tipText.offsetX }">
              {{ tipText.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from './components/Card.vue'
import echarts from 'echarts'
import ResizeMixins from '@/utils/mixins-resize.js'
import { machinePieOpt, machineSpeed1Opt, machineSpeed2Opt } from '@/utils/echartsOpt.js'
import moment from 'moment'
import 'moment/locale/zh-cn' // 引入中文本地化
export default {
  mixins: [ResizeMixins],
  components: { Card },
  data() {
    return {
      percentage: 99,
      temperature: 28.1,
      humidity: 68, //湿度
      myChart: null,
      myChart2: null,
      myChart3: null,
      officeData: [
        { icon: '湿度', id: 'No.1', name: '湿度', suffix: '45.87%', isStyle: '53px' },
        { icon: 'PM10', id: 'No.2', name: 'PM10', suffix: '33ug/m³', isStyle: '44px' },
        { icon: 'PM2.5', id: 'No.3', name: 'PM2.5', suffix: '29ug/m³', isStyle: '39px' },
        { icon: '温度', id: 'No.4', name: '温度', suffix: '26.2°C', isStyle: '53px' },
        { icon: 'PM1.0', id: 'No.5', name: 'PM1.0', suffix: '24ug/m³', isStyle: '39px' },
      ],
      realData: {
        header: ['设备名称', '温度', '湿度', '运行状态'],
        data: [
          ['18F冰箱湿度', '16.8°C', '30.1%', '在线'],
          ['28F冰箱湿度', '16.8°C', '30.1%', '在线'],
          ['38F冰箱湿度', '16.8°C', '30.1%', '在线'],
          ['48F冰箱湿度', '16.8°C', '30.1%', '在线'],
          ['58F冰箱湿度', '16.8°C', '30.1%', '在线'],
          ['68F冰箱湿度', '16.8°C', '30.1%', '离线'],
          ['78F冰箱湿度', '16.8°C', '30.1%', '在线'],
          ['88F冰箱湿度', '16.8°C', '30.1%', '在线'],
          ['98F冰箱湿度', '16.8°C', '30.1%', '离线'],
          ['108F冰箱湿度', '16.8°C', '30.1%', '在线'],
          ['118F冰箱湿度', '16.8°C', '30.1%', '在线'],
        ],
        columnWidth: [65, 110, 75, 110],
        index: true,
        indexHeader: '序号',
        rowNum: 10,
        headerBGC: '',
        oddRowBGC: 'none',
        evenRowBGC: 'none',
      },
      // tooltip
      tipText: {
        name: '',
        offsetX: '',
        offsetY: '',
      },
      tipShow: false, // 控制实时数据单元格显隐
      alarmTipShow: false, //控制报警数据单元格显隐
      alarmData: {
        header: ['告警内容 ', '设备名称', '告警时间'],
        data: [
          ['8F冰箱湿度8F冰箱xxxxx', '8F冰箱湿度', '2024-07-09 14:15:12'],
          ['8F冰箱湿度8F冰箱xxxxx', '8F冰箱湿度', '2024-07-09 14:15:12'],
          ['8F冰箱湿度8F冰箱xxxxx', '8F冰箱湿度', '2024-07-09 14:15:12'],
          ['8F冰箱湿度8F冰箱xxxxx', '8F冰箱湿度', '2024-07-09 14:15:12'],
          ['8F冰箱湿度8F冰箱xxxxx', '8F冰箱湿度', '2024-07-09 14:15:12'],
          ['8F冰箱湿度8F冰箱xxxxx', '8F冰箱湿度', '2024-07-09 14:15:12'],
          ['8F冰箱湿度8F冰箱xxxxx', '8F冰箱湿度', '2024-07-09 14:15:12'],
          ['8F冰箱湿度8F冰箱xxxxx', '8F冰箱湿度', '2024-07-09 14:15:12'],
          ['8F冰箱湿度8F冰箱xxxxx', '8F冰箱湿度', '2024-07-09 14:15:12'],
          ['8F冰箱湿度8F冰箱xxxxx', '8F冰箱湿度', '2024-07-09 14:15:12'],
          ['8F冰箱湿度8F冰箱xxxxx', '8F冰箱湿度', '2024-07-09 14:15:12'],
        ],
        columnWidth: [65, 130, 130],
        index: true,
        indexHeader: '序号',
        rowNum: 10,
        headerBGC: '',
        oddRowBGC: 'none',
        evenRowBGC: 'none',
      },
      imageClassName: 'image-0',
      currentDay: '',
      currentWeekday: '',
      currentTime: '',
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    updateDateTime() {
      this.currentDay = moment().format('YYYY年MM月DD日')
      this.currentWeekday = moment().format('dddd')
      this.currentTime = moment().format('HH:mm:ss')
    },
    clickFun(num) {
      // console.log(num)
      this.imageClassName = `image-${num}`
    },
    initChart() {
      this.myChart = echarts.init(document.getElementById('lucky'))
      var option = machinePieOpt(this.percentage, 360, echarts)
      this.myChart.setOption(option)

      this.myChart2 = echarts.init(document.getElementById('luckySpeed1'))
      var option2 = machineSpeed1Opt(this.temperature, echarts)
      this.myChart2.setOption(option2)

      this.myChart3 = echarts.init(document.getElementById('luckySpeed2'))
      var option3 = machineSpeed2Opt(this.humidity, echarts)
      this.myChart3.setOption(option3)
    },
    //自适应分辨率
    onResize() {
      this.myChart && this.myChart.resize()
      this.myChart2 && this.myChart2.resize()
      this.myChart3 && this.myChart3.resize()
    },
    // 实时数据列表鼠标移入
    over(dom) {
      this.tipShow = true
      //v.ceil拿到单元格数据
      const htmlString = dom.ceil
      //过滤条件：序号划入输出的是span标签 序号过滤不展示tooltip
      const regex = /<span[^>]*>(.*?)<\/span>/
      const match = regex.exec(htmlString)
      this.tipText.name = match ? '' : dom.ceil
      //没有值则直接隐藏悬浮框
      if (!this.tipText.name) this.tipShow = false
    },
    // 鼠标移动（共用）
    move(e) {
      const { left, top } = e.currentTarget.getBoundingClientRect()
      const xPosition = e.pageX - left
      const yPosition = e.pageY - top
      // 悬浮框位置可自行调整
      this.tipText.offsetX = xPosition - 110 + 'px'
      this.tipText.offsetY = yPosition - 60 + 'px'
    },
    // 告警列表鼠标移入
    alarmOver(dom) {
      this.alarmTipShow = true
      //v.ceil拿到单元格数据
      const htmlString = dom.ceil
      //过滤条件：序号划入输出的是span标签 序号过滤不展示tooltip
      const regex = /<span[^>]*>(.*?)<\/span>/
      const match = regex.exec(htmlString)
      this.tipText.name = match ? '' : dom.ceil
      //没有值则直接隐藏悬浮框
      if (!this.tipText.name) this.alarmTipShow = false
    },
    // 鼠标离开（共用）
    leave() {
      //隐藏单元格
      this.tipShow = false
      this.alarmTipShow = false
    },
  },
  created() {
    // 设置初始时间并每秒更新
    this.updateDateTime()
    setInterval(() => {
      this.updateDateTime()
    }, 1000)
  },
}
</script>
<style lang="scss" scoped>
.screen-container {
  cursor: url('~@/assets/screen_images/smart-machine-room/face/point.svg'), pointer;
  width: 100%;
  height: 100%;
  background: url('~@/assets/screen_images/smart-machine-room/bg.png') center center no-repeat;
  background-size: cover;
  position: relative;
  overflow-y: auto;
  .header {
    height: 53px;
    display: flex;
    align-items: center;
    background: rgba(13, 16, 21, 0.6);
    background-image: linear-gradient(89deg, rgba(234, 201, 162, 0.16) 0%, rgba(234, 201, 162, 0) 24%, rgba(234, 201, 162, 0) 100%),
      linear-gradient(180deg, rgba(234, 201, 162, 0) 0%, rgba(234, 201, 162, 0) 63%, rgba(234, 201, 162, 0.16) 100%);
    .header-left {
      flex: 1;
      // background: #000;
      margin-left: 2%;
      span {
        font-family: MicrosoftYaHei-Bold;
        font-size: 28px;
        color: #ffffff;
        letter-spacing: 3.5px;
        font-weight: 700;
      }
    }
    .header-center {
      flex: 2;
      // background: pink;
      display: flex;
      div {
        font-family: SourceHanSansSC-Bold;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        font-weight: 700;
        line-height: 53px;
      }
      div:first-child {
        height: 53px;
        width: 130px;
        background: url('~@/assets/screen_images/smart-machine-room/btn/btn1.png') center center no-repeat;
        background-size: 100% 100%;
      }
      div:nth-child(2) {
        height: 53px;
        width: 130px;
        background: url('~@/assets/screen_images/smart-machine-room/btn/btn2.png') center center no-repeat;
        background-size: 100% 100%;
      }
    }
    .header-right {
      flex: 1;
      // background: green;
      text-align: right;
      margin-right: 0.9%;
      span {
        font-family: SourceHanSansSC-Regular;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        font-weight: 400;
      }
      span:first-child {
        margin-right: 4.15px;
      }
      span:nth-child(2) {
        margin-right: 12.67px;
      }
    }
  }
  .img-box {
    width: 60px;
    height: 37px;
    background: url('~@/assets/screen_images/smart-machine-room/icon/qz.png') center center no-repeat;
    background-size: cover;
    position: relative;
    // background: #000;
    img {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      // left: ;
    }
  }
  .img-box2 {
    width: 60px;
    height: 37px;
    background: url('~@/assets/screen_images/smart-machine-room/icon/qz.png') center center no-repeat;
    background-size: 100% 100%;
    position: relative;
    // background: #000;
    img {
      position: absolute;
      top: 30%;
      left: 50%;
      transform: translate(-50%, -50%);
      // left: ;
    }
  }
  .center {
    display: flex;
    height: 420px;
    margin-top: 16px;
    margin-left: 1.5%;
    margin-right: 1.5%;
    .center-left {
      flex: 1;
      // background: pink;
      .center-left-con {
        height: 37px;
        background: url('~@/assets/screen_images/smart-machine-room/icon/bg.png') center center no-repeat;
        background-size: cover;
        margin-top: 12px;
        display: flex;

        div > span {
          font-family: SourceHanSansSC-Regular;
          font-size: 16px;
          color: #ffffff;
          letter-spacing: 0;
          font-weight: 400;
          line-height: 34px;
        }
        div:last-child > span {
          font-family: SourceHanSansSC-Bold;
          font-size: 14px;
          color: #f3b552;
          letter-spacing: 0;
          font-weight: 700;
        }
      }

      .all-device {
        display: flex;
        .device-q {
          margin-top: -10px;
          width: 100%;
          margin-left: 8px;
          height: 63px;
          .device-title {
            height: 24px;
            background: url('~@/assets/screen_images/smart-machine-room/modeltitle/one/bg.png') center center no-repeat;
            background-size: cover;
            font-family: SourceHanSansSC-Bold;
            font-size: 14px;
            color: #ffffff;
            letter-spacing: 0;
            font-weight: 700;
          }
          .device-con {
            margin-top: 11px;
            .device-key {
              font-family: SourceHanSansSC-Regular;
              font-size: 14px;
              color: #ffffff;
              letter-spacing: 0;
              font-weight: 400;
              margin-right: 8px;
            }
            .device-value {
              font-family: SourceHanSansSC-Bold;
              font-size: 16px;
              color: #f3b552;
              letter-spacing: 0;
              font-weight: 700;
              margin-right: 16px;
            }
          }
        }
      }
    }
    .center-center {
      flex: 2;
      // background: yellow;
      margin-left: 0.8%;
      .machine-con {
        margin-top: 8px;
        height: 374px;
        background: url('~@/assets/screen_images/smart-machine-room/机房环境监测背景.png') center center no-repeat;
        background-size: 100% 100%;
      }
    }
    .center-right {
      flex: 1;
      margin-left: 1%;
      min-width: 0;
    }
  }
  .footer {
    display: flex;
    height: 352px;
    margin-left: 1.5%;
    margin-right: 1.5%;
    .footer-left {
      flex: 1;
      min-width: 0;
      // background-color: blue;
      .table1 {
        width: 100%;
        height: 330px;
        padding: 13px;

        // margin-bottom: 15.62px;
        .real-time-data {
          height: 330px;
          position: relative;
        }
      }
    }
    .footer-center {
      flex: 1.8;
      margin-left: 0.8%;
      min-width: 0;
      .box-content1 {
        background: url('~@/assets/screen_images/smart-machine-room/showborder/1.png') center center no-repeat;
      }
      .box-content {
        background: url('~@/assets/screen_images/smart-machine-room/showborder/0.png') center center no-repeat;
        background-size: 100% 100%;
        height: 320px;
        margin-top: 20px;
        &.image-1 {
          background: url('~@/assets/screen_images/smart-machine-room/showborder/1.png') center center no-repeat;
          background-size: 100% 100%;
        }
        &.image-2 {
          background: url('~@/assets/screen_images/smart-machine-room/showborder/2.png') center center no-repeat;
          background-size: 100% 100%;
        }
        &.image-3 {
          background: url('~@/assets/screen_images/smart-machine-room/showborder/3.png') center center no-repeat;
          background-size: 100% 100%;
        }
        &.image-4 {
          background: url('~@/assets/screen_images/smart-machine-room/showborder/4.png') center center no-repeat;
          background-size: 100% 100%;
        }
        &.image-5 {
          background: url('~@/assets/screen_images/smart-machine-room/showborder/5.png') center center no-repeat;
          background-size: 100% 100%;
        }
        .footer-top {
          display: flex;
          justify-content: space-between;
          width: 41%;
          margin: 0 auto;
          // background: pink;

          div {
            font-family: SourceHanSansSC-Bold;
            font-size: 20px;
            color: #e7dec0;
            letter-spacing: 0;
            font-weight: 700;
            margin-top: -15px;
          }
        }
        .footer-center2 {
          height: 67px;
          display: flex;
          align-items: flex-end;
          .title {
            font-family: SourceHanSansSC-Bold;
            font-size: 16px;
            color: #ffeac9;
            letter-spacing: 0;
            text-align: center;
            font-weight: 700;
            flex: 1;
            margin-bottom: 15.5px;
            margin-right: 13px;
          }
        }
        // background-color: rgb(24, 024, 69);
        .foot-center-bottom {
          display: flex;
          .num {
            font-family: SourceHanSansSC-Bold;
            font-size: 20px;
            color: #ffeac9;
            letter-spacing: 0;
            text-align: center;
            font-weight: 700;
            margin-top: 20px;
          }
          .suffix {
            opacity: 0.75;
            font-family: SourceHanSansSC-Regular;
            font-size: 14px;
            color: #f3b552;
            letter-spacing: 0;
            text-align: center;
            font-weight: 400;
            margin-top: 8px;
          }
          .one,
          .five,
          .two,
          .four,
          .three {
            flex: 1;
            height: 240px;
          }
          .one,
          .two,
          .three,
          .four {
            margin-right: 13px;
          }
        }
      }
    }
    .footer-right {
      flex: 1.2;
      min-width: 0;
      .table2 {
        width: 100%;
        height: 330px;
        padding: 13px;
        .alarm-data {
          height: 330px;
          position: relative;
        }
      }
    }
  }
}

/*重写轮播表样式样式*/
::v-deep .real-time-data .dv-scroll-board .header {
  background-image: url('~@/assets/screen_images/smart-machine-room/table/title.png');
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

::v-deep .real-time-data .dv-scroll-board .rows .row-item:nth-child(even) {
  /*偶数行背景*/
  background-image: url('~@/assets/screen_images/smart-machine-room/table/t2.png');
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

::v-deep .real-time-data .dv-scroll-board .rows .row-item:nth-child(odd) {
  /*奇数行行背景*/
  background-image: url('~@/assets/screen_images/smart-machine-room/table/t1.png');
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

::v-deep .alarm-data .dv-scroll-board .header {
  background-image: url('~@/assets/screen_images/smart-machine-room/table/title.png');
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
::v-deep .alarm-data .dv-scroll-board .rows .row-item:nth-child(even) {
  /*偶数行背景*/
  background-image: url('~@/assets/screen_images/smart-machine-room/table/t2.png');
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  // padding-left: 50px;
}

/*告警列表告警内容字体颜色单独设置*/
::v-deep .alarm-data .dv-scroll-board .rows .row-item .ceil:nth-child(2) {
  // width: 65% !important;
  font-family: SourceHanSansSC-Regular;
  font-size: 14px;
  color: #ff8e8e;
  letter-spacing: 0;
  font-weight: 400;
}
::v-deep .real-time-data .dv-scroll-board .rows .row-item .ceil:nth-child(5) {
  // width: 65% !important;
  font-family: SourceHanSansSC-Regular;
  font-size: 14px;
  color: #39bfa4;
  letter-spacing: 0;
  font-weight: 400;
}

::v-deep .alarm-data .dv-scroll-board .rows .row-item:nth-child(odd) {
  /*奇数行行背景*/
  background-image: url('~@/assets/screen_images/smart-machine-room/table/t1.png');
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

/*修改表头字体颜色大小*/
::v-deep .dv-scroll-board .header {
  opacity: 0.75;
  font-family: SourceHanSansSC-Regular;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
  font-weight: 400;
}
/*修改表格行内字体颜色大小*/
::v-deep .dv-scroll-board .rows .row-item .ceil {
  opacity: 0.75;
  font-family: SourceHanSansSC-Regular;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
  font-weight: 400;
}

/* 添加媒体查询 */
@media (max-width: 1281px) {
  .header-left {
    span {
      font-size: 24px !important;
    }
  }
}
/* 添加媒体查询 */
@media (max-width: 1700px) {
  // .screen-header .screen-header-m .header-title {
  //   font-size: 32px;
  // }
  // ::v-deep .real-time-data .dv-scroll-board .header .header-item {
  //   padding: 0 2px;
  // }
  // ::v-deep .real-time-data .dv-scroll-board .rows .ceil {
  //   padding: 0 2px;
  // }
  /*实时数据 事件名称列宽度*/
  // ::v-deep .real-time-data .dv-scroll-board .header .header-item:nth-child(1) {
  //   width: 39% !important;
  // }
  ::v-deep .real-time-data .dv-scroll-board .header .header-item:nth-child(2) {
    width: 55% !important;
  }
  ::v-deep .real-time-data .dv-scroll-board .header .header-item:nth-child(3) {
    width: 32% !important;
  }
  ::v-deep .real-time-data .dv-scroll-board .header .header-item:nth-child(4) {
    width: 32% !important;
  }
  ::v-deep .real-time-data .dv-scroll-board .header .header-item:nth-child(5) {
    width: 43% !important;
  }
  ::v-deep .real-time-data .dv-scroll-board .rows .row-item .ceil:nth-child(2) {
    width: 30% !important;
  }
  ::v-deep .real-time-data .dv-scroll-board .rows .row-item .ceil:nth-child(3) {
    width: 22% !important;
  }
  ::v-deep .real-time-data .dv-scroll-board .rows .row-item .ceil:nth-child(5) {
    width: 25% !important;
  }
  /*告警数据 事件名称列宽度*/
  ::v-deep .alarm-data .dv-scroll-board .header .header-item:nth-child(2) {
    width: 28% !important;
  }
  ::v-deep .alarm-data .dv-scroll-board .header .header-item:nth-child(3) {
    width: 33% !important;
  }

  ::v-deep .alarm-data .dv-scroll-board .header .header-item:nth-child(4) {
    width: 32% !important;
  }
  ::v-deep .alarm-data .dv-scroll-board .rows .row-item .ceil:nth-child(2) {
    width: 28% !important;
  }
  ::v-deep .alarm-data .dv-scroll-board .rows .row-item .ceil:nth-child(3) {
    width: 33% !important;
  }

  ::v-deep .alarm-data .dv-scroll-board .rows .row-item .ceil:nth-child(4) {
    width: 32% !important;
  }
}
</style>
