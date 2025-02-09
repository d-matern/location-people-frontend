<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth/store';

const router = useRouter();
const authStore = useAuthStore();

const formData = ref({
  username: '',
  password: '',
  age: '',
});

const handleSubmit = async () => {
  await authStore.register(formData.value.username, formData.value.password, +formData.value.age);
  await authStore.login(formData.value.username, formData.value.password);

  formData.value = {
    username: '',
    password: '',
    age: '',
  };

  router.push('/');
};
</script>

<template>
  <form
    class="max-w-96 w-full p-5 flex flex-col items-center gap-3 rounded-2xl shadow-2xl"
    @submit.prevent="handleSubmit"
  >
    <h2 class="mb-5">Регистрация</h2>

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

    <label for="age" class="w-full flex flex-col items-start gap-0.5">
      <span>Возраст</span>
      <input
        id="age"
        v-model="formData.age"
        class="w-full"
        type="number"
        name="age"
        min="0"
        max="150"
        step="1"
      />
    </label>

    <button class="mt-2" type="submit">Зарегистрироваться</button>

    <p class="mt-2">Есть аккаунт? <RouterLink to="/">Войти</RouterLink></p>
  </form>
</template>
