<!--
 * @Description: Navbar
 * @Author: Zander
 * @Date: 2022/5/11 10:14
 * @LastEditors: Zander
 * @LastEditTime: 2022/5/11 10:14
 -->
<template>
  <div class="navbar">
    <Hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <Multisystem v-if="isMulSys" class="multisystem-container" />
    <Platform v-if="isPlatform" class="platform-container" />
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <Search id="header-search" class="right-menu-item" />
        <ErrorLog class="errLog-container right-menu-item hover-effect" />
        <Refresh class="right-menu-item hover-effect" />
        <RightPanel class="right-menu-item hover-effect">
          <Settings />
        </RightPanel>
        <Screenfull class="right-menu-item hover-effect" />
        <el-tooltip
          :content="$t('navbar.size')"
          effect="dark"
          placement="bottom"
        >
          <SizeSelect class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>
      <el-popover
        popper-class="user-popper-container"
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
        v-model="isAvatarVisible"
      >
        <div class="avatar-wrapper" slot="reference">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" alt="#" />
          <div class="user-info">
            <span>{{ name }}</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
        </div>
        <div class="user-box">
          <div class="user-top">
            <div class="img">
              <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" alt="#" />
            </div>
            <div class="user-info">
              <p>{{ name }}--{{ loginName }}</p>
            </div>
          </div>
          <div class="user-btn">
            <a class="divided">
              <icon-svg icon-class="yonghuguanli" />
              <span>{{ $t("navbar.profile") }}</span>
            </a>
            <a class="divided">
              <icon-svg icon-class="baohu" />
              <span>{{ $t("navbar.password") }}</span>
            </a>
            <a @click="logout">
              <icon-svg icon-class="tuichu" />
              <span>{{ $t("navbar.logOut") }}</span>
            </a>
          </div>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@components/Breadcrumb';
import ErrorLog from '@components/ErrorLog';
import Hamburger from '@components/Hamburger';
import Screenfull from '../Screenfull';
import SizeSelect from '../SizeSelect';
import Search from '../Search';
import Refresh from '../Refresh';
import RightPanel from '@components/RightPanel';
import Settings from '../Settings';
import Multisystem from '../Multisystem';
import Platform from '../Platform';
import { apiLogOut } from '@api/sys/users';
import avatarImg from '@assets/img/avatar.gif';

export default {
  name: 'Navbar',
  components: {
    Breadcrumb,
    ErrorLog,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    Refresh,
    RightPanel,
    Settings,
    Multisystem,
    Platform
  },
  data() {
    return {
      isAvatarVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'loginName',
      'device',
      'isMulSys',
      'isPlatform'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    avatar() {
      return this.$store.getters.avatar || avatarImg;
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        apiLogOut().then(result => {
          if (result && result.success) {
            this.$store.dispatch('user/logOut').then(() => {
              this.$router.push('/login');
            })
          } else {
            this.$message({
              message: '退出失败!',
              type: 'error'
            });
          }
        });
      }).catch(() => {});
    }
  }
}
</script>

<style scoped lang="scss">
.navbar{
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .multisystem-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        justify-content: space-between;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .user-info {
          cursor: pointer;
          display: inline-block;
          height: 40px;
          line-height: 40px;
          margin-left: 5px;
          span {
            font-size: 14px;
          }
        }
      }
    }
  }
}
.el-dropdown-menu--mini {
  .el-dropdown-menu__item {
    text-align: center;
  }
  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    a {
      color: #66b1ff !important;
    }
  }
}
.user-popper-container {
  min-width: 200px;
  padding: 0;
  .user-box {
    .user-top {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 15px;
      .img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        flex-shrink: 0;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .user-info {
        margin-left: 10px;
        p {
          margin: 0;
          font-size: 12px;
          line-height: 20px;
        }
      }
    }
    .user-btn {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      justify-content: center;
      border-top: 1px dashed #ccc;
      a {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        justify-content: center;
        width: 33.33%;
        text-align: center;
        padding: 10px 0;
        color: #606266;
        font-size: 12px;
        cursor: pointer;
        position: relative;
        span {
          margin-left: 5px;
        }
        &:hover {
          /*background-color: #ecf5ff;*/
          color: #66b1ff;
        }
      }
      .divided::after {
        content: "";
        display: block;
        width: 1px;
        height: 12px;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        background: #ccc;
      }
    }
  }
}
</style>
