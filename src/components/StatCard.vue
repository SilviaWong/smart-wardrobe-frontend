<template>
  <Motion
    tag="div"
    :initial="{ opacity: 0, y: 24 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.6, delay: index * 0.08 }"
    class="card group flex items-center justify-between gap-6 rounded-2xl bg-white/90 p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-soft dark:bg-surface-dark/80"
  >
    <div class="space-y-3">
      <div class="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {{ label }}
      </div>
      <div class="text-3xl font-bold text-primary">{{ value }}</div>
      <p v-if="description" class="text-sm text-gray-500 dark:text-gray-400">{{ description }}</p>
    </div>
    <div
      class="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110"
    >
      <slot name="icon">
        <span class="text-3xl">🎯</span>
      </slot>
    </div>
  </Motion>
</template>

<script setup lang="ts">
import { Motion } from '@motionone/vue'

defineProps<{ label: string; value: string | number; description?: string; index: number }>()
</script>
