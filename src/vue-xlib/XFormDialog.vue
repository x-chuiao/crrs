<template>
  <el-dialog
    :visible.sync="addDialogVisible"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form
      :model="form"
      v-bind="formConf.form"
    >
      <el-form-item
        v-for="key in Object.keys(formConf.headers)"
        :key="key"
        :prop="key"
        :label="formConf.headers[key]"
      >
        <slot :name="key" :form="form">
          <el-input v-model="form[key]" />
        </slot>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm">确 定</el-button>
      <el-button @click="addDialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'XFormDialog',
  model: {
    prop: 'model',
    event: 'confirm'
  },
  props: ['form', 'formConf'],
  data() {
    return {
      addDialogVisible: false
    }
  },
  methods: {
    confirm() {
      if (this.formConf.converter) {
        this.form = this.formConf.converter(this.form)
      }
      this.$emit('confirm', this.form)
      this.addDialogVisible = false
    },
    show() {
      this.addDialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
