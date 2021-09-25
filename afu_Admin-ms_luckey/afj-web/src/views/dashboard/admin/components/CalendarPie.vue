<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import { validUsername } from "@/utils/validate";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "320px",
    },
    list: {
      type: Array,
    },
    chartTitle: {
      type: String,
    },
  },
  data() {
    return {
      chart: null,
      pieInitialized: false,
      animationDuration: 6000,
      cellSize: [66, 66],
      pieRadius: 27,
      option: {},
      startDay: undefined,
      endDay: undefined,
    };
  },
  watch: {
    list: {
      deep: true,
      handler(newVal, oldVal) {
        var val = newVal ? newVal : oldVal;
        this.endDay = this.getDay(0, "-");
        this.startDay = this.getDay(-val.length, "-");
        this.option = {
          title: {
            text: "",
            // subtext: "数据来自网络",
            textStyle: {
              color: "#101010",
              fontSize: 18,
              fontweight: 700,
            },
          },
          tooltip: {},
          legend: {
            bottom: 20,
            right: 10,
          },
          color: ["#EECE62", "#95CD79", "#6368C2"],
          calendar: {
            top: "middle",
            left: "center",
            orient: "vertical",
            cellSize: this.cellSize,
            yearLabel: {
              show: false,
              textStyle: {
                fontSize: 14,
              },
            },
            dayLabel: {
              margin: 20,
              firstDay: 1,
              nameMap: [
                "星期日",
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五",
                "星期六",
              ],
            },
            monthLabel: {
              show: false,
            },
            range: [this.startDay, this.getDay(-1, "-")],
          },
          series: [
            {
              id: "label",
              type: "scatter",
              coordinateSystem: "calendar",
              symbolSize: 1,
              label: {
                normal: {
                  show: true,
                  formatter: function (params) {
                    return echarts.format.formatTime("dd", params.value[0]);
                  },
                  offset: [
                    -this.cellSize[0] / 2 + 10,
                    -this.cellSize[1] / 2 + 10,
                  ],
                  textStyle: {
                    color: "#000",
                    fontSize: 10,
                  },
                },
              },
              data: this.getVirtulData(),
            },
          ],
        };
        this.$nextTick(() => {
          this.initChart(val);
        });
      },
    },
    chartTitle: {
      deep: true,
      handler(newVal, oldVal) {
        var title = newVal ? newVal : oldVal;
        if (title != null) {
          this.option.title.text = title;
          this.chart.setOption(this.option);
        }
      },
    },
  },
  mounted() {
    var that = this;

    window.onresize = function () {
      if (that.pieInitialized) {
        setTimeout(() => {
          that.chart.setOption({
            series: that.getPieSeriesUpdate(that.getVirtulData(), that.chart),
          });
        }, 500);
      }
    };
  },
  destroyed() {
    window.onresize = null;
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart(list) {
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption(this.option);
      setTimeout(() => {
        this.pieInitialized = true;
        this.chart.setOption({
          series: this.getPieSeries(this.getVirtulData(), this.chart, list),
        });
      }, 10);
      var that = this;
    },
    getDay(num, str) {
      var today = new Date();
      var nowTime = today.getTime();
      var ms = 24 * 3600 * 1000 * num;
      today.setTime(parseInt(nowTime + ms));
      var oYear = today.getFullYear();
      var oMoth = (today.getMonth() + 1).toString();
      if (oMoth.length <= 1) oMoth = "0" + oMoth;
      var oDay = today.getDate().toString();
      if (oDay.length <= 1) oDay = "0" + oDay;
      return oYear + str + oMoth + str + oDay;
    },
    getVirtulData() {
      var date = +echarts.number.parseDate(this.startDay);
      var end = +echarts.number.parseDate(this.endDay);
      var dayTime = 3600 * 24 * 1000;
      var data = [];
      for (var time = date; time < end; time += dayTime) {
        data.push([
          echarts.format.formatTime("yyyy-MM-dd", time),
          Math.floor(Math.random() * 10000),
        ]);
      }
      return data;
    },
    getPieSeries(scatterData, chart, list) {
      var that = this;
      return echarts.util.map(scatterData, function (item, index) {
        var center = chart.convertToPixel("calendar", item);
        return {
          id: index + "pie",
          type: "pie",
          center: center,
          label: {
            normal: {
              formatter: function (params) {
                if (params.value == 0) {
                  //为0时不显示
                  return "";
                } else {
                  return params.value;
                }
              },
              position: "inside",
              fontSize: 10,
              align: "right",
            },
          },
          radius: that.pieRadius,
          data: list ? list[index] : [],
        };
      });
    },
    getPieSeriesUpdate(scatterData, chart) {
      return echarts.util.map(scatterData, function (item, index) {
        var center = chart.convertToPixel("calendar", item);
        return {
          id: index + "pie",
          center: center,
        };
      });
    },
  },
};
</script>
