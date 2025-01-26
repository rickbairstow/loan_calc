<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <Label for="start_date">
        Start Date
      </Label>
      <InputDate v-model="formData.startDate" id="start_date"/>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="end_date">
        End Date
      </Label>
      <InputDate v-model="formData.endDate" id="end_date"/>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="loan_currency">
        Loan Currency
      </Label>
      <InputSelect v-model="formData.loanCurrency" id="loan_currency" />
    </div>
    <div class="flex flex-col gap-2">
      <Label for="loan_amount">
        Loan Amount
      </Label>
      <InputNumber v-model="formData.loanAmount" id="loan_amount"/>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="base_interest_rate">
        Base Interest Rate
      </Label>
      <InputNumber v-model="formData.baseInterestRate" id="base_interest_rate"/>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="margin">
        Base Interest Rate
      </Label>
      <InputNumber v-model="formData.margin" id="margin"/>
    </div>
  </div>
</template>

<script setup>
import Label from "@Components/Label.vue";
import { ref } from 'vue'
import InputDate from "@Components/InputDate.vue";
import InputNumber from "@Components/InputNumber.vue";
import InputSelect from "@Components/InputSelect.vue";

// todo populate below from route props if they exist!
const formData = ref({
  startDate: '',
  endDate: '',
  loanCurrency: '',
  loanAmount: 0,
  baseInterestRate: 0,
  margin: 0
})
</script>
