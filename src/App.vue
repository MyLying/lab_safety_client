<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style >
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: black;
}
ul,
li {
  list-style: none;
}
html,
body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  min-width: 960px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
