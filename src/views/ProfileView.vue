<script setup lang="ts">
import UiAvatar from '@/components/ui/UiAvatar.vue';
import UiLogout from '@/components/ui/UiLogout.vue';
import { useAuthStore } from '@/stores/auth/store';

const authStore = useAuthStore();
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/location">Люди рядом</RouterLink>
      <UiLogout />
    </nav>
  </header>

  <main
    v-if="authStore.user"
    :class="`
      w-full h-dvh flex flex-col items-center justify-start gap-5
      md:flex-row md:items-start md:justify-center
    `"
  >
    <div class="p-5 flex flex-col items-center gap-4 rounded-2xl shadow-xl">
      <UiAvatar :username="authStore.user?.username" :src="authStore.user.avatar" />

      <div>
        <p><b>Username:</b> {{ authStore.user.username }}</p>
        <p><b>Age:</b> {{ authStore.user.age }}</p>
      </div>
    </div>

    <div class="p-5 flex flex-row gap-5 rounded-2xl shadow-xl">
      <div class="flex flex-col gap-1">
        <span>Имя:</span>
        <span>Фамилия:</span>
        <span>Пол:</span>
        <span>Дата рождения:</span>
        <span>Номер телефона:</span>
        <span>VK:</span>
        <span>Instagram:</span>
        <span>Telegram:</span>
      </div>
      <div class="flex flex-col gap-1">
        <span>{{ authStore.user.firstName }}</span>
        <span>{{ authStore.user.lastName }}</span>
        <span>{{ authStore.user.gender === 'male' ? 'Мужской' : 'Женский' }}</span>
        <span>{{ new Date(authStore.user.birthDate).toLocaleDateString() }}</span>
        <span>{{ authStore.user.phone }}</span>
        <span>{{ authStore.user.vk }}</span>
        <span>{{ authStore.user.instagram }}</span>
        <span>{{ authStore.user.telegram }}</span>
      </div>
    </div>
  </main>
</template>
