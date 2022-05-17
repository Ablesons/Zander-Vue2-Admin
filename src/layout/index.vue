<!--
 * @Description: Layout
 * @Author: Zander
 * @Date: 2022/5/6 16:18
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/6 16:18
 -->
<template>
  <div :class="classObj" class="app-wrapper" :style="{'--current-color': theme}">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" ></div>
    <Sidebar class="sidebar-container" v-resize.immediate="setFixedPosition" />
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <Navbar />
        <TagsView v-if="showTagsView" />
      </div>
      <AppMain />
    </div>
  </div>
</template>

<script>
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import { AppMain, Navbar, Sidebar, TagsView } from './components'

export default {
  name: 'Layout',
  mixins: [ResizeMixin],
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      theme: state => state.settings.theme,
      sidebarTheme: state => state.settings.sidebarTheme,
      showSettings: state => state.settings.showSettings,
      showTagsView: state => state.settings.showTagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    setFixedPosition() {
      const sidebarToolbar = document.getElementsByClassName('sidebar-container').item(0), headerToolbar = document.getElementsByClassName('fixed-header').item(0);
      document.body.style.setProperty(
        '--offsetLeft',
        `${sidebarToolbar.offsetWidth}px`
      );
      document.body.style.setProperty(
        '--offsetTop',
        `${headerToolbar.offsetHeight}px`
      );
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.sidebar-container {
  transition: width 0.28s;
  width: #{$sideBarWidth} !important;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

  .fixed-header {
    width: calc(100% - 54px);
  }
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0;
  }

  .sidebar-container {
    transition: transform 0.28s;
    width: #{$sideBarWidth} !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-#{$sideBarWidth}, 0, 0);
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
