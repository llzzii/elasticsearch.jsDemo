import { Component, OnInit } from "@angular/core";
import { endOfMonth } from "date-fns";
import * as echarts from "echarts";
// import "echarts/map/js/china.js";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  selectedTime = "1";
  timesData = [
    { value: "1", label: "近1小时" },
    { value: "12", label: "近12小时" },
    { value: "24", label: "近24小时" },
    { value: "168", label: "近7天" },
    { value: "360", label: "近15天" },
    { value: "720", label: "近30天" },
  ];
  ranges1 = {
    Today: [new Date(), new Date()],
    "This Month": [new Date(), endOfMonth(new Date())],
  };

  selectedVms = "all";
  vmsData = [
    { id: "all", name: "全部" },
    { id: "1", name: "资产1" },
    { id: "2", name: "资产2" },
  ];
  fullClass = ""; // 全屏class

  cpus = [
    {
      used: 80,
      sum: 120,
      title: "全部",
    },
    {
      used: 8,
      sum: 20,
      title: "可用区1",
    },
    {
      used: 8,
      sum: 30,
      title: "可用区2",
    },
    {
      used: 8,
      sum: 40,
      title: "可用区3",
    },
    {
      used: 18,
      sum: 30,
      title: "可用区4",
    },
  ];
  displayCpus = [...this.cpus].slice(0, 3);

  mems = [
    {
      used: 80,
      sum: 120,
      title: "全部",
    },
    {
      used: 8,
      sum: 20,
      title: "可用区1",
    },
    {
      used: 8,
      sum: 30,
      title: "可用区2",
    },
    {
      used: 8,
      sum: 40,
      title: "可用区3",
    },
    {
      used: 18,
      sum: 30,
      title: "可用区4",
    },
  ];
  displayMems = [...this.cpus].slice(0, 3);

  disks = [
    {
      used: 80,
      sum: 120,
      title: "全部",
    },
    {
      used: 8,
      sum: 20,
      title: "可用区1",
    },
    {
      used: 8,
      sum: 30,
      title: "可用区2",
    },
    {
      used: 8,
      sum: 40,
      title: "可用区3",
    },
    {
      used: 18,
      sum: 30,
      title: "可用区4",
    },
  ];
  displayDisks = [...this.cpus].slice(0, 3);
  constructor() {}

  onChange(result: Date[]): void {
    console.log("From: ", result[0], ", to: ", result[1]);
  }
  checkFull() {
    if (this.fullClass === "") {
      this.fullClass = "full-page";
    } else {
      this.fullClass = "";
    }
  }
  // 获取饼状图表options
  getOption(data = this.cpus[1], title?) {
    return {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      color: ["#38b3dd", "#e9e9e9"],
      series: [
        {
          name: title,
          type: "pie",
          radius: ["70%", "85%"],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          silent: true,
          label: {
            normal: {
              show: true,
              position: "center",
              formatter() {
                return (
                  parseInt(((data.used * 100) / data.sum).toString()) + "%"
                );
              },
              textStyle: {
                fontSize: "14",
                color: "#5a5a5a",
              },
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold",
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            { value: data.used, name: "已用" },
            { value: data.sum, name: "总量" },
          ],
        },
      ],
    };
  }

  // 获取柱状图表options
  getBarOption(data, title?) {
    let color = ["#b3d465", "#dee6e8"];
    return {
      color,
      grid: {
        top: 25,
        bottom: 40,
      },
      xAxis: {
        show: false,
        type: "category",
        data: [""],
      },
      yAxis: {
        show: false,
        type: "value",
      },
      series: [
        {
          data: [data.used],
          stack: "总量",
          type: "bar",
          barWidth: "30",
          label: {
            normal: {
              formatter() {
                return data.sum === 0
                  ? 0 + "%"
                  : parseInt(((data.used * 100) / data.sum).toString()) + "%";
              },
              show: true,
              fontWeight: "bold",
              fontSize: 14,
              color: "#5a5a5a",
              padding: [5, 0, 0, 0],
              position: "bottom",
            },
          },
        },
        {
          data: [data.sum - data.used],
          stack: "总量",
          type: "bar",
          barWidth: "30",
        },
      ],
    };
  }

  // 获取柱状图表options
  getBarOption2(data2, title?) {
    let dataAxis = [
      "点",
      "击",
      "柱",
      "子",
      "或",
      "者",
      "两",
      "指",
      "在",
      "触",
      "屏",
      "上",
      "滑",
      "动",
      "能",
      "够",
      "自",
      "动",
      "缩",
      "放",
    ];
    let data = [
      220,
      182,
      191,
      234,
      290,
      330,
      310,
      123,
      442,
      321,
      90,
      149,
      210,
      122,
      133,
      334,
      198,
      123,
      125,
      220,
    ];
    let yMax = 500;
    let dataShadow = [];
    let color = ["#b3d465", "#dee6e8"];
    let zoomSize = 6;
    return {
      color,
      grid: {
        top: 25,
        bottom: 40,
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: true,
          textStyle: {
            color: "#fff",
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: "#999",
          },
        },
      },
      dataZoom: [
        {
          type: "inside",
        },
      ],
      series: [
        {
          // For shadow
          type: "bar",
          itemStyle: {
            color: "rgba(0,0,0,0.05)",
          },
          barGap: "-100%",
          barCategoryGap: "40%",
          data: dataShadow,
          animation: false,
        },
        {
          type: "bar",
          itemStyle: {
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   { offset: 0, color: "#83bff6" },
            //   { offset: 0.5, color: "#188df0" },
            //   { offset: 1, color: "#188df0" },
            // ]),
          },
          emphasis: {
            itemStyle: {
              //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //     { offset: 0, color: "#2378f7" },
              //     { offset: 0.7, color: "#2378f7" },
              //     { offset: 1, color: "#83bff6" },
              //   ]),
            },
          },
          data,
        },
      ],
    };
  }

  // 获取地图显示
//   getMapOption() {
//     return {
//       color: ["#38b3dd", "#e9e9e9"],
//       grid: {
//         top: 25,
//         bottom: 40,
//       },
//       title: {
//         top: 10,
//         text: "3D中国地图",
//         left: "center",
//         textStyle: {
//           color: "#fff",
//         },
//       },
//       backgroundColor: "rgba(0, 10, 52, 1)",
//       geo: {
//         map: "china",
//         aspectScale: 0.75,
//         layoutCenter: ["50%", "51.5%"], // 地图位置
//         layoutSize: "118%",
//         roam: true,
//         itemStyle: {
//           normal: {
//             borderColor: "rgba(147, 235, 248, 1)",
//             borderWidth: 0.5,
//             color: {
//               type: "linear-gradient",
//               x: 0,
//               y: 1500,
//               x2: 2500,
//               y2: 0,
//               colorStops: [
//                 {
//                   offset: 0,
//                   color: "#009DA1", // 0% 处的颜色
//                 },
//                 {
//                   offset: 1,
//                   color: "#005B9E", // 50% 处的颜色
//                 },
//               ],
//               global: true, // 缺省为 false
//             },
//             opacity: 0.5,
//           },
//           emphasis: {
//             areaColor: "#2a333d",
//           },
//         },
//         regions: [
//           {
//             name: "南海诸岛",
//             itemStyle: {
//               areaColor: "rgba(0, 10, 52, 1)",
//               borderColor: "rgba(0, 10, 52, 1)",
//             },
//             emphasis: {
//               areaColor: "rgba(0, 10, 52, 1)",
//               borderColor: "rgba(0, 10, 52, 1)",
//             },
//           },
//         ],
//         z: 2,
//       },
//       series: [
//         {
//           type: "map",
//           map: "china",
//           tooltip: {
//             show: false,
//           },
//           label: {
//             show: true,
//             color: "#FFFFFF",
//             fontSize: 16,
//           },
//           aspectScale: 0.75,
//           layoutCenter: ["50%", "50%"], // 地图位置
//           layoutSize: "118%",
//           roam: true,
//           itemStyle: {
//             normal: {
//               borderColor: "rgba(147, 235, 248, 0.6)",
//               borderWidth: 0.8,
//               areaColor: {
//                 type: "linear-gradient",
//                 x: 0,
//                 y: 1200,
//                 x2: 1000,
//                 y2: 0,
//                 colorStops: [
//                   {
//                     offset: 0,
//                     color: "#009DA1", // 0% 处的颜色
//                   },
//                   {
//                     offset: 1,
//                     color: "#005B9E", // 50% 处的颜色
//                   },
//                 ],
//                 global: true, // 缺省为 false
//               },
//             },
//             emphasis: {
//               areaColor: "rgba(147, 235, 248, 0)",
//             },
//           },
//           zlevel: 1,
//         },
//       ],
//     };
//   }

//   initMap() {
//     const echart = echarts.init(document.getElementById("map")); // 获取视图的echarts的DOM节点，并初始化对象
//     let option = this.getMapOption();
//     echart.setOption(option, true); // 绑定地图的配置参数对象
//     echart.on("georoam", function(params) {
//       let option = echart.getOption(); // 获得option对象
//       if (params.zoom != null && params.zoom !== undefined) {
//         // 捕捉到缩放时
//         option.geo[0].zoom = option.series[0].zoom; // 下层geo的缩放等级跟着上层的geo一起改变
//         option.geo[0].center = option.series[0].center; // 下层的geo的中心位置随着上层geo一起改变
//       } else {
//         // 捕捉到拖曳时
//         option.geo[0].center = option.series[0].center; // 下层的geo的中心位置随着上层geo一起改变
//       }
//       echart.setOption(option, true); // 设置option
//       console.log(params);
//     });
//   }
  // 获取折线图
  getLineOption(data, title?) {
    let color = ["#b3d465", "#dee6e8"];
    return {
      color,
      grid: {
        top: 25,
        bottom: 40,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: "line",
          areaStyle: {},
        },
      ],
    };
  }
  // 图表左移
  leftData(datas, sDatas) {
    let item = datas[0];
    let index = sDatas.indexOf(item);
    if (index === 0) {
      return;
    } else {
      datas.pop();
      datas.unshift(sDatas[index - 1]);
    }
  }

  // 图表右移
  rightData(datas, sDatas) {
    let item = datas[2];
    let index = sDatas.indexOf(item);
    if (index === sDatas.length - 1) {
      return;
    } else {
      datas.shift();
      datas.push(sDatas[index + 1]);
    }
  }

  ngOnInit() {
    // let that = this;
    // setTimeout(() => {
    //   that.initMap();
    // }, 1000);
  }
}
