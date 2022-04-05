import { createRouter, createWebHistory } from "vue-router";
import MainHome from "@/views/2_pages/MainHome";
import UserLogin from "@/views/2_pages/UserLogin";
import RoomCreation from "@/views/2_pages/RoomCreation";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
