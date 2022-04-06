import App from './App.vue'
import { createApp } from 'vue';
import router from './router';
import WebRTC from 'vue-webrtc'

createApp(App).use(router).use(WebRTC).mount('#app')

