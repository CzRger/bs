<template>
  <div class="login-container">
    <div class="logo">
      <img src="../../assets/images/login/login_logo.png">
    </div>
    <div class="form-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
        <el-form-item prop="loginName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
          <el-input
            v-model="loginForm.loginName"
            placeholder="请填写用户名"
            name="loginName"
            type="text"
            auto-complete="on" />
        </el-form-item>

        <el-form-item prop="show_password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :type="passwordType"
            v-model="loginForm.show_password"
            placeholder="请填写密码"
            name="password"
            auto-complete="on"
            @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
        </el-form-item>
        <el-form-item prop="captcha">
        <span class="svg-container">
          <svg-icon icon-class="captcha" />
        </span>
          <el-input
            v-model="loginForm.captcha"
            type="text"
            placeholder="请填写验证码"
            name="captcha"
            auto-complete="on"
            @keyup.enter.native="handleLogin" >
          </el-input>
          <span class="captcha">
          <img :src="captchaBase64" style="width: 100%; height: 100%;" @click="getCaptcha">
        </span>
        </el-form-item>
        <el-button :loading="loading" class="login-btn" type="primary" @click.native.prevent="handleLogin">登录</el-button>

      </el-form>
    </div>
    <div class="footer-panel">
      <div class="footer">
        <p>为了更好的使用体验，建议您使用谷歌、火狐最新版本的浏览器！</p>
        <p>Copyright ©2019 XXX</p>
      </div>
    </div>
  </div>
</template>

<script>
  import UUID from 'es6-uuid'
  import * as LoginAPI from '@/api/login'

  export default {
    name: 'Login',
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value && value.length < 5) {
          callback(new Error())
        } else {
          callback()
        }
      }
      const remoteValidator = (rule, value, callback) => {
        if ('' + this.remoteError === '3' && rule.field === 'show_password') {
          callback(new Error())
        } else if ('' + this.remoteError === '2' && rule.field === 'captcha') {
          callback(new Error())
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          loginName: '',
          show_password: '',
          captcha: ''
        },
        loginRules: {
          loginName: [{ required: true, trigger: 'change', message: '请填写用户名' }],
          show_password: [{ required: true, trigger: 'change', message: '请填写密码' }, { validator: validatePassword, trigger: 'change', message: '请输入密码（至少5位）' }, { validator: remoteValidator, trigger: 'change', message: '用户名或密码错误' }],
          captcha: [{ required: true, trigger: 'change', message: '请填写验证码' }, { validator: remoteValidator, trigger: 'change', message: '验证码错误' }]
        },
        remoteError: null,
        captchaBase64: null,
        passwordType: 'password',
        loading: false,
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    mounted() {
      this.getCaptcha()
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
      },
      getCaptcha() {
        LoginAPI.captcha({ uuid: UUID(32) }).then(data => {
          this.captchaBase64 = data
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            LoginAPI.loginByLoginName(this.loginForm).then(data => {
              if ('' + data.result === '1') {
                this.$store.dispatch('LoginByLoginName', data.token)
                this.$router.push({ path: this.redirect || '/' })
              } else if ('' + data.result === '2') { // 验证码错误
                this.remoteError = data.result
                this.getCaptcha()
                this.$refs.loginForm.validateField('captcha', () => {
                  this.remoteError = null
                })
              } else if ('' + data.result === '3') { // 用户名或密码错误
                this.remoteError = data.result
                this.getCaptcha()
                this.$refs.loginForm.validateField('show_password', () => {
                  this.remoteError = null
                })
              }
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #283443;

  .login-container {

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        border-left: solid 1px #dcdfe6;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;

        height: 47px;
        caret-color: #8e8e8e;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
          -webkit-text-fill-color: #8e8e8e !important;
        }
      }
    }
    .el-form-item {
      color: #454545;

      &.is-success .el-input__inner {
        border-color: #dcdfe6;
      }
    }

    .el-form-item__content {
      border: solid 1px #dcdfe6;
    }

    .el-form-item__error {
      left: 44px;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $dark_gray: #8e8e8e;

  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background: url('../../assets/images/login/back1.jpg') no-repeat top center;
    position: relative;

    .logo {
      width: 380px;
      margin: 0 auto;
      padding-top: 7%;
    }
    .form-container {
      border-radius: 40px;
      width: 445px;
      height: 328px;
      margin: 70px auto;
      padding: 40px 35px 0 35px;
      background: #fff;

      .login-form {
        max-width: 100%;
      }

      .login-btn {
        width:100%;
        margin-bottom:30px;
        height: 44px;
        font-size: 16px;
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      background: #f5f7fa;
      vertical-align: middle;
      width: 44px;
      display: inline-block;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .captcha {
      position: absolute;
      right: 10px;
      top: 3px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
      display: inline-block;
      width: 200px;
      height: 40px;
    }


    .footer-panel {
      width: 100%;
      padding-top: 50px;


      .footer {
        p {
          margin: 0;
          padding-bottom: 30px;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #fefefe;
          text-align: center;
        }
      }
    }
  }
</style>
