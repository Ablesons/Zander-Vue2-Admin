<!--
 * @Description: 系统配置面板
 * @Author: Zander
 * @Date: 2022/5/11 13:37
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/11 13:37
 -->
<template>
  <div class="rightPanel" @click="drawer = true">
    <icon-svg icon-class="setting" />
    <div ref="rightPanelSetting">
      <el-drawer
        title="系统配置"
        size="15%"
        :visible.sync="drawer"
        :direction="direction"
      >
        <slot ></slot>
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightPanel',
  data() {
    return {
      drawer: false,
      direction: 'rtl'
    }
  },
  mounted() {
    this.insertToBody();
  },
  methods: {
    insertToBody() {
      const elx = this.$refs.rightPanelSetting;
      const body = document.querySelector('body');
      if (body) {
        body.insertBefore(elx, body.firstChild);
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
