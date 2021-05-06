<template>
  <el-card class="app-container">
    <x-table
      :headers="{
        'title':'主题',
        'description':'介绍',
        'author':'作者',
      }"
      operable
      url="/works/list"
    >
      <template v-slot:operate>
        <el-button>再次申请</el-button>
      </template>
    </x-table>
  </el-card>
</template>

<script>
import XTable from '@/vue-xlib/XTable/x-table'
export default {
  name: 'History',
  components: { XTable }
}
</script>

<style scoped>

</style>
