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

    <el-card>
      <HeadInfoOne
        ref="headInfoOneRef"
        :columns="headColumnsOne"
        :time="time"
        :repeatIds="headRepeatId"
        :data.sync="applyInfoObj['headInfoOne']"
      ></HeadInfoOne>
    </el-card>
  </div>
</template>

<script>
import HeadInfo from './tableComDouble.vue'
import HeadInfoOne from './tableComOne.vue'
import { copyJsonTree } from './tool'
import { serveInfoData, serveInfoOneData } from './column'
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
      let data2 = [
        {
          structName: 'root',
          structAlias: '根节点',
          id: '1',
          parentId: '',
          type: '',
          children: [
            {
              structName: 'request',
              structAlias: '请求',
              id: '2',
              parentId: '1',
              type: '',
              children: [
                {
                  structName: 'userId',
                  structAlias: '用户id',
                  id: '4',
                  parentId: '2',
                  type: 'String',
                  children: [],
                },
                {
                  structName: 'userName',
                  structAlias: '用户名称',
                  id: '5',
                  parentId: '2',
                  type: 'String',
                  children: [],
                },
                {
                  structName: 'userAge',
                  structAlias: '用户年龄',
                  id: '6',
                  parentId: '2',
                  type: 'Integer',
                },
              ],
            },
            {
              structName: 'response',
              structAlias: '响应',
              id: '3',
              parentId: '1',
              type: '',
              children: [],
            },
          ],
        },
      ]
      this.mappingSelectData = data2
      copyJsonTree(data, this.applyInfoObj.headInfo, { $cellEdit: false })
      this.$nextTick(() => {
        this.time = new Date().getTime()
      })
    },

    changeStructName({ value, row }) {},
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
              prop: {
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
