<template>
  <div class="exam">
    <el-button
      id="refreshsendHttp"
      size="mini"
      style="float: right; margin: 24px 25px 0 0"
      @click="refreshsendHttp()"
      :disabled="false"
    >
      <el-icon><Refresh /></el-icon><span>刷新考试</span>
    </el-button>
    <div style="height: 30px; padding: 10px 0 0 10px; line-height: 30px">
      <span style="float: left; font-size: 14px"> 考试所属学院：</span>
      <el-checkbox-group
        v-model="clloegeList"
        size="small"
        style="float: left; margin-top: 3.33px"
      >
        <el-checkbox-button
          v-for="clloege in clloeges"
          :key="clloege"
          :label="clloege"
          >{{ clloege }}</el-checkbox-button
        >
      </el-checkbox-group>
    </div>

    <div style="height: 30px; padding: 0 0 10px 10px; line-height: 30px; border-bottom: 5px solid aqua;">
      <span style="float: left; font-size: 14px">考试所属实验室：</span>
      <el-checkbox-group
        v-model="laboratoryList"
        size="small"
        style="float: left; margin-top: 3.33px"
      >
        <el-checkbox-button
          v-for="laboratory in laboratorys"
          :key="laboratory"
          :label="laboratory"
          >{{ laboratory }}</el-checkbox-button
        >
      </el-checkbox-group>
    </div>


    <div class="exam-cards" style="">
      <el-card
        v-for="item in examTableData"
        :key="item.exam_id"
        class="exam-card"
      >
        <el-descriptions
          :title="item.exam_name"
          direction="horizontal"
          :column="1"
          size="small"
          border
          align="center"
        >
          <el-descriptions-item align="center" label="实验室">{{
            item.laboratory_name
          }}</el-descriptions-item>
          <el-descriptions-item align="center" label="试卷总分">{{
            item.exam_scoresAll
          }}</el-descriptions-item>
          <el-descriptions-item align="center" label="考试时长">
            <el-tag size="small">{{ item.exam_duration }}-Min</el-tag>
          </el-descriptions-item>
          <el-descriptions-item align="center" label="开始时间">{{
            item.exam_beginTime
          }}</el-descriptions-item>
          <el-descriptions-item align="center" label="结束时间">{{
            item.exam_endTime
          }}</el-descriptions-item>
          <el-descriptions-item align="center" label="操作">
            <el-button size="small" @click="stratExam(item)"
              >开始考试</el-button
            >
            <el-button size="small" @click="viewExam(item)">查看记录</el-button>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>
  </div>
</template>

<script>
// import ExamPage from "./ExamPage.vue";
import { ref, getCurrentInstance, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default {
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const examTableData = ref([]);

    const clloegeList = ref([""]);
    const clloeges = ["人工", "电气", "土木", "人文"];
    const laboratoryList = ref([""]);
    const laboratorys = [
      "人工实验室",
      "电气实验室",
      "土木实验室",
      "人文实验室",
    ];
    const getExamTableData = () => {
      proxy.$https
        .get("/examAll", {})
        .then((res) => {
          examTableData.value = res.data;
          // console.log(typeof res.data, res.data);
          store.commit("setExamTableData", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const refreshsendHttp = () => {
      getExamTableData();
      document.getElementById("refreshsendHttp").disabled = true;
      setTimeout(() => {
        document.getElementById("refreshsendHttp").disabled = false;
        console.log("更新数据冷却时间到，可重新刷新！");
      }, 10000);
    };

    const sendHttp = () => {
      if (!store.getters.getExamTableData.length) {
        getExamTableData();
      } else {
        // console.log("Exam-getExamTableData", store.getters.getExamTableData);
        examTableData.value = store.getters.getExamTableData;
      }
    };

    const stratExam = (e) => {
      // 进行时间节点判断，是否在考试时间内，不再范围内提示
      let beginTime = new Date(e.exam_beginTime).getTime();
      let newTime = new Date().getTime();
      let endTime = new Date(e.exam_endTime).getTime();
      console.log(beginTime < newTime);
      console.log(newTime < endTime);
      if (!(beginTime < newTime && newTime < endTime)) {
        ElMessage({
          type: "success",
          message: "不在考试时间范围内，不允许参加本次考试！",
        });
      } else {
        // 进行考试记录判断，是否存在考试记录，有考试记录提示
        for (const item of store.getters.getExamrecordsTableData) {
          if (
            item.exam_name === e.exam_name &&
            item.user_student_account ===
              store.getters.getUserInfo.user_student_account
          ) {
            ElMessage({
              type: "success",
              message: "你已参加过本次考试，请等待下一次考试开放！",
            });
          } else {
            // if (
            //   item.exam_name === e.exam_name &&
            //   item.user_student_account ===
            //     store.getters.getUserInfo.user_student_account
            // ) {
              console.log("stratExam", e);
              router.push({
                name: "examPage",
                query: { exam_id: e.exam_id },
              });
            // }
          }
        }
      }
    };
    const viewExam = (e) => {
      // 进行考试记录判断，是否存在考试记录，有考试记录提示
      console.log("viewExam", e);
      router.push({ path: "/" });
    };

    onMounted(() => {
      sendHttp();
    });

    return {
      clloegeList,
      clloeges,
      laboratoryList,
      laboratorys,
      examTableData,
      stratExam,
      viewExam,
      refreshsendHttp,
    };
  },
};
</script>

<style lang="less" scoped>
.exam {
  // height: 100%;
  background-color: antiquewhite;
  .exam-cards {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    .exam-card {
      width: 300px;
      // height: 250px;
      margin: 10px;
    }
  }
}
</style>