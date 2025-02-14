import { createRouter, createWebHistory } from 'vue-router';
import { SignInPage } from '@/pages/auth';
import { globalMiddleware } from '@/app/middleware';

declare module 'vue-router' {
  interface RouteMeta {
    authRoute: boolean;
    requiresAuth: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/sign-in',
      name: 'sign-in',
      component: SignInPage,
      meta: {
        authRoute: true,
        requiresAuth: false,
      },
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('@/pages/auth').then(({ SignUpPage }) => SignUpPage),
      meta: {
        authRoute: true,
        requiresAuth: false,
      },
    },
    {
      path: '/nearby-users',
      name: 'nearby-users',
      component: () =>
        import('@/pages/nearby-users').then(({ NearbyUsersPage }) => NearbyUsersPage),
      meta: {
        authRoute: false,
        requiresAuth: true,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/pages/profile').then(({ ProfilePage }) => ProfilePage),
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
