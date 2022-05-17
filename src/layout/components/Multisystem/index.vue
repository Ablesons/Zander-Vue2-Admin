<!--
 * @Description: 多系统时，下拉选择切换系统
 * @Author: Zander
 * @Date: 2022/5/11 10:24
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/11 10:24
 -->
<template>
  <el-menu mode="horizontal" v-if="sysName !== ''">
    <el-submenu index="1" popper-class="multisystem-subment">
      <template slot="title">欢迎使用：{{ sysName }}</template>

      <div class="my-auth">
        认证通过可访问系统：
        <el-tag size="mini" type="danger" effect="dark">
          {{ sysNum }}
        </el-tag>
      </div>
      <el-divider/>

      <el-menu-item
        v-for="item in userSys"
        :key="item.appId"
        :index="item.appId"
        @click="getUrl(item.appId)"
      >
        {{ item.name }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { getMulSysUrl } from '@/store/modules/multisystem';

export default {
  name: 'Multisystem',
  computed: {
    sysNum() {
      return this.$store.getters.userSysNum
    },
    sysName() {
      return this.$store.getters.sysName
    },
    userSys() {
      return this.$store.getters.userSys
    }
  },
  created() {
    this.$store.dispatch('multisystem/initUserSystem')
  },
  methods: {
    getUrl(appId) {
      if (appId) {
        if (appId !== this.$store.getters.appId) {
          window.location.href = getMulSysUrl(appId);
        }
      } else {
        this.$message({
          message: '进入系统失败!',
          type: 'error'
        });
      }
    }
  }
}
</script>

<style scoped lang="scss">
.multisystem-container {
  ::v-deep .el-submenu__title {
    height: 50px;
    line-height: 50px;
    border-bottom: 0px;
  }

  ::v-deep .is-active {
    .el-submenu__title {
      color: #909399 !important;
      border-bottom: 0;
    }
  }
}
</style>

<style lang="scss">
.my-auth {
  padding-left: 10px;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
}
.multisystem-subment {
  .el-divider {
    margin: 0 0 5px;
  }
}
</style>
