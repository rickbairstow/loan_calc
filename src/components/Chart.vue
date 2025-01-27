<template>
  <div class="flex flex-col gap-4 items-center">
    <div class="relative w-52 h-52 rounded-full bg-gray-100">
      <div
          class="absolute inset-0 rounded-full rotate-90 ring-1 ring-slate-500"
          :style="style"
      />
      <div class="absolute inset-8 bg-white rounded-full ring-1 ring-slate-500"/>
      <p class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="font-bold">Total</span>
        <span>{{ formattedCurrency }}</span>
      </p>
    </div>

    <div class="flex gap-8">
      <div class="flex items-center justify-center gap-2">
        <div class="rounded-full w-4 h-4 bg-blue-400 ring-1 ring-slate-500"/>
        <span>Principle Amount</span>
      </div>
      <div class="rounded-full flex items-center justify-center gap-2">
        <div class="rounded-full w-4 h-4 bg-green-100 ring-1 ring-slate-500"/>
        <span>Interest Amount</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {formatCurrency} from "@Utils/formatCurrency.js";

const props = defineProps({
  currency: {
    default: 'gbp',
    type: String,
  },

  interest: {
    default: 0,
    type: Number,
  },

  principle: {
    default: 0,
    type: Number,
  },
})

const style = computed(() => {
  const { principle, interest } = props
  const total = principle + interest;

  if (total === 0) {
    return {
      background: `conic-gradient(#e2e8f0 0% 100%)`, // Gray color fallback
    };
  }

  const principlePercent = (props.principle / total) * 100;

  return {
    background: `conic-gradient(#51a2ff 0% ${principlePercent}%, #dcfce7 ${principlePercent}% 100%)`,
  };
});

const formattedCurrency = computed(() => {
  const { principle, interest, currency } = props
  const total = (principle || 0) + (interest || 0)
  return formatCurrency(total, currency || 'gbp')
})
</script>