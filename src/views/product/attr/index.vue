<template>
  <div>
    <el-card style="margin:20px 0px">
      <CategorySelect @getCategoryId="getCategoryId"/>
    </el-card>
    <el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'Attr',
  data() {
    return {
      category1id:'',
      category2id:'',
      category3id:'',
    }
  },
  methods: {
    // 自定义事件回调
    getCategoryId({categoryid,level}){
      // 区分三级分类相对应的id,以及父组件进行存储
      if(level == 1){
        this.category1id = categoryid;
        this.category2id = '';
        this.category3id = ''
      }else if(level == 2){
        this.category2id = categoryid;
        this.category3id = '';
      }else{
        // 代表三级分类的id有了
        this.category3id = categoryid;
        // 发请求获取品牌属性
        this.getAttrList()
      }
    },
    getAttrList(){
      console.log('发请求');
    }
  },
}
</script>

<style>

</style>