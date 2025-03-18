// 智慧绿化灌溉平台配置开始......
//配置1
export const greenOpt = (xData, yData, echarts) => {
  return {
    grid: {
      left: '1%',
      right: '1%',
      bottom: '5%',
      containLabel: true,
    },
    xAxis: {
      data: xData,
      boundaryGap: true,
      axisLine: {
        lineStyle: {
          color: '#ccedf4',
        },
      },
      axisLabel: {
        fontFamily: 'SourceHanSansSC-Regular',
        fontSize: 12,
        color: '#92ACB4',
        lineHeight: 12,
        fontWeight: 400,
      },
      axisTick: {
        show: false,
        alignWithLabel: true,
      },
    },
    yAxis: {
      name: 'm³',
      nameGap: 25,
      nameTextStyle: {
        align: 'right', // 设置文本右对齐
        padding: [0, 8, 0, 0], // 设置文本右对齐
        fontFamily: 'SourceHanSansSC-Regular',
        fontSize: 12,
        color: '#92ACB4',
        lineHeight: 12,
        fontWeight: 400,
      },
      type: 'value',
      axisTick: { show: false },
      axisLine: {
        show: false, lineStyle: {
          fontFamily: 'SourceHanSansSC-Regular',
          fontSize: 12,
          color: '#92ACB4',
          lineHeight: 12,
          fontWeight: 400,
        }
      },
      splitLine: { show: true, lineStyle: { color: '#355961', type: 'dashed' } },

    },
    series: [
      {
        name: 'm³',
        type: 'line',
        symbol: 'none',
        smooth: true,
        yAxisIndex: 0,
        color: '#74E6FF',
        areaStyle: {
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(116,230,255,0.35)',
                },
                // {
                //   offset: 0.6,
                //   color: '#d6f4fa',
                // },
                {
                  offset: 1,
                  color: 'rgba(116,230,255,0.00)',
                },
              ],
              false
            ),
          },
        },
        data: yData,
        showSymbol: true,
        symbolSize: 6,
        lineStyle: { width: 3 },
      },
    ],
  };
};
//配置2
export const greenPieOpt = (percentage, echarts) => {
  let data = {
    value: [percentage],
  };
  return {
    title: {
      // text: data.value[0] + '%',//标题不能分开设置样式，采用自定义
      // textStyle: {
      //   color: '#FFCB67',
      //   fontSize: 35
      // },
      subtext: '设备在线率',
      subtextStyle: {
        color: 'rgba(223, 255, 255, 0.8)',
        fontSize: 14
      },
      itemGap: 30,
      left: 'center',
      top: 'center'//控制文本
    },

    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'middle',
        left: '38%', // 调整文本位置，使其不重叠
        style: {
          text: percentage,
          fill: '#ffcb67',
          fontSize: 35,
          fontWeight: 700,
          fontFamily: "DIN-Bold",
        }
      },
      {
        type: 'text',
        left: 'center',
        top: '48%',
        left: "center",
        left: '58%', // 调整文本位置，使其不重叠
        style: {
          text: '%',
          fill: '#ffcb67',
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "DIN-Bold",
        }
      }
    ],
    angleAxis: {
      max: 100,
      clockwise: true, // 逆时针
      show: false,      // 隐藏刻度线
      startAngle: 110
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    polar: [
      {
        center: ['50%', '53%'], //中心点位置
        radius: '145%' //图形大小
      }
    ],
    series: [
      {
        type: 'bar',
        z: 10,
        data: data.value,
        showBackground: false,
        backgroundStyle: {
          color: 'blue',
          borderWidth: 10,
          width: 100
        },
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 5, //大的占比环
        itemStyle: {
          normal: {
            // opacity: 1,
            color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(255, 255, 255, 0)'
              },
              {
                offset: percentage / 100,
                color: 'rgba(255, 255, 255, 1)'
              }
            ]),
            // shadowBlur: 5,
            // shadowColor: '#FFCC1F'
          }
        }
      },
      {
        type: 'pie',
        name: '内层细圆环',
        radius: ['72%', '76%'],
        center: ['50%', '53%'], // 将内层细圆环往上移动10px
        startAngle: 90,
        hoverAnimation: false,
        clockWise: true,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [//右上到左下渐变
              {
                offset: 0,
                color: 'rgba(14, 195, 220, 0.08)'
              },
              {
                offset: 0.25,
                color: 'rgba(14, 195, 220, 0.08)'
              },
              {
                offset: 0.5,
                color: 'rgba(14, 195, 220, 0.5)'
              },
              {
                offset: 0.75,
                color: 'rgba(14, 195, 220, 0.5)'
              },
              {
                offset: 1,
                color: 'rgba(14, 195, 220, 0.08)'
              }
            ])
          }
        },
        tooltip: {
          show: false
        },
        label: {
          show: false
        },
        data: [100]
      }
    ]
  }
};

// 绿色大屏配置结束......

//智慧天然气管道配置开始......
//配置1
export const gasLineOpt = (xData, dataYa, dataTa, dataGa, dataSl, dataLl, echarts) => {
  return {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '-1%',
      containLabel: true,
    },
    legend: {
      orient: 'horizontal',
      type: 'scroll',
      data: [
        { name: '油压（Mpa）', icon: 'circle', itemStyle: { color: '#61FF96' } },
        { name: '套压（Mpa）', icon: 'circle', itemStyle: { color: '#F9FF61' } },
        { name: '管压（Mpa）', icon: 'circle', itemStyle: { color: '#FFA773' } },
        { name: '瞬时流量（m³/h）', icon: 'circle', itemStyle: { color: '#14F1FF' } },
        { name: '累计流量（m³/h）', icon: 'circle', itemStyle: { color: '#1B7EF2' } }
      ],
      itemWidth: 10,
      itemHeight: 10,
      top: '3.8%',
      textStyle: {
        color: '#FCFCFD',
        fontWeight: 400,
        fontSize: 12,
        fontFamily: 'SourceHanSansSC-Regular'
      },
      selectedMode: false,

    },
    xAxis: {
      data: xData,
      boundaryGap: true,//从0开始false
      axisLine: {
        lineStyle: {
          color: '#B7D9FD',
        },
      },
      axisLabel: {
        fontFamily: 'SourceHanSansSC-Regular',
        fontSize: 12,
        color: '#B7D9FD',
        lineHeight: 12,
        fontWeight: 400,
      },
      axisTick: {
        show: false,
        alignWithLabel: true,
      },
    },
    yAxis: [{
      name: 'Mpa',
      nameGap: 25,
      nameTextStyle: {
        align: 'right', // 设置文本右对齐
        padding: [0, 8, 0, 0], // 设置文本右对齐
        fontFamily: 'SourceHanSansSC-Regular',
        fontSize: 12,
        color: '#B7D9FD',
        lineHeight: 12,
        fontWeight: 400,
      },
      type: 'value',
      axisTick: { show: false },
      axisLine: {
        show: false, lineStyle: {
          fontFamily: 'SourceHanSansSC-Regular',
          fontSize: 12,
          color: '#92ACB4',
          lineHeight: 12,
          fontWeight: 400,
        }
      },
      splitLine: { show: true, lineStyle: { color: '#355961', type: 'dashed' } },

    }, {
      name: 'm³/h',
      nameGap: 25, // 设置纵轴名称距离轴线的距离为 25 像素
      nameTextStyle: {
        align: 'left', // 设置文本右对齐
        padding: [0, 0, 0, 8], // 设置文本右对齐
        fontFamily: 'SourceHanSansSC-Regular',
        fontSize: 12,
        color: '#B7D9FD',
        lineHeight: 12,
        fontWeight: 400,
      },
      axisTick: { show: false },
      type: 'value',
      position: 'right',
      axisLine: {
        show: false, lineStyle: {
          fontFamily: 'SourceHanSansSC-Regular',
          fontSize: 12,
          color: '#92ACB4',
          lineHeight: 12,
          fontWeight: 400,
        }
      },
      splitLine: { show: false, lineStyle: { color: '#355961', type: 'dashed' } },
    }],
    series: [
      {
        name: '油压（Mpa）',
        type: 'line',
        symbol: 'emptyCircle',
        symbolSize: 8, // 设置空心圆的大小
        smooth: false,
        yAxisIndex: 0,
        lineStyle: {
          color: '#61FF96',
          width: 3 // 设置线的宽度
        },
        itemStyle: {
          color: '#61FF96',
          borderColor: '#61FF96',
          borderWidth: 2 // 设置空心圆的边框宽度
        },
        data: dataYa
      },
      {
        name: '套压（Mpa）',
        type: 'line',
        symbol: 'emptyCircle',
        symbolSize: 8, // 设置空心圆的大小
        smooth: false,
        yAxisIndex: 0,
        lineStyle: {
          color: '#F9FF61',
          width: 3 // 设置线的宽度
        },
        itemStyle: {
          color: '#F9FF61',
          borderColor: '#F9FF61',
          borderWidth: 2 // 设置空心圆的边框宽度
        },
        data: dataTa
      },
      {
        name: '管压（Mpa）',
        type: 'line',
        symbol: 'emptyCircle',
        symbolSize: 8, // 设置空心圆的大小
        smooth: false,
        yAxisIndex: 0,
        lineStyle: {
          color: '#FFA773',
          width: 3 // 设置线的宽度
        },
        itemStyle: {
          color: '#FFA773',
          borderColor: '#FFA773',
          borderWidth: 2 // 设置空心圆的边框宽度
        },
        data: dataGa
      },
      {
        name: '瞬时流量（m³/h）',
        type: 'line',
        symbol: 'emptyCircle',
        symbolSize: 8, // 设置空心圆的大小
        smooth: false,
        yAxisIndex: 1,
        lineStyle: {
          color: '#14F1FF',
          width: 3 // 设置线的宽度
        },
        itemStyle: {
          color: '#14F1FF',
          borderColor: '#14F1FF',
          borderWidth: 2 // 设置空心圆的边框宽度
        },
        data: dataSl
      }, {
        name: '累计流量（m³/h）',
        type: 'line',
        symbol: 'emptyCircle', //4的版本,设置空心圆
        symbolSize: 8, // 设置空心圆的大小
        smooth: false,
        yAxisIndex: 1,
        lineStyle: {
          color: '#1B7EF2',
          width: 3 // 设置线的宽度
        },
        itemStyle: {
          color: '#1B7EF2', //设置legend的图标颜色
          borderColor: '#1B7EF2',
          borderWidth: 2 // 设置空心圆的边框宽度
        },
        data: dataLl
      }
    ]
  };
};
//配置2
export const gasPieOpt = (percentage, echarts) => {
  let data = {
    value: [percentage],
  };
  return {
    title: {
      // text: data.value[0] + '%',//标题不能分开设置样式，采用自定义
      // textStyle: {
      //   color: '#FFCB67',
      //   fontSize: 35
      // },
      subtext: '设备在线率',
      subtextStyle: {
        color: 'rgba(223, 255, 255, 0.8)',
        fontSize: 14
      },
      itemGap: 30,
      left: 'center',
      top: 'center'//控制文本
    },

    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'middle',
        left: '38%', // 调整文本位置，使其不重叠
        style: {
          text: percentage,
          fill: '#ffcb67',
          fontSize: 35,
          fontWeight: 700,
          fontFamily: "DIN-Bold",
        }
      },
      {
        type: 'text',
        left: 'center',
        top: '48%',
        left: "center",
        left: '58%', // 调整文本位置，使其不重叠
        style: {
          text: '%',
          fill: '#ffcb67',
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "DIN-Bold",
        }
      }
    ],
    angleAxis: {
      max: 100,
      clockwise: true, // 逆时针
      show: false,      // 隐藏刻度线
      startAngle: 110
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    polar: [
      {
        center: ['50%', '53%'], //中心点位置
        radius: '145%' //图形大小
      }
    ],
    series: [
      {
        type: 'bar',
        z: 10,
        data: data.value,
        showBackground: false,
        backgroundStyle: {
          color: 'blue',
          borderWidth: 10,
          width: 100
        },
        coordinateSystem: 'polar',
        roundCap: true,
        barWidth: 5, //大的占比环
        itemStyle: {
          normal: {
            // opacity: 1,
            color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(255, 255, 255, 0)'
              },
              {
                offset: percentage / 100,
                color: 'rgba(255, 255, 255, 1)'
              }
            ]),
            // shadowBlur: 5,
            // shadowColor: '#FFCC1F'
          }
        }
      },
      {
        type: 'pie',
        name: '内层细圆环',
        radius: ['72%', '76%'],
        center: ['50%', '53%'], // 将内层细圆环往上移动10px
        startAngle: 90,
        hoverAnimation: false,
        clockWise: true,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [//右上到左下渐变
              {
                offset: 0,
                color: 'rgba(14, 195, 220, 0.08)'
              },
              {
                offset: 0.25,
                color: 'rgba(14, 195, 220, 0.08)'
              },
              {
                offset: 0.5,
                color: 'rgba(14, 195, 220, 0.5)'
              },
              {
                offset: 0.75,
                color: 'rgba(14, 195, 220, 0.5)'
              },
              {
                offset: 1,
                color: 'rgba(14, 195, 220, 0.08)'
              }
            ])
          }
        },
        tooltip: {
          show: false
        },
        label: {
          show: false
        },
        data: [100]
      }
    ]
  }
};

//智慧天然气管道结束......


//智慧机房环境监测平台
//配置1 离线数量
export const machinePieOpt = (num, all, echarts) => {
  // console.log("🚀 ~ machinePieOpt ~ all:", all)
  let data = {
    value: [num], //显示的数值
  };
  let showData = [(num / all) * 100]; //实际占比
  console.log("🚀 ~ machinePieOpt ~ showData:", showData)
  return {
    title: {
      text: data.value[0],//标题不能分开设置样式，采用自定义
      textStyle: {
        color: '#FFECCD',
        fontSize: 24,
        fontWeight: 700,
        fontFamily: "SourceHanSansSC-Bold"
      },
      subtext: '离线数量',
      subtextStyle: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 12
      },
      itemGap: 0,
      left: 'center',
      top: 'center'//控制文本
    },
    angleAxis: {
      max: 100,
      clockwise: true, // 逆时针
      show: false,      // 隐藏刻度线
      startAngle: 110
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    polar: [
      {
        center: ['50%', '53%'], //中心点位置
        radius: '171%' //图形大小
      }
    ],
    series: [
      {
        type: 'bar',
        z: 10,
        data: showData,
        showBackground: false,
        backgroundStyle: {
          color: 'blue',
          borderWidth: 10,
          width: 100
        },
        coordinateSystem: 'polar',
        // roundCap: true,
        barWidth: 12, //大的占比环
        itemStyle: {
          normal: {
            color: "#DC9253"
          }
        }
      },
      {
        type: 'pie',
        name: '内层细圆环',
        radius: ['74%', '92%'],
        center: ['50%', '53%'], // 将内层细圆环往上移动10px
        startAngle: 90,
        hoverAnimation: false,
        clockWise: true,
        itemStyle: {
          normal: {
            color: "#48413A"
          }
        },
        tooltip: {
          show: false
        },
        label: {
          show: false
        },
        data: [100]
      }
    ]
  }
};



export const machineSpeed1Opt = (temperature) => {
  let show = temperature
  if (temperature >= 0) {
    temperature = 24 + temperature;
  } else {
    temperature = temperature * (-1);

  }
  // console.log("🚀 ~ machineSpeed1Opt ~ temperature:", temperature)
  let percentage = (temperature / 66) * 100
  // console.log("🚀 ~ machineSpeed1Opt ~ percentage:", percentage)
  return {
    // 角度轴设置
    angleAxis: {
      axisLine: {
        show: false, // 隐藏轴线
      },
      axisLabel: {
        show: false, // 隐藏刻度标签
      },
      splitLine: {
        show: false, // 隐藏分隔线
      },
      axisTick: {
        show: false, // 隐藏刻度线
      },
      min: 0,
      max: 135,
      startAngle: 225,
    },
    // 半径轴设置
    radiusAxis: {
      type: 'category',
      axisLine: {
        show: false, // 隐藏轴线
      },
      axisTick: {
        show: false, // 隐藏刻度线
      },
      axisLabel: {
        show: false, // 隐藏刻度标签
      },
      z: 10,
    },
    // 极坐标系设置
    polar: {
      radius: '84%',
    },
    // 系列数据
    series: [
      {
        type: 'bar',
        data: [, , percentage],
        z: 1,
        coordinateSystem: 'polar',
        barMaxWidth: 10,
        roundCap: true,
        color: "#DC9253",
        barGap: '-100%',
      },
      {
        type: 'bar',
        data: [, , 100],
        z: 0,
        silent: true,
        coordinateSystem: 'polar',
        barMaxWidth: 10,
        roundCap: true,
        color: '#48413A',
        barGap: '-100%',
      },
      {
        name: '刻度',
        type: 'gauge',
        startAngle: 225,
        endAngle: -45,
        min: -24,
        max: 42,
        splitNumber: 6, // 刻度数量
        radius: '67%',
        axisLine: {
          show: false, // 隐藏轴线
        },
        title: {
          show: false, // 隐藏标题
        },
        detail: {
          show: false, // 隐藏细节
        },
        axisTick: {
          show: false, // 隐藏刻度线
        },
        splitLine: {
          length: 1,
          lineStyle: {
            width: 1,
            color: '#48413A ',
          },
        },
        axisLabel: {
          color: '#F3B552',
          fontSize: 12
        },
        pointer: { // 指针设置
          shadowColor: 'auto',
          shadowBlur: 11,
          length: '50%',
          radius: '50%',
          width: 1,
        },
        itemStyle: {
          color: '#969DA2',
          borderColor: '#DC9253',
          borderWidth: 1,
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 25,
          itemStyle: {
            borderWidth: 5,
            borderColor: '#969DA2',
          },
        },

        // 仪表盘详情样式
        detail: {
          valueAnimation: true,      // 是否启用值变化动画
          formatter: '{value}°C',    // 显示值的格式
          color: '#FFECCD',            // 显示值的颜色
          fontSize: 20,              // 显示值的字体大小
          offsetCenter: [0, '98%']   // 显示值的位置
        },

        data: [{
          value: show,
        }],
      },
      { // 黄色外圈
        type: 'pie',
        tooltip: {
          show: false
        },
        hoverAnimation: false,
        legendHoverLink: false,
        radius: ['4%', '8%'],
        center: ['50%', '50%'],
        label: {
          normal: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{
          value: show,
          itemStyle: {
            normal: {
              color: "#F3B552",
            },
          }
        }]
      },
      { // 指针上的圆
        type: 'pie',
        tooltip: {
          show: false
        },
        hoverAnimation: false,
        legendHoverLink: false,
        radius: ['0%', '4%'],
        center: ['50%', '50%'],
        label: {
          normal: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{
          value: 120,
          itemStyle: {
            normal: {
              color: "#ffffff",
            },
          }
        }]
      }
    ],
    // 提示框设置
    tooltip: {
      show: false, // 隐藏提示框
    },
  };
};

export const machineSpeed2Opt = (humidity) => {
  let show = humidity
  // console.log("🚀 ~ machineSpeed1Opt ~ temperature:", temperature)
  let percentage = humidity
  // console.log("🚀 ~ machineSpeed1Opt ~ percentage:", percentage)
  return {
    // 角度轴设置
    angleAxis: {
      axisLine: {
        show: false, // 隐藏轴线
      },
      axisLabel: {
        show: false, // 隐藏刻度标签
      },
      splitLine: {
        show: false, // 隐藏分隔线
      },
      axisTick: {
        show: false, // 隐藏刻度线
      },
      min: 0,
      max: 135,
      startAngle: 225,
    },
    // 半径轴设置
    radiusAxis: {
      type: 'category',
      axisLine: {
        show: false, // 隐藏轴线
      },
      axisTick: {
        show: false, // 隐藏刻度线
      },
      axisLabel: {
        show: false, // 隐藏刻度标签
      },
      z: 10,
    },
    // 极坐标系设置
    polar: {
      radius: '84%',
    },
    // 系列数据
    series: [
      {
        type: 'bar',
        data: [, , percentage],
        z: 1,
        coordinateSystem: 'polar',
        barMaxWidth: 10,
        roundCap: true,
        color: "#DC9253",
        barGap: '-100%',
      },
      {
        type: 'bar',
        data: [, , 100],
        z: 0,
        silent: true,
        coordinateSystem: 'polar',
        barMaxWidth: 10,
        roundCap: true,
        color: '#48413A',
        barGap: '-100%',
      },
      {
        name: '刻度',
        type: 'gauge',
        startAngle: 225,
        endAngle: -45,
        min: 0,
        max: 100,
        splitNumber: 5, // 刻度数量
        radius: '67%',
        axisLine: {
          show: false, // 隐藏轴线
        },
        title: {
          show: false, // 隐藏标题
        },
        detail: {
          show: false, // 隐藏细节
        },
        axisTick: {
          show: false, // 隐藏刻度线
        },
        splitLine: {
          length: 1,
          lineStyle: {
            width: 1,
            color: '#48413A ',
          },
        },
        axisLabel: {
          color: '#F3B552',
          fontSize: 12
        },
        pointer: { // 指针设置
          shadowColor: 'auto',
          shadowBlur: 11,
          length: '50%',
          radius: '50%',
          width: 1,
        },
        itemStyle: {
          color: '#969DA2',
          borderColor: '#DC9253',
          borderWidth: 1,
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 25,
          itemStyle: {
            borderWidth: 5,
            borderColor: '#969DA2',
          },
        },

        // 仪表盘详情样式
        detail: {
          valueAnimation: true,      // 是否启用值变化动画
          formatter: '{value}%',    // 显示值的格式
          color: '#FFECCD',            // 显示值的颜色
          fontSize: 20,              // 显示值的字体大小
          offsetCenter: [0, '98%']   // 显示值的位置
        },

        data: [{
          value: show,
        }],
      },
      { // 黄色外圈
        type: 'pie',
        tooltip: {
          show: false
        },
        hoverAnimation: false,
        legendHoverLink: false,
        radius: ['4%', '8%'],
        center: ['50%', '50%'],
        label: {
          normal: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{
          value: show,
          itemStyle: {
            normal: {
              color: "#F3B552",
            },
          }
        }]
      },
      { // 指针上的圆
        type: 'pie',
        tooltip: {
          show: false
        },
        hoverAnimation: false,
        legendHoverLink: false,
        radius: ['0%', '4%'],
        center: ['50%', '50%'],
        label: {
          normal: {
            show: false
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [{
          value: 120,
          itemStyle: {
            normal: {
              color: "#ffffff",
            },
          }
        }]
      }
    ],
    // 提示框设置
    tooltip: {
      show: false, // 隐藏提示框
    },
  };
};
