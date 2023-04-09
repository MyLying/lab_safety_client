<template>
  <div class="user">
    <div class="userHeader">
      <div class="userHeaderBg">
        <el-image
          style="width: 100%; height: 150px"
          :src="require('../../assets/R-C.jpg')"
          fit="cover"
        />
      </div>
      <div class="userInfo">
        <div class="userInfoImg">
          <el-avatar
            shape="square"
            :size="150"
            fit="cover"
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          />
        </div>
        <div
          class="userInfoContent"
          style="font-size: 14px; text-align: center"
        >
          <p>{{ userInfo.user_student_name }}</p>
          <p>{{ userInfo.user_student_account }}</p>
          <p>{{ userInfo.user_student_unit }}</p>
          <p>{{ userInfo.user_student_college }}</p>
          <p>{{ userInfo.user_student_tellnumber }}</p>
          <p>{{ userInfo.user_student_email }}</p>
        </div>
      </div>
    </div>
    <div class="userContent">
      <el-tabs type="border-card">
        <!--         
        <el-tab-pane label="用户信息">
          <el-form
            :model="userInfo"
            label-width="120px"
            size="large"
            :inline="true"
          >
            <el-form-item label="用户账号">
              <el-input v-model="userInfo.user_student_account" disabled />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="userInfo.user_student_name" disabled />
            </el-form-item>
            <el-form-item label="所属班级">
              <el-input v-model="userInfo.user_student_unit" disabled />
            </el-form-item>
            <el-form-item label="所属学院">
              <el-input v-model="userInfo.user_student_college" disabled />
            </el-form-item>

            <el-form-item label="手机号码">
              <el-input v-model="userInfo.user_student_tellnumber" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="userInfo.user_student_email" />
            </el-form-item>
          </el-form>
          <p style="text-align: center">
            <el-button size="large" type="primary" @click="userInfo_update"
              >更新个人信息</el-button
            >
            <el-button size="large" type="primary" @click="userInfo_update"
              >更新个人信息</el-button
            >
            <el-button size="large" type="primary" @click="userInfo_update"
              >更新个人信息</el-button
            >
          </p>
        </el-tab-pane> -->
        <el-tab-pane label="我的成绩">
          <el-input
            size="large"
            style="width: 300px; margin-bottom: 10px; float: left"
            v-model="examrecordsInput"
            placeholder="搜索"
          />
          <el-table
            :data="examrecordsTableData"
            border
            size="large"
            style="width: 100%"
            table-layout="auto"
          >
            <el-table-column prop="exam_name" label="试卷名称" align="center" />
            <el-table-column
              prop="laboratory_name"
              label="试卷所属实验室"
              align="center"
            />
            <el-table-column
              prop="exam_scoresAll"
              label="试卷总分"
              align="center"
            />
            <el-table-column
              prop="examRecords_scores"
              label="考试得分"
              align="center"
            />
            <el-table-column
              prop="examRecords_beginTime"
              label="开始时间"
              align="center"
            />
            <el-table-column
              prop="examRecords_endTime"
              label="结束时间"
              align="center"
            />
            <el-table-column prop="" label="是否通过" align="center">
              <template #default="scope">
                <span
                  v-if="
                    scope.row.examRecords_scores / scope.row.exam_scoresAll >=
                    0.9
                  "
                  >✔</span
                >
                <span v-else> ✖ </span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button
                  size="small"
                  text
                  type="primary"
                  @click="handleDownload(scope.$index, scope.row)"
                  ><el-icon><CircleClose /></el-icon>考试错题</el-button
                ><el-button
                  size="small"
                  text
                  type="primary"
                  @click="handleDownload(scope.$index, scope.row)"
                  ><el-icon><CircleClose /></el-icon>领取证书</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="我的证书">
          <el-table
            :data="certTableData"
            border
            size="large"
            style="width: 100%"
            table-layout="auto"
          >
            <el-table-column prop="cert_name" label="证书名称" align="center" />
            <el-table-column
              prop="cert_munber"
              label="证书编号"
              align="center"
            />
            <el-table-column
              prop="laboratory_method"
              label="颁发方式"
              align="center"
            />
            <el-table-column
              prop="cert_getdate"
              label="获得时间"
              align="center"
            />
            <el-table-column
              prop="cert_expirydate"
              label="到期时间"
              align="center"
            />
            <el-table-column
              prop="laboratory_unit"
              label="颁发机构"
              align="center"
            />
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button
                  size="small"
                  text
                  @click="handleDownload(scope.$index, scope.row)"
                  ><el-icon><Download /></el-icon
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="学习记录">
          <el-input
            size="large"
            style="width: 300px; margin-bottom: 10px; float: left"
            v-model="learnrecordsInput"
            placeholder="选择或搜索课程"
          />
          <el-table
            :data="learnrecordsTableData"
            border
            size="large"
            style="width: 100%"
            table-layout="auto"
          >
            <el-table-column prop="" label="课件名称" align="center" />
            <el-table-column prop="" label="所属课程" align="center" />
            <el-table-column prop="" label="最近学习" align="center" />
            <el-table-column prop="" label="学习进度" align="center" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="练习记录">
          <el-input
            size="large"
            style="width: 300px; margin-bottom: 10px; float: left"
            v-model="practicerecordsInput"
            placeholder="搜索题库"
          />
          <el-table
            :data="practicerecordsTableData"
            border
            size="large"
            style="width: 100%"
            table-layout="auto"
          >
            <el-table-column prop="" label="所属题库" align="center" />
            <el-table-column prop="" label="练习模式" align="center" />
            <el-table-column prop="" label="最近练习" align="center" />
            <el-table-column prop="" label="正确数量" align="center" />
            <el-table-column prop="" label="练习进度" align="center" />
            <el-table-column prop="" label="正确率" align="center" />
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button
                  size="small"
                  text
                  type="primary"
                  @click="handleDownload(scope.$index, scope.row)"
                  ><el-icon><VideoPlay /></el-icon>继续练习</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- <el-tab-pane>
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><calendar /></el-icon>
              <el-button type="primary">Primary</el-button>
            </span>
          </template>
        </el-tab-pane> -->
      </el-tabs>
      <el-button
        id="refreshsendHttp"
        size="mini"
        style="position: absolute; right: 25px; top: 25px"
        @click="refreshsendHttp()"
        :disabled="false"
      >
        <el-icon><Refresh /></el-icon><span>刷新</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from "vue";
import { useStore } from "vuex";
// import { ElMessageBox } from "element-plus";

export default {
  setup() {
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const userInfo = ref([]);
    const learnrecordsInput = ref();
    const practicerecordsInput = ref();
    const examrecordsInput = ref();
    const dialogVisible = ref(false);

    const certTableData = ref([]);
    const learnrecordsTableData = ref([]);
    const practicerecordsTableData = ref([]);
    const examrecordsTableData = ref([]);

    certTableData.value = [];
    examrecordsTableData.value = [];
    practicerecordsTableData.value = [];
    learnrecordsTableData.value = [];

    const userInfo_update = () => {
      console.log(userInfo);
    };
    const handleDownload = (index, row) => {
      console.log(row);
    };
    const getUserInfo = () => {
      // 获取store 的 account
      const account = store.getters.getUserInfo.user_student_account;
      proxy.$https
        .post("/user_s_ByAccount", {
          account: account,
        })
        .then((res) => {
          userInfo.value = res.data[0];
          store.commit("setUser", res.data[0]);

          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getCertTableData = () => {
      // 获取store 的 account
      const account = store.getters.getUserInfo.user_student_account;
      proxy.$https
        .post("/certByAccount", {
          account: account,
        })
        .then((res) => {
          certTableData.value = res.data;
          store.commit("setCertTableData", res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getExamrecordsTableData = () => {
      // 获取store 的 account
      const account = store.getters.getUserInfo.user_student_account;
      proxy.$https
        .post("/examrecordsByAccount", {
          account: account,
        })
        .then((res) => {
          examrecordsTableData.value = res.data;
          store.commit("setExamrecordsTableData", res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getPracticerecordsTableData = () => {
      // 获取store 的 account
      const account = store.getters.getUserInfo.user_student_account;
      proxy.$https
        .post("/practicerecordsByAccount", {
          account: account,
        })
        .then((res) => {
          practicerecordsTableData.value = res.data;
          store.commit("setPracticerecordsTableData", res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getLearnrecordsTableData = () => {
      // 获取store 的 account
      const account = store.getters.getUserInfo.user_student_account;
      proxy.$https
        .post("/learnrecordsByAccount", {
          account: account,
        })
        .then((res) => {
          learnrecordsTableData.value = res.data;
          store.commit("setLearnrecordsTableData", res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const refreshsendHttp = () => {
      getUserInfo();
      getCertTableData();
      getExamrecordsTableData();
      getPracticerecordsTableData();
      getLearnrecordsTableData();
      document.getElementById("refreshsendHttp").disabled = true;
      setTimeout(() => {
        document.getElementById("refreshsendHttp").disabled = false;
        console.log("更新数据冷却时间到，可重新刷新！");
      }, 10000);
    };
    const sendHttp = () => {
      // 获取store 的 account
      const account = store.getters.getUserInfo.user_student_account;

      if (!store.getters.getUserInfo) {
        getUserInfo(account);
      } else {
        console.log("Home-getUserInfo", store.getters.getUserInfo);
        userInfo.value = store.getters.getUserInfo;
      }

      if (!store.getters.getCertTableData.length) {
        getCertTableData();
      } else {
        console.log("Home-getCertTableData", store.getters.getCertTableData);
        certTableData.value = store.getters.getCertTableData;
      }

      if (!store.getters.getExamrecordsTableData.length) {
        getExamrecordsTableData();
      } else {
        console.log(
          "Home-getExamrecordsTableData",
          store.getters.getExamrecordsTableData
        );
        examrecordsTableData.value = store.getters.getExamrecordsTableData;
      }

      if (!store.getters.getPracticerecordsTableData.length) {
        getPracticerecordsTableData();
      } else {
        console.log(
          "Home-getPracticeTableData",
          store.getters.getPracticerecordsTableData
        );
        practicerecordsTableData.value =
          store.getters.getPracticerecordsTableData;
      }

      if (!store.getters.getLearnrecordsTableData.length) {
        getLearnrecordsTableData();
      } else {
        console.log(
          "Home-getLearnTableData",
          store.getters.getLearnrecordsTableData
        );
        learnrecordsTableData.value = store.getters.getLearnrecordsTableData;
      }
    };

    onMounted(() => {
      console.log("mounted in the composition api!");
      sendHttp();
    });

    return {
      examrecordsInput,
      proxy,
      userInfo,
      practicerecordsInput,
      learnrecordsInput,
      certTableData,
      examrecordsTableData,
      practicerecordsTableData,
      learnrecordsTableData,
      dialogVisible,
      userInfo_update,
      handleDownload,
      refreshsendHttp,
    };
  },
};
</script>

<style lang="less" scoped>
.user {
  height: 100%;
  background-color: antiquewhite;
  .userHeader {
    position: relative;
    height: 180px;
    // background-color: red;
    .userHeaderBg {
      position: absolute;
      width: 100%;
      height: 150px;
      // background-color: rosybrown;
    }
    .userInfo {
      position: absolute;
      width: 300px;
      height: 150px;
      top: 40px;
      left: 120px;
      display: flex;
      .userInfoImg {
        flex: 1;
      }
      .userInfoContent {
        flex: 1;
        background-color: greenyellow;
      }
    }
  }
  .userContent {
    position: relative;
    // margin-top: 20px;
    padding: 20px 10px;
  }
}
</style>