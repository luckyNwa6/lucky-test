export const echartOptions = {
  dataZoom: [
    {
      type: 'slider', //滑动条型数据缩放组件
      start: 0, //数据窗口的起始位置百分比
      end: 100, //数据窗口的结束位置百分比
      height: 6, //数据缩放组件的高度
      bottom: 20, //数据缩放组件距离底部的距离
      realtime: false, //是否实时显示，这里是 false，表示拖动结束时才触发数据变化
      backgroundColor: '#EDF0F5', //数据缩放组件的背景色
      handleSize: 12, //滑块的大小
      //滑块的图标
      handleIcon:
        'image://data:image/png;base64,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',

      dataBackground: {
        //数据区域的背景配置
        lineStyle: {
          //数据区域边界线的样式配置，这里设置为透明
          opacity: 0,
        },
        areaStyle: {
          //数据区域填充样式配置，这里设置为透明
          opacity: 0,
        },
      },
      selectedDataBackground: {
        //选中数据区域的背景配置
        lineStyle: {
          //选中数据区域边界线的样式配置，这里设置为透明
          opacity: 0,
        },
        areaStyle: {
          // 选中数据区域填充样式配置，这里设置为透明
          opacity: 0,
        },
        brushStyle: {
          //选中数据区域的刷子样式配置，这里设置边框颜色为红色
          borderColor: '#f00',
        },
      },
      // fillerColor: ' #A3A1FB', //数据区域的填充颜色 紫色
      textStyle: {
        color: 'transparent', //文本颜色，这里设置为透明
      },
    },
    // {
    //   type: 'slider', //滑动条型数据缩放组件
    //   yAxisIndex: 0,
    //   height: '75%', //数据缩放组件的高度
    //   left: '91%',
    //   width: 7,
    //   bottom: 50, //数据缩放组件距离底部的距离
    //   realtime: false, //是否实时显示，这里是 false，表示拖动结束时才触发数据变化
    //   backgroundColor: '#EDF0F5', //数据缩放组件的背景色
    //   handleSize: 12, //滑块的大小
    //   //滑块的图标
    //   handleIcon:
    //     'image://data:image/png;base64,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',
    //   dataBackground: {
    //     //数据区域的背景配置
    //     lineStyle: {
    //       //数据区域边界线的样式配置，这里设置为透明
    //       opacity: 0,
    //     },
    //     areaStyle: {
    //       //数据区域填充样式配置，这里设置为透明
    //       opacity: 0,
    //     },
    //   },
    //   selectedDataBackground: {
    //     //选中数据区域的背景配置
    //     lineStyle: {
    //       //选中数据区域边界线的样式配置，这里设置为透明
    //       opacity: 0,
    //     },
    //     areaStyle: {
    //       // 选中数据区域填充样式配置，这里设置为透明
    //       opacity: 0,
    //     },
    //     brushStyle: {
    //       //选中数据区域的刷子样式配置，这里设置边框颜色为红色
    //       borderColor: '#f00',
    //     },
    //   },
    //   // fillerColor: ' #A3A1FB', //数据区域的填充颜色 紫色
    //   textStyle: {
    //     color: 'transparent', //文本颜色，这里设置为透明
    //   },
    // }
  ],

}
