<template>
  <!-- <div class="card" :style="cardStyle"> -->
  <div class="card-title" v-if="!isSelect">
    <img class="title-img-l" src="@/assets/screen_images/smart-natural-gas/bg/title-head.png" />
    <img class="title-img-m" src="@/assets/screen_images/smart-natural-gas/bg/title-body.png" />
    <img class="title-img-r" src="@/assets/screen_images/smart-natural-gas/bg/title-foot.png" />
    <span class="title-text">{{ title }}</span>
  </div>
  <div class="card-title" v-else>
    <img class="title-img-l" src="@/assets/screen_images/smart-natural-gas/bg/title-head.png" />
    <img class="title-img-m" src="@/assets/screen_images/smart-natural-gas/bg/title-body.png" />
    <img class="title-img-r" src="@/assets/screen_images/smart-natural-gas/bg/title-foot.png" />
    <span class="title-text">{{ title }}</span>
    <select v-model="value" placeholder="请选择" class="title-select">
      <option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    isSelect: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '标题',
    },
  },
  data() {
    return {
      options: [
        {
          value: '1#管道',
          label: '1#管道',
        },
        {
          value: '2#管道',
          label: '2#管道',
        },
        {
          value: '3#管道',
          label: '3#管道',
        },
      ],
      value: '1#管道',
    }
  },
  computed: {
    cardStyle() {
      return {
        height: `${this.cardHeight}px`,
        marginTop: `${this.marginTop}px`, // 将 marginTop 转为像素单位
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  background: rgba(14, 48, 65, 0.6);
  border: 1px solid #325963;
  border-radius: 20px;
  width: 100%;
  color: #fff;
}
.card-title {
  display: flex;
  /* margin-top: -10px; */
  position: relative;
}
.title-img-l {
  height: 46px;
  width: 60px;
  /* margin-left: -6px; */
}
.title-img-m {
  flex: 1; /* 自动填充剩余空间 */
  min-width: 0;
  height: 46px; /* 自动调整高度 */
}
.title-img-r {
  height: 46px;
  width: 60px;
}
.title-text {
  font-family: SourceHanSansSC-Bold;
  font-size: 20px;
  color: #ffffff;
  letter-spacing: 2px;
  font-weight: 700;
  position: absolute;
  left: 58px;
  top: 10px;
}
.title-select {
  position: absolute;
  width: 28.8%;
  height: 32px;
  border-radius: 16px;
  font-family: SourceHanSansSC-Regular;
  font-size: 14px;
  color: #14f1ff;
  font-weight: 400;
  top: 7px;
  right: 1%;
  padding: 0 10px;
  background-image: linear-gradient(to bottom, #0d82be, #045381);

  // border-color: rgba(66, 188, 255, 1);

  border: 1px solid transparent; /* 设置一个透明的初始边框 */
  border-image: linear-gradient(to bottom, rgba(66, 188, 255, 0), rgba(66, 188, 255, 1)) 1;
  border-image-slice: 1; /* 设置边框切片，使渐变覆盖整个边框 */

  background-image: linear-gradient(to bottom, #0d82be, #045381);
}
</style>
