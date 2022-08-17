<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div>
         <el-button type="primary"icon="el-icon-plus"style="margin:5px 0px">添加属性</el-button>
      <!-- 表格：展示平台属性 :data="data"-->
      <el-table style="width: 100%" border :data="attrList">
        <el-table-column type="index"label="序号" width="80"align="center">
        </el-table-column>
        <el-table-column prop="attrName" label="属性名称" width="150">
        </el-table-column>
        <el-table-column prop="prop" label="属性值列表" width="width">
          <!-- 自定义列模板 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考 demo。-->
          <template slot-scope="{row,$index}">
            <el-tag type="success"v-for="(attrValue,index) in row.attrValueList":key="attrValue.id"style="margin:0px 20px">{{attrValue.valueName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="150">
          <template slot-scope="{row,$index}">
            <el-button type="warning"icon='el-icon-edit'size="mini"></el-button>
            <el-button type="danger"icon='el-icon-delete'size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Attr",
  data() {
    return {
      category1id: "",
      category2id: "",
      category3id: "",
      // 接收平台属性字段
      attrList:[]
    };
  },
  methods: {
    // 自定义事件回调
    getCategoryId({ categoryid, level }) {
      // 区分三级分类相对应的id,以及父组件进行存储
      if (level == 1) {
        this.category1id = categoryid;
        this.category2id = "";
        this.category3id = "";
      } else if (level == 2) {
        this.category2id = categoryid;
        this.category3id = "";
      } else {
        // 代表三级分类的id有了
        this.category3id = categoryid;
        // 发请求获取品牌属性的数据
        this.getAttrList();
      }
    },
    // 当用户确定三级分类的数据时候，可以向服务器发请求获取平台属性进行展示
   async getAttrList() {
      const {category1id,category2id,category3id} = this;
      let reslut = await this.$API.attr.reqAttrList(category1id,category2id,category3id);
      if(reslut.code ==200){
        this.attrList = reslut.data
      }
    },
  },
};
</script>

<style></style>
