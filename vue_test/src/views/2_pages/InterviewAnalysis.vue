<template>
  <div class="container">
      <div class="interview-analysis-container">
        <div class="interviewee-list-box">
          <div class="interviewee-list-box__title">면접자 목록</div>
          
            <button class="interviewee-list-name" @click="[increase(0), changeInterviewee()]">손모은</button>
            <button class="interviewee-list-name" @click="[increase(1), changeInterviewee()]">이윤환</button>
            <button class="interviewee-list-name" @click="[increase(2), changeInterviewee()]">김채운</button>
            <button class="interviewee-list-name" @click="[increase(3), changeInterviewee()]">박윤경</button>
          
        </div>
        <div class="information-container">
          <div class="basic-information-container">

            <div v-if="this.vuexIndex == 0">
              <img
                src="img/img_profile_photo_example1.jpg"
                style="width: 150px; height: 170px; margin: 20px 0 0 20px"/></div>

            <div v-else-if="this.vuexIndex ==1">
              <img
                src="img/img_profile_photo_example2.jpg"
                style="width: 150px; height: 170px; margin: 20px 0 0 20px"/></div>

            <div v-else-if="this.vuexIndex ==2">
              <img
                src="img/img_profile_photo_example3.jpg"
                style="width: 150px; height: 170px; margin: 20px 0 0 20px"/></div>

            <div v-else-if="this.vuexIndex ==3">
              <img
                src="img/img_profile_photo_example4.png"
                style="width: 150px; height: 170px; margin: 20px 0 0 20px"/></div>
                
            <div v-else>
              <img
                src="img/img_profile_photo_example4.png"
                style="width: 150px; height: 170px; margin: 20px 0 0 20px"/></div>

            <div class="basic-information-box">
              <div class="basic-information-box__title">기본 정보</div>
              
              <div class="basic-information-box__description" v-if="user.length">
                <div v-for="(line, index) in user" :key="index">
                  <div v-if="index==vuexIndex">이름: {{line[0]}}</div></div></div>        
              <div class="basic-information-box__description" v-else>이름: 손모은</div> 

              <div class="basic-information-box__description" v-if="user.length">
                <div v-for="(line, index) in user" :key="index">
                  <div v-if="index==vuexIndex">학교: {{line[1]}}</div></div></div> 
              <div class="basic-information-box__description" v-else>학교: 세종대학교</div>

              <div class="basic-information-box__description" v-if="user.length">
                <div v-for="(line, index) in user" :key="index">
                  <div v-if="index==vuexIndex">학과: {{line[2]}}</div></div></div> 
              <div class="basic-information-box__description" v-else>학과: 컴퓨터공학과</div> 

              <div class="basic-information-box__description" v-if="user.length">
                <div v-for="(line, index) in user" :key="index">
                  <div v-if="index==vuexIndex">생년월일: {{line[3]}}</div></div></div>  
              <div class="basic-information-box__description" v-else>생년월일: 19980101</div>
            </div>
          </div>
          
          <div class="analysis-container">            
            <div class="analysis-box">
              <div class="analysis-box__title">언어 분석</div> 
              <div class="analysis-result-box">                 
                <div class="analysis-chart-box">                
                  <div class="analysis-chart-box__score"> {{positiveScore}}</div>  
                  <canvas id="chart1" width="50" height="50"></canvas>             
                </div>                           
                <div class="analysis-chart-box">               
                  <div class="analysis-chart-box__score"> {{negativeScore}}</div>  
                  <canvas id="chart2" width="50" height="50"></canvas>
                </div>                             
                <div class="analysis-chart-box">               
                  <div class="analysis-chart-box__score"> {{neutralityScore}}</div>  
                  <canvas id="chart3" width="50" height="50">
                  </canvas> 
                  
                </div>
              </div>
            </div>          
            <div class="analysis-box">
              <div class="analysis-box__title">워드 클라우드</div>  
              <div class="analysis-result-box"> 
                <div v-if="this.vuexIndex == 0">
                <img
                  src="img/wordcloud_result1.jpg"
                  style="width: 340px; height: 160px;"/>  
                </div>
                <div v-if="this.vuexIndex == 1">
                <img
                  src="img/wordcloud_result2.jpg"
                  style="width: 340px; height: 160px;"/>  
                </div>
                <div v-if="this.vuexIndex == 2">
                <img
                  src="img/wordcloud_result1.jpg"
                  style="width: 340px; height: 160px;"/>  
                </div>
                <div v-if="this.vuexIndex == 3">
                <img
                  src="img/wordcloud_result2.jpg"
                  style="width: 340px; height: 160px;"/>  
                </div>
              </div>
            </div>             
          </div>
        </div>
        <div class="chatting-container">
          <div class="chatting-container__title">발언 내용</div>          
          <div class="chatting-box">
            <div v-for="(line, index) in script" :key="index">
              <div v-if="index %2==0" class="chatting-box__name"><b>{{script[index]}}</b></div>
              <div v-else class="chatting-box__chat">{{script[index]}}</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>


<script>
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);

import { computed, onMounted, toRef } from "vue";
import { useStore } from "vuex";

export default {
  name: 'InterviewAnalysis',
  created:function(){
    console.log("!!! created vuexindex =", this.vuexIndex);
  },
  
  mounted() {
    if(this.vuexIndex == 0){
      this.positiveScore = 34;
      this.negativeScore = 10;
      this.neutralityScore = 56;

      this.fillData('chart1','긍정','긍정 아님', this.positiveScore, 100-this.positiveScore);
      this.fillData('chart2','부정','부정 아님', this.negativeScore, 100-this.negativeScore);    
      this.fillData('chart3','중립','중립 아님', this.neutralityScore, 100-this.neutralityScore);
    }
    if(this.vuexIndex == 1){

      this.positiveScore = 23;
      this.negativeScore = 17;
      this.neutralityScore = 60;

      this.fillData('chart1','긍정','긍정 아님', this.positiveScore, 100-this.positiveScore);
      this.fillData('chart2','부정','부정 아님', this.negativeScore, 100-this.negativeScore);    
      this.fillData('chart3','중립','중립 아님', this.neutralityScore, 100-this.neutralityScore);
    }
    if(this.vuexIndex == 2){

      this.positiveScore = 29;
      this.negativeScore = 6;
      this.neutralityScore = 65;

      this.fillData('chart1','긍정','긍정 아님', this.positiveScore, 100-this.positiveScore);
      this.fillData('chart2','부정','부정 아님', this.negativeScore, 100-this.negativeScore);    
      this.fillData('chart3','중립','중립 아님', this.neutralityScore, 100-this.neutralityScore);
    }
    if(this.vuexIndex == 3){

      this.positiveScore = 38;
      this.negativeScore = 16;
      this.neutralityScore = 46;

      this.fillData('chart1','긍정','긍정 아님', this.positiveScore, 100-this.positiveScore);
      this.fillData('chart2','부정','부정 아님', this.negativeScore, 100-this.negativeScore);    
      this.fillData('chart3','중립','중립 아님', this.neutralityScore, 100-this.neutralityScore);
    }
    
   // this.userIndex = this.$route.query.userIndex;
  },
  setup(changeIndex) {       
    const store = useStore();

    const vuexIndex = computed(() => store.state.moduleUserIndex.index);
    const gettinguserIndex = computed(() => store.getters["moduleUserIndex/getUserIndex"]);
    const increase = (changeIndex) => store.commit("moduleUserIndex/setUserIndex", changeIndex);

    return { vuexIndex, gettinguserIndex, increase };    

  },

  methods: {
    changeInterviewee(index){
      console.log("!!! change Interviewee = " , this.vuexIndex);
      
      this.$router.go({path:'/interview-analysis', name:'InterviewAnalysis', query: {userIndex: this.vuexIndex} });
    },

    fillData(chartId, label1, label2, data_true, data_false){
      const ctx = document.getElementById(chartId).getContext('2d');
      this.myChart = new Chart(ctx, {
        type:'doughnut',
        data:{
          labels:[label1, label2],
          datasets:[
            {
              backgroundColor:[
                "#5ebc88","#e1f8eb"
              ],
              data: [data_true, data_false]               
            }             
          ]
          
        },
        options: { 
          plugins: { 
            legend: {
              display: true, 
              position: "bottom", 
              labels: { 
                boxWidth: 7, 
                padding: 10, 
                usePointStyle: true, 
                pointStyle: "circle", 
                font: { 
                  size: 11
                } 
              }, 
              fullSize: false, 
              align: "center" 
            }, 
            tooltip: {
              boxWidth: 10, 
              bodyFont: { size: 10 } 
            } 
          },

          responsive: true, 
          maintainAspectRatio: false, 
          layout: {
            padding: { 
              top: 20, 
              bottom:20
            } 
          }, 
          elements: {
            arc: { 
              borderWidth: 0.2
            } 
          }, 
          animation: { 
            duration: 1000
          } 
        } 
      })
    },
    
  },

  data() {
    return{
      myChart: null,      
      user: [
        ['손모은','세종대학교','컴퓨터공학과','19980101'],
        ['이윤환','세종대학교','소프트웨어학과','19980202'],
        ['김채운','세종대학교','컴퓨터공학과','19980303'],
        ['박윤경','세종대학교','데이터사이언스학과','19980101']
      ],
      positiveScore: 0,
      negativeScore: 0,
      neutralityScore: 0,

      script: [
        "면접관 정상벽:","프로젝트를 많이 해보셨다고 했는데, 본인이 수행한 프로젝트 중 상용화 가능한 프로젝트가 있나요?",
        "면접자1 손모은:","안드로이드와 웹 기반으로 다양한 프로젝트를 참여했지만, 실제로 상용화 가능할 정도로 개발해 본적은 없습니다.",
        "면접관 정상벽:","안드로이드로 진행한 프로젝트에 대해 설명해주세요.",
        "면접자1 손모은: ","저는 코로나 시국에 마스크를 착용했는지 아닌지 판단하는 앱을 만들었습니다. 이때 디자인 패턴을 적용하는 경험을 해봤고 MVC 패턴을 적용해봤습니다.",
        "면접관 정상벽: ","MVC 패턴에 대해서 설명해보세요.",
        "면접자1 손모은: ","MVC 패턴은모델-뷰-컨트롤러로 구성됩니다. 사용자 인터페이스, 데이터 및 논리 제어를 구현하는데 널리 사용되는 소프트웨어 디자인 패턴입니다.",
        "면접관 정상벽: ","폭포수 모델 개발론으로 협업을 해봤다고했는데, 워터폴 방식의 애자일 방식의 차이점은 뭔가요?",
        "면접자2 이윤환: ","워터폴 방식은, 위에서 아래로 물이 떨어지는 것처럼 순차적으로 진행되는 프로세스이고, 애자일 방식은 스프린트라는 특정한 개발주기를 반복하는 프로세스입니다.",
        "면접관 정상벽: ","DB설계를 해보셨다고 했는데, 데이터베이스에서 인덱스를 사용하는 이유 및 장단점에 대해 설명해주세요.",
        "면접자2 이윤환: ","인덱스는 데이터베이스 테이블에 대한 검색 성능의 속도를 높여주는 장점이 있지만 정렬된 상태를 계속 유지시켜줘야 한다는 단점이 있습니다.",
        "면접관 정상벽: ","RESTful이란 무엇이며, 이것에 대해서 아는대로 설명해보세요.",
        "면접자2 이윤환: ","공부했던 부분이지만, 잘 기억이 나지 않습니다. 모르겠습니다.",
        "면접관 정상벽: ","다들 고생많으셨습니다.",
        "면접자1 손모은: ","감사합니다.",
        "면접자2 이윤환: ","감사합니다."
      ]

     // userIndex: 0
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/2_pages/interview-analysis.scss";
</style>
