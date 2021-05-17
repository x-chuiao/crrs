<template>
  <el-card class="app-container">
    <el-form v-model="form" label-position="left">
      <el-form-item label="作品类型" label-width="100px">
        <x-select
          :value="form.worksType"
          :options="['文学','软件','音乐']"
        />
      </el-form-item>
      <el-form-item label="主题" label-width="100px">
        <el-input v-model="form.title" style="width: 50%" />
      </el-form-item>
      <el-form-item label="展示图片" label-width="100px">
        <el-upload
          ref="pics"
          action="/upload"
          list-type="picture-card"
          :auto-upload="false"
          :file-list="fileList"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="源文件" label-width="100px">
        <el-upload
          ref="mainFile"
          class="upload-demo"
          action="/upload"
          :file-list="picList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="辅助材料" label-width="100px">
        <el-upload
          ref="supplyFile"
          class="upload-demo"
          action="/upload"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="创作人" label-width="100px">
        <x-table
          :headers="{
            username:'账号',
            authorName:'作者姓名',
            authorTel:'联系方式'
          }"
          :data-source="authors"
          :add-form-on="true"
          :del-clicked="true"
          style="width: 61.8%"
        />
      </el-form-item>

      <el-form-item label="介绍" label-width="100px">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>

      <el-form-item style="float: right">
        <el-button type="danger">重置</el-button>
        <el-button type="primary" @click="register">立即登记</el-button>
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
      form: {
        worksType: '',
        title: '',
        description: ''
      },
      fileList: [],
      picList: [],
      authors: [this.$store.state.user]
    }
  },
  methods: {
    register() {
      this.$refs.pics.submit()
      this.$refs.mainFile.submit()
      this.$refs.supplyFile.submit()
      console.log(this.picList)
    }
  }
}
</script>

<style scoped>

</style>
