<template>
  <div class="container">
    <div class="scroll-content" ref="scrollContainer">
      <div class="placeholder-box"></div>

      <el-button type="primary" ref="actionButton" @click="handleButtonClick" class="fixed-button">
        {{ buttonText }}
      </el-button>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  data() {
    return {
      clickCount: 0,
      lastScrollTop: 0,
    }
  },

  computed: {
    buttonText() {
      return `触发点击 (${this.clickCount} 次)`
    },
  },

  mounted() {
    this.initScrollListener()
  },

  beforeDestroy() {
    this.removeScrollListener()
  },

  methods: {
    // 初始化滚动监听
    initScrollListener() {
      this.debouncedScrollHandler = debounce(this.handleScroll, 300)
      this.$refs.scrollContainer.addEventListener('scroll', this.debouncedScrollHandler)
    },

    // 移除滚动监听
    removeScrollListener() {
      if (this.$refs.scrollContainer) {
        this.$refs.scrollContainer.removeEventListener('scroll', this.debouncedScrollHandler)
      }
    },

    // 滚动处理
    handleScroll(e) {
      const currentScroll = e.target.scrollTop
      const isScrollingDown = currentScroll > this.lastScrollTop

      // 滚动超过 200px 且向下滚动时触发
      if (currentScroll > 200 && isScrollingDown) {
        this.simulateButtonClick()
      }

      this.lastScrollTop = currentScroll
    },

    // 模拟真实鼠标点击
    simulateButtonClick() {
      const buttonEl = this.$refs.actionButton.$el

      // 创建鼠标事件
      const mouseDownEvent = new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true,
      })

      const mouseUpEvent = new MouseEvent('mouseup', {
        view: window,
        bubbles: true,
        cancelable: true,
      })

      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      })

      // 触发事件序列
      buttonEl.dispatchEvent(mouseDownEvent)
      buttonEl.dispatchEvent(mouseUpEvent)
      buttonEl.dispatchEvent(clickEvent)

      this.clickCount++
    },

    // 按钮点击处理（保持原样）
    handleButtonClick() {
      this.$notify({
        title: '操作触发',
        message: `滚动触发的第 ${this.clickCount} 次点击`,
        type: 'success',
      })
    },
  },
}
</script>
<style scoped>
.container {
  height: 100vh;
  overflow: hidden;
}

.scroll-content {
  height: 100%;
  overflow-y: auto;
}

.placeholder-box {
  height: 2000px;
  background: linear-gradient(to bottom, #f0f2f5, #c9d6ff);
}

.fixed-button {
  position: fixed;
  right: 40px;
  bottom: 40px;
  transition: transform 0.3s ease;
}

.fixed-button:hover {
  transform: scale(1.1);
}
</style>
