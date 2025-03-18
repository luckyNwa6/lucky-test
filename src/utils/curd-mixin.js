export const CURDMIXIN = {
  data() {
    return {}
  },
  props: {},
  watch: {},
  computed: {
    page: {
      get: function() {
        return {
          total: this.total, // 总数
          currentPage: this.screen.pageNum || 1, // 页数
          pageSize: this.screen.pageSize || 10// 单页展示数
        }
      },
      set: function(val) {
        this.$set(val, 'total', this.total)
      }
    }
  },
  methods: {
    // 分页
    currentChange(val) {
      this.screen.pageNum = val
      this.getTableList('', true)
    },
    // 条数
    sizeChange(val) {
      this.screen.pageNum = 1
      this.screen.pageSize = val
      this.getTableList('', true)
    },
    // 搜索
    async searchChange(params, done) {
      this.$set(this.screen, 'pageNum', 1)
      if (params) this.$set(params, 'pageNum', 1)
      const screen = Object.assign({}, this.screen)
      await this.getTableList(Object.assign(screen, params))
      if (done) done()
    },
    // 重置搜索
    searchReset(params) {
      this.screen.pageNum = 1
      this.screen.pageSize = 10
      const screen = Object.assign({}, this.screen)
      this.getTableList(Object.assign(screen, params || {}))
    }
  }
}

