<template>
  <div class="learn">
    <h2>Learn</h2>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const learnTableData = ref();
    learnTableData.value = [];

    const sendHttp = () => {
      if (!store.getters.getLearnTableData.length) {
        proxy.$https
          .get("/learnAll", {})
          .then((res) => {
            learnTableData.value = res.data;
            store.commit("setLearnTableData", res.data);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("Learn-getLearnTableData", store.getters.getLearnTableData);
        learnTableData.value = store.getters.getLearnmTableData;
      }
    };
    onMounted(() => {
      console.log("mounted in the composition api!");
      sendHttp();
    });

    return {};
  },
};
</script>


<style lang="less" scoped>
.learn {
  height: 100%;
  background-color: antiquewhite;
}
</style>