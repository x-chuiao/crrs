<template>
  <el-card class="app-container">
    <x-table
      :headers="{
        title:'主题',
        sendTime:'发送时间',
      }"
      url="/message/list"
    >
      <template v-slot:title="{row}">
        <el-link type="primary" @click="gotoDetail(row)">
          <span>{{ row.title }}</span>
        </el-link>
      </template>
    </x-table>
  </el-card>
</template>

<script>
import XTable from '@/vue-xlib/XTable/x-table'
export default {
  name: 'Message',
  components: { XTable },
  methods: {
    gotoDetail(row) {
      this.$router.push({ name: 'MessageDetail', params: { ...row }})
    }
  }
}
</script>

<style scoped>

</style>
