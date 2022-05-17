<!--
 * @Description: 刷新当前选中的页签
 * @Author: Zander
 * @Date: 2022/5/15 14:48
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/15 14:48
 -->
<template>
  <div @click="handleRefresh">
    <icon-svg icon-class="shuaxin" />
  </div>
</template>

<script>
export default {
  name: 'Refresh',
  methods: {
    handleRefresh() {
      this.$bus.emit('refreshTagFun');
    }
  }
}
</script>

<style scoped lang="scss">

</style>
