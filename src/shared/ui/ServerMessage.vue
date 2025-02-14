<script setup lang="ts">
defineProps<{
  type: 'success' | 'error';
  text: string;
}>();
</script>

<template>
  <p
    class="p-3 text-center border rounded-2xl"
    :class="
      type === 'success'
        ? 'text-teal-500 border-teal-500 bg-teal-300'
        : 'text-red-500 border-red-500 bg-red-300'
    "
  >
    {{ text }}
  </p>
</template>
