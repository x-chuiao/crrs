<template>
  <el-card class="app-container">
    <x-table
      :headers="{
        'username':'登录名',
        'realname':'姓名',
        'tel':'联系方式',
        'email':'邮箱',
        'intro':'简介'
      }"
      url="/user/list"
      :operable="true"
      :min-width="{operate:'150px'}"
    >
      <template v-slot:operate>
        <el-button>停用</el-button>
        <el-button>分配权限</el-button>
        <el-button>修改密码</el-button>
      </template>
    </x-table>
  </el-card>
</template>

<script>
import XTable from '@/vue-xlib/XTable/x-table'
export default {
  name: 'UserManagement',
  components: { XTable }
}
</script>

<style scoped>

</style>
