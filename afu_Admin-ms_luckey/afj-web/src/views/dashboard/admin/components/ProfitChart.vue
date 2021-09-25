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
      default: "340px",
    },
    chartData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
      option: {
        title: {
          text: "计划还款",
          // subtext: "纯属虚构",
          left: "left",
          textStyle: {
            color: "#101010",
            fontSize: 18,
            fontweight: 700,
          },
        },
        legend: {
          data: ["本金", "收益"],
          bottom: 5,
          right: 80,
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 0,
            end: 50,
          },
          {
            type: "inside",
            realtime: true,
            start: 0,
            end: 50,
          },
        ],
        color: ["#95CD79", "#DF6F68"],
        tooltip: {},
        xAxis: { type: "category" },
        yAxis: [
          {
            type: "value",
            name: "收益",
            axisLabel: {
              formatter: "{value}万",
            },
          },
          {
            type: "value",
            name: "本金",
            axisLabel: {
              formatter: "{value}万",
            },
          },
        ],
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            name: "收益",
            type: "bar",
            label: {
              show: true,
              position: "top",
              formatter: function (params) {
                if (params.value == 0) {
                  //为0时不显示
                  return "";
                } else {
                  return params.value + "万";
                }
              },
            },
            data: [],
            barGap: 0,
          },
          {
            name: "本金",
            type: "bar",
            label: {
              show: true,
              position: "top",
              formatter: function (params) {
                if (params.value == 0) {
                  //为0时不显示
                  return "";
                } else {
                  return params.value + "万";
                }
              },
            },
            data: [],
            barGap: 0,
          },
        ],
      },
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(newVal, oldVal) {
        var val = newVal ? newVal : oldVal;
        console.log(val, "val");

        var cArr = [];
        var iArr = [];
        var dataArr = [];
        val.forEach((item, index) => {
          dataArr.push(item.date);
          cArr.push(item.capital);
          iArr.push(item.interest);
        });
        this.option.xAxis.data = dataArr;
        this.option.series[0].data = iArr;
        this.option.series[0].yAxisIndex = 0;
        this.option.series[1].data = cArr;
        this.option.series[1].yAxisIndex = 1;
        this.option.dataZoom.forEach((item,index)=>{
          item.end = val.length > 20 ?  20 / val.length * 100 : 100;
        })
        this.chart.setOption(this.option);
      },
    },
  },
  mounted() {
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
