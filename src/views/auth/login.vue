<template>
  <div class="login">
    <section class="form_body">
      <div class="login_title">唐山港-船舶订舱平台</div>
      <div class="login_cont">
        <img class="logo" :src="logo" alt="唐山港-船舶订舱平台"/>
        <div class="tit">
          <span class="title">
              登录
            </span>
          <span class="title-span"></span>
          <span class="title-span-bot"></span>
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
          <el-form-item prop="username">
            <span class="loginTips">
              <svg-icon icon-class="user" />
            </span>
            <el-input v-model="loginForm.username" size="medium" type="text" auto-complete="off" placeholder="账号" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="loginTips">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              v-model="loginForm.password"
              type="password"
              size="medium"
              auto-complete="off"
              placeholder="密码"
              @keyup.enter.native="handleLogin" />
          </el-form-item>
          <el-form-item prop="code" v-if="captchaOnOff">
            <span class="loginTips">
              <svg-icon icon-class="validCode" />
            </span>
            <el-input
              v-model="loginForm.code"
              auto-complete="off"
              size="medium"
              style="width: 63%;display: inline-block"
              placeholder="验证码"
              @keyup.enter.native="handleLogin" />
            <div class="login-code">
              <img :src="codeUrl" @click="getCode" class="login-code-img"/>
            </div>
          </el-form-item>
          <el-checkbox v-model="loginForm.rememberMe" style="margin-bottom: 20px;">记住密码</el-checkbox>
          <el-form-item>
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width:100%;"
              @click.native.prevent="handleLogin"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
            <div style="float: right;" v-if="register">
              <router-link class="link-type" :to="'/register'">立即注册</router-link>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="login-footer">
        <span>Copyright © 2018-2021 ruoyi.vip All Rights Reserved.</span>
      </div>
    </section>
    <div class="logo_text">
      <div class="logo_text_small">唐山港</div>
      <div class="logo_text_big">船舶订舱平台</div>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from '@/api/login';
import Cookies from 'js-cookie';
import { encrypt, decrypt } from '@/utils/jsencrypt'
import logoImg from '@/assets/logo/logo.png'

export default {
  name: 'Login',
  data() {
    return {
      logo: logoImg,
      codeUrl: '',
      cookiePassword: '',
      loginForm: {
        username: 'admin',
        password: 'demo12!@',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入您的账号' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入您的密码' }
        ],
        code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
      },
      loading: false,
      // 验证码开关
      captchaOnOff: true,
      // 注册开关
      register: false,
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then(res => {
        this.captchaOnOff = res.captchaOnOff === undefined ? true : res.captchaOnOff;
        if (this.captchaOnOff) {
          this.codeUrl = 'data:image/gif;base64,' + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get('username');
      const password = Cookies.get('password');
      const rememberMe = Cookies.get('rememberMe')
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set('username', this.loginForm.username, { expires: 30 });
            Cookies.set('password', encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove('username');
            Cookies.remove('password');
            Cookies.remove('rememberMe');
          }
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' }).catch(() => {});
          }).catch(() => {
            this.loading = false;
            if (this.captchaOnOff) {
              this.getCode();
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: url("@assets/img/login-background.jpg");
  background-repeat: no-repeat;
  background-size:  100% 100%;
}
.logo_text{
  top: 35%;
  left: 24%;
  color: #fff;
  width: 306px;
  height: 250px;
  position: absolute;
  border: 3px solid #fff;
  .logo_text_small {
    font-size: 25px;
    padding-left: 10px;
    padding-top: 10px;
  }
  .logo_text_big {
    font-size: 60px;
    padding-top: 10px;
    font-weight: bold;
    padding-left: 30px;
    padding-right: 30px;
    letter-spacing: 20px;
  }
}
.form_body {
  background: #fff;
  width: 35%;
  position: absolute;
  border-radius: 2px;
  padding: 35px 30px;
  right: 0;
  top: 0;
  bottom: 0;
  .login_title {
    font-size: 18px;
    font-weight: bold;
    text-align: right;
    color: #000;
    letter-spacing: 3px;
  }
  .login_cont {
    width: 70%;
    margin: 25% auto 0;
    .logo {
      width: 70px;
      margin: 0 auto;
      display: block;
    }
    .tit {
      color: #000;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
      font-size: 25px;
      font-weight: bold;
      width: 100%;
      padding-bottom: 20px;
      margin-bottom: 15px;
      margin-top: 10px;
      .title {
        i {
          color: #3043a9;
        }
      }
      .title-span {
        display: block;
        width: 52px;
        height: 3px;
        background: #3a88f7;
        margin-top: 10px;
        margin-left: 0;
      }
      .title-span-bot {
        display: block;
        width: 100%;
        height: 1px;
        background: #dcdfe6;
      }
    }
    .login-form {
      .loginTips {
        position: absolute;
        left: 10px;
        z-index: 20;
        top: 60%;
        transform: translateY(-50%);

        .svg-icon {
          font-size: 20px;
        }
      }
    }
  }
}
::v-deep .el-input__inner {
  padding-left: 40px;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.login-code-img {
  height: 38px;
}
.login-footer {
  left: 0;
  right: 0;
  bottom: 0;
  color: #ccc;
  height: 40px;
  font-size: 12px;
  line-height: 40px;
  position: absolute;
  text-align: center;
  font-family: Arial;
  letter-spacing: 1px;
}
</style>
