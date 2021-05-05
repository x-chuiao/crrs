<template>
  <div style="margin:5px">
    <slot name="toolbar">
      <div class="tb">
        <slot name="tbHeader" />
        <div class="space" />
        <slot name="tbMiddle" />
        <el-select
          v-if="rowTypeOn"
          v-model="rowType"
          clearable
          placeholder="行类型"
          class="tb-item"
          style="width: 100px"
          @clear="rowType=null"
        >
          <el-option
            v-for="item in Object.keys(rowTypeOption)"
            :key="item"
            :label="rowTypeOption[item]"
            :value="item"
          />
        </el-select>
        <el-button v-if="rowTypeOn" type="primary" class="tb-item" @click="handleReset">重置</el-button>
        <el-input
          v-if="searchByAttr"
          v-model="search"
          :placeholder="searchPlaceHolder"
          clearable
          class="tb-input"
        />
        <el-button v-if="addFormOn" class="tb-item" type="primary" @click="addClickedHandler">新增</el-button>
        <el-button v-if="saveClicked" class="tb-item" type="success" @click="saveClickedHandler">保存</el-button>
        <slot name="tbTail" />
      </div>
    </slot>

    <el-dialog
      v-if="addFormOn"
      title="新增"
      :visible.sync="addDialogVisible"
    >
      <el-form
        v-bind="_addFormConf.form"
        :model="addForm"
      >
        <el-form-item
          v-for="key in _addFormConf.column"
          :key="key"
          :prop="key"
          :label="parseHeader(key)"
        >
          <!--todo 某些情况下:form使用v-bind直接绑定无法双向更新数据,待解决-->
          <!--          猜测无法直接更新一层对象-->
          <!--          与其他正常的相比该name是组装的,可能是原因之一-->
          <slot :name="'add-'+key" :form="addForm">
            <el-input v-model="addForm[key]" />
          </slot>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleAddDialogConfirmClick">确 定</el-button>
        <el-button @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-table
      ref="table"
      v-bind="$attrs"
      :data="filterData"
      v-on="$listeners"
    >
      <!--首列-->
      <slot ref="colHead" name="colHead" />
      <!--根据数据渲染默认列-->

      <x-table-column
        v-for="key of column"
        :key="key"
        :label="parseHeader(key)"
        :prop="key"
        :min-width="parseMinWidth(key)"
        :editable="parseEditable(key)"
      >
        <!--提供直接对cell内容的模板的插槽 -->
        <template #default="scope">
          <slot :name="key" v-bind="scope" />
        </template>
      </x-table-column>
      <slot />
      <!-- 尾列,默认为操作列,默认为移除操作-->
      <slot name="colTail">
        <x-table-column
          v-if="operable || delClicked"
          align="center"
          label="操作"
          :min-width="parseMinWidth('operate')"
        >
          <template #default="scope">
            <slot name="operate" v-bind="scope">
              <el-button type="danger" @click="delClickedHandler(scope.row)">移除</el-button>
            </slot>
          </template>
        </x-table-column>
      </slot>
    </el-table>
    <el-pagination
      v-if="pageable"
      v-bind="page"
    />
  </div>
</template>

<script>
import XTableColumn from './x-table-column'
import { bindEvent, ColType, ContentTypeHeader, inheritMethod } from '../util'
import { Table } from 'element-ui'
import request from '../request'
import _ from 'lodash'
export default {
  name: 'XTable',
  components: { XTableColumn },
  provide: function() {
    return {
      $XTable: this
    }
  },
  props: {
    dataSource: {
      type: [Array, Function],
      default: () => []
    },
    // 列属性
    colAttr: {
      type: Object,
      default: () => ({})
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    edit: {
      type: Object,
      default: () => ({})
    },
    editable: {
      type: Boolean,
      default: () => false
    },
    minWidth: {
      type: Object,
      default: () => ({})
    },
    // 搜索使用的属性名
    searchByAttr: {
      type: String,
      default: ''
    },
    searchPlaceHolder: {
      type: String,
      default: '请输入查询内容'
    },
    addClicked: {
      type: [Function, Boolean],
      default: undefined
    },
    saveClicked: {
      type: [Function, Boolean],
      default: undefined
    },
    delClicked: {
      type: [Function, Boolean],
      default: undefined
    },
    resetClicked: {
      type: [Function, Boolean],
      default: undefined
    },
    filter: {
      type: Function,
      default: undefined
    },
    // 列可操作
    operable: {
      type: Boolean,
      default: false
    },
    colorable: {
      type: Boolean,
      default: false
    },
    trueDel: {
      type: Boolean,
      default: false
    },
    dataChange: {
      type: Function,
      default: undefined
    },
    pageable: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({
        total: 0
      })
    },
    addFormOn: {
      type: Boolean,
      default: false
    },
    addFormConf: {
      type: Object,
      default: null
    },
    rowTypeOn: {
      type: Boolean,
      default: false
    },
    requestConf: {
      type: Object,
      default: null
    },
    url: {
      type: String,
      default: null
    },
    formConverter: {
      type: Function,
      default: null
    }
  },
  data() {
    const rowTypeOption = {}
    rowTypeOption[ColType.add] = '新增'
    rowTypeOption[ColType.mod] = '修改'
    rowTypeOption[ColType.del] = '删除'
    return {
      search: '',
      tableData: this.dataSource,
      filteredData: [],
      rowType: null,
      rowTypeOption,
      addDialogVisible: false,
      addForm: {},
      urlParam: {}
    }
  },
  computed: {
    filterData: function() {
      // console.log('table data', this.tableData)
      const data = this.tableData.filter(row => {
        // 过滤搜索内容
        if (this.searchByAttr && this.search && !row[this.searchByAttr].includes(this.search)) {
          return false
        }
        // 过滤行类型
        if (this.rowTypeOn && this.rowType != row.__t__) { return false }
        // 过滤通常情况下行类型为删除
        if (!this.rowTypeOn && row.__t__ == ColType.del) { return false }

        // 自定义过滤器
        if (this.filter && !this.filter(row)) {
          return false
        }
        return true
      })
      this.dataChange && this.dataChange(data)
      // console.log('filteredData', this.filteredData)
      return data
    },
    column: function() {
      if (this.headers && Object.keys(this.headers).length !== 0) {
        return Object.keys(this.headers)
      } else if (this.tableData && this.tableData.length !== 0) {
        return Object.keys(this.tableData[0])
      }
      return []
    },
    _addFormConf: function() {
      const conf = _.assign({
        exclude: [],
        column: this.column.slice(),
        form: { 'label-position': 'left', 'label-width': '80px' },
        confirm: r => r,
        cancel: r => r,
        converter: {}
      }, this.$props.addFormConf)
      _.remove(conf.column, i => conf.exclude.includes(i))
      console.log('addFormCOnf', conf)
      return conf
    },
    _requestConf: function() {
      const conf = {
        request: request,
        config: {
          url: this.url
        },
        onFulfilled: r => r.data,
        onRejected: r => r
      }
      const pull = {
        config: {
          method: 'get'
        }
      }
      const push = {
        config: {
          method: 'post'
        }
      }
      _.merge(pull, conf)
      _.merge(push, conf)
      conf.pull = pull
      conf.push = push
      _.merge(conf, this.$props.requestConf)
      // console.log('requestConf', conf, this.requestConf)
      return conf
    }
  },
  watch: {
    dataSource: function(val) {
      this.tableData = val
    }
    // addForm: function(val) {
    //   console.log('addForm', this.addForm, val)
    // }
  },
  mounted() {
    // 从ElTable继承method,提供直接访问el-table的接口而不必使用$refs间接访问
    inheritMethod(this, this.$refs.table, Table.methods)
    // 代理所有method到合适的对象
    // todo 实现方式可优化
    bindEvent(this, 'table')
    this.pull()
  },
  methods: {
    toForm() {
      let form = {
        add: this.tableData.filter(row => row.__t__ === ColType.add),
        mod: this.tableData.filter(row => row.__t__ === ColType.mod),
        del: this.tableData.filter(row => row.__t__ === ColType.del)
      }
      form = this.formConverter ? this.formConverter(form) : form
      return form
    },
    add(row) {
      this.tableData.push(row)
      this.setDataRowType(row, ColType.add)
    },
    mod(row) {
      this.setDataRowType(row, ColType.mod)
    },
    del(row) {
      if (this.trueDel) {
        this.tableData.splice(this.tableData.indexOf(row), 1)
      } else {
        this.setDataRowType(row, ColType.del)
      }
      // console.log('del row', row)
    },
    // private function
    NullableCall(func, ...args) {
      if (func instanceof Function) {
        func(...args)
      }
    },
    parseHeader(key) {
      return (this.colAttr[key] && this.colAttr[key].header) || this.headers[key] || key
    },
    parseEditable(key) {
      // 以子组件的editable为优先,其次为edit[key],最后才是整个表的editable
      // false || true -> false
      // true || false -> true
      // undefined || bool -> bool
      const flag = this.colAttr[key] && this.colAttr[key].editable || this.edit[key]
      if (flag === undefined) {
        return this.editable
      }
      return flag
    },
    parseMinWidth(key) {
      return this.colAttr[key] && this.colAttr[key].minWidth || this.minWidth[key] || 'auto'
    },
    parseRowClass({ row, rowIndex }) {
      if (this.colorable) {
        return row.__t__ ? row.__t__ : ''
      }
    },
    setDataRowType(row, status) {
      // console.log('setDataRowType', row, status)
      const oldType = row.__t__
      if (oldType === undefined) {
        Object.defineProperty(row, '__t__', { value: status, enumerable: false, writable: true })
        // 将变化更新到view上
        this.tableData.splice(-1, 0)
        return
      }
      // del->add表示取消删除操作,将标志置为null
      if (status === ColType.add) {
        if (oldType === ColType.del) {
          row.__t__ = null
        }
      } else if (status === ColType.mod) {
        // 不执行任何操作
      } else if (status === ColType.del) {
        // add->del表示取消新增,直接删除
        if (oldType === ColType.add) {
          this.tableData.splice(this.tableData.indexOf(row), 1)
        } else {
          // mod->del将该元素标记为删除
          row.__t__ = status
        }
      }
      // 使用splice触发tableData更新
      this.tableData.splice(-1, 0)
    },
    addClickedHandler() {
      this.addDialogVisible = true
      this.NullableCall(this.addClicked, this)
    },
    saveClickedHandler() {
      this.push()
      this.NullableCall(this.saveClicked, this)
    },
    delClickedHandler(row) {
      this.del(row)
      this.NullableCall(this.delClicked)
    },
    handleReset() {
      this.tableData.map(i => {
        i.__t__ = null
      })
      this.tableData.splice(-1, 0)
      this.NullableCall(this.resetClicked, this)
    },
    handleAddDialogConfirmClick() {
      if (this.addFormConf) {
        for (const k in this.addFormConf.converter) {
          this.addForm[k] = this.addFormConf.converter[k](this.addForm[k])
        }
      }
      this.add(this.addForm)
      this.addForm = {}
      this.addDialogVisible = false
    },
    registerParam: function(key, value) {
      this.urlParam[key] = value
    },
    pull() {
      if (!(this.url || this.requestConf)) return
      const { request, config, onFulfilled } = this._requestConf.pull
      request(config).then(response => {
        let data = onFulfilled(response)
        data = data || []
        this.tableData = data
      })
    },
    push() {
      if (!(this.url || this.requestConf)) return
      const { request, config, onFulfilled } = this._requestConf.push
      config.data = this.toForm()
      config.headers = ContentTypeHeader.json
      request(config).then(response => {
        let data = onFulfilled(response)
        data = data || []
        this.tableData = data
      })
    }
  }
}
</script>

<style scoped>
    /*toolbar*/
    .tb {
        display: flex;
        align-content: center;
        justify-content: flex-end;
    }

    .tb-item {
        display: inline-block;
        vertical-align: middle;
        margin-bottom: 10px;
        margin-left: 10px;
    }

    .tb-input {
        margin-left: 10px;
        width: 260px;
    }

</style>

<style>
    .el-table .add {
        background: greenyellow;
    }

    .el-table .mod {
        background: oldlace;
    }

    .el-table .del {
        background: orange;
    }

    /*修复表格线无法对齐*/
    .el-table th {
        display: table-cell !important;
    }
</style>
