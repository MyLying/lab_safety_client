<template>
  <div>
    <h1>预约系统</h1>
    <p>阿萨德撒发发生奥术大师多是的是的撒</p>
    <el-button type="primary" @click="click1"
      ><el-icon><CircleClose /></el-icon>未获得证书预约操作</el-button
    >
    <el-button type="primary" @click="click2"
      ><el-icon><CircleClose /></el-icon>已获得证书预约操作</el-button
    >
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const click1 = () => {
      console.log("预约失败，您未获取预约凭证，请前往考试！");
      router.push("/home");
    };
    const click2 = () => {
      console.log("预约成功！");
    };

    return {
      click1,
      click2,
    };
  },
};
</script>

<style>
</style>