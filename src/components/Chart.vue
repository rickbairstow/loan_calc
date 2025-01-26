<template>
  <div class="flex flex-col gap-4 items-center">
    <div class="relative w-52 h-52 rounded-full bg-gray-100">
      <div
          class="absolute inset-0 rounded-full rotate-90"
          :style="style"
      ></div>
      <div class="absolute inset-8 bg-white rounded-full"></div>
      <p class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="font-bold">Total</span>
        <span>£123,456</span>
      </p>
    </div>

    <div class="flex gap-8">
      <div class="flex items-center justify-center gap-2">
        <div class="rounded-full w-4 h-4 bg-blue-400"/>
        <span>Principle Amount</span>
      </div>
      <div class="rounded-full flex items-center justify-center gap-2">
        <div class="rounded-full w-4 h-4 bg-green-100"/>
        <span>Interest Amount</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  interest: {
    required: true,
    type: Number,
  },
  principle: {
    required: true,
    type: Number,
  },
})

const style = computed(() => {
  const { principle } = props

  return {
    background: `conic-gradient(#51a2ff 0% ${principle}%, #dcfce7 ${principle}% 100%)`
  }
})
</script>