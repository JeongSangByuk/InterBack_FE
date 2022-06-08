import { createRouter, createWebHistory } from "vue-router";
import MainHome from "@/views/2_pages/MainHome";
import UserLogin from "@/views/2_pages/UserLogin";
import RoomCreation from "@/views/2_pages/RoomCreation";
import RoomEntry from "@/views/2_pages/RoomEntry";
import InterviewRoom from "@/views/2_pages/InterviewRoom";
import InterviewList from "@/views/2_pages/InterviewList";
import InterviewAnalysis from "@/views/2_pages/InterviewAnalysis";

import WordcloudTest from "@/views/2_pages/WordcloudTest";
import VuexTest from "@/views/2_pages/VuexTest";

const routes = [
  {
    path: "/",
    name: "Home",
    component: MainHome,
  },
  {
    path: "/login",
    name: "Login",
    component: UserLogin,
  },
  {
    path: "/room-creation",
    name: "RoomCreation",
    component: RoomCreation,
  },
  {
    path: "/room-entry",
    name: "RoomEntry",
    component: RoomEntry,
  },
  {
    path: "/interview-room",
    name: "InterviewRoom",
    component: InterviewRoom,
  },
  {
    path: "/interview-list",
    name: "InterviewList",
    component: InterviewList,
  },
  {
    path: "/interview-analysis",
    name: "InterviewAnalysis",
    component: InterviewAnalysis,
  },
  
  {
    path: "/wordcloud-test",
    name: "WordcloudTest",
    component: WordcloudTest,
  },
  {
    path: "/vuex-test",
    name: "VuexTest",
    component: VuexTest,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
