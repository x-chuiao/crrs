<template>
  <div class="app-container">
    <el-form
      ref="form"
      :model="form"
      show-message
      status-icon
      label-position="left"
      label-width="10%"
    >
      <el-form-item label="学号/工号">
        <el-input v-model="form.accId" style="width: 60%" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.username" style="width: 60%" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.usrSex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学院">
        <el-input v-model="academy" style="width: 60%" />
        <!--        <el-select v-model="form.stuAcademy" filterable placeholder="请选择">-->
        <!--          <el-option-->
        <!--            v-for="item in options"-->
        <!--            :key="item.value"-->
        <!--            :label="item.label"-->
        <!--            :value="item.value"-->
        <!--          />-->
        <!--        </el-select>-->
      </el-form-item>
      <el-form-item label="专业">
        <el-input v-model="form.stuMajor" style="width: 60%" />

        <!--        <el-select v-model="form.stuMajor" filterable placeholder="请选择">-->
        <!--          <el-option-->
        <!--            v-for="item in options"-->
        <!--            :key="item.value"-->
        <!--            :label="item.label"-->
        <!--            :value="item.value"-->
        <!--          />-->
        <!--        </el-select>-->
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.usrContact" style="width: 60%" />
      </el-form-item>
      <!--      <el-form-item label="简介">-->
      <!--        <el-input v-model="form.desc" type="textarea" style="width: 60%" />-->
      <!--      </el-form-item>-->
      <el-form-item>
        <el-button type="success" style="margin-left: 40%" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as user from '@/api/user'
import store from '@/store/index'
// import { Msg } from '@/utils/util'
export default {
  data() {
    return {
      form: {
        accId: store.getters.accId,
        stuAcademy: '',
        stuMajor: '',
        stuClass: '',
        username: '',
        usrSex: '',
        usrContact: '',
        usrType: store.getters.usrType,
        teaAcademy: ''
      }
    }
  },
  computed: {
    academy: {
      get: function f() {
        return this.form.stuAcademy || this.form.teaAcademy
      },
      set: function(val) {
        this.form.stuAcademy = this.form.teaAcademy = val
      }
    }
  },
  watch: {
    '$route.fullPath': function() {
      store.dispatch('user/getInfo').then(response => {
        this.form = response.data
      })
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      const response = await user.getInfo(this.form.accId)
      this.form = response.data
      console.log('getUser', response)
    },
    async postUser() {
      const response = await this.$store.dispatch('user/updateInfo', this.form)
      console.log('postUser', response)
      // Msg(response, '保存成功!')
    },
    onSubmit() {
      this.postUser()
    }
  }
}
</script>

<style>

.el-form-item__label {
  min-width: 80px;
}
</style>

