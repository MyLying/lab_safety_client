<template>
  <div class="xtx-bread">
    <div class="xtx-bread-item">
      <RouterLink to="/">首页</RouterLink>
    </div>
    <i class="iconfont icon-angle-right"></i>
    <template v-if="parentName">
      <div class="xtx-bread-item" v-if="parentName">
        <RouterLink v-if="parentPath" to="/category/10000">{{
          parentName
        }}</RouterLink>
        <span v-else>{{ parentName }}</span>
      </div>
    </template>
    <i v-if="parentName" class="iconfont icon-angle-right"></i>
    <div class="xtx-bread-item">
      <span> <slot /> </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    parentName: {
      type: String,
      default: "",
    },
    parentPath: {
      type: String,
      default: "",
    },
  },
};
</script>
<style scoped lang='less'>
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
