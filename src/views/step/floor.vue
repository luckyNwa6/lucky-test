<template>
  <div>
    <el-steps :active="currentFloor" finish-status="finish" class="steps">
      <el-step
        :title="title"
        v-for="({ title, description }, index) in steps"
        :description="description"
        :key="index"
        @click.native="jumpToCatalog(index)"
      ></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      resizeObj: null,
      box: null,
      floors: [],
      canRun: true,
      scrollContainer: null, // 内容区滚动容器元素
      currentFloor: 0, // 当前目录索引
      catalogBox: null, // 目录容器
    }
  },
  watch: {
    steps: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.init() // 重新获取 DOM 元素
          this.floors = document.querySelectorAll(`.${this.config.stepsClass}`) // 刷新元素集合

          console.log('🚀 ~ this.$nextTick ~ this.floors:', this.floors)
        })
      },
    },
  },
  computed: {
    config() {
      return {
        containerId: 'con',
        scrollClass: 'scrollContainer',
        stepsClass: 'approval-floor',
        mistake: 300, // 滚动误差
        detail: true,
        ...this.params,
      }
    },
  },
  async mounted() {
    await this.sleep(500)
    this.init()
    window.addEventListener('resize', this.init)
    this.createResizeObj()
  },

  async activated() {
    await this.sleep(500)
    this.init()
    window.addEventListener('resize', this.init)
  },

  deactivated() {
    window.removeEventListener('resize', this.init)
    this.box.removeEventListener('scroll', () => {})
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.init)
    this.box.removeEventListener('scroll', () => {})
  },

  methods: {
    createResizeObj() {
      this.resizeObj = new ResizeObserver((entries) => {
        for (let entry of entries) {
          // console.log('el:', entry.target)
          // console.log('elWidth:', `${entry.contentRect.width}`)
          // console.log('elHeight:', `${entry.contentRect.height}`)
        }
      })
      // console.log('this.resizeObj:', this.resizeObj)
      // this.resizeObj.observe(this.box)
    },
    sleep(time) {
      return new Promise((res) => {
        setTimeout(res, time)
      })
    },

    init() {
      if (this.config.detail) {
        this.currentFloor = this.steps.length
        return
      }
      this.box = document.getElementById(this.config.containerId) || {}
      if (!Object.keys(this.box).length) return
      this.box.style.overflow = 'auto'
      this.floors = document.querySelectorAll(`.${this.config.stepsClass}`) || []
      // this.scrollContainer = document.querySelectorAll(`.${this.config.scrollClass}`)
      this.box.addEventListener('scroll', () => {
        if (this.canRun) {
          this.canRun = false
          this.scrollElement()
          setTimeout(() => {
            this.canRun = true
          }, 100)
        }
      })
    },

    scrollElement() {
      if (this.config.detail) return
      const distance = this.box.scrollTop + this.config.mistake
      this.floors.forEach((el, index) => {
        if (distance >= el.offsetTop) {
          this.currentFloor = index
        }
      })
    },
    jumpToCatalog(index = 0) {
      this.box.scrollTo({
        top: this.floors[index].offsetTop,
        behavior: 'smooth',
      })
    },
  },
}
</script>
<style scoped>
::v-deep.el-step__title.is-finish,
::v-deep.el-step__head.is-finish {
  color: rgb(49, 78, 124);
  border-color: rgb(49, 78, 124);
}
</style>
