<template>
  <form
      ref="calculatorForm"
      class="flex flex-col gap-6 p-8 bg-white"
      @submit.prevent="submitForm"
  >
    <div class="flex flex-col gap-2">
      <Label for="start_date">
        Start Date
      </Label>

      <InputDate
          v-model="formData.startDate"
          id="start_date"
          required
      />
    </div>

    <div class="flex flex-col gap-2">
      <Label for="end_date">
        End Date
      </Label>

      <InputDate
          v-model="formData.endDate"
          id="end_date"
          required
      />
    </div>

    <div class="flex flex-col gap-2">
      <Label for="loan_currency">
        Loan Currency
      </Label>

      <InputSelect
          v-model="formData.loanCurrency"
          id="loan_currency"
          required
          :options="currencyOptions"
      />
    </div>

    <div class="flex flex-col gap-2">
      <Label for="loan_amount">
        Loan Amount
      </Label>

      <InputNumber
          v-model="formData.loanAmount"
          id="loan_amount"
          required
          min="1"
      />
    </div>

    <div class="flex flex-col gap-2">
      <Label for="base_interest_rate">
        Base Interest Rate
      </Label>

      <InputNumber
          v-model="formData.baseInterestRate"
          id="base_interest_rate"
          required
          min="0"
          step="0.01"
      />
    </div>

    <div class="flex flex-col gap-2">
      <Label for="margin">
        Margin
      </Label>

      <InputNumber
          v-model="formData.margin"
          id="margin"
          required
          min="0"
          step="0.01"
      />
    </div>

    <Button
        :disabled="!isDirty"
        type="submit"
    >
      Save
    </Button>
  </form>
</template>

<script setup>
import {computed, ref} from "vue";
import Label from "@Components/Label.vue";
import InputDate from "@Components/InputDate.vue";
import InputNumber from "@Components/InputNumber.vue";
import InputSelect from "@Components/InputSelect.vue";
import Button from "@Components/Button.vue";
import {deepEqual} from "@Utils/deepCompare.js";
import {addHistory} from "@Composables/useCalculator.js";

defineProps({
  uuid: {
    type: String,
    required: true
  }
})

const calculatorForm = ref(null);
const currencyOptions = [
  {
    text: 'GPB £',
    value: 'gbp'
  },
  {
    text: 'Euro €',
    value: 'eur'
  },
  {
    text: 'USD $',
    value: 'usd'
  }
]

const initialFormData = ref({
  startDate: "",
  endDate: "",
  loanCurrency: "",
  loanAmount: 0,
  baseInterestRate: 0,
  margin: 0,
});

const formData = ref({ ...initialFormData.value });

const isDirty = computed(() => !deepEqual(formData.value, initialFormData.value))

const submitForm = () => {
  const formEl = calculatorForm?.value;
  if (!formEl) return

  if (formEl.checkValidity()) {
    // Create a deep copy of formData.value
    initialFormData.value = formData.value;

    // TODO: submit form and update query
    // Push to history
    addHistory(uuid, formData.value)
  } else {
    formEl.reportValidity();
  }
};

</script>
