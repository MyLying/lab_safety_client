<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  // height: 700px;
  margin: 10px 50px;
  padding: 5px;
  background-color: aqua;
}
</style>