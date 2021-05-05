<template>
  <div>
    <el-page-header content="消息详情" title="返回" style="margin: 8px" @back="goBack" />
    <el-card class="app-container">
      <div slot="header">
        <span class="title">{{ msg.title }}</span>
      </div>
      <div>
        <p class="content">
          {{ msg.content }}
        </p>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MessageDetail',
  computed: {
    msg: function() {
      return this.$route.params
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title{
  font-size: 20px;
  line-height: 36px;
  margin: 5px 10px ;
  font-weight: bold;
}
.content{
  white-space: pre-wrap;
  line-height: 36px;
}
</style>
