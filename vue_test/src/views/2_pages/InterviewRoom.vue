<template>
  <div class="container">
    <div class="video-container">
      <p class="video-container__title">카카오 BE 그룹3 면접장</p>

      <button type="button" class="btn btn-primary" @click="userSet1">
        user1 set
      </button>

      <button type="button" class="btn btn-primary" @click="userSet2">
        user2 set
      </button>

      <button type="button" class="btn btn-primary" @click="userSet3">
        user3 set
      </button>

      <button type="button" class="btn btn-primary" @click="userSet4">
        user4 set
      </button>

      <button type="button" class="btn btn-primary" @click="gett">test</button>

      <div class="interviwer-container">
        <div class="interviewer">
          <p class="interviewer__name">면접관1. 정상벽</p>
          <div class="interviewer__video-container">
            <video
              v-if="connectingState['111'] === 'connected'"
              ref="111"
              autoplay
            ></video>
            <img
              v-else-if="connectingState['111'] === 'loading'"
              src="img/loading.gif"
            />
            <img v-else src="img/img_user_interview_male.png" />
          </div>
        </div>
        <div class="interviewer">
          <p class="interviewer__name">면접관2. 박태순</p>
          <div class="interviewer__video-container">
            <video
              v-if="connectingState['222'] === 'connected'"
              ref="222"
              autoplay
            ></video>
            <img
              v-else-if="connectingState['222'] === 'loading'"
              src="img/loading.gif"
            />
            <img v-else src="img/img_user_interview_male.png" />
          </div>
        </div>
        <div class="interviewer">
          <p class="interviewer__name">면접관3. 김채운</p>
          <div class="interviewer__video-container">
            <video
              v-if="connectingState['333'] === 'connected'"
              ref="333"
              autoplay
            ></video>
            <img
              v-else-if="connectingState['333'] === 'loading'"
              src="img/loading.gif"
            />
            <img v-else src="img/img_user_interview_female.png" />
          </div>
        </div>
        <div class="interviewer">
          <p class="interviewer__name">면접관4. 박윤굥</p>
          <div class="interviewer__video-container">
            <video
              v-if="connectingState['444'] === 'connected'"
              ref="444"
              autoplay
            ></video>
            <img
              v-else-if="connectingState['444'] === 'loading'"
              src="img/loading.gif"
            />
            <img v-else src="img/img_user_interview_female.png" />
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
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

//const peers = [];
let socket;
let stomp;

export default {
  components: {},
  data() {
    return {
      myId: "",
      callerStream: "",
      peers: [],
      connectingState: [
        // before - loading - connected
        { 111: "before" },
        { 222: "before" },
        { 333: "before" },
        { 444: "before" },
      ],
    };
  },

  methods: {
    connect() {
      socket = new SockJS("http://localhost:8080/socket");
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
            this.connectingState[data.from] = true;

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

            // 누군가 들어왔을때 video state loading
            this.connectingState[joinedID] = "loading";

            console.log(users);
            console.log(users.length);

            // joined id로 calling 보낸다
            this.initCall(joinedID);
          });

          //close session event
          stomp.subscribe("/sub/video/close-session", (data) => {
            // 세션을 나갔을때 관련된 peer을 다 remove해준다.
            let closedUser = String(JSON.parse(data.body));
            this.connectingState[closedUser] = "close";

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
        this.$refs[joinedID].srcObject = stream;
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
        this.$refs[callerId].srcObject = stream;
      });

      peer.on("error", (stream) => {
        console.log("qweqwe");
      });

      // callee와 caller의 연결.
      peer.signal(callerSignal);

      this.peers.push([peer, this.myId, callerId]);
    },

    userSet1() {
      this.myId = "111";
      this.connectingState[this.myId] = "connected";

      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          this.callerStream = stream;
          this.$refs[this.myId].srcObject = stream;
          this.connect();
        });
    },

    userSet2() {
      this.myId = "222";
      this.connectingState[this.myId] = "connected";

      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          this.callerStream = stream;
          this.$refs[this.myId].srcObject = stream;
          this.connect();
        });
    },

    userSet3() {
      this.myId = "333";
      this.connectingState[this.myId] = "connected";

      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          this.callerStream = stream;
          this.$refs[this.myId].srcObject = stream;
          this.connect();
        });
    },

    userSet4() {
      this.myId = "444";
      this.connectingState[this.myId] = "connected";

      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          this.callerStream = stream;
          this.$refs[this.myId].srcObject = stream;
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
