<template>
  <div>
    <div>ExamPage組件</div>
    <div>{{ props }}</div>
    
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  props: ["props"],
  setup(props) {
    const router = useRouter();

    onMounted(() => {
      console.log("ExamList", router.params);
      console.log("ExamList", router.query);
      console.log("ExamList", props);
    });

    return {
      router,
    };
  },
};
</script>

<style>
</style>