<template>
  <div class="box">
    <div class="boxs" id="boxs"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arr: [],
      oo: {
        title: {
          text: "用户来源",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "Video Ads",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "Direct",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "Search Engine",
            type: "line",
            stack: "Total",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
    };
  },
  methods: {
    getData() {
      this.$axios.get("reports/type/1").then((res) => {
        this.arr = res.data.data;
        console.log(this.arr);
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const echarts = require("echarts");
      let myChart = echarts.init(document.getElementById("boxs"));
      // 绘制图表
      console.log(this.arr);
    console.log(this.oo);
    this.oo.series=this.arr.series
    this.oo.xAxis=this.arr.xAxis
    this.oo.legend=this.arr.legend
      myChart.setOption(this.oo);
    },
  },
  components: {},
  computed: {},
  watch: {},
  created() {
    this.getData();
    setTimeout(() => {
      this.drawLine();
    }, 1000);
  },
};
</script>
<style lang="scss" scoped>
.box {
  padding: 20px;
  padding-top: 0;
  height: 90vh;
  padding-bottom: 300px;
  .boxs {
    padding: 20px;
    margin: 30px auto;
    height: 500px;
  }
}
</style>
