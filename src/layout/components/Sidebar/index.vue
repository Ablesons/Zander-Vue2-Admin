<!--
 * @Description: SideBar
 * @Author: Zander
 * @Date: 2022/5/11 17:26
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/11 17:26
 -->
<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar :class="settings.sidebarTheme" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="settings.sidebarTheme === 'theme-dark' ? variables.menuBg : variables.menuLightBg"
        :text-color="settings.sidebarTheme === 'theme-dark' ? variables.menuText : variables.menuLightText"
        :active-text-color="settings.theme"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in sidebarRouters" :key="route.path" :item="route" :is-collapse="isCollapse" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss';

export default {
  name: 'SideBar',
  components: { SidebarItem, Logo },
  computed: {
    ...mapState(['settings']),
    ...mapGetters(['sidebarRouters', 'sidebar']),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.showSidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
