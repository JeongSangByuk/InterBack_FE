//import Vue from 'vue'
import App from "./App.vue";
import { createApp } from "vue";
import router from "./router";
import WebRTC from "vue-webrtc";
import axios from "axios";
import VueCookies from "vue-cookies";

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app
  .use(VueCookies, {
    expireTimes: "10d",
    secure: true,
  })
  .use(router)
  .use(WebRTC)
  .mount("#app");
