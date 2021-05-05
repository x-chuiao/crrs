<template>
  <el-select
    :value="value&&value.toString()||value"
    v-bind="$attrs"
    v-on="$listeners"
    @change="$emit('change', $event)"
  >
    <el-option
      v-for="i of _options"
      :key=" i[0] "
      :label=" i[1] || i[0] "
      :value=" i[0]"
    >
      <slot v-bind="i" />
    </el-option>
  </el-select>
</template>

<script>

export default {
  name: 'XSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: ['value', 'options'],
  data() {
    return { ops: {}}
  },
  computed: {
    _options: {
      get: function() {
        // [1,2,3]=>value:label,0:1,1:2
        // {k:v}=>value:label,k:v
        const ops = this.options || this.ops
        return Object.entries(ops)
      },
      set: function(val) {
        this.ops = val
      }
    }
  },
  watch: {
    // options: function(val) {
    //   console.log('options', val)
    // }
  }
}
</script>

<style scoped>

</style>
