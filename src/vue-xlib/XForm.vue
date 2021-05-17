<template>
  <el-form
    v-bind="$attrs"
    v-on="$listeners"
  >
    <el-form-item
      v-for="key in parseColumn()"
      :key="key"
      :label="headers[key] || key"
      :prop="key"
    >
      <template v-slot="scope">
        <slot :name="key" v-bind="scope">
          <el-input v-model="value[key]" :type="itemType[key]" :class="itemClass[key]" />
        </slot>
      </template>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'XForm',
  props: {
    value: {
      type: Object,
      default: _ => ({})
    },
    headers: {
      type: Object,
      default: _ => ({})
    },
    editable: {
      type: Boolean,
      default: false
    },
    itemClass: {
      type: String,
      default: ''
    },
    itemType: {
      type: String,
      default: ''
    }
  },
  methods: {
    parseColumn() {
      if (this.headers && Object.keys(this.headers).length !== 0) {
        return Object.keys(this.headers)
      } else if (this.value && this.value.length !== 0) {
        return Object.keys(this.value[0])
      }
      return []
    }
  }
}
</script>

<style>

</style>
