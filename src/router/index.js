import { createRouter, createWebHistory } from 'vue-router';
import LayoutView from "@/views/Layout";
import LoginView from "@/views/Login";
import BookingView from "@/views/Booking";
const routes = [
  {
    path: "/",
    name: "home",
    redirect: 'home',
    meta: { isLogin: true },
    component: LayoutView,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/Home'),
    }, {
      path: 'learn',
      name: 'learn',
      component: () => import('@/views/Learn'),
    }, {
      path: 'practice',
      name: 'practice',
      component: () => import('@/views/Practice'),
    }, {
      path: 'exam',
      name: 'exam',
      component: () => import('@/views/Exam'),
    }, {
      path: 'examPage',
      name: 'examPage',
      component: () => import('@/views/Exam/ExamPage'),
    },]
  }, {
    path: "/login",
    name: "login",
    meta: { isLogin: false },
    component: LoginView
  }, {
    path: "/booking",
    name: "booking",
    meta: { isLogin: true },
    component: BookingView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 导航全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log("导航守卫---to---", to);
  // 判断是否是需要登录
  if (to.matched.length && !to.matched.some(item => item.meta.isLogin)) {//不需要登录
    next()
    console.log();
  } else {
    // 需要登录
    // 判断是否需要登录 1.判断是否已经登录 2.根据token
    // let token = useStore().state["token"];
    // const token = useStore().getters.getExamTableData.length
    if (JSON.parse(localStorage.getItem("vuex"))) {
      JSON.parse(localStorage.getItem("vuex")).token ? next() : next('/login')
    } else {
      next('/login')
    }
  }
})

export default router