import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
import WebRTC from 'vue-webrtc'
import axios from 'axios'
import VueCookies from 'vue-cookies'

import store from "./store";
const app = createApp(App)

app.config.globalProperties.$axios = axios
app.config.globalProperties.$loginData =

[{id:'aaaa', pass:'1111'},{id:'bbbb', pass:'2222'},{id:'cccc', pass:'3333'}]
// [['aaaa','1111'],['bbbb','222'],["cccc","3333"]]


app.use(VueCookies,{
        expireTimes: "10d",
        secure: true,
    })
    .use(router)
    .use(WebRTC)
    .use(store)
    .mount('#app')