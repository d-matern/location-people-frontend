<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth/store';
import type { RegisterDto } from '@/stores/auth/register.dto';

const router = useRouter();
const authStore = useAuthStore();

const formData = ref<RegisterDto>({
  username: '',
  firstName: '',
  lastName: '',
  birthDate: new Date(),
  gender: '',
  password: '',
});

const handleSubmit = async () => {
  await authStore.register(formData.value);
  await authStore.login(formData.value.username, formData.value.password);

  formData.value = {} as RegisterDto;

  router.push('/location');
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

    <button class="mt-2" type="submit">Зарегистрироваться</button>

    <p class="mt-2">Есть аккаунт? <RouterLink to="/">Войти</RouterLink></p>
  </form>
</template>
