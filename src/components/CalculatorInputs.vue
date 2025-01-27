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
          v-model="formValues.startDate"
          id="start_date"
          required
      />
    </div>

    <div class="flex flex-col gap-2">
      <Label for="end_date">
        End Date
      </Label>

      <InputDate
          v-model="formValues.endDate"
          id="end_date"
          placeholder="dd / mm / yyyy"
          required
      />
    </div>

    <div class="flex flex-col gap-2">
      <Label for="loan_currency">
        Loan Currency
      </Label>

      <InputSelect
          v-model="formValues.loanCurrency"
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
          v-model="formValues.loanAmount"
          id="loan_amount"
          placeholder="123,456"
          required
          min="1"
      />
    </div>

    <div class="flex flex-col gap-2">
      <Label for="base_interest_rate">
        Base Interest Rate %
      </Label>

      <InputNumber
          v-model="formValues.baseInterestRate"
          id="base_interest_rate"
          placeholder="0.7"
          required
          min="0"
          step="0.01"
      />
    </div>

    <div class="flex flex-col gap-2">
      <Label for="margin">
        Margin %
      </Label>

      <InputNumber
          v-model="formValues.margin"
          id="margin"
          min="0"
          placeholder="0.7"
          required
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
import {computed, onMounted, ref, watch} from "vue";
import Label from "@Components/Label.vue";
import InputDate from "@Components/InputDate.vue";
import InputNumber from "@Components/InputNumber.vue";
import InputSelect from "@Components/InputSelect.vue";
import Button from "@Components/Button.vue";
import {deepEqual} from "@Utils/deepCompare.js";
import {addCalculation, setTempCalculation } from "@Composables/useCalculator.js";

const props = defineProps({
  formData: {
    type: Object,
    default: () => {},
  },

  uuid: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update'])

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
  startDate: props.formData?.startDate || null,
  endDate: props.formData?.endDate || null,
  loanCurrency: props.formData?.loanCurrency || null,
  loanAmount: props.formData?.loanAmount || null,
  baseInterestRate: props.formData?.baseInterestRate || null,
  margin: props.formData?.margin || null,
});

onMounted(() => {
  const { formData } = props
  if (formData) {
    initialFormData.value = formData
  }
})

const formValues = ref({ ...initialFormData.value });

const isDirty = computed(() => !deepEqual(formValues.value, initialFormData.value))

const submitForm = () => {
  const formEl = calculatorForm?.value;
  if (!formEl) return

  const { uuid } = props

  if (formEl.checkValidity()) {
    initialFormData.value = formValues.value;
    addCalculation(uuid, formValues.value)
  } else {
    formEl.reportValidity();
  }
};

watch(
    () => formValues.value,
    (newValues) => {
      if (!newValues) return

      const { uuid } = props
      setTempCalculation({
        id: uuid,
        formData: newValues
      })
    },
    {
      deep: true,
      immediate: true
    }
)
</script>
