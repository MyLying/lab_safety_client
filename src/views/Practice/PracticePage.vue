<template>
  <div class="practicePage">
    <!-- <div>{{ practice_view }}</div> -->
    <div v-if="practicePageTableData">
      <div v-if="practicePageTableData.length" style="position: relative">
        <el-card
          v-for="(item, index) in practicePageTableData"
          :key="item.question_id"
          style="margin-top: 10px"
          :id="practice_view + '_' + index"
          class="practicePageSubmit"
        >
          <template #header>
            <div class="card-header">
              <span> {{ index + 1 }}· {{ item.question_content }} </span>
            </div>
          </template>
          <div>
            <div v-if="item.question_type">
              <div v-if="item.question_type === '单选'">
                <el-radio-group v-model="item.question_stuAnswer">
                  <el-radio label="A">{{ item.question_answerA }}</el-radio>
                  <el-divider />
                  <el-radio label="B">{{ item.question_answerB }}</el-radio>
                  <el-divider />
                  <el-radio label="C">{{ item.question_answerC }}</el-radio>
                  <el-divider />
                  <el-radio label="D">{{ item.question_answerD }}</el-radio>
                </el-radio-group>
              </div>
              <div v-else-if="item.question_type === '多选'">
                <el-checkbox-group v-model="item.question_stuAnswer">
                  <el-checkbox label="A">{{
                    item.question_answerA
                  }}</el-checkbox>
                  <el-divider />
                  <el-checkbox label="B">{{
                    item.question_answerB
                  }}</el-checkbox>
                  <el-divider />
                  <el-checkbox label="C">{{
                    item.question_answerC
                  }}</el-checkbox>
                  <el-divider />
                  <el-checkbox label="D">{{
                    item.question_answerD
                  }}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div v-else-if="item.question_type === '判断'">
                <el-radio-group v-model="item.question_stuAnswer">
                  <el-radio label="T">{{ item.question_answerA }}</el-radio>
                  <el-divider />
                  <el-radio label="F">{{ item.question_answerB }}</el-radio>
                </el-radio-group>
              </div>
              <div v-else-if="item.question_type === '填空'">
                <el-input
                  v-model="item.question_stuAnswer"
                  placeholder="Please input"
                />
              </div>
              <div v-else-if="item.question_type === '简答'">
                <el-input
                  v-model="item.question_stuAnswer"
                  :autosize="{ minRows: 4, maxRows: 6 }"
                  type="textarea"
                  placeholder="Please input"
                />
              </div>
            </div>
          </div>
        </el-card>
        <div
          style="
            position: absolute;
            width: 100%;
            height: 40px;
            top: 430px;
            text-align: center;
            padding-top: 8px;

            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-around;
          "
        >
          <el-button
            id="refreshsendHttp"
            size="mini"
            style=""
            @click="toggle(0)"
            :disabled="false"
          >
           <el-icon><Back /></el-icon><span>上一题</span>
          </el-button>
          <el-button
            id="refreshsendHttp"
            size="mini"
            style=""
            @click="toggle(1)"
            :disabled="false"
            v-if="!practicePageSubmitisShow"
          >
           <el-icon><Right /></el-icon><span>下一题</span>
          </el-button>
          <el-button
            id="refreshsendHttp"
            size="mini"
            style=""
            @click="practicePageSubmit"
            :disabled="false"
            v-if="practicePageSubmitisShow"
          >
            <el-icon><Refresh /></el-icon><span>提&emsp;交</span>
          </el-button>
        </div>
      </div>
      <div v-else>您选择的题库暂时没有题目，请联系管理员添加练习题！</div>
    </div>
    <div v-else>
      <h1 style="text-align: center; line-height: 480px">
        请选择您要练习的题库！
      </h1>
    </div>
  </div>
</template>

<script>
import { ref, watch, getCurrentInstance, onMounted, onUpdated } from "vue";
// import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  props: ["questionNumber", "practice_view"],
  setup(props) {
    const router = useRouter();
    // const store = useStore();
    const { proxy } = getCurrentInstance();

    const ShowIdCount = ref(0);
    const ShowId = ref();
    const isSendHttp = ref(1);
    const practicePageTableData = ref();
    // practicePageTableData.value = [];
    const practicePageSubmitisShow = ref(0);
    const practicePageSubmit = () => {
      console.log("提交函数");
      let question_stuAnswer = [];
      for (const item of practicePageTableData.value) {
        let test = "";
        if (item.question_stuAnswer) {
          for (const item2 of item.question_stuAnswer) {
            test = test + item2;
          }
        }

        question_stuAnswer.push(test);
      }
      console.log(question_stuAnswer);
    };
    const getPracticePageTableData = (props) => {
      ShowIdCount.value = 0;
      proxy.$https
        .post("/practicePageByView", {
          view: props.practice_view,
          number: props.questionNumber,
        })
        .then((res) => {
          practicePageTableData.value = res.data;
          //   console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const sendHttp = (props) => {
      if (isSendHttp.value) {
        getPracticePageTableData(props);
      }
      isSendHttp.value = false;
      setTimeout(() => {
        isSendHttp.value = true;
      }, 2000);
    };
    const toggle = (e) => {
      //   console.log(e);
      //   console.log(practicePageTableData.value.length);
      //   console.log(ShowIdCount.value);
      if (e) {
        ShowIdCount.value < practicePageTableData.value.length - 1
          ? ShowIdCount.value++
          : null;
      } else {
        ShowIdCount.value > 0 ? ShowIdCount.value-- : null;
      }
      ShowId.value = props.practice_view + "_" + ShowIdCount.value;
      //   console.log(props.props + "_" + ShowIdCount.value);
      //   console.log(ShowId.value);
      //   console.log("toggle", props);
      ShowIdCount.value == practicePageTableData.value.length - 1
        ? (practicePageSubmitisShow.value = 1)
        : (practicePageSubmitisShow.value = 0);

      var divs = document.getElementsByClassName("practicePageSubmit");
      for (const div of divs) {
        div.style.display = "none";
      }

      document.getElementById(ShowId.value).style.display = "block";

      document.getElementById("refreshsendHttp").disabled = true;
      setTimeout(() => {
        document.getElementById("refreshsendHttp").disabled = false;
      }, 1000);
    };
    onMounted(() => {});
    onUpdated(() => {
      if (document.getElementsByClassName("practicePageSubmit")) {
        var divs = document.getElementsByClassName("practicePageSubmit");
        for (const div of divs) {
          div.style.display = "none";
        }
      }
      //   console.log(props.practice_view);
      ShowId.value = props.practice_view + "_" + ShowIdCount.value;
      //   console.log("update", props);
      if (document.getElementById(ShowId.value)) {
        document.getElementById(ShowId.value).style.display = "block";
      }
    });
    watch(props, () => {
      //   console.log("Sss");
      sendHttp(props);
      //   console.log("ExamList", props);
      //   console.log(props);
    });
    // watch(ShowId, () => {
    //   console.log("Sss");
    //   sendHttp(props);
    //   console.log("ExamList", props);
    //   console.log(props);
    // });

    return {
      router,
      practicePageTableData,
      ShowId,
      ShowIdCount,
      toggle,
      practicePageSubmit,
      practicePageSubmitisShow,
    };
  },
};
</script>

<style>
.practicePage {
  font-size: 14px;
}
</style>