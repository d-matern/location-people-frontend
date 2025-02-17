import { useAuthStore } from '@/shared/models';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export function globalMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLoggedIn()) {
    next({
      path: '/sign-in',
      query: { redirect: to.fullPath },
    });
    return;
  }

  if (to.meta.authRoute && authStore.isLoggedIn()) {
    next('/profile');
    return;
  }

  next();
}
