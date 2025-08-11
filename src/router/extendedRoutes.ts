export const routes = [
  {
    path: "/auth/",
    alias: "/",
    component: () => import("@/layouts/AuthLayout.vue"),
    redirect: "/auth/login",
    meta: {
      rid: -1,
      requiresAuth: false,
    },
    children: [
      {
        path: "/auth/login",
        component: () => import("@/pages/auth/login.vue"),
        meta: {
          rid: -1,
          requiresAuth: false,
        },
      },
    ],
  },
  {
    path: "/editor",
    component: () => import("@/layouts/EditorLayout.vue"),
    meta: {
      rid: 100,
      requiresAuth: true,
    },
    children: [
      {
        path: "/editor/notes",
        component: () => import("@/pages/editor/index.vue"),
        meta: {
          rid: 100,
          requiresAuth: true,
        },
      },
    ],
  },
];
