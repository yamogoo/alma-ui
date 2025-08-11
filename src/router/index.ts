import { createRouter, createWebHistory } from "vue-router/auto";
import { routes } from "vue-router/auto-routes";

import { routes as extendedRoutes } from "./extendedRoutes";

import { useAuthStore } from "@/stores";

import { trackRouteHistory } from "@/composables";

import type { TransitionType } from "@/typings";

export interface RouteMeta {
  rid: number;
  transitionType?: "vertical" | "horizontal";
  transitionIn?: TransitionType;
  transitionOut?: TransitionType;
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...extendedRoutes, ...routes],
});

router.beforeEach((to, from, next) => {
  trackRouteHistory(to, from);

  /* * * Auth * * */

  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    console.log(
      "to.meta.requiresAuth: ",
      to.meta.requiresAuth,
      "!auth.isLoggedIn: ",
      !auth.isLoggedIn
    );
    return next({ path: "/auth/login" });
  }

  next();
});
