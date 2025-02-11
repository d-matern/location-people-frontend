import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import { globalMiddleware } from '@/middleware/globalMiddleware';

declare module 'vue-router' {
  interface RouteMeta {
    authRoute: boolean;
    // должно быть определено для каждого маршрута
    requiresAuth: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        authRoute: true,
        requiresAuth: false,
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        authRoute: true,
        requiresAuth: false,
      },
    },
    {
      path: '/location',
      name: 'location',
      component: () => import('../views/LocationView.vue'),
      meta: {
        authRoute: false,
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        authRoute: false,
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  globalMiddleware(to, from, next);
});

export default router;
