<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      label-width="10%"
      label-position="left"
    >
      <!--      todo:validate-->
      <el-form-item label="账号">
        <el-input v-model="form.accId" :disabled="true" style="width: 60%" />
      </el-form-item>
      <el-form-item label="原密码">
        <el-input v-model="form.accOldPwd" placeholder="请输入原密码" show-password style="width: 60%" />
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="form.accNewPwd" placeholder="请输入新密码" show-password style="width: 60%" />
      </el-form-item>
      <el-form-item label="再次输入">
        <el-input v-model="confirmPwd" placeholder="请再次输入新密码" show-password style="width: 60%" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="margin-left: 40%" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as user from '@/api/user'
import store from '@/store'

export default {
  data() {
    return {
      form: {
        accId: store.getters.accId,
        accOldPwd: '',
        accNewPwd: ''
      },
      confirmPwd: ''
    }
  },
  methods: {
    async  postAccount() {
      const response = await user.postAccount(this.form)
      console.log('postAccount', response)
      // Msg(response)
    },
    onSubmit() {
      if (this.confirmPwd === this.form.accNewPwd) {
        this.postAccount(this.form)
      } else {
        this.$message.error('密码不一致')
      }
    }
  }
}
</script>

<style>

  .el-form-item__label {
    min-width: 80px;
  }
</style>

