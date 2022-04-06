<template>
  <div class="c">
    <h1>WebRTC 테스트 페이지</h1>
    <vue-webrtc ref="webrtc" width = "100%"  roomId="sample-room">

    </vue-webrtc>
  </div>
</template>

<script>
import { VueWebRTC } from 'vue-webrtc';
export default {
    name: 'App',
    components: {
        'vue-webrtc': VueWebRTC
    },
};
</script>

<style lang="scss">
.c {
  margin: 50px 0 0 200px;
}

.video-list {
  width: 100px;
  height: 100px;
}
</style>
