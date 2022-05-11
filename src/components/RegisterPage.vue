<template>
  <div>
    <h1>회원가입 페이지입니다</h1>
    <form @submit.prevent="fnRegisterUser">
      <label for="">이메일</label>
      <input type="text" v-model="sEamil" /> <br />
      <label for="">비밀번호</label>
      <input type="password" v-model="sPassword" /> <br />
      <input type="submit" value="회원가입" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sEamil: "",
      sPassword: "",
    };
  },
  methods: {
    fnRegisterUser() {
      this.$store.dispatch("fnRegisterUser", {
        pEmail: this.sEamil,
        pPassword: this.sPassword,
      });
    },
  },
};
</script>
