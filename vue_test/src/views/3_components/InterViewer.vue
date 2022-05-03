<template>
  <div class="interviewer">
    <p class="interviewer__name">면접관. {{userName}}</p>
    <div class="interviewer__video-container">
      <video
        v-show="connectingState[userId] === 'connected'"
        ref= "video"
        autoplay
      ></video>
      <img
        v-show="connectingState[userId] === 'before'"
        src="img/img_user_interview_male.png"
      />
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
