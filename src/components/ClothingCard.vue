<template>
  <Motion
    tag="article"
    :initial="{ opacity: 0, scale: 0.95 }"
    :animate="{ opacity: 1, scale: 1 }"
    :exit="{ opacity: 0, scale: 0.9 }"
    class="card group flex flex-col overflow-hidden bg-white/90 shadow-md transition-all hover:-translate-y-1 hover:shadow-soft dark:bg-surface-dark/80"
    :transition="{ duration: 0.4 }"
  >
    <div class="relative h-52 overflow-hidden">
      <img
        :src="item.imageUrl || fallbackImage"
        :alt="item.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div class="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-primary shadow">
        {{ item.category }}
      </div>
    </div>

    <div class="flex flex-1 flex-col gap-4 p-5">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ item.name }}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.season }} · {{ item.color }}</p>
      </div>
      <p v-if="item.tags" class="text-sm text-gray-500 dark:text-gray-400">#{{ item.tags }}</p>
      <div class="mt-auto flex items-center justify-between text-xs text-gray-400">
        <span>创建于 {{ formatDate(item.createTime) }}</span>
        <div class="flex gap-2">
          <button
            class="rounded-xl bg-primary/10 px-3 py-1 text-primary transition hover:bg-primary hover:text-white"
            @click="$emit('edit', item)"
          >
            编辑
          </button>
          <button
            class="rounded-xl bg-red-50 px-3 py-1 text-red-500 transition hover:bg-red-500 hover:text-white dark:bg-red-500/10"
            @click="$emit('delete', item)"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  </Motion>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Motion } from '@motionone/vue'
import type { Clothing } from '../types'

const props = defineProps<{ item: Clothing }>()

defineEmits<{
  (e: 'edit', item: Clothing): void
  (e: 'delete', item: Clothing): void
}>()

const fallbackImage = computed(
  () =>
    `https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80&sig=${props.item.id}`
)

function formatDate(value: string) {
  return new Date(value).toLocaleDateString()
}
</script>
