<template>
  <el-form ref="form" label-width="80px" :model="spu">
    <el-form-item label="SPU名称">
      <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
    </el-form-item>
    <el-form-item label="品牌">
      <el-select placeholder="请选择品牌" v-model="spu.tmId">
        <el-option
          :label="tm.tmName"
          :value="tm.id"
          v-for="(tm, index) in tradeMarkList"
          :key="tm.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        rows="4"
        placeholder="描述"
        v-model="spu.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <!--上传图片，action：图片上传地址  list-type:文件列表的类型 :on-preview:图片预览的时候会出发  on-remove:当删除图片的时候会触发
          file-list:照片墙需要展示的数据（数据：数组里面的元素务必有name、url属性）
          on-preview：图片预览功能
       -->
      <el-upload
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="spuImageList"
        :on-success="handleSuccess"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrIdAndAttrName">
        <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="(unselect,index) in unSelectSaleAttr" :key="unselect.id"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
      <!-- 展示的是当前spu属于自己的销售属性 -->
      <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
        <el-table-column type="index" label="序号" width="width" align="center">
        </el-table-column>
        <el-table-column prop="saleAttrName" label="属性名" width="width">
        </el-table-column>
        <el-table-column prop="prop" label="属性值名称列表" width="width">
          <template slot-scope="{ row, $index }">
            <el-tag :key="tag.id" v-for="tag in row.spuSaleAttrValueList" closable :disable-transitions="false">{{ tag.saleAttrValueName }}</el-tag>
           <!-- 底下的结构可以当成之前span和input切换 -->
            <el-input
              class="input-new-tag"
              v-if="row.inputVisible"
              v-model="row.inputValue"
              ref="saveTagInput"
              size="small"
             
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              
              >添加</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="width">
          <template slot-scope="{row,$index}">
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
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
      attrIdAndAttrName:'', //收集未选择的销售属性id
    };
  },
  methods: {
    // 照片墙删除某一个图片的时候会触发
    handleRemove(file, fileList) {
      // file参数：代表的是删除的那个图片
      // fileList:照片墙删除某一张图片后，剩余的其他图片
      // console.log(file, fileList);
      // 收集照片墙图片的数据
      // 对于已有的图片【照片墙中显示的图片：有name、url字段的】，因为照片墙显示数据必要这两个属性
      // 对于服务器而言，不需要name、url字段，将来对于有的图片的数据在提交给服务器的时候，需要处理
      this.spuImageList = fileList;
    },
    // 照片墙图片预览回调
    handlePictureCardPreview(file) {
      // 将图片地址赋值给数组
      this.dialogImageUrl = file.url;
      // 对话框显示
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
        listArr.forEach((item) => {
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
    // 照片墙图片上传成功的回调
    handleSuccess(response, file, fileList){
      this.spuImageList = fileList
    },
    // 添加新的销售属性
    addSaleAttr(){
      // 已经收集需要添加的销售属性的信息
      // 把收集到的销售属性的数据进行分割
      const [baseSaleAttrId,saleAttrName] = this.attrIdAndAttrName.split(':');
      // 向spu对象spuSaleAttrList属性里面添加新的销售属性
      let newSaleAttr = {baseSaleAttrId,spuSaleAttrValueList:[],saleAttrName};
      // 添加新的销售属性
      this.spu.spuSaleAttrList.push(newSaleAttr)
    }
  },
  computed:{
    // 计算出还未选择的销售属性
    unSelectSaleAttr(){
      // 整个平台的销售属性一共三个，颜色，尺寸，版本  ----saleAttrList
      // 当前spu拥有的属于自己的销售属性 spu.spuSaleAttrList   ---颜色
      // 使用数组的过滤方法，可以从已有的数组当中过滤出用户需要的元素，并返回一个新的数据
      let reslut = this.saleAttrList.filter(item=>{
        // every 数组的方法，会返回一个布尔值【真，假】
        return this.spu.spuSaleAttrList.every(item1=>{
           return item.name != item1.saleAttrName
        })
      })

      return reslut
    }
  }
};
</script>

<style>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
