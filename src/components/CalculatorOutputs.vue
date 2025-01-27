<template>
  <div class="flex flex-col items-center gap-8 p-8 bg-slate-100">
    <Chart
        :interest="chartNumbers?.interest"
        :principle="chartNumbers?.principle"
        class="pb-4 w-full"
    />

    <div
        class="flex flex-wrap justify-center w-full"
    >
      <p
          v-for="(item, index) in summaryData"
          :key="`summary_${index}`"
          class="flex flex-col gap-1 basis-[50%] p-8 text-center max-w-3xs"
      >
        <span class="text-xl font-bold">
          {{ item.text }}
        </span>
        {{ item.value }}
      </p>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import Chart from "@Components/Chart.vue";
import { calculatorHistory } from "@Composables/useCalculator.js";

const props = defineProps({
  uuid: {
    type: String,
    required: true
  }
})

const calculatedData = computed(() => {
  const { uuid } = props
  return calculatorHistory.value.find(item => item.id === uuid)
})

const summaryData = computed(() => {
  return {
    dailyInterestNoMargin: {
      text: 'Daily Interest (no margin)',
      value: calculatedData.value?.dailyInterestNoMargin || '-'
    },
    dailyInterest: {
      text: 'Daily Interest (accrued)',
      value: calculatedData.value?.dailyInterest || '-'
    },
    accrualDate: {
      text: 'Accrual Date)',
      value: calculatedData.value?.accrualDate || '-'
    },
    daysElapsed: {
      text: 'Accrual Date',
      value: calculatedData.value?.daysSinceStart || '-'
    },
    totalInterest: {
      text: 'Total Interest',
      value: calculatedData.value?.totalInterest || '-'
    }
  }
})

const chartNumbers = computed(() => {
  return {
    principle: Number(calculatedData.value?.formData?.loanAmount ?? 0),
    interest: Number(calculatedData.value?.totalInterest ?? 0),
  }
})
</script>
