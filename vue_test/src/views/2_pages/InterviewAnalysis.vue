<template>
  <div class="container">
      <div class="interview-analysis-container">
        <div class="interviewee-list-box">
          <div class="interviewee-list-box__title">면접자 목록</div>
            <div class="interviewee-list-name">박태순</div>
            <div class="interviewee-list-name">정상벽</div>
            <div class="interviewee-list-name">김채운</div>
            <div class="interviewee-list-name">박윤경</div>
        </div>
        <div class="information-container">
          <div class="basic-information-container">
            <img
                  src="img/img_profile_photo_example.png"
                  style="width: 150px; height: 170x; margin: 20px 0 0 20px"/>
            <div class="basic-information-box">
              <div class="basic-information-box__title">기본 정보</div>
              <div class="basic-information-box__description">이름: 박태순</div>
              <div class="basic-information-box__description">학교: 세종대학교</div>
              <div class="basic-information-box__description">학과: 컴퓨터공학과</div>  
              <div class="basic-information-box__description">생년월일: 19980101</div>
            </div>
          </div>
          
          <div class="analysis-container">            
            <div class="analysis-box">
              <div class="analysis-box__title">언어 분석</div> 
             




              <canvas id="chart1" width="50" height="50"></canvas>
              <canvas id="chart2" width="50" height="50"></canvas>
              <canvas id="chart3" width="50" height="50"></canvas>
            
            </div>          
            <div class="analysis-box">
              <div class="analysis-box__title">워드 클라우드</div>  
            </div>  
            <div class="analysis-box">
              <div class="analysis-box__title">감정 변화</div>  
            </div>  
            <div class="analysis-box">
              <div class="analysis-box__title">목소리 분석</div>  
            </div>  
            <div class="analysis-box">
              <div class="analysis-box__title">Interback 총점</div>  
            </div>  
            <div class="analysis-box">
              <div class="analysis-box__title">총점 그래프</div>  
            </div>  
          </div>
        </div>
        <div class="chatting-container">
        </div>
      </div>
  </div>
</template>

<script>
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);

export default {
  methods: {
    fillData(chartId, label1, label2){
      const ctx = document.getElementById(chartId).getContext('2d');
      this.myChart = new Chart(ctx, {
        type:'doughnut',
        data:{
          labels:[label1,label2],
          datasets:[
            {
              backgroundColor:[
                "#DD7445", "#DE9D11"
              ],
              data: [70, 30]               
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
                  size: 10
                } 
              }, 
              fullSize: false, 
              align: "center" 
            }, 
            tooltip: {
              boxWidth: 15, 
              bodyFont: { size: 14 } 
            } 
          },

          responsive: true, 
          maintainAspectRatio: false, 
          layout: {
            padding: { 
              top: 50, 
              bottom:50
            } 
          }, 
          elements: {
            arc: { 
              borderWidth: 1
            } 
          }, 
          animation: { 
            duration: 1000
          } 
        } 
      })
    }
  },
  mounted() {
    this.fillData('chart1','긍정','긍정아님');
    this.fillData('chart2','00','22');    
    this.fillData('chart3','11','33');

  },
  data(){
    return{
      myChart:null
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/2_pages/interview-analysis.scss";
</style>
