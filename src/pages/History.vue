<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">History</h1>
        <div
            v-if="calculatorHistory?.length"
            class="w-full min-w-full overflow-x-scroll"
        >
            <table
                class="w-full table-auto border-collapse border border-zinc-300 rounded-lg"
            >
                <thead>
                    <tr :class="headerRowClasses">
                        <th
                            v-for="header in headers"
                            :key="header"
                            :class="cellClasses"
                        >
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
                        <td :class="cellClasses">
                            {{ formatDate(item.created) }}
                        </td>
                        <td :class="cellClasses">
                            {{
                                formatCurrency(
                                    item.dailyInterestNoMargin,
                                    currencyLookup?.[item.formData.loanCurrency]
                                        ?.locale
                                )
                            }}
                        </td>
                        <td :class="cellClasses">
                            {{
                                formatCurrency(
                                    item.dailyInterest,
                                    currencyLookup?.[item.formData.loanCurrency]
                                        ?.locale
                                )
                            }}
                        </td>
                        <td :class="cellClasses">
                            {{ formatDate(item.accrualDate) }}
                        </td>
                        <td :class="cellClasses">
                            {{ item.daysSinceStart }} days
                        </td>
                        <td :class="cellClasses">
                            {{
                                formatCurrency(
                                    item.totalInterest,
                                    currencyLookup?.[item.formData.loanCurrency]
                                        ?.locale
                                )
                            }}
                        </td>
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
import { format } from 'date-fns'
import Button from '@Components/Button.vue'
import { calculatorHistory } from '@Composables/useCalculator.js'
import { formatCurrency } from '@Utils/formatCurrency.js'

// Headers for the table
const headers = [
    'Date Created',
    'Daily Interest (No Margin)',
    'Daily Interest',
    'Accrual Date',
    'No. Days Since Start',
    'Total Interest',
    'Actions'
]

const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return format(new Date(dateStr), 'do MMM yyyy')
}

// Abstracted Tailwind classes
const cellClasses =
    'border border-zinc-300 px-4 py-2 whitespace-nowrap text-center'
const headerRowClasses = 'bg-gray-200 text-left'
const rowClasses = 'hover:bg-gray-200 even:bg-gray-100 odd:bg-white'

const currencyLookup = {
    gbp: {
        locale: 'gbp',
        text: 'GBP',
        symbol: '£'
    },
    eur: {
        locale: 'eur',
        text: 'EUR',
        symbol: '€'
    },
    usd: {
        locale: 'usd',
        text: 'USD',
        symbol: '$'
    }
}
</script>
