<template>
  <div>
    <el-card style="margin:20px 0px">
      <!-- 三级联动已经是全局组件 -->
      <CategorySelect @getCategoryId="getCategoryId" :show="!show"/>
    </el-card>
    <el-card>
      <!-- 这部分将有3部分进行切换 -->
      <div v-show="scene==0">
        <!-- 展示spu列表的结构 -->
        <el-button type="primary"icon="el-icon-plus" :disabled="!category3id" @click="addSpu">添加SPU</el-button>
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName"label="spu名称" width="width">
          </el-table-column>
          <el-table-column prop="description"label="spu描述" width="width">
          </el-table-column>
          <el-table-column prop="prop"label="操作" width="width">
            <template slot-scope="{row,$index}">
              <!-- 这里的按钮将来用hintButton替换 -->
              <hint-button type="success"icon="el-icon-plus"size="mini" title="添加spu"></hint-button>
              <hint-button type="warning"icon="el-icon-edit"size="mini"title="修改spu" @click="updateSpu(row)"></hint-button>
              <hint-button type="info"icon="el-icon-info"size="mini" title="查看当前spu全部列表"></hint-button>
              <hint-button type="danger"icon="el-icon-delete"size="mini" title="删除spu"></hint-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- @size-change="handleSizeChange" -->
          <!-- @current-change="handleCurrentChange" -->
        <el-pagination
          style="text-align:center"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="1"
          :page-sizes="[3, 5, 10]"
          :page-size="limit"
          layout=" prev, pager, next, jumper,->,sizes,total"
          :total="total">
        </el-pagination>
      </div>
      <!-- 展示添加spu|修改spu结构 -->
      <SpuForm v-show="scene==1"@changeScene="changeScene" ref="spu"></SpuForm>
      <!-- 展示添加sku结构 -->
    <SkuForm v-show="scene==2"></SkuForm>
    </el-card>
  </div>
</template>

<script>
// 引入子组件
import SkuForm from './skuForm'
import SpuForm from './spuForm'
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
      records:[], //存储spu列表的数据
      total:0, //分页器一共需要展示数据的条数
      scene:1, //0代表展示spu列表数据  1代表展示添加spu|修改spu结构  2代表展示添加sku结构

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
    async getSpuList(){
      const {page,limit,category3id} = this;
      // 携带3个参数：page 第几页  limit 每一页需要展示多少条数据 三级分类id

     let reslut =  await this.$API.spu.reqSpuList(page,limit,category3id);
     if(reslut.code == 200){
      this.total = reslut.data.total;
      this.records = reslut.data.records
     }
    },
  // 点击分页器第几页按钮的回调
    handleCurrentChange(page){
      this.page = page;
      this.getSpuList()
    },
  // 当分页器的某一页展示数据的条数发生变化的回调
    handleSizeChange(limit){
      // 修改参数
      this.limit = limit;
      // 发请求
      this.getSpuList();
    },
    // 添加spu按钮的回调
    addSpu(){
      this.scene = 1;
    },
    // 修改某一个spu
    updateSpu(row){
      this.scene = 1;
      // 获取子组件spuform子组件的数据
      // 在父组件当中可以通过$ref获取子组件等等
      this.$refs.spu.initSpuData(row);
    },
    // 自定义事件回调（spuForm）
    changeScene(scene){
      this.scene = scene;
    }
  },
  components:{
    SkuForm,
    SpuForm
  },
  // 组件挂载完毕
  mounted() {
    
  },
};
</script>

<style></style>
