<script setup lang="ts">
defineProps<{
  username: string;
  src: string | null;
}>();
</script>

<template>
  <div
    v-if="!src"
    class="w-28 h-28 flex items-center justify-center text-white bg-gray-400 rounded-full"
  >
    <span>{{ username.slice(0)[0].toUpperCase() }}</span>
  </div>
  <img v-else class="rounded-full" :src="src" alt="Avatar" width="112" height="112" />
</template>
