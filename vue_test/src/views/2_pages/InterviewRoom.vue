<template>
  <div class="container">
    <div class="video-container">
      <p class="video-container__title">카카오 BE 그룹3 면접장</p>
      <div class="interviwer-container">
        <div class="interviewer">
          <p class="interviewer__name">면접관1. 정상벽</p>
          <div class="interviewer__video">
            <video id="localVideo" autoplay></video>
          </div>
        </div>
        <div class="interviewer">
          <p class="interviewer__name">면접관2. 박태순</p>
          <div class="interviewer__video">
            <video id="remoteVideo" width="480px" autoplay></video>
          </div>
        </div>
        <div class="interviewer">
          <p class="interviewer__name">면접관3. 김채운</p>
          <div class="interviewer__video">
            <img src="img/img_user_interview.png" />
          </div>
        </div>
        <div class="interviewer">
          <p class="interviewer__name">면접관4. 박윤굥</p>
          <div class="interviewer__video">
            <img src="img/img_user_interview.png" />
          </div>
        </div>
      </div>
      <div class="interviwee-container">
        <div class="interviewee"></div>
        <div class="interviewee"></div>
        <div class="interviewee"></div>
        <div class="interviewee"></div>
      </div>
    </div>
    <div class="text-record-container">
      <p class="text-record-container__title">실시간 회의록</p>
      <div class="text-record-list">
        <div class="chat">
          <p class="chat__name">정상벽벽</p>
          <p class="chat__contents">안녕하세요.요.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Peer from "simple-peer";

var ws = new WebSocket("ws://localhost:8080/socket");
var socket = ws;

const tt = async () => {
  const callerStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  const calleeStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });

  let localVideo = document.getElementById("localVideo");
  let remoteVideo = document.getElementById("remoteVideo");

  localVideo.srcObject = callerStream;

  const callerPeer = new Peer({
    initiator: true, //요청자 이므로 true!
    stream: callerStream,
  });

  const calleePeer = new Peer({
    initiator: false, //요청자가 아니므로 false
    stream: calleeStream,
  });

  // caller의 signaling data를 얻어 서버에 전송
  callerPeer.on("signal", (callerSignal) => {
    socket.send(
      JSON.stringify({
        type: "joinCaller",
        signal: callerSignal,
        name: "qwe",
        callee: 123,
      })
    );
  });
};

function connect() {
  ws.onopen = function () {
    console.log("Info: connection opened.");
    tt();
  };

  ws.onclose = function () {
    console.log("Info: connection closed");
  };
}

export default {
  components: {},
  data() {
    return {
      img: null,
    };
  },
  methods: {},
  mounted() {
    connect();
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/2_pages/interview-room.scss";
</style>
