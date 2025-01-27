import { ref } from 'vue'

const calculatorHistory = ref([
    {
        id: 'rick-test1',
        created: '2025-01-01',
        dailyInterestNoMargin: '0',
        dailyInterest: '0',
        accrualDate: '2025-02-03',
        daysSinceStart: '123',
        totalInterest: '12345',
        total: '123456',
        formData: {
            startDate: "2025-01-01",
            endDate: "2025-01-01",
            loanCurrency: "gbp",
            loanAmount: 123456,
            baseInterestRate: 0,
            margin: 0,
        }
    },
    {
        id: 'rick-test2',
        created: '2025-01-01',
        dailyInterestNoMargin: '0',
        dailyInterest: '0',
        accrualDate: '2025-02-03',
        daysSinceStart: '123',
        totalInterest: '12345',
        total: '123456',
        formData: {
            startDate: "2024-01-01",
            endDate: "2025-01-01",
            loanCurrency: "gbp",
            loanAmount: 123456,
            baseInterestRate: 0,
            margin: 0,
        }
    },
    {
        id: 'rick-test3',
        created: '2025-01-01',
        dailyInterestNoMargin: '0',
        dailyInterest: '0',
        accrualDate: '2025-02-03',
        daysSinceStart: '123',
        totalInterest: '12345',
        total: '123456',
        formData: {
            startDate: "2024-01-01",
            endDate: "2025-01-01",
            loanCurrency: "usd",
            loanAmount: 123456,
            baseInterestRate: 0,
            margin: 0,
        }
    }
])

const addCalculation = async (id, formData) => {
    if (!id || !formData) return

    const existingItem = calculatorHistory.value.findIndex(item => item?.id === id)

    if (existingItem !== -1) {
        calculatorHistory.value[existingItem] = formData
    } else {
        const data = {
            id,
            formData
        }

        const calculatedData = await calculateData(data)

        calculatorHistory.value.push(calculatedData)
    }

    console.log('History is', { calculatorHistory: calculatorHistory.value })
}

const calculateData = (data) => {
    const { formData } = data;

    // Ensure dates are valid Date objects
    const startDate = new Date(formData.startDate);
    const today = new Date();

    // Calculate daysSinceStart
    const daysSinceStart = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)); // Difference in days

    // Calculate dailyInterestNoMargin (baseInterestRate applied)
    const dailyInterestNoMargin = (formData.loanAmount * (formData.baseInterestRate / 100)) / 365;

    // Calculate dailyInterest (baseInterestRate + margin applied)
    const dailyInterest = (formData.loanAmount * ((formData.baseInterestRate + formData.margin) / 100)) / 365;

    // Calculate totalInterest
    const totalInterest = dailyInterest * daysSinceStart;

    // Calculate total (loanAmount + totalInterest)
    const total = formData.loanAmount + totalInterest;

    // Calculate accrualDate (date of totalInterest calculation)
    const accrualDate = today.toISOString().split("T")[0]; // Format as YYYY-MM-DD

    return {
        ...data,
        created: today.toISOString().split("T")[0],
        dailyInterestNoMargin: dailyInterestNoMargin.toFixed(2), // Keep two decimal points
        dailyInterest: dailyInterest.toFixed(2), // Keep two decimal points
        accrualDate,
        daysSinceStart: daysSinceStart.toString(),
        totalInterest: totalInterest.toFixed(2), // Keep two decimal points
        total: total.toFixed(2), // Keep two decimal points
    };
};

export { addCalculation, calculatorHistory, calculateData }