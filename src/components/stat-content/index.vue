<template>
  <div id="myContainer">
    <div class="box">
      <div class="item" style="height: 128px">
        <div class="collectTime">数据采集时间 : {{ reportTime ? formatDateLucky(reportTime) : '-' }}</div>
        <div class="swiper-contain" v-if="statList.length">
          <Swiper ref="mySwiper" v-bind="swiperOptions" :modules="modules">
            <SwiperSlide class="stat-content" v-for="(stat, index) in statList" :key="index">
              <div class="stat-title">
                <div class="title-icon">
                  <img src="@/assets/images/icon_stat.png" />
                  <span :title="stat.elementName">{{ stat.elementName }}</span>
                </div>
              </div>

              <div class="stat-value" :title="(stat.dataValue ? stat.dataValue : '-') + (stat.elementUnit ? stat.elementUnit : '')">
                {{ stat.dataValue ? stat.dataValue : '-' }}{{ stat.elementUnit ? stat.elementUnit : '' }}
              </div>
              <div class="stat-gutter" v-if="index != statList.length - 1"></div>
            </SwiperSlide>
          </Swiper>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>

        <el-empty v-else :image-size="30" style="padding: 0" :image="empty" description="暂无站点实时数据"></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import empty from '@/assets/images/empty.png'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
export default {
  data() {
    return {
      modules: [Navigation],
      showControl: false,
      swiperOptions: {
        slidesPerView: 3, // 一屏显示的slide个数  'auto'
        spaceBetween: 10,
        slidesPerGroup: 3, //每组多少个swiper滑块
        loop: false, // 循环播放, 可有无限滚动效果，初始加载即是滚动后的效果

        loopFillGroupWithBlank: true,
        pagination: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    statList: {
      type: Array,
    },
    reportTime: {
      type: String,
    },
    customSlidesPerView: {
      // 新增的属性，用于接收父组件传递的自定义 slidesPerView 值
      type: Number,
    },
  },
  watch: {
    statList(newVal, oldVal) {
      // newVal是新值，oldVal是旧值
      console.log('接收到的值', this.statList)
      this.statList = newVal
      if (newVal != null) {
        let length = this.statList.length
        if (length <= 5 && length > 0) {
          this.colSpan = 100 / length + '%'
          this.showControl = false
        }
        if (length > 5) {
          this.colSpan = '25%'
          this.showControl = true
        }
      }
    },
  },
  mounted() {
    if (this.customSlidesPerView) {
      console.log('🚀 ~ moun222222222222222222ted ~ this.customSlidesPerView:', this.customSlidesPerView)
      this.swiperOptions.slidesPerView = this.customSlidesPerView // 将 swiperOptions 中的 slidesPerView 替换为 customSlidesPerView
    }
  },
  methods: {
    numFilter(value) {
      if (value == '-') {
        let realVal = '-'
        return realVal
      } else {
        let realVal = parseFloat(value).toFixed(2)
        return realVal
      }
    },
    resize() {
      this.$refs['mySwiper'] && this.$refs['mySwiper'].$swiper.emit('resize')
    },

    formatDateLucky(timestamp) {
      const numberTime = parseInt(timestamp)
      let date = new Date(numberTime)
      let formattedDateTime =
        date.getFullYear() +
        '-' +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + date.getDate()).slice(-2) +
        ' ' +
        ('0' + date.getHours()).slice(-2) +
        ':' +
        ('0' + date.getMinutes()).slice(-2)
      return formattedDateTime
    },
  },
}
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  overflow-x: auto;
}
.item {
  white-space: nowrap;
  height: 70px;
}

.box::-webkit-scrollbar {
  height: 5px;
  background-color: #969696;
}
.box::-webkit-scrollbar-track {
  background: #e2e2e2;
  border-radius: 2px;
}
.box::-webkit-scrollbar-thumb {
  background: #969696;
  border-radius: 10px;
}
.box::-webkit-scrollbar-thumb:hover {
  background: #a5a5a5;
}
.box::-webkit-scrollbar-corner {
  background: #969696;
}
.swiper-contain {
  position: relative;
  width: 100%;
  .swiper-button-prev {
    background: url('@/assets/images/arrow_left.png') no-repeat center;
    &:after {
      display: none;
    }
  }
  .swiper-button-next {
    background: url('@/assets/images/arrow_right.png') no-repeat center;
    &:after {
      display: none;
    }
  }
}
.stat-content {
  position: relative;
  box-sizing: border-box;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  /* overflow: hidden; */
  display: inline-block;
  height: 70px;
  z-index: 2;
  width: 25%;
}
.stat-card {
  width: 100%;
  margin-bottom: 10px;
}

.stat-gutter {
  position: absolute;
  top: 0;
  left: 100%;
  width: 1px;
  height: 100%;
  background-image: linear-gradient(to bottom, transparent 0%, #bcbec4 25%, #adaeaf 75%, transparent 100%);
  z-index: 99;
}
.stat-title {
  width: 70%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #455770;
  font-size: 14px;
  white-space: nowrap;
  margin: 0 auto;
}
.title-icon {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title-icon img {
  width: 10px;
  height: 10px;
  margin-right: 6px;
}
.stat-value {
  width: 70%;
  height: 36px;
  line-height: 40px;
  text-align: center;
  font-size: 24px;
  color: #333;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto;
}
.collectTime {
  margin-bottom: 40px;
  color: #455770;
}
</style>
