import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

import "@/datasources/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  deleteUser,
} from "firebase/auth";

const auth = getAuth();

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    oUser: null,
  },
  getters: {
    fnGetUser(state) {
      return state.oUser;
    },
    fnGetAuthStatus(state) {
      return state.oUser != null;
    },
  },
  mutations: {
    fnSetUser(state, payload) {
      state.oUser = payload;
    },
  },
  actions: {
    // 이메일 회원가입
    fnRegisterUser({ commit }, payload) {
      createUserWithEmailAndPassword(auth, payload.pEmail, payload.pPassword)
        .then((pUserInfo) => {
          commit("fnSetUser", {
            email: pUserInfo.user.email,
          });
          router.push("/main");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },

    // 이메일 로그인
    fnDoLogin({ commit }, payload) {
      signInWithEmailAndPassword(auth, payload.pEmail, payload.pPassword)
        .then((pUserInfo) => {
          commit("fnSetUser", {
            id: pUserInfo.user.uid,
            name: pUserInfo.user.displayName,
            email: pUserInfo.user.email,
            photoURL: pUserInfo.user.photoURL,
          });
          router.push("/main");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },

    // 구글 로그인
    fnDoGoogleLogin_Popup({ commit }) {
      const oProvider = new GoogleAuthProvider();
      oProvider.addScope("profile");
      oProvider.addScope("email");

      signInWithPopup(auth, oProvider)
        .then((pUserInfo) => {
          commit("fnSetUser", {
            id: pUserInfo.user.uid,
            name: pUserInfo.user.displayName,
            email: pUserInfo.user.email,
            photoURL: pUserInfo.user.photoURL,
          });
          router.push("/main");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },

    // 로그아웃
    fnDoLogout({ commit }) {
      signOut(auth)
        .then(() => {
          commit("fnSetUser", null);
          router.push("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },

    // 회원탈퇴
    fnDoDelete({ commit }) {
      const user = auth.currentUser;
      deleteUser(user)
        .then(() => {
          commit("fnSetUser", null);
          router.push("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  modules: {},
});
