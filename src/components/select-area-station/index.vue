<template>
  <div id="myContainer" class="content" style="height: 764px">
    <el-form>
      <el-form-item>
        <el-input placeholder="请输入测站名称" clearable v-model="filterText"></el-input>
      </el-form-item>
      <div class="tree1">
        <el-scrollbar>
          <el-tree
            class="show-tree"
            :show-checkbox="flag.check"
            :data="treeList"
            :props="menuListTreeProps"
            :default-expanded-keys="[firstAreaId]"
            @check="handleEdit"
            @current-change="currentClick"
            node-key="id"
            ref="groupListTree"
            :expand-on-click-node="false"
            highlight-current
            :filter-node-method="filterNode"
          >
            <!-- :check-strictly="!flag.cascade" -->
            <!-- <template slot-scope="{ node, data }"  :title="node.label"> -->

            <!-- :default-expand-all="true" -->
            <!-- <div class="show-ellipsis" :title="node.label">
                  {{ node.label}}
                </div> -->
            <template v-slot="{ node, data }">
              <span class="custom-tree-node">
                <el-tooltip :content="data.label" placement="top" effect="light">
                  <div>{{ truncatedLabel(data.label) }}</div>
                </el-tooltip>
              </span>
            </template>
            <!-- </template> -->
          </el-tree>
        </el-scrollbar>
      </div>
    </el-form>
  </div>
</template>

<script>
import { treeDataTranslate } from '@/utils'
import { getStationList } from '@/api/realData/index'

import { deepClone } from '@/utils'
export default {
  data() {
    return {
      type: deepClone(this.stationType),
      filterText: '',
      stationList: [],
      treeList: [],
      menuListTreeProps: {
        label: 'label',
        children: 'children',
      },
      flag: {
        check: true,
        cascade: false,
      },
      firstAreaId: '',
    }
  },
  filters: {
    ellipsis(value, k) {
      if (!value) return
      // if (value.length > k) {
      //   return value.slice(0, k) + '...'
      // }
      return value
    },
  },
  watch: {
    filterText(val) {
      this.$refs.groupListTree.filter(val)
    },
  },
  props: {
    check: {
      type: Boolean, ///true 多选 false 点击
    },
    showType: {
      type: Boolean, //展示站点类型下拉框
      default: false,
    },
    stationType: {
      type: String,
      default: '3', //默认展示测压站
    },
    setFirstNode: {
      type: Boolean, //是否自动勾选第一个站点
      default: false,
    },
    queryWater: {
      //是否展示综合测站下的水质测点
      type: String,
      default: '',
    },
  },
  mounted() {
    this.flag.check = this.check
    this.getStationList()
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1 && data.type == '1'
    },
    truncatedLabel(label) {
      const maxLength = 10 // 最大长度
      return label.length > maxLength ? label.slice(0, maxLength) + '...' : label
    },
    //获取站点列表
    getStationList(val) {
      this.treeList = []
      this.stationList = []
      this.$emit('clearList', true)
      getStationList({ stationType: this.type, queryWater: this.queryWater }).then((response) => {
        console.log('🚀 ~ getStationList ~ response:', response)
        this.stationList = response.data
        this.stationList.forEach((s) => {
          s.id = s.id + ''
          if (s.type === '1') {
            s.id = 'station:' + s.id
          }
        })
        this.treeList = treeDataTranslate(this.stationList, 'id', 'pid')
        this.firstAreaId = this.treeList[0].id
        setTimeout(() => {
          if (this.setFirstNode) {
            this.checkFirstStation()
          }
        }, 500)
      })
    },
    //默认选中树形从上往下第一个站点
    checkFirstStation() {
      //树形未转化完则等待
      if (this.treeList.length == 0) {
        setTimeout(() => {
          this.checkFirstStation()
        }, 500)
      } else {
        // console.log("tree:",this.treeList)
        let firstNode = this.getFirstStation(this.treeList)
        // console.log("firstNode",firstNode)
        if (firstNode != undefined) {
          //复选
          if (this.flag.check) {
            let arr = []
            arr.push(firstNode)
            this.$refs.groupListTree.setCheckedNodes(arr)
            this.$emit('selectFunc', this.$refs.groupListTree.getCheckedNodes())
          } else {
            //单选
            this.$refs.groupListTree.setCurrentNode(firstNode)
            this.$emit('nodeClick', this.$refs.groupListTree.getCurrentNode())
          }
        } else {
          this.$message.error('请先添加站点！')
        }
      }
    },
    getFirstStation(treeList) {
      for (let i = 0; i < treeList.length; i++) {
        let t = treeList[i]
        if (t.type == '1') {
          return t
        }
        if (t.type == '0' && typeof t.children != 'undefined' && t.children != null && t.children.length > 0) {
          let tmp = this.getFirstStation(t.children)
          if (tmp === undefined) {
            continue
          } else return tmp
        }
      }
    },

    //设置树选中
    setNodeCheck(id) {
      if (this.treeList.length == 0) {
        setTimeout(() => {
          this.setNodeCheck(id)
        }, 500)
      } else {
        //单选
        this.$refs.groupListTree.setCurrentKey('station:' + id)
        this.$emit('nodeClick', this.$refs.groupListTree.getCurrentNode())
      }
    },
    // 多选点击
    handleEdit(index, row) {
      console.log(index, row)
      if (this.flag.check) {
        this.$emit('selectFunc', this.$refs.groupListTree.getCheckedNodes(), row)
      }
    },
    //单选点击
    currentClick(index, row) {
      if (!this.flag.check) {
        this.$emit('nodeClick', this.$refs.groupListTree.getCurrentNode(), row)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.tree1 {
  width: 90%;
  height: 710px;
  :deep(.el-scrollbar) {
    width: 100%;
    height: 100%;
  }
  :deep(.el-tree) {
    min-width: 100%;
    min-height: 100%;
    display: inline-block;
  }
}
</style>
<style scoped>
/* .show-tree >>> .el-tree-node__content .is-checked {
    background-color: #baf !important;
  } */
.content {
  height: 740px;
  width: 100%;
}
.show-ellipsis {
  display: inline-block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
/* .show-tree >>>  .el-tree-node__content{
    width: 80%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display:block;
    line-height: 1.625rem;
  } */
.tree1::-webkit-scrollbar {
  width: 4px;
  background-color: #969696;
}
.tree1::-webkit-scrollbar-track {
  background: #e2e2e2;
  border-radius: 2px;
}
.tree1::-webkit-scrollbar-thumb {
  background: #969696;
  border-radius: 10px;
}
.tree1::-webkit-scrollbar-thumb:hover {
  background: #a5a5a5;
}
.tree1::-webkit-scrollbar-corner {
  background: #969696;
}
</style>
