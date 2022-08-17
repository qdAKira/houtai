<template>
  <div>
    <!-- inline:代表的是行内表单，代表一行可以放置多个表单元素 -->
    <el-form :inline="true" class="demo-form-inline":model="cForm">
      <el-form-item label="一级分类">
        <el-select  placeholder="请选择"v-model="cForm.category1id"@change="handler1">
          <el-option :label="c1.name" :value="c1.id"v-for="(c1,index) in list1":key="c1.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select  placeholder="请选择"v-model="cForm.category2id"@change="handler2">
          <el-option :label="c2.name" :value="c2.id"v-for="(c2,index) in list2":key="c2.id"></el-option>
          
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select  placeholder="请选择"v-model="cForm.category3id"@change="handler3">
          <el-option :label="c3.name" :value="c3.id"v-for="(c3,index) in list3":key="c3.id"></el-option>
    
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      // 一级分类的数据
      list1:[],
      // 二级级分类的数据
      list2:[],
      // 三级级分类的数据
      list3:[],
      // 收集相应的一级二级三级分类的id
      cForm:{
        category1id:"",
        category2id:"",
        category3id:"",
      }
    }
  },
  // 组件挂载完毕：向服务器发请求，获取相应的一级分类的数据
  mounted() {
    // 获取相应的一级分类的数据的方法
    this.getCategory1List();
  },
  methods: {
    // 获取一级分类数据的方法
    async getCategory1List(){
    // 获取一级分类的请求：不需要携带参数
     let reslut = await this.$API.attr.reqCategory1List();
     if(reslut.code ==200){
      this.list1 = reslut.data
     }
    },
    // 一级分类的select事件回调（当一级分类的optin发生变化的时候获取相应二级分类的数据）
    async handler1(){
      // 清除二级，三级数据
      this.list2 = [];
      this.list3 = [];
      this.cForm.category2id='';
      this.cForm.category3id='';

      // 解构出一级分类的id
      const {category1id} = this.cForm;
      this.$emit('getCategoryId',{categoryid:category1id,level:1});
      let reslut = await this.$API.attr.reqCategory2List(category1id);
      if(reslut.code ==200){
        this.list2 = reslut.data
      }
    },
    // 二级分类的select事件回调（当二级分类的optin发生变化的时候获取相应三级分类的数据）
    async handler2(){
      // 清除三级分类数据
      this.list3 = [];
      this.cForm.category3id = '';
      // 解构出二级分类的id
      const {category2id} = this.cForm;
      this.$emit('getCategoryId',{categoryid:category2id,level:2})
      let reslut = await this.$API.attr.reqCategory3List(category2id);
      if(reslut.code ==200){
        this.list3 = reslut.data
      }
    },
    // 三级分类的事件回调
    handler3(){
      const {category3id} = this.cForm;
      this.$emit('getCategoryId',{categoryid:category3id,level:3});
    }
  },
};
</script>

<style>
</style>
