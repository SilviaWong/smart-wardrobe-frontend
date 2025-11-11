<template>
  <section class="card space-y-8 rounded-3xl bg-white/90 p-8 shadow-md dark:bg-surface-dark/80">
    <header class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">衣橱统计图</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">通过视觉化数据快速洞察衣橱结构与偏好。</p>
      </div>
      <div class="flex gap-2 rounded-full bg-gray-100/70 p-1 text-sm dark:bg-white/10">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="rounded-full px-4 py-1 transition"
          :class="activeTab === tab.value ? 'bg-primary text-white shadow-soft' : 'text-gray-500 hover:bg-white/80 dark:text-gray-300'"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>
    </header>

    <div class="grid gap-8 md:grid-cols-[320px_1fr] md:items-center">
      <div class="flex items-center justify-center">
        <component :is="chartComponent" :chart-data="chartData" :options="chartOptions" class="max-h-72 w-full" />
      </div>
      <ul class="space-y-4">
        <li
          v-for="(item, idx) in sortedStats"
          :key="item.name"
          class="flex items-center justify-between rounded-2xl bg-gray-100/60 p-4 text-sm text-gray-600 transition hover:bg-gray-100 dark:bg-white/10 dark:text-gray-300"
        >
          <div class="flex items-center gap-3">
            <span
              class="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-base font-semibold text-white"
              :style="{ backgroundColor: palette[idx % palette.length] }"
            >
              {{ item.name.slice(0, 2) }}
            </span>
            <div>
              <div class="text-base font-medium text-gray-700 dark:text-gray-100">{{ item.name }}</div>
              <div class="text-xs text-gray-400">{{ ((item.count / total) * 100).toFixed(1) }}%</div>
            </div>
          </div>
          <span class="text-base font-semibold text-primary">{{ item.count }} 件</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { Doughnut, Bar } from 'vue-chartjs'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

interface StatItem {
  name: string
  count: number
}

const props = defineProps<{
  categories: StatItem[]
  colors: StatItem[]
}>()

const tabs = [
  { label: '类别占比', value: 'category' },
  { label: '颜色偏好', value: 'color' }
] as const

type TabValue = (typeof tabs)[number]['value']

const activeTab = shallowRef<TabValue>('category')

const palette = ['#6C63FF', '#8F87FF', '#C0BBFF', '#FFA9D6', '#7AD3FF', '#98F5E1', '#FFC971']

const dataset = computed(() => (activeTab.value === 'category' ? props.categories : props.colors))

const sortedStats = computed(() => [...dataset.value].sort((a, b) => b.count - a.count))

const total = computed(() => sortedStats.value.reduce((sum, item) => sum + item.count, 0) || 1)

const chartComponent = computed(() => (activeTab.value === 'category' ? Doughnut : Bar))

const chartData = computed(() => ({
  labels: dataset.value.map((item) => item.name),
  datasets: [
    {
      label: activeTab.value === 'category' ? '类别占比' : '颜色占比',
      data: dataset.value.map((item) => item.count),
      backgroundColor: dataset.value.map((_, idx) => palette[idx % palette.length]),
      borderRadius: activeTab.value === 'category' ? 0 : 12,
      barThickness: activeTab.value === 'category' ? undefined : 32
    }
  ]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        color: '#4B5563',
        font: { family: 'Inter, sans-serif' }
      }
    }
  },
  scales:
    activeTab.value === 'category'
      ? undefined
      : {
          x: {
            ticks: { color: '#94A3B8' },
            grid: { display: false }
          },
          y: {
            ticks: { color: '#94A3B8', stepSize: 1 },
            grid: { color: 'rgba(148, 163, 184, 0.2)' }
          }
        }
}))
</script>
