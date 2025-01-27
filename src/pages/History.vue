<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">History</h1>
    <div
        v-if="calculatorHistory?.length"
        class="w-full min-w-full overflow-x-scroll"
    >
      <table class="w-full table-auto border-collapse border border-zinc-300 rounded-lg">
        <thead>
        <tr :class="headerRowClasses">
          <th v-for="header in headers" :key="header" :class="cellClasses">
            {{ header }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in calculatorHistory"
            :key="item.id"
            :class="rowClasses"
        >
          <td :class="cellClasses">{{ item.id }}</td>
          <td :class="cellClasses">{{ item.formData.startDate }}</td>
          <td :class="cellClasses">{{ item.formData.endDate }}</td>
          <td :class="cellClasses">{{ item.formData.loanCurrency }}</td>
          <td :class="cellClasses">{{ item.formData.loanAmount }}</td>
          <td :class="cellClasses">{{ item.formData.baseInterestRate }}</td>
          <td :class="cellClasses">{{ item.formData.margin }}</td>
          <td :class="cellClasses">
            <Button
                button-type="text"
                size="small"
                :href="`/calculator/${item.id}`"
            >
              View
            </Button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <p
        v-else
        class="flex flex-col items-start gap-4"
    >
      No history available. Head to the Calculator page to get started.
      <Button
          button-type="primary"
          href="/calculator"
      >
        Get Started
      </Button>
    </p>
  </div>
</template>

<script setup>
import Button from "@Components/Button.vue";
import { calculatorHistory } from "@Composables/useCalculator.js";

const headers = [
  "ID",
  "Start Date",
  "End Date",
  "Loan Currency",
  "Loan Amount",
  "Base Interest Rate",
  "Margin",
  "Actions",
];

const cellClasses = "border border-zinc-300 px-4 py-2";
const headerRowClasses = "bg-gray-200 text-left";
const rowClasses = "hover:bg-gray-200 even:bg-gray-100 odd:bg-white";
</script>
