<template>
  <div>
    <el-card>
      <div slot="header" class="header">
        <div class="category-header">
          <span>销售额类别占比</span>
          <el-radio-group v-model="value">
            <el-radio-button label="全部渠道"></el-radio-button>
            <el-radio-button label="线上"></el-radio-button>
            <el-radio-button label="门店"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div>
        <!-- 饼图 -->
        <div class="charts" ref="charts"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "Category",
  data() {
    return {
      value: "全部渠道",
    };
  },
  mounted() {
    // 饼图
    let mychart = echarts.init(this.$refs.charts);
    mychart.setOption({
      title:{
        text:'视频',
        subtext:1048,
        left:'center',
        top:'center',
      },
      tooltip: {
        trigger: "item",
      },
      // legend: {
      //   top: "5%",
      //   left: "center",
      // },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: true,
            position: "outside",
          },
          // 放大效果
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: "40",
          //     fontWeight: "bold",
          //   },
          // },
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "视频" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });
    // 绑定事件
      mychart.on('mouseover',(param)=>{
        // 获取鼠标移上去的那条数据
        const {name,value} = param.data;
        // 重新设置标题
        mychart.setOption({
          title:{
            text:name,
            subtext:value,
          }
        })
      })
  },
};
</script>

<style scoped>
.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header {
  border-bottom: 1px solid #eee;
}
.charts{
  width: 100%;
  height: 300px;
}
</style>
