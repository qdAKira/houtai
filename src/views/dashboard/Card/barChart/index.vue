<template>
  <!-- 容器 -->
  <div class="charts" ref="charts"></div>
</template>

<script>
//引入echarts
import echarts from "echarts";
export default {
  mounted() {
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数据

    let option = {
      xAxis: {
        // 隐藏x轴
        show: false,
        // 均分
        type: "category",
      },
      yAxis: {
        // 隐藏y轴
        show: false,
      },
      // 系列
      series: [
        {
          type: "bar",
          data: [10, 7, 33, 12, 48, 9,29,10,44,33,22,8],
          color:'#bfa'
        },
      ],
      // 布局调试
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      // 提示信息
      tooltip:{
        
      }
    };
    lineCharts.setOption(option);
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>