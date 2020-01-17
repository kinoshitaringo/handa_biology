import Home from "../views/Home.vue";
import Router, { RouteConfig } from "vue-router";
import Vue from "vue";

Vue.use(Router);

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// example:
// const MyComponent    component: () =>
// import(/* webpackChunkName: "about" */ "../views/About.vue")
// import the Component here
const TheContainer = () => import("@/components/container/TheContainer.vue");
const Sysinfo = () => import("@/views/sysinfo.vue");
const Login = () => import("@/views/login.vue");

const routes: RouteConfig[] = [
  {
    path: "/",
    redirect: "/admin",
    name: "首页",
    component: TheContainer,
    children: [
      {
        path: "/admin",
        component: Sysinfo
      }
    ]
  },
  {
    path: "/login",
    name: "登陆",
    component: Login
  }
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
