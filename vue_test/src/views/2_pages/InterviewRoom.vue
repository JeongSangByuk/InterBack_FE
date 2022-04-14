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

      <button type="button" class="btn btn-primary" @click="call">call</button>

      <button type="button" class="btn btn-primary" @click="answer">
        answer
      </button>

      <div class="interviwer-container">
        <div class="interviewer">
          <p class="interviewer__name">면접관1. 정상벽</p>
          <div class="interviewer__video">
            <video id="localVideo" ref="111" autoplay></video>
          </div>
        </div>
        <div class="interviewer">
          <p class="interviewer__name">면접관2. 박태순</p>
          <div class="interviewer__video">
            <video id="remoteVideo" ref="222" autoplay></video>
          </div>
        </div>
        <div class="interviewer">
          <p class="interviewer__name">면접관3. 김채운</p>
          <div class="interviewer__video">
            <video id="remoteVideo" ref="333" autoplay></video>
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
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

//var ws = new WebSocket("ws://localhost:8080/socket");
//var socket = ws;

const socket = new SockJS("http://localhost:8080/socket");
const stomp = Stomp.over(socket);

var peer1, peer3;

var peer2;

export default {
  components: {},
  data() {
    return {
      myId: "",
      oppoId1: "",
      oppoId2: "",
      callerStream: "",
      caller: "",
      receivingCall: false,
      callerSignal: "",
      peerRef: [],
    };
  },

  methods: {
    connect() {
      stomp.connect(
        {},
        // connectCallback
        () => {
          // 소켓으로 caller의 연락을 받은 시점에 caller의 정보를 저장한다.
          stomp.subscribe("/sub/video/caller", (data) => {
            console.log(data);
            this.receivingCall = true;
            this.callerSignal = data.signal;
            this.caller = data.from;
          });

          // acceptCall을 받은 시점에서 caller와 callee를 연결.
          stomp.subscribe("/sub/video/acceptCall", (data) => {
            console.log(data);
            this.receivingCall = true;
            this.callerSignal = data.signal;
            this.caller = data.from;
          });
        },

        // onErrorCallback
        () => {
          console.log("ws error");
        },

        // closeEventCallback
        () => {
          console.log("ws closed");
        }
      );
    },

    // connect1() {
    //   ws.onopen = (event) => {
    //     console.log("Info: connection opened.");
    //   };

    //   ws.onclose = (event) => {
    //     console.log("Info: connection closed");
    //   };

    //   ws.onmessage = (event) => {
    //     console.log(event.data);
    //     const data = JSON.parse(event.data);
    //     console.log(data.type);

    //     switch (data.type) {
    //       // 소켓으로 caller의 연락을 받은 시점에 caller의 정보를 저장한다.
    //       case "caller":
    //         this.receivingCall = true;
    //         this.callerSignal = data.signal;
    //         this.caller = data.from;
    //         break;

    //       case "acceptCall":
    //         // acceptCall을 받은 시점에서 caller와 callee를 연결.
    //         peer1.signal(data.signal);
    //         break;

    //       case "all users": {
    //         let users = data.users;
    //         let peers = [];

    //         users.array.forEach((userID) => {
    //           const peer = this.createPeer(
    //             userID,
    //             this.myId,
    //             this.callerStream
    //           );

    //           this.peerRef.push({
    //             peerID: userID,
    //             peer,
    //           });
    //           peers.push(peer);
    //         });
    //         break;
    //       }

    //       case "user joined": {
    //         let peer = this.addPeer(
    //           data.signal,
    //           data.callerID,
    //           this.callerStream
    //         );
    //         this.peerRef.push({
    //           peerID: data.callerID,
    //           peer,
    //         });

    //         break;
    //       }

    //       case "receiving returned signal": {
    //         const item = this.peerRef.find((p) => p.peerID === data.id);
    //         item.peer.signal(data.signal);
    //         break;
    //       }
    //     }
    //  };
  },

  calling() {
    // 최초 시작.
    peer1 = new Peer({
      initiator: true,
      trickle: false,
      stream: this.callerStream,
    });

    // caller의 signaling data를 얻어 서버에 전송하여
    // 소켓에 연결된 사람에게 쏴준다.
    peer1.on("signal", (data) => {
      stomp.send(
        "/pub/video/caller",          
        {},
        JSON.stringify(
          {
            ToCall: this.oppoId1,
            from: this.myId,
            signal: data,
          },

        )
      );
    });

    peer1.on("stream", (stream) => {
      this.$refs[this.oppoId1].srcObject = stream;
    });
  },

  // caller에게 요청을 받은 상태에서 connect answer을 보냄.
  answercall() {
    // callee의  peer
    peer2 = new Peer({
      initiator: false,
      trickle: false,
      stream: this.callerStream,
    });

    // callee의 정보를 caller에게 보냄.
    peer2.on("signal", (data) => {
      stomp.send(
        "/pub/video/answerCall",
        {},
        JSON.stringify(
          {
            ToCall: this.myId,
            signal: data,
          },
        )
      );
    });

    peer2.on("stream", (stream) => {
      this.$refs[this.oppoId].srcObject = stream;
    });

    // callee와 caller의 연결.
    peer2.signal(this.callerSignal);
  },

  // do(stream) {
  //   socket.send(
  //     JSON.stringify({
  //       type: "join room",
  //       roomID: "1",
  //     })
  //   );
  // },

  // createPeer(userToSignal, callerID, stream) {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream: stream,
  //   });

  //   peer.on("signal", (data) => {
  //     socket.send(
  //       JSON.stringify({
  //         type: "sending signal",
  //         userToSignal: userToSignal,
  //         callerID: callerID,
  //         signal: data,
  //       })
  //     );
  //   });
  // },

  // addPeer(incomingSignal, callerID, stream) {
  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream: stream,
  //   });

  //   peer.on("signal", (data) => {
  //     socket.send(
  //       JSON.stringify({
  //         type: "returning signal",
  //         callerID: callerID,
  //         signal: data,
  //       })
  //     );
  //   });

  //   peer.signal(incomingSignal);
  // },

  userSet1() {
    this.myId = "111";
    this.oppoId1 = "222";
    this.oppoId2 = "333";

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        this.callerStream = stream;
        this.$refs[this.myId].srcObject = stream;
      });
  },

  userSet2() {
    this.myId = "222";
    this.oppoId1 = "111";
    this.oppoId2 = "333";

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        this.callerStream = stream;
        this.$refs[this.myId].srcObject = stream;
      });
  },

  userSet3() {
    this.myId = "333";
    this.oppoId1 = "111";
    this.oppoId2 = "222";

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => {
        this.callerStream = stream;
        this.$refs[this.myId].srcObject = stream;
      });
  },

  call() {
    this.calling();
  },
  answer() {
    this.answercall();
  },

  mounted() {
    this.connect();
  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/2_pages/interview-room.scss";
</style>
