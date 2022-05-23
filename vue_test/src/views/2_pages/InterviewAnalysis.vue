<template>
  <div class="container">
      <div class="interview-analysis-container">
        <div class="interviewee-list-box">
          <div class="interviewee-list-box__title">면접자 목록</div>
          
            <button class="interviewee-list-name" @click="changeInterviewee(0)">박태순</button>
            <button class="interviewee-list-name" @click="changeInterviewee(1)">정상벽</button>
            <button class="interviewee-list-name" @click="changeInterviewee(2)">김채운</button>
            <button class="interviewee-list-name" @click="changeInterviewee(3)">박윤경</button>
         <!--
            <v-btn class="interviewee-list-name" @click="changeInterviewee(0)">박태순</v-btn>
            <v-btn class="interviewee-list-name" @click="changeInterviewee(1)">정상벽</v-btn>
            <v-btn class="interviewee-list-name" @click="changeInterviewee(2)">김채운</v-btn>
            <v-btn class="interviewee-list-name" @click="changeInterviewee(3)">박윤경</v-btn>-->
          
        </div>
        <div class="information-container">
          <div class="basic-information-container">
            <img
                  src="img/img_profile_photo_example.png"
                  style="width: 150px; height: 170x; margin: 20px 0 0 20px"/>
            <div class="basic-information-box">
              <div class="basic-information-box__title">기본 정보</div>
              
              <div class="basic-information-box__description" v-if="user.length">
                <div v-for="(line, index) in user" :key="index">
                  <div v-if="index==0">이름: {{line[index]}}</div></div></div>
             
              <div class="basic-information-box__description" v-else>이름: 박태순</div>
   <!--
                <div v-for="(item, index) in user" :key="index">{{index}}-{{item[0]}}</div></div>     
                -->             

<!-- <div class="basic-information-box__description">이름: 박태순</div>
 -->  
 
              <div class="basic-information-box__description">학교: 세종대학교</div>
              <div class="basic-information-box__description">학과: 컴퓨터공학과</div>  
              <div class="basic-information-box__description">생년월일: 19980101</div>
            </div>
          </div>
          
          <div class="analysis-container">            
            <div class="analysis-box">
              <div class="analysis-box__title">언어 분석</div> 
              <div class="analysis-result-box">                 
                <div class="analysis-chart-box">                  
                  <canvas id="chart1" width="50" height="50"></canvas>  
                </div>                           
                <div class="analysis-chart-box">                  
                  <canvas id="chart2" width="50" height="50"></canvas>  
                </div>                             
                <div class="analysis-chart-box">               
                  <canvas id="chart3" width="50" height="50"></canvas> 
                </div>
              </div>
            </div>          
            <div class="analysis-box">
              <div class="analysis-box__title">워드 클라우드</div>  
              <div class="analysis-result-box"> 
                

              </div>
            </div>             
          </div>
        </div>
        <div class="chatting-container">
          <div class="chatting-container__title">발언 내용</div>          
          <div class="chatting-box">
            <div class="chatting-box__chat">면접관1: 자기소개 부탁합니다.</div>
            <div class="chatting-box__chat">박태순: 안녕하세요. 저는 세종대 컴퓨터공학과를 졸업한 박태순입니다.</div>
            <div class="chatting-box__chat">면접관2: 무슨 파트 개발에 관심이 많으신가요?</div>
            <div class="chatting-box__chat">박태순: 저는 웹 백엔드 개발에 관심이 있습니다.</div>
            <div class="chatting-box__chat">면접관1: 프로젝트 경험이 있나요?</div>
          </div>
        </div>
      </div>
  </div>
</template>


<script>
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);

export default {
  name: 'InterviewAnalysis',
  created:function(){
    console.log("!!! created userindex =", this.userIndex);

    if(this.userIndex){
      console.log("!!! if created userindex =", this.userIndex);
    }
  },
  
  mounted() {
    this.fillData('chart1','긍정','긍정 아님', 70, 30);
    this.fillData('chart2','부정','부정 아님', 10, 90);    
    this.fillData('chart3','중립','중립 아님', 80, 20);
    
    this.userIndex = this.$route.query.userIndex;
    console.log("!!! mounted : this userindex = ", this.userIndex);
    console.log("!!! mounted : route query userindex = ", this.$route.query.userIndex);
  },

  methods: {
    changeInterviewee(index){
      console.log("!!! change Interviewee = ", index);
      //this.$router.push({path:'/interview-analysis', name:'InterviewAnalysis', query: {userIndex: index} });
      
      //this.userIndex = index;
      //this.$router.go({path:'/interview-analysis', name:'InterviewAnalysis', query: {userIndex: index} });
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
        ['박태순','세종대학교','컴퓨터공학과','19980101'],
        ['정상벽','세종대학교','소프트웨어학과','19980202'],
        ['김채운','세종대학교','컴퓨터공학과','19980303'],
        ['박윤경','세종대학교','데이터사이언스학과','19980101']
      ],
      userIndex: 0
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/2_pages/interview-analysis.scss";
</style>
