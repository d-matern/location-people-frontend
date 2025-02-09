<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth/store';

const router = useRouter();
const authStore = useAuthStore();

const formData = ref({
  username: '',
  password: '',
});

const handleSubmit = async () => {
  await authStore.login(formData.value.username, formData.value.password);

  formData.value = {
    username: '',
    password: '',
  };

  router.push('/location');
};
</script>

<template>
  <form
    class="max-w-96 w-full p-5 flex flex-col items-center gap-3 rounded-2xl shadow-2xl"
    @submit.prevent="handleSubmit"
  >
    <h2 class="mb-5">Аутентификация</h2>

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

    <button class="mt-2" type="submit">Войти</button>

    <p class="mt-2">Нет аккаунт? <RouterLink to="/register">Зарегистрироваться</RouterLink></p>
  </form>
</template>
