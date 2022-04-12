<template>
  <div class="container">
    <div class="video-container">
      <p class="video-container__title">카카오 BE 그룹3 면접장</p>

      <button type="button" class="btn btn-primary" @click="click1">1</button>

      <button type="button" class="btn btn-primary" @click="click2">2</button>

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
            <video id="remoteVideo" autoplay></video>
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

var peer1;
var peer2;

export default {
  components: {},
  data() {
    return {
      myId: "",
      oppoId: "",
      callerStream: "",
      caller: "",
      receivingCall: "",
      callerSignal: "",
    };
  },

  methods: {
    // testing

    connect() {
      ws.onopen = function () {
        console.log("Info: connection opened.");
      };

      ws.onclose = function () {
        console.log("Info: connection closed");
      };

      ws.onmessage = function (event) {
        console.log(event.data);
        var data = JSON.parse(event.data);
        console.log(data.type);

        switch (data.type) {
          case "caller":
            this.callerSignal = data.signal;
            this.caller = data.from;
            break;
        }
      };
    },

    calling() {
      let localVideo = document.getElementById("localVideo");

      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          this.callerStream = stream;
          localVideo.srcObject = stream;
        });

      peer1 = new Peer({
        initiator: true,
        trickle: false,
        stream: this.callerStream,
      });

      // caller의 signaling data를 얻어 서버에 전송
      peer1.on("signal", (data) => {
        socket.send(
          JSON.stringify({
            type: "caller",
            ToCall: this.oppoId,
            from: this.myId,
            signal: data,
          })
        );
      });

      ws.addEventListener("message", function (event) {
        console.log(event.data);
        var data = JSON.parse(event.data);
        console.log(data.type);

        switch (data.type) {
          case "acceptCall":
            peer1.signal(data.signal);
            break;
        }
      });
    },

    answercall() {
      var remoteVideo = document.getElementById("remoteVideo");

      peer2 = new Peer({
        initiator: false,
        trickle: false,
        stream: this.callerStream,
      });

      peer2.on("signal", (data) => {
        socket.send(
          JSON.stringify({
            type: "answerCall",
            ToCall: this.myId,
            signal: data,
          })
        );
      });

      console.log("aceepcall");

      peer2.signal(this.callerSignal);

      peer2.on("stream", (stream) => {
        remoteVideo.srcObject = stream;
      });
    },

    click1() {
      this.myId = "111";
      this.oppoId = "222";
      this.connect();
      this.calling();
    },

    click2() {
      this.myId = "222";
      this.oppoId = "111";
      this.connect();
      this.answercall();
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/2_pages/interview-room.scss";
</style>
