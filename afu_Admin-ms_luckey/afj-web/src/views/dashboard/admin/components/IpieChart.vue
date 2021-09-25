<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

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
    chartData: {
      type: Array,
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
          // subtext: "纯属虚构",
          left: "left",
          textStyle: {
            color: "#101010",
            fontSize: 18,
            fontweight: 700,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          top: 30,
          data: [],
        },
        color: [],

        series: [
          {
            name: "今日巡检",
            type: "pie",
            radius: "60%",
            center: ["50%", "50%"],
            label: {},
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
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
        var legendData = [];
        var seriesData = val;
        console.log(val,'val,val')
        if (newVal) {
          console.log(newVal, "newVal");
          seriesData = newVal;
        } else {
          console.log(oldVal, "oldVal");
          seriesData = oldVal;
        }
        seriesData = seriesData;
        console.log(this.option, "option");
        // seriesData.forEach((item, index) => {
        //   legendData.push(item.name);
        // });
        // this.option.legend.data = legendData;
        this.option.series[0].data = seriesData
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
