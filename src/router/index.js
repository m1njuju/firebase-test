import Vue from "vue";
import VueRouter from "vue-router";
import "@/datasources/firebase";

import { getAuth } from "firebase/auth";
const auth = getAuth();

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "start",
    component: function () {
      return import("../components/StartPage.vue");
    },
  },
  {
    path: "/main",
    name: "main",
    component: function () {
      return import("../components/MainPage.vue");
    },
    meta: { bAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: function () {
      return import("../components/LoginPage.vue");
    },
  },
  {
    path: "/register",
    name: "register",
    component: function () {
      return import("../components/RegisterPage.vue");
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// main에 접근했을 때 로그인이 되어있다면 main페이지로
// 로그인이 되어있지 않다면 login 페이지로 이동할 수 있게 네비게이션 가드 사용
// 라우트 메타필드를 확인해서 main 페이지에 접근한 것을 확인
router.beforeEach((to, from, next) => {
  console.log("네비게이션가드 확인");
  // 이동할 위치(to-라우터객체-$router/router)가 main인지 확인
  const bNeedAuth = to.matched.some((record) => record.meta.bAuth);
  // 로그인이 되어있는지 확인: firebase 인증 필요
  const bCheckAuth = auth.currentUser;

  console.log(bNeedAuth);

  // main 페이지이면서 로그인이 되어있지 않다면 > login 페이지
  // 그 외: 다른페이지로 이동, 로그인이 되어있으면서 main으로 이동 > 그대로 이동
  if (bNeedAuth && !bCheckAuth) {
    next("/login");
  } else {
    next();
  }
});

export default router;
