<!--
 * @Description: 重定向页面
 * @Author: Zander
 * @Date: 2022/5/8 23:37
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/8 23:37
 -->
<script>
export default {
  name: 'Redirect',
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
