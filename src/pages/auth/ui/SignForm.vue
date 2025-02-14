<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <form class="max-w-96 w-full p-5 flex flex-col items-center gap-3 rounded-2xl shadow-2xl">
    <h2 class="mb-5">{{ title }}</h2>

    <slot />
  </form>
</template>
