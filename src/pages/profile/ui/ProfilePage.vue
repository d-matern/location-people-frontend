<script setup lang="ts">
import { useUserStore } from '@/shared/models/useUserStore';
import AvatarUser from '@/shared/ui/AvatarUser.vue';

const userStore = useUserStore();
</script>

<template>
  <main
    v-if="userStore.currentUser"
    :class="`
      w-full h-dvh flex flex-col items-center justify-start gap-5
      md:flex-row md:items-start md:justify-center
    `"
  >
    <div class="p-5 flex flex-col items-center gap-4 rounded-2xl shadow-xl">
      <AvatarUser :username="userStore.currentUser?.username" :src="userStore.currentUser.avatar" />

      <div>
        <p><b>Username:</b> {{ userStore.currentUser.username }}</p>
        <p><b>Age:</b> {{ userStore.currentUser.age }}</p>
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
        <span>{{ userStore.currentUser.firstName }}</span>
        <span>{{ userStore.currentUser.lastName }}</span>
        <span>{{ userStore.currentUser.gender === 'male' ? 'Мужской' : 'Женский' }}</span>
        <span>{{ new Date(userStore.currentUser.birthDate).toLocaleDateString() }}</span>
        <span>{{ userStore.currentUser.phone }}</span>
        <span>{{ userStore.currentUser.vk }}</span>
        <span>{{ userStore.currentUser.instagram }}</span>
        <span>{{ userStore.currentUser.telegram }}</span>
      </div>
    </div>
  </main>
</template>
