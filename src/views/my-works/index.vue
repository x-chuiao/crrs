<template>
  <el-card class="app-container">
    <x-table
      :headers="{
        'title':'主题',
        'mainFile':'源文件',
        'supplyFile':'辅助材料',
        'description':'介绍',
        'author':'作者',
      }"
    />
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
