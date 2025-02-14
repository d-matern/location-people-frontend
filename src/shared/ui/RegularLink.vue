<script setup lang="ts">
import {
  RouterLink,
  type RouteLocationAsPathGeneric,
  type RouteLocationAsRelativeGeneric,
} from 'vue-router';

defineProps<{
  to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
}>();
</script>

<template>
  <RouterLink class="text-sky-500 transition-colors hover:text-sky-300" :to="to">
    <slot />
  </RouterLink>
</template>
