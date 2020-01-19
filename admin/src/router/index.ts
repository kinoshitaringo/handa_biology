import Router, { Route, RouteConfig } from "vue-router";
import Vue from "vue";

Vue.use(Router);

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
// example:
// const MyComponent    component: () =>
// import(/* webpackChunkName: "about" */ "../views/About.vue")
// import the Component here
const Login = () => import("@/views/login.vue");
const TheContainer = () => import("@/components/container/TheContainer.vue");
const Home = () => import("@/views/home.vue");
const Sysinfo = () => import("@/views/sysinfo.vue");
const Prods = () => import("@/views/prods.vue");
const ProdAdd = () => import("@/views/prodAdd.vue");

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "首页",
    component: TheContainer,
    children: [
      {
        path: "",
        name: "首页",
        component: Home
      },
      {
        path: "/sysinfo",
        name: "系统数据",
        component: Sysinfo
      },
      {
        path: "/prods",
        name: "产品信息列表",
        component: Prods
      },
      { path: "/prod-add", name: "添加产品信息", component: ProdAdd }
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

// global guard
router.beforeEach((to: Route, from: Route, next: (to?: any) => void) => {
  if (to.name) document.title = to.name;
  next();
});

export default router;
