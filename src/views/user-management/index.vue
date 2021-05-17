<template>
  <el-card class="app-container">
    <x-table
      :headers="{
        'username':'登录名',
        'realname':'姓名',
        'tel':'联系方式',
        'email':'邮箱',
        'isValid':'启用'
      }"
      :edit="{
        'realname':true,
        'tel':true,
        'email':true,
      }"
      :align="{isValid:'center'}"
      url="/user/list"
      :operable="true"
      :min-width="{operate:'150px'}"
      :save-clicked="true"
    >
      <template v-slot:isValid="{row}">
        <el-checkbox v-model="row.isValid" @change="handleIsValid(row)">{{ row.isValid ? '是':'否' }}</el-checkbox>
      </template>
      <template v-slot:operate="{row}">
        <el-button type="primary" @click="modPermission(row)">分配权限</el-button>
        <el-button type="primary" @click="modPassword(row)">修改密码</el-button>
      </template>
    </x-table>
    <el-dialog
      title="权限分配"
      :visible.sync="permissionDialogVisible"
      width="30%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="permissionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="permissionDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="修改密码"
      :visible.sync="passwordDialogVisible"
      width="30%"
    >
      <x-form
        label-width="40px"
        :headers="{password:'密码',confirm:'确认'}"
        :item-class="{password:'x-form-item',confirm:'x-form-item'}"
        :item-type="{password:'password',confirm:'password'}"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="passwordDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="passwordDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import XTable from '@/vue-xlib/XTable/x-table'
import XForm from '@/vue-xlib/XForm'
export default {
  name: 'UserManagement',
  components: { XForm, XTable },
  data() {
    return {
      permissionDialogVisible: false,
      passwordDialogVisible: false
    }
  },
  methods: {
    stopAccount() {

    },
    modPermission() {
      this.permissionDialogVisible = true
    },
    modPassword() {
      this.passwordDialogVisible = true
    },
    handleIsValid(row) {
      if (!row.isValid) {
        alert('是否禁用')
      }
    }
  }
}
</script>

<style>
.x-form-item input{
  background-color: #feffe6
}
</style>
