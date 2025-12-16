<template>
  <div>
    <ServeInfo ref="serveInfo" :params="params" :data.sync="infoObj['serveInfo']" :columns="getColumn('serveInfo')" />
  </div>
</template>

<script>
import ServeInfo from '@/components/ServeInfo.vue'
import { serveInfoData } from '@/components/columnConfig.js'
export default {
  components: { ServeInfo },
  data() {
    return {
      params: {
        detail: false,
      },
      infoObj: {
        serveInfo: JSON.parse(JSON.stringify(serveInfoData)),
      },
      resData: {
        name: 'lucky小维',
        remark: '这是备注字段，用来说明表单整体信息，比如接口说明或配置说明。',
        envInfo: [
          {
            env: '生产环境',
            tcpInfo: '10.0.1.12:8080',
          },
          {
            env: '测试环境',
            tcpInfo: '192.168.3.45:7001',
          },
          {
            env: '开发环境',
            tcpInfo: '127.0.0.1:3000',
          },
        ],
      },
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.infoObj.serveInfo = this.resData
    },
  },
  computed: {
    getColumn() {
      return (name = '') => {
        if (['serveInfo'].includes(name)) {
          return this.serveColumns
        }
      }
    },
    serveColumns() {
      return [
        {
          label: '姓名',
          prop: 'name',
          labelslot: true, //name文字的插槽
          formslot: true, //表单name输入框的插槽
          rules: [
            {
              required: true,
              message: '请输入姓名',
              trigger: 'blur',
            },
          ],
        },

        {
          label: '环境信息',
          prop: 'envInfo',
          type: 'dynamic',
          span: 24,
          hide: true,
          value: [{}],
          overHidden: true,
          children: {
            align: 'center',
            headerAlign: 'center',
            height: '200px', // ✅ Avue 传给 el-table 的高度属性
            style: {
              // ✅ 确保父容器也有滚动条
              'overflow-y': 'auto',
              'max-height': '220px',
            },
            rowAdd: (done) => {
              done({
                lucky: 101,
              })
            },
            rowDel: (row, done) => {
              this.$message.success('删除回调' + JSON.stringify(row))
              done()
            },
            column: [
              {
                label: '环境',
                prop: 'env',
                formslot: true,
                rules: [
                  {
                    required: true,
                    message: '请输入 环境',
                    trigger: 'blur',
                  },
                ],
              },
              {
                label: 'tcp地址',
                prop: 'tcpInfo',
                formslot: true,
              },
            ],
          },
        },

        {
          label: '备注',
          prop: 'remark',
          type: 'textarea',
          span: 24,
        },
      ]
    },
  },
}
</script>

<style></style>
