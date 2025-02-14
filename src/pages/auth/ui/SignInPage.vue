<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { fetchCurrentUser, fetchSignIn, logout } from '@/shared/api';
import { useAuthStore } from '@/shared/models';
import { useUserStore } from '@/shared/models/useUserStore';

import type { SignInDto } from '@/shared/api/models';

import ServerMessage from '@/shared/ui/ServerMessage.vue';
import SignTitle from './SignTitle.vue';
import SignContainer from './SignContainer.vue';
import SignForm from './SignForm.vue';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();

const formData = ref({
  username: '',
  password: '',
});

const handleSubmit = async () => {
  const responseAuth = await fetchSignIn(formData.value);
  if (responseAuth.error) {
    authStore.setServerError(responseAuth.error);
    return;
  }

  if (responseAuth.success) {
    authStore.setAuth();

    const responseCurrentUser = await fetchCurrentUser();
    if (responseCurrentUser.error) {
      logout();
      authStore.logout();
      authStore.setServerError(responseCurrentUser.error);
      return;
    }

    if (responseCurrentUser.success) {
      userStore.setCurrentUser(responseCurrentUser.success);
    }

    authStore.setServerError(null);
    formData.value = {} as SignInDto;

    const redirectPath = route.query.redirect?.toString() || '/nearby-users';
    router.push(redirectPath);
  }
};
</script>

<template>
  <SignContainer>
    <SignTitle />

    <SignForm title="Аутентификация" @submit.prevent="handleSubmit">
      <label for="username" class="w-full flex flex-col items-start gap-0.5">
        <span>Логин</span>
        <input id="username" class="w-full" v-model="formData.username" name="username" />
      </label>

      <label for="password" class="w-full flex flex-col items-start gap-0.5">
        <span>Пароль</span>
        <input
          id="password"
          v-model="formData.password"
          class="w-full"
          type="password"
          name="password"
        />
      </label>

      <ServerMessage v-if="authStore.serverError" type="error" :text="authStore.serverError" />

      <button class="mt-2" type="submit">Войти</button>

      <p class="mt-2">Нет аккаунт? <RouterLink to="/sign-up">Зарегистрироваться</RouterLink></p>
    </SignForm>
  </SignContainer>
</template>
