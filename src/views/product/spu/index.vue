<template>
  <div>
    <el-card style="margin:20px 0px">
      <!-- 三级联动已经是全局组件 -->
      <CategorySelect @getCategoryId="getCategoryId" :show="!show"/>
    </el-card>
    <el-card>
      <!-- 这部分将有3部分进行切换 -->
      <div>
        <!-- 展示spu列表的结构 -->
        <el-button type="primary"icon="el-icon-plus">添加SPU</el-button>
        <el-table style="width: 100%" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="prop"label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="prop"label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop"label="操作" width="width">
            <template slot-scope="{row,$index}">
              <!-- 这里的按钮将来用hintButton替换 -->
              <el-button type="success"icon="el-icon-plus"size="mini"></el-button>
              <el-button type="warning"icon="el-icon-edit"size="mini"></el-button>
              <el-button type="info"icon="el-icon-info"size="mini"></el-button>
              <el-button type="danger"icon="el-icon-delete"size="mini"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- @size-change="handleSizeChange" -->
          <!-- @current-change="handleCurrentChange" -->
        <el-pagination
          style="text-align:center"
          :current-page="3"
          :page-sizes="[3, 5, 10]"
          :page-size="3"
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total="23">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Spu",
  data() {
    return {
      // 分别是几级id
      category1id: "",
      category2id: "",
      category3id: "",
      // 控制三级联动的可操作性
      show:true,
      page:1, //当前第几页
      limit:3, //每一页需要展示多少条数据
      records:[],
      

    }
  },
  methods:{
    // 三级联动的自定义事件，可以把子组件的id传递给父组件
    getCategoryId({categoryid,level}){
      // categoryid:获取到一、二、三级分类的id，level:为了区分是几级id
      if(level==1){
        this.category1id = categoryid;
        //清除2，3级分类的id
        this.category2id = '';
        this.category3id = '';
      }else if(level ==2){
        this.category2id = categoryid;
        // 清除3级分类的id
        this.category3id = '';
      }else{
        this.category3id = categoryid
        // 获取SPU列表数据进行展示
        this.getSpuList()
      }
    },
    // 获取SPU列表数据的方法
    getSpuList(){
      const {page,limit,category3id} = this;
      // 携带3个参数：page 第几页  limit 每一页需要展示多少条数据 三级分类id

     let reslut =  this.$API.spu.reqSpuList(page,limit,category3id);
     console.log(reslut);
    }
  },

};
</script>

<style></style>
