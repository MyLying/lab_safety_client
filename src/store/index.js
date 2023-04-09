import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

export const store = createStore({
  state: {
    userInfo: {
      user_student_account: ""
    },
    token: '',
    certTableData: [],
    examTableData: [],
    practiceTableData: [],
    learnTableData: [],
    examrecordsTableData: [],
    practicerecordsTableData: [],
    learnrecordsTableData: [],
    questionTableData: []
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo
    },
    getToken(state) {
      return state.token
    },
    getCertTableData(state) {
      return state.certTableData
    },
    getLearnTableData(state) {
      return state.learnTableData
    },
    getLearnrecordsTableData(state) {
      return state.learnrecordsTableData
    },
    getPracticeTableData(state) {
      return state.practiceTableData
    },
    getPracticerecordsTableData(state) {
      return state.practicerecordsTableData
    },
    getExamTableData(state) {
      return state.examTableData
    },
    getExamrecordsTableData(state) {
      return state.examrecordsTableData
    },
    getQuestionTableData(state) {
      return state.questionTableData
    }
  },
  mutations: {
    setUser(state, userinfo) {
      state.userInfo = userinfo
    },
    setToken(state, token) {
      state.token = token
    },
    setCertTableData(state, certTableData) {
      state.certTableData = certTableData
    },
    setLearnTableData(state, learnTableData) {
      state.learnTableData = learnTableData
    },
    setLearnrecordsTableData(state, learnrecordsTableData) {
      state.learnrecordsTableData = learnrecordsTableData
    },
    setPracticeTableData(state, practiceTableData) {
      state.practiceTableData = practiceTableData
    },
    setPracticerecordsTableData(state, practicerecordsTableData) {
      state.practicerecordsTableData = practicerecordsTableData
    },
    setExamTableData(state, examTableData) {
      state.examTableData = examTableData
    },
    setExamrecordsTableData(state, examrecordsTableData) {
      state.examrecordsTableData = examrecordsTableData
    },
    setQuestionTableData(state,questionTableData) {
      state.questionTableData = questionTableData
    },
    deleteUser(state) {
      state.userInfo = {
        user_student_account: ""
      }
      state.token = ""
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      // key: 'vuex',
      // paths: ['vuex']
    })
  ]
})
