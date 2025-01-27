import { ref } from 'vue'

// Stores a temporary calculation for connected use with the form data.
const temporaryCalculation = ref({})

// Handle storage to persist until reload.
const calculatorHistory = ref([])

// Adds to storage
const addCalculation = (id, formData) => {
    if (!id || !formData) return

    try {
        const existingItem = calculatorHistory.value.findIndex(
            (item) => item?.id === id
        )

        const data = {
            id,
            formData
        }

        const calculatedData = calculateData(data)

        if (existingItem !== -1) {
            calculatorHistory.value[existingItem] = calculatedData
        } else {
            calculatorHistory.value.push(calculatedData)
        }
    } catch (e) {
        console.error('Error:', e)
    }
}

// Handles the heavy lifting for all calculations
const calculateData = (data) => {
    try {
        const { formData } = data

        const startDate = formData.startDate
            ? new Date(formData.startDate)
            : null
        const today = formData.useCurrentDate !== false ? new Date() : null

        const daysSinceStart =
            startDate && today && !isNaN(startDate)
                ? Math.max(
                      0,
                      Math.floor((today - startDate) / (1000 * 60 * 60 * 24))
                  )
                : null

        const loanAmount = Number(formData.loanAmount) || null
        const baseInterestRate = Number(formData.baseInterestRate) || null
        const margin = Number(formData.margin) || null

        const dailyInterestNoMargin =
            loanAmount && baseInterestRate !== null
                ? (loanAmount * (baseInterestRate / 100)) / 365
                : null

        const dailyInterest =
            loanAmount && baseInterestRate !== null && margin !== null
                ? (loanAmount * ((baseInterestRate + margin) / 100)) / 365
                : null

        const totalInterest =
            dailyInterest !== null && daysSinceStart !== null
                ? dailyInterest * daysSinceStart
                : null

        const total =
            loanAmount !== null && totalInterest !== null
                ? loanAmount + totalInterest
                : null

        const accrualDate =
            today && loanAmount && baseInterestRate && daysSinceStart
                ? today.toISOString().split('T')[0]
                : null

        return {
            ...data,
            created: today ? today.toISOString().split('T')[0] : null,
            dailyInterestNoMargin:
                dailyInterestNoMargin !== null
                    ? dailyInterestNoMargin.toFixed(2)
                    : null,
            dailyInterest:
                dailyInterest !== null ? dailyInterest.toFixed(2) : null,
            accrualDate,
            daysSinceStart:
                daysSinceStart !== null ? daysSinceStart.toString() : null,
            totalInterest:
                totalInterest !== null ? totalInterest.toFixed(2) : null,
            total: total !== null ? total.toFixed(2) : null
        }
    } catch (error) {
        console.error('Error in calculateData:', error)

        // fallback
        return {
            ...data,
            created: null,
            dailyInterestNoMargin: null,
            dailyInterest: null,
            accrualDate: null,
            daysSinceStart: null,
            totalInterest: null,
            total: null
        }
    }
}

// This takes temporary data and stores it in this composable so that it's available as live data anywhere
const setTempCalculation = (data = {}) => {
    try {
        const populatedData = {
            id: data.id || null,
            formData: {
                startDate: data.formData?.startDate || '',
                endDate: data.formData?.endDate || '',
                loanCurrency: data.formData?.loanCurrency || '',
                loanAmount: Number(data.formData?.loanAmount || 0),
                baseInterestRate: Number(data.formData?.baseInterestRate || 0),
                margin: Number(data.formData?.margin || 0)
            }
        }

        temporaryCalculation.value = calculateData(populatedData)
    } catch (error) {
        console.error('Error in setTempCalculation:', error)

        // fallback
        temporaryCalculation.value = {
            id: null,
            created: null,
            dailyInterestNoMargin: null,
            dailyInterest: null,
            accrualDate: null,
            daysSinceStart: null,
            totalInterest: null,
            total: null
        }
    }
}

export {
    addCalculation,
    calculatorHistory,
    calculateData,
    temporaryCalculation,
    setTempCalculation
}
