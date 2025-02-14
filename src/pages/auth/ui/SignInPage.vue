<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import type { SignInDto } from '@/shared/api/models';

import { fetchCurrentUser, fetchSignIn, logout } from '@/shared/api';
import { useAuthStore } from '@/shared/models';
import { useUserStore } from '@/shared/models/useUserStore';
import { LableWrapper, InputField, ButtonElevated, RegularLink, ServerMessage } from '@/shared/ui';

import SignTitle from './SignTitle.vue';
import SignContainer from './SignContainer.vue';
import SignForm from './SignForm.vue';
import SignSubtitle from './SignSubtitle.vue';
import SignDescription from './SignDescription.vue';

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

    <SignDescription />

    <SignForm @submit.prevent="handleSubmit">
      <SignSubtitle title="Аутентификация" />

      <LableWrapper for="username" title="Логин">
        <InputField id="username" v-model="formData.username" name="username" />
      </LableWrapper>

      <LableWrapper for="password" title="Пароль">
        <InputField id="password" v-model="formData.password" type="password" name="password" />
      </LableWrapper>

      <ServerMessage v-if="authStore.serverError" type="error" :text="authStore.serverError" />

      <ButtonElevated class="mt-2" type="submit">Войти</ButtonElevated>

      <p class="mt-2">Нет аккаунт? <RegularLink to="/sign-up">Зарегистрироваться</RegularLink></p>
    </SignForm>
  </SignContainer>
</template>
