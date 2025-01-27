<template>
  <div class="flex flex-col items-center gap-4 p-8 bg-slate-100">
    <Chart
        :currency="temporaryCalculation?.formData?.loanCurrency || 'gbp'"
        :interest="chartNumbers?.interest"
        :principle="chartNumbers?.principle"
        class="pb-8 w-full border-b border-zinc-300"
    />

    <div
        class="flex flex-wrap justify-center w-full"
    >
      <p
          v-for="(item, index) in summaryData"
          :key="`summary_${index}`"
          class="flex flex-col gap-1 basis-[50%] p-4 text-center max-w-3xs"
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
import { temporaryCalculation } from "@Composables/useCalculator.js";
import {formatCurrency} from "@Utils/formatCurrency.js";

const summaryData = computed(() => {
  return {
    dailyInterestNoMargin: {
      text: 'Daily Interest (no margin)',
      value: temporaryCalculation.value?.dailyInterestNoMargin ? formatCurrency(
          temporaryCalculation.value?.dailyInterestNoMargin,
          temporaryCalculation.value?.formData?.loanCurrency || 'gbp'
      ) : '-'
    },
    dailyInterest: {
      text: 'Daily Interest (accrued)',
      value: temporaryCalculation.value?.dailyInterest ? formatCurrency(
          temporaryCalculation.value?.dailyInterest || 0,
          temporaryCalculation.value?.formData?.loanCurrency || 'gbp'
      ) : '-'
    },
    accrualDate: {
      text: 'Accrual Date',
      value: temporaryCalculation.value?.accrualDate || '-'
    },
    daysElapsed: {
      text: 'Days Since Start',
      value: temporaryCalculation.value?.daysSinceStart ? `${temporaryCalculation.value?.daysSinceStart} days` : '-'
    },
    totalInterest: {
      text: 'Total Interest',
      value: temporaryCalculation.value?.totalInterest ? formatCurrency(
          temporaryCalculation.value?.totalInterest,
          temporaryCalculation.value?.formData?.loanCurrency || 'gbp'
      ) : '-'
    }
  }
})

const chartNumbers = computed(() => {
  return {
    principle: Number(temporaryCalculation.value?.formData?.loanAmount ?? 0),
    interest: Number(temporaryCalculation.value?.totalInterest ?? 0),
  }
})
</script>
