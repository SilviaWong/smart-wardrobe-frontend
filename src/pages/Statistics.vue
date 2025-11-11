<template>
  <section class="space-y-10">
    <header class="space-y-3">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">数据洞察</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        观察衣橱数据的趋势变化，辅助搭配与采购决策。
      </p>
    </header>

    <div class="grid gap-8 lg:grid-cols-2">
      <ChartSection :categories="store.categoryStats" :colors="store.colorStats" />
      <div class="card space-y-6 rounded-3xl bg-white/90 p-8 shadow-md dark:bg-surface-dark/80">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">智能建议</h3>
        <ul class="space-y-4 text-sm text-gray-600 dark:text-gray-300">
          <li class="rounded-2xl bg-gray-100/60 p-4 dark:bg-white/5">
            <strong class="text-primary">类别均衡：</strong> {{ balanceAdvice }}
          </li>
          <li class="rounded-2xl bg-gray-100/60 p-4 dark:bg-white/5">
            <strong class="text-primary">颜色偏好：</strong> {{ colorAdvice }}
          </li>
          <li class="rounded-2xl bg-gray-100/60 p-4 dark:bg-white/5">
            <strong class="text-primary">季节覆盖：</strong> 建议按季节整理衣物，确保四季搭配齐全。
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ChartSection from '../components/ChartSection.vue'
import { useWardrobeStore } from '../store/useWardrobeStore'

const store = useWardrobeStore()

const balanceAdvice = computed(() => {
  const sorted = [...store.categoryStats].sort((a, b) => b.count - a.count)
  if (!sorted.length) return '暂无数据，请先添加衣物。'
  const top = sorted[0]
  const bottom = sorted.at(-1)
  if (bottom && top.count - bottom.count > 5) {
    return `当前 ${top.name} 较多，适当补充 ${bottom.name} 类单品以实现更均衡的搭配。`
  }
  return '各类别相对均衡，保持当前搭配策略即可。'
})

const colorAdvice = computed(() => {
  if (!store.favoriteColors.length) return '暂无明显偏好，多尝试不同色系。'
  return `近期常用色为 ${store.favoriteColors.join('、')}，可尝试加入互补色提升层次感。`
})
</script>
