<template>
  <div class="container">
    <div class="video-container">
      <p class="video-container__title">
        카카오 BE 그룹3 면접장

        <button type="button" class="btn btn-primary" @click="userSet('111')">
          user1
        </button>

        <button type="button" class="btn btn-primary" @click="userSet('222')">
          user2
        </button>

        <button type="button" class="btn btn-primary" @click="userSet('333')">
          user3
        </button>

        <button type="button" class="btn btn-primary" @click="userSet('555')">
          user4
        </button>

        <button type="button" class="btn btn-primary" @click="gett">
          test
        </button>
      </p>

      <div class="interviwer-container">
        <Interviewer
          ref="111"
          :userName="'정상벽'"
          :connectingState="connectingState"
          :userId="'111'"
        />

        <Interviewer
          ref="222"
          :userName="'박태순'"
          :connectingState="connectingState"
          :userId="'222'"
        />

        <Interviewer
          ref="333"
          :userName="'김채운'"
          :connectingState="connectingState"
          :userId="'333'"
        />

        <Interviewer
          ref="444"
          :userName="'박윤굥'"
          :connectingState="connectingState"
          :userId="'444'"
        />
      </div>

      <div class="interviwee-container">
        <Interviewee
          ref="555"
          :userName="'손모은'"
          :connectingState="connectingState"
          :userId="'555'"
        />

        <Interviewee
          ref="666"
          :userName="'이윤환'"
          :connectingState="connectingState"
          :userId="'666'"
        />

        <Interviewee
          ref="777"
          :userName="'김현욱'"
          :connectingState="connectingState"
          :userId="'777'"
        />

        <Interviewee
          ref="888"
          :userName="'김성욱'"
          :connectingState="connectingState"
          :userId="'888'"
        />
      </div>
    </div>

    <vueper-slides
      :touchable="false"
      :infinite="false"
      :bullets="false"
      :arrows="false"
      ref="slides"
      fixed-height="100%"
      style="width: 35%; height: 100%; min-width: 300px"
      class="no-shadow"
    >
      <vueper-slide :key="1" :title="1">
        <template v-slot:content>
          <div class="text-record-container">
            <div class="text-record-header">
              <p class="text-record-header__title">채 팅</p>
              <div class="text-record-bnt-group">
                <img src="img/chat.png" @click="$refs.slides.goToSlide(0)" style="background:#e4ffdf;" />
                <img src="img/comment.png" @click="$refs.slides.goToSlide(1)" />
                <img
                  src="img/suggestion.png"
                  @click="$refs.slides.goToSlide(2)"
                />
              </div>
            </div>
            <div class="text-record-list">
              <div v-for="i in 20" :key="i">
                <div class="chat">
                  <p class="chat__name">정상벽벽</p>
                  <p class="chat__contents">안녕하세요.요.</p>
                </div>
              </div>
            </div>
            <div class="chat-send-container">
              <input class="chat-send-container__chat-input" />
              <img
                class="chat-send-container__chat-bnt"
                src="img/send-message.png"
              />
            </div>
          </div>
        </template>
      </vueper-slide>

      <vueper-slide :key="2" :title="2">
        <template v-slot:content>
          <div class="text-record-container">
            <div class="text-record-header">
              <p class="text-record-header__title">회의록</p>
              <div class="text-record-bnt-group">
                <img src="img/chat.png" @click="$refs.slides.goToSlide(0)" />
                <img src="img/comment.png" @click="$refs.slides.goToSlide(1)" style="background:#e4ffdf;"/>
                <img
                  src="img/suggestion.png"
                  @click="$refs.slides.goToSlide(2)"
                />
              </div>
            </div>
            <div class="text-record-list">
              <div class="chat">
                <p class="chat__name">정상벽벽</p>
                <p class="chat__contents">안녕하세요.요.</p>
              </div>
            </div>
          </div>
        </template>
      </vueper-slide>

      <vueper-slide :key="3" :title="3">
        <template v-slot:content>
          <div class="text-record-container">
            <div class="text-record-header">
              <p class="text-record-header__title">질문 추천</p>
              <div class="text-record-bnt-group">
                <img src="img/chat.png" @click="$refs.slides.goToSlide(0)" />
                <img src="img/comment.png" @click="$refs.slides.goToSlide(1)" />
                <img
                  src="img/suggestion.png"
                  @click="$refs.slides.goToSlide(2)"
                  style="background:#e4ffdf;"
                />
              </div>
            </div>
            <div class="text-record-list">
              <div class="chat">
                <p class="chat__name">정상벽벽</p>
                <p class="chat__contents">안녕하세요.요.</p>
              </div>
            </div>
          </div>
        </template>
      </vueper-slide>
    </vueper-slides>
  </div>
</template>

<script>
import Peer from "simple-peer";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";
import Constants from "../../utils/Constants";
import Interviewer from "../3_components/InterViewer";
import Interviewee from "../3_components/InterViewee";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import axios from "axios";

//const peers = [];
let socket;
let stomp;

export default {
  components: {
    Interviewer,
    Interviewee,
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      myId: "",
      callerStream: "",
      peers: [],
      testt: "before",
      connectingState:
        // before - connected
        {
          111: "before",
          222: "before",
          333: "before",
          444: "before",
          555: "before",
          666: "before",
          777: "before",
          888: "before",
        },
    };
  },

  methods: {
    connect() {
      socket = new SockJS(Constants.API_URL + "/socket");
      stomp = Stomp.over(socket);

      stomp.connect(
        {},
        // connectCallback
        () => {
          // 소켓으로 caller의 연락을 받은 시점에 caller의 정보를 저장한다.
          stomp.subscribe("/sub/video/caller-info", (data) => {
            data = JSON.parse(data.body);

            // 나에게서 오거나(from me) 혹은 나에게 온(to me)이 아니면 return
            if (data.from === this.myId || data.toCall !== this.myId) return;

            // video 송출
            this.connectingState[data.from] = "connected";

            console.log("caller subscribe");

            //callig을 받은 시점에, answer call을 보내 signaling한다.
            this.returnCall(data.signal, data.from);
          });

          // acceptCall을 받은 시점에서 caller와 callee를 연결.
          stomp.subscribe("/sub/video/callee-info", (data) => {
            data = JSON.parse(data.body);

            if (data.from === this.myId) return;

            console.log("accept call subscribe ");

            this.connectingState[data.to] = "connected";

            this.peers.forEach((p) => {
              if (p[1] === data.to && p[2] === data.from) {
                p[0].signal(data.signal);
                return false;
              }
            });
          });

          // 누군가 join 했을때, 이미 있는 peer에서 joinedID로 calling 보낸다.
          stomp.subscribe("/sub/video/joined-room-info", (data) => {
            let users = JSON.parse(data.body);

            let topIdx = users.length - 1;
            let joinedID = users[topIdx].id;

            // 인원이 한명 이하거나, 자신이 join 일경우는 return
            if (topIdx <= 0 || users[topIdx].id === this.myId) return;

            console.log(users);
            console.log(users.length);

            // joined id로 calling 보낸다
            this.initCall(joinedID);
          });

          //close session event
          stomp.subscribe("/sub/video/close-session", (data) => {
            // 세션을 나갔을때 관련된 peer을 다 remove해준다.
            let closedUser = String(JSON.parse(data.body));
            this.connectingState[closedUser] = "before";

            // peers 목록에서 삭제.
            let i = 0;
            while (i < this.peers.length) {
              if (
                this.peers[i][1] === closedUser ||
                this.peers[i][2] === closedUser
              ) {
                console.log(this.peers[i]);
                this.peers[i][0].destroy();
                this.peers.splice(i, 1);
              } else {
                i++;
              }
            }
          });

          // socket join send
          stomp.send(
            "/pub/video/joined-room-info",
            JSON.stringify({ from: this.myId })
          );
        },

        // onErrorCallback
        () => {
          console.log("ws error");
        }
      );
    },

    //caller의 calling 시작.
    initCall(joinedID) {
      // peer 생성
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: this.callerStream,
      });
      this.connectingState[joinedID] = "connected";
      // caller의 signaling data를 얻어 서버에 전송하여
      // 소켓에 연결된 사람에게 쏴준다.
      peer.on("signal", (data) => {
        stomp.send(
          "/pub/video/caller-info",
          JSON.stringify({
            toCall: joinedID,
            from: this.myId,
            signal: data,
          })
        );
      });

      peer.on("stream", (stream) => {
        this.$refs[joinedID].$refs["video"].srcObject = stream;
      });

      peer.on("error", (stream) => {
        console.log("qweqwe");
      });

      this.peers.push([peer, this.myId, joinedID]);
    },

    // caller에게 요청을 받은 상태에서 connect answer을 보냄.
    returnCall(callerSignal, callerId) {
      // callee의  peer
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: this.callerStream,
      });

      // callee의 정보를 caller에게 보냄.
      peer.on("signal", (data) => {
        stomp.send(
          "/pub/video/callee-info",
          JSON.stringify({
            from: this.myId,
            to: callerId,
            signal: data,
          })
        );
      });

      peer.on("stream", (stream) => {
        this.$refs[callerId].$refs["video"].srcObject = stream;
      });

      peer.on("error", (stream) => {
        console.log("qweqwe");
      });

      // callee와 caller의 연결.
      peer.signal(callerSignal);

      this.peers.push([peer, this.myId, callerId]);
    },

    userSet(id) {
      this.myId = id;
      this.connectingState[this.myId] = "connected";

      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          this.callerStream = stream;
          this.$refs[this.myId].$refs["video"].srcObject = stream;
          this.connect();
        });
    },

    gett() {
      console.log(this.peers);
      console.log(this.connectingState);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/2_pages/interview-room.scss";
</style>
