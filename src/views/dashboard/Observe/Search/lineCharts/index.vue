<template>
  <div>
    <div class="header">
      <span class="search-header">搜索用户数</span
      ><svg
        t="1665542864571"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3482"
        width="20"
        height="20"
      >
        <path
          d="M503.803829 63.578014c-247.050676 0-447.328072 200.277396-447.328072 447.327048 0 247.054769 200.277396 447.333188 447.328072 447.333188 247.054769 0 447.332165-200.278419 447.332165-447.333188C951.13497 263.85541 750.858598 63.578014 503.803829 63.578014L503.803829 63.578014zM503.803829 894.313336c-211.749682 0-383.408273-171.659615-383.408273-383.408273 0-211.749682 171.659615-383.40725 383.408273-383.40725 211.753775 0 383.412366 171.658591 383.412366 383.40725C887.216195 722.653721 715.557604 894.313336 503.803829 894.313336L503.803829 894.313336zM447.745069 255.897158l127.914298 0L575.659367 383.576095 447.745069 383.576095 447.745069 255.897158 447.745069 255.897158zM447.745069 425.470251l127.914298 0 0 342.058516L447.745069 767.528767 447.745069 425.470251 447.745069 425.470251zM447.745069 425.470251"
          p-id="3483"
          fill="#8a8a8a"
        ></path>
      </svg>
    </div>
    <div class="main">
      <span class="main-title">12321</span>
      <span class="main-content">17.1</span>
      <svg t="1665731006250" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3688" width="16" height="16"><path d="M799.9 96 224.1 96C153.3 96 96 153.3 96 224.1l0 420.3 185.3-185.3c12.5-12.5 32.8-12.5 45.2 0l147.1 147.1 157.7-157.7-32.6-32.6c-11.9-11.9-6.5-32.3 9.8-36.6L751.7 341c16.3-4.4 31.2 10.5 26.8 26.8l-38.4 143.1c-4.4 16.3-24.7 21.7-36.6 9.8l-26.9-26.9L496.2 674.1c-12.5 12.5-32.8 12.5-45.2 0L303.9 527l-198 198c-2.9 2.9-6.3 5-9.9 6.6l0 68.3C96 870.7 153.3 928 224.1 928l575.8 0c70.7 0 128.1-57.3 128.1-128.1L928 224.1C928 153.3 870.7 96 799.9 96z" p-id="3689" fill="#d81e06"></path></svg>
      <svg t="1665731035325" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4662" width="16" height="16"><path d="M799.9 96 224.1 96C153.3 96 96 153.3 96 224.1l0 68.3c3.6 1.6 7 3.7 9.9 6.6l198 198L451 349.9c12.5-12.5 32.8-12.5 45.2 0l180.3 180.3 26.9-26.9c11.9-11.9 32.3-6.5 36.6 9.8l38.4 143.1c4.4 16.3-10.5 31.2-26.8 26.8l-143.1-38.4c-16.3-4.4-21.7-24.7-9.8-36.6l32.6-32.6L473.6 417.8 326.5 564.9c-12.5 12.5-32.8 12.5-45.2 0L96 379.6l0 420.3C96 870.7 153.3 928 224.1 928l575.8 0c70.7 0 128.1-57.3 128.1-128.1L928 224.1C928 153.3 870.7 96 799.9 96z" p-id="4663" fill="#1afa29"></path></svg>
    </div>
    <div class="footer">
      <div class="charts" ref="charts"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "",
  mounted() {
    // 初始化echarts实例
    let lineCharts = echarts.init(this.$refs.charts);
    // 配置数据

    let option = {
      xAxis: {
        // 隐藏x轴
        show: false,
        type: "category",
      },
      yAxis: {
        // 隐藏y轴
        show: false,
      },
      // 系列
      series: [
        {
          type: "line",
          data: [10, 7, 33, 12, 48, 9,29,10,44],
          // 拐点的样式的设置
          itemStyle: {
            opacity: 0,
          },
          // 线条的样式
          lineStyle: {
            color: "blue",
          },
          // 填充颜色设置
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "blue", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#ffff", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          // 变为曲线
          smooth:true,
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
.header {
  display: flex;
  /* 1、align-items中的items指的是flex 中的子项，因此align-items指的就是flex子项们相对于flex容器在垂直方向上的对齐方式。
    2、适用于所有的flex容器，单行时候垂直居中使用align-items: center。 */
  align-items: center;
}
.search-header{
  margin-right: 20px;
}
.main{
  margin: 10px 0px;
}
.main-title{
  margin-right: 30px;
}
.main-content{
  margin-right: 10px;
}
.charts{
  width: 100%;
  height: 50px;
}
</style>
