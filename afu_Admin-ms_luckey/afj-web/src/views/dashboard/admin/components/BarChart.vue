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
      default: "400px",
    },
  },
  data() {
    return {
      chart: null,
    };
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

      this.chart.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ["product", "本金", "收益"],
          source: [
            { product: "4月7日", 本金: 43.3, 收益: 85.8 },
            { product: "4月8日", 本金: 83.1, 收益: 73.4 },
            { product: "4月9日", 本金: 86.4, 收益: 65.2 },
            { product: "4月10日", 本金: 72.4, 收益: 53.9 },
            { product: "4月11日", 本金: 43.3, 收益: 85.8 },
            { product: "4月12日", 本金: 83.1, 收益: 73.4 },
            { product: "4月13日", 本金: 86.4, 收益: 65.2 },
            { product: "4月14日", 本金: 72.4, 收益: 53.9 },
            { product: "4月15日", 本金: 43.3, 收益: 85.8 },
            { product: "4月16日", 本金: 83.1, 收益: 73.4 },
            { product: "4月17日", 本金: 86.4, 收益: 65.2 },
            { product: "4月18日", 本金: 72.4, 收益: 53.9 },
          ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { barGap: 0, type: "bar" },
          { barGap: 0, type: "bar" },
        ],
      });
    },
  },
};
</script>
