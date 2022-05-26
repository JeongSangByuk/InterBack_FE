<template>
  <div class="interviewee">
    <p class="interviewee__name">면접자. {{ userName }}</p>
    <div class="interviewee__video-container">
      <video
          v-show="connectingState[userId] === 'connected'"
          ref="video"
          autoplay
      ></video>
      <img
          v-show="connectingState[userId] === 'before'"
          src="img/img_user_interview_female.png"
      />
    </div>

    <div class="interviewee__emotion-box">
      <p>감정 분석</p>
      <canvas v-bind:id="userId + '_chart'" width="150" height="150"/>
    </div>

    <div class="interviewee__wordcloud">
      <p>워드 클라우드</p>

      <div class="interviewee__wordcloud--img-container">
        <img
            ref = "wordcloud_img"
            src="img/word_cloud/wc_before.png"
        />
      </div>
    </div>
  </div>
</template>

<script>

import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

export default {
  props: ["connectingState", "userId", "userName",],
  data() {
    return {
      positiveEmotionValue: 50,
      negativeEmotionValue: 50,
    }
  },
  methods: {

    updateChart() {
      this.chart1.data.datasets[0].data[0] = this.positiveEmotionValue;
      this.chart1.data.datasets[0].data[1] = this.negativeEmotionValue;
      this.chart1.update();
    },

    changeWordcloudImg(src){
      let path = "";


      if (this.userId !== "bbbb" && this.userId !== "cccc") {
        return;
      }

      if(this.userId === "bbbb"){
      if(src.includes("프로젝트") || src.includes("상용화"))
        path = "img/word_cloud/b_1.jpg";
      else if(src.includes("코로나") || src.includes("마스크") || src.includes("앱"))
        path = "img/word_cloud/b_2.png";
      else if(src.includes("디자인") || src.includes("인터페이스") || src.includes("데이터"))
        path = "img/word_cloud/b_3.jpg";
      }
      else if(this.userId === "cccc"){
        if(src.includes("프로세스") || src.includes("개발"))
          path = "img/word_cloud/c_1.jpg";
        else if(src.includes("인덱스") || src.includes("데이터베이스") || src.includes("장점"))
          path = "img/word_cloud/c_2.jpg";
        else if(src.includes("공부") || src.includes("모르") || src.includes("기억"))
          path = "img/word_cloud/c_3.jpg";
      }

      if (path !== "")
        this.$refs["wordcloud_img"].src = path;

    },

    fillData(chartId, label1, label2) {

      const ctx = document.getElementById(chartId).getContext('2d');
      this.chart1 = new Chart(ctx, {
        type: 'doughnut',
        data: {
          chart1: null,
          labels: [label1, label2],
          datasets: [
            {
              backgroundColor: [
                "#5ebc88", "#e1f8eb"
              ],
              data: [this.positiveEmotionValue, this.negativeEmotionValue]
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
              bodyFont: {size: 10}
            }
          },

          responsive: false,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 20,
              bottom: 10
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

  mounted() {
    this.fillData(this.userId + '_chart', '긍정', '긍정 아님');
  }
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/2_pages/interview-room.scss";
//@import "./../../assets/scss/2_pages/interview-analysis.scss";
</style>
