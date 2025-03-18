<template>
  <div>
    <baidu-map :center="center" class="map" :zoom="zoom" @ready="handler" scroll-wheel-zoom>
      <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
      <bml-marker-clusterer :averageCenter="true">
        <bm-marker v-for="marker of markers" :position="{ lng: marker.lng, lat: marker.lat }" @click="infoWindowOpen(marker)"></bm-marker>
        <bm-info-window
          :position="{ lng: markerObj.lng, lat: markerObj.lat }"
          :show="markerObj.showPop"
          title="Info Window Title"
          @close="infoWindowClose"
          @open="infoWindowOpen"
        >
          <p>111111111111</p>
        </bm-info-window>
      </bml-marker-clusterer>
    </baidu-map>
  </div>
</template>

<script setup>
import { BmlMarkerClusterer } from 'vue-baidu-map-3x'
const center = ref({ lng: 0, lat: 0 })
const markerObj = ref({
  lng: '',
  lat: '',
  showPop: false,
  stationName: '',
  stationId: null,
  stationData: {
    type: '',
    data: [],
  },
})

const zoom = ref(13)
const show = ref(false)
const infoWindowClose = () => {
  markerObj.value.showPop = tfalserue
}
const infoWindowOpen = (marker) => {
  console.log('xxxxxxxxxxxxxxzz', marker)
  Object.assign(markerObj.value, marker)
  markerObj.value.showPop = true
}
const handler = ({ BMap, map }) => {
  console.log(BMap, map)
  center.value.lng = 118.048689
  center.value.lat = 24.61794
  zoom.value = 15
}
const markers = ref()
onMounted(() => {
  setTimeout(() => {
    markers.value = [
      { lng: 118.05911, lat: 24.618138 },
      { lng: 118.080884, lat: 24.620109 },
      { lng: 118.048689, lat: 24.61794 },
    ]

    console.log('10s后拿到markers值了')
  }, 10000)
})
</script>
<style scoped>
.map {
  width: 100%;
  height: 90vh;
}

:deep(.BMap_noprint .ui_city_change .citylist_popup_main) {
  display: block;
}
</style>
