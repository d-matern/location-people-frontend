<template>
  <button
    :class="`
      w-fit px-4 py-1.5 text-white rounded-md bg-teal-600 transition-colors
      hover:bg-teal-500 focus:bg-teal-500 active:scale-95 disabled:bg-gray-300
    `"
  >
    <slot />
  </button>
</template>
