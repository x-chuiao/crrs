<template>
  <el-card class="app-container">
    <x-table
      :headers="{
        'title':'主题',
        'description':'介绍',
        'author':'作者',
        time:'时间'
      }"
      :operable="true"
      :min-width="{
        description:'150px',
        operate:'100px'
      }"
      url="/works/list"
    >
      <template v-slot:author="{row}">
        <Authors :row="row" />
      </template>

      <x-table-column
        width="50px"
        label="文件"
      >
        <template>
          <el-link type="primary">下载</el-link>
        </template>
      </x-table-column>

      <template v-slot:operate>
        <el-button type="success">通过</el-button>
        <el-button type="danger">驳回</el-button>
      </template>
    </x-table>
  </el-card>
</template>

<script>
import XTable from '@/vue-xlib/XTable/x-table'
import XTableColumn from '@/vue-xlib/XTable/x-table-column'
import Authors from '@/views/component/Authors'
export default {
  name: 'Audit',
  components: { Authors, XTableColumn, XTable }
}
</script>

<style scoped>

</style>
