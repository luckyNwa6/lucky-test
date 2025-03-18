<template>
  <div class="card-title" v-if="!isBg2">
    <img class="title-img-l" src="@/assets/screen_images/smart-machine-room/modeltitle/one/qz.png" />
    <span class="title-text">{{ title }}</span>
  </div>
  <div class="card-title2" v-else>
    <img class="title-img-2" src="@/assets/screen_images/smart-machine-room/modeltitle/two/qz.png" />
    <span class="title-text2">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    isBg2: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '标题',
    },
  },
}
</script>

<style lang="scss" scoped>
.card-title {
  position: relative;
  height: 34px;
  width: 100%;
  background: url('~@/assets/screen_images/smart-machine-room/modeltitle/one/bg.png') center center no-repeat;
  background-size: cover;
}
.card-title2 {
  position: relative;
  height: 21px;
  width: 100%;
  background: url('~@/assets/screen_images/smart-machine-room/modeltitle/two/bg.png') center center no-repeat;
  background-size: cover;
}
.title-img-l {
  width: 143px;
  height: 42px;
}
.title-img-2 {
  width: 85px;
  height: 21px;
}
.title-text {
  font-family: SourceHanSansSC-Bold;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 0;
  font-weight: 700;
  position: absolute;
  left: 26px;
  top: 4px;
}
.title-text2 {
  font-family: SourceHanSansSC-Bold;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
  font-weight: 700;
  position: absolute;
  left: 20px;
  top: -2px;
}
</style>
