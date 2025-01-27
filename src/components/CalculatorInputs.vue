<template>
    <form
        ref="calculatorForm"
        class="flex flex-col gap-6 p-8 bg-white"
        @submit.prevent="submitForm"
    >
        <div class="flex flex-col gap-2">
            <Label for="start_date">Start Date</Label>

            <InputDate
                id="start_date"
                v-model="formValues.startDate"
                required
            />
        </div>

        <div class="flex flex-col gap-2">
            <Label for="end_date">End Date</Label>

            <InputDate
                id="end_date"
                v-model="formValues.endDate"
                placeholder="dd / mm / yyyy"
                required
            />
        </div>

        <div class="flex flex-col gap-2">
            <Label for="loan_currency">Loan Currency</Label>

            <InputSelect
                id="loan_currency"
                v-model="formValues.loanCurrency"
                required
                :options="currencyOptions"
            />
        </div>

        <div class="flex flex-col gap-2">
            <Label for="loan_amount">Loan Amount</Label>

            <InputNumber
                id="loan_amount"
                v-model="formValues.loanAmount"
                min="1"
                placeholder="123,456"
                required
            />
        </div>

        <div class="flex flex-col gap-2">
            <Label for="base_interest_rate">Base Interest Rate %</Label>

            <InputNumber
                id="base_interest_rate"
                v-model="formValues.baseInterestRate"
                min="0"
                placeholder="0.7"
                required
                step="0.01"
            />
        </div>

        <div class="flex flex-col gap-2">
            <Label for="margin">Margin %</Label>

            <InputNumber
                id="margin"
                v-model="formValues.margin"
                min="0"
                placeholder="0.7"
                required
                step="0.01"
            />
        </div>

        <Button
            type="submit"
            :aria-label="isSaving ? 'Form is saving' : 'Save form'"
            :disabled="!isDirty"
        >
            <Icon
                v-if="isSaving"
                class="animate-spin [animation-duration:2s]"
                icon="Loader"
            />
            <span v-else>Save</span>
        </Button>
    </form>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { deepEqual } from '@Utils/deepCompare.js'
import {
    addCalculation,
    setTempCalculation
} from '@Composables/useCalculator.js'
import Button from '@Components/Button.vue'
import Icon from '@Components/Icon.vue'
import InputDate from '@Components/InputDate.vue'
import InputNumber from '@Components/InputNumber.vue'
import InputSelect from '@Components/InputSelect.vue'
import Label from '@Components/Label.vue'
import router from '@Router/router.js'

const props = defineProps({
    formData: {
        type: Object,
        default: () => {}
    },

    uuid: {
        type: String,
        required: true
    }
})

const calculatorForm = ref(null)
const isSaving = ref(false)
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
    margin: props.formData?.margin || null
})

onMounted(() => {
    const { formData } = props
    if (formData) {
        initialFormData.value = formData
    }
})

const formValues = ref({ ...initialFormData.value })
const isDirty = computed(
    () => !deepEqual(formValues.value, initialFormData.value)
)

const submitForm = async () => {
    const formEl = calculatorForm?.value
    if (!formEl) return

    try {
        isSaving.value = true

        // Simulate delay so that we can see the loader.
        const delay = (ms) => new Promise((r) => setTimeout(r, ms))
        await delay(500)

        const { uuid } = props

        if (formEl.checkValidity()) {
            initialFormData.value = formValues.value
            await addCalculation(uuid, formValues.value)
        } else {
            formEl.reportValidity()
        }

        await router.push('/history')
    } catch (e) {
        console.error('Error:', e)
    } finally {
        isSaving.value = false
    }
}

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
