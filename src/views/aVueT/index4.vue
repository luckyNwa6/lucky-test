<template>
  <div>
    <el-card>
      <el-button @click="removeSelected">外部去除选中</el-button>
      <head-info
        ref="headInfoRef"
        :columns="headColumns"
        :time="time"
        :primaryField="'structCusName'"
        :repeatIds="headRepeatId"
        :data.sync="applyInfoObj['headInfo']"
      ></head-info>
    </el-card>

    <!-- <el-card>
      <HeadInfoOne
        ref="headInfoOneRef"
        :columns="headColumnsOne"
        :time="time"
        :repeatIds="headRepeatId"
        :data.sync="applyInfoObj['headInfoOne']"
      ></HeadInfoOne>
    </el-card> -->
  </div>
</template>

<script>
import HeadInfo from './tableComDouble.vue'
import HeadInfoOne from './tableComOne.vue'
import { copyJsonTree, requestAndRespDeal, removeEmptyChildrenLucky, LuckyEditTree, luckyGetLastString } from './tool'
import { serveInfoData, serveInfoOneData, resDataDouble, resMappingDouble } from './column'
export default {
  components: {
    HeadInfo,
    HeadInfoOne,
  },
  data() {
    return {
      applyInfoObj: {
        headInfo: JSON.parse(JSON.stringify(serveInfoData)),
        headInfoOne: JSON.parse(JSON.stringify(serveInfoOneData)),
      },
      time: '',
      headRepeatId: [],
      nowHeadChange: 'sofa报文头',
      mappingSelectData: [],
      cloneMappingDataReq: [],
      cloneMappingDataResp: [],
      debounceTimer: null,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.mappingSelectData = removeEmptyChildrenLucky(resMappingDouble)
      this.cloneMappingDataReq = JSON.parse(JSON.stringify(requestAndRespDeal(this.mappingSelectData, 'response')))
      this.cloneMappingDataResp = JSON.parse(JSON.stringify(requestAndRespDeal(this.mappingSelectData, 'request')))
      copyJsonTree(resDataDouble, this.applyInfoObj.headInfo, { $cellEdit: false })
      this.$nextTick(() => {
        this.time = new Date().getTime()
      })
    },

    changeStructName({ value, row }) {
      // 清除之前的定时器
      clearTimeout(this.debounceTimer)

      console.log('🚀 ~ changeStructName ~ value:', value)
      console.log('🚀 ~ changeStructName ~ row:', row)

      if (row.xpath.includes('/request/')) {
        this.mappingSelectData = this.cloneMappingDataReq
      } else if (row.xpath.includes('/response/')) {
        this.mappingSelectData = this.cloneMappingDataResp
      }

      if (!value) {
        LuckyEditTree(this.applyInfoObj.headInfo, row.id, { key: 'id' }, (item) => {
          console.log('赋值.....')
          item.structCusAlias = ''
          item.remarkCus = ''
          item.cusXpathId = ''
        })
      }

      let returnSelectData = {}
      let v = luckyGetLastString(value)
      console.log('🚀 ~ changeStructName ~ v:', v)

      LuckyEditTree(this.mappingSelectData, v, {}, (item) => {
        console.log('获取到值mappingSelectData------------------', item)
        returnSelectData = item
      })

      LuckyEditTree(this.applyInfoObj.headInfo, row.id, {}, (item) => {
        item.structName = returnSelectData.structName
      })

      // 设置5秒后调用removeSelected
      this.debounceTimer = setTimeout(() => {
        this.removeSelected()
      }, 5000)
    },

    removeSelected() {
      let tempData = this.applyInfoObj.headInfo
      this.applyInfoObj.headInfo = []
      copyJsonTree(tempData, this.applyInfoObj.headInfo, { $cellEdit: false })
    },
  },
  beforeDestroy() {
    // 组件销毁前清除定时器
    clearTimeout(this.debounceTimer)
  },
  computed: {
    headColumns() {
      return [
        {
          label: '消费方',
          children: [
            {
              label: '英文名称',
              prop: 'structCusName',
              cell: true,
              width: 250,
              maxlength: 50,
              align: 'left',
              filterable: true,
              checkStrictly: true,
              type: this.nowHeadChange != '自定义' ? 'cascader' : 'input',
              dicData: this.mappingSelectData,
              props: {
                label: 'structName',
                value: 'id',
              },
              showSelectNodeBtn: true,
              showAllLevels: false,
              change: this.changeStructName,
            },

            // {
            //   label: '英文名称',
            //   prop: 'structCusName',
            //   cell: true,
            //   width: 250,
            //   align: 'left',
            //   rules: [
            //     {
            //       required: true,
            //       message: '请输入中文名称',
            //       trigger: 'blur',
            //     },
            //   ],
            // },
            {
              label: '中文名称',
              prop: 'structCusAlias',
              width: '200',
              cell: true,
            },
            {
              label: '数据类型',
              prop: 'typeCus',
              width: '200',
              cell: true,
            },
            {
              label: '长度',
              prop: 'lengthCus',
              width: '200',
              cell: true,
            },
            {
              label: '备注',
              prop: 'remarkCus',
              headerslot: true,
              width: '200',
              cell: true,
            },
          ],
        },
        {
          label: '',
          className: 'pbBlue',
          width: 10,
        },
        {
          label: '提供方',
          children: [
            {
              label: '英文名称',
              prop: 'structName',
              width: '200',
            },
            {
              label: '中文名称',
              prop: 'structAlias',
              width: '200',
            },
            {
              label: '数据类型',
              prop: 'type',
              width: '200',
            },
            {
              label: '长度',
              prop: 'length',
              width: '200',
            },
            {
              label: '备注',
              prop: 'remark',
              width: '200',
            },
          ],
        },
      ]
    },
    headColumnsOne() {
      return [
        {
          label: '英文名称',
          prop: 'structName',
          width: 350,
          maxlength: 50,
          cell: true,
          align: 'left',
          rules: [
            {
              required: true,
              message: '请输入英文名称',
              trigger: 'blur',
            },
          ],
        },
        {
          label: '中文名称',
          prop: 'structAlias',
          width: '200',
          cell: true,
          rules: [
            {
              required: true,
              message: '请输入中文名称',
              trigger: 'blur',
            },
          ],
        },
        {
          label: '数据类型',
          prop: 'type',
          width: '200',
          cell: true,
        },
        {
          label: '长度',
          prop: 'length',
          width: '200',
          cell: true,
        },
        {
          label: '备注',
          prop: 'remark',
          width: '200',
          cell: true,
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .el-table .pbBlue {
  background: #1e9fff !important;
}

::v-deep .nullRow {
  background-color: #f1b4b4;
}

::v-deep .repeatRow {
  background-color: #e7b46929;
}

::v-deep .el-table .el-form-item {
  width: auto;
  max-width: 150px;
}
</style>
