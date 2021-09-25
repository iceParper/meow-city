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
        title: {
          text: "分公司借钱排行榜",
          // subtext: "数据来自网络",
          textStyle: {
            color: "#333",
            fontSize: 14,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: [
            "7天以内",
            "7-15天内",
            "15-30天内",
            "30-45天内",
            "45天以内",
            "逾期",
          ],
          bottom: 20,
        },
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
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        series: [
          {
            name: "7天内",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "inside",
            },
            data: [320, 302, 301, 334, 390, 330, 320],
          },
          {
            name: "7-15天内",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "inside",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "15-30天内",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "inside",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "30-45天内",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "inside",
            },
            data: [150, 212, 201, 154, 190, 330, 410],
          },
          {
            name: "45天以内",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "inside",
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320],
          },
          {
            name: "逾期",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              position: "inside",
            },
            data: [820, 832, 901, 934, 1290, 1330, 1320],
          },
        ],
      });
    },
  },
};
</script>
