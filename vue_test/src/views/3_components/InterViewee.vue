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
      <div class="analysis-chart-box">
        <canvas v-bind:id= "userId + '_chart'" width="50" height="50" />
      </div>
    </div>

    <div class="interviewee__wordcloud">
      <p>워드 클라우드</p>
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

    fillData(chartId, label1, label2) {

      const ctx = document.getElementById(chartId).getContext('2d');
      this.chart1 = new Chart(ctx, {
        type: 'doughnut',
        data: {
          chart1:null,
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

          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 20,
              bottom: 20
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
    this.fillData(this.userId + '_chart','긍정','긍정 아님');
  }
};
</script>

<style lang="scss" scoped>
@import "./../../assets/scss/2_pages/interview-room.scss";
@import "./../../assets/scss/2_pages/interview-analysis.scss";
</style>
