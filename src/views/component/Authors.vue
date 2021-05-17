<template>
  <div>
    <el-tag type="primary">
      <el-link @click="handleAuthorClick(row)">{{ row.author.map(i=>i.authorName).join(',') }}</el-link>
    </el-tag>
    <el-dialog
      v-if="dialogVisible"
      title="作者信息"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <x-table
        :headers="{
          username:'账号',
          authorName:'作者姓名',
          authorTel:'联系方式'
        }"
        :data-source="row.author"
      />
    </el-dialog>
  </div>
</template>

<script>
import XTable from '@/vue-xlib/XTable/x-table'
export default {
  name: 'Authors',
  components: { XTable },
  props: ['row'],
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleAuthorClick() {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
