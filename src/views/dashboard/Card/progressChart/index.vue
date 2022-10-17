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
        //  最小值
        min:0,
        // 最大值
        max:100,

      },
      yAxis: {
        // 隐藏y轴
        show: false,
         // 均分
        type: "category",
      },
      // 系列
      series: [
        {
          type: "bar",
          data: [78],
          color:'#bfa',
          // 柱状图宽度设置
          barWidth:10,
          color:'yellowgreen',
          // 背景颜色设置
          showBackground:true,
          // 设置背景颜色
          backgroundStyle:{
            color:'#eee'
          },
          // 文本标签
          label:{
            show:true,
            // 更改文本内容
            formatter:'|',
            // 文本标签位置调试
            position:'right'
          }
        },
      ],
      // 布局调试
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
     
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