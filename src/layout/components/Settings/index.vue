<!--
 * @Description: 系统配置
 * @Author: Zander
 * @Date: 2022/5/11 13:42
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/11 13:42
 -->
<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">
        {{ $t("settings.title") }}
      </h3>

      <div class="drawer-item">
        <span>{{ $t("settings.theme") }}</span>
        <ThemePicker
          style="float: right;height: 26px;margin: -3px 8px 0 0;"
          @change="themeChange"
        />
      </div>

      <div class="drawer-item">
        <span>{{ $t("settings.showTagsView") }}</span>
        <el-switch v-model="showTagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t("settings.showSidebarLogo") }}</span>
        <el-switch v-model="showSidebarLogo" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t("settings.fixedHeader") }}</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t("settings.sidebarTextTheme") }}</span>
        <el-switch v-model="sidebarTextTheme" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script>
import ThemePicker from '@components/ThemePicker'

export default {
  name: 'Settings',
  components: { ThemePicker },
  computed: {
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    },
    showTagsView: {
      get() {
        return this.$store.state.settings.showTagsView
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showTagsView',
          value: val
        })
      }
    },
    showSidebarLogo: {
      get() {
        return this.$store.state.settings.showSidebarLogo
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSidebarLogo',
          value: val
        })
      }
    },
    sidebarTextTheme: {
      get() {
        return this.$store.state.settings.sidebarTextTheme
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarTextTheme',
          value: val
        })
      }
    }
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
      this.theme = val;
    }
  }
}
</script>

<style scoped lang="scss">
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
}
</style>
