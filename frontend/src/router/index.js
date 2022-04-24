import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import DashboardView from "@/views/DashboardView";
import store from "@/store";

const routes = [{
        path: "/login",
        name: "login",
        component: LoginView,
        meta: { requiredAuth: false },
    },

    {
        path: "/register",
        name: "register",
        component: RegisterView,
        meta: { requiredAuth: false },
    },

    {
        path: "/dashboard",
        name: "dashboard",
        component: DashboardView,
        meta: { requiredAuth: true },
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});



router.beforeEach(async(to, from, next) => {
    if (to.meta.requiredAuth) {
        const isLoggedIn = store.getters["user/isLoggedIn"].success || localStorage.getItem("isLoggedIn");
        const userIdExisted = (store.getters["user/userProfile"].userId !== -1 || localStorage.getItem("userProfile")) ? true : false
        if (!isLoggedIn || !userIdExisted) {
            return next({ path: "/login" })
        }
        return next();
    }
    return next();
})



export default router;