<template>
  <div class="interviewee">
    <p class="interviewee__name">면접자. {{userName}}</p>
    <div class="interviewee__video-container">
      <video
        v-show="connectingState[userId] === 'connected'"
        ref="video"
        autoplay
      ></video>
      <img
        v-show="connectingState[userId] === 'before'"
        src="img/img_user_interview_female.png"
      />
    </div>

    <div class="interviewee__emotion-box">
      <p>감정 분석</p>
    </div>

    <div class="interviewee__wordcloud">
      <p>워드 클라우드</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["connectingState", "userId", "userName"],
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/2_pages/interview-room.scss";
</style>
