<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
  login: '',
  password: '',
  rePassword: '',
});

const handleSubmit = () => {
  console.log(formData.value);
  formData.value = {
    login: '',
    password: '',
    rePassword: '',
  };
};
</script>

<template>
  <form
    class="max-w-96 w-full p-5 flex flex-col items-center gap-3 rounded-2xl shadow-2xl"
    @submit.prevent="handleSubmit"
  >
    <h2 class="mb-5">Регистрация</h2>

    <label for="login" class="w-full flex flex-col items-start gap-0.5">
      <span>Логин</span>
      <input id="login" class="w-full" v-model="formData.login" name="login" />
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

    <label for="rePassword" class="w-full flex flex-col items-start gap-0.5">
      <span>Повторить пароль</span>
      <input
        id="rePassword"
        v-model="formData.rePassword"
        class="w-full"
        type="password"
        name="rePassword"
      />
    </label>

    <button class="mt-2" type="submit">Зарегистрироваться</button>

    <p class="mt-2">Есть аккаунт? <RouterLink to="/">Войти</RouterLink></p>
  </form>
</template>
