<template>
  <div class="c">
    <h1>WebRTC 테스트 페이지</h1>
    <button type="button" class="btn btn-primary" @click="plus">Join</button>
    <button type="button" class="btn btn-primary" @click="onLeave">
      {{this.roomId}}
    </button>
    <div class="b">
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
      roomId: 123,
    };
  },
  methods: {
    plus(){
      this.roomId ++;
    },
  },
  mounted() {
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
