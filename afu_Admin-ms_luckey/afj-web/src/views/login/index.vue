<template>
  <div>
    <div class="login-wrap">
      <div class="login-container">
        <div class="login-container-inner">
          <img
            class="msBg"
            src="./../../assets/msBg.png"
            style="width: 400px"
          />
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            autocomplete="on"
            label-position="left"

          >
            <div class="title-container">
              <!-- <img :src="logo" alt class="logo" /> -->
              <div class="nowTime">{{ nowTime }}</div>
              <div class="cnTime" style="padding-bottom: 10px">
                {{ cnTime }}
              </div>
              <p class="title">欢迎，请登录</p>
            </div>

            <el-form-item prop="userPhone">
              <!-- <span class="svg-container">
              <svg-icon icon-class="user" />
            </span> -->
              <el-input
                ref="userPhone"
                v-model="loginForm.userPhone"
                placeholder="用户名"
                name="userPhone"
                type="text"
                tabindex="1"
                autocomplete="on"
              />
            </el-form-item>

            <!-- <el-tooltip
            v-model="capsTooltip"
            content="Caps lock is On"
            placement="right"
            manual
          > -->
            <el-form-item prop="userPassword">
              <!-- <span class="svg-container">
                <svg-icon icon-class="password" />
              </span> -->
              <el-input
                :key="passwordType"
                ref="userPassword"
                v-model="loginForm.userPassword"
                :type="passwordType"
                placeholder="密码"
                name="userPassword"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <!-- <span class="show-pwd" @click="showPwd">
                <svg-icon
                  :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
                />
              </span> -->
            </el-form-item>
            <!-- </el-tooltip> -->
            <el-button
              :loading="loading"
              style="
                width: 100%;
                height: 47px;
                margin-bottom: 30px;
                border: none;
                font-size: 18px;
                color: #3f7efc;
              "
              @click.native.prevent="handleLogin"
              >登&nbsp;&nbsp;录</el-button
            >

            <!-- <div style="position:relative">
        <div class="tips">
          <span>Username : admin</span>
          <span>Password : any</span>
        </div>
        <div class="tips">
          <span style="margin-right:18px;">Username : editor</span>
          <span>Password : any</span>
        </div>

        <el-button class="thirdparty-button" type="primary" @click="showDialog=true">
          Or connect with
        </el-button>
        </div>-->
          </el-form>
        </div>

        <!-- <div
          style="
            position: absolute;
            right: 10%;
            bottom: 5%;
            font-size: 20px;
            width: 300px;
            text-align: center;
            color: #fff;
          "
        >
          浙江自贸区中喆汽车服务有限公司
        </div> -->
      </div>
    </div>
    <vue-particles
      color="#000"
      :particleOpacity="0.1"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#000"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.1"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    ></vue-particles>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import SocialSign from "./components/SocialSignin";
import { login } from "@/api/login";
import { getCnDate } from "@/utils/cnTime";
import { loginIn } from "@/api/loginOld";
import waves from "@/directive/waves"; // waves directive
export default {
  name: "Login",
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim() === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error("密码长度不得少于4位"));
      } else {
        callback();
      }
    };
    return {
      logo: require("./../../assets/afLogo.png"),
      loginForm: {
        userPhone: "",
        userPassword: "",
      },
      nowTime: undefined,
      cnTime: undefined,
      loginRules: {
        userPhone: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        userPassword: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "80px",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  created() {
    this.loginOutDes = this.$route.query.loginOutDes;
    if (this.loginOutDes) {
      const h = this.$createElement;
      this.$notify({
        duration: 1000,
        message: h("i", this.loginOutDes),
        position: "bottom-right",
      });
    }
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.userPhone == "") {
      this.$refs.userPhone.focus();
    } else if (this.loginForm.userPassword == "") {
      this.$refs.userPassword.focus();
    }
    this.running_time();
    this.cnTime = getCnDate();
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && key >= "a" && key <= "z") ||
          (!shiftKey && key >= "A" && key <= "Z")
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.userPassword.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          let res = await login(this.loginForm);

          if (res.rtn === "1") {
            localStorage.setItem(
              "companyRole",
              JSON.stringify(res.result.companyRole)
            );
            localStorage.setItem(
              "userInfo",
              JSON.stringify(res.result.userInfo)
            );
            localStorage.setItem(
              "menuList",
              JSON.stringify(res.result.menuList)
            );
            localStorage.setItem(
              "functionList",
              JSON.stringify(res.result.functionList)
            );
            localStorage.setItem("roleList", res.result.roleList);
            localStorage.setItem("token", res.result.token);
            const tokens = {
              userId: res.result.userInfo.userId,
              token: res.result.token,
            };
            // let oldLogin = await loginIn({
            //   account: this.loginForm.userPhone,
            //   password: "afu2020"
            // });
            // localStorage.setItem("managerUuid", oldLogin.managerUuid);
            // localStorage.setItem("rolePoster", oldLogin.rolePoster);
            // localStorage.setItem("power", JSON.stringify(oldLogin.power));
            this.$router.push({ name: "Dashboard" });
            this.$store
              .dispatch("user/login", tokens)
              .then(() => {
                this.$router.push({
                  path: this.redirect || "/",
                  query: this.otherQuery,
                });
              })
              .catch(() => {
                this.loading = false;
              });
          }
          this.loading = false;

          // if (res.result === '0') {
          //   localStorage.setItem('managerUuid', res.managerUuid)
          //   localStorage.setItem('password', this.loginForm.userPassword)
          //   localStorage.setItem('rolePoster', res.rolePoster)
          //   localStorage.setItem('power', JSON.stringify(res.power))
          //   // localStorage.setItem('managerUuid', res.managerUuid)
          //   // localStorage.setItem('password', this.loginForm.password)
          //   this.$router.push({ name: 'Dashboard' })
          //   this.$store.dispatch('user/login', { managerUuid: res.managerUuid }).then(() => {
          //     this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          //   }).catch(() => {
          //     this.loading = false
          //   })
          // }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    running_time() {
      var D = new Date();
      var year = D.getFullYear(); //四位数年份
      var month = D.getMonth() + 1; //月份(0-11),0为一月份
      month = month < 10 ? "0" + month : month;

      var day = D.getDate(); //月的某一天(1-31)
      day = day < 10 ? "0" + day : day;

      var hours = D.getHours(); //小时(0-23)
      hours = hours < 10 ? "0" + hours : hours;

      var minutes = D.getMinutes(); //分钟(0-59)
      minutes = minutes < 10 ? "0" + minutes : minutes;

      var seconds = D.getSeconds(); //秒(0-59)
      seconds = seconds < 10 ? "0" + seconds : seconds;

      var week = D.getDay(); //周几(0-6),0为周日
      var weekArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

      var now_time =
        year + "年" + month + "月" + day + "日" + " " + weekArr[week];
      this.nowTime = now_time;
      console.log(now_time);
    },
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #001f58;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .login-container-inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 50%;
    // right: 16%;
    transform: translate(0, -50%);
    .msBg {
      margin-top:50px;
      margin-left: 16%;
    }
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: #fff;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 3px;
      // padding: 12px 5px 12px 15px;
      color: #454545;
      height: 47px;
      // caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #fff inset !important;
        // -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 24px;
  }
  .el-form-item--small .el-form-item__error {
    padding-top: 6px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.logo {
  width: 80px;
  height: 80px;
}
.login-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  // overflow: hidden;

  .login-form {
    position: absolute;
    width: 300px;
    max-width: 100%;
    // padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    top: calc(50% - 10em);
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    margin-bottom: 20px;

    .title,
    .nowTime,
    .cnTime {
      font-size: 20px;
      color: #fff;
      // margin-left: 16px;
      text-align: center;
      font-weight: bold;
      letter-spacing: 2px;
    }
    .nowTime,
    .cnTime {
      font-size: 16px;
    }
  }

  .nowTime {
    padding-bottom: 5px;
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

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
// .login-container {
//   background: url("https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2179604772,4159775843&fm=26&gp=0.jpg") !important;
//   background-size: cover !important;
//   background-repeat: no-repeat !important;
// }
.login-container .login-form {
  // padding-top: 40px !important;
  right: 10%;
}

.html {
  position: relative;
  box-sizing: border-box;

  --black: #1a1c20;
  --white: #fff;
  --green: #3f7efc;
  --d-green: #000000;
  --gray: #c1c1c1;
  --l-gray: #c4c4c4;
  --m-gray: #373838;
  --d-gray: #282724;
  --d-blue: #202428;
  --orange: green;
  --yellow: #dfa500;
  --l-yellow: #deb953;
  --light: #fbfbfb;
  --n-road: -4em;
  --p-road: 7em;

  background-color: var(--green);
  // background: #e5e5f3;
}

#particles-js {
  background:#E5E5F3 100%;
  // background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -99999;
}

.html *,
.html *::before,
.html *::after {
  box-sizing: inherit;
}

.body::before,
.body::after {
  content: " ";
  position: absolute;
}

.body {
  margin: 0;
  height: 100vh;
  display: flex;
  overflow: hidden;
  position: relative;
  left: -20%;
  top: 80px;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-color: var(--green);
  animation: car 3.5s cubic-bezier(0.57, 0.63, 0.49, 0.65) infinite;
  background-image:
            /* ===rubber-l */ radial-gradient(
      circle at 49% 117%,
      var(--black) 37%,
      transparent 38%
    ),
    radial-gradient(circle at -24% 50%, var(--white) 31%, transparent 49%),
    radial-gradient(2.95em 2.5em at 52% 1.2%, var(--black) 37%, transparent 38%),
    radial-gradient(2.95em 2.5em at 52% 1.2%, var(--black) 37%, transparent 38%),
    linear-gradient(var(--black) 100%, transparent 0),
    /* rubber-l=== */ /* ===rubber-r */
      radial-gradient(circle at 49% 117%, var(--black) 37%, transparent 38%),
    radial-gradient(circle at 124% 50%, var(--white) 31%, transparent 49%),
    radial-gradient(2.95em 2.5em at 48% 1.2%, var(--black) 37%, transparent 38%),
    radial-gradient(2.95em 2.5em at 48% 1.2%, var(--black) 37%, transparent 38%),
    linear-gradient(var(--black) 100%, transparent 0),
    /* rubber-r=== */ /* ===shadow */
      linear-gradient(var(--d-green) 100%, transparent 0);

  /* shadow=== */

  background-size:


            /* ===rubber-l */ 2.5em 2.5em, 0.7em 0.6em,
    2.5em 0.9em, 2.5em 0.9em, 1.95em 3.9em,
    /* rubber-l=== */ /* ===rubber-r */ 2.5em 2.5em, 0.7em 0.6em, 2.5em 0.9em,
    2.5em 0.9em, 1.95em 3.9em, /* rubber-r=== */ /* ===shadow */ 13em 0.9em;

  /* shadow=== */

  background-position:


            /* ===rubber-l */ calc(50% - 6.4em)
      calc(50% - 1.7em),
    calc(50% - 5.26em) calc(50% - -3.4em), calc(50% - 6.5em) calc(50% - -3.8em),
    calc(50% - 4.3em) calc(50% - -3.2em), calc(50% - 6.58em) calc(50% - -1.5em),
    /* rubber-l=== */ /* ===rubber-r */ calc(50% - -6.45em) calc(50% - 1.7em),
    calc(50% - -5.26em) calc(50% - -3.4em),
    calc(50% - -6.5em) calc(50% - -3.8em), calc(50% - -4.3em) calc(50% - -3.2em),
    calc(50% - -6.58em) calc(50% - -1.5em),
    /* rubber-r=== */ /* ===shadow */ center calc(50% - -3.8em);

  /* shadow=== */
}

.body::before {
  top: calc(50% - 26.2em);
  width: 15.5em;
  height: 62.9em;
  background-size: 24.6% 491%;
  background-repeat: no-repeat;
  background-position: center 0;
  animation: line 1.5s infinite linear, move-road 3.5s infinite linear;
  transform: perspective(311px) rotateX(83deg)
    translate3d(var(--n-road), -11.975em, 0);
  background-image: repeating-linear-gradient(
    to top,
    var(--white),
    var(--white) 4.6%,
    transparent 0,
    transparent 13.01%
  );
}

.body::after {
  width: 15.2em;
  height: 13.2em;
  top: calc(50% - 8.8em);
  left: calc(50% - 7.55em);
  background-repeat: no-repeat;
  animation: light 1s linear infinite, shake 3.5s linear infinite;

  background-image:

            /* ===ceiling */ radial-gradient(
      58em 20em at 50% 215%,
      transparent 20%,
      var(--white) 20.5%,
      var(--white) 20.8%,
      var(--green) 21.5%
    ),
    /* ceiling=== */ /* ===antenna */
      radial-gradient(circle at center 100%, var(--black) 30%, transparent 0),
    /* antenna=== */ /* ===antenna */
      linear-gradient(var(--white) 100%, transparent 0),
    /* antenna=== */ /* ===glass-l */
      radial-gradient(
        17.8em 37em at 70% 240%,
        var(--black) 30%,
        transparent 30.5%
      ),
    /* glass-l=== */ /* ===glass-r */
      radial-gradient(
        17.8em 37em at 31% 240%,
        var(--black) 30%,
        transparent 30.5%
      ),
    /* glass-r=== */ /* ===light */
      radial-gradient(
        circle,
        var(--light) 48%,
        var(--black) 52%,
        var(--black) 59%,
        transparent 62%
      ),
    /* light=== */ /* ===light */
      radial-gradient(
        circle,
        var(--light) 48%,
        var(--black) 52%,
        var(--black) 59%,
        transparent 62%
      ),
    /* light=== */ /* ===hood-ro */
      radial-gradient(1em 1em at 102% 100%, var(--m-gray) 28%, #f3f3f3 30%),
    /* hood-ro=== */ /* ===hood-ro */
      radial-gradient(1em 1em at 97% -7%, var(--m-gray) 28%, var(--l-gray) 30%),
    /* hood-ro=== */ /* ===hood-ro */
      radial-gradient(1em 1em at -6% 102%, var(--m-gray) 28%, #efefef 30%),
    /* hood-ro=== */ /* ===hood-ro */
      radial-gradient(1em 1em at -6% -1%, var(--m-gray) 28%, var(--l-gray) 30%),
    /* hood-ro=== */ /* ===hood-f */
      linear-gradient(
        to top,
        var(--m-gray) 50%,
        var(--d-gray) 0,
        var(--d-gray) 58%,
        var(--m-gray) 0
      ),
    /* hood-f=== */ /* ===hood-e */
      linear-gradient(
        to top,
        var(--l-gray) 30%,
        var(--white) 100%,
        transparent 0
      ),
    /* hood-e=== */ /* ===hood-l */
      radial-gradient(
        16.4em 30.1em at 209% 333%,
        var(--white) 30%,
        transparent 30.2%
      ),
    /* hood-l=== */ /* ===hood-r */
      radial-gradient(
        16.4em 30.1em at -109% 333%,
        var(--white) 30%,
        transparent 30.2%
      ),
    /* hood-r=== */ /* ===hood-o */
      linear-gradient(var(--gray) 100%, transparent 0),
    /* hood-o=== */ /* ===hood */
      linear-gradient(var(--white) 100%, transparent 0),
    /* hood=== */ /* ===mirror */
      radial-gradient(6.7em 2.5em at 154% 8%, var(--black) 30%, transparent 33%),
    /* mirror=== */ /* ===mirror */
      radial-gradient(6.7em 2.5em at -53% 8%, var(--black) 30%, transparent 33%),
    /* mirror=== */ /* ===guide-l */
      linear-gradient(var(--orange) 100%, transparent 0),
    /* guide-l=== */ /* ===guide-r */
      linear-gradient(var(--orange) 100%, transparent 0),
    /* guide-r=== */ /* ===plaque */
      linear-gradient(var(--yellow) 100%, transparent 0),
    /* plaque=== */ /* ===plaque */
      linear-gradient(var(--l-yellow) 100%, transparent 0),
    /* plaque=== */ /* ===bumper */
      linear-gradient(var(--d-blue) 100%, transparent 0),
    /* bumper=== */ /* ===bumper-l */
      radial-gradient(circle at 124% 39%, var(--d-blue) 60%, transparent 64%),
    /* bumper-l=== */ /* ===bumper-r */
      radial-gradient(circle at -44% 39%, var(--d-blue) 60%, transparent 64%),
    /* bumper-r=== */ /* ===bumper-d */
      radial-gradient(
        13.2em 2em at 50% 59%,
        var(--l-gray) 96%,
        transparent 100%
      ),
    /* bumper-d=== */ /* ===bumper-l */
      radial-gradient(
        1.6em 1.6em at 75% -9%,
        var(--l-gray) 60%,
        transparent 64%
      ),
    /* bumper-l=== */ /* ===bumper-r */
      radial-gradient(
        1.6em 1.6em at 15% -9%,
        var(--l-gray) 60%,
        transparent 64%
      ),
    /* bumper-r=== */ /* ===floor */
      linear-gradient(var(--d-blue) 100%, transparent 0),
    /* floor=== */ /* ===floor-l */
      radial-gradient(
        6.9em 4.6em at 295% 3%,
        var(--d-blue) 30%,
        transparent 31%
      ),
    /* floor-l=== */ /* ===floor-r */
      radial-gradient(
        6.9em 4.6em at -189% 3%,
        var(--d-blue) 30%,
        transparent 31%
      );

  /* floor-r=== */

  background-size:

            /*=== ceiling */ 61.5% 20%,
    /* ceiling=== */ /* ===antenna */ 5% 6%,
    /* antenna=== */ /*=== antenna */ 0.4% 39%,
    /* antenna=== */ /* ===glass-l */ 60% 30%,
    /* glass-l=== */ /* ===glass-r */ 60% 30%,
    /* glass-r=== */ /* ===light */ 16% 16%,
    /* light=== */ /* ===light */ 16% 16%,
    /* light=== */ /* ===hood-ro */ 2.4% 2%,
    /* hood-ro=== */ /* ===hood-ro */ 2.4% 2.3%,
    /* hood-ro=== */ /* ===hood-ro */ 2.4% 2.3%,
    /* hood-ro=== */ /* ===hood-ro */ 2.4% 2.3%,
    /* hood-ro=== */ /* ===hood-f */ 91% 12%,
    /* hood-f=== */ /* ===hood-e */ 93.9% 17%,
    /* hood-e=== */ /* ===hood-l */ 12% 17.5%,
    /* hood-l=== */ /* ===hood-r */ 12% 17.5%,
    /* hood-r=== */ /* ===hood-o */ 38% 1.1%,
    /* hood-o=== */ /* ===hood */ 77% 25%, /* hood=== */ /* ===mirror */ 9% 30%,
    /* mirror=== */ /* ===mirror */ 9% 30%,
    /* mirror=== */ /* ===guide-l */ 8.4% 3%,
    /* guide-l=== */ /* ===guide-r */ 8.4% 3%,
    /* guide-r=== */ /* ===plaque */ 33% 6.5%,
    /* plaque=== */ /* ===plaque */ 36% 9%,
    /* plaque=== */ /* ===bumper */ 87% 30%,
    /* bumper=== */ /* ===bumper-l */ 10% 12%,
    /* bumper-l=== */ /* ===bumper-r */ 10% 12%,
    /* bumper-r=== */ /* ===bumper-d */ 78% 35%,
    /* bumper-d=== */ /* ===bumper-l */ 11% 8%,
    /* bumper-l=== */ /* ===bumper-r */ 11% 8%,
    /* bumper-r=== */ /* ===floor */ 68% 8%,
    /* floor=== */ /* ===floor-l */ 5% 7%,
    /* floor-l=== */ /* ===floor-r */ 5% 7%;

  /* floor-r=== */

  background-position:


            /*=== ceiling */ 50.5% 0,
    /* ceiling=== */ /* ===antenna */ 90% 37%,
    /* antenna=== */ /*=== antenna */ 88% 1.2%,
    /* antenna=== */ /* ===glass-l */ 0 11.7%,
    /* glass-l=== */ /* ===glass-r */ 100% 11.7%,
    /* glass-r=== */ /* ===light */ 5% 63%,
    /* light=== */ /* ===light */ 95% 63%,
    /* light=== */ /* ===hood-ro */ 4.1% 55.7%,
    /* hood-ro=== */ /* ===hood-ro */ 4.1% 65.9%,
    /* hood-ro=== */ /* ===hood-ro */ 95.8% 55.7%,
    /* hood-ro=== */ /* ===hood-ro */ 95.8% 65.8%,
    /* hood-ro=== */ /* ===hood-f */ center 62%,
    /* hood-f=== */ /* ===hood-e */ 49% 63.6%,
    /* hood-e=== */ /* ===hood-l */ 3.4% 46.2%,
    /* hood-l=== */ /* ===hood-r */ 96.5% 46.2%,
    /* hood-r=== */ /* ===hood-o */ center 40.9%,
    /* hood-o=== */ /* ===hood */ center 50.3%,
    /* hood=== */ /* ===mirror */ 5.7% 48.6%,
    /* mirror=== */ /* ===mirror */ 95% 48.6%,
    /* mirror=== */ /* ===guide-l */ 5% 75.2%,
    /* guide-l=== */ /* ===guide-r */ 95% 75.2%,
    /* guide-r=== */ /* ===plaque */ 51% 86%,
    /* plaque=== */ /* ===plaque */ 51.5% 87.3%,
    /* plaque=== */ /* ===bumper */ center 71.9%,
    /* bumper=== */ /* ===bumper-l */ -0.8% 77.8%,
    /* bumper-l=== */ /* ===bumper-r */ 101.7% 77.8%,
    /* bumper-r=== */ /* ===bumper-d */ center 80.2%,
    /* bumper-d=== */ /* ===bumper-l */ 4% 85.9%,
    /* bumper-l=== */ /* ===bumper-r */ 97% 85.9%,
    /* bumper-r=== */ /* ===floor */ center 92.5%,
    /* floor=== */ /* ===floor-l */ 11.7% 92.6%,
    /* floor-l=== */ /* ===floor-r */ 88.3% 92.6%;

  /* floor-r=== */
}

@keyframes line {
  100% {
    background-position: center 100%;
  }
}

@keyframes car {
  15%,
  23% {
    transform: translateX(-2.3em);
  }

  36%,
  42% {
    transform: translateX(-0.8em);
  }

  61%,
  71.5% {
    transform: translateX(2.8em);
  }

  81%,
  88% {
    transform: translateX(1.5em);
  }
}

@keyframes move-road {
  5.5% {
    transform: perspective(311px) rotateX(83deg)
      translate3d(var(--n-road), -11.975em, 0);
  }

  27%,
  51% {
    transform: perspective(311px) rotateX(83deg)
      translate3d(var(--p-road), -11.975em, 0);
  }

  73%,
  100% {
    transform: perspective(311px) rotateX(83deg)
      translate3d(var(--n-road), -11.975em, 0);
  }
}

@keyframes light {
  0%,
  37% {
    --light: #fbfbfb;
  }

  50% {
    --light: #f1f1f1;
  }

  62% {
    --light: #fbfbfb;
  }

  65% {
    --light: #f1f1f1;
  }

  95% {
    --light: #fbfbfb;
  }

  100% {
    --light: #f1f1f1;
  }
}

@keyframes shake {
  5%,
  26% {
    transform: rotate(-1.5deg);
  }

  33%,
  41% {
    transform: rotate(-0.5deg);
  }

  48%,
  69% {
    transform: rotate(1.5deg);
  }

  80%,
  95% {
    transform: rotate(0.5deg);
  }
}

@media screen and (max-width: 36em) {
  .html {
    transform: scale(0.5);
  }

  .body::before {
    width: 11em;
    --n-road: -4em;
    --p-road: 4em;
  }
}
.login-container .el-input {
  width: 100% !important;
  border-radius: 3px;
}
</style>
