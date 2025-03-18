<!-- 只能1920 -->
<template>
  <div class="green-content">
    <!-- 这是标题单独布局 -->
    <div class="head">
      <p class="title">智慧绿化灌溉平台</p>
    </div>
    <!-- 这是栅格布局，整体3份 -->
    <div style="display: flex">
      <!-- 左边 -->
      <div class="left">
        <div class="left-top"><p class="left-top-title">环境监测数据</p></div>
        <!-- 时间 -->
        <div class="left-time">
          <div style="display: flex; align-items: center">
            <img src="@/assets/screen_images/smart-green-irrigation/时间图标.png" class="conT" />
            <span class="dateD">{{ year }} 年 {{ month }} 月 {{ day }} 日</span>
            <span class="dateW">{{ weekday }}</span>
            <span class="dateN">{{ hours }}:{{ minutes }}:{{ seconds }}</span>
          </div>
          <div style="margin-top: -11px">
            <img src="@/assets/screen_images/smart-green-irrigation/环境监测数据装饰线.png" class="dateLine" />
          </div>
        </div>
        <!-- 天气 -->
        <div class="left-weather">
          <!-- 天气左边 -->
          <div style="margin-top: 12px">
            <div style="text-align: center">
              <span class="temperature-v">30</span>
              <span class="temperature-c">℃</span>
            </div>
            <div><img src="@/assets/screen_images/smart-green-irrigation/实时天气.png" /></div>
            <div class="real-time-weather">实时天气</div>
          </div>
          <!-- 天气右边 -->
          <div style="margin-top: 20px">
            <div style="display: flex">
              <div class="box" style="margin: 0 24px 24px">
                <div><img src="@/assets/screen_images/smart-green-irrigation/天气图标.png" /></div>
                <div>
                  <div class="item-title">天气</div>
                  <div class="item-con1 item-po">多云转晴</div>
                </div>
              </div>
              <div class="box">
                <img src="@/assets/screen_images/smart-green-irrigation/湿度图标.png" />
                <div>
                  <div class="item-title">湿度</div>
                  <div class="item-con2 item-po">50%</div>
                </div>
              </div>
            </div>
            <div style="display: flex">
              <div class="box" style="margin: 0 24px 24px">
                <img src="@/assets/screen_images/smart-green-irrigation/温度图标.png" />
                <div>
                  <div class="item-title">温度</div>
                  <div class="item-po">
                    <span class="item-con2" style="line-height: 19px">27</span>
                    <span class="item-con3">℃</span>
                    <span class="item-con2" style="line-height: 19px">-30</span>
                    <span class="item-con3">℃</span>
                  </div>
                </div>
              </div>
              <div class="box">
                <img src="@/assets/screen_images/smart-green-irrigation/风力图标.png" />
                <div>
                  <div class="item-title">风力</div>
                  <div class="item-po">
                    <span class="item-con1" style="line-height: 20px">南风</span>
                    <span class="item-con4">3-4</span>
                    <span class="item-con1" style="line-height: 20px">级</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="left-center"><p class="left-top-title">设备统计</p></div>
        <!-- 设备 -->
        <div class="left-device">
          <div><img class="statistics-img1" src="@/assets/screen_images/smart-green-irrigation/设备统计1080.png" /></div>
          <img class="statistics-img2" src="@/assets/screen_images/smart-green-irrigation/设备统计10802.png" />
          <div style="display: flex; position: absolute; left: 0px; top: 5px">
            <div class="device-line" style="margin-left: 10px; margin-top: 12px"></div>
            <div class="device-title" style="margin-left: 18px; margin-top: 10px">设备总数</div>
          </div>
          <div style="display: flex; position: absolute; right: 0px; top: 5px">
            <div class="device-title" style="margin-right: 18px; margin-top: 10px">在线设备</div>
            <div class="device-line" style="margin-right: 10px; margin-top: 12px"></div>
          </div>
          <div style="display: flex; position: absolute; left: 0px; top: 125px">
            <div class="device-line" style="margin-left: 10px; margin-top: 2px"></div>
            <div class="device-title" style="margin-left: 18px">告警设备</div>
          </div>
          <div style="display: flex; position: absolute; right: 0px; top: 125px">
            <div class="device-title" style="margin-right: 18px">离线设备</div>
            <div class="device-line" style="margin-right: 10px; margin-top: 2px"></div>
          </div>

          <div style="position: absolute; left: 30px; top: 45px">
            <span class="device-col-value">738</span>
            <span class="device-col-num">台</span>
          </div>
          <div style="position: absolute; left: 370px; top: 45px">
            <span class="device-col-value">637</span>
            <span class="device-col-num">台</span>
          </div>
          <div style="position: absolute; left: 30px; top: 155px">
            <span class="device-col-value">15</span>
            <span class="device-col-num">台</span>
          </div>
          <div style="position: absolute; left: 370px; top: 155px">
            <span class="device-col-value">50</span>
            <span class="device-col-num">台</span>
          </div>

          <!-- <el-progress
            style="position: absolute; left: 170px; top: 31px"
            :show-text="false"
            type="circle"
            :color="colors"
            :percentage="percentage"
            :define-back-color="percentageBgColor"
          ></el-progress> -->
          <div class="device-percent">
            <span class="device-percent-num">{{ percentageShow }}</span>
            <span class="device-percent-company">%</span>
          </div>
          <div class="device-online-title">设备在线率</div>
          <div class="luckyPie"><div id="luckyPie" style="width: 470px; height: 280px"></div></div>
        </div>
        <div class="left-bottom"><p class="left-top-title">通知公告</p></div>
        <!-- 公告 -->
        <div class="left-notice">
          <div class="left-notice-con">
            <img class="left-notice-img1" src="@/assets/screen_images/smart-green-irrigation/通知公告左边小装饰.png" />
            <div class="left-notice-p">小林子社区停电通知</div>
            <div style="flex: 1"></div>
            <div class="left-notice-date">2024-07-12</div>
            <img class="left-notice-img2" src="@/assets/screen_images/smart-green-irrigation/通知公告右边小装饰.png" />
          </div>
          <div class="left-notice-con">
            <img class="left-notice-img1" src="@/assets/screen_images/smart-green-irrigation/通知公告左边小装饰.png" />
            <div class="left-notice-p">小林子社区停电通知</div>
            <div style="flex: 1"></div>
            <div class="left-notice-date">2024-07-12</div>
            <img class="left-notice-img2" src="@/assets/screen_images/smart-green-irrigation/通知公告右边小装饰.png" />
          </div>
          <div class="left-notice-con">
            <img class="left-notice-img1" src="@/assets/screen_images/smart-green-irrigation/通知公告左边小装饰.png" />
            <div class="left-notice-p">小林子社区停电通知</div>
            <div style="flex: 1"></div>
            <div class="left-notice-date">2024-07-12</div>
            <img class="left-notice-img2" src="@/assets/screen_images/smart-green-irrigation/通知公告右边小装饰.png" />
          </div>
        </div>
      </div>
      <!-- 中间 -->
      <div class="center">
        <div class="center-content">
          <div class="center-content-item" v-for="i in 19">
            <div class="center-content-item-title">1# 管网</div>
            <div class="center-content-item-con">
              <div class="center-kv">
                <div class="center-key">设备编码</div>
                <div style="flex: 1"></div>
                <div class="center-value">27659659</div>
              </div>
              <div class="center-kv">
                <div class="center-key">设备分组</div>
                <div style="flex: 1"></div>
                <div class="center-value">2号地块</div>
              </div>
              <div class="center-kv">
                <div class="center-key">状态</div>
                <div style="flex: 1"></div>
                <div class="isOnLine">在线</div>
              </div>
              <div class="center-kv">
                <div class="center-key">阀门</div>
                <div style="flex: 1"></div>
                <div class="isOnClose">关闭</div>
              </div>
              <div class="center-kv">
                <div class="center-key">今日出水量</div>
                <div style="flex: 1"></div>
                <div class="center-value">5.263 m³</div>
              </div>
              <div class="center-kv">
                <div class="center-key">累计用水量</div>
                <div style="flex: 1"></div>
                <div class="center-value">1515.536 m³</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 右边 -->
      <div class="right">
        <div class="right-top"><p class="right-top-title">实时数据</p></div>
        <div class="right-table">
          <div class="right-table-title">
            <div class="right-table-title-font">序号</div>
            <div class="right-table-title-font">设备</div>
            <div class="right-table-title-font">属性</div>
            <div class="right-table-title-font">数据</div>
            <div class="right-table-title-font">采集时间</div>
          </div>
          <div class="right-table-con" v-for="i in 4">
            <div class="right-table-one">
              <div class="right-table-one-font">1</div>
              <div class="right-table-one-font">温湿度传感器</div>
              <div class="right-table-one-font">湿度</div>
              <div class="right-table-one-font">27℃</div>
              <div class="right-table-one-font">2024-07-09 14:15:12</div>
            </div>
            <div class="right-table-two">
              <div class="right-table-one-font">1</div>
              <div class="right-table-one-font">温湿度传感器</div>
              <div class="right-table-one-font">湿度</div>
              <div class="right-table-one-font">27℃</div>
              <div class="right-table-one-font">2024-07-09 14:15:12</div>
            </div>
          </div>
          <div class="right-water"><p class="right-top-title">近七日用水趋势</p></div>
          <div class="lucky-echart">
            <div id="lucky" style="width: 470px; height: 280px"></div>
          </div>
        </div>
      </div>
      <div><img src="@/assets/screen_images/smart-green-irrigation/左下角装饰.png" class="all-img1" /></div>
      <div><img src="@/assets/screen_images/smart-green-irrigation/右下角装饰.png" class="all-img2" /></div>
      <div class="all-img3"><span>管理中心</span></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import ResizeMixins from '@/views/common/mixins-resize.js'
import { greenOpt, greenPieOpt } from '@/views/common/echartsOpt.js'

export default {
  mixins: [ResizeMixins],
  data() {
    return {
      percentage: 88,
      colors: [
        { color: 'rgba(255, 255, 255, 0.2)', percentage: 50 },
        { color: 'rgba(255, 255, 255, 1)', percentage: 100 },
      ],
      percentageBgColor: 'rgba(14, 195, 220,0.08)',
      myChart: null,
      dataX: ['7/10', '7/11', '7/12', '7/13', '7/14', '7/15', '7/16'], //x轴的数据
      dataY: [65, 28, 92, 55, 12, 62, 58], //X轴对应的数据
      myChart2: null, //饼图
      year: '', //下面实时时间
      month: '',
      day: '',
      hours: '',
      minutes: '',
      seconds: '',
      weekday: '',
      weekdays: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      timerId: '',
    }
  },
  computed: {
    percentageShow() {
      return this.percentage
    },
  },
  created() {
    this.updateDateTime()
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    // 在组件销毁前清除定时器，以避免内存泄漏
    if (this.timerId) {
      clearInterval(this.timerId)
    }
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(document.getElementById('lucky')) // 基于准备好的dom要有宽度，初始化echarts实例
      // 指定图表的配置项和数据，不管折线图、柱状图、饼图等都需要配置，后续抽离封装
      var option = greenOpt(this.dataX, this.dataY, echarts)
      this.myChart.setOption(option)

      this.myChart2 = echarts.init(document.getElementById('luckyPie'))
      var option2 = greenPieOpt(this.percentage, echarts)
      this.myChart2.setOption(option2)
    },
    //自适应分辨率
    onResize() {
      this.myChart && this.myChart.resize()
      this.myChart2 && this.myChart2.resize()
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
  },
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'PangMenZhengDao';
  src: url('@/assets/screen_images/smart-green-irrigation/fonts/PangMenZhengDaoBiaoTiTiMianFeiBan-2.ttf') format('opentype');
}
.green-content {
  margin: 0;
  padding: 0;
  background-color: #072830;
  position: relative;
  height: 100%;
}
.head {
  position: absolute;
  width: 100%;
  height: 298px;
  background: url(@/assets/screen_images/smart-green-irrigation/头部.png) no-repeat center center;
  .title {
    font-family: PangMenZhengDao;
    font-size: 40px;
    color: #ffffff;
    letter-spacing: 4px;
    text-align: center;
    text-shadow: 0 0 8px #15dfdf;
    font-weight: 400;
    margin-top: 23px;
  }
}
.left,
.center,
.right {
  z-index: 10;
}

.left {
  width: 26%;
  .left-top {
    margin-top: 116px;
    margin-left: 24px;
    background: url(@/assets/screen_images/smart-green-irrigation/小标题.png);
    width: 466px;
    height: 38px;
    .left-top-title {
      font-family: PangMenZhengDao;
      font-size: 22px;
      color: #ffffff;
      letter-spacing: 4px;
      font-weight: 400;
      padding-left: 33px;
      padding-top: 7px;
    }
  }
  .left-center {
    margin-left: 24px;
    background: url(@/assets/screen_images/smart-green-irrigation/小标题.png);
    width: 466px;
    height: 38px;
    .left-top-title {
      font-family: PangMenZhengDao;
      font-size: 22px;
      color: #ffffff;
      letter-spacing: 4px;
      font-weight: 400;
      padding-left: 33px;
      padding-top: 7px;
    }
  }
  .left-bottom {
    margin-left: 24px;
    margin-top: 32px;
    background: url(@/assets/screen_images/smart-green-irrigation/小标题.png);
    width: 466px;
    height: 38px;

    .left-top-title {
      font-family: PangMenZhengDao;
      font-size: 22px;
      color: #ffffff;
      letter-spacing: 4px;
      font-weight: 400;
      padding-left: 33px;
      padding-top: 7px;
    }
  }
  .left-time {
    margin-top: 13px;
    .conT {
      margin-left: 24px;
    }
    .dateD {
      font-family: SourceHanSansSC-Regular;
      font-size: 14px;
      color: #ffcb67;
      letter-spacing: 0;
      line-height: 14px;
      font-weight: 400;
      margin-left: 8px;
    }
    .dateW {
      font-family: SourceHanSansSC-Regular;
      font-size: 14px;
      color: #ffcb67;
      letter-spacing: 0;
      line-height: 14px;
      font-weight: 400;
      margin-left: 16px;
    }
    .dateN {
      font-family: SourceHanSansSC-Regular;
      font-size: 14px;
      color: #ffcb67;
      letter-spacing: 0;
      line-height: 14px;
      font-weight: 400;
      margin-left: 18px;
    }

    .dateLine {
      margin-left: 60px;
    }
  }
  .left-weather {
    display: flex;
    margin-left: 57px;

    .temperature-v {
      font-family: DIN-Bold;
      font-size: 20px;
      color: #ffcb6c;
      letter-spacing: 0;
      text-align: justify;
      line-height: 24px;
      font-weight: 700;
    }
    .temperature-c {
      font-family: Helvetica;
      font-size: 16px;
      color: #ffcb6c;
      letter-spacing: 0;
      text-align: justify;
      line-height: 24px;
      font-weight: 400;
    }
    .real-time-weather {
      text-align: center;
      font-family: SourceHanSansSC-Regular;
      font-size: 14px;
      color: rgba(223, 255, 255, 0.8);
      letter-spacing: 1px;
      text-align: center;
      font-weight: 400;
      margin-top: -22px;
    }
    .box {
      width: 130px;
      height: 55.83px;
      display: flex;
      align-items: center;
      // background-image: linear-gradient(139deg, rgba(81, 197, 233, 0) 3%, rgba(43, 125, 143, 0.21) 100%);
      background-image: url(@/assets/screen_images/smart-green-irrigation/小卡片.png);
      .item-title {
        font-family: SourceHanSansSC-Regular;
        font-size: 14px;
        color: rgba(223, 255, 255, 0.8);
        letter-spacing: 1px;
        text-align: justify;
        font-weight: 400;
        margin-left: 10px;
      }
      .item-con1 {
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #5cfcf6;
        letter-spacing: 0;
        text-align: justify;
        font-weight: 600;
      }
      .item-con2 {
        font-family: DIN-Bold;
        font-size: 16px;
        color: #5cfcf6;
        letter-spacing: 0;
        text-align: justify;
        font-weight: 700;
      }
      .item-con3 {
        font-family: Helvetica;
        font-size: 12px;
        color: #5cfcf6;
        letter-spacing: 0;
        text-align: justify;
        line-height: 19px;
        font-weight: 400;
      }
      .item-con4 {
        font-family: DIN-Bold;
        font-size: 14px;
        color: #5cfcf6;
        letter-spacing: 0;
        text-align: justify;
        line-height: 20px;
        font-weight: 700;
      }
      .item-po {
        margin-left: 10px;
        margin-top: 10px;
      }
    }
  }
  .left-device {
    margin-left: 24px;
    margin-top: 24px;
    position: relative;
    .statistics-img2 {
      position: absolute;
      top: 15px;
      left: 158px;
    }
    .device-title {
      font-family: SourceHanSansSC-Regular;
      font-size: 16px;
      color: rgba(223, 255, 255, 0.8);
      letter-spacing: 1.14px;
      text-align: justify;
      font-weight: 400;
    }
    .device-line {
      background: #2cffed;
      width: 1px;
      height: 12px;
    }
    .device-col-value {
      font-family: DIN-Bold;
      font-size: 18px;
      color: #ffcb67;
      letter-spacing: 0;
      text-align: justify;
      font-weight: 700;
    }
    .device-col-num {
      font-family: SourceHanSansSC-Regular;
      font-size: 12px;
      color: rgba(223, 255, 255, 0.6);
      letter-spacing: 0;
      text-align: justify;
      font-weight: 400;
      margin-left: 5px;
    }
    .device-online-title {
      position: absolute;
      left: 198px;
      top: 109px;
      font-family: SourceHanSansSC-Regular;
      font-size: 14px;
      color: rgba(223, 255, 255, 0.8);
      letter-spacing: 0;
      text-align: center;
      font-weight: 400;
    }
    .luckyPie {
      position: absolute;
      left: 1px;
      top: -52px;
    }

    .device-percent {
      position: absolute;
      left: 187px;
      top: 62px;
      text-align: center;
      width: 100px;
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
  .left-notice {
    margin-left: 24px;
    margin-top: 24px;

    .left-notice-con {
      display: flex;
      align-items: center;
      background: rgba(24, 125, 156, 0.26);
      position: relative;
      width: 466px;
      height: 40px;
      z-index: 5;
      margin-bottom: 16px;
      .left-notice-p {
        font-family: SourceHanSansSC-Regular;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 1px;
        text-align: justify;
        font-weight: 400;
        padding-left: 16px;
      }
      .left-notice-date {
        font-family: SourceHanSansSC-Regular;
        font-size: 14px;
        color: #b4d7d8;
        letter-spacing: 1px;
        text-align: justify;
        font-weight: 400;
        padding-right: 10px;
      }
      .left-notice-img1 {
        position: absolute;
        left: 0px;
      }
      .left-notice-img2 {
        position: absolute;
        right: 0;
      }
    }
  }
}
.center {
  width: 48%;
  .center-content {
    margin-top: 116px;
    display: flex;
    overflow: auto;
    height: 790px;
    flex-wrap: wrap;
    background: url(@/assets/screen_images/smart-green-irrigation/中间点阵.png) no-repeat bottom right;
    .center-content-item {
      background: url(@/assets/screen_images/smart-green-irrigation/管网卡片背景1920.png) no-repeat left center;
      width: 294px;
      height: 242px;
      margin-bottom: 13px;
      margin-right: 10px;
    }
    .center-content-item-title {
      padding-top: 12px;
      padding-left: 13px;
      background: url(@/assets/screen_images/smart-green-irrigation/管网卡片标题.png) no-repeat left center;

      font-family: SourceHanSansSC-Bold;
      font-size: 16px;
      color: #ffffff;
      font-weight: 700;
      width: 294px;
      height: 40px;
    }
    .center-content-item-con {
      width: 294px;
      height: 202px;
      padding: 16px;
      .center-kv {
        display: flex;
        margin-bottom: 10px;
        .center-key {
          font-family: SourceHanSansSC-Regular;
          font-size: 14px;
          color: #88a6a8;
          letter-spacing: 1px;
          font-weight: 400;
          height: 18px;
        }

        .center-value {
          font-family: SourceHanSansSC-Regular;
          font-size: 14px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: right;
          font-weight: 400;
        }
        .isOnLine {
          color: #7dffaa;
          border: 1px solid #24c75c;
          width: 48px;
          height: 24px;
          border-radius: 12px;
          background-color: rgba(22, 229, 93, 0.2);
          text-align: center;
          line-height: 24px;
          font-family: SourceHanSansSC-Regular;
          font-size: 14px;
        }
        .isOnClose {
          color: #ffcb6c;
          border: 1px solid #ffa73f;
          width: 48px;
          height: 24px;
          border-radius: 12px;
          background-color: rgba(236, 130, 19, 0.2);
          text-align: center;
          line-height: 24px;
          font-family: SourceHanSansSC-Regular;
          font-size: 14px;
        }
      }
    }
  }
}
.right {
  width: 25.5%;
  .right-top {
    margin-top: 116px;
    margin-left: 7px;
    background: url(@/assets/screen_images/smart-green-irrigation/小标题.png);
    width: 466px;
    height: 38px;
    .right-top-title {
      font-family: PangMenZhengDao;
      font-size: 22px;
      color: #ffffff;
      letter-spacing: 4px;
      font-weight: 400;
      padding-left: 33px;
      padding-top: 7px;
    }
  }
  .right-table {
    margin-top: 18.59px;
    margin-left: 7px;
    .right-table-title {
      background: url(@/assets/screen_images/smart-green-irrigation/实时统计表头1920.png);
      width: 466px;
      height: 40.38px;
      padding: 13px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15.62px;
      .right-table-title-font {
        font-family: SourceHanSansSC-Regular;
        font-size: 14px;
        color: #dfffff;
        letter-spacing: 1.17px;
        text-align: center;
        font-weight: 400;
      }
    }
    .right-table-con {
      .right-table-one {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40.38px;
        padding: 13px;
        width: 466px;
        background: rgba(24, 125, 156, 0.2);
      }
      .right-table-one-font {
        font-family: SourceHanSansSC-Regular;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        line-height: 22px;
        font-weight: 400;
      }
      .right-table-two {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 40.38px;
        padding: 13px;
        width: 466px;
      }
    }
  }
  .right-water {
    margin-top: 25px;
    margin-left: 7px;
    background: url(@/assets/screen_images/smart-green-irrigation/小标题.png);
    width: 466px;
    height: 38px;
    .right-top-title {
      font-family: PangMenZhengDao;
      font-size: 22px;
      color: #ffffff;
      letter-spacing: 4px;
      font-weight: 400;
      padding-left: 33px;
      padding-top: 7px;
    }
  }
  .lucky-echart {
    // background-color: pink;
  }
}

.all-img1 {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 1;
}
.all-img2 {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.all-img3 {
  background: url(@/assets/screen_images/smart-green-irrigation/控制台按钮.png);
  position: absolute;
  right: 24px;
  top: 72px;
  width: 92px;
  height: 32px;
  text-align: center;

  span {
    font-family: SourceHanSansSC-Regular;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 1px;
    text-align: justify;
    font-weight: 400;
    line-height: 32px;
  }
}
*::-webkit-scrollbar {
  width: 8px;
  // height: 1px;
  background: #051e24;
  border-radius: 8px;
}

*::-webkit-scrollbar-thumb {
  border: 1px solid rgba(0, 0, 0, 0);
  height: 20px;
  background: #0f7b90;
  border-radius: 8px;
}
</style>
