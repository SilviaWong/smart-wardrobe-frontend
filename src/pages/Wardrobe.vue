<template>
  <section class="space-y-12">
    <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">衣橱总览</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">管理衣物、查看统计与趋势，一目了然。</p>
      </div>
      <button class="btn-primary flex items-center gap-2" @click="openCreate">
        <span class="text-lg">＋</span>
        <span>添加衣物</span>
      </button>
    </div>

    <div class="grid gap-6 md:grid-cols-3">
      <StatCard
        v-for="(card, index) in statCards"
        :key="card.label"
        :label="card.label"
        :value="card.value"
        :description="card.description"
        :index="index"
      >
        <template #icon>
          <span class="text-3xl">{{ card.icon }}</span>
        </template>
      </StatCard>
    </div>

    <ChartSection :categories="store.categoryStats" :colors="store.colorStats" />

    <div class="space-y-4">
      <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>共 {{ store.totalCount }} 件衣物</span>
        <span v-if="store.favoriteColors.length">偏爱颜色：{{ store.favoriteColors.join(' / ') }}</span>
      </div>

      <div v-if="store.isLoading" class="grid place-items-center rounded-3xl bg-white/70 py-20 text-gray-500 dark:bg-white/10">
        正在加载衣橱数据…
      </div>
      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ClothingCard
          v-for="item in store.items"
          :key="item.id"
          :item="item"
          @edit="openEdit"
          @delete="confirmDelete"
        />
      </div>
      <div v-if="!store.items.length && !store.isLoading" class="rounded-3xl bg-white/70 p-10 text-center text-gray-500 dark:bg-white/10">
        还没有任何衣物，点击上方按钮添加吧！
      </div>
    </div>

    <AddEditModal v-model="modalOpen" :initial="selectedItem" @submit="handleSubmit" />
    <ConfirmDialog v-model="confirmOpen" @confirm="handleConfirmDelete" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useWardrobeStore } from '../store/useWardrobeStore'
import StatCard from '../components/StatCard.vue'
import ClothingCard from '../components/ClothingCard.vue'
import AddEditModal from '../components/AddEditModal.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import ChartSection from '../components/ChartSection.vue'
import type { Clothing } from '../types'

const store = useWardrobeStore()

const modalOpen = ref(false)
const confirmOpen = ref(false)
const selectedItem = ref<Clothing | null>(null)
const pendingDelete = ref<Clothing | null>(null)

onMounted(() => {
  if (!store.items.length) {
    void store.fetchItems()
  }
})

const statCards = computed(() => [
  {
    label: '总衣物数量',
    value: `${store.totalCount} 件`,
    description: '涵盖衣橱中所有录入的单品',
    icon: '👕'
  },
  {
    label: '类别分布',
    value: `${store.categoryStats.filter((item) => item.count > 0).length} 类`,
    description: '上衣 / 裤子 / 鞋子 / 配饰',
    icon: '🎨'
  },
  {
    label: '偏好颜色',
    value: store.favoriteColors.join(' · ') || '待发现',
    description: '基于最近衣物统计',
    icon: '🌈'
  }
])

function openCreate() {
  selectedItem.value = null
  modalOpen.value = true
}

function openEdit(item: Clothing) {
  selectedItem.value = item
  modalOpen.value = true
}

function handleSubmit(payload: Omit<Clothing, 'id' | 'createTime'>, id?: number) {
  if (id) {
    void store.updateItem(id, payload)
  } else {
    void store.addItem(payload)
  }
}

function confirmDelete(item: Clothing) {
  pendingDelete.value = item
  confirmOpen.value = true
}

function handleConfirmDelete() {
  if (pendingDelete.value) {
    void store.deleteItem(pendingDelete.value.id)
    pendingDelete.value = null
  }
}
</script>
