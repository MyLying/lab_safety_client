<template>
  <div class="examPage">
    <el-container>
      <!-- {{ examData }} -->
      <!-- <el-header class="exam-header"></el-header> -->
      <el-container>
        <el-aside width="300px" class="exam-aside">
          <div
            style="
              background-color: antiquewhite;
              height: 60px;
              margin-top: 10px;
              text-align: center;
            "
          >
            <h1>{{ examData.exam_name }}</h1>
            <h1>{{ userData.user_student_account }}</h1>
            <h1>{{ userData.user_student_unit }}</h1>
          </div>
          <div
            style="
              background-color: antiquewhite;
              height: 60px;
              margin-top: 10px;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: space-around;
              text-align: center;
            "
          >
            <div>
              <h1>试题数量</h1>
              <p style="line-height: 40px; font-size: 24px">
                {{
                  examData.exam_numberOne +
                  examData.exam_numberTwo +
                  examData.exam_numberThree +
                  examData.exam_numberFour +
                  examData.exam_numberFive
                }}
              </p>
            </div>
            <div>
              <h1>试题总分</h1>
              <p style="line-height: 40px; font-size: 24px">
                {{
                  examData.exam_numberOne * examData.exam_scoresOne +
                  examData.exam_numberTwo * examData.exam_scoresTwo +
                  examData.exam_numberThree * examData.exam_scoresThree +
                  examData.exam_numberFour * examData.exam_scoresFour +
                  examData.exam_numberFive * examData.exam_scoresFive
                }}
              </p>
            </div>
          </div>

          <div
            style="
              background-color: antiquewhite;
              height: 60px;
              margin-top: 10px;
              text-align: center;
            "
          >
            <h1>剩余时间</h1>
          </div>

          <el-radio-group v-model="radio" @change="radioChange">
            <div class="exam-questions">
              <div class="exam-questions-list">
                <el-radio-button
                  :label="'1.' + i"
                  v-for="i in examData.exam_numberOne"
                  :key="i"
                  size="large"
                  style="color: red"
                >
                  <el-icon v-if="questionTableData[0][i - 1].question_stuAnswer"
                    ><Check
                  /></el-icon>
                </el-radio-button>
                <el-radio-button
                  :label="'2.' + i"
                  v-for="i in examData.exam_numberTwo"
                  :key="i"
                  size="large"
                >
                  <el-icon
                    v-if="
                      questionTableData[1][i - 1].question_stuAnswer
                        ? questionTableData[1][i - 1].question_stuAnswer
                            .length >= 2
                        : fasle
                    "
                    ><Check /></el-icon
                ></el-radio-button>
                <el-radio-button
                  :label="'3.' + i"
                  v-for="i in examData.exam_numberThree"
                  :key="i"
                  size="large"
                >
                  <el-icon v-if="questionTableData[2][i - 1].question_stuAnswer"
                    ><Check /></el-icon
                ></el-radio-button>
                <el-radio-button
                  :label="'4.' + i"
                  v-for="i in examData.exam_numberFour"
                  :key="i"
                  size="large"
                >
                  <el-icon v-if="questionTableData[3][i - 1].question_stuAnswer"
                    ><Check /></el-icon
                ></el-radio-button>
                <el-radio-button
                  :label="'5.' + i"
                  v-for="i in examData.exam_numberFive"
                  :key="i"
                  size="large"
                >
                  <el-icon v-if="questionTableData[4][i - 1].question_stuAnswer"
                    ><Check /></el-icon
                ></el-radio-button>
              </div>
            </div>
          </el-radio-group>
          <div
            style="
              background-color: antiquewhite;
              height: 40px;
              margin-top: 10px;
              text-align: center;
            "
          >
            <el-button size="mini" style="margin-top: 4px">
              <span>交卷</span>
            </el-button>
            <el-button size="mini" style="margin-top: 4px">
              <span>交卷</span>
            </el-button>
            <el-button size="mini" style="margin-top: 4px" @click="submit">
              <span>交卷</span>
            </el-button>
          </div>
        </el-aside>
        <el-main class="exam-main">
          <el-card
            v-for="i in examData.exam_numberOne"
            :key="i"
            style="margin-top: 10px"
            :id="'1.' + i"
          >
            <template #header>
              <div class="card-header">
                <span
                  >{{ "1." + i }} ·
                  {{ questionTableData[0][i - 1].question_content }}</span
                >
              </div>
            </template>
            <el-radio-group
              v-model="questionTableData[0][i - 1].question_stuAnswer"
            >
              <el-radio label="A">{{
                questionTableData[0][i - 1].question_answerA
              }}</el-radio>
              <el-radio label="B">{{
                questionTableData[0][i - 1].question_answerB
              }}</el-radio>
              <el-radio label="C">{{
                questionTableData[0][i - 1].question_answerC
              }}</el-radio>
              <el-radio label="D">{{
                questionTableData[0][i - 1].question_answerD
              }}</el-radio>
            </el-radio-group>
          </el-card>

          <el-card
            v-for="i in examData.exam_numberTwo"
            :key="i"
            style="margin-top: 10px"
            :id="'2.' + i"
          >
            <template #header>
              <div class="card-header">
                <span
                  >{{ "2." + i }} ·
                  {{ questionTableData[1][i - 1].question_content }}</span
                >
                <!-- <el-button style="float:right" class="button" text>下一题</el-button> -->
              </div>
            </template>
            <el-checkbox-group
              v-model="questionTableData[1][i - 1].question_stuAnswer"
            >
              <el-checkbox label="A">{{
                questionTableData[1][i - 1].question_answerA
              }}</el-checkbox>
              <el-checkbox label="B">{{
                questionTableData[1][i - 1].question_answerB
              }}</el-checkbox>
              <el-checkbox label="C">{{
                questionTableData[1][i - 1].question_answerC
              }}</el-checkbox>
              <el-checkbox label="D">{{
                questionTableData[1][i - 1].question_answerD
              }}</el-checkbox>
            </el-checkbox-group>
          </el-card>
          <el-card
            v-for="i in examData.exam_numberThree"
            :key="i"
            style="margin-top: 10px"
            :id="'3.' + i"
          >
            <template #header>
              <div class="card-header">
                <span
                  >{{ "3." + i }} ·
                  {{ questionTableData[2][i - 1].question_content }}</span
                >
                <!-- <el-button style="float:right" class="button" text>下一题</el-button> -->
              </div>
            </template>

            <el-radio-group
              v-model="questionTableData[2][i - 1].question_stuAnswer"
            >
              <el-radio label="T">{{
                questionTableData[2][i - 1].question_answerA
              }}</el-radio>
              <el-radio label="F">{{
                questionTableData[2][i - 1].question_answerB
              }}</el-radio>
            </el-radio-group>
          </el-card>
          <el-card
            v-for="i in examData.exam_numberFour"
            :key="i"
            style="margin-top: 10px"
            :id="'4.' + i"
          >
            <template #header>
              <div class="card-header">
                <span
                  >{{ "4." + i }} ·
                  {{ questionTableData[3][i - 1].question_content }}</span
                >
                <!-- <el-button style="float:right" class="button" text>下一题</el-button> -->
              </div>
            </template>
            <el-input
              v-model="questionTableData[3][i - 1].question_stuAnswer"
              placeholder="Please input"
            />
          </el-card>
          <el-card
            v-for="i in examData.exam_numberFive"
            :key="i"
            style="margin-top: 10px"
            :id="'5.' + i"
          >
            <template #header>
              <div class="card-header">
                <span
                  >{{ "5." + i }} ·
                  {{ questionTableData[4][i - 1].question_content }}</span
                >
                <!-- <el-button style="float:right" class="button" text>下一题</el-button> -->
              </div>
            </template>
            <el-input
              v-model="questionTableData[4][i - 1].question_stuAnswer"
              :autosize="{ minRows: 4, maxRows: 6 }"
              type="textarea"
              placeholder="Please input"
            />
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const { proxy } = getCurrentInstance();
    const examRecords_beginTime = (
      new Date().getFullYear() +
      "-" +
      new Date().getDate() +
      "-" +
      (new Date().getMonth() + 1) +
      " " +
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds()
    ).toString();
    const examData = ref({});
    const userData = ref({});
    const questionTableData = ref([]);
    const radio = ref(1.1);

    const radio1_1 = ref("A");
    const submit = () => {
      let examRecords_studentAnswer = [];
      let examRecords_standardAnswer = [];

      for (const m in questionTableData.value) {
        for (const n in questionTableData.value[m]) {
          if (questionTableData.value[m][n].question_stuAnswer) {
            if (questionTableData.value[m][n].question_stuAnswer.length > 1) {
              let test = "";
              for (const item of questionTableData.value[m][n]
                .question_stuAnswer) {
                test = test + item;
              }
              console.log(test);
              examRecords_studentAnswer.push(test);
              examRecords_standardAnswer.push(
                questionTableData.value[m][n].question_answer
              );
            } else {
              examRecords_studentAnswer.push(
                questionTableData.value[m][n].question_stuAnswer
              );
              examRecords_standardAnswer.push(
                questionTableData.value[m][n].question_answer
              );
              console.log("已提交！");
            }
          } else {
            ElMessage({
              type: "success",
              message: "你有题目未作答，不能交卷！",
            });
            break;
          }
        }
      }
      proxy.$https
        .post("/examrecordsInsrt", {
          examRecords_beginTime: examRecords_beginTime,
          examRecords_endTime: (
            new Date().getFullYear() +
            "-" +
            new Date().getDate() +
            "-" +
            (new Date().getMonth() + 1) +
            " " +
            new Date().getHours() +
            ":" +
            new Date().getMinutes() +
            ":" +
            new Date().getSeconds()
          ).toString(),
          exam_id: examData.value.exam_id,
          user_student_account: userData.value.user_student_account,
          examRecords_studentAnswer: examRecords_studentAnswer.toString(),
          examRecords_standardAnswer: examRecords_standardAnswer.toString(),
        })
        .then((res) => {
          console.log(res);
          router.push({ path: "/" });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const radioChange = () => {
      console.log(radio.value);

      document.getElementById(radio.value).scrollIntoView({});
    };

    const getQuestionTableData = () => {
      console.log(typeof examData.value.exam_questions);
      proxy.$https
        .post("/questionByIds", {
          exam_questions: examData.value.exam_questions,
        })
        .then((res) => {
          let test = [[], [], [], [], []];
          //   test[0].push("s")
          res.data.forEach((element) => {
            switch (element.question_type) {
              case "单选":
                test[0].push(element);
                break;
              case "多选":
                test[1].push(element);
                break;
              case "判断":
                test[2].push(element);
                break;
              case "填空":
                test[3].push(element);
                break;
              case "简答":
                test[4].push(element);
                break;
              default:
            }
          });
          //   console.log(test);
          questionTableData.value = test;
          // console.log(typeof res.data, res.data);
          store.commit("setQuestionTableData", test);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const sendHttp = () => {
      getQuestionTableData();

      if (!store.getters.getQuestionTableData.length) {
        getQuestionTableData();
      } else {
        // console.log("Exam-getQuestionTableData", store.getters.getQuestionTableData);
        questionTableData.value = store.getters.getQuestionTableData;
        console.log(store.getters.getQuestionTableData);
      }
    };

    onMounted(() => {
      //   console.log(route.query);
      //   console.log(store.getters.getExamTableData[0]);
      for (const item of store.getters.getExamTableData) {
        if (item.exam_id == route.query.exam_id) {
          examData.value = item;
        }
      }
      userData.value = store.getters.getUserInfo;
      sendHttp();
    });

    return {
      route,
      examData,
      userData,
      radio,
      questionTableData,
      getQuestionTableData,
      radioChange,
      sendHttp,
      radio1_1,
      submit,
    };
  },
};
</script>
<style lang="less" scoped>
.examPage {
  font-size: 14px;
  h1 {
    margin-top: 2px;
  }
  //   height: 500px;
  background-color: antiquewhite;
  .exam-header {
    height: 40px;
    padding: 10px;
    background-color: yellowgreen;
  }
  .exam-aside {
    padding: 10px;
    background-color: greenyellow;
    .exam-questions {
      background-color: antiquewhite;
      margin-top: 10px;
      .exam-questions-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        .el-radio-button {
          margin: 5px;
        }
      }
    }
  }
  .exam-main {
    padding: 10px;
    height: 500px;
    background-color: red;
  }
  .exam-footer {
    background-color: green;
  }
}
</style>