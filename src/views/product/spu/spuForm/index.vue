<template>
  <el-form ref="form" label-width="80px" :model="spu">
    <el-form-item label="SPU名称">
      <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
    </el-form-item>
    <el-form-item label="品牌">
      <el-select placeholder="请选择品牌" v-model="spu.tmId">
        <el-option :label="tm.tmName" :value="tm.id" v-for="(tm,index) in tradeMarkList" :key="tm.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述" >
      <el-input type="textarea" rows="4" placeholder="描述"v-model="spu.description"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <!--上传图片，action：图片上传地址  list-type:文件列表的类型 :on-preview:图片预览的时候会出发  on-remove:当删除图片的时候会触发
          file-list
       -->
      <el-upload
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="spuImageList"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select placeholder="还有3未选择" value="">
        <el-option label="label" value="value"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus">添加销售属性</el-button>
      <el-table style="width: 100%" border>
        <el-table-column type="index" label="序号" width="width" align="center">
        </el-table-column>
        <el-table-column prop="prop" label="属性名" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="属性值名称列表" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="$emit('changeScene', 0)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // spu属性初始化的时候是一个空的对象,在修改SPU的时候，会向服务器发请求，返回SPU信息（对象），在修改的时候可以利用服务器返回的这个对象收集最新的数据交给服务器
      // 添加spu，如果是添加spu的时候并没有向服务器发请求，数据收集到哪里{spu},收集数据的时候有哪些字段，看文档

      spu: {
        // 三级分类的id
        category3Id: 0,
        // 描述
        description: "",
        // spu名称
        spuName: "string",
        // 品牌的id
         tmId: 0,
        // 收集spu图片信息
        spuImageList: [
          {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            spuId: 0,
          },
        ],
        // 平台数据和属性值的收集
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
       
      },
      tradeMarkList: [], //存储品牌信息
      spuImageList: [], //存储spu图片的信息
      saleAttrList: [], //销售属性的数据
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 初始化spuForm数据
    async initSpuData(spu) {
      // 获取spu信息
      let spuReslut = await this.$API.spu.reqSpu(spu.id);
      if (spuReslut.code == 200) {
        // 在修改spu的时候，需要向服务器发请求的，把服务器返回的数据（对象），赋值给spu属性
        this.spu = spuReslut.data;
      }
      // 获取品牌信息
      let tradeReslut = await this.$API.spu.reqTradeMarkList();
      if (tradeReslut.code == 200) {
        this.tradeMarkList = tradeReslut.data;
      }
      // 获取图片信息
      let spuImageReslut = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageReslut.code == 200) {
        // 由于照片墙显示图片的数据需要数组，数组里面的元素需要有name与url字段
        // 需要把服务器返回的数据进行修改
        let listArr = spuImageReslut.data;
        listArr.forEach(item => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        // 把整理好的数据赋值给
        this.spuImageList = listArr;
      }
      // 获取平台全部的销售属性
      let saleReslut = await this.$API.spu.reqBaseSaleAttrList();
      if (saleReslut.code == 200) {
        this.saleAttrList = saleReslut.data;
      }
    },
  },
};
</script>

<style></style>
