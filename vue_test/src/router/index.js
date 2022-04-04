import { createRouter, createWebHistory } from 'vue-router';
import MainHome from '@/views/2_pages/MainHome'
import UserLogin from '@/views/2_pages/UserLogin'

const routes = [
    {
      path: "/",
      name:'Home',
      component:MainHome,
    },
    {
      path: "/login",
      name:'Login',
      component:UserLogin,
    },
]

const router = createRouter({ 
  history: createWebHistory(), 
  routes 
});

export default router;
