export const loadmore = {
  bind(el, binding) {
    const dom = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    dom.addEventListener('scroll', function () {
      const condition = this.scrollHeight - this.scrollTop - 0.5 <= this.clientHeight
      if (condition) {
        binding.value()
        console.log('需要20条才到底啊，通过调整上面差值来控制多少去请求')
      } else {
        console.log('滚动到底了')
      }
    })
  },
}
