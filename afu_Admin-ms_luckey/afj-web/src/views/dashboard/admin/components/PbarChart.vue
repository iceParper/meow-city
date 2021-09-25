<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

const animationDuration = 6000;

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
      default: "420px",
    },
    chartData: {
      required: true,
    },
    chartTitle: {
      type: String,
    },
    colorArr: {
      type: Array,
    },
  },
  data() {
    return {
      chart: null,
      option: {
        title: {
          text: "",
          // subtext: "数据来自网络",
          textStyle: {
            color: "#101010",
            fontSize: 18,
            fontweight: 700,
          },
        },
        color: [],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: [],
          bottom: 20,
        },
        dataZoom: [
          {
            id: "dataZoomY",
            type: "slider",
            yAxisIndex: [0],
            filterMode: "empty",
          },
        ],
        grid: {
          left: "3%",
          right: "3%",
          bottom: 60,
          containLabel: true,
        },
        xAxis: {
          type: "value",
          show: false,
        },
        yAxis: {
          type: "category",
          data: [],
          axisTick: {
            show: false,
          },
        },
        series: [],
      },
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(newVal, oldVal) {
        var val = newVal ? newVal : oldVal;
        var yAxisData = val.company;
        var xAxisMax =
          Math.max(...val.list[val.list.length - 1].data) +
          parseInt(Math.max(...val.list[val.list.length - 1].data) / 10);
        var seriesData = [];
        var legendData = [];
        val.list.forEach((item, index) => {
          console.log(val.list.length, "===");
          if (val.list.length - 1 != index) {
            var seriesJson = {
              name: item.name,
              type: "bar",
              stack: "总量",
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    position: "inside",
                    formatter: function (params) {
                      if (params.value == 0) {
                        //为0时不显示
                        return "";
                      } else {
                        return params.value;
                      }
                    },
                  },
                },
              },
              data: item.data,
            };
            seriesData.push(seriesJson);
            legendData.push(item.name);
          }
        });

        var lastSeriesData = {
          name: val.list[val.list.length - 1].name,
          type: "bar",
          stack: "总量",
          itemStyle: {
            normal: {
              color: "#fff",
              label: {
                show: true,
                color: "#666",
                position: "insideLeft",
                formatter: function (params) {
                  if (params.value == 0) {
                    //为0时不显示
                    return "";
                  } else {
                    return " 共 " + params.value + " 万元";
                  }
                },
              },
            },
          },

          data: val.list[val.list.length - 1].data,
        };
        seriesData.push(lastSeriesData);
        this.option.series = seriesData;
        this.option.yAxis.data = yAxisData;
        this.option.xAxis.max = xAxisMax;
        this.option.legend.data = legendData;
        this.option.dataZoom[0].start = 0;
        this.option.dataZoom[0].end =val.list.length > 10 ? 10 / val.list.length * 100 : 100
        this.chart.setOption(this.option);
      },
    },
    chartTitle: {
      deep: true,
      handler(newVal, oldVal) {
        var title = newVal ? newVal : oldVal;
        console.log(title);
        this.option.title.text = title;
        this.chart.setOption(this.option);
      },
    },
  },
  mounted() {
    this.option.color = this.colorArr;
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption(this.option);
    },
  },
};
</script>
