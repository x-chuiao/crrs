<template>
  <el-card class="app-container">
    <el-form label-position="left">
      <el-form-item label="作品类型" label-width="100px">
        <x-select
          :options="['文学','软件','音乐']"
        />
      </el-form-item>
      <el-form-item label="主题" label-width="100px">
        <el-input style="width: 50%" />
      </el-form-item>
      <el-form-item label="展示图片" label-width="100px">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="源文件" label-width="100px">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="辅助材料" label-width="100px">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="创作人" label-width="100px">
        <x-table
          :headers="{
            authorName:'作者姓名',
            authorTel:'联系方式'
          }"
          :add-form-on="true"
          :del-clicked="true"
          style="width: 50%"
        />
      </el-form-item>

      <el-form-item label="介绍" label-width="100px">
        <el-input type="textarea" />
      </el-form-item>

      <el-form-item style="float: right">
        <el-button type="danger">重置</el-button>
        <el-button type="primary">立即登记</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<script>
import XSelect from '@/vue-xlib/XSelect'
import XTable from '@/vue-xlib/XTable/x-table'
export default {
  name: 'WorksDetail',
  components: { XTable, XSelect },
  data() {
    return {
      fileList: []
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
