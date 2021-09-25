export default {
  data() {
    return {

    }
  },
  methods: {
    notifySuccess(msg = '新建') {
      this.$notify({
        title: '成功',
        message: `${msg}成功`,
        type: 'success',
        duration: 2000
      })
    },
    notifyError(msg = '新建') {
      this.$notify({
        title: '失败',
        message: `${msg}失败`,
        type: 'error',
        duration: 2000
      })
    }
  }
}
