const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency
    }).format(amount)
}

export { formatCurrency }
