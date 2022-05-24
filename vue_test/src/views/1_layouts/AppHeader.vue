<template>
  <div class="header">
    <router-link to="/">
      <div class="header__home">
        <img src="img/logo_interback_white.png" />
      </div>
    </router-link>

    <router-link to="/login">
      <div class="header__user">
        <img src="img/logo_user_white.png" />
      </div>
    </router-link>

    <router-link to="/video-test">
      <div class="header__list">
        <img src="img/logo_list.png" />
      </div>
    </router-link>

    <div class="header__setting">
      <img src="img/logo_setting.png" />
    </div>

    <button class="logout" @click="logoutResult">로그아웃</button>
  </div>
</template>

<script>
export default {
  methods : {
    logoutResult(){
      console.log("logout");
      this.$cookies.remove("idCookie")
      this.$cookies.remove("passCookie")

      
      alert("로그아웃되었습니다.")

      this.$router.replace({name:'Home'})
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/1_layouts/header_view.scss";
</style>
