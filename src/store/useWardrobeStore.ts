import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Clothing } from '../types'
import { wardrobeApi } from '../api/wardrobe'

export const useWardrobeStore = defineStore('wardrobe', () => {
  const items = ref<Clothing[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const totalCount = computed(() => items.value.length)

  const categoryStats = computed(() => {
    const categories = ['上衣', '裤子', '鞋子', '配饰']
    const result = categories.map((name) => ({ name, count: 0 }))
    for (const item of items.value) {
      const target = result.find((cat) => cat.name === item.category)
      if (target) target.count += 1
      else result.push({ name: item.category, count: 1 })
    }
    return result
  })

  const colorStats = computed(() => {
    const map = new Map<string, number>()
    for (const item of items.value) {
      map.set(item.color, (map.get(item.color) ?? 0) + 1)
    }
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }))
  })

  const favoriteColors = computed(() =>
    colorStats.value
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
      .map((entry) => entry.name)
  )

  async function fetchItems() {
    isLoading.value = true
    error.value = null
    try {
      const response = await wardrobeApi.fetchClothing()
      items.value = response
    } catch (err) {
      console.error(err)
      error.value = '无法加载衣橱数据，已使用本地示例数据。'
      items.value = getMockItems()
    } finally {
      isLoading.value = false
    }
  }

  async function addItem(payload: Omit<Clothing, 'id' | 'createTime'>) {
    try {
      const item = await wardrobeApi.createClothing(payload)
      items.value.unshift(item)
    } catch (err) {
      console.error(err)
      const localItem: Clothing = {
        ...payload,
        id: Date.now(),
        createTime: new Date().toISOString()
      }
      items.value.unshift(localItem)
    }
  }

  async function updateItem(id: number, payload: Partial<Clothing>) {
    try {
      const updated = await wardrobeApi.updateClothing(id, payload)
      const index = items.value.findIndex((item) => item.id === id)
      if (index !== -1) items.value[index] = updated
    } catch (err) {
      console.error(err)
      const index = items.value.findIndex((item) => item.id === id)
      if (index !== -1) items.value[index] = { ...items.value[index], ...payload }
    }
  }

  async function deleteItem(id: number) {
    try {
      await wardrobeApi.deleteClothing(id)
    } catch (err) {
      console.error(err)
    } finally {
      items.value = items.value.filter((item) => item.id !== id)
    }
  }

  return {
    items,
    totalCount,
    categoryStats,
    colorStats,
    favoriteColors,
    isLoading,
    error,
    fetchItems,
    addItem,
    updateItem,
    deleteItem
  }
})

function getMockItems(): Clothing[] {
  return [
    {
      id: 1,
      name: '云感羽绒服',
      category: '上衣',
      color: '白色',
      season: '冬季',
      tags: '保暖/通勤',
      imageUrl:
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
      createTime: '2024-11-30T10:00:00.000Z'
    },
    {
      id: 2,
      name: '黑色高腰牛仔裤',
      category: '裤子',
      color: '黑色',
      season: '四季',
      tags: '百搭',
      imageUrl:
        'https://images.unsplash.com/photo-1525171254930-643fc658b64b?auto=format&fit=crop&w=400&q=80',
      createTime: '2024-10-18T09:30:00.000Z'
    },
    {
      id: 3,
      name: '复古运动鞋',
      category: '鞋子',
      color: '米白色',
      season: '春秋',
      tags: '运动/休闲',
      imageUrl:
        'https://images.unsplash.com/photo-1511557344763-7194dc3c7071?auto=format&fit=crop&w=400&q=80',
      createTime: '2024-09-05T14:45:00.000Z'
    },
    {
      id: 4,
      name: '雾霾蓝针织衫',
      category: '上衣',
      color: '蓝色',
      season: '秋季',
      tags: '柔软/日常',
      imageUrl:
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
      createTime: '2024-08-20T08:10:00.000Z'
    }
  ]
}
