<template>
  <div>
    <!-- Row 组件 提供 gutter 属性来指定每一栏之间的间隔，默认间隔为 0 -->
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card>
          <Search></Search>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <Category></Category>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Category from './Category'
import Search from './Search'
export default {
  name:'Observe',
  components:{
    Category,
    Search,
  }
}
</script>

<style>

</style>