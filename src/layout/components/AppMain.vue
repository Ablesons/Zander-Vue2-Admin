<!--
 * @Description: AppMain
 * @Author: Zander
 * @Date: 2022/5/10 15:18
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/10 15:18
 -->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="scss">
.app-main {
  /* 50= navbar  50  */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: auto;
  background: #f0f2f5;
}

.fixed-header + .app-main {
  padding-top: 50px;
  height: 100vh;
  overflow-y: auto;
}

.hasTagsView {
  .fixed-header + .app-main {
    padding-top: 83px;
    height: 100vh;
    overflow-y: auto;
  }
}
</style>
