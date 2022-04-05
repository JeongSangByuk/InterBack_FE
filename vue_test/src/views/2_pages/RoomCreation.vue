<template>
  <div class="container">
    <div class="title">면접 생성</div>
    <div class="sub-title">
      면접방을 생성하여 면접관으로 참가합니다.<br />면접방 이름과 입장
      비밀번호를 설정해주세요.
    </div>

    <div class="creation-room-container">
      <div class="creation-room-box">
        <!-- id -->
        <div class="creation-room-form">
          <p class="creation-room-form__title">면접방 이름</p>
          <input
            class="creation-room-form__input"
            placeholder="면접방 이름를 설정해주세요."
          />
        </div>

        <!-- pw -->
        <div class="creation-room-form">
          <p class="creation-room-form__title">입장 비밀 번호</p>
          <input
            class="creation-room-form__input"
            placeholder="입장 비밀 번호를 설정해주세요."
            type="password"
          />
        </div>
        <button
          class="creation-room-box__enter-bnt"
          @click="this.$router.push('/interview-room')"
        >
          생 성 하 기
        </button>
        <button
          class="creation-room-box__cancel-bnt"
          @click="this.$router.push('/')"
        >
          취 소
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/2_pages/room_creation.scss";
</style>
