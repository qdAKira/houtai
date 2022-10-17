<template>
  <div>
    <el-card class="box-card" style="margin: 10px 0px">
      <div slot="header" class="clearfix">
        <!-- 头部左侧内容 -->
        <el-tabs v-model="activeName" class="tab">
          <el-tab-pane label="销售额" name="first" @click="changeFirst"></el-tab-pane>
          <el-tab-pane label="访问量" name="second"></el-tab-pane>
        </el-tabs>
        <!-- 头部右侧内容 -->
        <div class="right">
          <span>今日</span>
          <span>本周</span>
          <span>本月</span>
          <span>本年</span>
          <!-- 日期选择 v-model="value1"-->
          <el-date-picker
            class="date"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          >
          </el-date-picker>
        </div>
      </div>
      <!-- 内容区 -->
      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <!-- 准备容器 -->
            <div class="charts" ref="charts"></div>
          </el-col>
          <el-col :span="6">
            <div>
              <span>门店{{title}}排名</span>
              <ul>
                <li>
                  <span class="rindex">0</span>
                  <span style="margin-left:20px">肯德基</span>
                  <span style="float:right">12345</span>
                </li>
                <li>
                  <span class="rindex">1</span>
                  <span style="margin-left:20px">肯德基</span>
                  <span style="float:right">12345</span>
                </li>
                
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入echarts
import echarts from "echarts";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
   changeFirst(){

   }
  },
  mounted() {
    // 初始化echarts实例
    this.mycharts = echarts.init(this.$refs.charts);
    // 配置数据
    this.mycharts.setOption({
      title:{
        text:this.title+'趋势',
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
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
          data: ["一月", "二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220,12,313,121,333,112],
          color:'yellowgreen'
        },
      ],
    });
  },
  computed:{
    // 计算属性-标题
    title(){
      return this.activeName == 'first'?'销售额':'访问量'
    }

    
  },
  // 监听属性
  watch:{
    title(){
      // 重新修改图标的配置数据
      // 图标配置数据可以再次修改，如果有新的数值，用新的数值，没有新的数值，还是用之前的
      this.mycharts.setOption({
        title:{
          text:this.title+'趋势'
        }
      })
    }
  }
};
</script>

<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.date {
  width: 200px;
  margin: 0px 20px;
}
.right span {
  margin: 0 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul{
  list-style: none;
  width:100%;
  height: 300px;
}
ul li{
  height: 8%;
  margin: 10px 0;
}
.rindex{
  float: left;
  width:15px;
  height: 15px;
  border-radius: 50%;
  background-color: black;
  color:white;
  text-align: center;
}
</style>
