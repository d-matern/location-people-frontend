<script setup lang="ts">
const modelValue = defineModel();
</script>

<template>
  <input
    :class="`
      w-full py-1 px-1.5 border border-teal-500 rounded-md outline-teal-600
      disabled:border-gray-300 disabled:text-gray-300
    `"
    v-model="modelValue"
  />
</template>
