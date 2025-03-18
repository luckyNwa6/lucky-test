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
          <img src="@/assets/screen_images/smart-green-irrigation/环境监测数据装饰线.png" class="dateLine" />
        </div>
        <!-- 天气 -->
        <div class="left-weather">
          <!-- 天气左边 -->
          <div style="margin-top: 12px; width: 31.5%">
            <div style="text-align: center">
              <span class="temperature-v">30</span>
              <span class="temperature-c">℃</span>
            </div>
            <div style="text-align: center">
              <img src="@/assets/screen_images/smart-green-irrigation/实时天气.png" />
            </div>
            <div class="real-time-weather">实时天气</div>
          </div>
          <!-- 天气右边 -->
          <div style="margin-top: 20px; width: 68.5%">
            <div style="display: flex; flex-wrap: wrap">
              <div class="box">
                <div>
                  <img src="@/assets/screen_images/smart-green-irrigation/天气图标.png" />
                </div>
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
              <div class="box">
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
          <div class="left-device-con" style="justify-content: space-between">
            <div style="flex: 1">
              <div class="left-device-con-1">
                <div class="device-line" style="margin-left: 8px; margin-top: 8px"></div>
                <div class="device-title" style="margin-left: 16px; margin-top: 8px; width: 70px">设备总数</div>
              </div>
              <div>
                <span class="device-col-value" style="margin-left: 24px">738</span>
                <span class="device-col-num">台</span>
              </div>
            </div>
            <div class="luckyPieCon">
              <div id="luckyPie" class="luckyPie"></div>
            </div>
            <div style="flex: 1">
              <div class="left-device-con-1">
                <div class="device-title" style="margin-right: 22px; margin-top: 8px; width: 70px">在线设备</div>
                <div class="device-line" style="position: absolute; right: 11px; top: 13px"></div>
              </div>
              <div>
                <span class="device-col-value" style="margin-left: 6%">637</span>
                <span class="device-col-num">台</span>
              </div>
            </div>
          </div>

          <div class="left-device-con" style="justify-content: space-between; margin-top: -59px">
            <div>
              <div class="left-device-con-1">
                <div class="device-line" style="margin-left: 8px"></div>
                <div class="device-title" style="margin-left: 16px; margin-top: 2px">告警设备</div>
              </div>

              <div>
                <span class="device-col-value" style="margin-left: 24px">15</span>
                <span class="device-col-num">台</span>
              </div>
            </div>

            <div>
              <div class="left-device-con-1">
                <div class="device-title" style="margin-right: 16px; margin-top: 2px">离线设备</div>
                <div class="device-line" style="margin-right: 8px"></div>
              </div>
              <div>
                <span class="device-col-value">50</span>
                <span class="device-col-num">台</span>
              </div>
            </div>
          </div>
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
          <div class="center-content-item" v-for="i in 10">
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
        <div class="right-table" @mousemove="move">
          <div class="real-time-data" @mouseleave="leave">
            <dv-scroll-board :config="realData" @mouseover="over" />
            <p v-if="tipShow" class="tip-text" :style="{ top: tipText.offsetY, left: tipText.offsetX }">
              {{ tipText.name }}
            </p>
          </div>
        </div>
        <div class="right-water">
          <p class="right-top-title">近七日用水趋势</p>
        </div>
        <div class="lucky-echart">
          <div id="lucky" style="width: 100%; height: 280px"></div>
        </div>
      </div>
    </div>
    <div>
      <img src="@/assets/screen_images/smart-green-irrigation/左下角装饰.png" class="all-img1" />
    </div>
    <div>
      <img src="@/assets/screen_images/smart-green-irrigation/右下角装饰.png" class="all-img2" />
    </div>
    <div class="all-img3"><span>管理中心</span></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import ResizeMixins from '@/utils/mixins-resize.js'
import { greenOpt, greenPieOpt } from '@/utils/echartsOpt.js'

export default {
  mixins: [ResizeMixins],
  data() {
    return {
      percentage: 80,
      myChart: null,
      myChart2: null, //饼图
      dataX: ['7/10', '7/11', '7/12', '7/13', '7/14', '7/15', '7/16'], //x轴的数据
      dataY: [65, 28, 92, 55, 12, 62, 58], //X轴对应的数据
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
        header: ['设备', '属性', '数据', '采集时间'],
        data: [
          ['1温湿度传感器', '湿度', '27℃', '2024-07-09 14:15:12'],
          ['2温湿度传感器', '湿度', '27℃', '2024-07-09 14:15:12'],
          ['3温湿度传感器', '湿度', '27℃', '2024-07-09 14:15:12'],
          ['4温湿度传感器', '湿度', '27℃', '2024-07-09 14:15:12'],
          ['5温湿度传感器', '湿度', '27℃', '2024-07-09 14:15:12'],
          ['6温湿度传感器', '湿度', '27℃', '2024-07-09 14:15:12'],
          ['7温湿度传感器', '湿度', '27℃', '2024-07-09 14:15:12'],
          ['8温湿度传感器', '湿度', '27℃', '2024-07-09 14:15:12'],
          ['9温湿度传感器', '湿度', '27℃', '2024-07-09 14:15:12'],
        ],
        columnWidth: [55, 100, 58, 58],
        index: true,
        indexHeader: '序号',
        rowNum: 8,
        align: ['center', 'center', 'center', 'center', 'center'],
        headerBGC: '',
        oddRowBGC: 'none',
        evenRowBGC: 'rgba(24, 125, 156, 0.2)',
      },
      // tooltip
      tipText: {
        name: '',
        offsetX: '',
        offsetY: '',
      },
      tipShow: false, // 控制实时数据单元格显隐
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
@font-face {
  font-family: 'PangMenZhengDao';
  src: url('~@/assets/screen_images/smart-green-irrigation/fonts/PangMenZhengDaoBiaoTiTiMianFeiBan-2.ttf') format('opentype');
}

.green-content {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #072830;
  position: relative;
}
.head {
  position: absolute;
  width: 100%;
  height: 298px;
  background: url(~@/assets/screen_images/smart-green-irrigation/头部.png) no-repeat center center;
  background-size: cover;
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
  flex: 1;
  margin-right: 16px;
  margin-left: 24px;
  .left-top {
    margin-top: 116px;
    background: url(~@/assets/screen_images/smart-green-irrigation/小标题.png) no-repeat;
    width: 100%;
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
    background: url(~@/assets/screen_images/smart-green-irrigation/小标题.png) no-repeat;
    width: 100%;
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
    margin-top: 32px;
    background: url(~@/assets/screen_images/smart-green-irrigation/小标题.png) no-repeat;
    width: 100%;
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
    position: relative;
    .conT {
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
      position: absolute;
      top: 12px;
      right: 0;
      width: 94%;
    }
  }
  .left-weather {
    display: flex;
    margin-left: 32px;

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
      flex: 1 0 calc(50% - 10px); /* 每个格子的宽度，减去间隔 */
      margin: 5px; /* 格子之间的间隔 */
      background-size: 100% 100%;
      height: 55.83px;
      display: flex;
      align-items: center;
      // background-image: linear-gradient(139deg, rgba(81, 197, 233, 0) 3%, rgba(43, 125, 143, 0.21) 100%);
      background: url(~@/assets/screen_images/smart-green-irrigation/小卡片.png) no-repeat;
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
    background: url(~@/assets/screen_images/smart-green-irrigation/设备统计1080.png) center center no-repeat;
    background-size: cover;
    height: 190px;
    .left-device-con {
      display: flex;
      // justify-content: space-between;
      .left-device-con-1 {
        display: flex;
        margin-bottom: 8px;
        align-items: center;
        position: relative;
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
      width: 100%;
      // background-color: #fff;
      height: 179px;
      flex: 2;

      .luckyPie {
        width: 220px;
        // width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
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
  .left-notice {
    margin-left: 24px;
    margin-top: 26.59px;

    .left-notice-con {
      display: flex;
      align-items: center;
      background: rgba(24, 125, 156, 0.26);
      position: relative;
      width: 100%;
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
  flex: 2;
  display: flex;

  .center-content {
    margin-top: 116px;
    display: flex;
    overflow: auto;
    height: 770px;
    flex-wrap: wrap;
    background: url(~@/assets/screen_images/smart-green-irrigation/中间点阵.png) no-repeat bottom right;
    scrollbar-color: #0f7b90 #051e24;
    .center-content-item {
      background: url(~@/assets/screen_images/smart-green-irrigation/管网卡片背景1920.png) no-repeat left center;
      flex: 1 0 calc(33.33% - 24px); /* 每个格子的宽度，减去间隔 */
      margin-right: 12px;
      background-size: 100% 100%;
      height: 242px;
      margin-bottom: 12px;
    }
    .center-content-item-title {
      padding-top: 12px;
      padding-left: 13px;
      background: url(~@/assets/screen_images/smart-green-irrigation/管网卡片标题.png) no-repeat left center;
      font-family: SourceHanSansSC-Bold;
      font-size: 16px;
      color: #ffffff;
      font-weight: 700;
      width: 100%;
      height: 40px;
    }
    .center-content-item-con {
      width: 100%;
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
  // .center-content ::-webkit-scrollbar {
  //   width: 1px !important;
  //   display: none;
  //   background: red !important;
  //   border-radius: 8px !important;
  // }

  // .center-content::-webkit-scrollbar-thumb {
  //   border: 1px solid rgba(0, 0, 0, 0) !important;
  //   height: 20px !important;
  //   background: #0f7b90 !important;
  //   border-radius: 8px !important;
  // }
}
.right {
  flex: 1;
  margin-left: 16px;
  margin-right: 24px;
  .right-top {
    margin-top: 116px;
    margin-left: 7px;
    background: url(~@/assets/screen_images/smart-green-irrigation/小标题.png) no-repeat;
    width: 100%;
    height: 38px;
    background-size: 100% 100%;
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
    height: 370px;
    background: url(~@/assets/screen_images/smart-green-irrigation/实时统计表头1920.png) no-repeat;
    background-position: 0 -5px;
    z-index: 999;
    .real-time-data {
      // margin-top: 50px;
      // margin: 20px;
      height: 370px;
      position: relative;
    }
    .right-table-title {
      background: url(~@/assets/screen_images/smart-green-irrigation/实时统计表头1920.png) no-repeat;
      width: 100%;
      height: 40.38px;
      padding: 13px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15.62px;
      background-size: 100% 100%;
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
        width: 100%;
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
        width: 100%;
      }
    }
  }
  .right-water {
    margin-top: 25px;
    margin-left: 7px;
    background: url(~@/assets/screen_images/smart-green-irrigation/小标题.png) no-repeat;
    width: 100%;
    height: 38px;
    background-size: 100% 100%;
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
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1;
}
.all-img2 {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.all-img3 {
  background: url(~@/assets/screen_images/smart-green-irrigation/控制台按钮.png) no-repeat;
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

/*媒体查询*/
@media (max-width: 1700px) {
  .left .left-weather {
    margin-left: 0;
  }
}

@media (max-width: 1600px) {
  .center {
    flex: 1;
  }
  .center .center-content .center-content-item {
    flex: 1 0 calc(50% - 24px);
  }
  .center .center-content .center-content-item-con {
    padding: 10px;
  }
  .all-img2 {
    right: 8px;
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
//轮播图的样式
::v-deep .dv-scroll-board .header {
  margin-bottom: 15px;
}
</style>
