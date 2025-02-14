<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import type { SignUpDto } from '@/shared/api/models';

import { fetchCurrentUser, fetchSignUp, logout } from '@/shared/api';
import { useAuthStore } from '@/shared/models';
import { useUserStore } from '@/shared/models/useUserStore';
import { ButtonElevated, InputField, LableWrapper, RegularLink, ServerMessage } from '@/shared/ui';

import SignTitle from './SignTitle.vue';
import SignContainer from './SignContainer.vue';
import SignForm from './SignForm.vue';
import SignSubtitle from './SignSubtitle.vue';
import SignDescription from './SignDescription.vue';

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();

const formData = ref<SignUpDto>({
  username: '',
  firstName: '',
  lastName: '',
  birthDate: new Date(),
  gender: '',
  password: '',
});

const handleSubmit = async () => {
  const responseAuth = await fetchSignUp(formData.value);
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
    formData.value = {} as SignUpDto;

    router.push('/nearby-users');
  }
};
</script>

<template>
  <SignContainer>
    <SignTitle />

    <SignDescription />

    <SignForm @submit.prevent="handleSubmit">
      <SignSubtitle title="Регистрация" />

      <LableWrapper for="username" title="Логин">
        <InputField id="username" v-model="formData.username" name="username" />
      </LableWrapper>

      <LableWrapper for="firstName" title="Имя">
        <InputField id="firstName" v-model="formData.firstName" name="firstName" />
      </LableWrapper>

      <LableWrapper for="lastName" title="Фамилия">
        <InputField id="lastName" v-model="formData.lastName" name="lastName" />
      </LableWrapper>

      <div class="w-full">
        <span class="font-medium">Пол:</span>

        <label class="ml-1 flex flex-row items-center gap-1 text-xs" for="male">
          Мужской
          <input
            id="male"
            class="size-2.5"
            v-model="formData.gender"
            type="radio"
            name="gender"
            value="male"
          />
        </label>
        <label class="ml-1 flex flex-row items-center gap-1 text-xs" for="female">
          Женский
          <input
            id="female"
            class="size-2.5"
            v-model="formData.gender"
            type="radio"
            name="gender"
            value="female"
          />
        </label>
      </div>

      <LableWrapper for="birthDate" title="Дата рождения">
        <InputField id="birthDate" v-model="formData.birthDate" type="date" name="birthDate" />
      </LableWrapper>

      <LableWrapper for="password" title="Пароль">
        <InputField id="password" v-model="formData.password" type="password" name="password" />
      </LableWrapper>

      <ServerMessage v-if="authStore.serverError" type="error" :text="authStore.serverError" />

      <ButtonElevated class="mt-2" type="submit">Зарегистрироваться</ButtonElevated>

      <p class="mt-2">Есть аккаунт? <RegularLink to="/">Войти</RegularLink></p>
    </SignForm>
  </SignContainer>
</template>
