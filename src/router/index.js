// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () =>import(/* webpackChunkName: "Home" */ "@/views/Home.vue"),
      },
      {
        path: "/projects",
        name: "Projects",
        component: () =>import(/* webpackChunkName: "AethosVoice" */ "@/views/Projects.vue"),
      },
      {
        path: "/voice",
        name: "AeronVoice",
        component: () =>import(/* webpackChunkName: "AethosVoice" */ "@/views/AethosVoice.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
