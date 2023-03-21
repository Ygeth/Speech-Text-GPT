// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "/",
        name: "Chat",
        component: () =>import(/* webpackChunkName: "Chat" */ "@/views/Home.vue"),
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
