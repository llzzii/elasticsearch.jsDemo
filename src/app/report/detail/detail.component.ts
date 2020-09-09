import { Component, OnInit } from "@angular/core";
import * as domtoimage from "dom-to-image";
import * as echarts from "echarts";
import { jsPDF } from "jspdf";
import * as moment from "moment";

import { EsServiceService } from "../../service/es-service.service";
@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.css"],
})
export class DetailComponent implements OnInit {
  ishow = false;
  percent = 0;
  constructor(private esServiceService: EsServiceService) {}
  getLineOption(xdata, ydata?) {
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
        data: xdata,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: ydata,
          type: "line",
          areaStyle: {},
        },
      ],
    };
  }
  // 获取饼状图表options
  getOption(data, legendData, title?) {
    return {
      title: {
        text: title,
        left: "center",
      },
      color: ["#b3d465", "#dee6e8"],
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: "center",
        data: legendData,
      },
      series: [
        {
          type: "pie",
          radius: "65%",
          center: ["50%", "50%"],
          selectedMode: "single",
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  }

  getLineData() {
    let body = {
      query: {
        constant_score: {
          filter: {
            range: {
              createdTime: {
                gte: new Date().getTime() - 1000 * 60 * 60 * 24 * 3, // 或者"gt": "now-2m", "lt": "now"
                lte: new Date().getTime(),
              },
            },
          },
        },
      },
      aggs: {
        by_time: {
          date_histogram: {
            field: "createdTime",
            interval: "6h",
          },
        },
      },
      sort: [
        {
          createdTime: {
            order: "asc",
          },
        },
      ],
    };
    this.esServiceService.searchCount("logs*", body).subscribe((data) => {
      let xData = [],
        yData = [];
      data.aggregations.by_time.buckets.forEach((element) => {
        xData.push(moment(element["key_as_string"]).format("YYYY-MM-DD HH:mm"));
        yData.push(element["doc_count"]);
      });
      const echart = echarts.init(document.getElementById("lineChart"));
      const echart1 = echarts.init(document.getElementById("lineChart1"));
      const echart2 = echarts.init(document.getElementById("lineChart2"));
      const echart3 = echarts.init(document.getElementById("lineChart3"));
      const echart4 = echarts.init(document.getElementById("lineChart4"));
      const echart5 = echarts.init(document.getElementById("lineChart5"));
      const echart6 = echarts.init(document.getElementById("lineChart6"));
      const echart7 = echarts.init(document.getElementById("lineChart7"));
      let option = this.getLineOption(xData, yData);
      echart.setOption(option, true);
      echart1.setOption(option, true);
      echart2.setOption(option, true);
      echart3.setOption(option, true);
      echart4.setOption(option, true);
      echart5.setOption(option, true);
      echart6.setOption(option, true);
      echart7.setOption(option, true);
    });
  }

  getBarData() {
    let body = {
      size: 0,
      aggs: {
        logtype_terms: {
          terms: {
            field: "logtype",
          },
        },
        content_terms: {
          terms: {
            field: "content",
          },
        },
      },
    };
    this.esServiceService.searchCount("logs*", body).subscribe((data) => {
      console.log(data);
      let contentData = data.aggregations.content_terms.buckets;
      let logTypeData = data.aggregations.logtype_terms.buckets;
      let xData1 = [],
        yData1 = [],
        xData2 = [],
        yData2 = [];
      contentData.forEach((element) => {
        xData1.push(element["key"]);
        yData1.push({ value: element["doc_count"], name: element["key"] });
      });
      logTypeData.forEach((element) => {
        xData2.push(element["key"]);
        yData2.push({ value: element["doc_count"], name: element["key"] });
      });
      const echart = echarts.init(document.getElementById("barChart1")); // 获取视图的echarts的DOM节点，并初始化对象
      const echart2 = echarts.init(document.getElementById("barChart2")); // 获取视图的echarts的DOM节点，并初始化对象
      let option = this.getOption(yData1, xData1, "饼图");
      let option2 = this.getOption(yData2, xData2, "饼图");
      echart.setOption(option, true);
      echart2.setOption(option2, true);
    });
  }

  exportPdf() {
    let node = document.getElementById("pdf");
    // let pdf = new jsPDF();
    // pdf.addHTML(node, 0, 0, { pagesplit: true }, (data) => {
    //   console.log(data);
    //   pdf.save("报表.pdf");
    // });
    this.ishow = true;
    this.percent = 0;
    let that = this;
    let timer = setInterval(() => {
      if (this.percent > 98) {
      } else if (this.percent > 80) {
        this.percent += 3;
      } else {
        this.percent += 10;
      }
    }, 1000);
    domtoimage.toPng(node, { quality: 0.95 }).then((dataUrl) => {
      let img = new Image();
      img.src = dataUrl;
      // document.getElementById("demo").src = dataUrl;
      img.onload = function () {
        let pdf = new jsPDF({
          format: [595.28, (592.28 / img.width) * img.height + 20],
        });
        pdf.addImage(
          dataUrl,
          "PNG",
          15,
          20,
          560,
          (560 / img.width) * img.height
        );
        pdf.save("报表" + new Date().getTime() + ".pdf");
        timer = null;
        that.percent = 100;
        that.ishow = false;
      };
    });
    // let pdf2 = new jsPDF({
    //   format: [node.scrollWidth + 30, node.scrollHeight + 30],
    // });
    // pdf2.html(node, {
    //   callback(doc) {
    //     doc.save("xx.pdf");
    //   },
    //   x: 10,
    //   y: 10,
    // });
  }
  ngOnInit() {
    this.getLineData();
    this.getBarData();
  }
}
