<template>
  <el-select :value="value&&value.toString()||value" @change="$emit('change', $event)">
    <el-option
      label="男"
      value="1"
    />
    <el-option
      label="女"
      value="0"
    />
  </el-select>
</template>

<script>

export default {
  name: 'XSexSelect',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: ['value']
}
</script>

<style scoped>

</style>
