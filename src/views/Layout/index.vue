<template>
  <MyMenu></MyMenu>
  <Content></Content>
  <Footer></Footer>
</template>

<script>
import MyMenu from "./Header";
import Content from "./Content";
import Footer from "./Footer";
export default {
  name: "layout",
  components: { MyMenu, Content, Footer },
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped>
</style>