import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },

  {
    path: "/register",
    name: "register",
    component: RegisterView,
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
