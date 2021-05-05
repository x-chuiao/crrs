<template>
  <div>
    <WorksDetail />
  </div>
</template>

<script>
import XSelect from '@/vue-xlib/XSelect'
import XTable from '@/vue-xlib/XTable/x-table'
import WorksDetail from '@/views/component/WorksDetail'
export default {
  name: 'Register',
  components: { WorksDetail, XTable, XSelect },
  data() {
    return {
      fileList: []
    }
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
