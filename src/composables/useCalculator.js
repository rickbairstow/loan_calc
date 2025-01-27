import { ref } from 'vue'

const calculatorHistory = ref([
    {
        id: 'testing',
        formData: {
            startDate: "2025-01-01",
            endDate: "2025-01-01",
            loanCurrency: "gbp",
            loanAmount: 123456,
            baseInterestRate: 0,
            margin: 0,
        }
    }
])

const addHistory = (id, formData) => {
    if (!id || !formData) return

    const existingItem = calculatorHistory.value.findIndex(item => item?.id === id)

    if (existingItem !== -1) {
        calculatorHistory.value[existingItem] = formData
    } else {
        const data = {
            id,
            formData
        }
        calculatorHistory.value.push(data)
    }

    console.log('History is', { calculatorHistory: calculatorHistory.value })
}

const getHistory = (id) => {
    if (!id) return null

}

export { calculatorHistory, addHistory }