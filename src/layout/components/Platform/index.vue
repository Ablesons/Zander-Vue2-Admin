<!--
 * @Description: 已授权的平台
 * @Author: Zander
 * @Date: 2022/5/11 11:32
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/11 11:32
 -->
<template>
  <el-menu mode="horizontal" v-if="name !== ''">
    <el-submenu index="1" popper-class="platform-subment">
      <template slot="title">平台：{{ name }}</template>

      <div class="my-auth">
        已授权的平台：
        <el-tag size="mini" type="danger" effect="dark">
          {{ num }}
        </el-tag>
      </div>
      <div class="my-query" v-if="num > 9">
        <el-input
          v-model="queryStr"
          clearable
          placeholder="请输入账套关键字过滤"
          @input="handleQuery"
        />
      </div>
      <el-divider/>

      <div :class="{ 'platform-list': platforms.length > 9 }">
        <el-scrollbar wrap-class="scrollbar-wrapper" style="height: 100%;">
          <el-menu-item
            v-for="(vaule, key) in platforms"
            :key="`${key}`"
            :index="`${key}`"
            @click="switchUserPlatform(vaule.id)"
          >
            {{ vaule.name }}
          </el-menu-item>
        </el-scrollbar>
      </div>
    </el-submenu>
  </el-menu>
</template>

<script>
import { stringUtils } from '@utils/stringUtils';
import { isEmpty } from '@utils/verify';

export default {
  name: 'Platform',
  data() {
    return {
      queryStr: '',
      platforms: []
    }
  },
  computed: {
    num() {
      return this.userPlatforms.length;
    },
    name() {
      return this.$store.getters.platformName
    },
    userPlatforms() {
      return this.$store.getters.userPlatforms
    }
  },
  watch: {
    userPlatforms() {
      this.getUserPlatforms();
    }
  },
  created() {
    this.$store.dispatch('platform/initUserPlatform');
    this.getUserPlatforms();
  },
  methods: {
    getUserPlatforms() {
      if (this.userPlatforms.length === 0) {
        return;
      }
      const queryStrTrim = stringUtils.trim(this.queryStr, 1);
      if (!isEmpty(queryStrTrim)) {
        this.platforms = [];
        this.userPlatforms.forEach(item => {
          if (item.name.indexOf(queryStrTrim) > -1) {
            this.platforms.push(item);
          }
        });
      } else {
        this.platforms = this.userPlatforms;
      }
    },
    // 平台过滤
    handleQuery() {
      const that = this;
      setTimeout(function() {
        that.getUserPlatforms();
      }, 500);
    },
    switchUserPlatform(platformId) {
      this.$store.dispatch('platform/switchUserPlatform', platformId);
    }
  }
}
</script>

<style scoped lang="scss">
.platform-container {
  float: left;

  ::v-deep .el-submenu__title {
    height: 50px;
    line-height: 50px;
    border-bottom: 0;
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

.my-query {
  padding-left: 10px;
  padding-right: 10px;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
}

.platform-subment {
  .el-divider {
    margin: 0 0 0 5px;
  }

  .platform-list {
    height: 320px;

    .scrollbar-wrapper {
      overflow-x: hidden;
    }
  }
}
</style>
