<template>
  <div>
    <div v-show="!editing" tabindex="0" @focusin="cellFocusin">
      <slot>
        <div style="display: inline-block">{{ value }}</div>
      </slot>
    </div>
    <!--此处不可用div替换x-div,div会响应自身的focusout事件-->
    <!--可以用两个div嵌套代替x-div,内层监听focusout事件-->
    <!--若不设置autofocus,则子组件必须获取焦点后才会退出-->
    <!--    <x-div v-if="editable" v-show="editing" autofocus tabindex="0" @focusout.stop="focusout">-->
    <!--      <slot name="edit">-->
    <!--        <el-input ref="input" v-model="value" />-->
    <!--      </slot>-->
    <!--    </x-div>-->
    <div v-if="editable && editing">
      <div tabindex="0" @focusout.stop="focusout">
        <slot name="edit">
          <el-input ref="input" v-model="value" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ColType, isObjectEqual } from '../util'

export default {
  name: 'XTableCell',
  inject: ['$XTable'],
  props: {
    scope: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      editing: false,
      org_data: null
    }
  },
  computed: {
    row: function() {
      return this.scope.row
    },
    column: function() {
      return this.scope.column
    },
    prop: function() {
      return this.scope.column.property
    },
    editable: function() {
      return this.scope.column.editable
    },
    value: {
      get: function() {
        return this.row[this.prop]
      },
      set: function(val) {
        this.scope.row[this.prop] = val
      }
    }
  },
  mounted() {
  },
  methods: {
    cellFocusin(e) {
      if (this.editable) {
        this.editing = true
        this.org_data = Object.assign({}, this.row)
        this.$nextTick(function() {
          this.$children.length && this.$children[0].focus()
        })
      }
    },
    focusout() {
      this.editing = false
      // console.log('focusout', this.org_data, this.row, !isObjectEqual(this.org_data, this.row))
      if (!isObjectEqual(this.org_data, this.row)) {
        this.$XTable.setDataRowType(this.row, ColType.mod)
      }
    }
  }
}
</script>

<style>

</style>
