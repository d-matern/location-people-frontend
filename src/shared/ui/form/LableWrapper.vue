<script setup lang="ts">
defineProps<{
  title?: string;
  errorMessage?: string;
}>();
</script>

<template>
  <label class="w-full flex flex-col items-start gap-0.5">
    <span v-if="title" class="font-medium">
      {{ title }}
    </span>

    <slot />

    <span v-if="errorMessage" class="text-red-500 text-xs">{{ errorMessage }}</span>
  </label>
</template>
