<template>
  <div class="container">
    <div class="title">로 그 인</div>
    <div class="sub-title">
      혁신적인 온라인 면접 관리의 시작<br />InterBack에 오신것을 환영합니다.
    </div>

    <div class="login-container">
      <div class="login-box">
        <!-- id -->
        <div class="login-form">
          <p class="login-form__title">아 이 디</p>
          <input
            class="login-form__input"
            placeholder="아이디를 입력해주세요."
          />
        </div>

        <!-- pw -->
        <div class="login-form">
          <p class="login-form__title">비밀 번호</p>
          <input
            class="login-form__input"
            placeholder="비밀 번호를 입력해주세요."
            type="password"
          />
        </div>
        <p class="login-box__find-pwd">비밀번호를 잊으셨나요?</p>
        <button class="login-box__login-bnt">로 그 인</button>
        <button class="login-box__signup-bnt">회원 가입</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "./../../assets/scss/2_pages/user_login.scss";
</style>
