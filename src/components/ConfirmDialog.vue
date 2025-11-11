<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur"
        @click.self="close"
      >
        <Motion
          tag="div"
          :initial="{ opacity: 0, scale: 0.9 }"
          :animate="{ opacity: 1, scale: 1 }"
          :exit="{ opacity: 0, scale: 0.9 }"
          class="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl dark:bg-surface-dark"
        >
          <div class="mb-4 flex items-center justify-center">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500 dark:bg-red-500/10">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-8 w-8">
                <path
                  fill-rule="evenodd"
                  d="M12 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5Zm-.75 5.25a.75.75 0 0 1 1.5 0v5.25a.75.75 0 0 1-1.5 0V7.5Zm.75 9a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-white">确认删除？</h3>
          <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
            此操作将永久移除该衣物，且无法撤销。是否继续？
          </p>
          <div class="flex justify-center gap-3">
            <button class="btn-secondary" @click="close">取消</button>
            <button class="btn-primary bg-red-500 hover:bg-red-600" @click="confirm">确认删除</button>
          </div>
        </Motion>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Motion } from '@motionone/vue'

const props = defineProps<{ modelValue: boolean }>()

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void; (e: 'confirm'): void }>()

const open = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

function close() {
  open.value = false
}

function confirm() {
  emit('confirm')
  close()
}
</script>
