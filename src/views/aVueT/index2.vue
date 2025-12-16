<!--acrud表格中使用表单-->
<template>
  <div>
    {{ search2 }}
    <avue-crud :option="option" :search.sync="search2"></avue-crud>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search2: {
        name: 'small587',
      },
      data: [
        {
          name: '张三',
        },
      ],
      option: {
        column: [
          {
            label: '姓名',
            prop: 'name',
            search: true,
          },
          {
            label: '昵称大全',
            prop: 'nickname',
            search: true,
            type: 'select',
            searchFilterable: true, //搜索过滤
            filterable: true,
            dicData: [
              {
                label: '时代',
                value: 'small',
              },
              {
                label: '明朝',
                value: 'small',
              },
              {
                label: '浙江',
                value: 'small',
              },
              {
                label: '大汉',
                value: 'small',
              },
            ],
          },
        ],
      },
    }
  },
}
</script>
