<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <Label for="start_date">
        Start Date
      </Label>
      <input v-model="formData.startDate" id="start_date" type="date"/>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="end_date">
        End Date
      </Label>
      <input v-model="formData.endDate" id="end_date" type="date"/>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="loan_currency">
        Loan Currency
      </Label>
      <input v-model="formData.loanCurrency" id="loan_currency" type="number"/>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="loan_amount">
        Loan Amount
      </Label>
      <input v-model="formData.loanAmount" id="loan_amount" type="number"/>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="base_interest_rate">
        Base Interest Rate
      </Label>
      <input v-model="formData.baseInterestRate" id="base_interest_rate" type="number"/>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="margin">
        Base Interest Rate
      </Label>
      <input v-model="formData.margin" id="margin" type="number"/>
    </div>
  </div>
</template>

<script setup>
import Label from "@Components/Label.vue";
import { ref } from 'vue'

// todo populate below from route props if they exist!
const formData = ref({
  startDate: '',
  endDate: '',
  loanCurrency: '',
  loanAmount: '',
  baseInterestRate: '',
  margin: ''
})
</script>
