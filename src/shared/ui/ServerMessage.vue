<script setup lang="ts">
defineProps<{
  type: 'success' | 'error';
  text: string;
}>();
</script>

<template>
  <p
    class="w-full px-2 py-0.5 text-xs text-center border rounded-md"
    :class="
      type === 'success'
        ? 'text-teal-600 border-teal-600 bg-teal-200'
        : 'text-red-600 border-red-600 bg-red-200'
    "
  >
    {{ text }}
  </p>
</template>
