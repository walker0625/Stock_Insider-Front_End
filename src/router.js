import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

//lazy-loaded
const About = () => {
  return import("@/views/About.vue");
};

// return 값 하나면 Arrow Function은 이렇게도 표현가능
const Detail = () => import("@/views/Detail.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/detail/:traderName",
    name: "detail",
    component: Detail,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
