import { createRouter, createWebHistory } from "vue-router";
import ListView from "../views/ListView.vue";

const routes = [
  {
    path: "/",
    name: "list",
    component: ListView,
  },
  {
    path: "/posts/:id",
    name: "single",
    props: true,
    component: () =>
      import(/* webpackChunkName: "single" */ "../views/SingleView.vue"),
  },
  {
    path: "/write",
    name: "write",
    component: () =>
      import(/* webpackChunkName: "write" */ "../views/WriteView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
