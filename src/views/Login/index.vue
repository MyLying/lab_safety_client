<template>
  <div style="display: flex; justify-content: center">
    <vue-particles
      class="login-background"
      color="#97D0F2"
      :particleOpacity="0.7"
      :particlesNumber="50"
      shapeType="circle"
      :particleSize="4"
      linesColor="#97D0F2"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="login-other">
      <el-form
        :rules="rules"
        ref="loginForm"
        :model="loginForm"
        class="loginContainer"
      >
        <H3 class="loginTitle">实验室培训考试系统</H3>
        <el-form-item prop="account">
          <el-input
            prefix-icon="el-icon-user-solid"
            size="normal"
            type="text"
            v-model="loginForm.account"
            auto-complete="off"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            size="normal"
            type="password"
            v-model="loginForm.password"
            auto-complete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div style="display: flex; justify-content: space-between">
            <el-input
              prefix-icon="el-icon-circle-check"
              style="width: 230px"
              size="normal"
              type="text"
              v-model="loginForm.code"
              auto-complete="off"
              placeholder="请输入验证码"
              @keydown.enter="submitLogin"
            >
            </el-input>
            <img :src="vcUrl" @click="updateVerifyCode" />
          </div>
        </el-form-item>
        <el-checkbox size="normal" class="loginRemember" v-model="checked"
          >记住密码</el-checkbox
        >
        <el-button
          size="normal"
          type="primary"
          style="width: 100%"
          @click="submitLogin"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { getCurrentInstance, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    // 引入路由
    const store = useStore();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const imgSrc = ref();
    const vcUrl = ref();
    const loginForm = ref([]);
    const rules = ref({});
    const checked = ref();
    vcUrl.value = "http://jw.cqcst.edu.cn/cqdxcskjxy/verifycode.servlet";
    imgSrc.value = require("@/assets/logo.png");
    loginForm.value = [
      {
        account: "21310104144",
        password: "cqck2131010414",
        code: "",
      },
    ];
    rules.value = {
      account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
      code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
    };
    checked.value = true;
    const updateVerifyCode = () => {
      this.vcUrl.value =
        "http://jw.cqcst.edu.cn/cqdxcskjxy/verifycode.servlet?t=" +
        Math.random();
    };
    const submitLogin = () => {
      proxy.$https
        .post("/user_s_Login", {
          account: "2131010414",
          password: "cqck2131010414",
          code: "",
        })
        .then((res) => {
          console.log(res);
          //  执行请求代码正确
          console.log("执行请求代码正确");
          // 保存登录信息到Vuex
          const token = "test-token";
          const userinfo = res.data[0];
          store.commit("setUser", userinfo);
          store.commit("setToken", token);

          // 登录成功提示
          ElMessage({
            message: "登录成功!",
            type: "success",
          });
          
          // 跳转主页
          router.push({ path: "/" });
        })
        .catch((err) => {
          console.log(err);
          //  执行请求代码错误
          console.log("执行请求代码错误");
          store.commit("setUser", {});
          store.commit("setToken", "");
          // 登录失败提示
          ElMessage({
            message: "登录失败!",
            type: "error",
          });
        });
    };
    return {
      imgSrc,
      vcUrl,
      loginForm,
      rules,
      checked,
      submitLogin,
      updateVerifyCode,
    };
  },
};
</script>

<style lang="less" scoped>
.login-background {
  background: linear-gradient(-180deg, #dcf2e6 0%, #ffffff 100%);
  width: 100%;
  min-width: 800px;
  height: 99%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
}

.login-other {
  z-index: 1;
  margin-top: 150px;
  position: absolute;
  flex: 1;

  .loginContainer {
    border-radius: 15px;
    background-clip: padding-box;
    width: 350px;
    padding: 15px 35px 15px 35px;
    background: #fefefe;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

    .loginTitle {
      margin: 15px auto 20px auto;
      text-align: center;
      color: #707070;
    }
    .loginRemember {
      text-align: left;
      margin: 0 0 15px 0;
    }
  }
}
</style>

