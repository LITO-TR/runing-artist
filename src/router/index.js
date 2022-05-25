import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/challenges",
      name: "challenge-card",
      component: () =>
        import("../challenges/pages/challenge-card.component.vue"),
      props: { enableListDialogs: true },
    },
    {
      path: "/business/challenges",
      name: "challenge-list",
      component: () =>
        import("../challenges/pages/challenge-list.component.vue"),
      props: { enableListDialogs: true },
    },
  ],
});

export default router;
