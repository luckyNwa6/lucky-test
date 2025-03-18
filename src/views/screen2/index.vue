<template>
  <div class="screen-container">
    <!-- 头部 -->
    <div class="header">
      <div class="header-left">
        <div class="img-time"></div>
        <div class="left-time-date">{{ year }} 年{{ month }}月{{ day }}日</div>
        <div class="left-time-week">{{ weekday }}</div>
        <div class="left-time-time">{{ hours }}:{{ minutes }}:{{ seconds }}</div>
      </div>
      <div class="header-center"><span>智慧天然气管道监测平台</span></div>

      <div class="header-right"><div>管理中心</div></div>
    </div>
    <!-- 底部绝对定位即可 -->
    <div class="bottom-img"></div>
    <!-- 中间左右2快 -->
    <div class="center">
      <!--设备实时数据-->
      <div class="c1">
        <Card title="设备实时数据" style="margin-top: 20px" isSelect></Card>
        <div class="center-left-con">
          <div class="box" style="margin-left: 3.7%">
            <img src="@/assets/screen_images/smart-natural-gas/icon/device/套压.png" />
            <div>
              <div class="item-title">套压</div>
              <div class="item-con1 item-po">2.8Mpa</div>
            </div>
          </div>
          <div class="box">
            <img src="@/assets/screen_images/smart-natural-gas/icon/device/瞬时.png" />
            <div>
              <div class="item-title">顺时流量</div>
              <div class="item-con2 item-po">33.52m³/h</div>
            </div>
          </div>
          <div class="box" style="margin-left: 3.7%">
            <img src="@/assets/screen_images/smart-natural-gas/icon/device/油压.png" />
            <div>
              <div class="item-title">油压</div>
              <div class="item-con1 item-po">1.53Mpa</div>
            </div>
          </div>
          <div class="box">
            <img src="@/assets/screen_images/smart-natural-gas/icon/device/累计.png" />
            <div>
              <div class="item-title">累计流量</div>
              <div class="item-con2 item-po">2633.52m³</div>
            </div>
          </div>
          <div class="box" style="margin-left: 3.7%">
            <img src="@/assets/screen_images/smart-natural-gas/icon/device/管压.png" />
            <div>
              <div class="item-title">管压</div>
              <div class="item-con1 item-po">0.23Mpa</div>
            </div>
          </div>
        </div>
      </div>
      <div class="c2">
        <Card title="近七日实时数据趋势" style="margin-top: 20px"></Card>
        <div class="center-right-con">
          <div id="luckyLine" class="luckyLine" style="width: 100%; height: 300px"></div>
        </div>
      </div>
    </div>
    <!-- 底下3块 -->
    <div class="footer">
      <div class="footer-left">
        <Card title="设备统计" style="margin-top: 32px"></Card>
        <div class="left-device">
          <div class="left-device-font1">
            <span>88</span>
            <span class="left-device-font2">%</span>
          </div>

          <div class="left-device-font3">设备在线率</div>
          <img class="luckyPieCon" src="@/assets/screen_images/smart-natural-gas/bg/设备统计.png" alt="" />
          <div class="left-device-con-1">
            <div style="position: relative; width: 100%; display: flex">
              <img class="img-auto" src="@/assets/screen_images/smart-natural-gas/bg/总数1.png" />
              <img class="img-fix" src="@/assets/screen_images/smart-natural-gas/bg/总数2.png" />

              <!-- <img class="img-auto" src="@/assets/screen_images/smart-natural-gas/bg/device1.png" /> -->
              <div class="device-title" style="left: 10.3%; top: 20px">设备总数</div>
              <div class="device-col-value" style="left: 6.3%; top: 60px">100</div>
            </div>
          </div>

          <div class="left-device-con-2">
            <div style="position: relative; width: 100%; display: flex">
              <img class="img-fix" src="@/assets/screen_images/smart-natural-gas/bg/在线2.png" />
              <img class="img-auto" src="@/assets/screen_images/smart-natural-gas/bg/在线1.png" />
              <!-- <img class="img-auto" src="@/assets/screen_images/smart-natural-gas/bg/device2.png" /> -->
              <div class="device-title" style="right: 10.3%; top: 20px">设备在线</div>
              <div class="device-col-value2" style="right: 6.3%; top: 60px">88</div>
            </div>
          </div>

          <div class="left-device-con-3">
            <div style="position: relative; width: 100%; display: flex">
              <img class="img-auto" src="@/assets/screen_images/smart-natural-gas/bg/离线1.png" />
              <img class="img-fix" src="@/assets/screen_images/smart-natural-gas/bg/离线2.png" />
              <!-- <img class="img-auto" src="@/assets/screen_images/smart-natural-gas/bg/device3.png" /> -->
              <div class="device-col-value3" style="left: 6.36%; top: 37px">12</div>

              <div class="device-title" style="left: 10.3%; top: 97px">设备离线</div>
            </div>
          </div>

          <div class="left-device-con-4">
            <div style="position: relative; width: 100%; display: flex">
              <img class="img-fix" src="@/assets/screen_images/smart-natural-gas/bg/告警2.png" />
              <img class="img-auto" src="@/assets/screen_images/smart-natural-gas/bg/告警1.png" />
              <!-- <img class="img-auto" src="@/assets/screen_images/smart-natural-gas/bg/device4.png" /> -->
              <div class="device-col-value4" style="right: 10.3%; top: 37px">27</div>
              <div class="device-title" style="right: 10.3%; top: 97px">设备告警</div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-center">
        <Card title="实时告警数据" style="margin-top: 32px"></Card>
        <div class="table1" @mousemove="move">
          <div class="real-time-data" @mouseleave="leave">
            <dv-scroll-board :config="realData" @mouseover="over" />
            <p v-if="tipShow" class="tip-text" :style="{ top: tipText.offsetY, left: tipText.offsetX }">
              {{ tipText.name }}
            </p>
          </div>
        </div>
      </div>
      <div class="footer-right">
        <Card title="实时数据" style="margin-top: 32px"></Card>
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
import echarts from 'echarts'
import ResizeMixins from '@/utils/mixins-resize.js'
import { gasLineOpt, gasPieOpt } from '@/utils/echartsOpt.js'
import Card from './components/Card.vue'

export default {
  mixins: [ResizeMixins],
  components: {
    Card,
  },
  data() {
    return {
      percentage: 80,
      myChart: null,
      dataX: ['1', '2', '3', '4', '5', '6', '7'], //x轴的数据
      dataYa: [0.5, 0.6, 1.0, 2.1, 2.7, 3.1, 2.9], //油压
      dataTa: [2.1, 2.7, 0.5, 0.6, 1.0, 3.1, 2.9], //套压
      dataGa: [2.7, 0.5, 0.6, 1.0, 3.1, 2.1, 2.9], //管压
      dataSl: [4888, 5888, 4777, 4888, 5222, 4891, 5221], //瞬时流量
      dataLl: [5888, 4777, 4888, 5222, 4888, 4891, 5221], //累计流量
      year: '', //下面实时时间
      month: '',
      day: '',
      hours: '',
      minutes: '',
      seconds: '',
      weekday: '',
      weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      timerId: '',
      realData: {
        header: ['告警名称', '设备名称', '告警数值', '告警时间'],
        data: [
          ['1管压异常告警', '设备（F123455）', '1Mpa', '2024-07-09 14:15:12'],
          ['2管压异常告警', '设备（F123455）', '1Mpa', '2024-07-09 14:15:12'],
          ['3管压异常告警', '设备（F123455）', '1Mpa', '2024-07-09 14:15:12'],
          ['4管压异常告警', '设备（F123455）', '1Mpa', '2024-07-09 14:15:12'],
          ['5管压异常告警', '设备（F123455）', '1Mpa', '2024-07-09 14:15:12'],
          ['6管压异常告警', '设备（F123455）', '1Mpa', '2024-07-09 14:15:12'],
          ['7管压异常告警', '设备（F123455）', '1Mpa', '2024-07-09 14:15:12'],
          ['8管压异常告警', '设备（F123455）', '1Mpa', '2024-07-09 14:15:12'],
          ['9管压异常告警', '设备（F123455）', '1Mpa', '2024-07-09 14:15:12'],
        ],
        columnWidth: [70, 130, 130, 110],
        index: true,
        indexHeader: '序号',
        rowNum: 7,
        headerBGC: 'rgba(31,92,142,0.40)',
        oddRowBGC: 'none',
        evenRowBGC: 'rgba(9,70,121,0.40)',
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
        header: ['设备名称', '属性', '数值', '上报时间'],
        data: [
          ['设备（F123455）', '套压', '1Mpa', '2024-07-09 14:15:12'],
          ['设备（F123455）', '套压', '1Mpa', '2024-07-09 14:15:12'],
          ['设备（F123455）', '套压', '1Mpa', '2024-07-09 14:15:12'],
          ['设备（F123455）', '套压', '1Mpa', '2024-07-09 14:15:12'],
          ['设备（F123455）', '套压', '1Mpa', '2024-07-09 14:15:12'],
          ['设备（F123455）', '套压', '1Mpa', '2024-07-09 14:15:12'],
          ['7设备（F123455）', '套压', '1Mpa', '2024-07-09 14:15:12'],
          ['8设备（F123455）', '套压', '1Mpa', '2024-07-09 14:15:12'],
        ],
        columnWidth: [70, 130, 130, 110],
        index: true,
        indexHeader: '序号',
        rowNum: 7,
        headerBGC: 'rgba(31,92,142,0.40)',
        oddRowBGC: 'none',
        evenRowBGC: 'rgba(9,70,121,0.40)',
      },
    }
  },

  created() {
    this.updateDateTime()
  },
  mounted() {
    this.initChart()
    this.myChart && this.myChart.resize()
  },
  beforeDestroy() {
    // 在组件销毁前清除定时器，以避免内存泄漏
    if (this.timerId) {
      clearInterval(this.timerId)
    }
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(document.getElementById('luckyLine')) // 基于准备好的dom要有宽度，初始化echarts实例
      // 指定图表的配置项和数据，不管折线图、柱状图、饼图等都需要配置，后续抽离封装
      var option = gasLineOpt(this.dataX, this.dataYa, this.dataTa, this.dataGa, this.dataSl, this.dataLl, echarts)
      this.myChart.setOption(option)
    },
    //自适应分辨率
    onResize() {
      this.myChart && this.myChart.resize()
    },
    //更新时间
    updateDateTime() {
      this.getCurrentDateTimeWithWeekday()
      this.timerId = setInterval(() => {
        this.getCurrentDateTimeWithWeekday()
      }, 1000)
    },
    getCurrentDateTimeWithWeekday() {
      const now = new Date()
      this.year = now.getFullYear()
      this.month = String(now.getMonth() + 1).padStart(2, '0') // 月份是从0开始的，所以需要加1
      this.day = String(now.getDate()).padStart(2, '0')
      this.hours = String(now.getHours()).padStart(2, '0')
      this.minutes = String(now.getMinutes()).padStart(2, '0')
      this.seconds = String(now.getSeconds()).padStart(2, '0')
      this.weekday = this.weekdays[now.getDay()]
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
}
</script>
<style lang="scss" scoped>
// @font-face {
//   font-family: 'SourceHanSansSC-Medium';
//   src: url('~@/assets/screen_images/smart-natural-gas/fonts/YouSheBiaoTiHei-2.ttf') format('opentype');
// }
.screen-container {
  width: 100%;
  height: 960px;
  background: url('~@/assets/screen_images/smart-natural-gas/bg1280.png') center center no-repeat;
  background-size: 100% 100%;
  position: relative;
  .header {
    height: 100px;
    width: 100%;
    background: url('~@/assets/screen_images/smart-natural-gas/bg/顶部大标题.png') center center no-repeat;
    display: flex;
    position: relative;
    justify-content: space-between;
    .header-left {
      background: url('~@/assets/screen_images/smart-natural-gas/bg/time.png') center center no-repeat;
      background-size: 100% 100%;
      height: 46px;
      width: 24%;
      margin-top: 49px;
      margin-left: 2%;
      display: flex;
      align-items: center;

      .img-time {
        margin-left: 7%;
        width: 19px;
        height: 18px;
        background: url('~@/assets/screen_images/smart-natural-gas/icon/时间.png') no-repeat;
      }
      .left-time-date {
        font-family: SourceHanSansSC-Medium;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        font-weight: 500;
        line-height: 46px;
        margin-left: 1%;
      }
      .left-time-week {
        font-family: SourceHanSansSC-Medium;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        font-weight: 500;
        line-height: 46px;
        margin-left: 3%;
      }
      .left-time-time {
        font-family: SourceHanSansSC-Medium;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        font-weight: 500;
        line-height: 46px;
        margin-left: 3%;
      }
    }
    .header-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: YouSheBiaoTiHei;
      font-size: 50px;
      color: #ffffff;
      letter-spacing: 4px;
      text-align: center;
      font-weight: 400;
      line-height: 100px;
      background-image: linear-gradient(to bottom, #ffffff, #56b0ff);
      -webkit-background-clip: text;
      color: transparent;
    }
    .header-right {
      height: 46px;
      margin-top: 49px;
      margin-right: 6%;
      text-align: right;
      div {
        background: url('~@/assets/screen_images/smart-natural-gas/bg/按钮-管理中心.png') center center no-repeat;
        background-size: cover;
        text-align: center;
        width: 190px;
        font-family: SourceHanSansSC-Medium;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        font-weight: 500;
        line-height: 46px;
      }
    }
  }
  .bottom-img {
    position: absolute;
    // z-index: 6;
    width: 100%;
    height: 45px;
    bottom: 0;
    background: url('~@/assets/screen_images/smart-natural-gas/bg/底部.png') center center no-repeat;
    background-size: 100% 100%;
  }
  .center {
    display: flex;
    margin-left: 2%;
    .c1 {
      flex: 1;
      height: 380px;
      min-width: 0;
      .center-left {
        height: 46px;
        background: url('~@/assets/screen_images/smart-natural-gas/bg/title-body.png') center center no-repeat;
        background-size: 100% 100%;
        .center-left-title {
          font-family: SourceHanSansSC-Bold;
          font-size: 20px;
          color: #ffffff;
          letter-spacing: 2px;
          font-weight: 700;
        }
      }
      .center-left-con {
        width: 100%;
        margin-top: 14px;
        height: 320px;
        display: flex;
        flex-wrap: wrap;
        background: rgba(9, 70, 121, 0.4);
        padding: 35px 0 0 0;
        .box {
          flex: 1 0 calc(50% - 20px); /* 每个格子的宽度，减去间隔 */
          margin: 5px; /* 格子之间的间隔 */
          background-size: 100% 100%;
          height: 55.83px;
          display: flex;
          align-items: center;

          .item-title {
            font-family: SourceHanSansSC-Regular;
            font-size: 16px;
            color: #47bdff;
            text-align: left;
            font-weight: 400;
          }
          .item-con1 {
            font-family: Arial-BoldMT;
            font-size: 18px;
            color: #ffffff;
            text-align: left;
            font-weight: 700;
          }
          .item-con2 {
            font-family: Arial-BoldMT;
            font-size: 18px;
            color: #ffffff;
            text-align: left;
            font-weight: 700;
          }
          .item-po {
            margin-top: 5px;
          }
          div {
            margin-left: 3%;
          }
        }
      }
    }
    .c2 {
      flex: 2;
      height: 380px;
      min-width: 0;
      padding-left: 0.8%;
      padding-right: 1.8%;
      .center-right {
        height: 46px;
        background: url('~@/assets/screen_images/smart-natural-gas/bg/title-body.png') center center no-repeat;
        background-size: 100% 100%;
        .center-right-title {
          font-family: SourceHanSansSC-Bold;
          font-size: 20px;
          color: #ffffff;
          letter-spacing: 2px;
          font-weight: 700;
        }
      }
      .center-right-con {
        width: 100%;
        margin-top: 14px;
        height: 320px;
        background: rgba(9, 70, 121, 0.4);
      }
    }
  }
  .footer {
    display: flex;
    margin-left: 2%;
    margin-top: 0.5%;
    .footer-left {
      flex: 1;
      min-width: 0;

      .footer-left-t {
        .footer-left-title {
          font-family: SourceHanSansSC-Bold;
          font-size: 20px;
          color: hsl(0, 0%, 100%);
          letter-spacing: 2px;
          font-weight: 700;
        }
      }
      .left-device {
        // margin-left: 24px;
        margin-top: 24px;
        position: relative;
        height: 310px;
        display: flex;
        padding: 0 20px;
        justify-content: center;
        align-items: center;
        .left-device-font1 {
          position: absolute;
          top: 47%;
          left: 51%;
          transform: translate(-50%, -50%);
          font-family: Arial-BoldMT;
          font-size: 46px;
          color: #ffffff;
          line-height: 54px;
          font-weight: 700;
          z-index: 10;
        }

        .left-device-font2 {
          font-family: Arial-BoldMT;
          font-size: 24px;
          color: #ffffff;
          line-height: 54px;
          font-weight: 700;
        }

        .left-device-font3 {
          position: absolute;
          top: 62%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: SourceHanSansSC-Regular;
          font-size: 18px;
          color: #47bdff;
          text-align: left;
          font-weight: 400;
          z-index: 10;
        }

        .left-device-con-1 {
          position: absolute;
          top: 0;
          left: 0;
          width: 47%;
        }
        .left-device-con-2 {
          position: absolute;
          top: 0;
          right: 0;
          width: 47%;
        }
        .left-device-con-3 {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 47%;
        }
        .left-device-con-4 {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 47%;
        }
        .device-title {
          font-family: SourceHanSansSC-Medium;
          font-size: 14px;
          color: #ffffff;
          text-align: left;
          font-weight: 500;
          position: absolute;
        }
        .device-col-value {
          font-family: SourceHanSansSC-Medium;
          font-size: 36px;
          color: #47bdff;
          font-weight: 500;
          position: absolute;
        }

        .device-col-value2 {
          font-family: SourceHanSansSC-Medium;
          font-size: 36px;
          color: #61ff96;
          font-weight: 500;
          position: absolute;
        }

        .device-col-value3 {
          font-family: SourceHanSansSC-Medium;
          font-size: 36px;
          color: #e83030;
          font-weight: 500;
          position: absolute;
        }

        .device-col-value4 {
          font-family: SourceHanSansSC-Medium;
          font-size: 36px;
          color: #ffa773;
          font-weight: 500;
          position: absolute;
        }
        .img-fix {
          flex: 0 0 auto; /* 不伸缩，固定宽度 */
          height: 140px;
          width: 120px;
        }
        .img-auto {
          flex: 1; /* 自动填充剩余空间 */
          height: 140px; /* 自动调整高度 */
          min-width: 0;
        }

        .device-online-title {
          font-family: SourceHanSansSC-Regular;
          font-size: 14px;
          color: rgba(223, 255, 255, 0.8);
          letter-spacing: 0;
          text-align: center;
          font-weight: 400;
        }
        .luckyPieCon {
          max-width: 100%; /* 确保图片不超出容器 */
          max-height: 100%; /* 确保图片不超出容器 */
          // background-color: pink;

          // width: 20px;
          // height: 20px;
          // margin: 0 18px;
          animation: rotateIcon 2s linear infinite; /* 使用名为 rotateIcon 的动画，持续时间2秒，线性动画，无限循环 */
        }

        @keyframes rotateIcon {
          from {
            transform: rotate(0deg); /* 从0度开始旋转 */
          }
          to {
            transform: rotate(360deg); /* 旋转到360度，即一圈 */
          }
        }

        .device-percent {
          text-align: center;
          width: 100px;
          z-index: 10;
          .device-percent-num {
            font-family: DIN-Bold;
            font-size: 35px;
            color: #ffcb67;
            letter-spacing: 0;
            text-align: justify;
            line-height: 43px;
            font-weight: 700;
          }
          .device-percent-company {
            font-family: DIN-Bold;
            font-size: 16px;
            color: #ffcb67;
            letter-spacing: 0;
            text-align: justify;
            line-height: 43px;
            font-weight: 700;
          }
        }
      }
    }
    .footer-center {
      flex: 1;
      height: 390px;
      padding-left: 0.8%;
      min-width: 0;
      box-sizing: border-box;
      // background-color: #fff;
      .footer-center-t {
        .footer-center-title {
          font-family: SourceHanSansSC-Bold;
          font-size: 20px;
          color: #ffffff;
          letter-spacing: 2px;
          font-weight: 700;
        }
      }
      .table1 {
        width: 100%;
        height: 325px;
        padding: 13px;
        // background-color: rgba(31, 92, 142, 0.4);
        // margin-bottom: 15.62px;
        .real-time-data {
          height: 325px;
          position: relative;
        }
      }
    }
    .footer-right {
      flex: 1;
      padding-left: 0.8%;
      padding-right: 1.8%;
      min-width: 0;
      box-sizing: border-box;
      .footer-right-t {
        .footer-right-title {
          font-family: SourceHanSansSC-Bold;
          font-size: 20px;
          color: #ffffff;
          letter-spacing: 2px;
          font-weight: 700;
        }
      }
      .table2 {
        width: 100%;
        height: 325px;
        padding: 13px;
        .alarm-data {
          height: 325px;
          position: relative;
        }
      }
    }
  }
}

/*轮播表tooltip样式*/
.tip-text {
  background: rgb(10, 62, 75);
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  z-index: 200;
  position: absolute;
  left: 0;
  top: 0;
  text-align: center;
  white-space: nowrap;
  color: #dfffff;
}

/* 添加媒体查询 */
@media (max-width: 1281px) {
  .screen-container {
    color: #56b0ff;
  }
  .header {
    background: url('~@/assets/screen_images/smart-natural-gas/bg/顶部大标题1280.png') center center no-repeat !important;
  }
  .left-time-date,
  .left-time-week,
  .left-time-time {
    font-size: 15px !important;
  }
  // .table1,
  // .table2 {
  //   width: 100%;
  //   height: 220px !important;
  //   padding: 13px;
  //   // background-color: rgba(31, 92, 142, 0.4);
  //   // margin-bottom: 15.62px;
  //   .real-time-data {
  //     height: 220px !important;
  //     position: relative;
  //   }
  //   .alarm-data {
  //     height: 220px !important;
  //     position: relative;
  //   }
  // }
  .left-device {
    // height: 220px !important;
  }
  .footer-center {
    // height: 220px !important;
  }
}
::v-deep .dv-scroll-board .rows .index {
  background-color: transparent !important;
}

/* 添加媒体查询 */
@media (max-width: 1700px) {
  ::v-deep .real-time-data .dv-scroll-board .header .header-item:nth-child(1) {
    width: 20% !important;
  }
  ::v-deep .real-time-data .dv-scroll-board .header .header-item:nth-child(2) {
    width: 33% !important;
  }
  ::v-deep .real-time-data .dv-scroll-board .header .header-item:nth-child(3) {
    width: 32% !important;
  }
  ::v-deep .real-time-data .dv-scroll-board .header .header-item:nth-child(4) {
    width: 32% !important;
  }
  ::v-deep .real-time-data .dv-scroll-board .header .header-item:nth-child(5) {
    width: 33% !important;
  }
  ::v-deep .real-time-data .dv-scroll-board .rows .row-item .ceil:nth-child(1) {
    width: 20% !important;
  }
  ::v-deep .real-time-data .dv-scroll-board .rows .row-item .ceil:nth-child(2) {
    width: 33% !important;
  }
  ::v-deep .real-time-data .dv-scroll-board .rows .row-item .ceil:nth-child(3) {
    width: 32% !important;
  }
  ::v-deep .real-time-data .dv-scroll-board .rows .row-item .ceil:nth-child(4) {
    width: 32% !important;
  }
  ::v-deep .real-time-data .dv-scroll-board .rows .row-item .ceil:nth-child(5) {
    width: 33% !important;
  }
  /*告警数据 事件名称列宽度*/
  ::v-deep .alarm-data .dv-scroll-board .header .header-item:nth-child(1) {
    width: 20% !important;
  }
  ::v-deep .alarm-data .dv-scroll-board .header .header-item:nth-child(2) {
    width: 33% !important;
  }
  ::v-deep .alarm-data .dv-scroll-board .header .header-item:nth-child(3) {
    width: 30% !important;
  }
  ::v-deep .alarm-data .dv-scroll-board .header .header-item:nth-child(4) {
    width: 30% !important;
  }
  ::v-deep .alarm-data .dv-scroll-board .header .header-item:nth-child(5) {
    width: 33% !important;
  }
  ::v-deep .alarm-data .dv-scroll-board .rows .row-item .ceil:nth-child(1) {
    width: 20% !important;
  }
  ::v-deep .alarm-data .dv-scroll-board .rows .row-item .ceil:nth-child(2) {
    width: 33% !important;
  }
  ::v-deep .alarm-data .dv-scroll-board .rows .row-item .ceil:nth-child(3) {
    width: 30% !important;
  }
  ::v-deep .alarm-data .dv-scroll-board .rows .row-item .ceil:nth-child(4) {
    width: 30% !important;
  }
  ::v-deep .alarm-data .dv-scroll-board .rows .row-item .ceil:nth-child(5) {
    width: 33% !important;
  }
}
</style>
