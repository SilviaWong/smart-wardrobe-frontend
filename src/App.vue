<template>
  <div
    class="min-h-screen bg-gradient-to-br from-white via-surface to-surface dark:from-surface-dark dark:via-surface-dark dark:to-black/70 text-foreground dark:text-foreground-light transition-colors"
  >
    <div class="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-10">
      <header class="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div class="space-y-1">
          <h1 class="text-3xl font-semibold text-primary drop-shadow-sm md:text-4xl">
            智能电子衣橱
          </h1>
          <p class="text-muted-foreground max-w-2xl text-base text-gray-500 dark:text-gray-400">
            使用现代化的可视化面板，随时掌控你的衣橱。支持增删改查、统计分析和主题切换，让穿搭变得更聪明。
          </p>
        </div>
        <ThemeToggle />
      </header>

      <nav
        class="mb-10 flex flex-wrap items-center gap-2 rounded-2xl bg-white/70 p-2 shadow-md backdrop-blur dark:bg-white/10 dark:shadow-none"
      >
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          class="group flex-1 min-w-[120px] rounded-xl px-4 py-2 text-center font-medium transition-all"
          :class="[
            route.path === item.to
              ? 'bg-primary text-white shadow-soft'
              : 'text-gray-600 dark:text-gray-300 hover:bg-primary/10 hover:text-primary'
          ]"
        >
          {{ item.name }}
        </RouterLink>
      </nav>

      <main class="flex-1">
        <RouterView />
      </main>

      <footer class="mt-16 border-t border-white/20 pt-6 text-center text-xs text-gray-500 dark:text-gray-400">
        © {{ new Date().getFullYear() }} Smart Wardrobe. All rights reserved.
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink, RouterView } from 'vue-router'
import ThemeToggle from './components/ThemeToggle.vue'

const route = useRoute()

const navItems = computed(() => [
  { name: '衣橱总览', to: '/' },
  { name: '统计分析', to: '/statistics' },
  { name: '系统设置', to: '/settings' }
])
</script>

<style scoped>
.text-muted-foreground {
  color: rgba(107, 114, 128, 0.9);
}
</style>
