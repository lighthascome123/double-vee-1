document.addEventListener('DOMContentLoaded', () => {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const convertButton = document.getElementById('convert-button');
    const resultDisplay = document.getElementById('result');

    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/`;

    // Fetch currencies and populate dropdowns
    fetch(`${apiUrl}USD`)
        .then(response => response.json())
        .then(data => {
            populateCurrencyDropdowns(data);
        });

    function populateCurrencyDropdowns(data) {
        const currencies = Object.keys(data.rates);
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            fromCurrency.appendChild(option.cloneNode(true));
            toCurrency.appendChild(option.cloneNode(true));
        });
    }

    convertButton.addEventListener('click', () => {
        const fromValue = fromCurrency.value;
        const toValue = toCurrency.value;
        const amount = parseFloat(amountInput.value);
        
        if (!amount || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        fetch(`${apiUrl}${fromValue}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toValue];
                const convertedAmount = (amount * rate).toFixed(2);
                resultDisplay.textContent = `${amount} ${fromValue} = ${convertedAmount} ${toValue}`;
            });
    });
});
