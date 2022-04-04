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

    <div class="header__list">
      <img src="img/logo_list.png" />
    </div>

    <div class="header__setting">
      <img src="img/logo_setting.png" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "./../../assets/scss/1_layouts/header_view.scss";
</style>
