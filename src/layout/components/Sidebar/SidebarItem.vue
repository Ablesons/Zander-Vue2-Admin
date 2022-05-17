<!--
 * @Description: SidebarItem
 * @Author: Zander
 * @Date: 2022/5/11 17:18
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/11 17:18
 -->
<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[
      isCollapse ? 'simple-mode' : 'full-mode',
      { 'first-level': isFirstLevel }
    ]">
    <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
      <app-link v-if="theOnlyOneChild.name" :to="theOnlyOneChild.path">
        <el-menu-item :index="theOnlyOneChild.path" :class="{ 'submenu-title-noDropdown': isFirstLevel }">
          <item v-if="theOnlyOneChild.iconCls || theOnlyOneChild.name" :icon="theOnlyOneChild.iconCls" :title="theOnlyOneChild.name" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else :index="item.path" :popper-append-to-body="isFirstLevel">
      <template slot="title">
        <item v-if="item.iconCls || item.name" :icon="item.iconCls" :title="item.name" />
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script>
import FixiOSBug from './FixiOSBug';
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isCollapse: {
      type: Boolean,
      default: false
    },
    isFirstLevel: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    showingChildNumber() {
      if (this.item.children) {
        const showingChildren = this.item.children.filter(item => {
          return !item.hidden;
        });
        return showingChildren.length;
      }
      return 0;
    },
    theOnlyOneChild() {
      if (this.showingChildNumber > 1) {
        return null;
      }
      if (this.item.children) {
        for (const child of this.item.children) {
          if (!child.hidden) {
            return child;
          }
        }
      }
      return this.item;
    }
  }
}
</script>

<style scoped lang="scss">
.svg-icon {
  font-size: 18px;
}
</style>
