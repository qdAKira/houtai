<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <el-button type="primary">添加属性</el-button>
      <!-- 表格：展示平台属性 -->
      <el-table :data="data" style="width: 100%">
        <el-table-column prop="prop" label="label" width="width">
        </el-table-column>
      </el-table>
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
        // 发请求获取品牌属性
        this.getAttrList();
      }
    },
    getAttrList() {
      console.log("发请求");
    },
  },
};
</script>

<style></style>
