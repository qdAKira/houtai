<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 5px 0px"
          :disabled="!category3id"
          @click="addAttr"
          >添加属性</el-button
        >
        <!-- 表格：展示平台属性 :data="data"-->
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <!-- 自定义列模板 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考 demo。-->
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(attrValue, index) in row.attrValueList"
                :key="attrValue.id"
                style="margin: 0px 20px"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updataAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性|修改属性的解构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addAtteValue"
          :disabled="!attrInfo.attrName"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          style="width: 100%; margin: 20px 0px"
          border
          :data="attrInfo.attrValueList"
        >
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{ row, $index }">
              <!-- 这里结构需要用到input和span来回切换 -->
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="tolook(row)"
                @keyup.native.enter="tolook(row)"
              ></el-input>
              <span v-else @click="toEdit(row)" style="display: block">{{
                row.valueName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
// 按需引入lodash当中的深拷贝
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1id: "",
      category2id: "",
      category3id: "",
      // 接收平台属性字段
      attrList: [],
      // 这个属性控制table表格显示与隐藏
      isShowTable: true,
      // 收集新增属性|修改属性使用
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          //属性名中属性值，因为属性值可以是多个，因此需要的是数组
          // {
          //   attrId:0,//相应的属性名的id
          //   valueName:''
          // }
        ],
        categoryId: 0, //携带category3id
        categoryLevel: 3, //3,因为服务器也需要区分几级id
      },
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
      const { category1id, category2id, category3id } = this;
      let reslut = await this.$API.attr.reqAttrList(
        category1id,
        category2id,
        category3id
      );
      if (reslut.code == 200) {
        this.attrList = reslut.data;
      }
    },
    // 添加属性值回调
    addAtteValue() {
      // 向属性值的数组里面添加元素
      this.attrInfo.attrValueList.push({
        // attrId:是你相应的属性的id,目前而言我们是添加属性的操作，还没有相应的属性id，目前而言带给服务器的id为undefined
        //  valueName:相应属性值名称
        attrId: this.attrInfo.id, //对于修改某一属性的时候，可以在已有的属性值基础上新增新的属性值（新增属性值的时候，需要把已有的属性的id）
        valueName: "",
        // flag属性，给每一个属性值添加一个标记flag,用户切换查看模式与编辑模式，好处，每一个属性值可以控制自己的模式切换
        // 当前flag属性,响应式数据(数据变化视图跟着变化)
        flag: true,
      });
    },
    // 添加属性按钮的回调
    addAttr() {
      // 切换table显示与隐藏
      this.isShowTable = false;
      // 收集三级分类的id

      // 清除数据
      this.attrInfo = {
        attrName: "", //属性名
        attrValueList: [
          //属性名中属性值，因为属性值可以是多个，因此需要的是数组
          // {
          //   attrId:0,//相应的属性名的id
          //   valueName:''
          // }
        ],
        categoryId: this.category3id, // 收集三级分类的id
        categoryLevel: 3, //3,因为服务器也需要区分几级id
      };
    },
    // 修改某一个属性
    updataAttr(row) {
      this.isShowTable = false;
      // 将选中的属性赋值给attrInfo
      // 由于数据结构当中存在对象里面套数组，数组里面套对象，因此需要使用深拷贝解决这类问题
      // 深拷贝，浅拷贝在面试的时候出现频率较高，要能手写
      this.attrInfo = cloneDeep(row);
      //在修改某一个属性的时候，将相应的属性值元素加上flag这个标记
      this.attrInfo.attrValueList.forEach((item) => {
        // 这样书写也可以给属性值添加flag字段，但是发现视图不会跟着变化（因为flag不是响应式数据）
        // 因为vue无法探测普通的新增property,这样书写的属性并非响应式属性（数据变化视图跟着变）
        // item.flag = false
        // 第一个参数：对象，第二个参数：添加新的响应式属性  第三参数：新的属性的属性值
        this.$set(item, "flag", false);
      });
    },
    // 失去焦点的事件---切换为查看模式,展示span
    tolook(row) {
      // 如果属性值为空不能作为新的属性值，需要给用户提示，让他输入一个其他的属性值
      if (row.valueName.trim() == "") {
        this.$message("请输入正常的属性值");
        return;
      }
      // 新增的属性值不能与已有的属性值重复
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        // 需要将row从数组里判断的时候去除
        // row最新新增的属性值【数组的最后一项元素】
        // 判断的时候，需要把已有的数组当中新增的属性值去除
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepat) return;
      // row:形参是当前用户添加的最新的属性值
      // 当前编辑模式变为查看模式【让input消失，显示span】
      row.flag = false;
    },
    // 点击span的回调，变为编辑模式
    toEdit(row) {
      row.flag = true;
    },
  },
};
</script>

<style></style>
