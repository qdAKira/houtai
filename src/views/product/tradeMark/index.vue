<template>
  <div>
    <!-- 按钮 -->
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0px"
      @click="showDiog"
      >添加</el-button
    >
    <!-- 表格组件 
          data:表格组件将来需要展示的数据
          border:是给表格添加边框
          colum属性
          label：显示标题
          width:对应列的宽度
          align:标题的对齐方式
          prop:对应列内容的字段名
          注意1：elementUI当中的table组件，展示的数据是以一列一列进行展示数据

    -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updataTradeMark"
            >修改</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器
        当前第几页、数据总条数、每一页展示条数、连续页码数
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"

        current-page:代表的是当前第几页
        total:代表分页器一共需要展示数据条数
        page-size:代表可以设置每一页需要展示多少条数据
        page-sizes:代表可以设置每一页展示多少条数据
        layout:可以实现分页器布局（->：将内容放到最右侧）
        page-count:展示多少个页码，设置连续页码数
     -->
    <el-pagination
      style="margin-top: 20px; textalign: center"
      :current-page="6"
      :page-sizes="[3, 5, 10]"
      :page-size="10"
      :page-count="7"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="99"
      @current-change="getPageList"
      @size-change="handleSizeChange"
    >
    </el-pagination>

    <!-- 对话框 
        visible.sync：控制对话框显示与隐藏
        label-width：设置标题宽度
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <!-- form表单 -->
      <el-form style="width: 80%">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      // 代表分页器第几页
      page: "1",
      // 当前页数展示数据条数
      limit: "3",
      // 总共数据条款
      total: 0,
      // 列表展示的数据
      list: [],
      // 对话框显示与隐藏的控制
      dialogFormVisible: false,
      // 上传图片使用的途径
      imgUrl:'',
    };
  },
  mounted() {
    // 获取列表数据方法
    this.getPageList();
  },
  methods: {
    // 获取品牌列表的数据
    async getPageList(pager = 1) {
      this.page = pager;
      // 解构出参数
      const { page, limit } = this;
      // 获取品牌列表的接口
      let reslut = await this.$API.tradeMark.reqTradeMark(page, limit);
      if (reslut.code == 200) {
        // 分别是展示数据总条数与列表展示的数据
        this.total = reslut.data.total;
        this.list = reslut.data.records;
      }
    },
    //当分页器某一页需要展示数据条数发生变化的时候触发
    handleSizeChange(limit) {
      // 整理参数
      this.limit = limit;
      this.getPageList();
    },
    // 点击添加品牌的按钮
    showDiog() {
      // 显示对话框
      this.dialogFormVisible = true;
    },
    // 修改品牌的按钮
    updataTradeMark() {
      // 显示对话框
      this.dialogFormVisible = true;
    },
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    
  },
  // handleCurrentChange(pager){
  //   this.page = pager;
  //   this.getPageList()
  // },
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
