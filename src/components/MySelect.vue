<template>
  <el-select
    size="small"
    v-bind="$attrs"
    v-loadmore="loadProject"
    collapse-tags
    filterable
    :clearable="clearableFlag"
    :placeholder="placeholder"
    :filter-method="handleFilter"
    v-model="val"
    @change="handleSearch"
    @visible-change="handleVisibleProject"
  >
    <el-option v-for="item in data.list" :key="item.userId" :value="item.userId + ''" :label="item.username"></el-option>
  </el-select>
</template>
<script>
import _ from 'lodash'
import { getUserInfoList } from '@/api/user/index'
export default {
  model: {
    prop: 'inputValue',
    event: 'change',
  },
  props: {
    clearableFlag: {
      type: Boolean,
      default: false,
    },
    inputValue: {
      type: [Array, String],
      default: () => {
        return []
      },
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    size: {
      type: String,
      default: 'medium',
    },
    isSelValue: {
      type: String,
    },
  },
  watch: {
    //外部回显时候，先mount生命周期赋值，再触发这里,:isSelValue.sync='XXX'，列表也许需要深拷贝JSON.parse(JSON.stringfy(xxx))
    inputValue(newValue, oldValue) {
      this.val = newValue
    },
  },
  data() {
    return {
      val: '',
      data: {
        list: [],
        total: 0,
      },
      // 请求参数
      query: {
        username: '',
        page: 1,
        limit: 20,
      },
      isFristLoad: true,
    }
  },
  created() {
    console.log('下拉组件创建,获取数据中------')
    this.handleFilter('')
    this.val = this.isSelValue
  },
  methods: {
    // 分页加载数据项
    loadProject() {
      const { limit, page } = this.query
      console.log('触发了分页加载数据')
      if (limit * page < this.data.total) {
        this.query.page++
        this.getList()
      }
      console.log('当前页码', page)
    },
    // 通过调用接口获取数据项
    getList() {
      // 下面是举例写法
      getUserInfoList(this.query)
        .then((res) => {
          console.log('当前返回的是', res)
          if (res.code === 0) {
            this.data.list = this.uniqueArray([...this.data.list, ...res.data.list])
            this.data.total = res.data.totalCount
          }
        })
        .catch((err) => {
          console.log('select-ERR异常', err)
        })
    },
    // 筛选数据项
    handleFilter: _.debounce(function (val) {
      this.query.username = val
      this.query.page = 1
      this.data.list = []
      this.data.total = 0
      this.getList()
    }, 500),
    // 隐藏显示下拉框
    handleVisibleProject(tag) {
      const { username } = this.query
      if (!tag) {
        if (username !== '') {
          this.handleFilter('')
        }
      } else if (this.isFristLoad) {
        this.isFristLoad = false
        this.getList()
      }
    },
    handleSearch(val) {
      this.$emit('change', val)
    },

    //去重
    uniqueArray(obj) {
      let seen = new Map()
      let reObj = obj
        .filter((i) => {
          if (!seen.has(i.userId) && i.userId) {
            seen.set(i.userId, true)
            return true
          }
          return false
        })
        .map((i) => {
          return { userId: i.userId, username: i.username }
        })
      return reObj
    },
  },
}
</script>
