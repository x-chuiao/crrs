<template>
  <el-table-column
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot="scope">
      <slot v-bind="parseScope(scope)">
        <XTableCell
          :scope="scope"
        >
          <!--        <template v-slot="data">-->
          <!--          <slot :scope="data" />-->
          <!--        </template>-->
        </XTableCell>
      </slot>
    </template>
  </el-table-column>
</template>

<script>
import XTableCell from './x-table-cell'
import '../util'
export default {
  name: 'XTableColumn',
  components: { XTableCell },
  props: {
    editable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    parseScope(scope) {
      scope.column.editable = this.editable
      return scope
    }
  }
}
</script>
