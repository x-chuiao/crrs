<template>
  <el-card class="app-container">
    <x-table
      border
      :headers="{
        'title':'主题',
        'description':'介绍',
        'mainFile':'源文件',
        'supplyFile':'辅助材料',
        'author':'作者',
      }"
      url="/works/list"
      :min-width="{
        description:'200px'
      }"
      :operable="true"
    >
      <template v-slot:author="{row}">
        <el-tag type="primary">{{ row.author }}</el-tag>
      </template>
      <template v-slot:operate>
        <el-button type="primary">生成证书</el-button>
      </template>
    </x-table>
  </el-card>
</template>

<script>
import XTable from '@/vue-xlib/XTable/x-table'
export default {
  name: 'MyWorks',
  components: { XTable }
}
</script>

<style scoped>

</style>
