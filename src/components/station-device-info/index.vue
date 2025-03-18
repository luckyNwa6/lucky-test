<template>
  <div id="myContainer" class="w-100">
    <el-card class="info-card">
      <div class="base-info-title">基本信息</div>
      <el-row>
        <el-col :span="12" class="base-content">
          <span class="base-label">站点类型：</span>
          <el-tooltip :content="stationInfo ? stationInfo.stationType : ''" placement="top">
            <span class="base-value">{{ stationInfo ? stationInfo.stationType : '' }}</span>
          </el-tooltip>
        </el-col>
        <el-col :span="12" class="base-content">
          <span class="base-label">站点编号：</span>
          <el-tooltip :content="stationInfo ? stationInfo.stationCode : ''" placement="top">
            <span class="base-value">{{ stationInfo ? stationInfo.stationCode : '' }}</span>
          </el-tooltip>
        </el-col>
        <el-col :span="12" class="base-content">
          <span class="base-label">测站名称：</span>
          <el-tooltip :content="stationInfo ? stationInfo.stationName : ''" placement="top">
            <span class="base-value">{{ stationInfo ? stationInfo.stationName : '' }}</span>
          </el-tooltip>
        </el-col>
        <el-col :span="12" class="base-content">
          <span class="base-label">所属区划：</span>
          <span class="base-value" v-if="stationInfo && stationInfo.area">
            <el-tooltip :content="getCodeToText(stationInfo.area, stationInfo.area.split(','))" placement="top">
              <span>{{ getCodeToText(stationInfo.area, stationInfo.area.split(',')) }}</span>
            </el-tooltip>
          </span>
        </el-col>
        <el-col :span="24" class="base-content">
          <span class="base-label">站点地址：</span>
          <el-tooltip :content="stationInfo ? stationInfo.stationAddress : ''" placement="top">
            <span class="base-value">{{ stationInfo ? stationInfo.stationAddress : '' }}</span>
          </el-tooltip>
        </el-col>

        <!--            <el-col :span="12" class="base-content">
                <span class="base-label">因子模板：</span>
                <el-tooltip :content="stationInfo ? stationInfo.templateName : ''" placement="top">
                    <span class="base-value">{{stationInfo ? stationInfo.templateName : ''}}</span>
                </el-tooltip>
            </el-col> -->
        <el-col :span="24" class="base-content">
          <span class="base-label">所属分区：</span>
          <el-tooltip :content="stationInfo ? stationInfo.partitionName : ''" placement="top">
            <span class="base-value">
              {{ stationInfo ? stationInfo.partitionName : '' }}{{ stationInfo ? '(' + stationInfo.level + '级分区)' : '' }}
            </span>
            <!-- <span style="color:blue;font-size: 12px;"></span> -->
          </el-tooltip>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="info-card sketch_content2">
      <div class="device-info-title">设备信息</div>

      <el-row v-if="tempShow === '' || dev.deviceCode === tempShow" class="base-info" v-for="(dev, index) in deviceList" :key="index">
        <div class="base-info__title">
          <i class="base-info__title-icon"></i>
          <el-tooltip :content="dev.deviceName" placement="top">
            <span class="base-info__title-value">{{ dev.deviceName }}</span>
          </el-tooltip>
        </div>
        <el-col :span="12" class="base-content">
          <span class="base-label">产品型号：</span>
          <el-tooltip :content="dev.productType" placement="top">
            <span class="base-value">{{ dev.productType }}</span>
          </el-tooltip>
        </el-col>
        <el-col :span="12" class="base-content">
          <span class="base-label">设备型号：</span>
          <el-tooltip :content="dev.deviceModelName" placement="top">
            <span class="base-value">{{ dev.deviceModelName }}</span>
          </el-tooltip>
        </el-col>
        <el-col :span="12" class="base-content">
          <span class="base-label">设备类型：</span>
          <el-tooltip :content="dev.deviceTypeName" placement="top">
            <span class="base-value">{{ dev.deviceTypeName }}</span>
          </el-tooltip>
        </el-col>
        <el-col :span="12" class="base-content">
          <span class="base-label">设备编号：</span>
          <el-tooltip :content="dev.deviceCode" placement="top">
            <span class="base-value">{{ dev.deviceCode }}</span>
          </el-tooltip>
        </el-col>
      </el-row>

      <el-empty v-if="!deviceList.length" :image-size="30" style="padding: 60px" :image="emptyImage" description="暂无设备信息"></el-empty>
    </el-card>
    <!-- 地图 -->
    <el-card class="map-card">
      <div style="height: 316px; overflow: hidden">
        <BMap
          :center="{
            lng: 118.058301,
            lat: 24.613554,
          }"
          :zoom="15"
          :minZoom="3"
          :enableTraffic="false"
          :enableScrollWheelZoom="true"
        >
          <BMarker
            v-for="(item, index) in markers"
            :position="item.position"
            :icon="{
              imageUrl: item.icon.url,
              imageSize: item.icon.size,
            }"
            @click="() => handleClick(item)"
            enableClicking
          />
          <BInfoWindow
            v-model:show="show"
            :position="position"
            title="这是标题"
            enableAutoPan
            enableCloseOnClick
            :offset="{
              x: 0,
              y: -10,
            }"
          >
            <div>
              {{ content }}
            </div>
          </BInfoWindow>
        </BMap>
      </div>
    </el-card>
  </div>
</template>

<script>
import { toHandlers } from 'vue'
import { getStationInfo, getDeviceInfo, getDevicePoint } from '@/api/realData/index'
import { deepClone } from '@/utils'
import { CodeToText } from 'element-china-area-data'

import emptyImage from '@/assets/images/empty.png'
export default {
  data() {
    return {
      stationId: null,
      //地图相关
      mapCenter: {
        address: '',
        lng: 118.058319,
        lat: 24.613407,
      },
      zoom: 15,
      BMap: undefined,
      map: undefined,
      //站点信息
      stationInfo: null,
      emptyImage: emptyImage,
      stationType: 0,
      productType: 1,
      show: false,
      deviceType: 1,
      wordOrderList: [], //工单列表
      deviceList: [],
      locationList: [],
      mapViewPortTimeOut: 300,
      tempTitle: '你干嘛',
      markers: [],
      markerIcon: '',
      position: {},
      content: '',
      tempShow: '',
      nodeType: '', //判断是否为综合测站0 下的水质测点
      testD: {
        id: 'station:477',
        label: '黑河汇流池',
        lat: 34.054798,
        lng: 108.21235,
        nodeType: '0',
        pid: '295',
        type: '1',
        _level: '2',
      },
    }
  },
  components: {},
  props: {
    queryWater: {
      //是否展示综合测站下的水质测点
      type: String,
      default: '',
    },
  },

  mounted() {
    this.nodeClick(this.testD, '1')
  },
  methods: {
    handleClick(item) {
      this.position = item.position
      this.show = true
      this.content = item.content
    },
    //点击站点
    nodeClick(data, node) {
      data = deepClone(data)
      if ('0' === data.type) {
        this.$message.error('请选择站点节点')
        return
      }
      this.nodeType = data.nodeType
      console.log('点击的信息', data)
      //查询站点信息
      this.stationInfo = null
      this.stationId = parseInt(data.id.substring(8, data.id.length))
      getStationInfo({ stationId: this.stationId }).then((response) => {
        this.stationInfo = response.data

        this.getLocationList()
      })
      this.getDeviceList()
    },
    //获取站点设备列表
    getDeviceList() {
      this.deviceList = []
      getDeviceInfo({ stationId: this.stationId, queryWater: this.nodeType == 0 ? this.queryWater : '' }).then((response) => {
        console.log('🚀 ~ getDeviceInfo ~ response:', response)
        let list = response.data
        let results = list.filter((element) => {
          if (element !== null) {
            return true
          }
          return false
        })
        this.deviceList = results
        console.log('🚀 ~ getDeviceInfo ~  this.deviceList:', this.deviceList)
        // this.$emit('getDeviceList', this.deviceList)
        //   this.deviceList.push(response.data[0])
        //   this.deviceList.push(response.data[0])
      })
    },
    //获取站点设备对应定位
    getLocationList() {
      this.locationList = []
      this.markers = []
      getDevicePoint({ stationId: this.stationId }).then((response) => {
        this.locationList = response.data
        console.log('设备的位置', this.locationList)
        if (this.locationList.length > 0) {
          this.addMarkersToMap()
        } else {
          //不存在设备则展示站点位置
          if (this.stationInfo.lat && this.stationInfo.lng) {
            let point = { lat: this.stationInfo.lat, lng: this.stationInfo.lng }
            this.locationList.push(point)
            this.addMarkersToMap()
          }
        }
      })
    },
    // initMapFinish() {
    //   get()
    // },
    //获取站点工单列表
    getWorkOrderList() {},
    //区域转换
    getCodeToText(codeStr, codeArray) {
      if (null === codeStr && null === codeArray) {
        return null
      } else if (null === codeArray) {
        codeArray = codeStr.split(',')
      }

      let area = ''
      switch (codeArray.length) {
        case 1:
          area += CodeToText[codeArray[0]]
          break
        case 2:
          area += CodeToText[codeArray[0]] + '/' + CodeToText[codeArray[1]]
          break
        case 3:
          area += CodeToText[codeArray[0]] + '/' + CodeToText[codeArray[1]] + '/' + CodeToText[codeArray[2]]
          break
        default:
          break
      }
      return area
    },

    addMarkersToMap() {
      let that = this
      if (that.locationList.length === 0) {
        return false
      } else {
        // that.map.clearOverlays()
        that.markers = []
        let points = []
        let data = that.locationList
        for (let i = 0; i < data.length; i++) {
          let device = data[i]
          that.mapCenter.lng = device.lng
          that.mapCenter.lat = device.lat
          let position = that.buildMarkerPosition(device)
          // 动态设置marker
          that.markers.push(position)
          // points.push(new BMap.Point(device.lng, device.lat))
        }

        console.log(data.length, 'marker:', that.markers)
        that.mapSetViewPort(points)
      }
    },
    getAssetsFile(url) {
      // console.log('🚀 ~ getAssetsFile ~ url:', url)
      // console.log('接收', url, 'SSS', window.location.href)
      let imgH = new URL(`/src/assets/images/icon${url}.png`, window.location.href).href
      // console.log('🚀 ~ getAssetsFile ~ imgH:', imgH)
      return imgH
    },
    //监听地图拖动事件,不允许拖出范围
    // syncCenterAndZoom(e) {
    //   const { lng, lat } = e.target.getCenter()
    //   this.mapCenter.lng = lng
    //   this.mapCenter.lat = lat
    //   this.zoom = e.target.getZoom()
    // },
    buildMarkerPosition(device, type) {
      let position = {}
      // type 区分是否显示重复点位
      position['position'] = { lng: device.lng, lat: device.lat }
      this.markerIcon = this.getAssetsFile(this.stationInfo.stationType)
      let icon = { url: this.markerIcon, size: { width: 39, height: 44 } }
      position['icon'] = icon
      position['content'] = this.markerIcon + 'xxxxx'
      return position
    },
    mapSetViewPort(points) {
      if (points.length > 0) {
        window.setTimeout(() => {
          this.map.setViewport(points)
          this.mapViewPortTimeOut = 100
        }, this.mapViewPortTimeOut)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-empty__description {
  margin-top: 0 !important;
}
/* 隐藏 下拉框样式：   */
.viewCity {
  width: 100px;
}
// .viewCity >>> .el-input.is-disabled .el-input__inner {
//   color: #606266;
//   background: none;
//   border: none;
//   padding-left: 0;
//   width: 100px;
// }
// .viewCity >>> .el-input.is-disabled .el-input__icon {
//   display: none;
// }

.info-card {
  height: 190px;
  margin-bottom: 10px;
}
.base-info {
  /* border-bottom: 1px solid #ddd; */
  padding: 10px 20px;
  background: #eff6ff;
  + .base-info {
    margin-top: 15px;
  }
  &__title {
    display: flex;
    align-items: center;
  }
  &__title-icon {
    margin-right: 8px;
    width: 14px;
    height: 14px;
    background: url('@/assets/images/icon_bg.png') no-repeat center;
  }
  &__title-value {
    flex: 1;
    min-width: 0;
    font-size: 14px;
    line-height: 18px;
    color: #353535;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.base-content {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  color: #606266;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.base-info-title {
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  font-weight: 700;
}
.device-info-title {
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  font-weight: 700;
}
.work-order-title {
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  font-weight: 700;
  border-bottom: 1px solid #1abc9c;
}
.conheight {
  width: 100%;
  height: 200px;
  margin: 0 auto;
}
.el-row-diy {
  margin-bottom: 10px;
}
// .el-row-diy >>> .el-range-editor.el-input__inner {
//   display: flex !important;
// }
// .el-row-diy >>> .el-radio-group {
//   vertical-align: top !important;
// }
.stat-card {
  width: 100%;
  margin-bottom: 10px;
}
.stat-content {
  width: 20%;
  float: left;
  position: relative;
}
.stat-gutter {
  position: absolute;
  top: 25%;
  left: 100%;
  width: 1px;
  height: 50%;
  background: #a8abb2;
}
.stat-title {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #455770;
  font-size: 14px;
}
.stat-value {
  width: 90%;
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

.sketch_content {
  /* // 必须有高度 overflow 为自动 */
  overflow: auto;
  height: 204px;
}

/* // 滚动条的样式,宽高分别对应横竖滚动条的尺寸 */
.sketch_content::-webkit-scrollbar {
  width: 3px;
}

/* // 滚动条里面默认的小方块,自定义样式 */
.sketch_content::-webkit-scrollbar-thumb {
  background: #8798af;
  border-radius: 2px;
}

/* // 滚动条里面的轨道 */
.sketch_content::-webkit-scrollbar-track {
  background: transparent;
}

.sketch_content2 {
  /* // 必须有高度 overflow 为自动 */
  overflow: auto;
  height: 240px;
}

/* // 滚动条的样式,宽高分别对应横竖滚动条的尺寸 */
.sketch_content2::-webkit-scrollbar {
  width: 3px;
}

/* // 滚动条里面默认的小方块,自定义样式 */
.sketch_content2::-webkit-scrollbar-thumb {
  background: #8798af;
  border-radius: 2px;
}

/* // 滚动条里面的轨道 */
.sketch_content2::-webkit-scrollbar-track {
  background: transparent;
}
.map-card {
  height: 356px;
}
:deep(.BMap_noprint) {
  cursor: auto !important;
}
</style>
