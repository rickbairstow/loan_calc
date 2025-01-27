const formatCurrency = (amount, currency) => {
    console.log({ amount, currency })
    // if (Number.isNaN(amount) || !currency) return
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency,
    }).format(amount);
};

export { formatCurrency }