<template>
  <div class="c">
    <h1>WebRTC 테스트 페이지</h1>
    <button type="button" class="btn btn-primary" @click="onJoin">Join</button>
    <button type="button" class="btn btn-primary" @click="onLeave">
      Leave
    </button>
    <div class="b">
      <vue-webrtc
        ref="webrtc"
        roomId="sample-room"
        socketURL="ws://localhost:8080/socket"
      />
    </div>
  </div>
</template>

<script scoped>
export default {
  name: "video-test",
  components: {},
  data() {
    return {
      img: null,
      roomId: "public-room-v3",
    };
  },
  methods: {
    onCapture() {
      this.img = this.$refs.webrtc.capture();
    },
    onJoin() {
      console.log("qwe");
      this.$refs.webrtc.join();
    },
    onLeave() {
      this.$refs.webrtc.leave();
    },
    onShareScreen() {
      this.img = this.$refs.webrtc.shareScreen();
    },
    onError(error, stream) {
      console.log("On Error Event", error, stream);
    },
    logEvent(event) {
      console.log("Event : ", event);
    },
  },
  mounted() {
    this.onJoin();
  },
};
</script>

<style lang="scss" scoped>
.c {
  width: 100%;
  height: 100%;
  padding: 50px 0 0 200px;
}

.b {
  width: 100%;
  height: 100%;
}

.video-list,
.video-item {
  width: 100%;
  height: auto;
}

video {
  width: 100%;
  height: auto;
}
</style>
