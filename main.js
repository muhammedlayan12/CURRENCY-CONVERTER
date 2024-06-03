document.addEventListener('DOMContentLoaded', () => {
    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const resultText = document.getElementById('result-text');
    const convertBtn = document.getElementById('convert-btn');

    // Fetch the list of currencies and populate the dropdown menus
    fetch('https://v6.exchangerate-api.com/v6/cb60dc23848c46bc6b721fbb/latest/USD')
        .then(response => response.json())
        .then(data => {
            const rates = data.conversion_rates;
            for (const currency in rates) {
                const optionFrom = document.createElement('option');
                optionFrom.value = currency;
                optionFrom.text = currency;
                fromCurrency.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = currency;
                optionTo.text = currency;
                toCurrency.appendChild(optionTo);
            }
        })
        .catch(error => console.error('Error fetching currency list:', error));

    // Add event listener for the convert button
    convertBtn.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const url = `https://v6.exchangerate-api.com/v6/cb60dc23848c46bc6b721fbb/latest/${from}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const rate = data.conversion_rates[to];
                const convertedAmount = (amount * rate).toFixed(2);
                resultText.innerText = `${amount} ${from} = ${convertedAmount} ${to}`;
            })
            .catch(error => {
                console.error('Error fetching conversion rate:', error);
                alert('Error fetching conversion rate. Please try again.');
            });
    });
});
