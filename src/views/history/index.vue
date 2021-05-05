<template>
  <el-card class="app-container">
    <x-table
      :headers="{
        'title':'标题'
      }"
    />
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
