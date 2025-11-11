<template>
  <button
    class="flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-gray-600 shadow-md backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-white/10 dark:text-gray-200"
    @click="toggleTheme()"
  >
    <span class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
      <svg
        v-if="!isDark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="h-5 w-5"
      >
        <path
          d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1.05a1 1 0 0 1 2 0V21a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm10 7h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM4 12a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1Zm15.07 7.07-0.74-0.74a1 1 0 1 1 1.42-1.42l0.74 0.74a1 1 0 0 1-1.42 1.42Zm-14.14 0a1 1 0 0 1-1.42-1.42l0.74-0.74a1 1 0 0 1 1.42 1.42l-0.74 0.74Zm14.14-14.14a1 1 0 0 1-1.42 1.42l-0.74-0.74a1 1 0 0 1 1.42-1.42l0.74 0.74Zm-14.14 0-0.74 0.74A1 1 0 1 1 3.57 4.2l0.74-0.74a1 1 0 0 1 1.42 1.42Z"
        />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="h-5 w-5"
      >
        <path
          d="M21 12.79A9 9 0 0 1 11.21 3a1 1 0 0 0-1.06 1.32 7 7 0 1 0 8.53 8.53A1 1 0 0 0 21 12.79Z"
        />
      </svg>
    </span>
    <span>{{ isDark ? '切换到浅色' : '切换到深色' }}</span>
  </button>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: ''
})

const toggleTheme = useToggle(isDark)
</script>
