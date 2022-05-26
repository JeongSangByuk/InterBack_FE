<template>
  <div class="container">
    <!--    <SelfIntroductionModal/>-->
    <div class="video-container">
      <div class="video-container__title">
        카카오 BE 그룹3 면접장

        <div>

          <button type="button" class="btn btn-primary" @click="userSet('interviewer1')">
            user1
          </button>

          <button type="button" class="btn btn-primary" @click="userSet('interviewer2')">
            user2
          </button>

          <button type="button" class="btn btn-primary" @click="userSet('interviewee1')">
            user3
          </button>

          <button type="button" class="btn btn-primary" @click="userSet('interviewee2')">
            user4
          </button>

          <button type="button" class="btn btn-primary" @click="gett()">
            test
          </button>
        </div>

        <div style="display: flex; flex-direction: row">

          <div class="record-container"
               ref="video-container"
               @click="changeVideoState()">
            <img
                class="record-container__img"
                src="img/video.png"
                ref="video_img"
                style="margin-right: 3px"
            />

            <p ref="video_text">
              비디오 키기
            </p>
          </div>

          <div class="record-container"
               ref="micro-container"
               @click="startRecording()">
            <img
                class="record-container__img"
                src="img/micro.png"
                ref="micro_img"
            />

            <p ref="micro_text">
              마이크 키기
            </p>
          </div>

        </div>
      </div>

      <div class="interviwer-container">
        <Interviewer
            ref="interviewer1"
            :userName="'정상벽'"
            :connectingState="connectingState"
            :userId="'interviewer1'"
        />

        <Interviewer
            ref="interviewer2"
            :userName="'박태순'"
            :connectingState="connectingState"
            :userId="'interviewer2'"
        />

        <Interviewer
            ref="interviewer3"
            :userName="'-'"
            :connectingState="connectingState"
            :userId="'interviewer3'"
        />

        <Interviewer
            ref="interviewer4"
            :userName="'-'"
            :connectingState="connectingState"
            :userId="'interviewer4'"
        />
      </div>

      <div class="interviwee-container">
        <Interviewee
            ref="interviewee1"
            @click="changeSelfIntroductionInfo('손모은')"
            :userName="'손모은'"
            :connectingState="connectingState"
            :userId="'interviewee1'"

        />

        <Interviewee
            ref="interviewee2"
            @click="changeSelfIntroductionInfo('이윤환')"
            :userName="'이윤환'"
            :connectingState="connectingState"
            :userId="'interviewee2'"
        />

        <Interviewee
            ref="interviewee3"
            :userName="'-'"
            :connectingState="connectingState"
            :userId="'interviewee3'"
        />

        <Interviewee
            ref="interviewee4"
            :userName="'-'"
            :connectingState="connectingState"
            :userId="'interviewee4'"
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
                <img
                    src="img/chat.png"
                    @click="$refs.slides.goToSlide(0)"
                    style="background: #e4ffdf"
                />
                <img src="img/comment.png" @click="$refs.slides.goToSlide(1)"/>

                <img
                    src="img/suggestion.png"
                    @click="$refs.slides.goToSlide(2)"
                />
              </div>
            </div>

            <div class="text-record-list">
              <div class="chat" v-for="chat in this.chatList" :key="chat">
                <p class="chat__name">{{ chat.name }}</p>
                <p class="chat__contents">{{ chat.text }}</p>
              </div>
            </div>

            <div class="chat-send-container">
              <input class="chat-send-container__chat-input" ref="chatInput"/>
              <img
                  class="chat-send-container__chat-bnt"
                  src="img/send-message.png"
                  @click="this.sendChat()"
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
                <img src="img/chat.png" @click="$refs.slides.goToSlide(0)"/>
                <img
                    src="img/comment.png"
                    @click="$refs.slides.goToSlide(1)"
                    style="background: #e4ffdf"
                />

                <img
                    src="img/suggestion.png"
                    @click="$refs.slides.goToSlide(2)"
                />
              </div>
            </div>
            <div class="text-record-list">

              <div class="chat" v-for="chat in this.sttList" :key="chat">
                <p class="chat__name">{{ chat.name }}</p>
                <p class="chat__contents">{{ chat.text }}</p>
              </div>

            </div>
          </div>
        </template>
      </vueper-slide>

      <vueper-slide :key="3" :title="3">
        <template v-slot:content>
          <div class="text-record-container">
            <div class="text-record-header">
              <p class="text-record-header__title">자소서 & 질문 추천</p>
              <div class="text-record-bnt-group">
                <img src="img/chat.png" @click="$refs.slides.goToSlide(0)"/>
                <img src="img/comment.png" @click="$refs.slides.goToSlide(1)"/>
                <img
                    src="img/suggestion.png"
                    @click="$refs.slides.goToSlide(2)"
                    style="background: #e4ffdf"
                />
              </div>
            </div>
            <div class="text-record-list">
              <div class="chat">
                <p class="chat__name">{{ this.selectedUser['name'] }} 자소서</p>
                <p class="chat__self-introduction-contents">{{ this.selectedUser['selfIntroductionText'] }}</p>
                <br/>
                <p class="chat__name">자소서 기반 질문 추천</p>

                <p class="chat__self-introduction-contents">{{ this.selectedUser['selfIntroductionText1'] }}</p>
                <p v-for="(item,i) in this.selectedUser['questionRecommendation']" v-bind:key="item"
                   class="chat__self-introduction-contents">{{ i + 1 }}. {{ item + '\n' }}</p>
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
import SelfIntroductionModal from "@/views/2_pages/SelfIntroductionModal";
import {VueperSlides, VueperSlide} from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import axios from "axios";
import {MediaRecorder, register} from "extendable-media-recorder";
import {connect} from "extendable-media-recorder-wav-encoder";

//const peers = [];
let socket;
let stomp;
let mediaRecorder;

export default {
  components: {
    Interviewer,
    Interviewee,
    //SelfIntroductionModal,
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {

      user: {
        interviewer1: '정상벽',
        interviewee1: '손모은',
        interviewee2: '이윤환',
      },

      myId: "",
      callerStream: "",
      peers: [],
      testt: "before",

      isRecordingMicro: false,
      isRecordingVideo: false,
      auto_audio_api_func: null,

      chatList:[],
      sttList: [],


      selectedUser: {
        name: '손모은',
        selfIntroductionText: Constants.SELF_INTRODUCTION_TEST_1,
        questionRecommendation: Constants.QUESTION_RECOMMENDATION_1,
      },


      connectingState:
      // before - connected
          {
            interviewer1: "before",
            interviewer2: "before",
            interviewer3: "before",
            interviewer4: "before",
            interviewee1: "before",
            interviewee2: "before",
            interviewee3: "before",
            interviewee4: "before",
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

            // 감정 분석 결과를 전달 받고 update
            stomp.subscribe("/sub/video/audio-sentiment", (data) => {

              data = JSON.parse(data.body);
              console.log(data['resultOfAudioSentiment']['p']);
              this.$refs[data['from']].positiveEmotionValue = parseInt(data['resultOfAudioSentiment']['p']);
              this.$refs[data['from']].negativeEmotionValue = parseInt(data['resultOfAudioSentiment']['n']);
              this.$refs[data['from']].updateChart();

            })

            // stt  결과를 전달 받고 update
            stomp.subscribe("/sub/video/stt", (data) => {

              data = JSON.parse(data.body);
              console.log(data);

              if (data["text"] === "")
                return;

              this.sttList.push({name: this.user[data['from']], text: data["text"]});
              this.$refs[data['from']].changeWordcloudImg(data["text"]);

            })

            // chat socket
            stomp.subscribe("/sub/video/chat", (data) => {

              data = JSON.parse(data.body);
              console.log(data);

              if (data["text"] === "")
                return;

              this.chatList.push({name: this.user[data['from']], text: data["text"]});

            }),

            // socket join send
            stomp.send(
                "/pub/video/joined-room-info",
                JSON.stringify({from: this.myId})
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

    async userSet(id) {
      this.myId = id;
      this.connectingState[this.myId] = "connected";

      await register(await connect());

      await navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then((stream) => {
            let videoStream = new MediaStream(stream.getVideoTracks());
            let audioStream = new MediaStream(stream.getAudioTracks());

            this.callerStream = stream;
            this.$refs[this.myId].$refs["video"].srcObject = videoStream;
            this.connect();

            mediaRecorder = new MediaRecorder(audioStream, {
              mimeType: "audio/wav",
            });

            //mediaRecorder 함수 지정
            mediaRecorder.ondataavailable = (e) => {

              let reader = new FileReader();
              let base64data;
              reader.readAsDataURL(e.data);
              reader.onloadend = () => {
                base64data = reader.result;

                // wav파일을 생성하기 위한 base64 인코딩된 string을 소켓으로 쏨.
                // stomp.send(
                //     "/pub/video/audio-sentiment",
                //     JSON.stringify({
                //       from: this.myId,
                //       base64data: base64data,
                //     })
                // );

                // stt 소켓 쏘기
                stomp.send(
                    "/pub/video/stt",
                    JSON.stringify({
                      from: this.myId,
                      base64data: base64data,
                    })
                );

              };
            };
          });
    },

    gett() {
      console.log(this.peers);
      console.log(this.connectingState);

      // stt api.
      axios
          .post(Constants.API_URL + "/test",
              {
                from: this.myId,
                base64data: "qqq",
              },
              {
                contentType: 'application/json; charset=utf-8'
              })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    },

    changeVideoState() {

      if (this.isRecordingVideo) {
        this.$refs["video_img"].src = "img/video.png";
        this.$refs["video_text"].innerText = "비디오 키기";
        this.$refs["video-container"].style.background = "#5ebc88";
        this.isRecordingVideo = false;
      } else {
        this.$refs["video_img"].src = "img/video_x.png";
        this.$refs["video_text"].innerText = "비디오 끄기";
        this.$refs["video-container"].style.background = "#ff6f6f";
        this.isRecordingVideo = true;
      }
    },


    async startRecording() {
      if (this.isRecordingMicro) {
        // recording stop
        this.$refs["micro_img"].src = "img/micro.png";
        this.$refs["micro_text"].innerText = "마이크 키기";
        this.$refs["micro-container"].style.background = "#5ebc88";
        this.isRecordingMicro = false;
        mediaRecorder.stop();
        //clearInterval(this.auto_audio_api_func);
        console.log(mediaRecorder.state);
      } else {
        // rocording start
        this.$refs["micro_img"].src = "img/micro_x.png";
        this.$refs["micro_text"].innerText = "마이크 끄기";
        this.$refs["micro-container"].style.background = "#ff6f6f";
        this.isRecordingMicro = true;
        mediaRecorder.start();

        // let runAutoAudioAPI = async () => {
        //
        //   // 녹음 시작
        //   mediaRecorder.start();
        //
        //   // 5000초만큼 기다렸다가,
        //   await this.waitTime(5000);
        //
        //   // 녹음 멈추기.
        //   mediaRecorder.stop();
        // }
        //
        // // 10초에 한번씩 socket을 쏴서 음성 판다.
        // this.auto_audio_api_func = setInterval(() => {
        //   runAutoAudioAPI();
        // }, 10000)

        console.log(mediaRecorder.state);
      }
    },

    waitTime(milliseconds) {
      return new Promise(resolve => setTimeout(() => resolve(), milliseconds));
    },

    changeSelfIntroductionInfo(name) {

      this.selectedUser['name'] = name;

      if (name === '손모은') {
        console.log(name);
        this.selectedUser['selfIntroductionText'] = Constants.SELF_INTRODUCTION_TEST_1;
        this.selectedUser['questionRecommendation'] = Constants.QUESTION_RECOMMENDATION_1;
      } else {
        this.selectedUser['selfIntroductionText'] = Constants.SELF_INTRODUCTION_TEST_2;
        this.selectedUser['questionRecommendation'] = Constants.QUESTION_RECOMMENDATION_2;
      }
    },

    sendChat(){

      stomp.send(
          "/pub/video/chat",
          JSON.stringify({
            from: this.myId,
            text: this.$refs["chatInput"].value,
          })
      );

      this.$refs["chatInput"].value = "";
    },

  },

  mounted() {

  },
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/2_pages/interview-room.scss";
</style>
