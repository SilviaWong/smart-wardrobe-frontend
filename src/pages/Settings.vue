<template>
  <section class="space-y-10">
    <header class="space-y-3">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">系统设置</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400">配置接口地址、个性化偏好与体验选项。</p>
    </header>

    <div class="grid gap-6 lg:grid-cols-2">
      <div class="card space-y-6 rounded-3xl bg-white/90 p-8 shadow-md dark:bg-surface-dark/80">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">接口配置</h3>
        <div class="space-y-4 text-sm text-gray-600 dark:text-gray-300">
          <div>
            <label class="mb-2 block font-medium text-gray-500 dark:text-gray-400">后端 API 地址</label>
            <input
              v-model="apiUrl"
              type="url"
              placeholder="http://localhost:8080/api"
              class="w-full rounded-xl border border-transparent bg-gray-100/80 px-4 py-3 text-sm text-gray-700 transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/30 dark:bg-white/10 dark:text-gray-100"
            />
            <p class="mt-2 text-xs text-gray-400">将保存在浏览器本地，刷新后生效。</p>
          </div>
          <button class="btn-primary" @click="saveApiUrl">保存设置</button>
        </div>
      </div>

      <div class="card space-y-6 rounded-3xl bg-white/90 p-8 shadow-md dark:bg-surface-dark/80">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">体验偏好</h3>
        <ul class="space-y-4 text-sm text-gray-600 dark:text-gray-300">
          <li class="flex items-center justify-between rounded-2xl bg-gray-100/60 p-4 dark:bg-white/5">
            <div>
              <div class="font-medium text-gray-800 dark:text-gray-100">动画动效</div>
              <p class="text-xs text-gray-500 dark:text-gray-400">保持卡片与弹窗的轻盈动效体验。</p>
            </div>
            <label class="inline-flex items-center gap-2">
              <input v-model="motionEnabled" type="checkbox" class="h-5 w-5 rounded border-gray-300" />
              <span>{{ motionEnabled ? '已启用' : '已关闭' }}</span>
            </label>
          </li>
          <li class="flex items-center justify-between rounded-2xl bg-gray-100/60 p-4 dark:bg-white/5">
            <div>
              <div class="font-medium text-gray-800 dark:text-gray-100">通知提醒</div>
              <p class="text-xs text-gray-500 dark:text-gray-400">新增或删除衣物时显示成功提示。</p>
            </div>
            <label class="inline-flex items-center gap-2">
              <input v-model="notificationEnabled" type="checkbox" class="h-5 w-5 rounded border-gray-300" />
              <span>{{ notificationEnabled ? '已启用' : '已关闭' }}</span>
            </label>
          </li>
        </ul>
        <p class="text-xs text-gray-400">
          设置项仅保存在本地，未来可与后端账号体系对接，实现跨设备同步。
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const apiUrl = ref('')
const motionEnabled = ref(true)
const notificationEnabled = ref(true)

onMounted(() => {
  apiUrl.value = localStorage.getItem('wardrobe.api') ?? 'http://localhost:8080/api'
  motionEnabled.value = localStorage.getItem('wardrobe.motion') !== 'false'
  notificationEnabled.value = localStorage.getItem('wardrobe.notice') !== 'false'
})

function saveApiUrl() {
  localStorage.setItem('wardrobe.api', apiUrl.value)
  alert('API 地址已保存，刷新后生效。')
}

watch(motionEnabled, (value) => {
  localStorage.setItem('wardrobe.motion', String(value))
})

watch(notificationEnabled, (value) => {
  localStorage.setItem('wardrobe.notice', String(value))
})
</script>
