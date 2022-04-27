import App from './App.vue'
import { createApp } from 'vue';
import router from './router';
import WebRTC from 'vue-webrtc'
import VueCookies from "vue-cookies";

createApp(App)
    .use(VueCookies,{
        expireTimes: "10d",
        secure: true,
    })
    .use(router)
    .use(WebRTC).mount('#app')
