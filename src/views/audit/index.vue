<template>
  <el-card class="app-container">
    <x-table
      :headers="{
        'title':'主题'
      }"
    />
  </el-card>
</template>

<script>
import XTable from '@/vue-xlib/XTable/x-table'
export default {
  name: 'Audit',
  components: { XTable }
}
</script>

<style scoped>

</style>
