import { useAuthStore } from '@/shared/models';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export function globalMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLoggedIn()) {
    console.log(1);
    next({
      path: '/sign-in',
      query: { redirect: to.fullPath },
    });
    return;
  }

  if (to.meta.authRoute && authStore.isLoggedIn()) {
    console.log(2);
    next('/profile');
    return;
  }

  next();
}
