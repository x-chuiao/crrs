<template>
  <el-calendar
    v-model="_date"
  >
    <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
    <template
      slot="dateCell"
      slot-scope="{date, data}"
    >
      <!--            <div :class="calcClass(date,data)">-->
      <div style="text-align: center">
        <span>
          {{ date.getDate() }}
        </span>
      </div>

    </template>
  </el-calendar>
</template>

<script>

import { alias } from '../util'

export default {
  name: 'XCalendar',
  props: {
    date: {
      type: Date,
      default: Date.now()
    }
  },
  computed: alias(['date'])
}
</script>

<style>
  .el-calendar {
    width: 100%;
  }

  .el-calendar__header {
    padding: 6px 10px;
  }

  .el-calendar__body {
    height: 100%;
    padding: 6px 10px 17px;
  }

  /*.el-calendar-table*/
  /*{*/
  /*  height: 50%;*/
  /*}*/
  .el-form-item__content {
    line-height: normal;
  }

  .el-calendar-table .el-calendar-day {
    height: 100%;
    padding: 2px;
  }

  .is-selected {
    color: #1989FA;
  }

</style>
