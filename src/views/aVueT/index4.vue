<template>
  <div>
    <el-card>
      <head-info
        ref="headInfoRef"
        :columns="headColumns"
        :time="time"
        :primaryField="'structCusName'"
        :repeatIds="headRepeatId"
        :data.sync="applyInfoObj['headInfo']"
      ></head-info>
    </el-card>
  </div>
</template>

<script>
import HeadInfo from './tableCom.vue'
import { copyJsonTree } from './tool'
import { serveInfoData } from './column'
export default {
  components: {
    HeadInfo,
  },
  data() {
    return {
      applyInfoObj: {
        headInfo: JSON.parse(JSON.stringify(serveInfoData)),
      },
      time: '',
      headRepeatId: [],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let data = [
        {
          structCusName: 'root',
          structName: 'root',
          structAlias: '根节点',
          id: '1',
          parentId: '',
          type: '',
          typeCus: '',
          children: [
            {
              structCusName: 'request',
              structName: 'request',
              structAlias: '请求',
              id: '2',
              parentId: '1',
              type: '',
              typeCus: '',
              children: [],
            },
            {
              structCusName: 'response',
              structName: 'response',
              structAlias: '响应',
              id: '3',
              parentId: '1',
              type: '',
              typeCus: '',
              children: [],
            },
          ],
        },
      ]

      copyJsonTree(data, this.applyInfoObj.headInfo, { $cellEdit: false })
      this.$nextTick(() => {
        this.time = new Date().getTime()
      })
    },
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
              width: '200',
            },
            {
              label: '中文名称',
              prop: 'structCusAlias',
              width: '200',
            },
            {
              label: '数据类型',
              prop: 'typeCus',
              width: '200',
            },
            {
              label: '长度',
              prop: 'lengthCus',
              width: '200',
            },
            {
              label: '备注',
              prop: 'remarkCus',
              width: '200',
            },
          ],
        },

        {
          label: '',
          className: 'pbBlue',
          width: 3,
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
  },
}
</script>

<style>
:deep(.el-table .pbBlue) {
  background: #1e9fff;
}
</style>
