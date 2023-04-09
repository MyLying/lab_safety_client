<template>
  <div class="practice">
    <el-container>
      <el-aside width="300px" class="practice-aside">
        <div style="display: flex; height: 100%; flex-direction: column">
          <div style="flex: 1; width: 90%; margin-left: 4%">
            <el-button
              id="refreshsendHttp"
              size="mini"
              style="margin: 24px 25px 0 0; width: 100%"
              @click="refreshsendHttp()"
              :disabled="false"
            >
              <el-icon><Refresh /></el-icon><span>刷新题库</span>
            </el-button>
          </div>
          <div style="flex: 1; width: 90%; margin-left: 4%">
            <span>选择题目所属题库-{{ practice_view }}</span>
            <el-select
              v-model="practice_view"
              class="m-2"
              placeholder="请选择你要练习的题库"
              size="large"
              style="width: 100%; margin-top: 10px"
            >
              <el-option
                v-for="item in practiceTableData"
                :key="item.practice_id"
                :label="item.practice_name"
                :value="item.practice_view"
              />
            </el-select>
          </div>
          <div style="flex: 1; width: 90%; margin-left: 4%">
            <span>选择题目数量-{{ questionNumbertest }}</span>
            <el-slider v-model="questionNumbertest" :step="10" show-stops />
          </div>
        </div>
      </el-aside>
      <el-main class="practice-main">
        <Practice
          :practice_view="practice_view"
          :questionNumber="questionNumber"
        ></Practice>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, watch } from "vue";
import { useStore } from "vuex";
import Practice from "./PracticePage.vue";
export default {
  components: { Practice },
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();

    const practice_view = ref();
    const selectTwo = ref();
    const questionNumber = ref(10);
    const questionNumbertest = ref(10);

    const practiceTableData = ref();
    practiceTableData.value = [];
    const refreshsendHttp = () => {
      getPracticeTableData();
      document.getElementById("refreshsendHttp").disabled = true;
      setTimeout(() => {
        document.getElementById("refreshsendHttp").disabled = false;
        console.log("更新数据冷却时间到，可重新刷新！");
      }, 10000);
    };

    const getPracticeTableData = () => {
      proxy.$https
        .get("/practiceAll", {})
        .then((res) => {
          practiceTableData.value = res.data;
          store.commit("setPracticeTableData", res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const sendHttp = () => {
      if (!store.getters.getPracticeTableData.length) {
        getPracticeTableData();
      } else {
        console.log(
          "Practice-getPracticeTableData",
          store.getters.getPracticeTableData
        );
        practiceTableData.value = store.getters.getPracticeTableData;
      }
    };
    onMounted(() => {
      console.log("mounted in the composition api!");
      sendHttp();
    });
    watch(practice_view, () => {
      questionNumber.value = questionNumbertest.value;
    });
    return {
      practiceTableData,
      getPracticeTableData,
      practice_view,
      selectTwo,
      refreshsendHttp,
      questionNumber,
      questionNumbertest,
    };
  },
};
</script>


<style lang="less" scoped>
.practice {
  // height: 100%;
  font-size: 14px;
  background-color: antiquewhite;
  .practice-aside {
    padding: 10px;
    // background-color: greenyellow;
    border-right: 5px solid aqua;
  }
  .practice-main {
    padding: 10px;
    height: 500px;
    // background-color: red;
  }
}
</style>