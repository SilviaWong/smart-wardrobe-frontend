<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur"
        @click.self="close"
      >
        <Motion
          tag="div"
          :initial="{ opacity: 0, y: 40 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: 40 }"
          class="w-full max-w-xl rounded-3xl bg-white p-8 shadow-2xl dark:bg-surface-dark"
        >
          <h2 class="mb-6 text-2xl font-semibold text-primary">
            {{ isEdit ? '编辑衣物' : '添加衣物' }}
          </h2>
          <form class="grid grid-cols-1 gap-4" @submit.prevent="handleSubmit">
            <label class="flex flex-col gap-2 text-sm font-medium">
              名称
              <input v-model="form.name" type="text" required class="input" placeholder="如：极简衬衫" />
            </label>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label class="flex flex-col gap-2 text-sm font-medium">
                类别
                <select v-model="form.category" required class="input">
                  <option value="">请选择</option>
                  <option value="上衣">上衣</option>
                  <option value="裤子">裤子</option>
                  <option value="鞋子">鞋子</option>
                  <option value="配饰">配饰</option>
                </select>
              </label>
              <label class="flex flex-col gap-2 text-sm font-medium">
                颜色
                <input v-model="form.color" type="text" required class="input" placeholder="如：雾霾蓝" />
              </label>
              <label class="flex flex-col gap-2 text-sm font-medium">
                季节
                <input v-model="form.season" type="text" required class="input" placeholder="如：春秋" />
              </label>
              <label class="flex flex-col gap-2 text-sm font-medium">
                标签
                <input v-model="form.tags" type="text" class="input" placeholder="如：通勤/休闲" />
              </label>
            </div>
            <label class="flex flex-col gap-2 text-sm font-medium">
              图片 URL
              <input v-model="form.imageUrl" type="url" class="input" placeholder="https://..." />
            </label>
            <div class="mt-6 flex items-center justify-end gap-3">
              <button type="button" class="btn-secondary" @click="close">取消</button>
              <button type="submit" class="btn-primary">{{ isEdit ? '保存更改' : '立即添加' }}</button>
            </div>
          </form>
        </Motion>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import { Motion } from '@motionone/vue'
import type { Clothing } from '../types'

const props = defineProps<{
  modelValue: boolean
  initial?: Clothing | null
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', payload: Omit<Clothing, 'id' | 'createTime'>, id?: number): void
}>()

const open = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

const form = reactive<Omit<Clothing, 'id' | 'createTime'>>({
  name: '',
  category: '',
  color: '',
  season: '',
  tags: '',
  imageUrl: ''
})

const isEdit = computed(() => Boolean(props.initial))

watch(
  () => props.initial,
  (value) => {
    if (value) {
      form.name = value.name
      form.category = value.category
      form.color = value.color
      form.season = value.season
      form.tags = value.tags ?? ''
      form.imageUrl = value.imageUrl ?? ''
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

function handleSubmit() {
  emit('submit', { ...form }, props.initial?.id)
  close()
}

function close() {
  emit('update:modelValue', false)
  if (!props.initial) resetForm()
}

function resetForm() {
  form.name = ''
  form.category = ''
  form.color = ''
  form.season = ''
  form.tags = ''
  form.imageUrl = ''
}
</script>

<style scoped>
.input {
  @apply w-full rounded-xl border border-transparent bg-gray-100/80 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/40 dark:bg-white/10 dark:text-gray-100;
}

.btn-secondary {
  @apply rounded-xl border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-primary/40 hover:bg-white dark:bg-white/10 dark:text-gray-200;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
