<template>
  <div class="register">
    <section class="form_body">
      <div class="register_title">京唐港-船舶订舱平台</div>
      <div class="register_cont">
        <img class="logo" :src="logo" alt="京唐港"/>
        <div class="tit">
          <span class="title">
              注册
            </span>
          <span class="title-span"></span>
          <span class="title-span-bot"></span>
        </div>
        <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form">
          <el-form-item prop="username">
            <span class="registerTips">
              <svg-icon icon-class="user" />
            </span>
            <el-input v-model="registerForm.username" size="medium" type="text" auto-complete="off" placeholder="账号" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="registerTips">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              v-model="registerForm.password"
              type="password"
              size="medium"
              auto-complete="off"
              placeholder="密码"
              @keyup.enter.native="handleRegister" />
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <span class="registerTips">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              size="medium"
              auto-complete="off"
              placeholder="确认密码"
              @keyup.enter.native="handleRegister" />
          </el-form-item>
          <el-form-item prop="code" v-if="captchaOnOff">
            <span class="registerTips">
              <svg-icon icon-class="validCode" />
            </span>
            <el-input
              v-model="registerForm.code"
              auto-complete="off"
              placeholder="验证码"
              size="medium"
              style="width: 63%;display: inline-block"
              @keyup.enter.native="handleRegister" />
            <div class="register-code">
              <img :src="codeUrl" @click="getCode" class="register-code-img"/>
            </div>
          </el-form-item>
          <el-form-item style="margin-top: 20px;">
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width:100%;"
              @click.native.prevent="handleRegister"
            >
              <span v-if="!loading">注 册</span>
              <span v-else>注 册 中...</span>
            </el-button>
            <div style="float: right;">
              <router-link class="link-type" :to="'/login'">使用已有账户登录</router-link>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="register-footer">
        <span>Copyright © 2018-2021 ruoyi.vip All Rights Reserved.</span>
      </div>
    </section>
    <div class="register_text">
      <div class="register_text_small">京唐港</div>
      <div class="register_text_big">船舶订舱平台</div>
    </div>
  </div>
</template>

<script>
// import { getCodeImg, register } from "@/api/login";
import logoImg from '@/assets/logo.png'

export default {
  name: 'Register',
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.registerForm.password !== value) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    };
    return {
      logo: logoImg,
      codeUrl: '',
      registerForm: {
        username: '',
        password: '',
        confirmPassword: '',
        code: '',
        uuid: ''
      },
      registerRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入您的账号' },
          { min: 2, max: 20, message: '用户账号长度必须介于 2 和 20 之间', trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入您的密码' },
          { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, trigger: 'blur', message: '请再次输入您的密码' },
          { required: true, validator: equalToPassword, trigger: 'blur' }
        ],
        code: [{ required: true, trigger: 'change', message: '请输入验证码' }]
      },
      loading: false,
      captchaOnOff: true
    };
  },
  created() {
    // this.getCode();
  },
  methods: {
    // getCode() {
    //   getCodeImg().then(res => {
    //     this.captchaOnOff = res.captchaOnOff === undefined ? true : res.captchaOnOff;
    //     if (this.captchaOnOff) {
    //       this.codeUrl = "data:image/gif;base64," + res.img;
    //       this.registerForm.uuid = res.uuid;
    //     }
    //   });
    // },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true;
          // register(this.registerForm).then(res => {
          //   const username = this.registerForm.username;
          //   this.$alert("<font color='red'>恭喜你，您的账号 " + username + " 注册成功！</font>", '系统提示', {
          //     dangerouslyUseHTMLString: true
          //   }).then(() => {
          //     this.$router.push("/login");
          //   }).catch(() => {});
          // }).catch(() => {
          //   this.loading = false;
          //   if (this.captchaOnOff) {
          //     this.getCode();
          //   }
          // })
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.register {
  width: 100%;
  height: 100vh;
  background-image: url("~@assets/img/login-background.jpg");
  background-repeat: no-repeat;
  background-size:  100% 100%;
}
.register_text{
  top: 35%;
  left: 24%;
  color: #fff;
  width: 306px;
  height: 250px;
  position: absolute;
  border: 3px solid #fff;
  .register_text_small {
    font-size: 25px;
    padding-left: 10px;
    padding-top: 10px;
  }
  .register_text_big {
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
  .register_title {
    font-size: 18px;
    font-weight: bold;
    text-align: right;
    color: #000;
    letter-spacing: 3px;
  }
  .register_cont {
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
    .register-form {
      .registerTips {
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

.register-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.register-code-img {
  height: 38px;
}
.register-footer {
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
