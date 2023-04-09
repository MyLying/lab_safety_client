<template>
  <div class="header">
    <div class="left"><span>实验室安全培训考试系统</span></div>
    <div class="menu">
      <el-menu
        class="el-menu-demo"
        :default-active="route.path"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
        router
      >
        <el-menu-item index="/learn">在线学习</el-menu-item>
        <el-menu-item index="/practice">题库训练</el-menu-item>
        <el-menu-item index="/exam">在线考试</el-menu-item>
        <el-menu-item index="/home">用户中心</el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <div class="name"><span>{{ user_student_name}}</span></div>

      <div class="line">|</div>
      <div class="loginout" @click="out">
        <el-icon><SwitchButton /></el-icon>
      </div>
    </div>
  </div>
</template>

<script >
import { onMounted, ref } from "vue";
import dayjs from "dayjs";
import { useRoute, useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const user_student_name =store.getters.getUserInfo.user_student_name
    // 定义时间
    let time = ref(null);
    // 引入路由
    const router = useRouter();
    // 生命周期函数
    onMounted(() => {
      // 获取当前时间
      time.value = dayjs(new Date()).format("YYYY-MM-DD");
    });
    // 跳转登录界面
    const out = () => {
      // 退出登录代码
      ElMessageBox.confirm("您确定要退出登录吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          ElMessage({
            type: "success",
            message: "已完成退出登录！",
          });
          store.commit("deleteUser");
          localStorage.removeItem("vuex");
          router.push("/login");
        })
        .catch(() => {
          ElMessage({
            type: "success",
            message: "已取消退出登录！",
          });
        });
    };
    const route = useRoute();

    return { time, out, route , user_student_name};
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 58px;
  line-height: 58px;
  display: flex;
  padding: 0 50px;
  background-color: #545c64;
  color: #fff;
  font-size: 14px;
  .left {
    flex: 3;
  }
  .menu {
    flex: 6;
  }
  .right {
    // float :right;
    padding-right: 20px;
    display: flex;
    font-size: 16px;
    .time {
      font-size: 12px;
    }
    .line {
      padding-left: 10px;
      padding-right: 10px;
    }
    .name {
      margin-right: 5px;
    }
    .loginout {
      margin-top: 2px;
    }
  }
}
</style>