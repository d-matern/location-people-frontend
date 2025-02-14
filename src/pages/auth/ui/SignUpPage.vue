<script setup lang="ts">
import { fetchCurrentUser, fetchSignUp, logout } from '@/shared/api';
import type { SignUpDto } from '@/shared/api/models';
import { useAuthStore } from '@/shared/models';
import { useUserStore } from '@/shared/models/useUserStore';
import { ServerMessage } from '@/shared/ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SignTitle from './SignTitle.vue';
import SignContainer from './SignContainer.vue';
import SignForm from './SignForm.vue';

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

    <SignForm title="Регистрация" @submit.prevent="handleSubmit">
      <label for="username" class="w-full flex flex-col items-start gap-0.5">
        <span>Логин</span>
        <input id="username" class="w-full" v-model="formData.username" name="username" />
      </label>

      <label for="firstName" class="w-full flex flex-col items-start gap-0.5">
        <span>Имя</span>
        <input id="firstName" class="w-full" v-model="formData.firstName" name="firstName" />
      </label>

      <label for="lastName" class="w-full flex flex-col items-start gap-0.5">
        <span>Фамилия</span>
        <input id="lastName" class="w-full" v-model="formData.lastName" name="lastName" />
      </label>

      <div class="w-full flex flex-col items-start gap-0.5">
        <span>Пол: {{ formData.gender }}</span>
        <label>
          <input v-model="formData.gender" type="radio" name="gender" value="male" />
          Мужской
        </label>
        <label>
          <input v-model="formData.gender" type="radio" name="gender" value="female" />
          Женский
        </label>
      </div>

      <label for="birthDate" class="w-full flex flex-col items-start gap-0.5">
        <span>Дата рождения</span>
        <input
          id="birthDate"
          v-model="formData.birthDate"
          class="w-full"
          type="date"
          name="birthDate"
        />
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

      <button class="mt-2" type="submit">Зарегистрироваться</button>

      <p class="mt-2">Есть аккаунт? <RouterLink to="/">Войти</RouterLink></p>
    </SignForm>
  </SignContainer>
</template>
